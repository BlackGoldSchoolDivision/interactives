# Interactive Learning Lab

A classroom activity catalogue for Engaging Students, created for Darren Maltais. It contains 146 entries across 12 subjects and 17 activity types. This edition adds 102 entries, keeps the original geography collection, and gives the writing tools, morphology, sorting, flashcards and varied question formats their own routes through the collection.

## Files

- index.html: hosted page, with the catalogue data included for a single-page load.
- catalogue.js: subject, type, geography and search filters.
- catalogue.json: authoritative editable catalogue data.
- Screenshots: served from Maltais239/interactives/learning-lab-images, a separate repository from the catalogue. The local images/ directory holds the optimized JPEGs used for upload. Images load as needed.
- Links_and_Captions.csv: all entry names, descriptions and links.
- Repository_Audit.csv: the 275 app entrypoints inventoried in this pass.
- MAINTENANCE.md: reported issues, observed defects and the next refresh work.
- source/build.py and source/page-template.html: reproducible page build.
- source/: source inventories and verification records from October 4, 2026. They document the audit; catalogue.json is the current editing source.

## Rebuild

Run python3 source/build.py from this directory. Python 3 is sufficient to rebuild the page using the existing external image links. To create or refresh thumbnails from captured JPEGs, install Pillow and run python3 source/build.py --captures /path/to/captures.

Keep each entry ID stable, use a unique launch URL, supply subject/type labels and add a truthful status note when an older app needs work. Regenerate Links_and_Captions.csv when catalogue metadata changes.

## Hosting and Google Sites

The page is published inside BlackGoldSchoolDivision/interactives and uses the existing GitHub Pages hosting. Its screenshot files are published separately in Maltais239/interactives/learning-lab-images; images/ is excluded from the Black Gold commit. Add its live URL to a full-page embed in the Engaging Students Google Site, then publish the Google Site. The catalogue can also be used directly as a standalone website. Future catalogue updates reuse the same URL.

See Google_Sites_Setup.md for the embed steps. The catalogue was published separately; creating or publishing the native Google Site remains an editor step.

## New morphology activities

Morpheme Missions and Word Detective add 36 word-building missions, a curated Word Lab, ten investigations, and printable activities with answer keys. Both are published in the Black Gold interactives repository. Source and research notes are maintained under morphology-resources/. Six earlier morphology tools retain their Update planned labels.
