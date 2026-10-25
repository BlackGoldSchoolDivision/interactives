from pathlib import Path
import json,re
import pdfplumber

V=Path(__file__).resolve().parent.parent/'validation'
data=json.loads((V/'questions.json').read_text())
def plain(s):
    return s.replace('\u2019',"'").replace('\u2018',"'").replace('\u2013','-').replace('\u2014','-')
def bounds(doc):
    for page in doc.pages:
        assert all(c['x0']>=-1 and c['x1']<=page.width+1 and c['top']>=-1 and c['bottom']<=page.height+1 for c in page.chars),'Text outside page'
def text(page):return page.extract_text() or ''
with pdfplumber.open(V/'all-questions.pdf') as doc:
    assert len(doc.pages)==27
    bounds(doc)
    for i,q in enumerate(data):
        student=text(doc.pages[i//4]);key=text(doc.pages[18+i//8])
        assert 'TEACHER ANSWER KEY' not in student
        assert 'TEACHER ANSWER KEY' in key
        assert plain(q['focus']).upper() in key
        assert plain(q['options'][q['answer']]['label']) in key
        assert 'My clue:' in student
for file,count in [('student.pdf',3),('with-key.pdf',5),('offline.pdf',3),('expert-meanings-a4.pdf',5),('browser-print.pdf',5)]:
    with pdfplumber.open(V/file) as doc:
        assert len(doc.pages)==count,(file,len(doc.pages))
        bounds(doc)
        assert all('TEACHER ANSWER KEY' not in text(p) for p in doc.pages[:3])
        if count==5:assert all('TEACHER ANSWER KEY' in text(p) for p in doc.pages[3:])
        if 'a4' in file or 'browser-print' in file:assert abs(doc.pages[0].width-595.28)<1 and abs(doc.pages[0].height-841.89)<1
        else:assert abs(doc.pages[0].width-612)<1 and abs(doc.pages[0].height-792)<1
        if 'expert' not in file and 'browser-print' not in file:
            first=text(doc.pages[0]);assert '__________' in first and 'BEECH' in first and 'BEACH' in first
(V/'all-questions.pdf').unlink()
(V/'questions.json').unlink()
print('Passed all 72 paper questions and keys, glyph bounds, actual blank student downloads, separate answer pages, Letter/A4 sizes and offline PDF.')
