# Morphology activities

Two complementary activities for roughly Grades 3–6, with teacher support where needed.

- **Morpheme Missions**: 36 context-based word-building missions in three sets. Students select bases and affixes, investigate spelling boundaries, and explain meanings. The Word Lab adds six comparison forms. Six-word rounds can be printed with an answer key.
- **Word Detective**: ten investigations. Six examine base families, including compounds and lookalikes. Four compare the jobs of -er, -s, un- and past-tense -ed. Students sort six cards, explain evidence, and apply the discovery in context. Each case has a printable activity and explained answer key.

The published index.html files are standalone. They need no build service, sign-in or API. A web font is optional; browser speech synthesis is optional and falls back to reading together. All accepted words and card assignments are curated. No unrestricted word concatenation or automated scoring of written reflections is used.

## Build and check

From this directory:

```
python3 source/build.py
node source/checks.cjs
```

Edit source/content.py for word banks and explanations, source/missions.js and source/detective.js for behaviour, and source/ui.css for presentation. Rebuild before publishing. content.json is a generated test fixture.

Publish morpheme-missions/index.html and word-detective/index.html at their matching paths in BlackGoldSchoolDivision/interactives. The source and research notes are maintained under morphology-resources in that repository. Real screenshots are hosted separately in Maltais239/interactives/learning-lab-images.

See RESEARCH_NOTES.md for evidence, design decisions and teaching limits.
