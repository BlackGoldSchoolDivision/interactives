# Interactive Learning Lab — refresh list

The October 2026 catalogue includes 144 entries, with 100 additions to the earlier 44-entry draft. All original geography links are retained. This pass expanded the catalogue; it did not modify the linked activities.

## First: morphology

Darren reports that these earlier tools do not work well enough yet. Revisit word-part accuracy, instructions, feedback, controls and usability before describing them as finished classroom activities. The catalogue labels the six morphology entries “Update planned”.

- [Rooting For You!](https://maltais239.github.io/interactives/rootwords/)
- [WordWorks Lab](https://interactives.blackgold.ca/wordworks-lab/)
- [Magnetic Morphology Boards](https://maltais239.github.io/interactives/morphologyboard/)
- [Magnetic Morphology Flashcards](https://maltais239.github.io/interactives/morphologycards2/)
- [Can I Have a Word?](https://maltais239.github.io/interactives/custommorphologygame/)
- [Morpheme Match-Up](https://maltais239.github.io/interactives/morphemematchup/)

## Then: sorting, flashcards and question formats

Keep the useful formats and update individual activities as we go. The current catalogue exposes 20 sorting entries, 7 flashcard entries and 75 entries with some question practice. These groups overlap and include hubs, models and printables.

- Sorting: touch and keyboard controls, clear target areas, useful feedback, reset/replay and content accuracy.
- Flashcards: editable sets, flip/navigation controls, readable text and optional audio. Printable cards should remain clearly identified.
- Questions: dropdown, multiple-choice, numeric, model-selection and ordered-response formats; consistent instructions, feedback and item quality. The question tools are independent activities, with no claimed Vretta affiliation.

## Concrete issues observed in this pass

| Entry | Follow-up |
|---|---|
| [Morpheme Game Generator](https://maltais239.github.io/interactives/teachermorphologymaker/) | Automatic generation relies on an unfinished AI connection. |
| [Sorting Game Builder](https://maltais239.github.io/interactives/sortingcreator/) | Automatic asset generation relies on unfinished AI/image connections. |
| [STRATA: Alberta Field Excavation](https://maltais239.github.io/interactives/dinodig/) | Map tiles display a CARTO API-key-required message. |
| [Civilizations of the World](https://maltais239.github.io/interactives/ancientcivilizations/) | Map tiles display a CARTO API-key-required message. |
| [Civilizations & Trade Routes](https://maltais239.github.io/interactives/Charbonneaumapyouknow/) | Map tiles display a CARTO API-key-required message. |
| [Place Names of Alberta: Grade 3](https://maltais239.github.io/interactives/placenamesgrade3/) | Map tiles display a CARTO API-key-required message. |
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
