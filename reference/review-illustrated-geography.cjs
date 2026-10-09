// Independently reviewed, approximate classroom geometry for the illustrated atlas.
// Keeps the earlier worksheet-based interactive and its data unchanged.
const fs=require('fs'), clip=require('./polygon-clipping.umd.min.js');
const dir='renaissance-map/data/';
const read=n=>JSON.parse(fs.readFileSync(dir+n));
const write=(n,j)=>fs.writeFileSync(dir+n,JSON.stringify(j));
const polys=g=>g.type==='Polygon'?[g.coordinates]:g.coordinates;
const polygon=points=>[points.concat([points[0]])];
if(fs.existsSync(dir+'scene-global-land-50m.geojson')) {
 const world=read('scene-global-land-50m.geojson').features.flatMap(f=>polys(f.geometry));
 const cropped=clip.intersection(world,[polygon([[-8,14],[55,14],[55,53],[-8,53]])]);
 write('scene-ottoman-land-50m.geojson',{type:'FeatureCollection',features:[{type:'Feature',properties:{source:'Natural Earth 1:50m land, public domain; cropped to illustrated Ottoman overview'},geometry:{type:'MultiPolygon',coordinates:cropped}}]});
}
const land=read('scene-ottoman-land-50m.geojson').features.flatMap(f=>polys(f.geometry));
const context=read('context-1400.geojson'), europe=read('europe-1400.geojson');
// Corsica was held by Genoa; it is not a separate sovereign republic here.
const corsica=context.features.find(f=>f.properties.NAME==='Corsica');
const genoa=europe.features.find(f=>f.properties.id==='genoa');
genoa.geometry={type:'MultiPolygon',coordinates:[...polys(genoa.geometry),...polys(corsica.geometry)]};
genoa.properties.source+='; Corsica added from the historical context layer, checked against The Met Italian chronology';
context.features=context.features.filter(f=>f!==corsica);
// Show Florence as a city-state within the nominal imperial Italian sphere.
// This broad Tuscany outline is a teaching locator, not a surveyed frontier.
const florence=polygon([[10.65,43.55],[10.85,43.91],[11.3,44.1],[11.78,43.97],[12.05,43.7],[12.05,43.38],[11.55,43.2],[11.25,43.38],[10.85,43.35]]);
const hre=europe.features.find(f=>f.properties.id==='hre');
hre.geometry={type:'MultiPolygon',coordinates:clip.difference(polys(hre.geometry),[florence])};
for(const f of context.features.filter(f=>f.properties.NAME==='Holy Roman Empire')) f.geometry={type:'MultiPolygon',coordinates:clip.difference(polys(f.geometry),[florence])};
context.features.push({type:'Feature',properties:{NAME:'Florence',precision:'approximate',source:'Broad city-state locator; checked against The Met and Euratlas 1400; exact frontier omitted'},geometry:{type:'Polygon',coordinates:florence}});
write('scene-europe-1400.geojson',europe); write('scene-context-1400.geojson',context);
// Reconstruct a broad 1683 overview directly in lon/lat, replacing the warped
// worksheet trace. Control points checked against Shaw's published growth map,
// with Yemen excluded after 1635 (The Met; Cambridge History of Islam).
const core=polygon([[15.6,44.7],[16.2,45.35],[17.3,45.8],[17.6,46.5],[18.2,47.3],[18.9,47.8],[19.65,48.1],[20.7,47.9],[21.6,47.5],[21.45,46.3],[21.6,45.5],[22.6,44.7],[23.5,43.7],[25.5,43.65],[27.2,44.2],[28.9,45.3],[29.9,46.5],[29.7,47.45],[27.7,48.65],[26.2,48.55],[26.6,47.8],[28.1,47.6],[28.8,46.6],[30.9,46.7],[32.2,46.9],[34.1,47.2],[36.5,47.3],[39.15,47.1],[39.5,46.1],[37.5,45.1],[37.7,43.65],[40.9,41.5],[42.8,41.25],[43.6,40.5],[43.5,39.5],[44.7,38.35],[44.55,37.45],[45.3,36.6],[45.4,35.6],[46.25,34.5],[46.5,33.1],[47.55,31.8],[48.45,30.8],[48.5,29.7],[47.1,29.25],[44.5,29.5],[42.2,31.3],[39.1,32.3],[37.5,31.4],[35.8,29.2],[34.8,29.1],[34.2,30.1],[33.2,31.3],[30.8,31.7],[29.6,32],[29.3,30],[30,27],[31,25],[31.5,22],[33,22],[34.4,24.5],[35.3,28.4],[34.8,30],[36.2,32],[36.3,34],[35.5,36],[33,36],[30,35],[26,34.5],[22,35],[19.8,38],[19.7,39.5],[19.3,41],[18.5,42.3],[17.5,43],[15.6,44.7]]);
const northAfrica=polygon([[-1.8,35.1],[-1.7,36.1],[2,37.6],[6,38],[9,38],[12,37.8],[13,35],[16,33.5],[19,33.5],[22,33.6],[25,32.5],[30,32],[30,29],[25,28.5],[22,29.5],[19,29.7],[16,29.3],[13,29.5],[11,31],[9,33],[7,34],[4,34.8],[1,34.7],[-1.8,35.1]]);
const hejaz=polygon([[35,29.5],[37.1,28.4],[38.7,26],[40.7,23.6],[42.1,21],[42,19.8],[40.7,19.8],[39.4,21.8],[37.5,24.9],[35,28],[35,29.5]]);
// The Red Sea outposts do not imply possession of inland Sudan.
const redSea=polygon([[36.2,22.7],[37.5,21],[39.8,15.8],[39.6,15.2],[38.6,15.1],[37.9,17.5],[36.6,19.5],[35.9,21.8]]);
const islands=[polygon([[23.3,35.9],[26.5,35.9],[26.6,34.6],[23.3,34.6]]),polygon([[32,35.9],[34.8,35.9],[34.8,34.4],[32,34.4]]),polygon([[27.3,36.7],[28.4,36.7],[28.4,35.7],[27.3,35.7]])];
const dependencies=[polygon([[21.45,46.3],[21.6,47.5],[23.4,47.8],[25.2,47.4],[26.6,46.5],[25.7,45.6],[23.9,45.4],[21.6,45.5]]),polygon([[22.6,44.7],[23.9,45.4],[25.7,45.6],[27.2,45.4],[29,45.3],[27.2,44.2],[25.5,43.65],[23.5,43.7]]),polygon([[25.7,45.6],[26.6,46.5],[25.2,47.4],[26.2,48.55],[27.7,48.65],[29.7,47.45],[29.9,46.5],[29,45.3],[27.2,45.4]]),polygon([[32.35,45.4],[33,46.3],[33.8,46.5],[35.2,46.9],[36.55,46.7],[36.65,45.2],[35.9,44.5],[34.4,44.2],[33.2,44.3]]),polygon([[39.8,43.4],[41.3,43.6],[43.2,42.4],[43,41.6],[42.1,41.5],[41.3,41.5],[40.5,42.2]])];
const extent=clip.intersection(clip.union([core],[northAfrica],[hejaz],[redSea],...islands.map(p=>[p]),...dependencies.map(p=>[p])),land);
const dependent=clip.intersection(clip.union(...dependencies.map(p=>[p])),land);
write('scene-ottoman-1683.geojson',{type:'FeatureCollection',name:'Ottoman Empire and dependent territories, c. 1683',features:[{type:'Feature',properties:{id:'ottoman',name:'Ottoman Empire and dependent territories',period:'c. 1683',precision:'approximate',source:'Illustrated classroom overview reviewed against Stanford J. Shaw, The Rise of the Ottoman Empire 1280–1683 (Cambridge, 1976), pp. xiv–xvi; The Met Arabian Peninsula 1600–1800; broad borders and coastal possessions simplified; Natural Earth land clipping'},geometry:{type:'MultiPolygon',coordinates:extent}},{type:'Feature',properties:{id:'dependent',name:'Dependent territories (selected)',precision:'approximate',source:'Selected broad vassal territories; dotted boundary distinguishes them from the main shading'},geometry:{type:'MultiPolygon',coordinates:dependent}}]});
console.log('Reviewed illustrated geography: Corsica, Florence, corrected Ottoman overview. Original data unchanged.');
