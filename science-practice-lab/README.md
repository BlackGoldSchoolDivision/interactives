# Science Practice Lab — Matter, Energy and Earth Systems

Independent Alberta Grade 6 PAT-style practice, hosted in the existing Interactives GitHub Pages site.

## Scope

| Unit | Grouped KUSP goals | Original questions | Individual curriculum statements |
| --- | ---: | ---: | ---: |
| Matter | 3 | 54 | 29 |
| Energy | 5 | 90 | 40 |
| Earth Systems | 4 | 72 | 37 |
| Total | 12 | 216 | 106 |

Each goal contains 18 questions: two each of single choice (including image choices), multiple select, dropdowns, sorting, ordering, matching, diagram labels, evidence selection and numeric entry. Energy covers both forces and interactions, and selection, use and management of energy resources. See [Energy coverage](ENERGY-COVERAGE.md).

## Student flow

Select Matter, Energy or Earth Systems, then a goal or mixed unit. Choose a nine-question format tour, 18 questions or all available questions; optionally practise one format. Learning mode offers hints, explanations, retries and shown answers. Test practice withholds feedback until completion.

Each unit keeps its own device-local progress, settings and unfinished round when browser storage is available. Switching topics and returning to the start menu preserve answers. The original Matter storage key and question identities are retained. Clearing progress affects only the selected unit. No account is required.

Drag placements also work by selecting a card and activating a destination by touch or keyboard. Ordered steps have up/down buttons. Resizing does not rebuild question state.

## Visual question practice

The **Choose a question format** picker now includes **Pictures & diagrams**. This selects illustrated questions across the same nine formats rather than treating pictures as a separate answer type. Currently 78 of the 216 questions qualify across Matter and Energy (36 Matter and 42 Energy); Earth Systems has additional coded illustrations. Fifty Matter/Energy questions contain original illustrated scenes. The selected goal, round length, learning/test mode, and device-local progress still apply. Visual rounds do not pad the requested length with unillustrated questions.

## Content and visual sources

Curriculum mapping follows the supplied *Science 1–6 Curriculum NEW Alberta* sheet. Questions are original and independent of Alberta Education and Vretta. They are not released PAT items or a verified reproduction of Vretta's interface.

The [shared image bank](assets/IMAGE-BANK.md) contains original generated classroom illustrations for both units, with a machine-readable manifest. Source PNGs and optimized WebPs are committed alongside the app. Apparatus readings, force arrows, scales, particle diagrams and other precise scientific models are rendered in code. Generated image dimensions are not measurement evidence. Fifty questions include apparatus or context photographs, including questions that pair an image with a coded diagram and label placement. One Energy activity places images inside its labelling destinations; three others now put existing original photographs on the draggable cards.

Question performance does not certify conducting an investigation, researching a community decision or building a device. Teacher view maps individual statements and suggests supervised investigations for practical evidence.

## Validation

Run `node --test science-practice-lab/tests/*.test.cjs`.

The GitHub verification workflow checks all answer keys, negative cases, curriculum references, format coverage, separate topic storage and scientific model consistency. Chromium then completes all 216 questions and exercises 1366×650, 1024×540, 768×900, 390×667, 320×568 and 640×360 layouts for both units.

Browser checks cover image loading, keyboard placement, native dragging, resizing, the persistent start menu, topic switching, saved drafts, scoped progress reset, retry, restored rounds, deferred test feedback and teacher dialogs. Both units check 125% CSS zoom; Matter also checks migration of previously revised questions. Image questions additionally check 320-pixel reflow, image loading, crop coverage and saved-state preservation.

Reports and screenshots are retained under `validation/`; Energy reports and selected desktop/phone visual checks are under `validation/energy/`. The workflow converts source PNGs to smaller WebPs.

## Earth Systems

72 original questions across four Grade 6 curriculum clusters: climate interactions and causes; effects on people, agriculture, wildlife and ecosystems; historical observations and forecasting technologies; and respectful collaboration with Elders and Knowledge Keepers. Each cluster has two questions in each of the nine formats and all 37 supplied K/U/SP statements are mapped. Illustrative numbers are clearly marked as fictional examples and are not historical data or accounts from actual communities. Diagrams and evidence tables are original coded teaching models rather than photographs. Curriculum source is the provided Grade 6 science spreadsheet, rows 104–155. Practice does not substitute for a locally approved investigation or community engagement.

## Matter visual redesign · pilot 01 (20 October 2026)

Four original qualitative context-photo strips were added to the published Matter image bank, and five existing Matter questions received opt-in visual presentation improvements: `particles-02`, `particles-13`, `temperature-02`, `expansion-02` and `expansion-13`. Generated particle collages were deliberately rejected because they used unequal particle counts: the student question retains nine identical-sized code-controlled particles per option. Temperature graduations, equal-mass volume comparisons, and precise bridge-joint gaps are also still coded. The image strips are not measurement evidence and no answer keys, feedback rules, question identities or saved-storage keys changed. The newly uploaded WebPs have source PNGs in the separate teacher artwork ZIP; those archival PNGs are not yet in GitHub. See [image-bank manifest](assets/image-bank.json) and [Matter pack science review](assets/source-notes/MATTER-PACK-01.md).

## Energy picture-card drag-and-drop · 21 October 2026

Three existing activities now use **twelve original photograph-backed draggable cards**: `forces-07` (internal/external forces), `forces-08` (force classification) and `forces-12` (force terminology matching). All reuse tested `force-actions`, `box-push` and `investigation-contexts` image assets. The last two activities moved the original art from destination areas to movable cards, rather than letting identical pictures disclose where to drop each card. Students may also choose a card and tap or use the keyboard to activate a destination. Question IDs, underlying scoring/answer keys and storage keys are unchanged. One caption was corrected to say “foam block” rather than “sponge.” This incremental pilot precedes the more involved image flowchart layouts.

## Energy picture-based flowcharts · pilot 02 (21 October 2026)

Two existing management questions now use purpose-built responsive diagrams instead of a generic bank-and-zones arrangement. **`management-07`** has a branching resource-use pathway with direct use on one side and use after conversion/processing on the other. The sailboat and wind-powered lamp cards reuse original photographic assets; the waterwheel and biofuel cards deliberately remain text-based until scientifically accurate original images are available. **`management-13`** now has an empty three-stage wind → electricity → lighting flowchart: the learner moves stage descriptions into connected, initially blank boxes. The old model showed all stage descriptions before the question was answered; that answer leakage was removed. Mouse dragging, touchscreen pick-and-place and keyboard placement share the existing scoring system. Answers, IDs, the bank size and saved progress remain unchanged. Dedicated browser tests capture the diagrams on desktop and at 390/320-pixel mobile widths.

## Complete picture-card Energy flowchart · 21 October 2026

`management-07` now has four movable image cards: a sailboat (wind directly moves it), a mechanically coupled stream waterwheel and grain mill (water directly turns machinery), wind-generated electricity supplying lighting (processed/conversion pathway), and plant material processed into vehicle fuel (processed pathway). The two new original, synthetic, **qualitative** illustrations are stored as the optimized two-panel AVIF bank asset `assets/energy/resource-flow-extended.avif` (5.2 KB). Full-resolution original PNGs are retained in the teacher artwork ZIP, not bundled with the published page. Artwork does **not** contain numerical measurements, answer overlays or a teacher answer key. The card/zone IDs and correct answers remain unchanged. Verified via `tests/flowchart.test.cjs` and the focused Chrome browser flowchart test.

## Earth Systems vivid assessment question panels — first real UI batch

Four existing Earth Systems items use a vivid, student-facing assessment layout: `climate-07` (natural/human causes sort), `evidence-12` (extreme-weather matching), `evidence-14` (forecasting-source diagram labels), and `impacts-13` (changing-coast impacts labelling). Their actual live answer controls now have unit-coloured banners, larger responsive card panels, visually distinct category destinations and, for the diagram-based questions, a two-column illustration-and-answer layout that stacks vertically on phones. This uses existing original Earth Systems teaching diagrams; richer generated raster scenes are a future content-production phase rather than a pre-rendered UI collage. No answer keys, scoring formats, identifiers or progress storage were changed. Dedicated Playwright checks capture all four layouts at desktop, 390 px and 320 px widths.

## Earth forecasting photo pilot: NOAA-sourced public-domain imagery

The first Earth Systems photographic set uses one **60 KB GitHub-hosted WebP** sprite of four source pictures. NOAA/NWS Doppler radar, a NOAA official satellite rendering, and NWS surface weather station are credited to their agencies; the NWS workstation photograph is credited to JonathanLamb, who released it into the public domain. Sources and licence details are in `assets/source-notes/NOAA-FORECAST-TOOLS.md`. The scripted builder produces `assets/earth/noaa-forecast-sources.webp` inside GitHub rather than loading hotlinked images in students' browsers. `evidence-14` now displays three photographs/renderings beside its real drag-and-drop labelling controls, and `evidence-06` and `evidence-10` use instrument photographs as investigation context. These pictures provide no invented readings or test answers. The remaining Earth Systems diagrams and many older text-led questions still need further original visual work.

### Earth extreme-weather photographic drag cards

`evidence-12` now uses four illustrated **movable weather cards**: a NOAA/NWS heat-dome scientific diagram, NOAA/NSSL Dimmitt tornado photograph, NOAA/NWS blizzard photograph, and NASA monsoon-related low satellite composite. The image sheet `assets/earth/noaa-weather-events.webp` is compiled in GitHub from the public-domain records linked in `assets/source-notes/NOAA-FORECAST-TOOLS.md`. Students must match the visual description to the event, with no destination artwork to leak matching positions. The question's original response IDs and answer mappings have not changed. Note that heatwaves and monsoon patterns are inferred from observations over time, not proven by one still image.

## Matter and Energy photo-context pilots · continued visual upgrade

Existing original, checked bank images now support four additional questions without changing scored answers: Matter `particles-12` displays a four-scene phase-change gallery (with an explicit scientific note that visible steam clouds are condensed water droplets), and `temperature-11` shows a glass-liquid thermometer as context for matching its components. Energy `forces-11` shows a hand pushing a block as a familiar force context and `management-12` adds a biomass-fuel process illustration. These are deliberately **illustrated-context upgrades**: their matching cards remain text until accurate item-specific artwork exists. They are not described as fully redesigned image-card questions. All four preserve their IDs, response formats, answer keys and saved progress.
