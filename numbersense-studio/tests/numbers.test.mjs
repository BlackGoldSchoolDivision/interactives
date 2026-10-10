import {test} from 'node:test';
import assert from 'node:assert/strict';
import {rational,equal,primeFactors,seededRandom} from '../math.js';
import {integerBank,orderingBank,situationBank,factorBank,exponentBank,bedmasBank,algebraBank,checkOrder,parseFactors,checkFactors,evaluateTree,reduceTree,treeSteps,transformEquation} from '../activities/numbers-data.js';
test('integer generators preserve the original signed range and distinct ordered values',()=>{
  const random=seededRandom(2384);
  for(let k=0;k<100;k++)for(const t of integerBank(random)){assert.ok(t.a>=-20&&t.a<=20&&t.b>=-20&&t.b<=20);assert.equal(t.answer.n,t.a+t.b);}
  for(const t of orderingBank(random)){assert.equal(new Set(t.values).size,4);assert.ok(checkOrder(t,t.answer.join(',')).correct);assert.equal(checkOrder(t,[...t.answer].reverse().join(',')).correct,false);}
  assert.ok(checkOrder({answer:[-20,-3,0,2],ascending:true},'−20 < −3 < 0 < 2').correct);
});
test('all fixed number and algebra fixtures are retained and correct',()=>{
  assert.deepEqual([situationBank.length,factorBank.length,exponentBank.length,bedmasBank.length,algebraBank.length],[8,15,18,8,8]);
  for(const t of situationBank)assert.equal(t.answer.n,t.a+t.b);
  for(const t of factorBank)assert.equal(t.factors.reduce((a,b)=>a*b,1),t.value);
  for(const t of exponentBank)assert.equal(t.answer.n,t.base**t.exponent);
  for(const t of algebraBank)assert.equal(t.a.n/t.a.d*t.answer.n+t.b.n/t.b.d,t.right.n/t.right.d);
});
test('factorization accepts prime order and powers, while rejecting composites as leaves',()=>{
  assert.deepEqual(parseFactors('3 × 2²'),[2,2,3]);assert.deepEqual(parseFactors('2^5 * 3'),[2,2,2,2,2,3]);assert.equal(parseFactors('4 × 3'),null);
  const twelve=factorBank[0];assert.ok(checkFactors(twelve,'3 * 2^2',{leaves:[2,2,3]}).correct);assert.equal(checkFactors(twelve,'2^2*3',{leaves:[2,6]}).correct,false);
  assert.equal(parseFactors('999999999999999999999999999999'),null);
  assert.equal(checkFactors(twelve,'2^2*3',{leaves:[2,3]}).correct,false);
});
test('BEDMAS reductions preserve meaning through either order of independent ready steps',()=>{
  for(const t of bedmasBank){let tree=structuredClone(t.tree);assert.equal(evaluateTree(tree),t.answer.n);while(typeof tree!=='number'){const ready=treeSteps(tree).filter(s=>s.ready);assert.ok(ready.length);tree=reduceTree(tree,ready.at(-1).path);assert.equal(evaluateTree(tree),t.answer.n);}assert.equal(tree,t.answer.n);}
});
test('equation operations preserve the solution and can isolate every original x',()=>{
  for(const t of algebraBank){let s={a:t.a,b:t.b,right:t.right};s=transformEquation(s,'−',s.b);s=transformEquation(s,'÷',s.a);assert.ok(equal(s.a,rational(1)));assert.ok(equal(s.b,rational(0)));assert.ok(equal(s.right,t.answer));}
  const s=algebraBank[0];for(const op of ['×','÷'])assert.throws(()=>transformEquation(s,op,rational(0)));
  assert.deepEqual(primeFactors(150),[2,3,5,5]);
});
