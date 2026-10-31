CREATE TABLE IF NOT EXISTS relay_enrollments (
  handle TEXT PRIMARY KEY,
  kind TEXT NOT NULL,
  identity TEXT,
  credential_ref TEXT NOT NULL,
  destination TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  last_seen_at TEXT
);

CREATE TABLE IF NOT EXISTS relay_enrollment_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  handle TEXT NOT NULL,
  kind TEXT NOT NULL DEFAULT 'enroll-open',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
