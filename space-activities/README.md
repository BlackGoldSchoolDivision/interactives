# Space Arcade — Read, Move, Think

Light-mode Grade 4 space reading and thinking activities, adapted from `Space_Activity_Packet_Light.pdf`. Visual design follows the Black Gold Vocabulary Arcade Visual: warm graph paper, bold headings, outlined cards, and a pastel activity menu.

Open `index.html` in a modern browser, or serve this directory as a static site. No build step, third-party JavaScript, account, or server is required. Keep all files together.

The eight activities include two NASA-based classroom readings, a movable KWL sticky-note wall, an evidence/inference sort, a pros-and-cons decision board, a problem/solution/test board, ACAPS and SOAPSTone clue matching, and an eight-parts-of-speech word sort. Written prompts preserve all the packet's response areas, including the KWL reflection.

Cards support pointer dragging plus tap-and-place and keyboard placement. Objective supplied practice cards have feedback. Open-ended notes and written reasoning do not receive automatic grades. Teacher view provides guidance and model responses; it is a public display setting, not authentication.

Learner work is stored locally under `blackgold-space-arcade-v1`. Save work exports a JSON response file; Load work validates and imports it, with confirmation before replacing existing work. Print work prints current learner responses and card positions, without teacher answers. New learner clears only this app's local work after confirmation. Nothing is sent to GitHub or another server. Browser storage can be cleared or disabled, so the interface prompts learners to save a file.

Original sources: [NASA Space Place — How Do Telescopes Work?](https://spaceplace.nasa.gov/telescopes/en/) and [NASA — Skywatching FAQ](https://science.nasa.gov/skywatching/faq/). The classroom passages are adaptations, not direct quotations. The original light packet is included as `packet.pdf`.

Fonts are subsets of Barlow Condensed ExtraBold and Nunito Sans, carried over from the vocabulary visual and renamed internally for this app. Copyright 2017 The Barlow Project Authors; Copyright 2016 The Nunito Sans Project Authors. Licensed under the SIL Open Font License 1.1; see the included OFL files. Illustrations are native SVG artwork in `app.js`.
