# Forecasting photos · verified public-domain sources

This Earth Systems image set is derived from government-owned photos and a public-domain donated image. Unlike the generated UI concept sheets, these are actual images of weather equipment, with scientifically accurate photo descriptions and no answer overlays.

* Radar: [NOAA Doppler Weather Radar](https://commons.wikimedia.org/wiki/File:Doppler_Weather_Radar_-_NOAA.jpg), NOAA / NSSL, public domain.
* Satellite: [GOES-16 with Earth](https://commons.wikimedia.org/wiki/File:GOES-16-GOES_East_with_Earth_in_Background_(46234058505).png), official NOAA **illustration** (not an observational photo), public domain.
* Weather station: [Peoria ASOS](https://commons.wikimedia.org/wiki/File:Peoria_ASOS.jpg), US National Weather Service, public domain.
* Computer forecast workstation: [AWIPS-3-head-workstation](https://commons.wikimedia.org/wiki/File:AWIPS-3-head-workstation.jpg), JonathanLamb, photographer released into public domain.

Images are fetched and cropped by `tools/build-earth-noaa-bank.py` to a compact 2 × 2 WebP image bank sprite. No observed numerical data are extracted from the images. NOAA's own [meteorologist equipment article](https://www.noaa.gov/stories/6-tools-our-meteorologists-use-to-forecast-weather) independently describes the science, but its original image downloads blocked automated requests. Wikimedia Commons copies permit attribution and reproducible assembly.
