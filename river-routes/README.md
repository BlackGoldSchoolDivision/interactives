# River Routes: A Fur Trade Journey

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

## Validation at this checkpoint

Rendered in Chrome at 1024×540, 1366×650, 768×900, 390×667, 320×568, and 640×360 using `qa.html`. All six reported no horizontal overflow and visible buttons at least 44 CSS pixels high. A selected Kakabeka Falls journey remained intact throughout live iframe resizing.

Checked both company filters, all six location cards, keyboard activation of a location and map marker, field journal navigation, source-dialog Escape dismissal, reset, and saved location after reload. JavaScript syntax checks passed. Paddling and trading round states do not exist at this stage.

The remote browser did not apply browser-zoom keyboard shortcuts, so actual browser zoom remains a manual check. Zoom is enabled in the viewport declaration.

## Next checkpoint

Integrate river, portage, post, canoe, and cargo artwork in the accepted visual direction, then pause for review.
