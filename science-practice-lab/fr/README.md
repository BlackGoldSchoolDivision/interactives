# French Grade 6 Science Practice Lab

The French entry point is `../../science-practice-lab-fr/index.html`. It shares the English interaction engine and image assets, and loads the French bank before the app starts. French unit state and the last selected unit use their own local-storage keys. Language switching retains the current topic and assignment parameters.

The 17 question JSON files contain reviewed French display strings in the order returned by `fields()` in `build.cjs`. Question IDs, interaction types, item/zone IDs and numerical/index answer keys remain stable. `topics.js` clones the English bank, applies those strings, remaps dropdown keys by option index, and adapts curriculum references to the French worksheet structure.

`curriculum.json` preserves the supplied **Science 1-6 Curriculum NEW Alberta**, **6e année** worksheet statements verbatim for the five existing units. There are 169 statements. French action–reaction K/U placement, the solar-system model outcome and the split natural-satellite/orbit statements differ from the English tab; `frenchRefs()` handles those differences explicitly.

`ui.json`, `diagrams.json` and the dynamic templates in `locale.js` localize the shared interface and accessible diagram descriptions. `artwork.js` replaces the orbital-geometry image containing English labels with an original French schematic. Curriculum text is authored content, not machine translation at runtime.

After editing French source files, run:

```sh
node science-practice-lab/fr/build.cjs
node --test science-practice-lab/tests/*.test.cjs
```

Commit the generated `bank.js` and `strings.js`. `source-manifest.json` contains hashes of the reviewed English source questions. If an English question changes, review its French equivalent before updating that question's hash and rebuilding. CI rejects stale bundles, missing display strings, invalid dropdown keys and uncovered French curriculum statements. The French browser suite completes all 306 questions, audits interface language and checks six screen sizes, print packets, sharing, speech and bilingual progress isolation alongside the English suites.
