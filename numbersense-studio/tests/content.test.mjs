import {test} from 'node:test';
import assert from 'node:assert/strict';
import {activities} from '../catalogue.js';
import {isReady,loadActivity} from '../registry.js';
test('every implemented activity loads and every task-specific hint and explanation runs',async()=>{
 for(const activity of activities.filter(isReady)){
  assert.equal(typeof await loadActivity(activity),'function');
  const module=await import(`../activities/${activity.topic}.js`);
  const definition=module.definitions[activity.id];assert.ok(definition,activity.id);
  const bank=typeof definition.bank==='function'?definition.bank():definition.bank;
  assert.ok(bank.length>0);
  for(const task of bank){assert.equal(typeof definition.hint(task),'string',activity.id);assert.equal(typeof definition.explain(task,{}),'string',activity.id);}
 }
});
