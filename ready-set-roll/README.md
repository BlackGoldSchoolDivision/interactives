# Ready, Set, Roll!

A Grade 1 Science rolling investigation for the Interactive Learning Lab. Children choose a track or prediction button and release two matching blue toy cars. Six guided comparisons cover distance, speed at matching stripes, stopping time, ramp height, identical setups and reaching a flag. The visible Mix & test mode provides independent surface and ramp-height controls for each track. Adult options contain observations, CSV export and a complete downloadable HTML copy.

## Running and editing

Serve this directory with any static web server. Runtime sources are `index.html`, `style.css`, `physics.js` and `app.js`; local images are under `assets/`. Edit investigations in `physics.js`. No build or package dependencies are required for the hosted game.

Rebuild the complete portable file with `node source/package.mjs`. It embeds the two WebP images, styles and scripts in `ready-set-roll.html`. The hosted game uses Nunito when available and falls back to local fonts; the portable copy uses local fonts.

Run the engine checks with `node source/test-physics.cjs`. No audio resources, speech synthesis or microphone permissions are used.

## Model

Fixed 1/240-second integration uses gravity, wheel inertia, effective rolling resistance and small speed-dependent drag. Wheels rotate with travelled distance. The constrained chassis follows wheel contact points and a smooth ramp toe. There are no prescribed winners, endpoint animations, jumps or collisions. Surface coefficients are illustrative comparisons, not measured properties of every real material. See the grown-up explanation in the game and the OpenStax rolling-motion reference.

## Curriculum

Grade 1 Science, partial connection: investigate rolling movement and speed, including the influence of materials, surfaces and wheels. Row references are recorded in the hub curriculum alignment file. This does not claim complete coverage of the broad direction, pathway and speed outcome.

## Verification — 23 October 2026

- 1,983 engine assertions passed: expected six comparison outcomes; smooth ramp joins; dissipative energy; reproducibility; higher-ramp effects; supported surfaces/heights remain on track; consistent results at 1/30/60/120 visual frames per second.
- All six investigations, completion/restart, friendly wrong-prediction feedback, replay, pause, slow motion, larger view and free play exercised in the browser. CSV observations downloaded and inspected.
- Bundled question and result clips played with no media error. Portable HTML opened and ran with both images and bundled audio embedded. The browser automation download event did not resolve for the HTML download, so the saved portable file itself was verified by opening it directly.
- Required viewport sizes checked: 1024×540, 1366×650, 768×900, 390×667, 320×568 and 640×360. No horizontal overflow; choices and main controls at least 44 px; round and prediction preserved while resizing. Short screens scroll vertically. CSS 200% enlargement checked for horizontal reflow; native browser zoom was not claimed.

Artwork provenance is in `assets/ARTWORK.md`.

## Mixed heights and materials — 22 October 2026 (Edmonton)

Mix & test is available directly on the main screen. Each track independently cycles wood, felt, cork and sandpaper, and has minus/plus controls for 9, 14, 19 and 22 cm ramp heights. The track and car update immediately. Height and material changes have bundled spoken cues. Changing a setting resets the cars from rest and clears the previous prediction; settings are locked during rolling/paused trials. Mixed setups survive a reload, and Back to 1–6 returns to the guided investigations.

A tested model comparison: 9 cm wood coasts about 59 cm; 19 cm felt about 53 cm. Raising only felt to 22 cm produces about 63 cm, reversing the result. Height does not overcome every material comparison. These are outputs of this illustrative rolling model.

Both comparisons were exercised through the browser. Surface cycling, independent settings, prediction reset, control boundaries, paused resize preservation and saved settings were checked. All six required viewports have no horizontal overflow and settings buttons at least 44 px. Tall starting cars fit short/wide scenes. CSS 200% reflow and the portable HTML's embedded height announcement were verified.
