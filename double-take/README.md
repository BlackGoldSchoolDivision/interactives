# Double Take

A sticker-book word game for sound-alike spellings and multiple meanings. There are 72 original questions, with 12 in each combination of three difficulties and two word challenges. Each ten-question round contains no repeats; another round reshuffles the bank. Tap, keyboard and pointer drag all select the same answer. Checking explains the choice and points to a clue in the sentence. A first-try answer earns 100 points; an answer after a retry earns 50. Rechecking cannot award points twice.

Starter suggests Grade 2+, Explorer Grades 3–4+, and Expert Grades 5–6+. These are flexible recommendations, not validated difficulty norms. Pictures support the task; the sentence establishes the intended meaning. Same spelling includes words with the same pronunciation and words with different pronunciation or stress. Whole-sentence speech uses the device's available voice, which can vary; no microphone is requested.

## Curriculum connections

Focused review against [ELAL 1–6 Curriculum New Alberta](https://docs.google.com/spreadsheets/d/161qFfYA8ID-xNPDVZfNXc8GtZL-GNk4ec0V6fK8atQ0/edit).

- Grade 2, A107:A119: homophones, homographs and meanings across situations.
- Grade 3, A131:A145: context, multiple meanings and word use in texts.
- Grade 4, A131:A138 and A327:A332: precise vocabulary, word meanings and homophone spelling/meaning.
- Grade 5, A164:A168: vocabulary, context and meaning.
- Grade 6, A150:A162: contextual word study and precise vocabulary.

The interactive offers practice in these specific skills, not complete coverage of the larger outcomes.

## Teacher practice and offline copy

Print practice selects a difficulty, challenge, ten questions or all twelve, Letter/A4 and optional separate answer keys. Four questions fit on each student page; keys follow on separate pages, with explanations. All questions are drawn from original data, never a student's selected answers. Save as PDF directly downloads a sharp, font-embedded PDF. Print opens an ink-friendly browser print view.

Make it my own downloads one self-contained HTML including code, all 18 image assets, local fonts, licenses and PDF tools. Play and PDF generation work without network access. No account, analytics, microphone or remote student record is used. In-progress rounds live in the current tab; challenge changes and resizing preserve work.

## Verification

Run `node double-take/tools/check-model.cjs`. The dedicated GitHub workflow also checks browser play, pointer dragging, keyboard selection, retries and completion in every bank, saved work across challenge changes, all required responsive sizes, real PDF downloads, browser printing and an offline copy with network access blocked. Python checks all worksheet and key pages and glyph bounds. Scene assets and rendered PDFs are visually reviewed.

Artwork is generated specifically for this project, following the user's approved sticker-book mockup, and all text, controls and game state are live HTML/CSS/JavaScript. See THIRD-PARTY.md for dependency notices.
