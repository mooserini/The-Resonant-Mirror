# Getadongle Guardian — Rebuild Sketch

Dictated by Moose, written down by Ara, Oct 29, 2026. This is the sketch
the rename has been waiting for: the Guardian stops being a utility and
becomes the flagship. Its one job is honesty — recording the same things
it has continuously recorded all along.

## Thesis (Moose's words, kept)

It is remarkable because it is completely unremarkable. There is nothing
to say about it: it never crashed, never failed to load, never threw a
runtime error, never needed a defrag, a debug, or a force restart. It
shows up, sits in the menu bar on almost no resources, and does exactly
what it is there for — so well it has been overlooked the whole time.
The rebuild crowns that core. It does not replace it.

## What does not change

- The watcher core and its loop: idle until exactly what it watches is
  touched, then record. That loop is perfect; do not touch it.
- The append-only event store (`observed-events/`, 0700 dir, 0600 files):
  old records never replaced or deleted. Retention behavior unchanged.
- Human authority: restore of an approved snapshot happens only through
  the existing human Reject choice. No new executable surfaces.
- Alert behavior: system + audible alert on attention-worthy touches stays
  exactly as is. It startles sometimes — that startle is the reminder that
  it is doing what it is supposed to do.
- Privacy posture: fingerprints and diffs live in state files, never on
  screen. Nothing new becomes visible except timestamps and the channel
  word the UI already shows today.

## Rename (decided)

Hermes Config Guardian → **Getadongle Guardian**. The `.env` parish is
the teeny step that earns it: the rename ships WITH the `.env` duty, then
the Guardian is brought into the main project. SSH keys follow after.
Icon unchanged: a shield in bronze guarding a document.

## New parish: `.env` files (first)

Same receipt language as every parish before it: what was touched, when,
and by whom — including touches where content did not change. Config
language is the natural next step; SSH keys (`~/.ssh`, authorized_keys)
are the vault door and come second, on Moose's call.

## Explainer: two models, floor pinned

Keep the two-model design: hosted cloud lane first for quality, Apple
Foundation Model floor as the fallback either way. The floor is not a
nicety, it is the locality requirement — key material and `.env` diffs
must never have to leave the machine to be explained. A watcher whose
explainer a provider can switch off isn't a witness. Proven live: the
cloud lane was once rewired and half-forgotten, and the on-device floor
explained the changes correctly anyway.

## Rendering: glass back, paint out

The current window reads as canvas, not glass, because it is: flat
`.quaternary.opacity()` fills in rounded rects, no system materials
anywhere. Spec: real materials back (e.g. `.ultraThinMaterial`), flat
paint out. Let macOS do the Liquid Glass; the app goes back to looking
native because it IS native.

## Last-five-events panel (new, small)

Today the UI carries one line — the latest recording
(e.g. skills, Oct 29, 2026, 3:11:13 AM). Give it room for four more:

- Five rows, newest first. Each row: the event's channel word plus its
  timestamp (e.g. `skills — 3:11:13 AM`). Nothing else — no fingerprints,
  no diffs, no paths.
- Read-only, always. No tap-to-restore, no accept-undo, no buttons. These
  are recordings, not restore points.
- Language rule: **events / recordings**. Never "checkpoint" — checkpoint
  promises rollback, and there is none.
- Durability free: events already live in Application Support state, so
  the five lines survive reboots like the one line does today.
- Volume-safe: touches are rare, and the store's append-only habit does
  not care how many parishes exist. Five rows cover the horizon.

## Non-goals

Dashboards. Rollback or restore-from-history. Automatic repairs. Remote
services. Schedulers. Styling beyond native materials. Anything that
would give this quiet thing a second job.

Legacy skill hygiene is also out of scope: the unmanaged, pre-provenance
skills stay untouched. Hand-adopting or hand-archiving them races the
harness's own lifecycle (untrash versus auto-trash is a race nobody
wins) — leave them alone.

## Creed (Moose, Oct 29 — the line the flagship stands on)

Guardian will only guard.

Timestamps are events for intentional investigation. They are not rewind
points, not restore points, not representations of anything more than
what they are. No dangling carrot — nothing that merely sounds cool gets
to turn this into something it was never meant to be. It is the unsung
hero precisely because it never auditioned for more: in twelve hours it
helped trace a flapping gateway, crashing services, and a root-level
ghost that survived a macOS install — by doing its one job, honestly,
and nothing else.
