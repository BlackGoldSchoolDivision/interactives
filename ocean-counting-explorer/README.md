# Ocean Counting Explorer — Phase 1 review build

**Preview:** https://interactives.blackgold.ca/ocean-counting-explorer/

This is a **separate replacement** for the early counting game at
https://maltais239.github.io/interactives/oceancounting/.
The original remains untouched, and the Interactive Learning Lab catalogue still points to the original until this replacement is reviewed.

## Playable Phase 1 (Grade 1 focus)

- **Count:** count 0–10, or optionally 0–20, with six original custom-drawn ocean creature illustrations; select each animal to show counting-order badges.
- **Compare:** select which of two groups has more or fewer creatures.
- **Sea stories:** model addition and subtraction using two groups of animals, with answers at or below 10/20 according to the selected range.
- **Ocean mix:** a five-question session cycling between these activities.
- Large number buttons, five-round progress indicator, retries without revealing the answer, scaffolded hints, optional spoken questions using local browser text-to-speech.
- No student account, analytics or personal information; does not save any progress.

## Architecture / handoff

- \`index.html\`: semantic layout, underwater SVG environment and six local SVG animal symbols.
- \`styles.css\`: responsive desktop, Chromebook/tablet and phone styles.
- \`logic.js\`: pure question-generation functions so arithmetic can be tested separately.
- \`app.js\`: small DOM interactions, keyboard-compatible buttons, touch counting, feedback and session progression.

The optional Google Fonts stylesheet is the only external visual dependency. Creature graphics and gameplay have no external assets and work on a standard static GitHub Pages site.

### Internal checks at Phase 1 checkpoint

- 4,800 randomized question assertions across all three activity types and both number ranges.
- 11 DOM-interaction checks covering initial render, tap-to-count, undo, hints, mode switching and range switching.
- Smartphone layout inspected in CSS and animal scale adjusted for dense groups. **Full live device/browser visual testing is still needed after Pages publication.**

## Next checkpoints (not implemented yet)

1. **Review Phase 1** and adjust size, arrangement and feedback from classroom use.
2. **Grade 2:** skip counting, odd/even groups and two-digit number stories.
3. **Grade 3 + Reef Researcher:** equal groups/arrays, numerical sequences and graphs of collected ocean data.
4. Test on school Chromebooks and phones, then change the Learning Lab entry and update its screenshot.

The early counting game should not be overwritten or removed in a later phase without approval.


## Illustrated visual pass (2026-10-12)

The Phase 1 SVG animal symbols and SVG reef scene were replaced with two local generated-illustration WebP image assets. Six character cutouts are arranged on a transparent sprite atlas (`assets/creatures.webp`); a painted reef strip lives in `assets/reef.webp`. The game uses CSS sprite positioning, not SVG drawings for animals. A compact question overlay now appears above the counting scene on phones. Pure mathematics logic and all four activity choices are unchanged.

**Release note:** This remains a separate review build. The previous Ocean Counting game and the Learning Lab catalogue entry are not modified. Review phone/Chromebook rendering and correct count-to-20 overlaps before switching the hub card.
