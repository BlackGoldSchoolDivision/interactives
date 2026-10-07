# Validation

Run `npm install` and `npm test` in this directory. The jsdom tests run the actual app and local data through all 30 dates, including early digital polygon selection, map transitions, curriculum prompts, two-date vector comparisons, previous boundaries, labels, geography, playback, keyboard navigation and resize state. `validation.txt` records results.

`verify-colonial.py` additionally checks exported early geometries and geographic outcomes with Shapely 2: the smaller 1763 Quebec, its Great Lakes/Ohio expansion in 1774, the separate Upper/Lower Canada regions in 1791, the 1841 union, unresolved Oregon and northeastern frontier, and France’s Saint-Pierre and Miquelon location marker. These checks verify the reconstruction’s intended teaching outcomes, not survey accuracy.

Use `../screen-checks.html` to repeat actual browser checks at 1024×540, 1366×650, 768×900, 390×667, 320×568, 640×360 and 512×270. Confirm there is no page-wide overflow, controls remain readable and at least 44px high, and work survives a live resize. The previous `live-preview-20261007.jpg` documents the earlier printed-panel edition; the digital edition’s browser evidence is recorded separately.
