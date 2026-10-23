"""Rebuild index.html from catalogue.json and the page template.

Run from any working directory: python3 source/build.py
Pass --captures /path/to/screenshots to refresh the published JPEG thumbnails.
"""
import argparse
import csv
import hashlib
import json
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parent.parent
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--captures', type=Path)
args = parser.parse_args()
data = json.loads((ROOT / 'catalogue.json').read_text())
assert len({a['id'] for a in data}) == len(data), 'Duplicate IDs'
assert all(a['url'].startswith('https://') and a['types'] for a in data)
alignment_path = ROOT / 'curriculum-alignment.json'
if alignment_path.is_file():
    alignment = json.loads(alignment_path.read_text())['activities']
    assert set(alignment) == {a['id'] for a in data}, 'Update the curriculum review when adding or removing an activity'
    for a in data:
        reviewed = alignment[a['id']]
        grades = reviewed['grades']
        assert grades == sorted(set(grades)) and all(type(g) is int and 1 <= g <= 12 for g in grades), f"Invalid grades: {a['id']}"
        a.update(grades=grades, grade_basis=reviewed['basis'], grade_note=reviewed['rationale'])
    (ROOT / 'catalogue.json').write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
    fields = ['Title', 'Subject', 'Activity types', 'Description', 'URL', 'Companion links', 'Status', 'Grade levels', 'Grade fit', 'Grade notes']
    fit_labels = {'curriculum': 'Curriculum connection', 'flexible': 'Flexible tool', 'enrichment': 'Enrichment', 'teacher-tool': 'Teacher tool', 'resource-level': 'Resource author levels', 'extension': 'Extension'}
    with (ROOT / 'Links_and_Captions.csv').open('w', newline='') as out:
        writer = csv.DictWriter(out, fieldnames=fields)
        writer.writeheader()
        for a in data:
            writer.writerow({'Title': a['title'], 'Subject': a['category'], 'Activity types': '; '.join(a['types']), 'Description': a['description'], 'URL': a['url'], 'Companion links': '; '.join(l['label'] + ': ' + l['url'] for l in a['links']), 'Status': a.get('status', ''), 'Grade levels': ', '.join(map(str, a['grades'])) if a['grades'] else 'Flexible', 'Grade fit': fit_labels.get(a['grade_basis'], a['grade_basis']), 'Grade notes': a['grade_note']})
if args.captures:
    from PIL import Image, ImageOps
    (ROOT / 'images').mkdir(exist_ok=True)
    for a in data:
        image = Image.open(args.captures / f"{a['id']}.jpg").convert('RGB')
        image.thumbnail((900, 620), Image.Resampling.LANCZOS)
        canvas = Image.new('RGB', (900, 620), '#eef2f3')
        canvas.paste(image, ((900 - image.width)//2, (620 - image.height)//2))
        canvas.save(ROOT / 'images' / f"{a['id']}.jpg", quality=79, optimize=True, progressive=True)
for a in data:
    if not a['image'].startswith('https://'):
        assert (ROOT / urlsplit(a['image']).path).is_file(), f"Missing image: {a['id']}"
payload = json.dumps(data, ensure_ascii=False, separators=(',', ':')).replace('<', '\\u003c')
template = (ROOT / 'source/page-template.html').read_text()
assert template.count('__CATALOGUE__') == 1
assert template.count('__SCRIPT_VERSION__') == 1
script_version = hashlib.sha256((ROOT / 'catalogue.js').read_bytes()).hexdigest()[:12]
style_version = hashlib.sha256((ROOT / 'homepage.css').read_bytes()).hexdigest()[:12]
assert template.count('__STYLE_VERSION__') == 1
template = template.replace('__SCRIPT_VERSION__', script_version).replace('__STYLE_VERSION__', style_version)
own_version = hashlib.sha256(b''.join((ROOT / p).read_bytes() for p in ['copy-engine.js', 'make-own.js', 'make-own.css', 'source-files.json'])).hexdigest()[:12]
assert template.count('__OWN_VERSION__') == 4
template = template.replace('__OWN_VERSION__', own_version)
(ROOT / 'index.html').write_text(template.replace('__CATALOGUE__', payload))
print(f"Built {len(data)} catalogue entries; {(ROOT/'index.html').stat().st_size:,} byte HTML")

