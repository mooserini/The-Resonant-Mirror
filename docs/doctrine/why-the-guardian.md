# Why the Guardian

*Written down October 29, 2026 — before the name changes, so the
reasons are already on file when it does.*

I built the Guardian because my machines kept changing underneath me
and then denying it.

An operating system told me a button would erase everything, and a
root-level service I'd pasted in from a friendly dashboard page
survived the erase — lived in my machine for a month with a token
file that later went missing, by a hand and at a time no log on the
machine could name. Another operating system told me, in plain
dialog boxes, that I could not control my own computer — that the
agent working for me would run with half a token and be refused by
services on the machine I own. Updates arrived that rewrote the
files my agents think with, and nothing in the stack that performed
them thought to mention what it had touched.

Every one of those moments has the same shape: something changed,
nobody could prove what, when, or by whom, and the human paid for
the ambiguity in hours and heartache.

## What it does

The Guardian watches the files I enroll it to watch. Nothing more,
nothing less. For every touch it keeps a receipt: what was touched,
when, and by whom — including the touches where the file was modified
and nothing actually changed, because "nothing changed" and "nothing
happened" are different sentences, and only one of them is ever true.

When I ask what a change *means*, it explains it in plain language —
semantic, not just bytes. The explanation runs down a fallback chain
and lands, at the floor, on the on-device model: no vendor's rules
sit between the watcher and the telling, and sensitive diffs never
have to leave the machine to be understood.

It receipts me, too. It cannot tell the difference between my hand
and a stranger's, and that is not a flaw in the design — that *is*
the design. A watcher that makes an exception for its owner is a
watcher with a hole shaped like the owner.

People ask why I don't mind the alerts. They're a heartbeat. When I
know I changed something, the alert is how I know it actually landed.

## Why the name changes

It has been called Hermes Config Guardian because Hermes is what it
watched first. But the night I put its card on this repository as
the banner, I saw it plainly: it has never only been guarding
Hermes. It stands over the whole house — the configs, the services,
the platform, getadongle itself.

So it will be named **Getadongle Guardian** — on the day it takes on
its next duty, not before. I won't rename it cosmetically. The new
duty is the one the rename has to be true about: watching the `.env`
files next, and in time the SSH keys — the same receipts, spoken the
same way: *added one, removed two, touched by this process, at this
time.*

Until that day it keeps the old name, honestly, and stands its post.

## Exhibits

- **October 28, 2026, evening.** The ghost daemon's token file is
  gone; nothing watched that folder, so the record reads *unknown
  hand, unknown time*. That sentence is the problem this tool exists
  to make impossible.
- **October 29, 2026, 00:05:36.** I install the agent gateway myself.
  Guardian observes the config change within seconds, explains it
  semantically from the on-device model, and asks me to approve the
  new baseline. The resurrection was witnessed.
- **October 29, 2026, ~00:14.** I run an update. It rewrites
  fourteen skill files. Hermes' own tooling notes it nowhere a human
  would look. Guardian is the only surface that says, out loud,
  *something got messed with* — because watching exactly that parish
  is the whole of its job.

## What it's worth

It does not do a ton. It does not cost a lot. It needs almost no
inference. But in terms of what it can save people — time, and
heartache, and one bad night of interrogating a machine about its
own history — it is priceless.

Build the witness first. Everything else can be argued with;
a receipt can't.

— Moose
