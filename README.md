# Bndr

A Tinder parody built as an on-screen phone prop for *The Millennial Project: Dating Roulette*.
React + Vite, no backend. All content lives in `src/data/`.

## Screens
- `/` splash
- `/swipe` card stack (drag or tap ✕ / ♥; some right swipes match)
- `/messages` matches + threads, `/messages/:id` chat with canned small-talk replies
- `/reset` restores the seeded starting state (use between takes)

## Run
```bash
npm install
npm run dev
```
Best viewed at 390px wide (phone or Chrome device emulation).

See `CLAUDE.md` for conventions, story context and photo rules.
