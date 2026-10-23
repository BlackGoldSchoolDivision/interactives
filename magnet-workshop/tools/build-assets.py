#!/usr/bin/env python3
"""Generate locally hosted, properly attributed photographic magnet asset.
CC BY 4.0 source: ScienceStockPhotos.com, Simple magnet bar on white background.
https://sciencestockphotos.com/free/physics/slides/bar_magnet.html
"""
from PIL import Image, ImageFilter, ImageChops
from io import BytesIO
from pathlib import Path
import urllib.request
source="https://sciencestockphotos.com/free/physics/bar_magnet.jpg"
req=urllib.request.Request(source,headers={"User-Agent":"Mozilla/5.0 (educational attribution; magnet workshop)"})
with urllib.request.urlopen(req,timeout=25) as r: raw=r.read()
im=Image.open(BytesIO(raw)).convert("RGB")
# Source magnet is diagonally photographed. Rotate to horizontal for animation.
im.thumbnail((1250,1250),Image.Resampling.LANCZOS)
im=im.rotate(-28,resample=Image.Resampling.BICUBIC,expand=True,fillcolor=(255,255,255))
# Subtract near-white studio backdrop while retaining the product body.
px=im.load()
mask=Image.new("L",im.size)
m=mask.load()
for y in range(im.height):
    for x in range(im.width):
        red,green,blue=px[x,y]
        saturation=max(red,green,blue)-min(red,green,blue)
        darkness=255-min(red,green,blue)
        # Keep the saturated red/blue enamel; white studio floor becomes transparent.
        m[x,y]=255 if darkness>65 and saturation>27 else 0
mask=mask.filter(ImageFilter.MaxFilter(17)).filter(ImageFilter.MinFilter(17)).filter(ImageFilter.GaussianBlur(1.2))
bounds=mask.getbbox()
if not bounds: raise RuntimeError("Missing subject")
l,t,r,b=bounds
if r-l<250 or b-t<35: raise RuntimeError("Subject mask too small")
pad=20
crop=(max(0,l-pad),max(0,t-pad),min(im.width,r+pad),min(im.height,b+pad))
out=im.crop(crop).convert("RGBA")
out.putalpha(mask.crop(crop))
dst=Path("magnet-workshop/assets")
dst.mkdir(parents=True,exist_ok=True)
out.save(dst/"bar-magnet.webp","WEBP",quality=92,method=6)
print("Created photographic magnet cutout",out.size,(dst/"bar-magnet.webp").stat().st_size)

# Build left-to-right and right-to-left variants without mirroring letters.
# Take clear, textured paint from the middle of each coloured half; the source
# has embossed S/N near the outer ends that must not be reversed or duplicated.
w,h=out.size
blue=out.crop((int(w*.20),0,int(w*.44),h))
red=out.crop((int(w*.56),0,int(w*.80),h))
alpha=out.getchannel("A")
def clean_magnet(left,right,filename):
    clean=Image.new("RGBA",(w,h),(0,0,0,0))
    seam=w//2
    clean.paste(left.resize((seam,h),Image.Resampling.BICUBIC),(0,0))
    clean.paste(right.resize((w-seam,h),Image.Resampling.BICUBIC),(seam,0))
    clean.putalpha(alpha)
    clean.save(dst/filename,"WEBP",quality=94,method=6)
    print(filename,clean.size,(dst/filename).stat().st_size)
clean_magnet(blue,red,"bar-magnet-blue-red.webp")
clean_magnet(red,blue,"bar-magnet-red-blue.webp")
