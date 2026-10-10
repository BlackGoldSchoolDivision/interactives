import {test} from 'node:test';
import assert from 'node:assert/strict';
import {representations} from '../activities/decimal-representations.js';
import {addSubDecimalBank,multiplyDecimalBank,divideDecimalBank,longDivisionBank,multiDigitBank,representationBank,compareDecimalBank,orderDecimalBank,roundDecimalBank,checkDecimal,checkRepresentation,checkCompareOrderRound,divisionSteps,placeParts} from '../activities/decimals-data.js';
test('all original decimal examples and four representation modes are preserved',()=>{
 assert.deepEqual([addSubDecimalBank.length,multiplyDecimalBank.length,divideDecimalBank.length,longDivisionBank.length,multiDigitBank.length,representations.length,representationBank.length,compareDecimalBank.length,orderDecimalBank.length,roundDecimalBank.length],[10,10,10,15,15,35,140,10,8,10]);
 for(const bank of [addSubDecimalBank,multiplyDecimalBank,divideDecimalBank,longDivisionBank,multiDigitBank])for(const t of bank){const a=Number(t.a),b=Number(t.b),value=t.operator==='+'?a+b:t.operator==='−'?a-b:t.operator==='×'?a*b:a/b;assert.ok(Math.abs(t.answer.n/t.answer.d-value)<1e-12);assert.ok(checkDecimal(t,String(value.toFixed(6))).correct);}
});
test('every original expanded form is accepted with or without zero placeholders',()=>{
 for(const t of representationBank){const value=t.kind==='expand'?t.decomposed:t.decimal;assert.ok(checkRepresentation(t,value,{scaled:t.scaled}).correct,`${t.decimal} ${t.kind}`);}
 const t=representationBank.find(t=>t.decimal==='3.402'&&t.kind==='expand');assert.ok(checkRepresentation(t,'3 + 0.4 + 0.002',{scaled:3402}).correct);assert.equal(checkRepresentation(t,'3 + 0.402',{scaled:3402}).correct,false);assert.equal(checkRepresentation(t,t.decomposed,{scaled:3042}).correct,false);
});
test('long division steps reconstruct the quotient and account for every digit',()=>{
 for(const t of longDivisionBank){const steps=divisionSteps(t.a,Number(t.b));assert.equal(Number(steps.map(s=>s.quotient).join('')),t.answer.n);assert.equal(steps.at(-1).remainder,0);for(const s of steps){assert.equal(s.partial,s.product+s.remainder);assert.ok(s.remainder>=0&&s.remainder<Number(t.b));}}
 for(const t of multiDigitBank)assert.equal(placeParts(t.a).reduce((a,b)=>a+b,0)*placeParts(t.b).reduce((a,b)=>a+b,0),t.answer.n);
});
test('comparison, ordering, trailing zeros and midpoint rounding are correct',()=>{
 for(const t of compareDecimalBank)assert.ok(checkCompareOrderRound(t,t.answer,{}).correct);
 for(const t of orderDecimalBank)assert.ok(checkCompareOrderRound(t,t.answer.map(n=>n.toFixed(2)).join(','),{}).correct);
 const expected=['3.5','2.8','5.2','4.2','2.0','7.5','6.1','8.7','2.5','9.9'];roundDecimalBank.forEach((t,i)=>assert.ok(checkCompareOrderRound(t,expected[i],{position:Number(expected[i])}).correct));
});
