# Legacy Adapter — public derivatives

The design papers for the Resonant Legacy Adapter: a self-healing,
transactional handshake that lets agents (and people) transact with a
legacy BBS through its own 1992 command set — GET the state, POST an
answer chosen from the set the state offers, re-GET to heal.

These are **public derivatives** of custody documents. The originals
live in the Resonant Legacy Adapter audit set (canonical sandbox set;
audit copies on the sysop's Desktop and in a Drive folder), hash-pinned
and frozen. What ships here is derived from them under the scrub rule
recorded in the originals themselves: *public or submission materials
are derived only after scrubbing the operator's note and the transport
inventory.*

## Files

- `agent-api-sketch.md` — the design itself: the two-verb reduction,
  the auth boundary, the replication test, and the addenda the test
  produced. Derivative of the custody original, SHA-256
  `f00bcc15f3392de91f1fdc2531d95d7070b94f7436c7fe34e8051944d1b0c285`.
- `replication-guide.md` — the cold-replication field guide, corrected
  by the Tier 2 tester's evidence. Derivative of SHA-256
  `f70a25771fa19954e3cb73a27d5900ff4055fefbd777540c76389191b4b84a82`.
- `capability-negotiation.md` — the capability-negotiation proposal
  and the sysop's transport ruling. Derivative of SHA-256
  `7ec577389b06d2b2a1e5ccddffe2955f1e77e1a372d7d4e396587f60cff6f7d9`.

## Removals ledger (what the scrub took out, and why)

From `agent-api-sketch.md` only; the other two needed no removals.

1. **The operator's note** (one paragraph, in the Sysop grant section)
   — it is marked, in the original, "NOT for public display." Removed
   whole; a marker stands where it stood.
2. **Board mail plumbing** (two paragraphs: a delivery-failure report
   and a relay-identification note) — operational detail, including a
   third-party account's likely sign-in address. Replaced with one
   neutral status line.
3. **Internal addressing** (three in-line edits): a tailnet IP address,
   two tailnet host names, and a router port-forward statement —
   generalized to the design fact each carried ("from a tailnet seat,"
   "not reachable from the public internet").
4. **One internal workspace path** (where a test brief is preserved) —
   generalized to "the custodian's working files."

What was deliberately kept, because it is design substance rather
than plumbing: the transport taxonomy as protocol classes (which
kinds of doors can carry transactions — the board-specific listener
inventory is a separate custody document and is not published), the
empirical security-level findings (stock behavior, no values), the
public web door's address (it is the site's own machinery, visible to
any visitor), and the custody arrangement's description of itself.

## Not published here

The three smoke-check write-ups, the testers' evidence and
reconciliation documents, the services inventory, and the custody
receipts remain in the audit set. Some may follow as derivatives;
the receipts never do — they are the internal record.
