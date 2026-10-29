# Docs Home — Sketch

For The-Resonant-Mirror repo. Sketched by Maren with Moose, Oct 28, 2026.
Purpose: give the documents that currently land on Moose's Desktop (Audit
Copy A) and in Maren's sandbox (canonical set) a canonical home on GitHub —
"the canonical source for source files because they're the source."

## The one reversal

Today:  sandbox = canonical → mirrors pushed to Desktop + Drive.
After:  GitHub = the trunk → sandbox and Desktop are working copies and
        backups, refreshed FROM the repo.

Nothing about the custody discipline changes: every publish is still
hash-verified, auditors still never edit the copies they test, findings
still return as separate documents. Only the direction of truth reverses.

## The wall (load-bearing, read first)

GitHub canonical means canonical AND readable. The repo is the public
house. So:

- IN: any document safe in daylight — doctrine, sketches, guides,
  SCRUBBED public derivatives of the adapter set, Ransom Raves,
  the Closed Loop sketch, the consolidation map itself.
- NEVER IN: the unscrubbed audit originals (the operator's note stays
  in custody — sandbox + Drive audit folder), credentials, tokens,
  main.ini, anything whose hash we verify precisely because it must
  not travel.

## Neighborhoods (docs/ tree, one folder per collection)

    docs/
      legacy-adapter/    agent-api sketch (scrubbed), replication guide,
                         services inventory (scrubbed), design notes
      raves/             Ransom Raves sources (markdown = truth,
                         PDFs rendered by tools/mirror-pdf)
      doctrine/          Discord doctrine, comms hierarchy, design rules
      closed-loop/       the sketch; later, the build notes
      README.md          the front door: what lives here, what doesn't,
                         and where the custody copies live (named, not linked
                         with anything sensitive)

Each collection follows his project-folder standard as it grows:
README first; QUICKSTART / TROUBLESHOOTING / ASSIGNMENTS when earned.

## Working flow (plain words)

1. A document changes wherever it was written (sandbox, Desktop, a phone).
2. It gets committed to the repo: one dated, named snapshot — a receipt.
3. Maren re-publishes the mirrors FROM the repo and verifies hashes,
   same as today, direction reversed.
4. Desktop stops being a hope and becomes a checkout: if the laptop
   burns, the trunk still stands, and the Desktop can be re-seeded
   from it (his seeding philosophy: rebuild from the seed file).

## First move (smallest, safest)

The scrubbed legacy-adapter derivatives + the replication guide.
They are already written, already reviewed by two cold readers,
and moving them proves the flow end-to-end before anything tender
follows. The renderer (map decision #4) can ride the same commit
window or follow it — Moose's call.

## Git words, one line each (Moose's card)

- commit — a saved snapshot with a date and your name on it. A receipt.
- branch — a side road: try the change there, the main road never notices.
- merge — walking the side road back into the main road, on purpose.
- fork — a photocopy of the whole house, renovatable by whoever holds it.
- trunk / main — the road everything returns to. The canonical one.
