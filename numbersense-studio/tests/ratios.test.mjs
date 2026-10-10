import {test} from 'node:test';
import assert from 'node:assert/strict';
import {conversionBank,percentDivisionBank,ratioBank,percentOfBank,unitRateBank,checkConversion,checkPercentDivision,checkRatio} from '../activities/ratios-data.js';
test('all original ratios and percentage examples are retained with correct answers',()=>{
 assert.deepEqual([conversionBank.length,percentDivisionBank.length,ratioBank.length,percentOfBank.length,unitRateBank.length],[24,10,20,15,8]);
 for(const t of conversionBank)assert.ok(checkConversion(t,t.kind==='percent'?`${t.percent}%`:t.kind==='fraction'?`${t.n*2}/${t.d*2}`:String(t.n/t.d),{percent:t.percent}).correct);
 for(const t of ratioBank)assert.ok(checkRatio(t,t.answer.join(':'),{scale:t.scale}).correct);
 for(const t of percentOfBank)assert.equal(t.answer.n/t.answer.d,t.percent*t.quantity/100);
 for(const t of unitRateBank)assert.equal(t.answer.n/t.answer.d,t.total/t.units);
});
test('repeating decimal percentages explicitly use nearest-tenth rounding',()=>{
 const expected=[37.5,62.5,87.5,12.5,40,60,33.3,66.7,83.3,16.7];percentDivisionBank.forEach((t,i)=>assert.ok(checkPercentDivision(t,`${expected[i]}%`,{completed:5,total:5}).correct));
 assert.deepEqual(percentDivisionBank.map(t=>t.exact),[true,true,true,true,true,true,false,false,false,false]);
 assert.equal(checkPercentDivision(percentDivisionBank[7],'66.6%',{completed:5,total:5}).correct,false);
});
test('ratio validation recognizes equivalent amounts while requiring the requested construction',()=>{
 const t=ratioBank[0];assert.equal(checkRatio(t,'2:9',{scale:2}).correct,false);assert.ok(checkRatio(t,'6:9',{scale:2}).message.includes('equivalent'));assert.equal(checkRatio(t,'0:0',{scale:2}).correct,false);
});
