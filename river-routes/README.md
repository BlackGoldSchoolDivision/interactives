# River Routes: A Fur Trade Journey

## Checkpoint 4 — a playable river leg

After securing cargo, **Launch canoe** opens a controllable upstream river challenge. The canoe moves through a winding channel with rocks, current marks, trees and a gold landing before the falls. Left/right or A/D steer; Space starts or pauses. The large touch buttons support taps and held steering. The moving route marker is zoomed to the simplified Fort William–Kakabeka segment so progress is visible; the overview map also retains the marker.

The cargo manifest is copied from the learner's actual secured load. Heavy loads move more slowly. Rocks and banks damage the canoe; an available repair kit can restore condition once per carried kit. Landing requires reaching the final section and steering to the left landing. The completed state and cargo persist for the next portage chunk. This is an illustrative game channel, not reconstructed river geography; speed, damage, load limits and trip duration are game rules.

Pause, view changes, page hiding and focus loss stop the journey. Progress, condition, repairs and the manifest survive reloads and resizing. Resume uses the same manifest; changing cargo starts a fresh river journey. Invalid or unsecured packing cannot launch. Restart river preserves the load and resets only travel.

Validation: completed a real river run through ordinary controls, encountered rock collisions, used a repair kit, steered to the landing and saved/reloaded the completed state. Keyboard start/pause and steering, held pointer steering, hints, restart, navigation pause, changed/invalid cargo guards, reduced-motion presentation and visible route-marker travel passed. All six required viewport checks found no horizontal overflow and all visible buttons at least 44 CSS pixels high; the paused journey and landed state survived resizing. A 200% CSS zoom rendering check passed. Native browser zoom remains a manual check. No browser JavaScript exceptions were recorded.

**Next: Chunk 5, portage gameplay.** Use the saved landing manifest and remaining repair-kit count to move the canoe and cargo around the falls. Trading remains Chunk 6 and must retain hands-on offers, counter-offers, partner needs and visible exchanges. Stop after each chunk to talk with Darren.

## Checkpoint 3 — cargo packing

The approved illustrated camp now leads to **Pack your canoe**. Learners add or remove food, repair supplies, cloth, kettles, tools and beads. Each added bundle moves into the load (with reduced-motion support). Both 12 cargo spaces and a 130 kg limit constrain the choice. Securing the load requires three food bundles, one repair kit and four trade bundles; multiple cargo mixes work. Choices report food days, cargo carrying trips and trade variety. These are simplified game rules, not historical measurements.

Cargo quantities and the secured state survive reloads, map/camp navigation and live resizing. Changing cargo reopens the packing decision. Empty canoe clears the saved load. A hint explains the requirements without filling the canoe for the learner. The original furtrade activity is unchanged.

Validated adding/removing cargo, space and weight overloads independently, supply requirements, securing/reopening a load, clearing and reload persistence, keyboard activation, hints, route navigation and camp discovery. Rendered checks at all six required sizes found no horizontal overflow and no visible buttons under 44 CSS pixels. The secured load remained intact throughout live resizing. A 200% CSS zoom rendering check passed; this is not a substitute for a native browser-zoom check. No browser JavaScript errors were recorded.

**Next: Chunk 4, canoe travel.** Use the actual saved cargo in a controllable canoe journey, with movement along the map route, visible progress, current, obstacles and landing. Later post interactions must remain hands-on: a visual trading table, selectable goods, partner needs, offers/counter-offers and consequences for both parties. Neither canoe travel nor post trading is implemented by this cargo checkpoint.

## Checkpoint 2 — an illustrated, interactive opening

The adventure now opens on a detailed river-camp illustration in the approved visual style. Five glowing scene objects and matching picture buttons invite discovery. Each reveals one short fact, a cropped illustration, and an optional history note. Discoveries persist across resizing and reloading; finding all five completes the camp exploration.

The map remains available through its own tab and the **See your route** action. Location cards now show a short summary with longer reading folded into **Look closer**. The journal retains the fuller historical context.

Rendered artwork checks passed at 1024×540, 1366×650, 768×900, 390×667, 320×568, and 640×360. All five scene controls were fully inside the image and measured 44×44 CSS pixels at each settled viewport. No horizontal overflow or short visible buttons were reported. The completed five-object state remained intact during live resizing.

Verified discovery using scene markers, picture buttons, and the keyboard; completion without duplicate counts; optional history; saved discoveries after reload; reset persistence; route-map navigation; return to the adventure; journal navigation; and source-dialog Escape dismissal. Actual browser zoom remains a manual check because the remote browser does not apply its zoom keyboard shortcuts.

Artwork provenance and the production prompt are recorded in `ARTWORK.md`. This checkpoint adds exploration, not the later cargo, paddling, portage, or trading simulations.

## Checkpoint 1 — map and game layout

An isolated preview for Darren Maltais and the BGSD Interactive Learning Lab. This new directory preserves the original `furtrade/` activity.

Implemented:

- A local, projected geographic map of Canada and the major lakes, with no external map service.
- Canada and first-journey views, both-company / NWC / HBC filters, six selectable places, contextual history, reflection questions, and linked sources.
- A functional field journal and sources dialog.
- Responsive layout, keyboard-accessible map markers and location buttons, a reset action, and map preference persistence.

Paddling, packing, portage, and trading gameplay are later chunks. The app identifies this first checkpoint as a map preview.

## Geographic model

The modern outline is an orientation aid, not a claim about 1809 borders. Lines are simplified trading connections, not digitized canoe tracks. Locations are approximate overview waypoints. Company networks are not land-ownership boundaries.

Map projection: Albers equal-area, central meridian 96°W, standard parallels 49°N and 77°N. Geographic source files are Natural Earth 1:110m data; Canada was retrieved from the `johan/world.geo.json` distribution, neighbours from the hub's existing Natural Earth context file, and lake geometry from `nvkelso/natural-earth-vector`.

History sources are linked in the application. Full curriculum alignment and more detailed route data remain part of later review.

## Development

Serve the repository root or this folder using any static web server. The map, stylesheet, and scripts are local files. `qa.html` provides the six required same-origin iframe viewports.

Every public asset reference has a cache version. Advance it when changing published assets.

## Validation of the map checkpoint

Rendered in Chrome at 1024×540, 1366×650, 768×900, 390×667, 320×568, and 640×360 using `qa.html`. All six reported no horizontal overflow and visible buttons at least 44 CSS pixels high. A selected Kakabeka Falls journey remained intact throughout live iframe resizing.

Checked both company filters, all six location cards, keyboard activation of a location and map marker, field journal navigation, source-dialog Escape dismissal, reset, and saved location after reload. JavaScript syntax checks passed. Paddling and trading round states do not exist at this stage.

The remote browser did not apply browser-zoom keyboard shortcuts, so actual browser zoom remains a manual check. Zoom is enabled in the viewport declaration.

## Next checkpoint

Review the playable river leg, then build portage loads, carrying trips and animation. Stop after each chunk to talk with Darren.
