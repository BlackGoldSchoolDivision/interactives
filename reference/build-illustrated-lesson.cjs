// Carry the existing classroom assignment into the approved illustrated scene.
const fs = require('fs');
const vm = require('vm');
const dir = 'renaissance-map';
const source = fs.readFileSync(dir + '/index.html', 'utf8');
const section = source.slice(source.indexOf('const locations='), source.indexOf('let state='));
const lesson = vm.runInNewContext(section + ';({locations,tasks,questions,chapters})');
const coordsSource = source.match(/const GEO_COORDS=(\{[^;]+\});/)[1];
const coords = vm.runInNewContext('(' + coordsSource + ')');
for (const [key, ll] of Object.entries(coords)) lesson.locations[key].ll = ll;
lesson.locations.ireland.fact = 'Ireland lies west of Britain. This identifies the island, which was not a single united kingdom in 1400.';
lesson.locations.castile.name = 'Castile (part of Spain today)';
lesson.locations.genoa.fact = 'Genoa was a trading republic. It also ruled Corsica. Its wealthy families supported the arts.';
lesson.locations.hre.fact = 'The Holy Roman Empire contained many states and cities. Italian cities such as Florence governed themselves.';
lesson.locations.ottoman.fact = 'This map shows the Ottoman Empire and dependent territories around 1683, almost 300 years after the Europe map.';
if (lesson.tasks.length !== 37 || lesson.questions.length !== 6) throw Error('Incomplete source assignment');
const geometry = JSON.parse(fs.readFileSync(dir + '/scene-geometry.json', 'utf8'));
const { W, H } = geometry;
const merc = lat => Math.log(Math.tan(Math.PI / 4 + Math.max(-85, Math.min(85, lat)) * Math.PI / 360));
const project = bounds => ([lat, lon]) => [(lon - bounds[0]) / (bounds[2] - bounds[0]) * W, (merc(bounds[3]) - merc(lat)) / (merc(bounds[3]) - merc(bounds[1])) * H];
const xy = project(geometry.bounds);
const ottomanBounds = [-8, 14, 55, 53];
const op = project(ottomanBounds);
geometry.anchors = Object.fromEntries(Object.entries(coords).map(([k, ll]) => [k, xy(ll)]));
geometry.anchors.atlantic = xy([46, -13]);
geometry.ottomanAnchors = Object.fromEntries(Object.entries(coords).map(([k, ll]) => [k, op(ll)]));
geometry.italyCenter = xy([41.6, 12.9]);
geometry.ottomanBounds = ottomanBounds;
function path(geom) {
  return (geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates).map(poly => poly.map(ring => ring.map((p, i) => {
    const a = op([p[1], p[0]]); return (i ? 'L' : 'M') + a.map(n => n.toFixed(2)).join(',');
  }).join('') + 'Z').join('')).join('');
}
const land = JSON.parse(fs.readFileSync(dir + '/data/scene-ottoman-land-50m.geojson', 'utf8'));
const empire = JSON.parse(fs.readFileSync(dir + '/data/scene-ottoman-1683.geojson', 'utf8'));
const landPath = land.features.map(f => path(f.geometry)).join('');
const labels = [['Constantinople', [41.008, 28.978]], ['Cairo', [30.044, 31.236]], ['Baghdad', [33.315, 44.366]], ['Algiers', [36.753, 3.058]], ['Tunis', [36.806, 10.182]], ['Tripoli', [32.887, 13.191]], ['Ottoman Empire', [38, 33]], ['Mediterranean Sea', [34.8, 18]], ['Black Sea', [43.5, 34]]].map(([name, ll]) => {
  const [x, y] = op(ll); return `<text class="${name.includes('Sea') ? 'sea' : 'place'}" x="${x}" y="${y}" font-size="${name === 'Ottoman Empire' ? 36 : 25}">${name}</text>`;
}).join('');
const mountain = (ll, width, height, angle = 0) => {
  const [x, y] = op(ll); return `<image href="assets/scene-mountains.webp" x="${x - width / 2}" y="${y - height / 2}" width="${width}" height="${height}" opacity=".72" transform="rotate(${angle} ${x} ${y})" style="mix-blend-mode:multiply"/>`;
};
const ottoman = `<g id="ottoman-illustration" hidden><rect x="-1500" y="-1100" width="4500" height="3300" fill="url(#sea-paper)"/><path d="${landPath}" fill="url(#vellum)" fill-rule="evenodd" stroke="#67431d" stroke-width="1.3"/><path id="region-ottoman" class="country" data-place="ottoman" d="${path(empire.features[0].geometry)}" fill="#a16b45" fill-opacity=".52" stroke="#78522f" stroke-width="2"/><path d="${path(empire.features[1].geometry)}" fill="none" stroke="#f9e2b0" stroke-width="3" stroke-dasharray="7 6" pointer-events="none"/>${mountain([39, 34], 350, 117)}${mountain([33, 44], 250, 83, -25)}${mountain([32, 2], 200, 66)}<g id="ottoman-labels" pointer-events="none">${labels}</g></g>`;
let fragment = fs.readFileSync(dir + '/scene-map-fragment.html', 'utf8');
// The geography builder produces the clean original scene before this addition.
if (fragment.includes('ottoman-illustration')) throw Error('Run build-illustrated-scene.cjs first');
fragment = fragment.replace('<defs>', '<defs><marker id="lesson-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#f6d773" stroke="#765025" stroke-width=".6"/></marker>');
fragment = fragment.replace('<g id="candidate-markers">', ottoman + '<g id="lesson-overlays" pointer-events="none"></g><g id="candidate-markers">');
fs.writeFileSync(dir + '/scene-map-fragment.html', fragment);
fs.writeFileSync(dir + '/scene-geometry.json', JSON.stringify(geometry));
fs.writeFileSync(dir + '/scene-lesson-data.json', JSON.stringify(lesson, null, 2));
const shell = fs.readFileSync(dir + '/scene-shell.html', 'utf8');
const html = shell.replace('__MAP__', fragment).replace('__GEOMETRY__', JSON.stringify(geometry)).replace('__LESSON__', JSON.stringify(lesson)).replace('__LESSON_CSS__', fs.readFileSync(dir + '/scene-lesson.css', 'utf8')).replace('__LESSON_JS__', fs.readFileSync(dir + '/scene-lesson.js', 'utf8'));
if (/__(MAP|GEOMETRY|LESSON|LESSON_CSS|LESSON_JS)__/.test(html)) throw Error('Unfilled lesson template');
fs.writeFileSync(dir + '/illustrated-scene.html', html);
console.log(`Built full illustrated assignment: ${lesson.tasks.length} map steps, ${lesson.questions.length} written questions, ${html.length} characters.`);
