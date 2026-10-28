const test=require('node:test'),assert=require('node:assert/strict');
const banks=[require('../data'),require('../energy'),require('../earth'),require('../living'),require('../space')];
const before=banks.flatMap(t=>t.questions).map(q=>[q.id,q.type,JSON.stringify(q.answer),JSON.stringify(q.refs)]);
const topics=require('../topics'),P=require('../practice-design'),C=require('../core');
const all=topics.flatMap(t=>t.data.questions);
test('All 306 upgraded presentations preserve question identities, scoring and curriculum mappings',()=>{
 assert.equal(all.length,306);
 assert.deepEqual(all.map(q=>[q.id,q.type,JSON.stringify(q.answer),JSON.stringify(q.refs)]),before);
 for(const q of all){assert(q.presentation.title,q.id);assert(q.presentation.instruction.length>25,q.id);assert(C.grade(q,q.answer).correct,q.id);}
});
test('Multi-select completion requires the requested number of unique choices',()=>{
 const q=all.find(q=>q.id==='particles-03');
 assert(!C.complete(q,[0]));assert(!C.complete(q,[0,1,2]));assert(!C.complete(q,[0,0]));assert(C.complete(q,[0,2]));
 assert.match(P.instruction(q),/Choose 2 answers/);assert.equal(P.completion(q,[0,1,2]),'Choose 1 fewer answer.');
});
test('Choice positions vary by round and never change during an attempt',()=>{
 const values=[0,1,2,3,4];assert.deepEqual(P.mixed(values,'round-A'),P.mixed(values,'round-A'));
 assert.notDeepEqual(P.mixed(values,'round-A'),P.mixed(values,'round-B'));assert.deepEqual(P.mixed(values,'round-A').slice().sort(),values);
 assert.deepEqual(values,[0,1,2,3,4]);
 const singles=all.filter(q=>q.type==='single');const first=singles.filter(q=>P.mixed(q.data.options.map((_,i)=>i),q.id+'-options-preview')[0]===q.answer).length;
 assert(first<singles.length/2,'Correct choices remain predictably first');
});
test('One-to-one matching swaps occupied destinations and returns displaced bank cards',()=>{
 const q=all.find(q=>q.id==='particles-13');
 const swap=P.placement(q,{m:'A',v:'B'},'m','B');assert.deepEqual(swap,{m:'B',v:'A'});
 const replace=P.placement(q,{m:'A'},'v','A');assert.deepEqual(replace,{v:'A'});
 const original={m:'A'};P.placement(q,original,'v','A');assert.deepEqual(original,{m:'A'});
});
test('Sorting and deliberate many-to-one matches retain multiple cards in a destination',()=>{
 const sort=all.find(q=>q.id==='particles-07');const [a,b]=sort.data.items;const z=sort.data.zones[0].id;
 assert.deepEqual(P.placement(sort,{[a.id]:z},b.id,z),{[a.id]:z,[b.id]:z});
 const match=all.find(q=>q.id==='expansion-11');const [c,d]=match.data.items;const dest=match.data.zones[0].id;
 assert.equal(Object.keys(P.placement(match,{[c.id]:dest},d.id,dest)).length,2);
});
test('New scientific models render without publishing their answer keys as labels',()=>{
 for(const id of ['photosynthesis-01','photosynthesis-06']){const q=all.find(q=>q.id===id),svg=P.visual(q);assert(svg.includes('aria-label'));assert(svg.includes('not to scale'));assert(!svg.includes(q.explanation));}
 const q=all.find(q=>q.id==='collaboration-18');assert.match(q.prompt,/missing at least one/);assert.equal(q.answer,4);
});
test('The original ecosystem source and optimized atlas are complete image files',()=>{
 const fs=require('node:fs'),path=require('node:path'),base=path.join(__dirname,'../assets/living/ecosystem-observations');
 const source=fs.readFileSync(base+'.png'),web=fs.readFileSync(base+'.webp');
 assert.equal(source.subarray(1,4).toString(),'PNG');assert.equal(source.readUInt32BE(16),1536);assert.equal(source.readUInt32BE(20),1024);
 assert.equal(web.subarray(0,4).toString(),'RIFF');assert.equal(web.subarray(8,12).toString(),'WEBP');assert.equal(web.readUInt32LE(4)+8,web.length);
 assert(web.length>1000&&web.length<220000,'Four-panel web atlas must be complete and within its documented size budget');
});
