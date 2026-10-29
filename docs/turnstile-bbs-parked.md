# Turnstile for the BBS — parked, investigate further

Sketched 2026-10-29 by Ara, dictated by Moose. Status: PARKED. The widget
is to come down in the Cloudflare dashboard (Moose's click); nothing is
wired anywhere and nothing should be until the posture question is decided.

## What exists (verified, not assumed)

- One Turnstile widget in the account: `resonantbbs.getadongle.com`,
  sitekey `0x4AAAAAAFqs_fqIIZ7QI8KR` (sitekeys are public).
- Mode Managed, pre-clearance off, hostnames
  `127.0.0.1` + `localhost` + `resonantbbs.getadongle.com` (3 of 10).
- Dashboard analytics: Insufficient Data — zero solves ever. Nothing calls it.
- Live check 2026-10-29: homepage (200, *Home: The Resonant BBS*), forum
  page, and the login form serve no Turnstile markers at all. No script,
  no `cf-turnstile` div, no sitekey. The secret was never installed
  anywhere — by Moose's own word: "Nope, I didn't."
- "No errors" is expected, not evidence: an uncalled widget cannot fail.

## Moose's concern (his words, kept)

Turnstile's whole pitch is making CAPTCHA not a big deal — it basically
shuts the challenge down for most visitors (Managed: invisible check,
extras only for high-risk traffic). He doesn't want that to quietly become
the BBS's front door posture. Parking it until deliberately decided.

## To investigate later

1. Decide the desired front-door posture for the BBS (registration +
   login): keep the native challenge behavior, or adopt Turnstile there.
2. If adopted: embed the widget in the BBS web templates (web root lives
   off this machine — likely shoestring side), gate the form handlers with
   server-side siteverify (`success === true`, exact action, exact
   hostname), then validate one real solve plus replay rejection.
3. The Spin loop ("copy-paste the brief to your agent") is the intended
   setup path — dashboard half is done; the embed + siteverify half is not.
4. Separate candidate, different widget: the portfolio refinement form on
   www (authenticated POST `/portfolio-api/refinements`). Not this widget —
   hostnames don't cover www. New widget if ever wanted.

Don't poke it further until then.
