# Ready, Set, Roll artwork

Generated with the built-in image generation tool for this classroom game. No external photo licenses or brands are used.

- `car.webp`: 1536 × 1024 RGBA. A realistic blue die-cast hatchback, exact right-facing side profile, two circular wheels, neutral studio reflections. Transparent outside the physical vehicle silhouette. An image-tool edit removed the background halo while preserving the vehicle. WebP conversion at quality 90 preserves the alpha channel. Suggested runtime sprite crop: x=24, y=220, width=1490, height=595. Observed wheel centers in the full source: rear approximately (267,687), front (1231,685), radii approximately 124 px. Crop-relative centers: (243,467), (1207,465). Inspect the car at its intended display size before final alignment.
- `materials.webp`: 1254 × 1254 RGB, exact 2 × 2 equal texture atlas. Quadrant size 627 × 627. Top-left pale maple with horizontal straight grain; top-right coral/red-brown dense felt; bottom-left dark charcoal fine sandpaper; bottom-right warm tan cork. Orthographic material photographs with diffuse light, no labels/borders/gutters. WebP quality 84.

Generation prompts: photographic toy-car sprite in exact level side profile facing right on a true transparent background, no logos, no floor or cast shadow; and four equally sized material photographs in an exact 2 × 2 atlas, edge to edge, no objects or text. Built-in generation was used, not the CLI fallback.

Physics and rendering code may crop the atlas quadrants and rotate circular wheel regions at runtime. These images do not encode measured material properties.
