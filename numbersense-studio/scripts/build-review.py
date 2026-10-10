"""Build an offline review copy from the modular source; no browser or service needed."""
import base64
import json
import posixpath
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / 'review' / 'Number-Sense-Review.html'
PREFIX = '@number-sense/'

def data_url(mime, content):
    return f'data:{mime};base64,' + base64.b64encode(content).decode('ascii')

modules = {str(path.relative_to(ROOT)): path.read_text() for path in ROOT.rglob('*.js')}
imports = {}
for name, source in modules.items():
    def resolve(match):
        destination = posixpath.normpath(posixpath.join(posixpath.dirname(name), match.group(2).split("?", 1)[0]))
        if destination not in modules:
            raise ValueError(f'Missing import: {name} -> {destination}')
        return match.group(0).replace(match.group(2), PREFIX + destination)
    source = re.sub(r'\bfrom\s*([\'\"])(\.{1,2}/[^\'\"]+)\1', resolve, source)
    source = re.sub(r'\bimport\(\s*([\'\"])(\.{1,2}/[^\'\"]+)\1\s*\)', resolve, source)
    imports[PREFIX + name] = data_url('text/javascript', source.encode())

html = (ROOT / 'index.html').read_text()
css = (ROOT / 'styles.css').read_text()
font = data_url('font/ttf', (ROOT / 'assets' / 'nunito.ttf').read_bytes())
css = css.replace("url('./assets/nunito.ttf')", f"url('{font}')")
html = re.sub(r'<link rel="stylesheet" href="\./styles\.css(?:\?[^"]*)?">', lambda match: '<style>' + css + '</style>', html)
favicon = data_url('image/svg+xml', (ROOT / 'assets' / 'favicon.svg').read_bytes())
html = html.replace('href="./assets/favicon.svg"', f'href="{favicon}"')
entry = '<script type="importmap">' + json.dumps({'imports': imports}) + '</script>\n  <script type="module">import "@number-sense/app.js";</script>'
html = re.sub(r'<script type="module" src="\./app\.js(?:\?[^"]*)?"></script>', lambda match: entry, html)
license_text = (ROOT / 'assets' / 'NUNITO-OFL.txt').read_text().replace('</script', '&lt;/script')
html = html.replace('</body>', '<script type="text/plain" id="nunito-license">' + license_text + '</script>\n</body>')
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
OUTPUT.write_text(html)
print(json.dumps({'path': str(OUTPUT), 'bytes': OUTPUT.stat().st_size, 'modules': len(imports), 'external_dependencies': 0}))
