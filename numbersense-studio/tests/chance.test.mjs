import {test} from 'node:test';
import assert from 'node:assert/strict';
import {seededRandom} from '../math.js';
import {probabilityBank,frequencyBank,lawOptions,checkProbability,checkFrequency,runCoinTrials} from '../activities/chance-data.js';
test('all original probability spaces have the correct equally likely outcome counts',()=>{
 const counts=[[3,8],[3,6],[4,52],[2,10],[13,52],[2,8],[1,2],[2,6]];
 probabilityBank.forEach((t,i)=>{const ids=t.outcomes.map((o,j)=>t.target(o)?j:null).filter(j=>j!==null);assert.deepEqual([ids.length,t.outcomes.length],counts[i]);assert.ok(checkProbability(t,`${ids.length}/${t.outcomes.length}`,{selected:new Set(ids)}).correct);});
 const hearts=probabilityBank[4];const selected=new Set(hearts.outcomes.map((o,j)=>o.group==='hearts'?j:null).filter(j=>j!==null));for(const v of ['13/52','1/4','.25','25%'])assert.ok(checkProbability(hearts,v,{selected}).correct);
});
test('relative frequencies preserve the original examples without a false next-batch guarantee',()=>{
 assert.ok(checkFrequency(frequencyBank[0],'40%').correct);assert.ok(checkFrequency(frequencyBank[1],'7/10').correct);
 assert.ok(checkFrequency(frequencyBank[2],lawOptions[0]).correct);assert.equal(checkFrequency(frequencyBank[2],lawOptions[1]).correct,false);
 for(const t of frequencyBank.filter(t=>t.kind==='number'))assert.ok(checkFrequency(t,`${t.events}/${t.trials}`).correct);
});
test('fair-coin experiments can be replayed without promising a direction of change',()=>{
 const a=runCoinTrials({heads:4,trials:10},1000,seededRandom(39)),b=runCoinTrials({heads:4,trials:10},1000,seededRandom(39));assert.deepEqual(a,b);assert.equal(a.trials,1010);assert.ok(a.heads>=4&&a.heads<=1004);
 const away=runCoinTrials({heads:4,trials:10},10,()=>1);assert.ok(Math.abs(away.heads/away.trials-.5)>.1);
});
