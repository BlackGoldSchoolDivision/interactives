# Chromebook communication board: Face Control trial

A buildless browser communication board in the division's `interactives` repository. Open `index.html` through GitHub Pages; ChromeOS Face Control supplies ordinary pointer movement and left clicks. The website does not request camera access.

## Reference and scope

- 91 pages transcribed from PRC-Saltillo / AAC Language Lab's published low-tech LAMP Words for Life backup boards. The reference PDF includes application screenshots from 2015 and a 2019 copyright notice.
- Each page uses a fixed **12-column × 7-row** grid. Empty cells occupy their original positions. Resizing never reorders cells.
- The home screen and music page were also compared with the two screenshots supplied for this project. Symbols are cropped from the reference images, not replaced with emoji.
- Page links follow the reference's access-key images and category buttons. A word completes the selection, is added to the message, and returns home by default. Both word speech and automatic return can be changed in Settings.
- This is an independent educational access prototype, **not the official LAMP Words for Life application or its complete vocabulary/grammar engine**. It does not import `.ce`/`.wf` files, reproduce every vocabulary level, generate every inflection, or implement the official Word Finder.
- Extra category pages not included in the backup set (for example, Sports and vehicle Parts) retain their positions and report that the extra page is unavailable. They do not navigate to invented layouts. The spelling page's NUMBERS control similarly points users to the existing digit row.
- Compare relevant paths with the student's own vocabulary file before using the prototype for motor-pattern practice. Custom files and newer versions can differ. Reference years, regional vocabulary and illustrations are intentionally retained.

## Face Control setup

1. On the Chromebook, open **Settings → Accessibility → Cursor and touchpad → Face control**.
2. Enable pointer movement and map a comfortable gesture to **Left-click**. ChromeOS Automatic clicks is another OS-level option. Use one click method at a time.
3. Open the board and use the Full screen button, or the Chromebook full-screen key, for larger targets.
4. Try `I` → `want` → `want` → `drink` → `water`. The two `want` selections represent the home key followed by the word key on its page.
5. Try `more` to open music; `eat` → `FRUIT` for fruit; and `come` → `PET/FARM` for animals.

All controls are semantic buttons with accessible names and visible keyboard focus. Arrow keys move focus within the grid, Enter/Space activate buttons, and Escape returns to the previous page. Standard click handling is compatible with OS-generated clicks. A rapid browser double-click following navigation is suppressed to reduce accidental selection on the new page.

## Responsive behavior

The grid fits available desktop width and height, with minimum 44-pixel row height and 720-pixel board width. Narrow or very short windows scroll within the board instead of changing the motor layout. The surrounding controls remain accessible. Message and navigation state are kept during resizing.

## Speech and storage

Speech uses the browser's `speechSynthesis` voices. Availability, voice quality and offline support depend on the Chromebook. Speech failures leave the text message intact and show a status message. The full message is spoken by Speak or by selecting the message bar.

Messages remain in JavaScript memory only and are not sent to an application server or saved in local storage. Closing/reloading the tab clears them. Voice, speech speed, word-speech and return-home preferences are stored locally when available. A browser/OS voice may use a network service; use a device/local voice where appropriate.

## Sources

- [AAC Language Lab: LAMP Words for Life Manual Boards](https://aaclanguagelab.com/resources/lamp-words-for-life-manual-boards)
- [Reference backup PDF](https://aaclanguagelab.com/materials/LAMP_low_tech_backup.pdf)
- [Current English/Spanish home reference](https://aaclanguagelab.com/materials/LWFLLTB_ENGSP84lbw012425_FINAL1.pdf)
- [Official explanation of the LAMP approach](https://lampwflapp.com/)
- [Google: Chromebook Face Control](https://support.google.com/chromebook/answer/15824371?hl=en)

## Symbol attribution

Reference symbols and layouts © 2019 PRC-Saltillo. The source grants non-commercial reprint rights for clinical or personal use with its copyright notice included. Commercial use is prohibited; the material may not be used for resale. Contact PRC-Saltillo for questions regarding permissible uses. LAMP Words for Life is a registered trademark of its owner. This prototype is not affiliated with or endorsed by PRC-Saltillo.

## Files

- `index.html` — communication board and access settings
- `style.css` — fixed grid and responsive viewport layout
- `app.js` — navigation, message building, spelling, speech and keyboard access
- `boards.js` — page data, explicit row-major indices, source page numbers and links
- `symbols.webp` — locally hosted reference symbol crops packed into one image for fast page changes

No build step, account, API key or external JavaScript dependency is required.
