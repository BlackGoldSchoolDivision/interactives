# Science Practice Lab — Matter pilot

Independent Alberta Grade 6 PAT-style practice, hosted in the existing Interactives GitHub Pages site.

## Scope
- Matter only: 3 grouped KUSP sections, 54 original questions.
- 18 questions per group: two each of single choice (including an image-choice item), multiple select, dropdowns, sorting, ordering, matching, diagram labels, evidence selection, and numeric entry.
- All 29 individual Matter Knowledge, Understanding, and Skills & Procedures statements in the supplied curriculum sheet have question references.
- Teacher view distinguishes question performance from performing hands-on investigations.

## Student flow
Choose a goal or mixed Matter; choose a 9-question format tour, 18 questions, or all available questions. Learning mode supports hints, explanations, retries and showing an answer. Test practice withholds feedback until completion. Device-local progress and an unfinished round are saved when browser storage is available. No account is required.

Drag placements also work by selecting a card and then activating a destination by touch or keyboard. Ordered steps also have up/down buttons. Resizing never rebuilds question state.

## Content and visual sources
Curriculum mapping: Matter section of Science 1–6 Curriculum NEW Alberta supplied by Darren Maltais. Original learning and assessment questions; not copied from the official sample exam. The initial Vretta screenshot audit was limited by unavailable rendering; no claim is made that this is an exact Vretta simulator.
Banner: generated photographic illustration. Particle models, thermometers, lake cross-sections and bridge joints are coded scientific schematics; labels and measurement scales are not generated artwork. The banner is decorative and not a calibrated measurement instrument.

## Validation
Run `node --test science-practice-lab/tests/core.test.cjs`.
The GitHub verification workflow checks every answer key, negative cases, full curriculum references and diverse rounds, then uses Chromium to complete all 54 questions and verify 1366×650, 1024×540, 768×900, 390×667, 320×568 and 640×360 layouts. It also checks keyboard placement, retry, saved-round restoration, deferred test feedback, dialog access and 125% CSS zoom reflow.
Browser screenshots and the report are retained under `validation/`. This workflow also converts the source banner to a smaller WebP.
