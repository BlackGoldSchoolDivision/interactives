"""Build two standalone, dependency-free app pages from the editable sources."""
from pathlib import Path
import json
from content import LEVELS, MISSIONS, LAB_EXTRAS, PART_MEANINGS, BASE_MEANINGS, CASES, RESEARCH, SPELLING_SOURCES

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / 'source'
OUTPUT = ROOT.parent if ROOT.name == 'morphology-resources' else ROOT

def validate():
    assert len(MISSIONS) == 36
    assert len({m['id'] for m in MISSIONS + LAB_EXTRAS}) == 42
    for level in LEVELS:
        assert sum(m['level'] == level for m in MISSIONS) == 12
    for m in MISSIONS:
        assert len(m['parts']) == 3 and m['parts'][1] in BASE_MEANINGS
        assert m['sentence'].count('___') == 1
        assert len(set(m['meanings'])) == 3 and all(m['meanings'])
        assert not m['parts'][0] or m['parts'][0] in PART_MEANINGS
        assert not m['parts'][2] or m['parts'][2] in PART_MEANINGS
        if m['spellings']:
            assert m['rule'] and len(set(m['spellings'])) == 3
            assert m['spellings'].count(m['word']) == 1
    assert len({c['id'] for c in CASES}) == 10
    for c in CASES:
        groups={g['id'] for g in c['groups']}
        assert len(c['cards']) == 6 and len({a['id'] for a in c['cards']}) == 6
        assert all(a['group'] in groups and a['evidence'] for a in c['cards'])
        assert all(any(a['group']==g for a in c['cards']) for g in groups)
        for q in [c['evidence'], c['apply']]:
            assert len(set(q['answers'])) == 3 and all(q['answers'])

def page(slug,title,description,nav,bodyclass,mark,data,script):
    shared=dict(research=RESEARCH,sources=SPELLING_SOURCES)
    payload=json.dumps({**shared,**data},ensure_ascii=False,separators=(',',':')).replace('<','\\u003c')
    nav_html=''.join(f'<button type="button" data-action="route" data-route="{route}">{label}</button>' for route,label in nav)
    other_slug='word-detective' if slug=='morpheme-missions' else 'morpheme-missions'
    other_title='Word Detective' if slug=='morpheme-missions' else 'Morpheme Missions'
    css=(SOURCE/'ui.css').read_text()
    js='\n'.join((SOURCE/p).read_text() for p in ['engine.js','common.js',script])
    html=f'''<!doctype html>
<html lang="en-CA"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="{description}"><title>{title}</title><link rel="canonical" href="https://interactives.blackgold.ca/{slug}/"><style>{css}</style></head>
<body class="{bodyclass}"><a class="skip" href="#main">Skip to activity</a>
<header><div class="bar"><a class="brand" href="./" aria-label="{title} home"><span class="brand-mark" aria-hidden="true">{mark}</span><span>{title}<small>Interactive Learning Lab</small></span></a><nav aria-label="Main navigation">{nav_html}</nav></div></header>
<main id="main" tabindex="-1"></main><footer><span>Meaningful parts. Thoughtful practice.</span><div><a href="../{other_slug}/">Try {other_title}</a> &nbsp;·&nbsp; <a href="../interactive-learning-lab/">Learning Lab</a></div></footer>
<div id="announcer" class="visually-hidden" aria-live="polite" aria-atomic="true"></div><div id="print-area" class="print-area"></div>
<script>const DATA={payload};\n{js}</script></body></html>'''
    target=OUTPUT/slug/'index.html'
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(html)
    print(f'{slug}: {len(html.encode()):,} bytes')

if __name__=='__main__':
    validate()
    page('morpheme-missions','Morpheme Missions','Build words from bases, prefixes and suffixes. Explore spelling changes, meaning in context and printable morphology activities.', [('game','Missions'),('lab','Word Lab'),('teacher','Teacher corner')],'missions','M+',dict(levels=LEVELS,missions=MISSIONS,extras=LAB_EXTRAS,partMeanings=PART_MEANINGS,bases=BASE_MEANINGS),'missions.js')
    page('word-detective','Word Detective','Investigate word families, sort evidence and compare affix jobs. Ten morphology investigations with explanatory feedback and printable case files.', [('cases','Investigations'),('teacher','Teacher corner')],'detective','Wd',dict(cases=CASES),'detective.js')
    (SOURCE/'content.json').write_text(json.dumps(dict(missions=MISSIONS,extras=LAB_EXTRAS,cases=CASES),ensure_ascii=False,indent=2)+'\n')
