# Number Sense redesign — review branch

This is a separate replacement for `Maltais239/interactives/numbersense6/`. The original app, its hosting and the Interactive Learning Lab catalogue remain unchanged.

## Foundation

Buildless HTML, local CSS and native ES modules. The catalogue preserves all 29 original category IDs, grouped into six topics, and all three original bonus games. No student identity, online leaderboard, analytics, Canva SDK or runtime CDN is used. Nunito is bundled with its SIL Open Font License.

`app.js` handles hash navigation and activity disposal. `catalogue.js` defines the collection; `previews.js` supplies exact mathematical menu models. `registry.js` maps topics to lazy-loaded activity modules. Later topic batches add pure question banks and validators separately from rendering. Activity modules return cleanup functions for timers/listeners.

Development-only screens clearly identify activities that have not yet been rebuilt. This branch is not a published replacement. Provisional Mrs. Publow and Mrs. Murley credits require Darren’s confirmation before publication.

## Verification

Run `node --test tests/*.test.mjs` from this folder. Serve the folder using a static HTTP server for native modules; opening `index.html` directly from disk is insufficient. No build or dependency installation is needed.

Rendered acceptance checks remain required before publication: 1024×540, 1366×650, 768×900, 390×667, 320×568 and 640×360; browser zoom; horizontal overflow; readable 44px touch targets; in-progress state during resize; completed rounds; touch/keyboard; timers and storage failure paths.

The current work environment has no supported development browser-control plugin. Rendered checks are pending; source and logic tests do not substitute for them.
