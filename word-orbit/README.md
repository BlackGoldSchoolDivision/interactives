# Word Orbit

An original browser morphology game for the Interactive Learning Lab. Built from scratch; no implementation or word data is imported from the earlier Morpheme Match-Up.

Drag or tap drifting prefixes and suffixes onto the current word. A new word earns 10 points and joins the collection; a reviewed nonsense ending costs 3 points. Repeated discoveries earn no extra points. Intermediate words remain extendable. A branch with no remaining discoveries automatically returns to its original base. A collected word can be resumed to explore a different branch.

Twenty-three free-base families contain 213 reviewed constructions. Each word stores explicit morphemes, its final spelling, a short original meaning, and spelling notes where needed. The graph permits only one new prefix or suffix per step. The core base stays part of the family even when a final e is dropped, as in care + ing → caring. This is a finite teaching collection, not an exhaustive dictionary. The part stream includes supported continuations and checked nonsense endings; it does not penalise an unlisted real word.

Progress is in memory for the current page session; no student data leaves the browser. No login, microphone, API key, analytics, font service or runtime dependency is required. Optional speech uses the device's speech service. The Make it my own button embeds artwork, style and scripts into one offline HTML file.

## Validation

Run `node word-orbit/tools/check-model.cjs` from the repository root. `tools/check-browser.cjs` runs in the repository's dedicated GitHub Actions workflow using Playwright and Chrome, checking genuine pointer dragging, touch and keyboard input, repeat scoring, decoys, paused branch returns, incoming waves, required responsive sizes, spelling changes, family completion and actual offline play. Real browser screenshots are saved in `validation/` and the Lab thumbnail is generated from the tested page.

## Artwork and teaching background

Original generated artwork: a background space world and a transparent golden planet, created for this game from the approved Word Orbit visual direction. Word labels and controls are rendered as live HTML, not baked into the artwork. The core prompts used were “background-only whimsical space playground, no interface or text” and “transparent golden toy-like planet, clear centre for word labels.” Assets are compressed to WebP for classroom loading.

Instruction background: [Reading Rockets: Root Words, Suffixes, and Prefixes](https://www.readingrockets.org/topics/spelling-and-word-study/articles/root-words-suffixes-and-prefixes). Word meanings are original paraphrases, not copied dictionary entries.

## ELAL 1–6 expansion

The 24 October curriculum selection is documented in [CURRICULUM-REVIEW.md](CURRICULUM-REVIEW.md), with exact grade/tab/row references and a distinction between affixes named by the curriculum and example words selected for this game. The source explicitly names pony–ponies and leaf–leaves. New families also practise adjective endings, person-naming endings, -ment/-ity/-ance/-ence, -en and -ize. Spelling notes cover y → i, f → v and the -ability/-ibility forms. The decoy stream recognises -ous as a valid suffix where it can form dangerous.
