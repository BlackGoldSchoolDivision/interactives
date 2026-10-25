"""Build the self-contained offline copy and a local static preview directory."""
from pathlib import Path
import base64,re,shutil
root=Path(__file__).resolve().parents[1]
def uri(p,mime):return 'data:'+mime+';base64,'+base64.b64encode((root/p).read_bytes()).decode()
html=(root/'index.html').read_text()
css=(root/'style.css').read_text().replace('assets/body.ttf',uri('assets/body.ttf','font/ttf')).replace('assets/body-bold.ttf',uri('assets/body-bold.ttf','font/ttf')).replace('assets/lab-backdrop.webp',uri('assets/lab-backdrop.webp','image/webp'))
model=re.sub(r'\bexport\s+', '',(root/'model.mjs').read_text())
app=(root/'app.mjs').read_text()
app=re.sub(r'^import .*?;\n','',app,count=1)
app=app.replace("atlas.src='assets/material-atlas.webp'", "atlas.src='"+uri('assets/material-atlas.webp','image/webp')+"'")
html=html.replace('<link rel="stylesheet" href="style.css?v=3">','<style>'+css+'</style>')
html=html.replace('<script type="module" src="app.mjs?v=3"></script>', '<script type="module">\n'+model+'\n'+app+'\n'+"if(location.protocol==='file:'){const a=document.querySelector('a[download]');a.href=location.href;}"+'\n</script>')
license=(root/'assets/Nunito-License.txt').read_text()
html=html.replace('</body>','<template id="font-license">'+license.replace('&','&amp;').replace('<','&lt;')+'</template>\n</body>')
(root/'offline.html').write_text(html)
dist=root/'dist'
dist.mkdir(exist_ok=True)
for name in ['index.html','style.css','app.mjs','model.mjs','offline.html']:
 shutil.copy2(root/name,dist/name)
shutil.copytree(root/'assets',dist/'assets',dirs_exist_ok=True)
print('Built offline.html and dist/; offline bytes:',(root/'offline.html').stat().st_size)
