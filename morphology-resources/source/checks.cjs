const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const core=require('./engine.js');
const bank=JSON.parse(fs.readFileSync(path.join(__dirname,'content.json'),'utf8'));

// A seed must reproduce a round, without mutating the full bank or losing cards.
const input=bank.missions.map(m=>m.id);
const first=core.shuffle(input,core.random(184));
assert.deepEqual(first,core.shuffle(input,core.random(184)));
assert.deepEqual(input,bank.missions.map(m=>m.id));
assert.equal(new Set(first).size,36);
assert.notDeepEqual(first,input);
for(const answer of ['','un','play']){
 const choices=core.options(answer,['','un','re','play','un'],core.random(6));
 assert.equal(choices.length,3);assert.equal(new Set(choices).size,3);assert.equal(choices.filter(c=>c===answer).length,1);
}
// Empty affixes are real selections. An unanswered column must not be accepted.
assert.equal(core.partsCorrect(['','help','ful'],['','help','ful']),true);
assert.equal(core.partsCorrect([null,'help','ful'],['','help','ful']),false);
assert.equal(core.partsCorrect(['un','help','less'],['un','help','ful']),false);

// Protect full bases at the boundaries that previously made these apps misleading.
const expected={hoping:['','hope','ing'],caring:['','care','ing'],baker:['','bake','er'],happiness:['','happy','ness'],luckily:['','lucky','ly'],tried:['','try','ed'],carried:['','carry','ed'],running:['','run','ing'],stopped:['','stop','ed'],swimmer:['','swim','er'],bigger:['','big','er']};
for(const [word,parts] of Object.entries(expected)){
 const item=bank.missions.find(m=>m.word===word);
 assert.deepEqual(item.parts,parts);
 assert.equal(item.spellings.filter(w=>w===word).length,1);
 assert.equal(core.wordSum(item.parts),parts.filter(Boolean).join(' + '));
}
assert.equal(bank.extras.find(m=>m.word==='crying').parts[1],'cry');
assert.match(bank.extras.find(m=>m.word==='played').rule,/Keep the y/);

// Every card can be solved; duplicate spellings must keep distinct sentence jobs.
for(const c of bank.cases){
 const answers=Object.fromEntries(c.cards.map(a=>[a.id,a.group]));
 assert.deepEqual(core.wrongGroups(answers,c.cards),[]);
 delete answers[c.cards[0].id];assert.deepEqual(core.wrongGroups(answers,c.cards),[c.cards[0].id]);
 answers[c.cards[0].id]='invalid';assert.equal(core.wrongGroups(answers,c.cards).length,1);
}
const paints=bank.cases.find(c=>c.id==='s').cards.filter(a=>a.word==='paints');
assert.equal(paints.length,2);assert.notEqual(paints[0].id,paints[1].id);assert.notEqual(paints[0].group,paints[1].group);assert.notEqual(paints[0].sentence,paints[1].sentence);
const family=(id,w)=>bank.cases.find(c=>c.id===id).cards.find(c=>c.word===w).group;
assert.equal(family('flow','flower'),'lookalike');assert.equal(family('flow','flowing'),'family');
assert.equal(family('hope','hoping'),'family');assert.equal(family('hope','hopping'),'lookalike');
assert.equal(family('corn','cornfield'),'family');assert.equal(family('corn','unicorn'),'lookalike');
assert.deepEqual(core.summary([{completed:true,supported:false},{completed:true,supported:true},{completed:false,supported:true}]),{completed:2,independent:1,supported:1});
assert.equal(core.escape('<script>"&'), '&lt;script&gt;&quot;&amp;');

// Both shipped standalone scripts must parse, with no unresolved file dependencies.
const root=path.join(__dirname,'..');
const output=path.basename(root)==='morphology-resources'?path.dirname(root):root;
for(const app of ['morpheme-missions','word-detective']){
 const html=fs.readFileSync(path.join(output,app,'index.html'),'utf8');
 const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
 assert.equal(scripts.length,1);new vm.Script(scripts[0],{filename:app});
 assert.doesNotMatch(html,/<script[^>]+src=/);
 assert.match(html,/@media print/);assert.match(html,/<main id="main" tabindex="-1">/);
}
console.log('PASS: curated content, full bases, spelling options, seeded rounds, duplicate-card jobs, scoring, escaping and both shipped scripts.');
