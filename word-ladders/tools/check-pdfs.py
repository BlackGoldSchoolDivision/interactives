from pathlib import Path
import json,re
import pdfplumber
from pypdf import PdfReader

ROOT=Path(__file__).resolve().parent.parent
V=ROOT/'validation'
data=json.loads((V/'puzzles.json').read_text())

def boxes(page,puzzle,key):
    for row in range(6):
        i=5-row
        chars=[c for c in page.chars if 70 <= c['x0'] < 325 and 215+row*72 <= c['top'] < 215+row*72+50 and c['size']>18]
        value=''.join(c['text'] for c in sorted(chars,key=lambda c:c['x0']))
        assert value==(puzzle['words'][i] if key or i==0 else ''),(puzzle['id'],key,i,value)
    assert all(c['x0']>=-1 and c['x1']<=page.width+1 and c['top']>=-1 and c['bottom']<=page.height+1 for c in page.chars),'Text outside page'

with pdfplumber.open(V/'check-all.pdf') as doc:
    assert len(doc.pages)==len(data)*2
    for i,page in enumerate(doc.pages):boxes(page,data[i%len(data)],i>=len(data))

head=data[0]
for file,count,key in [('student.pdf',1,False),('worksheet-with-key.pdf',2,True),('offline-student.pdf',1,False)]:
    with pdfplumber.open(V/file) as doc:
        assert len(doc.pages)==count
        boxes(doc.pages[0],head,False)
        if key:boxes(doc.pages[1],head,True)
        assert abs(doc.pages[0].width-612)<1 and abs(doc.pages[0].height-792)<1

expert=[p for p in data if p['level']=='expert']
with pdfplumber.open(V/'expert-pack.pdf') as doc:
    assert len(doc.pages)==len(expert)*2
    for i,page in enumerate(doc.pages):boxes(page,expert[i%len(expert)],i>=len(expert))
with pdfplumber.open(V/'starter-a4.pdf') as doc:
    assert len(doc.pages)==1
    boxes(doc.pages[0],next(p for p in data if p['level']=='starter'),False)
    assert abs(doc.pages[0].width-595.28)<1 and abs(doc.pages[0].height-841.89)<1
extreme=[p for p in data if p['level']=='extreme']
with pdfplumber.open(V/'extreme-pack.pdf') as doc:
    assert len(extreme)==5 and len(doc.pages)==10
    for i,page in enumerate(doc.pages):boxes(page,extreme[i%5],i>=5)
(V/'check-all.pdf').unlink()
(V/'puzzles.json').unlink()
print(f'Passed PDF checks: all {len(data)} worksheets and keys, blank student boxes after completed play, key-only separate pages, {len(expert)*2}-page Expert pack, 10-page Extreme pack, Letter/A4 sizes, offline PDF and page bounds.')
