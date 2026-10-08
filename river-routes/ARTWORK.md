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

