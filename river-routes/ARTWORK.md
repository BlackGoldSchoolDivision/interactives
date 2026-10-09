# River camp environment

Production asset: `assets/river-camp.webp`, 1536×1024, approximately 632 KiB. Generated with the built-in image-generation tool, using the previously approved River Routes visual concept as a reference. The original generated PNG remains alongside the conversation's generated images. WebP encoding preserves the composition while reducing download size; all crops are display viewports in SVG, not separate derivative files.

This is a plausible illustrative inland setting circa 1809, not a faithful reconstruction of Fort William, Kakabeka Falls, or any named historic site. The people are ordinary workers in practical clothing. Company posts and networks are not presented as ownership of Indigenous lands. Historical explanations retain references to Anishinaabe knowledge, Indigenous canoe technology, and established waterway networks.

## Production prompt

Use case: historical-scene. Asset type: wide environment illustration for the actual River Routes browser game, landscape 3:2, approximately 1536x1024. Reference image: the approved portage game concept; retain its inviting painterly realism, beautifully detailed northern woodland, luminous teal water, warm golden light, vivid earthy colours, and believable birchbark canoe. Create the landscape art ONLY. Remove every piece of interface, all panels, labels, letters, meters, logos, borders, and text. Fill the whole image with the landscape. Scene: a plausible northwestern Ontario inland waterway, circa 1809, with a canoe pulled up beside a sunlit rocky shore in the lower foreground, three cloth-wrapped cargo bundles tied with rope and a wooden paddle beside it. A clear curving portage footpath climbs the left-middle shore into a forest of pines and birches. Two small, ordinary workers seen from behind carry bundles along the path, wearing plain practical period clothes, with no ceremonial dress or generic Indigenous costume. A lively river and cascading white-water rapids occupy the right half, leading into a lake framed by forested hills. A modest period timber trading cabin is visible on the farther left bank. Composition: canoe centred near x50% y78%, cargo near x24% y78%, path around x37% y43%, river at x74% y51%, small cabin near x18% y35%. Natural integrated landscape, no diagram layout. Keep all five subjects clearly recognizable and separated enough for UI hotspots. Emphasize the wonderful texture, depth, sunlight and sense of outdoor adventure of the reference. No modern objects, no political borders, no text, no UI, no watermark. This is an illustrative setting, not a precise reconstruction of a named historic site.

## Display and interaction

- The foreground image is the primary workspace. Its hotspots are positioned from original image coordinates after responsive cropping, and the mobile view preserves the complete landscape.
- Matching picture buttons provide a second way to select every object without needing to find a marker.
- Gentle glows and drifting motes respect reduced-motion preferences.
- Discoveries form a small exploration activity, with a completion state and a reset. They do not imply that packing or paddling gameplay is already finished.
# Portage environment — October 8, 2026

`assets/portage-trail.webp` is a new illustrated environment made with the built-in image generator, using the existing camp artwork as a style reference. The original output is `generated_images/exec-a697e252-32cc-4823-8840-52e07ec2be3d.png`. A WebP encoding at quality 85 preserves the full 1536×1024 composition.

Production prompt: Create a new portage gameplay environment in the camp's detailed painterly realism, golden sunlight, rich forest depth, brilliant turquoise water, warm stone and birch textures. Landscape 3:2. Bird's-eye oblique view of a forested land corridor beside cascading water on the right. An imagined game setting, not a reconstruction or precise map. Broad open sandy corridor from the lower-left landing through the middle to an upper-right calm-water landing, safely on land to the left of the falls, and an alternate narrower ridge trail above it. Golden birch leaves, dark evergreens, textured boulders, sunlight, mist and ferns. No people, canoe, cargo, buildings, signs, text, UI, arrows or borders. The game overlays its moving crew, cargo and highlighted route.

The code draws the route, roots, crew and cargo separately so interactions and saved progress remain independent of the artwork. Both trail choices are illustrative game paths.


# Trading post environments and object atlas — October 8, 2026

Three new assets were generated with the built-in image generator. The existing river camp was used as a style reference for the two environments. Generated goods use a transparent background and remain a single atlas; CSS display viewports select each object without rewriting the art. The environment shelves are decorative; the working shelves and inventory counters are HTML controls. See `POST-HISTORY.md` for the historical evidence and reconstruction limits.

Production prompts:

## Fort William / NWC

Use case: historical-scene.
Asset type: landscape 3:2 environment illustration for River Routes, an inviting educational adventure game.
Input image 1: STYLE REFERENCE only. Match the river camp's luminous painterly realism, gorgeous materials and depth, rich teal water, golden light, and detailed northern landscape. Create a new composition.
Primary request: a beautiful busy North West Company trading-post setting, inspired by Fort William on the Kaministiquia River circa 1809. This is a researched illustrative scene, not an exact reconstruction.
Scene: view from an open-sided timber trading-store porch across a canoe landing toward a large wooden palisaded depot with low log warehouses, a canoe-building shed, and modest workshops. Birchbark canoes and cargo bundles at the river edge; workers moving barrels and fur packs in everyday practical period clothing. A few small birchbark domed Anishinaabe dwellings outside the palisade, consistent with early-1800s accounts. The surrounding land is the Lake Superior boreal river landscape, golden birches and dark pines; do not depict a waterfall here.
Composition: wonderfully inviting, detailed, wide 3:2. Shelves of goods frame the near LEFT and RIGHT edges of the porch, at most 15% of image width each: folded plain red and cream woollen cloth, nested hammered brass kettles with iron bails, wooden crates of simple iron axe heads, small glass beads. A broad EMPTY worn wooden counter spans the lower 20% of the image; its centre is clear and warmly lit for game overlays. The post, river and activity are clearly visible in the middle 70%, not obscured by shelves. View about human eye height. Goods look handmade, used, tactile and historically plausible.
Lighting/mood: warm late-summer golden morning, sparkling teal river, lively sense of arrival and possibility, captivating beautiful game art.
Constraints: no words, signs, labels, invented company logos, modern objects, guns, UI, borders or watermarks. No ceremonial costume or generic feather headdress. No Gothic castle. No modern landmark building. Preserve the inviting sophisticated painted texture of the reference. Full-bleed art only.

## York Factory / HBC

Use case: historical-scene.
Asset type: landscape 3:2 environment illustration for River Routes, companion to a North West Company scene but distinctly HUDSON'S BAY COMPANY.
Input image 1: STYLE REFERENCE only. Match luminous detailed painterly realism, beautiful water and wood textures, depth, inviting adventure. Create a new composition.
Primary request: a beautiful Hudson's Bay Company trading-post scene inspired by York Factory's OLD OCTAGON on the Hayes River circa 1809. Not the surviving white depot: that was only built in 1831. This scene must be visually distinct from Fort William.
Scene: view from an open-sided timber trading porch on the broad Hayes River bank across a wooden landing and low wet sedge grass to the Old Octagon compound. The historic building form is a low star-like timber fort: four five-sided corner flankers linked by long low roofed rectangular curtain-store sheds around an open courtyard, with a modest central entry. Depict a clearly visible angular corner flanker and adjoining roofed wings, no tall lookout towers, no castle crenellations. Timber walls, shingle roofs, simple brick chimneys. Flat Hudson Bay lowlands with distant low spruce, expansive pale sky, marshy ground, boardwalk access, a shallow-draft working wooden river boat and a birchbark canoe. NO mountains, cliff or rapids. Ordinary workers unloading simple wooden crates, practical clothing and no stereotyped ceremonial dress.
Composition: appealing wide 3:2. Near LEFT and RIGHT edges of the covered porch have goods shelves, at most 15% of image width each: folded wool cloth, simple copper/brass kettles with iron bails, small iron axe heads and containers with WHITE, BRIGHT BLUE, and RED glass beads. These bead colours match archaeological finds in the Old Octagon from 1795 to before 1815. A broad EMPTY warm wooden counter spans the lower 20%, clean central area for game pieces. River, flat landscape and distinctive old compound dominate the middle 70%. Human eye-height view with enough angle to show roofs and the pentagonal flanker.
Lighting/mood: luminous pearly northern sky with warm sunlight breaking through, teal-grey river, glowing wood and brick, captivating and inviting. Sophisticated rich painterly art, not gloomy or desaturated.
Constraints: never depict the three-storey white 1831 depot or iconic modern HBC logo/striped blanket branding. No text, signs, labels, guns, UI, watermark, borders, generic headdress or teepees. Architecture is illustrative and source-informed, not a precise measured reconstruction.

## Trade goods

Use case: historical-scene.
Asset type: illustrated object atlas for interactive trading shelves; 1536x768 landscape, FOUR columns by TWO rows of equally sized cells.
Primary request: exactly EIGHT separate beautiful painterly historical trade-goods still lifes, one per cell, isolated on a genuinely TRANSPARENT background. All objects fully inside their own cell with at least 12% padding on every side; no object crosses a cell edge. No grid lines, letters, numbers, labels, logos or scenery.
Style: luminous realistic hand-painted game objects with rich tactile material detail and clear recognizable silhouettes; warm soft natural light; same inviting 1809 Canadian fur-trade adventure feeling as the reference. Small contact shadows only, transparent background.
TOP ROW left to right:
1. Folded plain red woollen trade cloth, cream folded layer beneath, tied with simple twine. No branded stripes.
2. Nested hammered BRASS cooking kettles, slightly tapered cylindrical bowls, hand-forged black iron bail handle and rim, NO tea spout. Kettles were nested for canoe transport.
3. Two simple iron trade axe heads with one plain wooden haft resting diagonally beneath, small utility knife; not modern shiny camping gear.
4. Three loose strands/piles of small cylindrical glass trade beads in WHITE, BRIGHT BLUE, and RED. Simple drawn glass beads with visible holes, no elaborate sacred motifs. York Factory archaeology supports those colours circa 1795–before 1815.
BOTTOM ROW left to right:
5. Two brown smoked/dried fish tied together in a small bundle with cord; no tin cans or modern packaging.
6. A small plain cloth sack of long dark wild rice grains, open mouth revealing grain, a little shallow wooden scoop.
7. A folded dark brown beaver pelt with dense lustrous fur and irregular flattened hide shape; a pelt not a live animal, no taxidermy face.
8. Birchbark canoe repair materials: a rolled piece of birch bark, a coil of split spruce roots, a small plain wooden container of dark pitch; no red medical cross or modern toolbox.
Do not render eight cards: render objects alone. Match their apparent scale within each cell, each using about 70% of its square cell. Full eight-object atlas with actual alpha transparency.

Production files: `assets/post-fort-william.webp` and `assets/post-york-factory.webp` (1536×1024); `assets/trade-goods.webp` (1774×887, alpha transparency). Format encoding only; no creative image edits. Original generated files are `exec-50361e4e-6e54-4b12-b12c-9ed1adff6f6d.png`, `exec-606f850d-00e7-40fc-96e2-b403247d81d9.png`, and `exec-104e9a57-1cff-492d-9d60-30bf9d25c6c5.png`.



# Rainy Lake inland arrival — October 8, 2026

New asset: `assets/post-rainy-lake.webp` (1536×1024, 520,896 bytes), prepared for the next journey chunk. Generated with the built-in image-generation tool using `post-fort-william.webp` as a style reference. Original: `generated_images/exec-86e494c5-55b0-4dcd-b323-61f579149597.png`. WebP encoding at quality 85 changes format only. Checkpoint 7B uses this environment for the actual Rainy Lake journey arrival.

The destination is supported by the Town of Fort Frances's NWC provincial plaque. Architecture, people, clothing, display shelves, goods, weather and season are imagined. This picture is not an exact reconstruction or a documented local assemblage. See `JOURNEY-HISTORY.md` for naming, route, food-evidence and inventory-continuity boundaries.

## Production prompt

Use case: historical-scene.
Asset type: full-bleed landscape 3:2 environment illustration for River Routes, a visually rich Canadian fur-trade educational adventure game.
Input image 1 is a STYLE REFERENCE only: match its luminous painterly realism, gorgeous tactile materials, inviting golden light, sparkling teal water and depth. Create a NEW composition, not an edited copy.
Primary request: an engaging smaller North West Company inland supply depot, inspired by Fort Lac La Pluie / Rainy Lake House on the Rainy River circa 1809. Ontario's official plaque confirms this NWC depot existed between the late 1700s and 1821 and exchanged cargo between brigades. Exact building layout is unknown; this is an illustrative game scene, not a measured reconstruction.
Scene: view from an open timber store porch toward a modest riverside depot on a slightly raised wooded bank. A few low utilitarian log storehouses with shingle roofs and a partly visible simple timber enclosure, much smaller and quieter than Fort William. The broad calm Rainy River stretches behind a small canoe landing; distant low tree-lined horizon, pines and birches, no mountains, cliffs, waterfall or modern dam. Birchbark canoes, tied cargo packs, coopered wooden kegs and paddles show this is a transshipment and provisioning stop.
People: a small group of ordinary adult workers and Anishinaabe trading partners at the landing, engaged equally in checking a cargo bundle and discussing provisions; dignified everyday practical early-1800s clothing, no ceremonial dress, no costume stereotypes. Human figures should be readable but not dominant. No invented named historical people.
Foreground: stocked handmade wooden shelves frame the left and right 12% edges under the porch, with folded plain red/cream wool cloth, nested hammered brass cooking kettles with iron bails, simple iron tool heads, and a small container of white/blue/red glass beads. A sack of dark wild rice grains and a tied smoked-fish bundle near the edge suggest the game's provisioning theme, not a documented 1809 inventory. A broad warmly lit EMPTY wooden counter spans the bottom 18%, leaving the centre clear for actual interactive goods and controls.
Composition: eye-height view; clear bright open central landing, calm teal river and modest buildings in the middle; one arriving birchbark canoe visibly close to shore, but do not bake variable player inventory into the picture. Beautiful storytelling details without clutter. Visually distinct from the large Fort William palisade and the marshy HBC York Factory scene.
Lighting and mood: luminous late-summer afternoon, warm sunlight through green/gold birch foliage, turquoise reflections, welcome after a long journey, lively and inviting sophisticated painterly adventure art.
Constraints: landscape art ONLY. No letters, numbers, labels, logos, flags, UI panels, maps, borders, modern branded blanket stripes, guns or watermarks. No military castle or tall lookout towers. No generic feather headdresses or tipis. Source-informed illustration with imagined architecture, people, weather and display shelves.


