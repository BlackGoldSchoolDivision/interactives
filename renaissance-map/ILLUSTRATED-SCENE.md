# Illustrated Renaissance atlas — complete assignment

The approved illustrated version now contains the same 37 mapping steps and all six written-response prompts as the original classroom activity. It remains a separate hub entry and uses its own device-save key; the original version and saved work are preserved. Saved JSON from the original can be opened in this version.

The fixed illustration and question overlays share the same geographic projection and SVG coordinate system. The generated assets contain no coastlines, country borders, river positions or place labels. Boundary highlights remain transparent so the paper and engraved artwork stay visible.

Sources: Natural Earth public-domain 1:50m land and rivers (`scene-land-50m.geojson`, `scene-rivers-50m.geojson`), https://github.com/nvkelso/natural-earth-vector ; existing GPL-3.0 historical circa-1400 activity regions and context, https://github.com/aourednik/historical-basemaps . Extracted land is clipped to the scene region; river properties retain names and scale rank. Historical borders remain approximate. Engraved mountain vignettes mark broad mountain areas decoratively and are not an elevation model.

Authoring: `scene-shell.html`, `scene-lesson.js`, `scene-lesson.css`, and two build scripts. Run `node reference/build-illustrated-scene.cjs`, then `node reference/build-illustrated-lesson.cjs`. The second script copies the original task and response data, checks the 37 + 6 counts, adds the separate 1683 Ottoman illustration and geographic anchors, and builds the complete inline `illustrated-scene.html`.

## Generated artwork

Mode: built-in image-generation tool. Source PNGs remain in the generated-images directory; project assets are WebP format conversions, with mountain transparency preserved.

Project paths:

- `/workspace/scratch/15a07530c94a/renaissance-map/assets/scene-vellum.webp`
- `/workspace/scratch/15a07530c94a/renaissance-map/assets/scene-mountains.webp`
- `/workspace/scratch/15a07530c94a/renaissance-map/assets/scene-sea.webp`

Vellum prompt: “Use case: stylized-concept. Asset type: seamless aged vellum texture for the land surface of a historical atlas. Create only a beautiful flat scanned paper texture, no map, no coastlines, no boundaries, no geography, no letters, no objects. Warm golden ivory Renaissance vellum, richly tactile fine fibers, tiny sepia ink specks and faint subtle weathered mottling. Hand-coloured atlas paper with gentle ochre and cream watercolor variations across the sheet. Even illumination, edge-to-edge texture, no dark edges, no vignette, no border, no curled corners, no stains that look like land shapes. Wide landscape 1536x1024. Texture should have fine detail and visible character while remaining light enough for black printed map labels.”

Mountains prompt: “Use case: stylized-concept. Asset type: decorative transparent engraved mountain illustration for a Renaissance atlas. A single long gracefully curved mountain range drawn in exquisite fine sepia copperplate engraving, in the style of a hand-coloured 16th-century atlas. Many delicately hatched overlapping peaks, tiny foothills and sparse fine trees, ochre and ivory highlights, faded ink at the lower edges so it blends into vellum. Wide horizontal composition with generous transparent margins on all sides, mountains arranged across the central half of the canvas, approximate 3:1 silhouette width to height. No sky, no ground rectangle, no background, no paper sheet, no cast shadow, no text, no letters, no borders, no map or geographical claims. A refined historical illustration, not cartoon, not modern vector icon. Real transparent background. Landscape 1536x1024.”

Sea prompt: “Use case: stylized-concept. Asset type: seamless historical atlas sea paper texture. A beautiful flat scan of Renaissance atlas paper hand-washed with deep azure and Prussian blue pigment. Rich luminous blue, fine subtle paper fibers and extremely delicate engraved rippling ink marks, faded faint irregular gold ink specks. Quiet surface appropriate behind white map labels. NO photographic ocean, NO water waves, NO foam, NO lightning texture, NO coastline, NO land, NO map, NO objects, NO boats, NO compass, NO text, NO frame. Even seamless edge-to-edge landscape texture without vignette. Handcrafted copperplate atlas mood. Landscape 1536x1024.”

## Labels and modes

Questions hide every country, city and sea name on the map, including after a correct response. The A/B markers stay visible. Explore shows the complete atlas labels, including the five smaller Italian states, and hides question markers. Entering or leaving Explore preserves the question index, answer, feedback and hint. LIAM remains available in both modes; Explore provides button-based zoom and Fit controls.


## Complete lesson

The original eight chapters remain: waters (5), territories (12), Ottoman Empire and ruling religion (2), cities (3), yellow Italian states (4), routes from Italy (3), red northern destinations and crosses (6), and routes to England plus green England (2). The six original textbook prompts retain pages 35, 36, 37, 40, 42 and 44. LIAM offers two answer buttons for every mapping task and selectable phrases for every written prompt; typing remains optional. Italian questions use a closer fixed view. Saved work includes mapping progress and responses. Work can be downloaded, imported from either version, reviewed and printed. The labels are visible in Explore and exported maps, and hidden in every mapping question. The Ottoman map is a separate historical view, using the existing approximately georeferenced 1683 classroom overlay and Natural Earth 1:110m coastlines.
