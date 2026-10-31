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

## Amendments (Annette's cold review: SANE-WITH-AMENDMENTS)

Charged by Moose: adversarial but beneficial, beneficial weighted
heavier. Verdict: the crown, the .env duty, the glass, and the five
recordings all stand. Before this sketch counts as an implementation
contract, three promises get amended: attribution, local/cloud choice,
durability. Nothing here adds a second job. Each amendment names what it
clarifies — this section is its own first application of rule 9.

1. Choice before transmission. Local Clarify is directly selectable and
   never waits for cloud failure. Cloud is chosen horsepower. Payload
   sensitivity is checked before transmission; raw secrets remain local.
   If the on-device model is unavailable, Guardian still reports the
   facts through its deterministic floor. (Clarifies the sketch's
   explainer ordering: the chain is cloud → Apple → deterministic facts;
   parish alone is insufficient for export policy — skill files can
   contain secrets too, so the check belongs on the payload.)
2. An honest unknown. A recording says what Guardian observed and when
   it observed it. Actor attribution appears only with a named evidence
   source; otherwise it is unknown. Observation time is not necessarily
   write time, and a process is not necessarily the human or agent behind
   it. (Clarifies the sketch's "by whom": the watcher passes an
   argument-free change callback; the record holds time, channel,
   fingerprint, ID; a 350 ms debounce means one recording isn't one
   write.)
3. Custody for the explainer. Provider, endpoint, model-selection policy,
   configuration location, and credential custodian are declared without
   exposing credentials. Changes to relevant enrolled configuration are
   observable without depending on that explainer to explain itself. The
   watched inputs are specified; nothing watched expands silently.
4. An explanation is not the event. Clarify preserves its source label
   and names fallback when it occurs. Unavailable model revisions remain
   unavailable, never implied pinned. Explanations interpret recordings;
   they cannot rewrite them or authorize actions. Provenance goes on
   Clarify, not on the deliberately sparse five-row panel. (Explanation
   provenance already exists — Hermes provider/model, Apple fallback,
   deterministic fallback, type-safety, rendered label. Strengthen it;
   don't invent it again.)
5. History survives the name. The rename preserves or explicitly migrates
   the existing state location, approved snapshots, and recordings — the
   old Application Support directory must not be stranded by the new
   name.
6. Five is presentation, not retention. The panel shows the latest five
   successfully retained observations, with deterministic ordering and
   honest incomplete-history warnings. Retrieval must not delay guarding.
   Relaunch, interrupted writes, clock changes, bursts, and disk
   exhaustion are acceptance cases. No pruning, no dashboard. (Clarifies
   the sketch's "durability free" and "volume-safe": unearned absolutes.
   The store is real — atomic per-event files, malformed-record tests —
   but startup scans everything by wall-clock, there is no last-five
   retrieval or stable tie-ordering yet, and reboot / interrupted-write /
   full-disk / burst behavior is unestablished. Five rows limit the
   display, not the workload.)
7. Glass changes the surface, not the warning. Materials preserve alert
   timing, sound, foreground behavior, and legibility; verify bright/dark
   surroundings and accessibility settings; respect Reduce Transparency.
8. The crown and the rebuild, defined. Flagship means most trusted, not
   most featured. Rebuild names the presentation and parish extension,
   not replacement of the witness core.
9. One doctrine, explicit amendments. Later amendments identify the
   earlier statements they clarify or supersede — this section is its own
   first application: it clarifies the sketch's "by whom," its explainer
   ordering, and its durability absolutes.

Her closing line, which Moose is keeping: "Let Guardian earn
specificity rather than perform certainty." — Annette
