from pathlib import Path
import pdfplumber
p=Path(__file__).resolve().parent.parent/'validation'
for file in p.glob('*.pdf'):
    with pdfplumber.open(file) as pdf:
        assert len(pdf.pages)>0,file
        for page in pdf.pages:
            assert page.extract_text(),file
            for char in page.chars:
                assert char['x0']>=25 and char['x1']<=page.width-24,(file,char)
                assert char['top']>=20 and char['bottom']<=page.height-15,(file,char)
        text='\n'.join(page.extract_text() for page in pdf.pages)
        if file.name=='literal-student.pdf':
            assert 'TEACHER ANSWER KEY' not in text
        if file.name in ['literal-with-key.pdf','literal-a4.pdf']:
            keys=[i for i,page in enumerate(pdf.pages) if 'TEACHER ANSWER KEY' in page.extract_text()]
            assert keys and min(keys)>0
            for i in range(min(keys)):
                assert 'Answers and explanations' not in pdf.pages[i].extract_text()
        if file.name=='comic.pdf': assert len(pdf.pages)==2
        if file.name=='literal-a4.pdf': assert abs(pdf.pages[0].width-595.28)<1
        print(file.name,len(pdf.pages),'pages checked')
