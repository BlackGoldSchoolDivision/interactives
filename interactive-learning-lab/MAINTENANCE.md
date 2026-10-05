# Interactive Learning Lab — refresh list

The October 2026 catalogue includes 149 entries, with 105 additions to the earlier 44-entry draft. All original geography links are retained. The catalogue refresh now includes two new research-informed morphology activities.

## New morphology activities

- [Morpheme Missions](https://interactives.blackgold.ca/morpheme-missions/): 36 word-building missions, spelling-boundary feedback, a Word Lab and printable six-word activities with answer keys.
- [Word Detective](https://interactives.blackgold.ca/word-detective/): ten investigations with sorting, evidence questions, context application and printable case files with explained keys.

Research and sources are documented in morphology-resources/RESEARCH_NOTES.md. These games support word-level practice; they are not validated interventions or diagnostic assessments.

## Earlier morphology tools: update backlog

Darren reports that these earlier tools do not work well enough yet. Revisit word-part accuracy, instructions, feedback, controls and usability before describing them as finished classroom activities. The catalogue labels the six earlier morphology entries “Update planned”.

- [Rooting For You!](https://maltais239.github.io/interactives/rootwords/)
- [WordWorks Lab](https://interactives.blackgold.ca/wordworks-lab/)
- [Magnetic Morphology Boards](https://maltais239.github.io/interactives/morphologyboard/)
- [Magnetic Morphology Flashcards](https://maltais239.github.io/interactives/morphologycards2/)
- [Can I Have a Word?](https://maltais239.github.io/interactives/custommorphologygame/)
- [Morpheme Match-Up](https://maltais239.github.io/interactives/morphemematchup/)

## Then: sorting, flashcards and question formats

Keep the useful formats and update individual activities as we go. The current catalogue exposes 21 sorting entries, 7 flashcard entries and 77 entries with some question practice. These groups overlap and include hubs, models and printables.

- Sorting: touch and keyboard controls, clear target areas, useful feedback, reset/replay and content accuracy.
- Flashcards: editable sets, flip/navigation controls, readable text and optional audio. Printable cards should remain clearly identified.
- Questions: dropdown, multiple-choice, numeric, model-selection and ordered-response formats; consistent instructions, feedback and item quality. The question tools are independent activities, with no claimed Vretta affiliation.

## Concrete issues observed in this pass

| Entry | Follow-up |
|---|---|
| [Morpheme Game Generator](https://maltais239.github.io/interactives/teachermorphologymaker/) | Automatic generation relies on an unfinished AI connection. |
| [Sorting Game Builder](https://maltais239.github.io/interactives/sortingcreator/) | Automatic asset generation relies on unfinished AI/image connections. |
| [STRATA: Alberta Field Excavation](https://maltais239.github.io/interactives/dinodig/) | Map background repaired and field notebook added in the October 5 batch. |
| [Civilizations of the World](https://maltais239.github.io/interactives/ancientcivilizations/) | Map background repaired in the October 4 batch. A deeper learning-design review remains planned. |
| [Civilizations & Trade Routes](https://maltais239.github.io/interactives/Charbonneaumapyouknow/) | Map background repaired in the October 4 batch. A deeper learning-design review remains planned. |
| [Place Names of Alberta: Grade 3](https://maltais239.github.io/interactives/placenamesgrade3/) | Map background repaired in the October 4 batch. A deeper learning-design review remains planned. |
| [Interactive Frayer Model](https://interactives.blackgold.ca/frayerblankjpg/) | Replace the “Is this working now” editing placeholders and review the entry flow. |

The file named PATpracticescience6FR currently renders English questions. Its French companion link was omitted pending a translation review. Optional AI features in otherwise usable tools also need separate review; an empty AI connection does not by itself mean the whole activity is unusable.

## Scope and verification

- Indexed 275 app entrypoints across the Black Gold and personal repositories. Repository_Audit.csv records included entries, companion links and remaining candidates.
- Read title/source metadata for 241 smaller app files and inspected the selected additions in more detail. Large preconfigured topic sets and test files were inventoried separately.
- Opened and captured all 100 additions in the browser; preserved the 44 earlier screenshots/previews.
- Verified companion URLs and inspected three representative child activities in the 22-activity Social Studies 7–9 hub. All 22 child files exist in the source repository.
- These are launch, layout and source checks, not an exhaustive test of every question, score path, upload, AI call or accessibility interaction.
- Retained representative activity formats rather than every repeated topic set or earlier copy. The remaining candidates are available in the audit for the next pass.

## Updating the catalogue

Edit catalogue.json, refresh the relevant image in the personal repository’s learning-lab-images/ folder, and run python3 source/build.py. The same hosted catalogue URL can stay embedded in Google Sites when future updates are published.


## Geography repairs — October 4, 2026

Repaired Canada Map Challenge, Canadian Geography Hub, Civilizations of the World, Civilizations & Trade Routes, and Place Names of Alberta: Grade 3. Their existing launch URLs are retained. Shared background configuration and regression checks are in the personal repository's geography-shared/ folder; Canada boundaries are served from that repository. The hub preserves progress when switching modes, and the trade-route quiz now gives explicit answer feedback. Catalogue previews are refreshed from the live apps.

The following October 5 batch extends the repair work. Other writing, word-work, science and builder activities remain on the refresh list.


## Seven activity upgrades — October 5, 2026

- Building & Breaking Numbers: four independently adaptive skills, five ranges, explicit next-question controls, place-value models, a number lab, saved practice history, CSV and teacher controls. Hints, retries and worked examples count as supported practice.
- Latitude & Longitude: labelled grid, exploration and eight-location rounds, typed alternatives to map clicks, direction-specific feedback and reachable targets.
- Pirate Mapping: original island artwork, compass clues, three-stop trails, grid references, arrow-key and on-screen movement, five-treasure voyages and explicit replay.
- STRATA: shared OpenStreetMap background, staged keyboard-accessible clearing, real licensed fossil imagery, saved observation/inference/wonder notes, evidence checks and discovery comparisons. Eight sites and existing URL retained.
- Mr. Walker’s Corner: three credited classroom editions recovered from public embedded HTML — Function Machine Detective, Bridge Test Lab and Plural Pattern Lab. Original source snapshots and links remain available in the personal repository. The bank includes a collection filter and a visible Corner link.

Local checks covered generated question correctness, adaptive transitions, coordinate boundaries, treasure routes, equivalent function parsing, bridge challenge solvability and plural patterns. DOM checks exercised complete rounds, saved records and key feedback paths. Live checks and actual screenshot previews supplement these checks; this is not a full audit of every device, assistive technology or all 149 activities.

Edit the catalogue entries and the source/page-template.html template, then run python3 source/build.py. Keep screenshots in the personal repository’s learning-lab-images/ folder. Collection membership for the three Walker entries is collection: walker-corner.
