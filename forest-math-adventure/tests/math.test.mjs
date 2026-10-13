import test from 'node:test';import assert from 'node:assert/strict';import {MODES,makeQuestion} from '../math.mjs';
test('all forest modes yield 3 unique answers and correct sequence',()=>{
 for(const mode of MODES)for(let n=0;n<500;n++){
  const q=makeQuestion(mode);assert.equal(q.mode,mode);assert.equal(q.choices.length,3);assert.equal(new Set(q.choices).size,3);assert(q.choices.includes(q.answer));assert(q.answer>=0);
  if(mode==='forward')assert.equal(q.sequence.at(-1)+1,q.answer);
  if(mode==='backward')assert.equal(q.sequence.at(-1)-1,q.answer);
  if(mode==='skip')assert.equal(q.sequence.at(-1)+(q.sequence[1]-q.sequence[0]),q.answer);
  if(mode==='pattern')assert.equal(q.sequence.filter(x=>x===null).length,1);
  if(mode==='story')assert.equal(q.add?q.a+q.b:q.a-q.b,q.answer);
 }
});
