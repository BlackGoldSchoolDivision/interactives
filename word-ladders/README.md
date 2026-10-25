# Word Ladders

A classroom word-ladder game with a flat mountain-adventure design, six-word clue trails, free climb, grade/difficulty selection and direct teacher PDF downloads. Eighteen original puzzles provide six ladders in each level.

- Starter: suggested Grades 1–2, familiar three-letter words.
- Explorer: suggested Grades 3–4, four-letter words and wider vocabulary.
- Expert: suggested Grades 5–6+, five- and six-letter words with richer vocabulary.

These bands are suggestions, not validated grade norms. The six-word clue trails have five checked single-letter changes. Free climb accepts other classroom-bank words and permits routes with different lengths. These are letter ladders; a letter change is not always a single-phoneme change.

## Teacher PDFs

Teacher PDF opens a separate selector for difficulty, ladder, one worksheet or all six at a level, Letter/A4 paper and optional answer keys. Student pages contain a given starting word, five blank answer rows, six large letter-box rows, clues and name/date spaces. Answer keys are off by default and are appended as separate pages. PDFs are drawn as vector text and shapes with embedded, subset print fonts, so they remain sharp on paper. They are generated from the original puzzle, never a student's live answers.

Save as PDF downloads a PDF directly. Print uses a separate ink-friendly HTML view and the browser's print dialog. The Make it my own download embeds game code, word list, artwork, PDF library and print fonts into a single offline HTML file; play and PDF generation work without a network connection.

The paper example in `examples/head-to-tail-with-key.pdf` contains a blank worksheet and a separate teacher key. It uses the same PDF renderer as the game.

## Verification

`node word-ladders/tools/check-model.cjs` checks all 18 ladders, all 90 letter changes, level counts, clues, alternate routes, hints and worksheet/key plans. The dedicated GitHub workflow checks actual browser play, all required responsive sizes, preserved typed answers during resizing, completion, PDF controls, actual browser downloads, print content and offline play/PDF generation. Python checks every worksheet's blank boxes and every key's filled boxes, all page bounds, Letter/A4 sizes and the 12-page Expert pack. PDF pages are rendered and visually reviewed during implementation.

## Content and licensing

All clues and puzzle selections are original. No worksheet text or page design from a word-ladder book is copied. ELAL connections concern vocabulary, spelling patterns and meaningful word use, with letter/sound distinctions made explicit in teacher notes. Wordnik supplies the MIT word list for free-climb validation. See [THIRD-PARTY.md](THIRD-PARTY.md) for jsPDF, word-list, font and filter notices.

No account, microphone, analytics or remote student record is used. Progress is local to the current tab, and resizing preserves the current trail and typed word.
