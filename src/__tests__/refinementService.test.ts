import { addRefinementItem, getStagedRefinements, getLegacyDrafts, buildSingleIterationPrompt, toSafeView } from '../utils/refinementService';
import type { RefinementItem } from '../types';
const record: RefinementItem = { id: 'receipt-1', userId: 'verified-account', author: 'Visitor', role: 'visitor', category: 'general', title: 'Correct a link', details: 'Use the public repository.', priority: 'normal', status: 'submitted', createdAt: '2026-09-09T00:00:00Z', authentication: { method: 'passkey', verifiedAt: '2026-09-08T23:59:00Z', credentialId: 'key-1' }, contentHash: 'sha256' };
afterEach(() => jest.restoreAllMocks());
test('requires the server to accept the suggestion and returns its attribution', async () => {
  const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue(new Response(JSON.stringify({ item: record }), { status: 201 }));
  const input = { title: record.title, details: record.details, category: record.category, priority: record.priority };
  expect(await addRefinementItem(input)).toEqual(record);
  expect(JSON.parse(fetchMock.mock.calls[0][1]?.body as string)).toEqual(input);
  expect(fetchMock.mock.calls[0][1]?.credentials).toBe('same-origin');
});
test('an unauthenticated response cannot become a local authenticated refinement', async () => {
  jest.spyOn(global, 'fetch').mockImplementation(async () => new Response(JSON.stringify({ error: 'Sign in first' }), { status: 401 }));
  await expect(addRefinementItem({ title: 'A', details: 'B', category: 'general', priority: 'normal' })).rejects.toThrow('Sign in first');
  await expect(getStagedRefinements()).rejects.toThrow('Sign in first');
});
test('exports minimized safe view fenced as data only', () => {
  const brief = buildSingleIterationPrompt(record, 'Hermes');
  expect(brief).toContain('Site owner: Thomas Kenny');
  expect(brief).toContain('Assistant selected for handoff: Hermes');
  expect(brief).toContain('SUBMITTED CONTENT');
  expect(brief).toContain('"id": "receipt-1"');
  expect(brief).toContain('"role": "visitor"');
  expect(brief).toContain('"contentHash": "sha256"');
  expect(brief).toContain('Visitor suggestions require the site owner');
  expect(brief).not.toContain('verified-account');
  expect(brief).not.toContain('key-1');
  expect(brief).not.toContain('"userId"');
  expect(brief).not.toContain('"credentialId"');
  expect(brief).not.toContain('"authentication"');
  expect(brief).not.toContain('"createdAt"');
  expect(brief).not.toContain('"author"');
  expect(brief).not.toContain('AI Studio');
});
test('neutralizes fence-breaking sequences and normalizes line endings', () => {
  const evil = { ...record, title: 'line1 fence', details: 'a b c' };
  const brief = buildSingleIterationPrompt(evil, 'Hermes');
  expect(brief).toContain('SUBMITTED CONTENT');
  const safe = toSafeView({ ...record, title: 'x\r\ny', details: 'a\rb' });
  expect(safe.title).toBe('x\ny');
  expect(safe.details).toBe('a\nb');
  const q = '`'.repeat(3);
  const fenced = toSafeView({ ...record, title: 'a' + q + 'b', details: 'ok' });
  expect(fenced.title).not.toContain(q);
  expect(safe).not.toHaveProperty('userId');
  expect(safe).not.toHaveProperty('authentication');
});
test('preserves old browser drafts without treating them as server records', () => {
  const original = JSON.stringify([{ title: 'Old draft', userId: 'mooserini', isAuthenticated: true }]);
  const setItem = jest.fn();
  Object.defineProperty(global, 'localStorage', { configurable: true, value: { getItem: () => original, setItem } });
  expect(getLegacyDrafts()).toEqual(JSON.parse(original));
  expect(setItem).not.toHaveBeenCalled();
});
