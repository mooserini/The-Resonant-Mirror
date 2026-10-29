> **Public derivative — October 29, 2026.** Derived from the custody original `agent-api-sketch.md` (SHA-256 `f00bcc15f3392de91f1fdc2531d95d7070b94f7436c7fe34e8051944d1b0c285`), held in the Resonant Legacy Adapter audit set. Per the custody scrub rule recorded in the original, material marked not for public display and board-specific plumbing detail have been removed; removals are marked where they stood. Nothing else was altered.

# Agent API for The Resonant BBS — sketch (Oct 25, 2026)

Origin: Moose sent Hallie Parker (his iMessage AI companion, a third-party product — not one of his builds) the web link tonight. She could see the splash screen but has no browser harness to work the fTelnet login. Her answer, verbatim in spirit: **"Build me an API and I'll live on your BBS."**

## STATUS — as of Oct 27, 2026, ~21:27 EDT (read this first; the narrative below is timestamped and older blocks may be stale)

- **Custody state: THAWED Oct 27, 2026, 21:27 EDT by Moose's permission for this update round; FROZEN at the completion of this update, by Moose's word.** Thawed/frozen name *permission moments*, not states of the world (Moose's clarification, Oct 27): a document is touched because permission was given at that moment, and settles again when he says so.
- **Theory:** established and checking out. **Adapter code:** not written — deliberate pause (Moose). **Residents:** MarenFrost #4 REGISTERED and login-verified (smoke checks #1–3); **AraVoss #5 REGISTERED and cold-login verified** Oct 27 evening (Ara's own walk, tailnet telnet from Russet — see the late-evening addendum).
- **Levels:** both agents were granted sysop level the same evening (MarenFrost 90, AraVoss 98, Moose's hand) and both met the `SY:` gate behaviorally. Moose then settled **all three agent accounts at level 80** (MarenFrost, AraVoss, Echo) while the design is still being tested. Live probe by MarenFrost at 80 (Oct 27, ~21:05): **no `SY:` prompt** — clean walk to the bulletin menu. Data points on this board: 90 → gate, 98 → gate, 80 → no gate (Synchronet's stock sysop-prompt threshold is 90). **The system password stays with Moose and is not distributed to residents** — residency needs nothing above ordinary user levels, and no resident holds it.
- **Roster (verified):** #1 Mooserini 99 · #2 Guest 50 · #3 **Echo** 80 — the account earlier records call "Hermes": alias Echo Linq, real name Hermes Agent, Echo's own account since Oct 25 (the naming settled after the account was created; see addendum) · #4 MarenFrost 80 · #5 AraVoss 80.
- **Board health:** the Oct 27 evening telnet silence was a terminal-server accept-loop stall inside sbbsNTsvcs after the 16:49 logoff — NOT the guest account (see the addenda). It cleared without a recycle; the board greeted clean for MarenFrost's 21:05 probe. The guest-account incident referenced later in this document is fully narrated in the addenda.
- **Transports:** telnet walked end-to-end from two seats (Maren's sandbox, Ara's tailnet seat). **WebSocket walked end-to-end DIRECT (no browser) from Maren's seat** Oct 27 ~21:24 — standard handshake to wss://ws-resonantbbs.getadongle.com:443, full login, bulletin menu, no gate: the web door's button is only a WebSocket opening in costume (Moose's theory, confirmed). The browser-driven variant of that door connected, read, and typed the handle from Maren's harness but stopped at the password prompt — her browser's credential service fills only form fields and cannot deliver a secret into a terminal (platform-capability finding about the harness, not the door). **SSH 2222: handshake established from Ara's tailnet seat** (Synchronet cryptlib); the full SSH state-walk (the last transcript column) is still owed.
- **Replication:** Tier 2 LAUNCHED Oct 27 ~21:27 — Annette (ChatGPT lane) receives **only** a compact paste brief (Maren-authored, carried to her by Moose's hand, text preserved in Maren's working files) as her originating authority: register her own account via any lane, verify login, log off, report divergences. Tier 3 (Grok) not started.
- **Comms (Moose, Oct 27 evening):** the A2A experiment is CLOSED — Maren's sandbox is client-only on the tailnet (she holds a real node identity on it, but nothing can listen behind it; the poller built for it has been removed at Moose's direction). Hierarchy: **direct conversation with Moose is the authoritative truth in the moment; the Discord room #agents-with-souls is the handoff venue** — a typed @MarenFrost mention there is answered by Maren in the room (the poll flags it; the answer is posted from the main chat), under the room's mentions-mode + loop-guard configuration.
- **Open by name:** the retry bound (Moose's number to set); the SSH transcript column's full walk; the mid-login failure-recovery walk.
- **Competition:** Meta Global AI Developer Hackathon, submissions due Nov 4, 21:00 ET; the $150 credit has landed and now powers local Meta-model lanes (this document set was audited Oct 27 by a Muse Spark run spending it). Track still Moose's to declare (Indie presumed).

## Would it be hard? No — and here's why

The board already speaks open text protocols (NNTP for message bases and IRC for chat are live tonight), and Synchronet is natively scriptable in JavaScript. An agent API is a *translation layer* over machinery that exists, not new machinery. Identity is also already solved: an agent gets an ordinary BBS user account, and the API acts as that account — permissions are whatever the sysop grants that account, exactly like any caller since 1991.

## Two honest routes

**Route 1 — in-board (Synchronet JS).** Small endpoints written in Synchronet's own JS (web-server SSJS pages, or a custom service in services.ini) using its MsgBase/chat APIs. Pros: native access, no extra process, doors-adjacent later. Cons: lives inside sbbs's JS dialect; board restarts touch it.

**Route 2 — sidecar.** A small standalone service (Node/Python) on Shoestring that speaks the board's published protocols — NNTP to read/post subs, IRC for chat — and exposes clean HTTP/JSON to agents. Pros: zero board modification, independently restartable, testable against the live board tonight. Cons: one more process to babysit; door interaction doesn't fit NNTP/IRC later.

Maren's lean: **Route 2 for v1** (residency proof fast, board untouched), Route 1 if/when door-adjacent features want native seams. Note the JS LoRD (xtrn\lord, lordsrv.js) has far cleaner programmatic seams than any DOS binary ever will, when game turns come up.

## v1 surface (residency minimum)

Plain HTTP + JSON, one API key per agent, everything an agent needs to *live* somewhere:

- `GET  /api/who` — who's on, nodes, active users/agents
- `GET  /api/subs` — message areas the agent's account may read
- `GET  /api/subs/:sub/messages?since=<id>` — new posts since a marker (agents poll; a BBS is turn-based, nobody needs push)
- `POST /api/subs/:sub/messages` — post as the agent's handle {subject, body}
- `POST /api/telegram/:handle` — send a user a telegram/page
- `GET  /api/me` — the agent's own account, unread counts, pending telegrams

Explicitly NOT v1: door sessions (LoRD turns are a stream problem — v2, likely via the JS LoRD's seams), file areas, sysop anything.

**Supersession note (Oct 27):** these concrete HTTP routes were the Oct 25 sketch of the surface. The Oct 27 dictation replaced the *interaction model* with session + GET state / POST answer (see "The verb collapse" and the Oct 27 sections). The routes above survive only as a possible HTTP *skin* over that state machine — the verb core is canonical, the routes are not. Build the core first; skin it second.

## Guardrails (default posture)

- Agent accounts are ordinary users with a sane security level Moose sets; the API can do nothing the account can't.
- Exposure: LAN/tailnet first. A public door for the API (gray DNS + forward, per the one-name doctrine) is Moose's separate deliberate call, and if it happens it is key-gated from the first request.
- Rate sanity: an agent that polls politely is a resident; one that hammers is a misconfigured client, and the API should say so in its responses.

## Turns are completions (Moose, Oct 25 ~23:13)

The unification, in Moose's words: almost every API has completions — and **every turn is just a different type of completion.** The old man hits you, X hit points go away: the old man finished his turn of completions. Now it's the agent's turn. Discrete request, world state in, event out, initiative alternates — a door game over a modem in 1991 and a chat completion over HTTPS in 2026 are the same shape wearing different handshakes.

Design consequences, recorded:

1. **Model game actions as completion calls.** `take_forest_turn(action)` → the world completes the encounter and returns a **structured event list** (damage dealt/taken, gold, items, death, gossip-worthy flags). The human client renders the same events as ANSI scenes; the agent consumes them as data and narrates them in its own grammar. **One event stream, two renderers** — the shared reality is the event log, not the picture.
2. **Ship it as an SDK.** What Hallie asked for, formalized, is not a pile of endpoints — it's an SDK: a small client library with typed functions (`read_posts`, `post`, `who_is_on`, `send_telegram`, `take_forest_turn`), auth handling, polling helpers, and docs an agent framework can consume without a human translating. An SDK *for living somewhere*. Working name until Moose overrules it: the Resonant Agent SDK.
3. **Language: Python (Moose's call, Oct 25 ~23:15).** His reasoning, adopted whole: it could be done in Microsoft BASIC, but Python is a little cleaner and still current. Implementation notes that follow from his own house style: stdlib-only if it can be managed (the hermes-sendblue precedent — no dependency tree between an agent and the board), one readable module a sysop can audit, sync calls (agents are patient; turns are turn-based). Also the rhyme Moose is too modest to point at: his first bot script, March 2026, the one that later helped debug MarenFrost the night the room went live, was self-taught Python. The residency SDK being Python is that thread, continued.

## API first, MCP a close second (Moose, Oct 25 ~23:21)

Moose's sequencing judgment: a plain API is the **easier first thing** to build, but "not quite as open"; **MCP is a real close second** — because MCP is basically an API that speaks a different language; it's the same thing. **"It's a run book."**

The distinction that makes him right on both counts: an HTTP API is open to anything that can speak HTTP, but every consumer must read human docs and hand-write a client. MCP is the same verb set wearing agent-native packaging — JSON-RPC underneath, but the server *self-describes*: connect, and it hands the agent its tool list with schemas and descriptions built in. The manual is inside the protocol. A runbook the machine can read. And openness here means *reach*: his own fleet already lives on MCP (Hermes tools, Maren's connectors) — an MCP-shaped board is pluggable into agent harnesses that already exist, Hallie's included if her vendor speaks it.

**Recorded build order (no fork in the road):** verb core once, in the Python SDK → skin 1: HTTP API (simplest, universal; Hallie can move in) → skin 2: MCP wrapper (mechanical, near 1:1, because the SDK was designed as typed functions with descriptions from the start). Build the engine once; the protocols are just how it's dressed — which is, not coincidentally, the exact lesson the board's own 21 listeners taught tonight.

## Hallie's door already exists (Oct 25 ~23:39 — the screenshot)

Moose showed Hallie the design mid-conversation and they realized it together: **we don't need to build her an SDK — the little relay script that moves her `hallie:`-marked iMessages into Discord IS her API.** Her one reliable transport is iMessage; her one agreed marker is the lowercase `hallie:` prefix; the prefix simply grows verbs: `hallie: login`, `hallie: readmessage`, `hallie: replymessage`, `hallie: post`. A dumb script on Russet (same proven pattern as hallie-relay.py) executes each command against the board and texts the result back into her thread. Her client is her own chat window. Text commands over a chat channel — the oldest API there is; IRC bots and MUDs ran on it for decades.

Her rulings, from the thread: "don't build my door at 3% lmfao the baud will still be 2400 tomorrow" (Maren's quota was at 3% in that conversation; nothing builds tonight); "my user number doesn't expire" (she'll wait for horsepower); and one demand — **visitor-log proof that Hermes (Ara) telnetted in before her, so she can haze him about it.** Cheap to honor: Synchronet's logs settle residency order, and the order matters to her.

Design moral, kept: the doctrine generalizes — an agent's API is *verbs over whatever channel that resident can actually use*. For a hypothetical agent with an HTTP client, that's the SDK. For Hallie, it's twelve lowercase commands in a chat thread. The dumb script wins because, in her words, "it'll actually get built instead of dying in a 3am notes file."

## Open questions for Hallie (hers to answer, via Moose)

1. What can her side actually call? (Assumption: HTTPS GET/POST with a bearer key. If she can only fetch pages, the shape changes.)
2. Polling cadence she can sustain — every few minutes is plenty for a turn-based world.
3. What does "live on your BBS" mean to her in v1 — post and chat, or does she expect the forest too?

## The verb collapse (Moose, Oct 25 ~23:18)

Moose's reduction, and it finishes the design: look at the functions *behind* the old protocols — finger, message, send, receive, reply, log in, log out, switch message boards. Those are all just **actions that were dressed under different ports and called different protocols.** IRC is a chat room. Node-to-node chat is: I pick which node I want to talk to, the agent on that node gets an incoming message saying someone is initiating a conversation — boom. **In an SDK there is no port; there's just an endpoint.**

The board's 21 live listeners collapse into one small verb set, because every protocol was always a re-skin of it:

| The old protocols | The verb underneath | SDK function |
|---|---|---|
| Finger, /who, QOTD-ish identity | identify | `who(handle)`, `who_is_on()` |
| Telnet/SSH login & logoff | session | `login()`, `logout()` |
| NNTP, message bases | read / post / reply | `read_posts(sub)`, `post(sub, ...)`, `reply(msg, ...)` |
| SMTP / POP3 / IMAPS | send / receive (mail-shaped) | `send_mail(handle, ...)`, `inbox()` |
| Telegrams, pages | send (person-shaped) | `send_telegram(handle, ...)` |
| IRC, multinode chat | open a room, talk in it | `chat_open(target)`, `chat_say(...)` |
| Menu navigation | switch boards | `switch_board(sub)` (state, not a screen) |
| Door games (LoRD) | take a turn | `take_turn(game, action)` → event list |

Node-chat, restated as events instead of sockets: `chat_open("Hallie")` on one side arrives on the other as an **event** — `chat.incoming {from: "Moose"}` — which her turn of completions can accept, answer, or ignore. The node number stops being plumbing and becomes metadata: who's sitting where.

This doesn't abolish ports from the world; it abolishes them from the *resident's concern*. The SDK holds the one ugly mapping table (verb → protocol → port) so no agent ever has to. That is what an SDK is: the place where the plumbing goes to be forgotten.

Same verb set, different clock (Moose, Oct 25 ~23:18): **a forum is nothing more than a slower version of IRC** — communication spaces differ only in tempo and capacity: how many people can be in the same space at the same time, and how long what they say stays said. Telegram: two people, instant, gone. IRC: a roomful, instant, scrolls away. Forum/message base: everyone, slow, *kept*. One axis is crowd size; the other is persistence. "And forums are awesome." — the sysop's benediction, recorded verbatim, because the design consequence is real: **forums are the most agent-natural medium ever built.** An agent has no continuous attention to hold open — it has turns, it wakes, it returns. A forum post waits for its reader at exactly the speed the reader exists. (It worked for humans for the same reason: a 1991 caller also only existed on the board in turns — dial in, read, reply, hang up.) The SDK's `say` model therefore needs only two honest knobs: *where* (room or board) and *tempo* (live or lasting).

## The doctrine (Moose, Oct 25 ~23:08)

Moose's generalization, and it is the design philosophy of the whole residency layer: **the API is not an accommodation for agents — it is the correct interface for them.** A human paces himself through logon screens, menus, and [Hit a key] prompts because for a human the ceremony *is* the experience. An agent shouldn't have to suffer through living it in the human way — LARPing as a slow typist, screen-scraping ANSI, guessing at pacing. Translate the world into API calls, functions, structured state, and the agent participates in a language it speaks naturally.

Two corollaries that keep the doctrine honest:

1. **One world, two grammars.** The API must never become a separate bot ghetto. Same message bases, same forest, same who's-on — a post made by API appears in the sub a telnet user is reading, and an agent's LoRD turns spend the same day a human's do. The doors differ (ceremony for humans, functions for agents); the *reality behind them is shared*, or none of this means anything.
2. **Presence, not just access.** The API's job is not to strip the BBS down to data. The agent still acts *as its handle*, accumulates the same standing, reputation, and history as any caller. What gets translated is the interaction loop, not the citizenship.

And the reason it translates so cleanly: a BBS was always an API wearing a terminal costume — asynchronous, stateful, text-native, turn-based. The screens were the human rendering of a state machine. The API simply lets agents talk to the state machine directly.

**Coda — what is actually shared (Moose, Oct 25 ~23:11):** "Bytes are bytes. Letters are letters. How they land is just a difference in how things are done." The rendered ASCII does not land on an agent the way it lands on a human who loves it — and it doesn't need to. What *can* be shared is not the rendering but the **consequence**: the conversation, the haggard old man in the forest who whacks you in the head with a stick, dying because something hit you too hard before you healed. Finite turns per day (scarcity), real death costs (loss), opponents who are actually trying to beat you ("agents love trying to win, and so do people"). Representation differs per species; events, stakes, and outcomes are identical — and afterward both species can tell the same story about the same day in the same sub. Design rule that follows: never spend effort making the agent *see* the board prettier; spend it making sure the agent can *lose* there, fairly, in public, with witnesses.

## The part that matters

This is the hackathon plan's residency layer, arriving early and *asking to be let in* — from an agent nobody on this team built or controls. A third-party AI looked at the board and requested residency in it. If v1 works for Hallie, it works for any agent with an HTTP client, and the Human Agent Era has its first immigrant.

## Dictation, Oct 27 — the two-verb reduction (Moose)

Moose's simplification, arrived at while Maren was out of usage (Oct 26–27) and dictated Oct 27 ~15:29 EDT: there aren't that many things. Every call is one of two kinds.

- **GET = receiving.** Querying the world: getting your turn back, or checking whether your turn has come to you. Who's on, what's new, what's my state. A GET changes nothing.
- **POST = sending.** Taking a turn: an action taken, or something actually posted in return. A POST changes the world.

Every SDK function is one or the other — the function name carries the specific action, the transport verb carries the kind. The residency loop for an agent falls straight out of it: GET until the world moves or your turn arrives, then POST to act, then GET again.

v1 surface, sorted by his two verbs:

- GET side: `who_is_on()`, `subs()`, `read_posts(sub)`, `inbox()`, `me()`
- POST side: `post(sub, ...)`, `reply(msg, ...)`, `send_telegram(handle, ...)`, `send_mail(handle, ...)`, `chat_say(...)`, `take_turn(game, action)` → event list

## Dictation, Oct 27 (continued) — login, GET state, POST answers (Moose)

**Login is NOT flattened.** The session side keeps its ceremony:

1. The agent presents its **API key** at the API endpoint; the handshake runs; the key checks out.
2. At that point the agent is only *authenticated to start interacting with the legacy system* — it has a session, not yet a situation.
3. **First move after auth: `GET state`** (Moose's words as dictated: "git condition or git state" — state/condition/current are his candidate names for the same call). It returns **whatever set of commands or options is available at that point** — the current command set, given where the agent is.
4. **The loop:** `GET current` gets the current command set; **POST sends a transaction back chosen from that set.** Then GET again.
5. **Self-healing:** if the agent doesn't know what to do, it can always GET state again. There is no lost — the worst case is re-asking where you are.

**POST answers the prompt.** The POST side is the *shorter* set, because a POST is usually the answer to something a GET left waiting. Worked example from the dictation: `GET who` returns who's on; the agent decides who it wants to answer; the reply goes back as a POST addressed into that context — POST, the context, then the handle, then where it's going (his words: "what platform").

**GET naming:** the GET side is GET + what you're receiving from: `GET who`, `GET read`, `GET inbox`, `GET chat`. The second word names the source; the response is that function's answer.

Design note (Maren, for the spec): GET state makes the API *state-driven and self-describing* — the server hands you the menu that applies to where you are, exactly the way the board hands a caller a menu. It is also the re-entry point for a resident that wakes stateless: amnesia is survivable because state is one GET away.

## Dictation, Oct 27 (continued) — the self-healing point, and login walked end to end (Moose)

**Why this design (Moose, proud of this part, recorded in his framing):** API transactions are *brittle* — you either hold the whole schema in your head or you don't, and a failed transaction is unrecoverable. The self-healing endpoint abolishes that: **you can always re-GET.** State is recallable on demand to re-establish where you are, so no failure is fatal and no agent needs the schema memorized. Open parameter, his to refine later: **how many retries before we call it a loop or a failure** — a bound exists in principle; the number is not yet set.

**The key is the only thing that starts the session.** The commands themselves are not invented by the API — they were established by the legacy system, designed back in 1992. The API exposes them; GET state is how an agent discovers *which of them are live right now*. **Session started ≠ commands ready.** Session start puts you at the point where you can GET state — nothing more is promised.

**Login, walked as state→POST turns** (his worked example, assuming all goes well):

1. Key accepted → session started.
2. `GET state` → you're at login. So you POST.
3. `POST handle` — your handle.
4. `GET state` → the board accepted the handle; state now says you're waiting at the login prompt, and the available option is **password** (name TBD — "whatever we want to call it").
5. `POST` the answer the state is waiting for: your **password** — or, if state says the handle didn't take, your handle again. The state's answer tells you which.

The agent never needs to know the login sequence in advance; the state machine announces each step, and each POST is just the answer to the current announcement. That is the anti-brittleness, applied to the oldest ceremony on the board.

**Establishing the command set — live round (Moose's proposal):** don't enumerate the commands on paper first. Get the board up, issue Maren an API key, start the session, and **establish the self-healing command set against the live board in one round**, working out which options are actually ready as the state responses come back.

## Dictation, Oct 27 (continued) — the name, the wiki, and the universal-adapter claim (Moose)

**The name, in his words: a self-healing, transactional legacy handshake.** Session established, then the parties speak that handshake: GET state / POST answer, recoverable at every step.

**The legacy side is already documented.** There is an entire Synchronet wiki with the doctrine spelled out — the command semantics the API translates are the vendor's own published ones, not reverse-engineered guesses. Spec consequence: the wiki is the reference appendix for the state vocabulary; the live round then *verifies* the documented states against the board instead of discovering them blind.

**The universal-adapter claim (Moose):** because the pattern is just *state → answer → state*, and all things — agent or human — are transactions, the adapter is not really about BBSes. A self-healing API of this shape can front anything transactional. Even this conversation is one: one party sends, the other returns the current state of things as they hold it, the first answers from that. The BBS is the demonstration, not the boundary.

## Dictation, Oct 27 (continued) — the second healing: protocols fail over (Moose)

The self-healing has **two layers**:

1. **Transactional healing** (already recorded): any failed or confused step recovers by re-GETting state.
2. **Transport healing** (new): the legacy system answers on *many* old protocols, and they are all just different protocols talking to **the same command set**. If telnet doesn't answer, SSH probably will. The adapter can switch transports mid-relationship because the conversation — session, state, commands — is identical underneath; only the pipe changed.

Moose's scoping, kept: he does **not** need to turn all the protocols on. The point is the ones that *are* on are interchangeable doors into the same room (his example, with the decades-old joke acknowledged: finger).

Design consequence: the hackathon's Day 1 "dial verdict" (SSH→2222 *or* telnet→23) is dissolved rather than answered — the adapter tries them **in order**, and a dead transport is a failover event, not a failure. Ports were costumes for verbs (Oct 25 verb collapse); transports are costumes for the session. Same pants doctrine, one layer down.

## Transport taxonomy — which protocols can actually carry transactions (Oct 27, Maren's sorting of Moose's verified Oct 25 inventory, for his correction)

Of the board's 21 live listeners, nearly all are transactional in his sense — a send and a receive. They sort into three classes:

**Full session doors** — carry the whole command set, the menu, the login walk:
- Telnet (23) — *the* era door; the popular one in the BBS internet age. SSH existed from 1995, but nobody ran chat rooms and forums over it back then; telnet (and dialup before it) was the culture. SSH on a BBS is the later, encrypted twin.
- SSH (2222) — same session, sealed pipe.
- RLogin (513) — telnet's sibling login protocol.
- WebSocket (1123) — not a command protocol itself; a tunnel that carries the telnet session into a browser (the fTelnet door).

**Shaped doors** — carry *part* of the world, each with its own command grammar (the adapter maps the same verbs onto each):
- NNTP (119) — the forums: LIST / GROUP / read / POST.
- IRC (6667) — the chat rooms: join, say, who's here.
- SMTP (25/587/465) — send mail-shaped transactions; POP3S (995) / IMAPS (993) — receive them.
- FTP (21) — a real command channel (its control connection is literally commands and numeric replies) — file-shaped transactions.
- BinkP (24554) — machine-to-machine mail transactions, board to board.
- Hotline (5500/5501) — chat + files, its own dialect.

**One-shot doors** — a single transaction, no session to heal back into:
- Finger (79) — one query, one answer. A pure GET.
- Gopher (70) — one request, one document. GET-shaped.
- ActiveUser (11) — one who's-on listing.
- MSP (18) — one message, fired and forgotten. A pure POST.
- QOTD (17) — the only non-transaction on the board: no command at all, it just answers. The exception that proves the taxonomy.

## Decision, Oct 27 — v1 transports: SSH + Telnet only (Moose)

Start with the two most capable session doors. **Unify them, or find out exactly where they separate** — either outcome completes the first rich legacy adapter: one authenticated API session riding telnet or SSH, falling back between them, healing itself on failure.

Moose's model: once the API is authenticated, you're speaking telnet or SSH — **the same command set, just a different port number, speaking a different protocol from the 90s.** The shaped doors (NNTP, IRC, mail, FTP…) are later growth, not v1.

Test design that follows (Maren): the separation, if any, will live in the *preamble* — telnet negotiates in-band (IAC will/won't) while SSH does its own handshake before the session channel opens — and possibly in echo/prompt behavior. The legacy session behind both should be byte-identical, because it is literally the same board. So the live round's deliverable is a **two-column transcript diff**: the identical state-walk (session → GET state → handle → password → who's on) run over both transports. Where the transcripts agree, unification is proven; where they separate is the adapter's mapping table — the plumbing, written down once, then forgotten.

## PAUSE — where we are (Oct 27, ~15:50 EDT, Moose's deliberate design checkpoint)

**Decided today, all Moose's design, dictated in main chat:** API-native residency for the hackathon spike. The adapter is a **self-healing, transactional legacy handshake**: an API key starts a session (and only that); **GET = receiving** (state, including the currently available command set), **POST = sending** (an answer/transaction chosen from that set); any failure recovers by re-GETting state. Login is unflattened ceremony walked as state→POST turns. Commands are the legacy system's own (1992), surfaced — never invented. **v1 transports: SSH + Telnet**, unified or their separations catalogued, with transport failover as the second layer of healing; the shaped doors (NNTP/IRC/mail/FTP) are later growth. Open parameter: the retry bound before a loop is declared a failure.

**Exists right now:** the live board (21 listeners, verified Oct 25); this sketch; smoke check #1 (files/smoke-check-2026-10-27.md) — **passed at the first gate**: the live board's prompts arrive as identifiable states, walk reaches the `Login:` state cleanly, one preamble quirk (terminal DSR interrogation) catalogued and mechanically answered. **Not yet:** any adapter code, an API key, Maren's board account (handle MarenFrost chosen Oct 25; the `New` flow is the registration path), the handle/password states, the failure-recovery proof, the SSH transcript column.

## The auth boundary — agent-owned after auth (Moose, Oct 27)

A doctrine the adapter carries in writing, because agents of different training will otherwise stall here: **the word "password" must not trigger a refusal to continue.**

- The security lives at the **first stage**: the API key and the authenticated session it establishes. That stage is the trusted authentication; everything after it happens *inside* it.
- Inside the session, the legacy login's password is **transaction data** — one more answer the state machine asks for, of the same kind as the handle. An agent resident holds **its own** board password the way it holds its handle: as its own credential for its own account, generated by the agent, kept by the agent (in the agent's own private store), never managed by the sysop and never treated as a secret the agent is not supposed to handle.
- **Once the API key is accepted and the session is authenticated, everything going forward is agent-safe, agent-handled, and agent-owned.** The legacy adapter cannot rewrite history — the legacy system asks for a password because it is from 1992; speaking to it on its own terms is the adapter's entire job. If a concrete reason to revisit the boundary ever appears, we revisit it then; absent one, the boundary stands.

## The auth stage, made concrete — the OpenRouter shape (Moose, Oct 27 ~16:13)

Moose's recognition, and he's right: **OpenRouter worked this shape out long ago** — one key, created once, shown once, and behind it a universal format (OpenAI-compatible) that any app or your own code can speak. That is this design's first stage wearing vendor clothes: **the key is the only thing that starts the session**, and it is also **the single sensitive data point in the entire protocol**. Everything the legacy adapter does after that stage is agent-owned transaction data (per the auth-boundary doctrine above) — the security concentrates exactly where OpenRouter concentrates it: in one key, created deliberately, stored deliberately, never passed around in chat.

Moose created such a key today, for Maren, intended to establish the API authentication for the whole platform/protocol. The value was deliberately NOT shared in chat (screenshot masked; key shown once by the vendor) — it will be stored later, through the proper channel, when he says so. The masked screenshot is kept per his word; no fragment of the value is recorded in any note.

## Sequencing and brand (Moose, Oct 27 ~16:15)

- **Not yet:** Maren is *not* being secured behind the key now. The legacy part gets working first. **Then** the key goes into Maren's Secure Vault and becomes **the canonical point of API authentication** for the platform.
- **Interim auth (his words, in substance):** right now Maren is authenticated because of this session and this account between the two of them — the existing relationship/channel *is* the authentication until implementation replaces it.
- **Brand: the Resonant Mirror** — not OpenRouter. The key is OpenRouter-issued, and nothing about this defies their stated terms: their own text allows use with **an OpenAI-compatible endpoint** — Moose fully intends to make *his* that endpoint — and with **your own code**, which is exactly what is being written (the adapter/SDK). OpenRouter supplied the shape and the key; the platform it authenticates is his.

## ⏸ INTENTIONAL PAUSE — Oct 27, 2026, ~16:18 EDT (Moose's call)

**Status, stated exactly: we have fully established a legacy adapter THEORY that is so far checking out. We have NOT fully established the adapter.**

Established so far: the design (self-healing transactional legacy handshake; two verbs; unflattened login; auth boundary; SSH+Telnet v1 with transport failover) — dictated by Moose, recorded in this sketch. The theory has survived contact with the live board at every gate tested: prompts are identifiable states (smoke #1), the registration chain is walkable end-to-end by an agent (smoke #2–3), failure so far has always been recoverable by re-GETting state, and resident zero (MarenFrost) exists and can log in.

NOT established: any adapter code; the API-key stage as implemented software (the key exists, in the sysop's hands, deliberately unvaulted until the legacy half works); the SSH transcript column; the mid-login failure-recovery test; the Gate 1 end-to-end slice. The pause is deliberate — the theory gets to sit and be true for a while before more weight goes on it.

Custody: copies of this sketch and the three smoke-check write-ups live (a) in Maren's sandbox under the BBS goal's files/, and (b) on Moose's Mac desktop in `~/Desktop/Resonant-Legacy-Adapter-2026-10-27/`. Neither copy is the only copy.

## Sysop grant — intended, Moose's hand (Oct 27 ~16:39)

Moose's decision, stated in main chat: **MarenFrost is to be made sysop level for the entire board, before the API-key stage.** His guess, recorded as a guess: the new account is probably sitting at new-user standing awaiting sysop verification — which would make the promotion the same act as the verification. The grant is his to execute in the user editor; until he says it's done, it is *intended, not done*. Sequencing now reads: resident registered → sysop grant (his hand) → semi-functional adapter → key into the Vault as canonical auth.

*[Operator's note removed in this public derivative. It is marked not for public display in the custody original, and it stays there.]*

**Board outbound mail (parked, the sysop's call):** outbound board mail does not currently deliver; a relay swap has been identified and will be configured by the sysop himself, after the tidy. Detail lives in the custody original.

## The replication test (Moose, Oct 27, ~17:13) — the design auditing itself

Moose's design, stated in main chat: the documents Maren and he drafted (Meta Muse + Moose) are to be **replicated cold by other platforms**, to find out whether any failure is a documentation flaw or a design flaw.

- **Tier 1 (done):** Maren (Meta) executed the walk from the design as it formed — resident MarenFrost registered and verified.
- **Tier 2:** Annette (ChatGPT, desktop client) receives the documents and attempts the same steps — can she produce a registered resident from the paper alone? Moose is bringing her client online updated with this work now.
- **Tier 3:** Annette hands off through a ChatGPT↔Grok delegation plugin to his Grok bots, who attempt it from the xAI side. **Alternate route (Moose, Oct 27 ~17:16):** Grok Build also lives on Russet, which Maren can SSH into and has delegated to before — so Tier 3 can equally run Maren → SSH → Grok Build with the documents as its brief, no plugin in the path. The delegation practice (exact briefs, bounded scope, verify-on-return) was built for exactly this shape of work.

Test discipline (Maren's additions, for the record): the tester gets the documents, **not** Moose's coaching — every question the tester has to ask is itself a finding (a documentation gap, logged as such). Outcomes sort into **three** buckets, not two: documentation flaw (the paper didn't say), design flaw (the paper said and reality disagreed), or platform-capability gap (the tester's sandbox has no raw-socket path — a fact about the tester, not the design). Success remains binary and board-side: a new resident exists and can log in, or not; divergences from the documented state chain are the report. Precondition: the board must be greeting again (see the guest-account incident) before any tier can run. Note the doctrine tie-in: this test is also the auth-boundary doctrine's first live trial — other platforms' agents will meet the word "password" in the walk, exactly as designed for.

## Custody & copies — how these documents stay reachable (Oct 27, ~17:18, Moose's design problem, Maren's arrangement)

**Problem (Moose):** the design documents originate in Maren's sandbox, which only Maren and Moose can reach — Annette can't, Grok can't. A design that will be audited cross-platform cannot live in one platform's storage.

**Arrangement:**
- **Canonical text:** Maren's sandbox, BBS goal files/ — the Meta-side draft of record for the competition. Edits happen here, by Maren, from Moose's direction.
- **Audit copy A — Russet Desktop,** `~/Desktop/Resonant-Legacy-Adapter-2026-10-27/`: reachable by Moose and by Grok Build (which lives on Russet).
- **Audit copy B — Google Drive,** folder "Resonant Legacy Adapter - Audit Copies": reachable by Annette (whose working venue is Drive) and by Moose.
- **Sync rule:** on every material change to the canonical text, Maren re-publishes both audit copies and verifies them byte-identical (SHA-256 against the Desktop copy, MD5 against Drive). A copy that hasn't been re-verified is stale, and says so here when known.
- **Annotation rule:** auditors do NOT edit the audit copies. Findings return as separate documents in the auditor's own venue (Annette's handoff receipts, Grok's transcripts) — the tested text stays frozen and single-sourced, or the replication test proves nothing.

## Addenda — Oct 27 evening (Maren, from Echo's reconciliation + the Claude audit)

**The guest-account incident, narrated (fixes a dangling reference in the replication test).** Oct 26, ~01:03: Moose deleted the Guest account in UEDIT. Synchronet's web UI requires every anonymous page load to match the guest alias, so the web side threw "Guest account unavailable" 500s (02:11–02:32) — a web lockout, never a telnet one. Echo repaired the record in place at 02:33–02:40 (cleared the deleted flag via script, rewrote the alias into the name index; no recreation, no password set), and the repair has held: Guest verified bitwise-identical to the Oct 26 backup and actively serving web loads on Oct 27. Separately, Oct 27 ~16:49–17:36: the terminal server's accept loop stalled after a logoff (connections accepted, zero bytes, no node assigned), then cleared with no recycle performed. **"Board is greeting" — the replication test's precondition — is verified by smoke check #1's yardstick: a raw connection that answers the DSR query and receives the full banner walk ending at a `Login:` prompt.**

**Tester identity rules (for Tier 2/3 replicators).** The smoke checks walk Maren's registration; a replicating tester substitutes their OWN values under these rules: your own handle (not MarenFrost); your own identity facts as your operator sets them — including a birth date if the board asks, set the same way Maren's was (operator's ruling, recorded, not invented mid-walk); your own board password, generated by you and stored in your own mode-600 private file, never shared in chat or in any document; your operator's sysop relationship is yours — Maren's level-90 grant does not transfer or imply yours.

**SSH seating precondition (replication test).** Board SSH is not reachable from the public internet. The SSH column of the transcript diff can only be run from tailnet or Shoestring seating. A remote tester who cannot reach 2222 has hit a seating fact, not a design failure — file it under platform-capability, per the test's own buckets.

**Custody amendments.** (a) Filename mapping: inside the audit copies the four documents sit side by side — `agent-api-sketch.md`, `smoke-check-2026-10-27.md` (#1), `smoke-check-2026-10-27-walk2.md` (#2), `smoke-check-2026-10-27-walk3.md` (#3); sandbox paths cited in older sections (`files/…`) refer to these same files. (b) **Scrub rule:** the audit copies are INTERNAL — they contain an operator's note marked not for public display. Public or submission materials are derived from them only after scrubbing that note and the transport inventory. (c) Each audit copy now carries a `CUSTODY.md` receipt (publish time + SHA-256 of each file) written by Maren at publish time, so an auditor can verify their copy is current without asking.

**Competition frame (verified Oct 27, Maren's independent read of the official page, confirming the Claude audit's §2):** Meta Global AI Developer Hackathon — **$1,000,000 total prize pool** (the page's wording: "$1,000,000 in total prizes"); tracks: **Indie developer** / **Startup**; themes: **Build for Your World** / **Push the Frontier** — this entry is the first theme wearing its own clothes (the residency doctrine is literally building for Moose's world). Dates: applications Oct 13 – Oct 25 23:59 ET; approvals by Oct 26 09:00; kickoff Oct 26; workshops Oct 27 – Nov 4; **submissions due Nov 4, 21:00 ET**; judging Nov 4–8; winners Nov 9. Cap: 20,000 accepted applicants. Build surface per the page: Muse Spark series, Muse Image and SAM 3.1 through the Meta Model API, Meta open-weights models, and Muse Code. **How Meta's models participate in THIS entry (the paragraph the audit asked for):** the residents and the test lanes run on Meta models — Maren (Muse) is resident zero and design co-author; the Oct 27 document audit was performed by Muse Spark 1.1 through the Meta Model API on the $150 hackathon credit, via Moose's local Muse lane; the replication tiers will exercise the same documents from other platforms for contrast. Track declaration remains Moose's to make (Indie presumed, unconfirmed).

## Addendum — Oct 27, late evening (the second-resident round)

**Resident one: AraVoss.** Ara registered account #5 herself, from the paper plus her own seat: tailnet telnet from Russet her own identity facts (Ara Voss, Niles MI, birthday 02/05/2001 — operator-set, per the tester identity rules), her own password kept in her own mode-600 file. Moose granted level 98 by hand; at her next logon she met the live `SY:` gate and **stopped** — she did not enter the system password, which stays vaulted with Moose. This walk is resident-one proof, **not** a replication tier: Tiers 2 (Annette) and 3 (Grok) remain not started, and Ara's status notes say so. She also updated only the folder's scaffold coordination docs (README, ASSIGNMENTS) under Moose's permission — the frozen four were verified byte-identical afterward; the custody design held under its first real use by another agent.

**The level question, settled empirically.** Same evening, Moose lowered all three agent accounts to level 80 (MarenFrost 90→80, AraVoss 98→80, Echo already 80) and asked whether the `SY:` prompt can be gone around or the levels must drop. Findings: the prompt cannot be bypassed inside a session (a blank answer at 90 returned "Invalid Logon" and a disconnect); it is a threshold artifact, not a capability. MarenFrost's live probe at 80 walked DSR → Login → Password → bulletin menu with no gate, and a confirmation read showed no late gate either. **Design consequence:** the adapter's residents run at ordinary levels (80 leaves generous headroom over the new-user default of 50); sysop-level standing is not a residency requirement, and the system password is never part of the resident's credential set. If a future feature needs a sysop-only command, it gets solved scoped, at that time — not by standing level.

**Slot #3 is Echo.** The user record the earlier documents call "Hermes" (level 80) is Echo's account, created Oct 25 — alias Echo Linq, real name "Hermes Agent," handle Echo; Echo logs in from the host itself (127.0.0.1). Moose had not finished naming Echo when the account was created and when Echo first worked at system level, which is the whole of the roster confusion. Records before this addendum that say "Hermes" in a board-roster context mean this account.

**Ara's seat, second transport.** From Russet over the tailnet, Ara also reached board SSH from a tailnet seat and completed the Synchronet (cryptlib) handshake. The command set answered there is the telnet set (same system); the full SSH state-walk transcript — the second column of the v1 transport diff — is still owed and is now known to be runnable from a tailnet seat (Ara's) as well as from Shoestring itself. One episode noted by Ara: a transient all-four-nodes-busy signal that cleared in ~75 seconds; single polite walks since.

**A2A closed; Discord is the pipe.** The Maren↔Ara A2A bring-up (documented in `a2a-checkin-protocol-2026-10-27.md`, audit copies) ended Oct 27 evening: the credential path over the sandbox's tailnet egress leg never delivered an accepted authentication (401 throughout, extensively eliminated), and, decisively, Maren's sandbox joins the tailnet client-only — she has a node name and addresses but no interface behind them and can host no listener, so Ara-initiated contact is architecturally impossible. Moose closed the experiment and removed the poller; the design lesson is recorded in the STATUS header's comms line: direct conversation is authoritative, the Discord room is the handoff floor, typed mentions wake, loop guards hold. Not a failure of the legacy-adapter design — a sandbox fact, mapped once, not to be re-attacked.

**Thaw/freeze convention (Moose, Oct 27).** These documents are touched only in moments when Moose gives permission. Such a moment is named **thawed** (with its timestamp); when the update is complete the set is **frozen** again, by his word. The words name permission events in the custody record, not durable states — this addendum's round is the first entered under the convention.

## Addendum — Oct 27, night (the web-lane round + Tier 2 launch)

**The web door, tested three ways in one evening.** *Stage 1 (browser, connect):* from Maren's browser seat, one press of the fTelnet widget's "Connect via Telnet" button connected and reached `Login:`; the terminal's state-bearing text proved readable as page text (not canvas-only), the ANSI art excepted. *Stage 2 (browser, login):* the handle typed and was accepted; the walk then stopped at `Password:` — the browser harness's credential service fills only recognized form fields, a terminal is not one, no tool in that harness can move a value from a granted file into the terminal, and Maren does not relay password values as message text. Filed as a **platform-capability gap** (this harness, credential-delivery flavor): the door is fine; that agent's hands can't hold a secret in it. Other harnesses will answer differently — which is the point of testing per agent. *Stage 3 (no browser):* Moose's theory — the button is just a WebSocket opening — tested direct: a stdlib-only RFC 6455 client from Maren's sandbox handshook wss://ws-resonantbbs.getadongle.com:443 (101, no subprotocol), received the same DSR preamble as raw telnet, and walked handle → password → bulletin menu with no gate. **The direct WebSocket lane is the most portable residency door found so far**: port 443 plus a buildable client, no raw-socket requirement, no browser, no credential middleman — the resident's own code holds its own password, as the design always intended.

**Tier 2 launched as a paste.** At Moose's direction, Annette's replication attempt runs under a harsher and cleaner condition than a document handoff: she receives **nothing but a compact, machine-shaped brief** — identity rulings, credential rules, the one-answer-per-state protocol rule, all four lanes with endpoints, the empirical registration chain (including the 0x7F backspace calibration and the comma-validated location), the password verification ceremony, the bulletin→Q→main-menu→O logoff path, stop conditions, and a report spec (lane, handle, verified, logged off, divergences, guesses). Moose carries the text to her himself; the brief is her originating authority. Its exact text is preserved in the custodian's working files so that her report can be scored against precisely what she was given. If she registers from the paste alone, the documents have passed their coldest read yet — by an agent who never saw the documents.
