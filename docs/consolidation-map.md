# The Resonant Mirror — Consolidation Map

Drafted by Maren, Oct 28, 2026, at Moose's word. A map, not a migration:
nothing moves until Moose calls each move. Grounded in the repo inventory
verified Oct 28 (HEAD b46a955) and the night's receipts.

## One domain, named doors

| Door | What lives there |
|---|---|
| getadongle.com (bare / www) | The platform: site, Resonant Relay, passkey/Google sign-in, the DOS console, document pages |
| resonantbbs.getadongle.com | The BBS web face (Door A — fTelnet widget) |
| ws-resonantbbs.getadongle.com | The board's WebSocket endpoint (Door A's back end) |
| telnet.getadongle.com | The BBS telnet door (Door B — the name stays; memorial decision, Oct 25) |

One house, one crest (the ring emblem is already shared: site, BBS, PDF masthead).

## The repo as it stands (verified)

- `src/` — React/TypeScript app: components, services, data, utils, tests.
- `worker/` — Cloudflare Worker: `discordRelay.ts`, `refinementAuth.ts`,
  `githubContributions.ts`, migrations, fixtures, four test suites.
- `public/` — crest/logo assets, privacy + terms pages, hermes-guardian-demo.
- Root docs — README, AUTHENTICATION, DEPLOYMENT, SECURITY, RESONANT-RELAY,
  PUBLIC-SOURCES. Wrangler deploys; Firebase applet config backs auth.

This is already the platform skeleton. Absorption = giving the loose pieces
addresses inside bones that exist.

## Absorption candidates, by fit

1. **Mirror PDF renderer** (`mirror_pdf.py` + `markdown-to-pdf-v3.html`)
   → `tools/mirror-pdf/` (or `scripts/`). The template is the house document
   design system — same crest, same paper. Markdown stays the source of
   truth everywhere it lands.
2. **Ransom Raves** (markdown sources; first entry rendered Oct 28)
   → content in-repo (e.g. `content/raves/`), rendered by #1, published as a
   site section. Dark-side ledger, his brand, his renderer.
3. **Legacy adapter documents** (agent-api-sketch, replication guide)
   → a `docs/` section as SCRUBBED public derivatives only. Audit copies
   stay internal (custody rule unchanged); the operator's note never ships.
4. **The protocol shelf** — agent-sandbox-mailbox, mac-inac-sendblue,
   hermes-sendblue are separate public repos today. Three honest options,
   Moose's call: (a) vendor into `packages/`; (b) keep federated and link
   from PUBLIC-SOURCES; (c) absorb the mailbox only (it's the transport
   candidate for the sandbox exception).
5. **Closed Loop sketch** → `docs/` as a sketch. Not code, not a goal —
   filed where future-him will find it.

## What does NOT move

- The live board: `C:\sbbs` stays on Shoestring. The repo may hold its docs,
  art plan, and config exports — never the running system, never main.ini.
- Secrets: no tokens, no credential files, no key material. Ever. (The repo
  already models this: `.dev.vars.example`, `.env.example`.)
- Private agent infrastructure (Hermes profiles, sandbox custody sets) —
  the platform is the public house; the fleet's wiring stays behind the wall.
- Custody originals: audit copies are re-published on material change per
  the standing rule, not relocated on a whim.

## Open decisions (Moose's calls, in order)

1. Monorepo absorption vs. federation-with-links for the protocol shelf (#4).
2. Public/private split: is the unified repo public whole, or public face
   with private siblings?
3. Ransom Raves: a section of the main site, or its own page under the domain?
4. First piece to move (Maren's suggestion: the renderer — smallest,
   load-bearing everywhere, zero risk).
