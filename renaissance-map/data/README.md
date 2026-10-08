# Renaissance Atlas geographic data

Updated October 8, 2026. Coordinates are WGS84 longitude, latitude. Leaflet renders them in Web Mercator, matching the activities' shared OpenStreetMap basemap. Modern basemap labels are context; they are not historical labels.

## Europe circa 1400

`europe-1400.geojson` and `context-1400.geojson` are extracts and adaptations of André Ourednik's Historical Basemaps, `geojson/world_1400.geojson`, original Git blob `290b30d8a1d4936ea94f61583fb52559e057d50a`.

Source: https://github.com/aourednik/historical-basemaps

Historical boundaries are approximate, continental-scale reconstructions. The source identifies its dataset as work in progress. It is not a boundary survey. The dataset is distributed under GPL-3.0; the full licence is provided in `../HISTORICAL-DATA-LICENSE.txt`. These adapted data are available under the same licence, without warranty. The original properties and coordinates, rounded to five decimal places, are retained in the context extract.

Adaptations: split the source's English-territory feature into the island of Ireland and the British mainland. Ireland is a geographic island label, not a single medieval sovereign kingdom; the English mainland outline includes Wales as in the assignment. French possessions are not merged into the England activity outline. Separate mainland and island Sicily features; relabel the mainland Kingdom of Naples. Retain Castile, Granada and Aragon separately. Map Italy's state outlines in geographic coordinates. Venice's overseas possessions are not represented. Genoa was absent as a separate feature in this continental dataset, so it has an explicitly approximate supplementary mainland coastal outline, drawn with a dashed border; Corsica and overseas possessions are omitted. Genoa is not a precise reconstruction of all holdings.

## Ottoman Empire 1683

`ottoman-1683.geojson` is an approximate overlay digitised from the provided classroom map showing 1683, then georeferenced with an thin-plate-spline fit to city positions in Web Mercator. It is source-derived classroom cartography; its frontier and coastline alignment is less precise than the Europe layer. It remains separate from the circa-1400 map. It must not be interpreted as Ottoman extent in 1400.

## Coastlines and basemap

`land.geojson`: Natural Earth, 1:110m land; public domain. Source: https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson (Git blob `04811d72fff2701ec67587e30ad8942675b511e3`). Used as neutral coastlines for printable vector maps. https://www.naturalearthdata.com/about/terms-of-use/

Live map: OpenStreetMap Standard tiles, © OpenStreetMap contributors, https://www.openstreetmap.org/copyright . The shared basemap helper was copied from the existing Maltais239/interactives `geography-shared/basemap.js`, retaining Light grey, Muted colour and Original views, normal caching and visible attribution. No tile prefetch or offline download is implemented.

The activity's colour key and arrows follow the classroom assignment. They show conceptual connections, not dated journeys. Saved work retains the existing 37-step sequence and storage key.
