import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { build } from 'esbuild';
import { Miniflare, convertV4MiniflareOptions } from 'miniflare';

const origin = 'https://www.getadongle.com';

const compiled = await build({ entryPoints: [new URL('./index.ts', import.meta.url).pathname], bundle: true, write: false, format: 'esm', platform: 'browser', conditions: ['workerd', 'browser', 'import'] });
const schema = (await Promise.all([
  readFile(new URL('./migrations/0001_verified_refinements.sql', import.meta.url), 'utf8'),
  readFile(new URL('./migrations/0002_resonant_relay.sql', import.meta.url), 'utf8'),
  readFile(new URL('./migrations/0003_relay_enrollments.sql', import.meta.url), 'utf8'),
])).join('\n');

async function setup(run, bindings = {}) {
  const mf = new Miniflare(convertV4MiniflareOptions({
    modules: true,
    script: compiled.outputFiles[0].text,
    compatibilityDate: '2026-09-09',
    compatibilityFlags: ['nodejs_compat'],
    d1Databases: ['REFINEMENTS_DB'],
    bindings: {
      AUTH_ORIGIN: origin,
      AUTH_RP_ID: 'www.getadongle.com',
      FIREBASE_PROJECT_ID: 'test-project',
      OWNER_GOOGLE_EMAIL: 'owner@example.test',
      DISCORD_APPLICATION_ID: '1545510996574216362',
      DISCORD_GUILD_ID: '358496815521333248',
      DISCORD_FORUM_CHANNEL_ID: '1547202057637994627',
      DISCORD_OWNER_USER_ID: '358494366274158592',
      DISCORD_BOT_TOKEN: 'test-token-that-is-long-enough-to-pass-validation',
      RELAY_CRED_HALLIE: 'hallie-test-secret-value',
      ...bindings,
    },
  }));
  try {
    const db = await mf.getD1Database('REFINEMENTS_DB');
    await db.exec(schema.replace(/\n/g, ' '));
    await run(mf, db);
  } finally { await mf.dispose(); }
}

function enroll(mf, handle, cred) {
  const params = new URLSearchParams({ handle });
  if (cred !== undefined) params.set('cred', cred);
  return mf.dispatchFetch(`${origin}/portfolio-api/relay/enroll?${params}`, { method: 'GET' });
}

test('L-R-3: success page greets the enrollment row handle, not a constant', async () => setup(async (mf, db) => {
  await db.prepare(
    "INSERT INTO relay_enrollments (handle, kind, credential_ref, destination, status) VALUES (?, ?, ?, ?, 'active')",
  ).bind('Hallie', 'agent-guest', 'RELAY_CRED_HALLIE', 'room').run();
  const r = await enroll(mf, 'Hallie', 'hallie-test-secret-value');
  assert.equal(r.status, 200);
  const text = await r.text();
  assert.match(text, /Hallie, you/);
  assert.doesNotMatch(text, /bindingtest/i);
}));

test('L-R-3b: second enrollee is greeted by her own name', async () => setup(async (mf, db) => {
  await db.prepare(
    "INSERT INTO relay_enrollments (handle, kind, credential_ref, destination, status) VALUES (?, ?, ?, ?, 'active')",
  ).bind('Second', 'agent-guest', 'RELAY_CRED_HALLIE', 'room').run();
  const response = await enroll(mf, 'Second', 'hallie-test-secret-value');
  assert.equal(response.status, 200);
  const text = await response.text();
  assert.match(text, /Second, you/);
  assert.doesNotMatch(text, /Hallie/);
}, { RELAY_CRED_HALLIE: 'hallie-test-secret-value' }));

test('L-R-4: credential_ref naming a non-string binding returns 404, not a throw', async () => setup(async (mf, db) => {
  await db.prepare(
    "INSERT INTO relay_enrollments (handle, kind, credential_ref, destination, status) VALUES (?, ?, ?, ?, 'active')",
  ).bind('Oddone', 'agent-guest', 'REFINEMENTS_DB', 'room').run();
  const response = await enroll(mf, 'Oddone', 'anything-at-all');
  assert.equal(response.status, 404);
}, { RELAY_CRED_HALLIE: 'hallie-test-secret-value' }));
