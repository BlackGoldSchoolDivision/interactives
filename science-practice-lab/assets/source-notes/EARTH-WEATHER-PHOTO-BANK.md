# Earth Systems extreme weather · photography bank

Images for the four picture cards in `evidence-12`, arranged in a 2×2 image atlas in this order: **heat dome diagram, tornado, blizzard, seasonal monsoon flooding**. The source image files are fetched and resized by `scripts/build-earth-weather-bank.py`, using exact Wikimedia Commons image titles. The image is **not generated documentation of real weather**; the first panel is a federal government illustration, while the other three panels are photographs of real conditions.

The project uses original generated teaching diagrams elsewhere. For **actual weather observations**, sourced real photography provides greater scientific credibility than an AI-rendered storm. Crop/edit attribution and image licenses are preserved in `source-notes/EARTH-WEATHER-PHOTO-CREDITS.json`.

**Licenses/credit:**
- Heat dome illustration — NOAA National Weather Service/National Ocean Service, U.S. Government public domain: https://commons.wikimedia.org/wiki/File:Heat_Wave.jpg
- Tornado photograph — Ultra7, released to the public domain: https://commons.wikimedia.org/wiki/File:60163_Tornado_funnel.jpg
- Blizzard photograph — Brad Schick, U.S. National Weather Service, public domain: https://commons.wikimedia.org/wiki/File:Blizzard1_-_NOAA.jpg
- Monsoon flood photograph — McKay Savage, **CC BY 2.0** https://creativecommons.org/licenses/by/2.0/: https://commons.wikimedia.org/wiki/File:India_-_Chennai_-_Monsoon_-_07_(3059060932).jpg (cropped and resized to fit the tile).

**Assessment safeguards:** the photos are visual context, not scored measurements. The heat dome diagram does not prove the temperature on any particular day. Monsoon flooding is just one possible consequence of a monsoon system, not its defining feature; the original written explanation remains visible on the card. These are four equal-size cards with no answer-colour coding or labels baked in.

**State:** the image files are only used in the live application after the image-building workflow has successfully added them to GitHub and browser decoding checks pass.