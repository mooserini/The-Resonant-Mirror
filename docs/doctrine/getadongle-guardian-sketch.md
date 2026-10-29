# Getadongle Guardian — Extension Sketch

Sketched by Moose, Oct 28, 2026 ~23:56 EDT, "while it's in my head."
(Guardian is still named Hermes Config Guardian everywhere until the
rename ships with the new duty — see the night's rename decision.)

## What Guardian already does (proven, incl. tonight)

- Watches critical files; versioned, dated timestamps for EVERY touch —
  including touches where content did not change.
- On demand, explains SEMANTIC changes in plain language: what the diff
  means, not just that bytes moved.
- The explainer runs down a FALLBACK CHAIN. Tonight, mid gateway-thrash,
  Moose tapped the button to check it still worked after he had rewired
  the explainer (toward OpenRouter, his hedged recollection) — it fell
  back to the ON-DEVICE Apple Foundation Model and still explained his
  Hermes config changes correctly.

## The extension (the one more duty that makes the rename true)

- New parishes: `.env` files; SSH keys (`~/.ssh` / authorized_keys).
- Same language, spoken semantically: "added one, removed two,
  touched by process ID <n>" — what, when, by whom, receipt attached.
- The explainer's floor stays the on-device Apple Foundation Model:
  - Not gated behind any vendor's rules — no hosted policy sits between
    the watcher and the explanation of a sensitive diff.
  - Locality is the requirement, not a nicety: key material and .env
    diffs should never have to leave the machine to be explained.
  - Apple-platform semantics from Apple's own model — it does not have
    to guess at the source of truth for Apple's formats and behaviors.

## Design notes (Maren's, for the record)

- The fallback chain is the adapter doctrine again — preference and
  fallback, degrade in order, never go silent. Hosted lane rewired or
  down → on-device floor holds. A watcher whose explainer can be
  switched off by a provider isn't a witness; the floor makes it one.
- Order of parishes is Moose's call (rename decision): .env watch is
  the config-language natural next step; SSH keys are the vault door.

## Rename trigger + icon (Moose, Oct 29 — Ara writing it down)

- The `.env` watch is the teeny step that earns the rename: it gives the
  credit the rename needs. Rename ships WITH the .env duty, then the
  Guardian is brought into the main project. SSH keys follow after.
- No icon redesign: the mark stays exactly what it is — a shield in
  bronze guarding a document.
