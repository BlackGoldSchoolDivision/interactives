# Canada through time

A static classroom interactive for Canada’s territorial evolution, using the 23 historical snapshots in the Atlas of Canada timeline (1867–2003).

Open `index.html` through any static web server. No accounts, API keys, map tiles, or external runtime requests are needed. The data, D3 map renderer, and font are included locally.

## Map data

`data/historical-boundaries.geojson.gz` is a gzip-compressed WGS 84 FeatureCollection, with each unique polygon stored once. Its `regionViews` foreign member gives the dated region properties and polygon indexes. The application reconstructs each of the 23 snapshots in memory. Sources & data provides ordinary `canada-YEAR.geojson` downloads for every date. It never queries the government map service at runtime.

Source: Natural Resources Canada, [Territorial Evolution of Canada, 1867 to 2003](https://open.canada.ca/data/dataset/e88ce995-b69a-4595-a752-bb06b061b5a3), [official ArcGIS layer](https://maps-cartes.services.geo.ca/server_serveur/rest/services/NRCan/territorial_evolution_en/MapServer/8). Adapted under the [Open Government Licence – Canada](https://open.canada.ca/en/open-government-licence-canada). This app is an independent classroom adaptation and does not imply government endorsement.

The original Atlas has 23 snapshots ending in 2003, even though its page title refers to 2017. This interactive labels its period as 1867–2003 and does not present the final snapshot as a current legal map.

The polygons were exported with ArcGIS generalization at 0.008 degrees, repaired where necessary, then simplified by 1,000 metres in EPSG:3978 with polygon components and holes preserved. Names, dates, and Canadian membership come from the official source properties. One exact duplicate of the 2003 Manitoba feature was removed. See `data/sources.json` for export details. These shapes are for historical classroom display, not a boundary survey.

The app renders in a Canada Atlas Lambert conformal conic projection. It reverses GeoJSON ring winding for D3’s spherical polygon convention only in memory; the downloadable GeoJSON retains RFC 7946 winding.

Historical districts are labelled as districts. The map does not treat the District of Alberta as the Province of Alberta before 1905, or equate political boundaries with Indigenous homelands or treaty boundaries.

## Explanations and additional sources

The date explanations paraphrase the [original Atlas timeline](https://atlas.gc.ca/ette/en/index.html). Additional context for 1870 comes from [the Manitoba government](https://www.gov.mb.ca/chc/ourdept/origin_name_manitoba.html); context for 1999 comes from [the Nunavut Legislative Assembly](https://assembly.nu.ca/faq/how-was-nunavut-created). The exact joining dates can also be checked in [Canadian Heritage’s historical boundaries overview](https://www.canada.ca/en/canadian-heritage/services/historical-boundaries-canada.html).

## Controls

- Step through all 23 dates, play/pause, adjust playback speed, or jump to a milestone.
- Drag or pinch the map; use the zoom and reset controls.
- Click a region or use the equivalent region buttons below the map.
- Toggle labels or the preceding snapshot’s boundaries.
- Download the GeoJSON for any date from Sources & data.
- Left/Right keys change dates when focus is not on a form control. Escape pauses playback.
- A `?year=1905` link opens a chosen snapshot.

## Third-party assets

- [D3 7.9.0](https://github.com/d3/d3), ISC licence; `vendor/D3-LICENSE.txt`.
- [fflate 0.8.2](https://github.com/101arrowz/fflate), MIT licence; `vendor/FFLATE-LICENSE.txt`, for locally decompressing the boundary bundle.
- Nunito, SIL Open Font License 1.1; `vendor/NUNITO-OFL.txt`.
- Surrounding land from [Natural Earth](https://www.naturalearthdata.com/), public domain. This context is drawn underneath the historical Canadian boundaries and does not determine them.

To regenerate the boundary files, install `shapely` and `pyproj`, then run `python tools/export_boundaries.py`.
