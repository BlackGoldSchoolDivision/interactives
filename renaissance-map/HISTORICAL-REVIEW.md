# Historical review — illustrated Renaissance atlas

Reviewed 8 October 2026 for Grade 8. The student interface keeps short explanations; these notes are for teachers and future maintenance. This is an approximate classroom atlas, not a research map or a boundary survey.

## Assignment coverage

The supplied Google Doc, **Interactive Renaissance Map**, was reread. Its instructions are carried into 37 mapping actions and six written-response prompts, with the same textbook page references. The original interactive remains separate and unchanged.

## Corrections in this version

| Item | Reviewed treatment |
| --- | --- |
| Dates | Europe is approximately 1400; the separate Ottoman overview is approximately 1683. The later empire must not be projected onto medieval Europe. |
| Castile | A kingdom in present-day Spain, rather than a map of unified modern Spain. Aragon, Portugal and Granada remain distinct. |
| Ireland | The island is a geographic target, not a claim that all Ireland was one sovereign kingdom. |
| England | The British mainland teaching outline includes Wales. English possessions on the continent are not merged with this answer region. |
| Holy Roman Empire | A collection of states and cities, with nominal imperial claims in Italy. Florence is now separately shown as a city-state; the broad Tuscany outline is approximate. Other small imperial territories are not individually delineated. |
| Genoa | Corsica is included in its highlighted territory. Small overseas colonies and temporary changes of overlord are omitted. |
| Naples and Sicily | The mainland kingdom and island kingdom are separated. Venice and the Papal States remain separate regions. |
| Ottoman outline | Replaces the distorted worksheet georeferencing with a broad geographic reconstruction checked against Shaw’s published historical map. Includes Algiers, Tunis, Tripoli, Egypt, Anatolia, the Balkans, Baghdad, Crete, Cyprus and the Hejaz. Excludes Vienna, inland Sudan, Persia and Yemen. Selected dependent territories have dotted outlines. |
| Religion | “Islam” refers to the Ottoman rulers. The empire included Muslim, Christian, Jewish and other communities. |
| Colours, crosses, arrows | Follow the assignment’s teaching key, not precise cultural boundaries or a single dated migration. Northern Renaissance culture also included art, humanism, science and learning. Yellow marks the four assigned Italian regions; Florence and other Italian centres also mattered. |
| Written answers | Prompts match the assignment. Phrase banks are accessible suggestions, not a verified answer key for the unseen textbook pages. “Genoa is Italy’s main … today” retains the textbook’s wording and should not be interpreted as a current statistical ranking of ports. |

## Sources consulted

- Original classroom assignment: https://docs.google.com/document/d/1EbUoezlmAmmwKkT5gmcZL0GYhN9toHdFXpyOJfgqt0s/edit
- The Metropolitan Museum of Art, **Italian Peninsula, 1000–1400**: https://www.metmuseum.org/toah/ht/07/eust.html — city-states, separate Naples/Sicily histories, Genoa and Corsica.
- The Met, **Venice and Northern Italy, 1400–1600**: https://www.metmuseum.org/toah/ht/08/eustn.html — Florence, Genoa, Venice, nominal imperial authority and changing Italian borders.
- The Met, **Rome and Southern Italy, 1400–1600**: https://www.metmuseum.org/toah/ht/08/eusts.html — Naples, Sicily and Papal territories.
- Euratlas, **Europe in 1400**: https://www.euratlas.net/history/europe/1400/index.html — cross-check of the named Italian and Iberian states. No Euratlas image or proprietary geometry is reproduced.
- David Rumsey Historical Map Collection, I. S. Clare / Cram, **Map of Europe A.D. 1400**, published 1901: https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~273938~90047221:Map-of-Europe-A-D--1400 — comparative historical atlas reference, not a contemporary medieval survey.
- Stanford J. Shaw, **The Rise of the Ottoman Empire: 1280–1683**, *History of the Ottoman Empire and Modern Turkey*, Cambridge University Press, 1976, pp. xiv–xvi: https://doi.org/10.1017/CBO9780511614965.003 — publisher’s map preview was inspected visually. It maps territorial growth; later losses require separate checking.
- The Met, **Arabian Peninsula, 1600–1800**: https://www.metmuseum.org/toah/ht/09/wap.html — Ottoman control of Yemen ended in 1635.
- Cambridge History of Islam, **The later Ottoman empire in Egypt and the fertile crescent**: https://www.cambridge.org/core/books/abs/cambridge-history-of-islam/later-ottoman-empire-in-egypt-and-the-fertile-crescent/6001BC11162C084E8BDC42355A86B2D7 — Yemen withdrawn in 1635; Baghdad regained in 1638; local authority varied.
- Royal Museums Greenwich, **Tripoli de Barbaria**: https://www.rmg.co.uk/collections/objects/rmgc-object-106049 — Ottoman regencies of Algiers, Tunis and Tripoli.
- The Met, **Balkan Peninsula, 1400–1600**: https://www.metmuseum.org/toah/ht/08/eusb.html — Christian and Jewish communities under Ottoman rule.
- The Met, **Northern Renaissance gallery visiting guide**: https://www.metmuseum.org/exhibitions/layered-narratives-the-northern-renaissance-gallery/visiting-guide — religion, humanism, art, trade and learning.

## Geometry and limits

Natural Earth coastlines and rivers provide geographic placement. Europe’s broad boundaries derive from André Ourednik’s Historical Basemaps (GPL-3.0), with explicit classroom adaptations. New `scene-*` data files preserve the original app’s files. The separately reviewed Ottoman reconstruction uses broad longitude/latitude control points and coastal land clipping, not the warped worksheet trace. Selected vassals are distinguished, but this overview does not map every port, exclave or variation of effective local control. Borders around 1400 and 1683 changed frequently and were less clear than modern national frontiers.

Decorative mountains are engravings placed in broad mountain regions, not elevation data. Generated artwork supplies paper, sea wash and illustrations; geographical outlines, city coordinates and labels are code-based.

Rebuild: `node reference/review-illustrated-geography.cjs`, then `node reference/build-illustrated-scene.cjs`, then `node reference/build-illustrated-lesson.cjs`.
