const fs=require('fs'),vm=require('vm'),assert=require('assert');
function ring(p,r){let c=false;for(let i=0,j=r.length-1;i<r.length;j=i++)if(((r[i][1]>p[1])!==(r[j][1]>p[1]))&&(p[0]<(r[j][0]-r[i][0])*(p[1]-r[i][1])/(r[j][1]-r[i][1])+r[i][0]))c=!c;return c;}
function has(p,g){return(g.type==='Polygon'?[g.coordinates]:g.coordinates).some(poly=>ring(p,poly[0])&&!poly.slice(1).some(r=>ring(p,r)));}
const empire=JSON.parse(fs.readFileSync('renaissance-map/data/scene-ottoman-1683.geojson')).features[0].geometry;
const cases={Cairo:[[31.236,30.044],true],Tripoli:[[13.191,32.887],true],Tunis:[[10.182,36.806],true],Algiers:[[3.058,36.753],true],Baghdad:[[44.366,33.315],true],Buda:[[19.04,47.5],true],Vienna:[[16.374,48.208],false],Khartoum:[[32.53,15.6],false],Tehran:[[51.39,35.69],false],Sanaa:[[44.21,15.35],false],Lecce:[[18.17,40.35],false],Crete:[[25.1,35.2],true],Cyprus:[[33.3,35],true],Mecca:[[39.83,21.42],true]};
for(const[n,[p,want]]of Object.entries(cases)) assert.equal(has(p,empire),want,n);
const europe=JSON.parse(fs.readFileSync('renaissance-map/data/scene-europe-1400.geojson')).features;
assert(has([9.1,42.1],europe.find(f=>f.properties.id==='genoa').geometry),'Genoa includes Corsica');
assert(!has([11.256,43.77],europe.find(f=>f.properties.id==='hre').geometry),'Florence separately depicted');
const context=JSON.parse(fs.readFileSync('renaissance-map/data/scene-context-1400.geojson')).features;
assert(has([11.256,43.77],context.find(f=>f.properties.NAME==='Florence').geometry),'Florence city-state present');
const j=JSON.parse(fs.readFileSync('renaissance-map/scene-lesson-data.json'));
assert.equal(j.tasks.length,37);assert.equal(j.questions.length,6);
const old=fs.readFileSync('renaissance-map/index.html','utf8');
const original=vm.runInNewContext(old.slice(old.indexOf('const locations='),old.indexOf('let state='))+';({tasks,questions})');
assert.equal(JSON.stringify(j.tasks),JSON.stringify(original.tasks));assert.equal(JSON.stringify(j.questions),JSON.stringify(original.questions));
const geometry=JSON.parse(fs.readFileSync('renaissance-map/scene-geometry.json'));
for(const t of j.tasks)for(const k of [t.target,...t.other]) assert(geometry.anchors[k],'Missing anchor '+k);
const html=fs.readFileSync('renaissance-map/illustrated-scene.html','utf8');new vm.Script(html.match(/<script>([\s\S]*?)<\/script>/)[1]);
console.log('Passed: 37 original map steps + 6 written prompts; all candidate anchors; script parses; 17 targeted geography checks. Approximate boundaries still require the documented limits.');
