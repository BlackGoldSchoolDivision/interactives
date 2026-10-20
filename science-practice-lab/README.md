# Science Practice Lab — Matter and Energy

Independent Alberta Grade 6 PAT-style practice, hosted in the existing Interactives GitHub Pages site.

## Scope

| Unit | Grouped KUSP goals | Original questions | Individual curriculum statements |
| --- | ---: | ---: | ---: |
| Matter | 3 | 54 | 29 |
| Energy | 5 | 90 | 40 |
| Total | 8 | 144 | 69 |

Each goal contains 18 questions: two each of single choice (including image choices), multiple select, dropdowns, sorting, ordering, matching, diagram labels, evidence selection and numeric entry. Energy covers both forces and interactions, and selection, use and management of energy resources. See [Energy coverage](ENERGY-COVERAGE.md).

## Student flow

Select Matter or Energy, then a goal or mixed unit. Choose a nine-question format tour, 18 questions or all available questions; optionally practise one format. Learning mode offers hints, explanations, retries and shown answers. Test practice withholds feedback until completion.

Each unit keeps its own device-local progress, settings and unfinished round when browser storage is available. Switching topics and returning to the start menu preserve answers. The original Matter storage key and question identities are retained. Clearing progress affects only the selected unit. No account is required.

Drag placements also work by selecting a card and activating a destination by touch or keyboard. Ordered steps have up/down buttons. Resizing does not rebuild question state.

## Content and visual sources

Curriculum mapping follows the supplied *Science 1–6 Curriculum NEW Alberta* sheet. Questions are original and independent of Alberta Education and Vretta. They are not released PAT items or a verified reproduction of Vretta's interface.

The [shared image bank](assets/IMAGE-BANK.md) contains original generated classroom illustrations for both units, with a machine-readable manifest. Source PNGs and optimized WebPs are committed alongside the app. Apparatus readings, force arrows, scales, particle diagrams and other precise scientific models are rendered in code. Generated image dimensions are not measurement evidence. Fifty questions include apparatus or context photographs, including questions that pair an image with a coded diagram and label placement. Three Energy activities place the illustrations inside their sorting or matching destinations.

Question performance does not certify conducting an investigation, researching a community decision or building a device. Teacher view maps individual statements and suggests supervised investigations for practical evidence.

## Validation

Run `node --test science-practice-lab/tests/*.test.cjs`.

The GitHub verification workflow checks all answer keys, negative cases, curriculum references, format coverage, separate topic storage and scientific model consistency. Chromium then completes all 144 questions and exercises 1366×650, 1024×540, 768×900, 390×667, 320×568 and 640×360 layouts for both units.

Browser checks cover image loading, keyboard placement, native dragging, resizing, the persistent start menu, topic switching, saved drafts, scoped progress reset, retry, restored rounds, deferred test feedback and teacher dialogs. Both units check 125% CSS zoom; Matter also checks migration of previously revised questions. Image questions additionally check 320-pixel reflow, image loading, crop coverage and saved-state preservation.

Reports and screenshots are retained under `validation/`; Energy reports and selected desktop/phone visual checks are under `validation/energy/`. The workflow converts source PNGs to smaller WebPs.
