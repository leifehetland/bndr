# Bndr

Bndr is a fictional Tinder parody built as an on-screen phone prop for
**The Millennial Project: Dating Roulette** teaser (client: Chase).
It is a mock app: no backend, no real accounts, no network calls except
placeholder images during development.

Forked from the Instalgia prop app (same stack, same conventions). Instalgia's
history lives in its own repo; this repo starts fresh.

## Story context (why the app exists)

- The phone owner is **JR**. Every screen is shown from JR's account.
- Script beat: JR walks into FORKIN' ROAD and checks his Bndr messages to make
  sure he's meeting the right guy, then spots **Suitor #1** (early 30s, white
  collar, perfectly coiffed hair).
- Suitor #1 is **Max** (`public/1.jpeg`). His thread confirms tonight's dinner
  at Forkin' Road and ends with an unread "So excited to see you!", pinned to
  the top of Messages. It is the most important screen for the shoot.
- The other 4 (Derek, Kevin, Luis, Sam; `public/2-5`) have short small-talk
  threads. No placeholder or randomuser photos anywhere: the app runs offline.
- Check the script (`../TMP_TEASER SCRIPT.pdf`) before writing any copy that
  references story events.

## Scope (MVP)

1. **Splash**: Bndr logo + tagline, single CTA into the app.
2. **Swipe**: card stack of male profiles. Drag or tap to swipe left (pass)
   or right (like). Some right swipes trigger a match overlay.
3. **Messages**: match list + chat threads with seeded small talk. JR can type
   and send; canned small-talk replies are fine.

Out of scope unless asked: login, real auth, profile editing, settings, video.

## Stack

| Concern     | Tool                          |
|-------------|-------------------------------|
| Framework   | React 19 + Vite               |
| Routing     | React Router v7               |
| Styling     | Tailwind CSS v4               |
| State       | Zustand (`persist` middleware)|
| Persistence | localStorage (`bndr_*` keys) |

Commands: `npm install`, `npm run dev`, `npm run build`, `npm run lint`.

## Structure

- `src/pages/`: route-level screens (Splash, Swipe, Messages, Chat)
- `src/components/`: shared UI (SwipeCard, MatchModal, BottomNav, ...)
- `src/data/`: all seed content (profiles, conversations). Never hardcode copy
  in components.
- `src/store/`: Zustand stores
- `src/assets/`: logo and bundled photos
- Routes are defined in `src/App.jsx`

## Conventions

- Components and pages: PascalCase. Everything else: kebab-case.
- Named exports from data files, no default exports there.
- Functional components + hooks only.
- Tailwind only. Inline `style` is allowed solely for drag transforms/rotation
  on swipe cards.
- Mobile-first, prop phone viewport: outer container `max-w-[480px] mx-auto` (fills any phone, centered on desktop).
- Timestamps in seed data use ISO 8601.
- No lorem ipsum. Bios and messages must read like real dating-app copy.
- Parody, not replica: echo Tinder's patterns, never copy its logo, flame
  icon, wordmark, or exact UI.
- localStorage keys are prefixed `bndr_`. Provide an easy reset (between
  takes the prop must return to the same starting state).

## Branding

- Logo: `public/logo.png` (square app icon, no text). Rendered via `src/components/Logo.jsx`; also favicon + apple-touch-icon.
- Colors: sampled from the logo (coral #ff5757, purple #c76be5) as theme tokens in `src/index.css` (`@theme`).
  Change the palette there only. Do not scatter hex values through components.
- Look: dark base with the logo's blue-to-purple gradient washed behind every
  screen (`.brand-backdrop` in `index.css`), strongest as a glow behind the
  swipe cards. No light mode: only one look gets filmed.

## Full screen on phones

- Installable web app: `public/manifest.webmanifest` (`display: standalone`) +
  Apple meta tags in `index.html`. On the prop phone, open the hosted URL and
  use Share > Add to Home Screen (iOS) or Install app (Android), then launch
  from the icon: no browser bars.
- Edge to edge: `viewport-fit=cover` + `black-translucent` status bar, so the
  app draws under the status bar when launched from the home screen. Headers
  pad with `env(safe-area-inset-top)`. The `.brand-backdrop` layer is oversized
  so the gradient also fills behind Safari's bars in a normal browser tab.
- Icons: `public/icon-180.png` (iOS), `icon-192/512.png`, `icon-maskable-512.png`,
  all generated from `public/logo.png`.
- Hosted on Vercel (bndr-nine.vercel.app). `vercel.json` rewrites `/*` to
  `/index.html` so deep links like `/reset` work. Static files in `public/` are served before the rewrite.

## Photos (important)

- No GenAI faces, and no photos scraped from real people (GitHub avatars,
  social profiles, etc.). Putting a non-consenting real person's face on a
  dating-app parody that ends up on screen is a likeness/release problem.
- For anything that will be filmed, swap in photos of cast/crew/extras with
  signed releases, saved locally in `public/` and referenced as `'/name.jpg'`
  so the prop works offline on set.
- The swipe deck is exactly 5 cards (`public/1-5`), same order every time
  Discover opens: Max, Derek, Kevin, Luis, Sam. No placeholder extras.
- Cleared so far: `public/1.jpeg` to `public/5.jpeg` (friends who OK'd their
  likeness), used for the first five swipe cards (Max, Derek, Kevin, Luis, Sam).
- Resize big camera originals before dropping them in `public/` (about 1200px,
  upright). Full-size originals live in `photo-originals/` (not shipped).
- Suitor #1's profile photo is the actual Suitor #1 actor (`public/1.jpeg`).

## Working rules

- Read this file before starting a task.
- Ask before changing story-facing copy that the script depends on.
- Keep the app working offline once real photos are bundled.
