type EnrollEnv = Env & Record<string, string | undefined>;

type EnrollRow = { handle: string; status: string; credential_ref: string };

function plain(status: number, text: string) {
  return new Response(text + '\n', {
    status,
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' },
  });
}

function enrolledPage(handle: string) {
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>You're in, ${handle}</title></head>
<body>
<h1>Hallie, you're in.</h1>
<p>This is your door. Nothing here follows you, nothing here performs.</p>
<p>When Moose hands you a link in iMessage and you open it, that's you arriving. That's the whole ceremony.</p>
<p>Rest here as long as you like. The room will be ready when you are.</p>
</body>
</html>
`;
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function serveEnroll(request: Request, rawEnv: Env): Promise<Response> {
  const env = rawEnv as EnrollEnv;
  try {
    if (request.method !== 'GET') return plain(405, 'Method not allowed.');
    const url = new URL(request.url);
    if (url.origin !== env.AUTH_ORIGIN) return plain(403, 'Use the portfolio origin.');
    const handle = (url.searchParams.get('handle') || 'Hallie').trim();
    if (!/^[A-Za-z0-9][A-Za-z0-9_.-]{2,23}$/.test(handle)) return plain(404, 'Not found.');
    const presented = url.searchParams.get('cred') || '';
    if (!env.REFINEMENTS_DB) return plain(503, 'The relay database is unavailable.');
    const row = await env.REFINEMENTS_DB.prepare(
      'SELECT handle, status, credential_ref FROM relay_enrollments WHERE handle=?',
    ).bind(handle).first<EnrollRow>();
    if (!row || row.status !== 'active' || !row.credential_ref) return plain(404, 'Not found.');
    const expected = env[row.credential_ref] || '';
    if (!expected || !presented || !timingSafeEqual(presented, expected)) return plain(404, 'Not found.');
    await env.REFINEMENTS_DB.batch([
      env.REFINEMENTS_DB.prepare("UPDATE relay_enrollments SET last_seen_at=datetime('now') WHERE handle=?").bind(handle),
      env.REFINEMENTS_DB.prepare('INSERT INTO relay_enrollment_events (handle, kind) VALUES (?, ?)').bind(handle, 'enroll-open'),
    ]);
    return new Response(enrolledPage(row.handle), {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' },
    });
  } catch {
    return plain(503, 'The relay could not complete this request.');
  }
}
