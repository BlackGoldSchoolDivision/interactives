import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {activities,topics,bonusGames,inTopic} from '../catalogue.js';
import {topicPreview} from '../previews.js';

test('all 29 original categories and all 3 bonus games are preserved exactly once',()=>{
  const original=['integers','comparing','situations','factortree','exponents','probability','simplify','sharing','convert','percentdiv','ratios','addsubfrac','multfrac','addsubdec','multdec','divdec','repdec','longdiv','multmulti','percentof','compdec','bedmas','algebra','coordinates','transformations','area','volume','unitrate','frequency'];
  assert.deepEqual(activities.map(a=>a.id).sort(),original.sort());
  assert.equal(new Set(activities.map(a=>a.id)).size,29);
  assert.deepEqual(topics.map(t=>inTopic(t.id).length),[7,4,7,5,4,2]);
  assert.deepEqual(bonusGames.map(g=>g.id),['starcatch','memoryflash','targetpractice']);
});
test('each topic has a scalable mathematical preview and every activity belongs to a topic',()=>{
  for(const topic of topics) assert.match(topicPreview(topic.id),/viewBox="0 0 400 150"/);
  for(const activity of activities) assert.ok(topics.some(t=>t.id===activity.topic));
});
test('the shell has relative assets, enabled zoom, and no external execution or identity dependency',async()=>{
  const html=await readFile(new URL('../index.html',import.meta.url),'utf8');
  assert.match(html,/width=device-width,initial-scale=1/);
  assert.doesNotMatch(html,/user-scalable|maximum-scale|https?:.*(?:script|stylesheet)|_sdk|analytics/i);
  assert.match(html,/<main id="main" tabindex="-1">/);
});
