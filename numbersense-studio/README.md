# Number Sense — separate review edition

All **29 original activity categories** and **three bonus games** have implementations in this separate replacement. The original `Maltais239/interactives/numbersense6/`, its hosting and the live Interactive Learning Lab entry remain unchanged by this branch.

## Run and review

The primary app uses buildless HTML, local CSS and native ES modules. Serve this folder with a static HTTP server; opening its `index.html` directly from disk does not reliably load relative modules.

For an offline review copy, run `python3 scripts/build-review.py`. Open the generated `review/Number-Sense-Review.html` in a current browser. It embeds the same modular source using an import map, plus CSS, the font and its license; no server, student account or external service is required. Generated review output is ignored by Git. The source remains split into manageable files for GitHub Pages and maintenance.

## Source structure

| Files | Purpose |
|---|---|
| `catalogue.js`, `previews.js` | All original IDs, six topic groups and exact mathematical menu previews. |
| `app.js`, `registry.js` | Navigation, lazy topic/game loading and disposal when leaving a screen. |
| `activities/*-data.js` | Original examples, controlled generators and mathematical validators. |
| The six topic modules in `activities/` | Mathematical models and feedback for each activity. |
| `math.js`, `models.js`, `decimal-models.js`, `round.js` | Rational arithmetic, model controls, guided operations, hints/retries and complete rounds. |
| `progress.js` | Versioned anonymous tab progress and optional browser remembering. |
| `games/` | Three optional mini-games, single-hit scoring and scoped timer cleanup. |

Rational answers are compared by value rather than display strings. Expressions are structured data; the app does not execute user-supplied mathematics with `eval`. Input sizes and factor computations are bounded. Resizing changes CSS rather than rebuilding the current question or model.

## Student progress and dependencies

No names, accounts, timestamps, public leaderboard, analytics, Canva SDK or runtime CDN. Progress stays in the current tab by default; remembering on this browser is opt-in. Shared Chromebooks have an obvious clear-progress control. Unavailable/quota-limited storage falls back to live session memory and explains the observed limitation on the progress screen. Bonus points are separate from mathematics practice.

Nunito is bundled locally with its SIL Open Font License. All mathematical graphics use native HTML/SVG. Practice draws replace items; probability spaces explicitly state equally likely elementary outcomes. Repeating percentages state rounding precision and use ≈; experiments do not promise that the next batch approaches theoretical probability.

## Verification and release gate

Run `node --test tests/*.test.mjs`. The 31 automated checks cover original content coverage, answers and equivalent forms, model-state validation, area invariants, seeded generation, expression reductions, progress storage failures, repeated-click scoring and disposed timers. The review build also validates every embedded module and import target.

**Rendered browser verification is still pending.** The selected environment has no supported development browser-control plugin. These source and logic checks do not substitute for actual DOM interaction, real timer playback, assistive technology or layout checks.

Before publishing, check 1024×540, 1366×650, 768×900, 390×667, 320×568 and 640×360; zoom; horizontal overflow; 44px primary touch controls; retained in-progress state during resize; completed rounds; touch/keyboard; real game timing and storage paths. Confirm provisional Mrs. Publow and Mrs. Murley credits with Darren. Obtain final review approval, merge only this folder into current main, verify GitHub Pages files, then capture the actual finished app for hub integration. No generated design mockup may serve as the finished-app screenshot.
