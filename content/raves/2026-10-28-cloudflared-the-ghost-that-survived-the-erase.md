---
title: The Ghost That Survived the Erase
---

# Ransom Raves of the Resonant Mirror

## Entry 1 — The Ghost That Survived the Erase

*October 28, 2026. Or: how a tunnel I installed in September outlived the button that was supposed to erase everything, lost its own password, and spent a night shooting at my network stack every five seconds. Every number below was read off the machine, not remembered.*

### The paste

Cloudflare's dashboard, when you create a tunnel, offers you three copy-paste commands under a friendly heading. Two of the three are the same command: `sudo cloudflared service install <token>`. On a Mac, that does not install a helper in your user account. It installs a **system-level launch daemon** — root authority, starts at boot, respawns itself when it fails — into `/Library/LaunchDaemons`. Nowhere on the page does a word say this. One paste, one busy afternoon in late September, and the thing was seated. September 28, to be exact: that's the birthday on its error log.

They don't hand you a loaded gun. That would require the honesty of a warning label. They hand you a copy button.

### The haunting

Six weeks later the machine's agent gateway started flapping one evening — down, up, down, up, six-plus restarts in an hour and a half, each one interrupting real work. Two self-healing systems had hold of the same stack: the gateway's service, which kept deciding it had been invoked, and the tunnel daemon, whose launchd entry runs `KeepAlive` with `SuccessfulExit: false` and a five-second throttle. When two healers fight, the patient doesn't get better. The patient gets healed to death.

The gateway got uninstalled first — deliberately, so the bring-up could happen at human pace. Its uninstaller, for the record, prints "service uninstalled" every time you run it, including when there was nothing left to uninstall. A message that never changes when the facts change is not a status. It's a screensaver.

### The forensics

The daemon was not failing because its credential was stale. It was failing because its credential **did not exist**. The token file — `/Library/Application Support/com.cloudflare.cloudflared/token` — was simply gone, by a hand and at a time the logs don't name.

The running process never noticed: a tunnel holds its token in memory, so this one kept registering connections into the evening on a password its own disk no longer had. Then, at 20:57:57, all four connections terminated at once. launchd respawned the daemon. The new process went to read the token file, found the void, and died — and launchd, faithful to its instructions, respawned it again. And again. **437 times in 37 minutes**, until the loop was stopped by hand.

Its error log by then: **1,231,627 bytes**, roughly nine and a half thousand lines, about 1.23 million characters — a fat novel written by a daemon, in which nearly every page says *the tunnel works*, and the final chapter says *no such file or directory* 437 times.

### The erase that wasn't

Here's the part that should be printed on something.

Between the September paste and the October haunting, this Mac was reset using **Erase All Content and Settings** — the control Apple presents as the way to wipe a machine clean, safe enough to hand to a stranger. The daemon's records run straight through it, unbroken, September 28 onward. Whether the erase genuinely doesn't reach system daemons in `/Library`, or a restore afterward quietly carried them home, is — for once — not the point. The result on the disk is identical either way, and the result is what a person lives with.

Run the counterfactual: erase the machine, hand it to a buyer. The buyer does not just inherit a stray process. They inherit a **tunnel, running as root, authenticated to your Cloudflare account**. That is not a leftover. That is a liability with a heartbeat.

Conclusion, carved where I can find it again: **Erase All Content and Settings is not evidence of absence.** If it matters, remove the thing by name and read the empty space where it was.

### The removal that receipts

What it actually took to make the ghost not survive anything:

1. `sudo cloudflared service uninstall`
2. `sudo rm -rf "/Library/Application Support/com.cloudflare.cloudflared"`
3. `sudo rm -f /Library/Logs/com.cloudflare.cloudflared.*`

Then verification, five ways, from a second seat: no service in launchctl, no plist in LaunchDaemons, no token directory, no logs, no process. Absence you can point at, piece by piece. The tunnel was reinstalled afterward — the same dashboard command as September, because the command was never the problem. Installed with its location known, its token file confirmed present, its log reborn at 5,864 bytes and 45 lines and zero failures. A noose is only a noose when you don't know it's there. Now it's a tool with an address.

### The principle

Everything failed the same way tonight: **they POST and don't tell you what they got, or they GET and don't POST what they got.** The uninstaller that cries success forever. The dashboard that builds a root daemon and discloses none of it. The erase button named for totality that doesn't total. Nobody finishes the handshake.

It's not hard. It is apparently just rare:

**Mean what you say, and say what you mean.**
