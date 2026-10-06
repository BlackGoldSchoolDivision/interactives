"""Export NRCan's historical snapshots as self-contained classroom GeoJSON.

Run: python tools/export_boundaries.py [downloaded-source.geojson]
Requires: pip install shapely pyproj
"""
import collections
import gzip
import hashlib
import json
import pathlib
import sys
import urllib.parse
import urllib.request

from pyproj import Transformer
from shapely import make_valid
from shapely.geometry import mapping, shape, Polygon, MultiPolygon, GeometryCollection
from shapely.ops import transform, unary_union

ROOT = pathlib.Path(__file__).resolve().parents[1]
SERVICE = "https://maps-cartes.services.geo.ca/server_serveur/rest/services/NRCan/territorial_evolution_en/MapServer/8"
YEARS = [1867, 1870, 1871, 1873, 1874, 1876, 1880, 1881, 1882, 1886, 1889, 1895, 1897, 1898, 1901, 1905, 1912, 1920, 1927, 1949, 1999, 2001, 2003]
PROVINCES = {"British Columbia", "Alberta", "Saskatchewan", "Manitoba", "Ontario", "Quebec", "New Brunswick", "Nova Scotia", "Prince Edward Island", "Newfoundland", "Newfoundland and Labrador"}
out = ROOT / "data"
out.mkdir(exist_ok=True)

if len(sys.argv) > 1:
    source = json.loads(pathlib.Path(sys.argv[1]).read_text())
else:
    params = urllib.parse.urlencode({"where": "1=1", "outFields": "OBJECTID,PROV_NAME,NOM_PROV,START_TIME,END_TIME,COLOUR,Period_Group,HISTO", "returnGeometry": "true", "outSR": "4326", "geometryPrecision": "5", "maxAllowableOffset": "0.008", "f": "geojson"})
    with urllib.request.urlopen(SERVICE + "/query?" + params, timeout=90) as response:
        source = json.load(response)
if source.get("error") or source.get("exceededTransferLimit") or not source.get("features"):
    raise ValueError("The source query failed or was incomplete")

forward = Transformer.from_crs(4326, 3978, always_xy=True).transform
backward = Transformer.from_crs(3978, 4326, always_xy=True).transform

def polygons(geometry):
    if isinstance(geometry, Polygon):
        return [geometry]
    if isinstance(geometry, (MultiPolygon, GeometryCollection)):
        return [p for g in geometry.geoms for p in polygons(g)]
    return []

def round_coords(value):
    if isinstance(value, (list, tuple)):
        return [round_coords(v) for v in value]
    return round(value, 5) if isinstance(value, float) else value

cache = {}
snapshots = collections.defaultdict(list)
seen = set()
repairs = 0
duplicates = 0
for feature in source["features"]:
    p = feature["properties"]
    year = int(p["START_TIME"])
    if year not in YEARS:
        continue
    name = p["PROV_NAME"]
    original_key = hashlib.sha256(json.dumps(feature["geometry"], sort_keys=True).encode()).hexdigest()
    key = (year, name, p["Period_Group"], original_key)
    if key in seen:
        duplicates += 1
        continue
    seen.add(key)
    if original_key not in cache:
        geographic = shape(feature["geometry"])
        if not geographic.is_valid:
            geographic = unary_union(polygons(make_valid(geographic)))
            repairs += 1
        projected = transform(forward, geographic)
        # 1 km is smaller than the line width in the whole-country view.
        # Preserve every island, polygon component, and hole.
        simplified = projected.simplify(1000, preserve_topology=True)
        converted = mapping(transform(backward, simplified))
        geometry = {"type": converted["type"], "coordinates": round_coords(converted["coordinates"])}
        parts = [geometry["coordinates"]] if geometry["type"] == "Polygon" else geometry["coordinates"]
        for rings in parts:
            for i, ring in enumerate(rings):
                signed_area = sum(p[0] * q[1] - q[0] * p[1] for p, q in zip(ring, ring[1:]))
                if (i == 0 and signed_area < 0) or (i > 0 and signed_area > 0):
                    ring.reverse()
        # Use an interior point of the largest land component for the label.
        largest = max(polygons(projected), key=lambda poly: poly.area)
        point = largest.representative_point()
        label = backward(point.x, point.y)
        geo_hash = hashlib.sha256(json.dumps(geometry, sort_keys=True).encode()).hexdigest()[:16]
        cache[original_key] = (geometry, [round(v, 5) for v in label], geo_hash, round(projected.area / 1e6))
    geometry, label, geo_hash, area = cache[original_key]
    in_canada = p["Period_Group"].startswith("Canada")
    if not in_canada:
        kind = "British colony or territory"
    elif name in PROVINCES:
        kind = "Province"
    elif name.startswith("District of"):
        kind = "Historical district"
    else:
        kind = "Territory"
    snapshots[year].append({"type": "Feature", "id": str(p["OBJECTID"]), "properties": {"name": name, "name_fr": p.get("NOM_PROV", name), "year": year, "in_canada": in_canada, "kind": kind, "source_id": p["OBJECTID"], "shape_key": geo_hash, "label": label, "area_km2": area}, "geometry": geometry})

for year in YEARS:
    if not snapshots[year]:
        raise ValueError(f"Missing snapshot {year}")
    collection = {"type": "FeatureCollection", "name": f"Canada territorial evolution {year}", "attribution": "Adapted from Natural Resources Canada, Territorial Evolution of Canada, 1867 to 2003; Open Government Licence – Canada.", "features": snapshots[year]}
    (out / f"canada-{year}.geojson").write_text(json.dumps(collection, ensure_ascii=False, separators=(",", ":")))

unique = {}
polygon_features = []
region_views = []
for features in snapshots.values():
    for feature in features:
        geometry = feature["geometry"]
        parts = [geometry["coordinates"]] if geometry["type"] == "Polygon" else geometry["coordinates"]
        polygon_ids = []
        for part in parts:
            key = hashlib.sha256(json.dumps(part, separators=(",", ":")).encode()).hexdigest()
            if key not in unique:
                unique[key] = len(polygon_features)
                polygon_features.append({"type": "Feature", "id": unique[key], "properties": {}, "geometry": {"type": "Polygon", "coordinates": part}})
            polygon_ids.append(unique[key])
        region_views.append({**feature["properties"], "geometry_type": geometry["type"], "polygon_ids": polygon_ids})
bundle = {"type": "FeatureCollection", "name": "Canada territorial evolution — shared polygon geometry", "attribution": "Adapted from Natural Resources Canada; Open Government Licence – Canada.", "regionViews": region_views, "features": polygon_features}
(out / "historical-boundaries.geojson.gz").write_bytes(gzip.compress(json.dumps(bundle, ensure_ascii=False, separators=(",", ":")).encode(), compresslevel=9, mtime=0))

manifest = {"source": SERVICE, "dataset": "https://open.canada.ca/data/dataset/e88ce995-b69a-4595-a752-bb06b061b5a3", "licence": "https://open.canada.ca/en/open-government-licence-canada", "retrieved": "2026-10-05", "coordinate_reference_system": "WGS 84 (EPSG:4326)", "display_projection": "Canada Atlas Lambert (standard parallels 49° and 77°, central meridian 95°W)", "source_generalization_degrees": 0.008, "additional_simplification_metres": 1000, "invalid_unique_geometries_repaired": repairs, "duplicate_source_features_removed": duplicates, "years": YEARS, "feature_counts": {y: len(snapshots[y]) for y in YEARS}}
(out / "sources.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2))
print(json.dumps({"years": len(YEARS), "source_features": len(source["features"]), "exported_features": sum(map(len, snapshots.values())), "unique_geometries": len(cache), "repairs": repairs, "duplicates": duplicates, "bytes": sum(f.stat().st_size for f in out.glob("*.geojson")), "largest_file": max(f.stat().st_size for f in out.glob("*.geojson"))}))
