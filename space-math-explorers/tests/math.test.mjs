import test from 'node:test';import assert from 'node:assert/strict';import {MODES,createMission,checkGroups,answerChoices} from '../math.mjs';
test('all space missions have solvable arithmetic',()=>{for(const mode of MODES)for(let i=0;i<400;i++){
 const q=createMission(mode);assert(q.total>0&&q.total<=24);if(mode==='sharing'){assert.equal(q.total,q.groups*q.each);assert(checkGroups(q,Array(q.groups).fill(q.each)));assert(!checkGroups(q,Array(q.groups).fill(0)));}
 if(mode==='grouping'){assert.equal(q.total,q.groupsRequired*q.each);const c=[...Array(q.groupsRequired).fill(q.each),...Array(q.groups-q.groupsRequired).fill(0)];assert(checkGroups(q,c));assert(!checkGroups(q,c.map((v,i)=>i===0?v+1:v)));}
 if(mode==='equations')assert.equal(q.total,q.a+q.b);if(mode==='counting')assert.equal(q.answer,q.total);
 const ch=answerChoices(q.answer);assert(ch.includes(q.answer));assert.equal(new Set(ch).size,3);
}});
