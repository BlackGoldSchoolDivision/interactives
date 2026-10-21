#!/usr/bin/env python3
"""Build the Earth Systems extreme-weather card sprite from credited source images.

Used exactly once for the initial GitHub asset-bank contribution; also reproducible.
No test screenshot or generated GUI mockup is used as a question image.
"""
from __future__ import annotations

import hashlib
import io
import json
import time
import urllib.parse
from pathlib import Path

import requests
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
TARGET = ROOT / "assets" / "earth"
TARGET.mkdir(parents=True, exist_ok=True)
TILE_SIZE = (360, 240)
ASSET = TARGET / "extreme-weather-contexts.webp"
HEADERS = {"User-Agent": "SciencePracticeLab/1.0 (https://github.com/BlackGoldSchoolDivision/interactives)"}

# Order must correspond to visuals.js panel order and the item IDs in evidence-12.
SOURCES = [
    {
        "item": "hot",
        "file": "Heat Wave.jpg",
        "author": "NOAA National Weather Service / National Ocean Service",
        "license": "US Federal Government public domain",
        "use": "A diagram about a heat dome; illustration, not a measured temperature map.",
    },
    {
        "item": "funnel",
        "file": "60163 Tornado funnel.jpg",
        "author": "Ultra7",
        "license": "Author-released public domain",
        "use": "Photograph of an observed tornado funnel.",
    },
    {
        "item": "snow",
        "file": "Blizzard1 - NOAA.jpg",
        "author": "Brad Schick / National Weather Service",
        "license": "US Federal Government public domain",
        "use": "Photograph of blowing snow and severe winter conditions.",
    },
    {
        "item": "season",
        "file": "India - Chennai - Monsoon - 07 (3059060932).jpg",
        "author": "McKay Savage",
        "license": "CC BY 2.0 (https://creativecommons.org/licenses/by/2.0/)",
        "use": "Photo of flooded streets during monsoon rain in Chennai, India.",
    },
]

def download(filename: str) -> bytes:
    underscore = filename.replace(" ", "_")
    digest = hashlib.md5(underscore.encode("utf-8")).hexdigest()
    url = (f"https://upload.wikimedia.org/wikipedia/commons/"
           f"{digest[0]}/{digest[:2]}/{urllib.parse.quote(underscore)}")
    for attempt in range(3):
        try:
            response = requests.get(url, headers=HEADERS, timeout=35)
            response.raise_for_status()
            if not response.headers.get("Content-Type", "").startswith("image/"):
                raise ValueError(f"Non-image response from {url}")
            if not 6000 < len(response.content) < 18000000:
                raise ValueError(f"Unexpected file size: {len(response.content)}")
            print(f"Retrieved {filename}, {len(response.content)} bytes")
            return response.content
        except Exception:
            if attempt == 2:
                raise
            time.sleep(3 * (attempt + 1))
    raise RuntimeError("Unexpected download failure")

def main() -> None:
    sheet = Image.new("RGB", (2 * TILE_SIZE[0], 2 * TILE_SIZE[1]), "white")
    details = []
    for index, info in enumerate(SOURCES):
        original = Image.open(io.BytesIO(download(info["file"])))
        original = ImageOps.exif_transpose(original).convert("RGB")
        if min(original.size) < 240:
            raise ValueError("Source too small: " + info["file"])
        image = ImageOps.fit(original, TILE_SIZE, method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))
        sheet.paste(image, ((index % 2) * TILE_SIZE[0], (index // 2) * TILE_SIZE[1]))
        details.append({**info, "source": "https://commons.wikimedia.org/wiki/File:" +
                        urllib.parse.quote(info["file"].replace(" ", "_")), "crop": "centre-cropped to 3:2"})
    for quality in (78, 74, 70, 66, 62, 58):
        sheet.save(ASSET, "WEBP", quality=quality, method=6)
        if ASSET.stat().st_size <= 150000:
            break
    if ASSET.stat().st_size > 150000:
        raise ValueError("Image exceeds the 150 KB budget")
    credits = ROOT / "assets" / "source-notes" / "EARTH-WEATHER-PHOTO-CREDITS.json"
    credits.write_text(json.dumps({"output": "earth/extreme-weather-contexts.webp",
        "size": list(sheet.size), "panels": details}, indent=2) + "\n", encoding="utf-8")
    print(f"Created {ASSET}, {ASSET.stat().st_size} bytes; source credits in {credits}")


def build_climate_causes() -> None:
    """Four equal-footprint picture cards for an existing natural/human causes sort."""
    sources = [
        {
            "item": "eruption",
            "file": "Eruption at the summit of Kīlauea (118583).jpeg",
            "author": "U.S. Geological Survey / M. Zoeller",
            "license": "US Federal Government public domain",
            "use": "Eruption at a Hawaiian volcano; ash, aerosols and gases from volcanism can influence climate.",
        },
        {
            "item": "orbit",
            "file": "Earth's orbit parameters for the Milankovitch cycles.png",
            "author": "Sciencia58",
            "license": "CC0 1.0 public domain dedication",
            "use": "Scientific explanatory diagram of slowly changing orbital geometry, not a weather photograph.",
        },
        {
            "item": "fuel",
            "file": "Exhaust.jpg",
            "author": "Jensbn",
            "license": "Author-released public domain",
            "use": "Vehicle exhaust context. Visible plume is mostly condensed water; carbon dioxide is invisible.",
        },
        {
            "item": "industry",
            "file": "Alfred Palmer Smokestacks.jpg",
            "author": "Alfred T. Palmer / U.S. Office of War Information",
            "license": "US Federal Government public domain",
            "use": "Industrial smokestacks (1942). A historical context photo, not a measured greenhouse-gas reading.",
        },
    ]
    destination = TARGET / "climate-causes-contexts.webp"
    sheet = Image.new("RGB", (2 * TILE_SIZE[0], 2 * TILE_SIZE[1]), "white")
    credits = []
    for index, info in enumerate(sources):
        original = Image.open(io.BytesIO(download(info["file"])))
        original = ImageOps.exif_transpose(original).convert("RGB")
        if min(original.size) < 240:
            raise ValueError("Climate asset too small: " + info["file"])
        fitted = ImageOps.fit(original, TILE_SIZE, method=Image.Resampling.LANCZOS)
        sheet.paste(fitted, ((index % 2) * TILE_SIZE[0], (index // 2) * TILE_SIZE[1]))
        credits.append({**info, "source": "https://commons.wikimedia.org/wiki/File:" +
                        urllib.parse.quote(info["file"].replace(" ", "_")), "crop": "centre-cropped to 3:2"})
    for quality in (76, 72, 68, 64, 60, 56):
        sheet.save(destination, "WEBP", quality=quality, method=6)
        if destination.stat().st_size <= 150000:
            break
    if destination.stat().st_size > 150000:
        raise ValueError("Climate source sprite exceeds 150 KB")
    note = ROOT / "assets" / "source-notes" / "EARTH-CLIMATE-CAUSES-CREDITS.json"
    note.write_text(json.dumps({"output": "earth/climate-causes-contexts.webp",
                                  "panels": credits, "size": list(sheet.size)}, indent=2) + "\n", encoding="utf-8")
    print(f"Created {destination} ({destination.stat().st_size} bytes)")

if __name__ == "__main__":
    main()
    build_climate_causes()
