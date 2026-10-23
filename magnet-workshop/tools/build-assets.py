#!/usr/bin/env python3
"""Create photographed magnet faces from the checked-in attributed bar magnet.
Source photo: ScienceStockPhotos.com, CC BY 4.0.
The texture is reused without flipping engraved labels.
"""
from PIL import Image
from pathlib import Path
dst=Path(__file__).resolve().parent.parent/"assets"
src=dst/"bar-magnet.webp"
if not src.is_file():
    raise FileNotFoundError("Required local magnet source not found: "+str(src))
original=Image.open(src).convert("RGBA")
w,h=original.size
# The engraved letters occupy the outer tips. Reuse the unobstructed
# enamel texture from the inside of each half, then write clear letters in CSS.
blue=original.crop((int(w*.20),0,int(w*.44),h))
red=original.crop((int(w*.56),0,int(w*.80),h))
alpha=original.getchannel("A")
def clean_magnet(left,right,filename):
    clean=Image.new("RGBA",(w,h),(0,0,0,0))
    seam=w//2
    clean.paste(left.resize((seam,h),Image.Resampling.BICUBIC),(0,0))
    clean.paste(right.resize((w-seam,h),Image.Resampling.BICUBIC),(seam,0))
    clean.putalpha(alpha)
    target=dst/filename
    clean.save(target,"WEBP",quality=94,method=6)
    print(filename,clean.size,target.stat().st_size)
clean_magnet(blue,red,"bar-magnet-blue-red.webp")
clean_magnet(red,blue,"bar-magnet-red-blue.webp")
