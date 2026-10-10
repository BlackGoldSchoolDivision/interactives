import {test} from 'node:test';
import assert from 'node:assert/strict';
import {gcd,rational,parseNumber,equal,asFraction,seededRandom,shuffle} from '../math.js';
import {simplifyBank,sharingBank,addSubBank,multiplyBank,checkSimplify,checkSharing,checkAddSub,checkMultiply} from '../activities/fractions-data.js';

test('rational validation accepts equivalent fractions and rejects malformed or unsafe values',()=>{
  for(const value of ['1/2','2/4','50/100','0.5','.5'])assert.ok(equal(parseNumber(value),rational(1,2)));
  for(const value of ['','1/0','1/2/3','Infinity','NaN','1e3','<script>','9007199254740993'])assert.equal(parseNumber(value),null);
  assert.equal(asFraction(rational(4,6)),'2/3');
});
test('every original fraction fixture has an independently checked answer',()=>{
  assert.deepEqual([simplifyBank.length,sharingBank.length,addSubBank.length,multiplyBank.length],[12,8,10,10]);
  for(const t of simplifyBank){assert.equal(t.answer.n/t.answer.d,t.n/t.d);assert.equal(gcd(t.answer.n,t.answer.d),1);assert.ok(checkSimplify(t,asFraction(t.answer),{}).correct);}
  for(const t of sharingBank){assert.equal(t.answer.n/t.answer.d,t.wholes/t.people);assert.ok(checkSharing(t,`${t.wholes}/${t.people}`,{shares:Array(t.people).fill(t.wholes)}).correct);}
  for(const t of addSubBank){const value=t.a.n/t.a.d+(t.op==='+'?1:-1)*t.b.n/t.b.d;assert.ok(Math.abs(value-t.answer.n/t.answer.d)<1e-12);assert.ok(checkAddSub(t,asFraction(t.answer),{denominator:t.denominator,count:Math.round(value*t.denominator)}).correct);}
  for(const t of multiplyBank){assert.equal(t.answer.n/t.answer.d,t.n*t.whole/t.d);assert.ok(checkMultiply(t,asFraction(t.answer),{selected:new Set(Array.from({length:t.n},(_,i)=>i))}).correct);}
});
test('the original equivalent-answer false wrongs are repaired',()=>{
  for(const t of addSubBank.filter(t=>t.answer.n===1&&t.answer.d===2))assert.ok(checkAddSub(t,'2/4',{denominator:t.denominator,count:t.denominator/2}).correct);
  const apples=sharingBank.find(t=>t.item==='apples');for(const a of ['4/6','2/3','8/12'])assert.ok(checkSharing(apples,a,{shares:Array(6).fill(4)}).correct);
});
test('correct text does not silently accept an incorrect constructed model',()=>{
  assert.equal(checkSharing(sharingBank[0],'3/4',{shares:[3,3,3,2]}).correct,false);
  assert.equal(checkAddSub(addSubBank[0],'3/4',{denominator:4,count:2}).correct,false);
  assert.equal(checkAddSub(addSubBank[2],'7/12',{denominator:4,count:2}).correct,false);
  assert.equal(checkMultiply(multiplyBank[0],'3',{selected:new Set()}).correct,false);
  assert.equal(checkSimplify(simplifyBank[0],'2/4',{}).correct,false);
  assert.ok(checkSimplify(simplifyBank[0],'2/4',{}).message.includes('same amount'));
});
test('seeded challenge order is repeatable, with no repeats within a round',()=>{
  const a=shuffle(addSubBank,seededRandom(42)),b=shuffle(addSubBank,seededRandom(42));assert.deepEqual(a,b);assert.equal(new Set(a).size,10);
});
