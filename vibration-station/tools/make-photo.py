from PIL import Image, ImageEnhance, ImageFilter, ImageOps
from pathlib import Path
from io import BytesIO
import urllib.request
source='https://commons.wikimedia.org/wiki/Special:FilePath/Cigar_Box_Guitar_made_out_of_a_Wine_Box_from_Rioja.jpg'
req=urllib.request.Request(source,headers={'User-Agent':'VibrationStation-EducationalTool/1.0 (image attribution in teacher notes)'})
with urllib.request.urlopen(req,timeout=50) as r: data=r.read()
im=Image.open(BytesIO(data)).convert('RGB')
im=ImageOps.exif_transpose(im)
im=ImageEnhance.Color(im).enhance(1.22)
im=ImageEnhance.Contrast(im).enhance(1.07)
im=im.resize((1100,795),Image.Resampling.LANCZOS)
destination=Path('vibration-station/assets');destination.mkdir(parents=True,exist_ok=True)
im.save(destination/'string-box.webp','WEBP',quality=88,method=6)
print('Photo',im.size,(destination/'string-box.webp').stat().st_size)
