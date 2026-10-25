# Float Lab

An original Alberta Grade 5 science investigation lab. Buildless HTML, CSS, JavaScript modules, and original generated material textures. The illustrated workbench uses stationary glassware with animated liquid and solid contents. Open `/float-lab/` on a static web server.

## Investigations

- Compare solids and liquids with simulated tared mass measurements, equal-volume comparisons, seven fluids, salt concentration, and an optional force overlay.
- Layer liquids, predict their position, allow compatible adjacent layers to blend, stir and settle, and test an object in the stack.
- Adjust a water–ethanol mixture to suspend a castor-oil drop. The 20°C density table is indexed by mass percentage, with interpolation and binary-mixture volume contraction.
- Reshape a fixed mass/volume of clay into an upright open hull. Test cargo, freeboard and flooding, and compare kept design iterations.

The Outcomes button lists specific Grade 5 learning outcomes and skills, the corresponding activities, and limitations. Teacher notes include scientific assumptions, discussion prompts, sources, physical extensions, and safety context.

Student work stays in browser-local storage. No account, analytics, microphone or transmission of written work. Export CSV, print blank investigation sheets or trial records to PDF, or download the self-contained offline copy using Make it my own.

## Scientific limits

This is an educational model. Sample materials have selected approximate densities. Oil and compatible aqueous liquids are distinguished; mixing times are illustrative. Multicomponent blend densities other than water–ethanol use an additive-volume approximation. The boat is an upright open rectangular shell with constant clay volume; material strength, cracks and capsizing are omitted. The app does not claim full curriculum-strand coverage or replace hands-on construction and safe tool use.

Sources: `SOURCES.md`. Font licence: `assets/Nunito-License.txt`. The interface, model implementation, material artwork and investigation prompts were created independently. No Gizmos code, artwork, questions or interface elements are included.

## Checks and packaging

Run `node --test tools/check-model.mjs` and `node --check app.mjs`. Run `python tools/package.py` to rebuild `offline.html` and the local `dist/` preview. Neither `dist/` nor `.openai/` is required on GitHub Pages. Changes must also be checked at the six responsive viewports in the repository’s `RESPONSIVE-DESIGN.md`.

## Student investigation refinements

Test actions capture immutable conditions, observations, and any prediction made before testing. Changing a selected liquid without pouring does not alter the last experiment. Kept records retain their original data and can be compared two or three at a time inside My trials. Existing records are preserved; older liquid stacks without recorded pour order are identified explicitly.

Repeated identical-fluid pours form one band while preserving individual pour history. Water and ethanol blend when an incoming pour meets an exposed binary layer; an intervening oil layer can keep them apart. Other compatible layers blend during standing or stirring. Contact and mixing times are illustrative. A shared shallow-column calculation drives both the object drawing and its explanation. The drop uses spherical displacement; its drawn size is enlarged for visibility. The hull is a side cutaway with a dry interior until flooding. Guided hull tasks hold cargo fixed and seek the smallest outside volume among the permitted dimensions.

On phones, liquid selection, pour volume and Pour stay available in a bottom bar. Experiment actions bring the vessel into view. Sliders and other controls retain keyboard focus after updates. The figure descriptions provide the current layers or result as text.
