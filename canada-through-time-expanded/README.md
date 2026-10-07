# Canada through time: homelands, colonies & Confederation

Separate expanded classroom edition. The original `territorial-evolution-canada/` app and its data are unchanged.

30 stops: before 1600, 1667, 1713, 1763, 1774, 1791, 1840/1841, plus the original 23 dates (1867–2003). All dates now use the same geographic projection and digital map tools. Early colonial regions are selectable generalized reconstructions informed by the Atlas fourth edition and primary historical sources, not a government pre-1867 vector dataset. Inland and disputed limits are approximate. Printed panels remain linked references.

The Act of Union view shows the union effective in 1841, Oregon under joint occupation and the unresolved northeastern frontier. The separately linked 1849 panel is a later reference. Before 1600 is geographic context without provincial borders or invented Indigenous nation polygons. For 1912–1998, a unified NWT label overlays the unchanged historical district colours and boundaries.

Each date offers Grade 4 and Grade 7 inquiry questions based on Colin Ward’s supplied KUSP excerpts. Region selection, geography markers, keyboard navigation, playback, comparison, previous boundaries, zoom, and accessible region lists are included. Colonial and later dates download ordinary per-year GeoJSON; before 1600 offers the classroom timeline notes.

Sources and qualifications are in the app, `data/sources.json` and `data/colonial-digitization.json`. `data/build-colonial-boundaries.py` reproduces the authored early layer from the local reference data with Shapely 2. Coastlines are generalized modern geographic context; coloured claims do not imply Indigenous consent, absence or extinguishment of rights. All dependencies and maps are local; no analytics configuration is changed.

Serve this folder over HTTP. Functional checks are in `validation/`; responsive verification uses `screen-checks.html`, which embeds the same app in common classroom and phone viewport sizes.
