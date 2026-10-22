const fs = require('fs');
const root = 'renaissance-map';
let svg = fs.readFileSync(`${root}/scene-map-fragment.html`, 'utf8');
// Reuse the atlas's exact Natural Earth coastlines, rivers and generated paper/mountain assets.
const cut = svg.indexOf('<g id="map-labels"');
if(cut < 0) throw Error('Atlas labels missing');
svg = svg.slice(0, cut) + '</g><g id="trade-routes"></g><g id="place-markers"></g><g id="candidate-markers"></g></g></svg>';
if (svg.includes('id="map-labels"')) throw Error('Atlas label replacement failed');
// This lesson identifies cities and seas; continental-scale historical state borders would mislead.
svg = svg.replace(/<path[^>]*fill-opacity="\.30"[^>]*\/>/g, '').replace(/<path[^>]*class="country"[^>]*\/>/g, '');
svg = svg.replace(/<g class="compass"[\s\S]*?<\/g>/, '').replace(/<image href="assets\/atlas-ship.webp"[^>]*\/>/, '');
svg = svg.replace('viewBox="0 0 1500 1100"', 'viewBox="550 585 390 380"').replace(/aria-label="[^"]*"/, 'aria-label="Illustrated geographic map of Italy and its surrounding seas"');
const shell = fs.readFileSync('reference/city-states/shell.html', 'utf8');
const css = fs.readFileSync('reference/city-states/style.css', 'utf8');
const js = fs.readFileSync('reference/city-states/app.js', 'utf8');
if (js.includes('</script>')) throw Error('Unsafe inline script');
fs.writeFileSync(`${root}/city-states.html`, shell.replace('/* STYLE */', css).replace('<!-- ATLAS -->', svg).replace('/* APP */', js));
console.log('Built City-States Atlas using existing illustrated map:', fs.statSync(`${root}/city-states.html`).size, 'bytes');
