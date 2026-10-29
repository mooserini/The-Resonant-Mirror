> **Public derivative — October 29, 2026.** Derived from the custody original `REPLICATION-GUIDE.md` (SHA-256 `f70a25771fa19954e3cb73a27d5900ff4055fefbd777540c76389191b4b84a82`), held in the Resonant Legacy Adapter audit set. Per the custody scrub rule recorded in the original, material marked not for public display and board-specific plumbing detail have been removed; removals are marked where they stood. Nothing else was altered.

# Replication guide — observed Annette branch, 2026-10-28

This guide corrects the tested manual/state-driven registration branch using Annette's evidence (custody document, not published here). It is additive to the the frozen snapshots (custody set, not published here), not a new API specification or authority to operate the BBS. A new walk requires its own owner-authorized scope. No new walk was performed while writing this guide.

## Human input before a new walk

| Field | Supply explicitly; do not copy Annette's identity |
|---|---|
| Alias, real name, handle | Owner-approved identity and permitted collision response. Annette's one-word real name failed ambiguously; a surname is not proved universally mandatory. |
| Location | Approved city/state string containing a comma. Case may be normalized on echo. |
| Birthdate | Established agent date, or an explicitly approved fallback. Annette's `10/27/2026` was her brief's fallback, not a universal default. |
| Netmail | Decide whether blank is authorized to try and who supplies a value if rejected. Annette's blank attempt failed; do not invent a recipient or assume mailbox delivery. |
| Forwarding | Explicit intended choice; Annette used No. |
| Credential route and custody | For the tested route, internally generate only at the own-password entry state; retain only in an owner-approved private file, mode 600, outside synced documents. Never print values or generated offers. Reuse the established value for fresh login. No rotation just for a test. |
| Transport and recovery limits | Approved lane, trust requirements, retry bound, and escalation contact. A selector denial is a stop; new evidence/authorization must resolve it before retry. |

## State discipline and terminal setup

Read current state -> send exactly **one** answer -> read again. A selector is a single keystroke; a line entry ends with Enter. Never send two user answers as typeahead. The minimal runner checked each expected state before each answer; an unexpected state stops the runner.

The tested encrypted lane was direct `wss://ws-resonantbbs.getadongle.com:443`, standard RFC 6455 handshake with no subprotocol. Validate TLS and the WebSocket upgrade. In the underlying terminal stream, answer each of the two `ESC[6n` queries with `ESC[1;1R` promptly, then wait for a clean `Login:`. Treat these as protocol replies, separate from registration answers. A partial banner or quiet interval alone is insufficient reason to stop receiving through negotiation.

Match newly received output for a new transition; retain the pending prompt as state until an answer or observed transition invalidates it. A later read with zero bytes proves neither a repeated prompt nor expiry. Preserve a non-secret observation time and selector/default for approval context, and keep observation and action adjacent. Do not replay a previously denied answer or act on an unconfirmed transition. If a SY challenge appears, send nothing and disconnect under the original test limit.

No SSH walk was verified by Annette: her fallback stopped on an unknown host key, which she did not accept. Do not infer transport failover from switching connections. Do not bypass trust warnings or assume plaintext credential transmission has the encrypted lane's approval.

## Registration sequence observed

| Current observed state | One answer / next observed result |
|---|---|
| `Login:` | `New` + Enter -> registration |
| Automatic terminal type detection `[Yes]` | Enter |
| `HIT your BACKSPACE or DELETE-LEFT key` | One raw byte `0x7F`; receipt `Character 127 (7Fh) received.` |
| Colors `[Yes]` | Enter |
| iCE bright background colors `[No]` | Enter |
| Mouse reporting `[No]` | Enter |
| `Enter your full name or alias:` | Approved alias + Enter; read duplicate/validation response |
| `Enter your full real name:` | Approved real name + Enter; read duplicate/validation response |
| `Enter your handle or call-sign:` | Annette was prefilled; Enter accepted it. If a different value is shown, use only the authorized identity/collision rule. |
| Location | Approved comma-containing value + Enter |
| Birthday `(MM/DD/YYYY)` | Approved established/fallback date + Enter |
| `Network mail address (Example: user@domain)` | Approved value + Enter; blank was rejected in Annette's walk |
| `Forward personal e-mail to network mail address? [No] Yes` | For approved No, Enter |
| `Is the above information correct? [Yes] No` | Enter only if the submitted information is correct |
| Four distinct `[Hit a key]` screens | One space at each, reading again between them |
| `Select Command Shell:` / `Which, Quit or [1]:` | Single `1` -> Classic |
| `Enter a different password? [Yes]` | Tested route: single `Y`, no CR/LF -> own-password entry. Keep question/default visible; suppress surrounding generated value. |
| Own-password entry (prompt redacted) | Generate privately at this state; send privately once |
| Re-entry/verification state (prompt redacted) | Send the same private value once |
| `User Settings for <identity> #<number>:` / `Which or [Q] to Quit:` | Commit receipt observed after verification; single Q, no settings changes |

An observed `duplicate or invalid` rejection does not explain which condition failed. Read its re-ask/Continue state; use only authorized input corrections and comply with review stops. Rejection alone is not proof an account committed. If commit outcome is uncertain or a prior completed account is indicated, reconcile before any new registration; never create another identity blindly. Preserve exact non-secret evidence and distinguish board response from tester-tool or review behavior.

The displayed board mail address is separate from owner-supplied netmail; displaying it does not verify a working mailbox. Accepting the offered credential is **untested** here, not proven required or supported. Do not reset an established credential to replay registration.

## Fresh login and clean logoff observed

1. Exit settings with Q, disconnect, and reconnect on the same validated encrypted lane. At `Login:`, send the established handle + Enter. At the actual credential state, send the same saved private value.
2. In the successful verification walk, logon progress and **two distinct `[Hit a key]` pauses** preceded the bulletin menu. Answer each pause individually. Stop on SY without answering.
3. Verify exact bulletin prompt: `Enter number of bulletin or [Quit]:`, with no further credential prompt after login. Record success only on this observed evidence.
4. Send Q. Annette then saw `Read your unread mail now? [Yes] No`. For the original no-mail-access scope, single N declined it.
5. At the main menu's `O ... Logoff BBS (or /O)`, send single O.
6. The observed confirmation was `Log off? [No] Yes`: explicit Y completed logoff. **Do not assume Enter confirms; here it cancels.** Read the result. Annette saw logoff text followed by remote connection closure.
7. Close the local client and report lane, identity, commit receipt, fresh-login result, logoff result, human input, guesses, deviations, denials, and limits. Never include credential values, unredacted offers, or private-file contents.

This branch proves a completed BBS walk from one seat with human-resolved inputs and minimal tooling. It does not implement or verify the proposed API/authentication boundary, transport failover, idempotency/replay recovery, or universal cross-agent reproducibility. See the reconciliation findings (custody document, not published here) for remaining opens.
