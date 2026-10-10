import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createProgress,progressKey} from '../progress.js';
import {targetRound,timerScope,memoryScore} from '../games/core.js';
const storage=()=>{const values=new Map();return{getItem:k=>values.get(k)||null,setItem:(k,v)=>values.set(k,v),removeItem:k=>values.delete(k),values};};
test('progress is anonymous, tab-local by default, and explicitly remembered on a device',()=>{
 const local=storage(),session=storage(),p=createProgress({local,session});p.record({activity:'integers',firstTry:true,attempts:1});p.complete('integers');p.bonus('starcatch',80);
 assert.equal(local.values.size,0);assert.equal(session.values.size,1);assert.equal(createProgress({local,session}).snapshot().activities.integers.completed,1);
 p.remember(true);assert.equal(local.values.size,1);assert.equal(createProgress({local,session:storage()}).snapshot().activities.integers.completed,1);
 assert.doesNotMatch(local.getItem(progressKey),/name|email|timestamp|lastPlayed|student|account/i);
 p.remember(false);assert.equal(local.values.size,0);assert.equal(p.snapshot().activities.integers.completed,1);p.reset();assert.equal(session.values.size,0);assert.deepEqual(p.snapshot().activities,{});
});
test('storage errors, malformed records and future schemas do not prevent practice',()=>{
 const blocked={getItem(){throw Error('blocked');},setItem(){throw Error('quota');},removeItem(){throw Error('blocked');}};
 const p=createProgress({local:blocked,session:blocked});p.record({activity:'sharing',firstTry:false,attempts:2});assert.equal(p.snapshot().activities.sharing.completed,1);assert.equal(p.remember(true).ok,false);assert.equal(p.reset().ok,false);
 const local=storage();local.setItem(progressKey,'not JSON');assert.deepEqual(createProgress({local}).snapshot().activities,{});
 local.setItem(progressKey,JSON.stringify({version:99,remember:true,activities:{integers:{completed:10}}}));assert.deepEqual(createProgress({local}).snapshot().activities,{});
 local.setItem(progressKey,JSON.stringify({version:1,remember:true,name:'<script>',activities:{integers:{completed:2,firstTry:20},unknown:{completed:10}},bonus:{starcatch:{plays:3,best:999}}}));const s=createProgress({local}).snapshot();assert.equal(s.activities.integers.firstTry,2);assert.equal(s.bonus.starcatch.best,200);assert.equal(s.name,undefined);assert.equal(s.activities.unknown,undefined);
});
test('each star/target scores once, even under repeated activation and clicking',()=>{
 for(const [total,points] of [[8,10],[6,15]]){const r=targetRound(total,points);for(let id=1;id<=total;id++){r.activate(id);assert.equal(r.hit(id),true);assert.equal(r.hit(id),false);r.activate(id);assert.equal(r.hit(id),false);}assert.equal(r.score,total*points);assert.equal(r.hits,total);}
 const r=targetRound(8,10);r.activate(1);r.expire(1);assert.equal(r.hit(1),false);
});
test('disposing a game cancels callbacks and prevents later scheduled work',()=>{
 let next=0;const callbacks=new Map();const scope=timerScope(fn=>{const id=++next;callbacks.set(id,fn);return id;},id=>callbacks.delete(id));let calls=0;scope.schedule(()=>calls++,1);const queued=[...callbacks.values()];scope.close();assert.equal(callbacks.size,0);queued.forEach(fn=>fn());assert.equal(calls,0);assert.equal(scope.schedule(()=>calls++,1),null);
 assert.equal(memoryScore(4),100);assert.equal(memoryScore(3,true),65);assert.equal(memoryScore(0,true),0);
});
