# Forecasting photos · verified public-domain sources

This Earth Systems image set is derived from government-owned photos and a public-domain donated image. Unlike the generated UI concept sheets, these are actual images of weather equipment, with scientifically accurate photo descriptions and no answer overlays.

* Radar: [NOAA Doppler Weather Radar](https://commons.wikimedia.org/wiki/File:Doppler_Weather_Radar_-_NOAA.jpg), NOAA / NSSL, public domain.
* Satellite: [GOES-16 with Earth](https://commons.wikimedia.org/wiki/File:GOES-16-GOES_East_with_Earth_in_Background_(46234058505).png), official NOAA **illustration** (not an observational photo), public domain.
* Weather station: [Peoria ASOS](https://commons.wikimedia.org/wiki/File:Peoria_ASOS.jpg), US National Weather Service, public domain.
* Computer forecast workstation: [AWIPS-3-head-workstation](https://commons.wikimedia.org/wiki/File:AWIPS-3-head-workstation.jpg), JonathanLamb, photographer released into public domain.

Images are fetched and cropped by `tools/build-earth-noaa-bank.py` to a compact 2 × 2 WebP image bank sprite. No observed numerical data are extracted from the images. NOAA's own [meteorologist equipment article](https://www.noaa.gov/stories/6-tools-our-meteorologists-use-to-forecast-weather) independently describes the science, but its original image downloads blocked automated requests. Wikimedia Commons copies permit attribution and reproducible assembly.

## Weather event follow-up (photographs and satellite composite)

The second sprite `assets/earth/noaa-weather-events.webp` (736 × 432, two by two) adds four credited event examples: (0) [NWS heat-dome explanatory diagram](https://commons.wikimedia.org/wiki/File:Heat_Wave.jpg) (not a photograph); (1) [Dimmitt tornado](https://commons.wikimedia.org/wiki/File:Dimmitt_Tornado1_-_NOAA.jpg), NOAA NSSL photographer Harald Richter; (2) [blizzard conditions at NWS Goodland](https://commons.wikimedia.org/wiki/File:Blizzard1_-_NOAA.jpg), NWS photographer Brad Schick; (3) [monsoon-related low near Australia](https://commons.wikimedia.org/wiki/File:Monsoon_Low_01_feb_2006_0150Z.jpg), NASA Earth Observatory illustration by Jesse Allen using MODIS observations. These are all marked public domain on their source pages. The words heatwave and monsoon refer to longer-lived weather patterns rather than a one-frame thermometer measurement; use those graphics only for qualitative matching. All four are cropped and credited, and none are live observed conditions or evidence of climate change attribution.
