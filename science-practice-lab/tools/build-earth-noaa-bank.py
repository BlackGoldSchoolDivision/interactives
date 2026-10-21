#!/usr/bin/env python3
"""Reproducibly make compact, credited NOAA photo panels for Grade 6 science.
Sources are NOAA-owned photos in NOAA's "6 tools our meteorologists use" story,
NOT its lead iStock storm photograph. Artwork is cropped, not AI-generated.
"""
from io import BytesIO
from pathlib import Path
import json, time
from urllib.request import Request, urlopen
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "earth"
OUT.mkdir(parents=True, exist_ok=True)
DEST = OUT / "noaa-forecast-sources.webp"
SOURCE_PAGE = "https://www.noaa.gov/stories/6-tools-our-meteorologists-use-to-forecast-weather"
SOURCES = [
    ("radar", "c19e6fcd-4535-42de-8f10-afe988570f37",
     "A white-domed National Weather Service Doppler radar tower beneath a stormy sky.",
     "NOAA / National Weather Service"),
    ("satellite", "777803de-891c-48cd-8edd-4e4320e967c7",
     "A NOAA weather satellite shown above Earth in an official rendering.",
     "NOAA (official illustrative rendering, not a satellite photograph)"),
    ("station", "3e3c78ca-cb2b-491f-a258-c28533e8ebbd",
     "An automated surface weather station with a mast and measuring instruments.",
     "NOAA / National Weather Service"),
    ("workstation", "28f4063f-f87a-4a05-b734-62590e937e33",
     "A weather-forecast workstation displaying maps and processed observational data.",
     "NOAA / National Weather Service"),
]
SIDE = (368, 216)
CANVAS = Image.new("RGB", (SIDE[0] * 2, SIDE[1] * 2), "#eaf2f3")
for i, (key, uid, alt, credit) in enumerate(SOURCES):
    url = "https://www.noaa.gov/media/image_download/" + uid
    raw = None
    for attempt in range(3):
        try:
            req = Request(url, headers={"User-Agent": "BlackGoldSchoolDivision-ScienceEducation/1.0"})
            with urlopen(req, timeout=35) as response:
                if not response.headers.get("Content-Type", "").startswith("image/"):
                    raise ValueError(f"Unexpected content type for {key}: {response.headers.get('Content-Type')}")
                raw = response.read(8_000_001)
                if len(raw) > 8_000_000: raise ValueError("Source exceeds 8 MB")
            break
        except Exception:
            if attempt == 2: raise
            time.sleep(3 * (attempt + 1))
    im = Image.open(BytesIO(raw)).convert("RGB")
    if im.width < 300 or im.height < 170:
        raise ValueError(f"Source too small: {key}, {im.size}")
    cropped = ImageOps.fit(im, SIDE, method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))
    CANVAS.paste(cropped, ((i % 2) * SIDE[0], (i // 2) * SIDE[1]))
CANVAS.save(DEST, format="WEBP", quality=82, method=6)
check = Image.open(DEST)
assert check.size == (736, 432)
assert DEST.stat().st_size < 150_000, f"Sprite too large: {DEST.stat().st_size} bytes"
manifest = ROOT / "assets" / "image-bank.json"
data = json.loads(manifest.read_text(encoding="utf-8"))
record = {
    "id": "noaa-forecast-sources",
    "unit": "earth",
    "title": "NOAA weather-forecasting tools and real observation equipment",
    "source": None,
    "web": "earth/noaa-forecast-sources.webp",
    "grid": {"columns": 2, "rows": 2},
    "panels": [x[2] for x in SOURCES],
    "credit": "NOAA / National Weather Service; cropped and compiled for educational use",
    "sourcePage": SOURCE_PAGE,
    "sourceURLs": ["https://www.noaa.gov/media/image_download/" + x[1] for x in SOURCES],
    "note": "Panel 2 is an official satellite rendering; remaining three are photographs. No measured values are inferred from these pictures."
}
data["assets"] = [a for a in data["assets"] if a.get("id") != record["id"]] + [record]
manifest.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
print(f"Prepared {DEST}: {DEST.stat().st_size} bytes, {len(SOURCES)} NOAA source panels")
