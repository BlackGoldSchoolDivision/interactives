# River Routes: A Fur Trade Journey

## Checkpoint 8 — one resume action and a fresh journey

Camp now shows a compact trail of five illustrated stages: Pack, Paddle, Portage, Inland and Trade. Completed stages receive a tick, the current stage is highlighted, and one main button resumes the appropriate saved activity. The map mission uses the same action. Separate company visits are explicitly labelled trading practice. Old competing camp resume links stay hidden. The completed arrival is titled **Journey complete!** and offers a fresh start.

**Start a new journey** opens a short dialog with **Keep my journey** and **Start fresh at Fort William**. Confirmation stops animation and clears the live packing, river, portage and inland states as well as their four saved keys, then opens an empty packing screen. Camp discoveries and separately saved HBC/NWC practice visits remain; the map returns to Fort William. Clearing live state prevents page-hide or resize saves from bringing the old journey back. Trading automatically falls back to its practice state when the real journey is no longer available.

Validation: all fifteen model checks pass, including current-source resume order, stranded river handling, stale manifests and journey identities, incomplete portage guards and fresh-start progress. JavaScript syntax, unique HTML IDs and local references passed. Completed, fresh and active camp progress and the restart dialog passed all six required screen sizes with no horizontal overflow and visible buttons at least 44 CSS pixels high. Dialog bounds stayed inside every viewport. Cancel preserved the completed inventory; Escape preserved the new active river journey. Confirmation from a real trading visit opened a 0 kg canoe, cleared all three travel states, retained the discovered canoe and the exact pending HBC practice offer, and stayed clear after reload. Packing and securing a new 115 kg load then launched a different journey ID at full condition; resizing and map resume kept that new journey unchanged. No application JavaScript errors were recorded. Native browser zoom remains a manual check in this remote environment.

The first playable edition is connected. A current trading screenshot links from the Learning Lab, and teacher.html gives short grade 1–9 curriculum connections using the June 2026 draft for grades 7–9. These are suggested uses from official grade highlights, not a formal outcome-by-outcome alignment. Classroom playtesting is the next step.

## Checkpoint 7B — connected inland journey and real trading

A completed portage now opens **Continue inland**. The canoe visibly moves on a simplified map connection toward Rainy Lake. Space / the paddling button starts and pauses movement; Right arrow / **One stroke** advances manually. At the crossing, a sheltered route uses another provision bundle and protects canoe condition, while the quicker open crossing saves that bundle and costs 16 condition points. An available repair kit restores up to 40 points once; supplies already used on the first river remain spent. These routes, resource costs and shortened movement are invented game rules, not a surveyed channel or historical duration.

Arrival opens **Fort Lac La Pluie** with the new smaller depot artwork and the actual remaining cargo. Food, repairs, condition, staged offers, negotiations, exchanges and received goods belong to one saved onward journey. Accepting an agreement spends goods exactly once. A new river journey or changed source manifest cannot reuse the old arrival. The separately saved Fort William and York Factory practices remain available via **Posts**, with a return link to the actual arrival when it is current. Starting a fresh practice does not reset the real journey.

The first journey goal is four food days and four pelts within the 130 kg capacity. Completion enables **Review your journey**; the map summary shows carried provisions, received pelts, retained goods and canoe condition. An ordinary reload starts at camp, where the saved journey can be resumed. Automatic movement pauses when leaving the view, opening sources, losing focus or hiding the tab. Resizing changes layout without resetting work.

Validation: eleven model checks passed for cargo continuity, both route costs, saved movement, new-source invalidation, repair limits, unsafe-choice guards, accepted real exchanges, inventory conservation, repeat prevention and the existing practice bargaining behaviour. JavaScript syntax, unique HTML IDs and referenced local assets passed. Live rendered verification passed for a paused inland leg, a real pending counter-offer and a completed two-exchange visit at all six required sizes, with no horizontal overflow and visible buttons at least 44 CSS pixels high. The sheltered route used two provision bundles, kept the canoe at 98%, and the accepted exchanges finished with four food days, four pelts, one cloth bundle retained and a 60 kg load. Reloading preserved the route decision and a pending second agreement without repeating the first exchange. The saved HBC practice counter-offer remained independent. Restarting the river produced a new journey ID and disabled the old arrival. Final moving-map, crossing-choice and completed-journey checks passed at all six sizes. The complete active-map workspace fits the desktop viewports; primary movement controls fit the short landscape and mobile viewports while cargo can scroll vertically. A fresh river/portage journey delivered eight bundles and the canoe in four trips; the remaining repair kit restored condition from 72% to 100% and was consumed. The open crossing then used only one provision bundle and arrived at 84% condition. One accepted cloth-and-kettle exchange finished with four food days, four pelts, tools and beads retained, and an 80 kg load. The Canada overview selected Rainy Lake and placed the journey canoe at the same coordinates without changing inventory. No application JavaScript errors were recorded. Native browser zoom remains a manual check because the remote browser does not apply its zoom shortcuts.

## Checkpoint 7A — researched inland destination and new arrival art

The next actual journey destination is the North West Company's **Fort Lac La Pluie / Rainy Lake House**, operating in the 1809 setting. A new smaller riverside depot illustration is ready in `assets/post-rainy-lake.webp`, with a canoe landing, visible cargo exchange, stocked shelves and an open trading counter. This asset is prepared for the next gameplay chunk and is not yet wired into the application. The live game remains at Checkpoint 6.

`JOURNEY-HISTORY.md` records the destination evidence, naming limits, simplified inland-route representation and the next implementation boundary. Onward travel will use the completed portage's remaining manifest, including spent repairs and canoe condition. Actual accepted exchanges will update one saved journey inventory; the existing two-post comparison practices remain separate. The illustration is source-informed, with imagined architecture and people rather than a documented 1809 view.

**Pause point:** review the inland arrival scene and route direction with Darren. Next chunk builds the short map journey and real arrival; the following chunk completes gameplay and responsive verification before publishing.

## Checkpoint 6 — illustrated posts and hands-on trading practice

**Posts** opens two separately saved practice visits. Fort William (North West Company) has a busy canoe landing, workshops, wooden palisade and wild rice as well as fish. York Factory (Hudson’s Bay Company) has river boats, flat marshy lowlands and a scene inspired by its earlier Old Octagon, rather than the white depot built from 1831. Both scenes have stocked shelves framing a clear counter. The new transparent object atlas provides wool cloth, nested brass kettles, iron tools, white/blue/red glass beads, smoked fish, wild rice, pelts and canoe materials. Archaeological bead colours, food provisioning and other object types are linked to sources in **Look closer**; see `POST-HISTORY.md` and `ARTWORK.md` for evidence and illustration limits.

Learners take pictured goods from their shelf and the traders’ shelf to build both halves of an offer. Selected quantities move off the shelf onto the table. Make an offer can produce an agreement or alternatives: add a more useful good, or request fewer goods. Selecting a counter-offer stages it for review; **Exchange these goods** changes both inventories, clears the table, records the exchange and puts received goods into the visible cargo rack. New arrivals change demand after the first exchange. The first wanted bundle is more useful than repeated bundles of the same kind. A 130 kg load limit prevents an otherwise affordable exchange from overloading the canoe. The practice goal is four food days and four pelts, with a visible count of trade goods retained; there are multiple workable exchanges.

The quantities, needs, exchange values, weights and goal are invented game rules. Both networks handled overlapping goods, so company differences come from place, logistics and the scenario’s changing demand. The game does not turn the companies into uniformly strict/easy traders or treat pictured items as exact replicas of excavated objects.

A completed and current portage enables **Practise with my carried cargo**. This creates a separate practice copy, preserving the remaining food and repair kit count. These visits do not advance the route to York Factory or spend the saved journey’s goods. Connecting a real inland post arrival to this trading interaction is the next chunk.

Validation: seven model checks passed for conservation of every good, rejection of overdrawn/empty offers, valid counter-offers, multiple successful exchanges, save restoration, copied cargo isolation and overload prevention. Browser testing completed the food-and-fur goal at both posts, used both counter-offer choices, restored an unfinished negotiation after reload, and retained staged and completed exchanges through all six required sizes. The carried-cargo practice preserved the three food bundles, used-up repair kit, seven delivered portage bundles, four carrying trips and 98% canoe condition. Final rendered checks passed at 1024×540, 1366×650, 768×900, 390×667, 320×568 and 640×360 for both a pending counter-offer and a completed visit, with no horizontal overflow and visible buttons at least 44 CSS pixels high. At 1024×540 the complete shelf/table workspace fits inside the viewport. Keyboard-only rice trading, focus after exchange, cancellation of stale agreements, post/map navigation, historical object inspection and source-dialog Escape dismissal passed. No application JavaScript errors were recorded. Native browser zoom remains a manual check because the remote browser does not apply its zoom shortcuts.

**Next: review this trading checkpoint with Darren, then connect the next inland journey and an actual post arrival.** Keep the illustrated shelves, visible exchanges and changing needs; continue in small chunks and pause after the next playable section.

## Checkpoint 5 — playable portage around the falls

The completed river landing opens **Carry around the falls**. The new painterly trail illustration follows the camp's approved visual style. Learners select their actual remaining cargo, up to 40 kg per trip, or carry the canoe separately with two crew members. The choice moves on the trail, while bundles and the canoe visibly accumulate on the far shore. Forest and ridge trails trade distance against effort and root crossings; both are imagined game paths.

Learners can tap the scenery or press Right arrow for each step, or use Space / the walking button for automatic travel. Root crossings pause for a careful step (Up arrow). Heavy loads consume more crew energy; Rest / R restores energy without discarding the load. Return trips bring the crew back empty. Completion requires carrying every bundle and the canoe, then choosing **Reload the canoe**. No trading shortcut or automatic offers are added here.

The portage manifest deducts repair kits already used on the river and preserves canoe condition. It is keyed to the river journey's identity, so a restarted river or newly launched cargo creates a fresh portage. Resizing, navigation, focus loss and reloading preserve position, selected load, delivered bundles, energy and carrying trips; automatic travel pauses when leaving the view. The next chunk should use the completed portage manifest, rather than the original packing counts, for subsequent travel and trading.

Validation: completed an actual portage with the remaining seven cargo bundles and canoe in four carrying trips. Verified overload blocking, separate two-person canoe carrying, both trail choices and their root crossings, automatic travel and pausing, manual keyboard steps, tapping the trail, energy exhaustion and recovery, return trips, final canoe reloading, optional hints, map navigation, source-dialog Escape dismissal, and completed-state persistence after reload. The repair kit used on the river remained absent; canoe condition stayed at 98%. No application JavaScript errors were recorded. Rendered checks passed at 1024×540, 1366×650, 768×900, 390×667, 320×568 and 640×360 for both paused and completed portage states. There was no horizontal overflow; visible buttons were at least 44 CSS pixels high. The completed state retained seven delivered bundles, the canoe across, and four carrying trips during live resizing. The crew stayed inside the illustrated scene at every size. Native browser zoom remains a manual check because the remote browser does not apply browser zoom shortcuts.

**Next: Chunk 6, visual trading at a post.** Keep hands-on goods, partner needs, offers, counter-offers and visible exchanges; later connect the inland route to the post. Continue in small chunks and stop to talk with Darren after each one.

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

Review the illustrated trading posts and bargaining with Darren, then connect a real inland arrival and the next journey leg. Stop after each chunk to talk with Darren.


