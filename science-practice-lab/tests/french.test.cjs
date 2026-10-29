'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');
const en=require('../topics'),enBefore=JSON.stringify(en),fr=require('../fr/topics'),C=require('../core'),L=require('../fr/locale'),bank=require('../fr/bank');
test('French edition translates every display field in all 306 questions and retains the English bank',()=>{
 assert.equal(JSON.stringify(en),enBefore);assert.deepEqual(fr.map(t=>t.data.questions.length),[54,90,72,54,36]);assert.equal(Object.keys(bank.records).length,306);
 for(const t of fr)for(const q of t.data.questions){const original=en.flatMap(t=>t.data.questions).find(x=>x.id===q.id);assert.equal(q.type,original.type);assert.equal(q.group,original.group);assert.notEqual(q.prompt,original.prompt);assert.notEqual(q.explanation,original.explanation);assert.notEqual(q.hint,original.hint);for(const[p,text]of bank.records[q.id]){assert.equal(p.split('.').reduce((obj,k)=>obj[k],q),text);assert(text.trim());assert.equal(L.translate(text),text,'French question text must remain stable: '+q.id+' '+p);}}
});
test('Every French key scores correctly, including translated dropdown values and decimal commas',()=>{
 for(const t of fr)for(const q of t.data.questions){assert(C.complete(q,q.answer),q.id);assert(C.grade(q,q.answer).correct,q.id);if(q.type==='dropdown'){for(const[i,b]of q.data.blanks.entries()){assert(b.options.includes(q.answer[i]),q.id);assert.equal(new Set(b.options).size,b.options.length,q.id);const wrong=q.answer.slice();wrong[i]=b.options.find(x=>x!==q.answer[i]);assert(!C.grade(q,wrong).correct,q.id);}}else if(q.type==='numeric')assert(C.grade(q,String(q.answer).replace('.',',')).correct,q.id);}
});
test('French teacher mapping covers all 169 statements, including French-specific K/U and satellite groupings',()=>{
 const counts=[];for(const t of fr){let count=0;for(const g of t.data.groups)for(const section of ['K','U','SP'])for(const[i,text]of g.source[section].entries()){count++;assert.equal(text,bank.curriculum.groups[g.id].source[section][i]);assert(t.data.questions.some(q=>q.refs.includes(g.id+'.'+section+(i+1))),g.id+'.'+section+(i+1));}counts.push(count);for(const q of t.data.questions)for(const ref of q.refs){const m=ref.match(/^(.+)\.(K|U|SP)(\d+)$/);assert(m&&t.data.groups.find(g=>g.id===m[1])?.source[m[2]][+m[3]-1],ref);}}
 assert.deepEqual(counts,[29,40,37,36,27]);assert.equal(bank.curriculum.provenance.tab,'6e année');
 const exploration=fr.find(t=>t.id==='space').data.questions;assert(exploration.some(q=>q.refs.includes('exploration.K3')&&q.refs.includes('exploration.K4')));
});
test('French progress keys, language entry points, speech and print hooks are isolated and present',()=>{
 assert.equal(new Set(fr.map(t=>t.storageKey)).size,5);for(const t of fr)assert.equal(t.storageKey,'science-practice-lab-fr-'+t.id+'-v1');assert.equal(L.topicStorageKey,'science-practice-lab-fr-topic');assert.equal(L.lang,'fr-CA');
 const html=fs.readFileSync(path.join(__dirname,'../../science-practice-lab-fr/index.html'),'utf8');assert.match(html,/<html lang="fr-CA">/);assert.match(html,/<base href="\.\.\/science-practice-lab\/">/);for(const name of ['bank','topics','strings','locale','artwork'])assert(html.includes('fr/'+name+'.js'));
 assert.match(fs.readFileSync(path.join(__dirname,'../app.js'),'utf8'),/L\?\.localize\(area\)/);
});
test('French interface translations are stable across repeated rendering and pluralized dynamic states',()=>{
 for(const [en,fr]of Object.entries(L.dictionary)){assert.equal(L.translate(fr),fr,'French text changed again: '+en);}
 for(const text of ['Choose 3 answers. You can change your choices before checking.','4 of 12 questions submitted','Question 2: Answer saved','6 of 18 answers saved · 2 flagged','3 of 4 placed','Place selected card in Zone A','Celsius thermometer from -20 to 20 degrees, with 2 degree intervals. The liquid level is 3 small intervals above -10 degrees.']){const value=L.translate(text);assert.notEqual(value,text,text);assert.equal(L.translate(value),value);}
});
test('Generated French content is current and English source changes require translation review',()=>{
 cp.execFileSync(process.execPath,[path.join(__dirname,'../fr/build.cjs'),'--check'],{stdio:'pipe'});
});

test('French asset descriptions are localized before compound placement labels are composed',()=>{
 const vm=require('node:vm'),original=require('../visuals').assets,assets=JSON.parse(JSON.stringify(original));
 const visuals={assets,scene:()=>''};
 vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../fr/artwork.js'),'utf8'),{window:{ScienceLabVisuals:visuals,ScienceLabLocale:L}});
 for(const [id,asset]of Object.entries(original))for(const [i,alt]of asset.alts.entries()){assert.equal(assets[id].alts[i],L.translate(alt));assert.notEqual(assets[id].alts[i],alt,id+' description '+i);}
 const label='Place selected card in Terres humides. '+assets['ecosystem-observations'].alts[0];
 assert(!/Original illustration|water strider|pond margin/.test(L.translate(label)));
});
