# Science Practice Lab · Visual redesign roadmap

**Checkpoint 1 — Foundation committed (20 October 2026).** This is the build specification, not a claim that new images or layouts are already deployed. The current Matter, Energy and Earth Systems student practice remains functional.

## Why this is a redesign, not a copy

The teacher-supplied Vretta examples suggest three useful assessment principles: realistic visual context, varied response arrangements and purposeful interactive evidence. Our questions, illustrations and design must be **original**; do not reuse screenshot images or copy branded interface elements.

**Existing work to preserve:** 216 questions (54 Matter, 90 Energy, 72 Earth Systems); nine underlying response types; curriculum references; progress and test mode; the optimized Matter/Energy image bank and independent science diagrams. Keep all existing question IDs and answers intact during this foundation stage.

## Asset architecture

- `assets/image-bank.json`: **live** manifest for existing generated photos and illustrations. Leave in place.
- `assets/asset-plan.json`: **planned** scenes with priority, intended use and scientific safeguards. These paths do not exist yet and must never be loaded by the student app.
- `assets/template-catalogue.json`: machine-readable inventory of the 13 reusable presentation layouts.
- `assets/matter/`, `assets/energy/`: existing images, kept as archival PNG + optimized WebP.
- `assets/earth/`: future climate/atmosphere/ecosystem-context raster asset packs.
- `assets/shared/`: reusable neutral scenes and apparatus, not scored diagram geometry.
- `assets/screenshots/`: curated visual QA screenshots **only**, not screenshots copied from Vretta. Automated validation stays in `validation/`.
- `assets/source-notes/`: factual review, creative provenance, alt descriptions, prompt/version notes and clearance decisions for generated art.

## Template architecture

See `assets/template-catalogue.json`. Reuse the existing nine scoring types. Think of image cards, flowchart completion, investigation panels and scenario comparisons as **presentation patterns**, not new answer-scoring formats. Phase 1 improves the shared rendering components without changing storage or question scoring. The clickable image-hotspot idea remains prototype-only until it has accessible targets and independent assessment tests.

The frontend should select presentation from explicit `q.data.layout` metadata when deployed, then fall back to the current renderer for old questions. Do not assume every question of a given type wants the same layout. Keep responsive width to 320 px, adequate image contrast and readable text, and touch/keyboard alternatives to drag-and-drop.

## Priority order and pilot

**P0 — Matter first**: five meaningful upgrades using five planned sets: `particles-02`, `particles-13`, `temperature-02`, `expansion-02`, `expansion-13`. Start with phase-change scenes, particle-model beaker backplates, thermometer study, equal-mass water/ice context, and bridge joint seasonal comparison. Each uses *original* raster pictures for the context while code retains precise particle positions, water levels, thermometer markings or force arrows. Existing Matter photos are reused first where suitable.

**P1 — Energy**: `forces-02`, `forces-13`, `properties-13`, `choices-13`, `management-13`; add safe force investigation visuals, rubber band before/after, richer energy source cards and flowcharts. Reuse existing force-actions, resource-uses and box-push assets before generating replacements.

**P1 — Earth Systems**: `climate-04`, `climate-13`, `evidence-14`, `impacts-13`, `collaboration-14`; add storms and forecast equipment, climate action photo cards, geographical factors and human/environmental impacts. Label stylized hurricane views as illustration, **not real satellite evidence**. Northern/coastal material must not invent community-specific traditional knowledge.

**P2 — Shared resources**: neutral reusable apparatus and later image-hotspot experiments.

Some of the 20 visual references involve **Living Systems and Space**, beyond the three currently coded units. Preserve these as ideas for future units rather than mislabelling them Earth Systems.

**Checkpoint update (20 October 2026):** Four optimized Matter image sets are in the live GitHub bank and five Matter pilot questions have opt-in visual upgrades. The rejected particle collage is not published; each particle model still uses code-defined equal-size, equal-count particles. The complete 216-question validation and responsive browser workflow passed for the pilot code. See [published-pack QA notes](assets/source-notes/MATTER-PACK-01.md).

## Asset-quality gates (before an image becomes live)

1. Clear purpose and original composition; no screenshots, watermarks or brand-copying.
2. Believable hands and anatomy; unambiguous apparatus, gravity, force and materials.
3. **Image does not leak its answer**: no option-revealing labels, distinctive colored 'right answer' panels or alt text stating the correct choice.
4. Exact science is programmatic: numerical tables, thermometer scales, particle spacing and force vectors are validated by tests instead of generated.
5. Asset has descriptive, non-leading alt text; illustrations are not represented as actual historical, meteorological or community data.
6. Crop with consistent perspective; verify on a 320 px phone and ordinary desktop.
7. WebP optimized for the page with archival PNG kept in GitHub; target 150 KB or below for WebP scenes unless detail requires a documented exception.
8. Confirm question rendering and keyboard/drag responses, no horizontal overflow, and no accidental changes to saved progress.
9. Record image origin and approve before mapping `data.photo`, `data.zoneImages` or `data.optionVisuals` to the live asset.

## Work chunks and explicit stops

- **Chunk 1 (this commit):** inventory current resources, establish directories and manifests, define templates and 15 pilot targets, automated manifest consistency test. No public app behavior change.
- **Chunk 2 (in review, 20 Oct 2026):** generated and cropped five colourful Matter context sets as local PNG/WebP prototypes, available in a teacher review ZIP. Checked image-science accuracy; the particle illustration is not suitable as a scored particle model, and mass/temperature scenes require code-based measurements. **No binary upload or student-question changes until teacher approval.** See [QA report](assets/source-notes/MATTER-PACK-01.md).
- **Chunk 3:** implement visual layout helpers incrementally behind data opt-in; browser and phone checks.
- **Chunk 4:** refit five Matter questions and validate every answer; review screenshots with teacher.
- **Chunk 5:** approve and expand Energy and Earth Systems in short batches.

Each chunk ends with a brief GitHub commit reference, count of completed items and next check-in. Never leave a large uncommitted all-units redesign in progress.
