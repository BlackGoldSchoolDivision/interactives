import {rational,parseNumber,equal,add,subtract,multiply,divide} from '../math.js';
import {representations} from './decimal-representations.js';
const arithmetic=(rows,operator)=>rows.map(([a,b])=>({a:String(a),b:String(b),operator,answer:({'+':add,'−':subtract,'×':multiply,'÷':divide}[operator])(parseNumber(a),parseNumber(b))}));
export const addSubDecimalBank=[...arithmetic([[2.5,1.3],[4.7,2.1],[5.6,3.2],[1.8,2.4],[6.3,1.5]],'+'),...arithmetic([[7.5,2.3],[9.4,3.1],[8.7,4.2],[6.8,2.5],[10.2,5.1]],'−')];
export const multiplyDecimalBank=arithmetic([[2.5,3],[1.2,4],[3.6,2],[.5,6],[2.1,5],[4.5,2],[1.8,3],[2.2,4],[3.3,3],[.7,5]],'×');
export const divideDecimalBank=arithmetic([[6.4,2],[9.6,3],[7.5,5],[8.4,4],[10.5,5],[4.8,2],[12.6,6],[5.6,4],[3.6,3],[14.4,6]],'÷');
export const longDivisionBank=arithmetic([[45,3],[56,4],[72,6],[84,7],[96,8],[63,9],[88,8],[99,9],[144,12],[135,15],[156,12],[182,14],[240,16],[312,24],[456,24]],'÷');
export const multiDigitBank=arithmetic([[12,14],[15,16],[18,12],[21,13],[25,14],[32,15],[24,23],[31,22],[42,21],[35,24],[28,125],[45,123],[32,145],[56,112],[73,124]],'×');
export const representationBank=representations.flatMap(rep=>['decomposed','grid','expand','written'].map(kind=>({...rep,kind,scaled:Math.round(Number(rep.decimal)*1000),answer:parseNumber(rep.decimal)})));
export const compareDecimalBank=[['3.5','3.05'],['2.7','2.70'],['4.2','4.20'],['5.6','5.06'],['1.3','1.30'],['8.4','8.14'],['2.05','2.5'],['7.8','7.08'],['3.45','3.54'],['6.2','6.02']].map(([a,b])=>({kind:'compare',a,b,answer:Number(a)===Number(b)?'=':Number(a)<Number(b)?'<':'>'}));
export const orderDecimalBank=[[3.5,2.8,3.05,2.9],[1.2,1.02,1.22,1.1],[4.5,4.05,4.55,4.15],[2.3,2.03,2.33,2.13],[5.6,5.06,5.16,5.61],[.8,.08,.88,.18],[7.2,7.02,7.22,7.12],[9.5,9.05,9.55,9.15]].map(values=>({kind:'order',values,answer:[...values].sort((a,b)=>a-b)}));
export const roundDecimalBank=['3.47','2.83','5.15','4.24','1.96','7.45','6.12','8.67','2.54','9.88'].map(value=>({kind:'round',value,scaled:Math.round(Number(value)*100),answer:rational(Math.floor((Math.round(Number(value)*100)+5)/10),10)}));
export const compareOrderRoundBank=[...compareDecimalBank,...orderDecimalBank,...roundDecimalBank];
export function checkDecimal(task,value){const answer=parseNumber(value);return !answer?{invalid:true,message:'Enter a valid number.'}:equal(answer,task.answer)?{correct:true}:{correct:false,message:'Use place value to check each part of your calculation.'};}
export function checkRepresentation(task,value,state){
  let result;
  if(task.kind==='expand'){const parts=String(value).split('+').map(parseNumber);if(parts.some(x=>!x))return{invalid:true,message:'Write place-value parts separated by +, such as 2 + 0.5 + 0.04 + 0.008.'};const expected=[Math.floor(task.scaled/1000)*1000,Math.floor(task.scaled/100)%10*100,Math.floor(task.scaled/10)%10*10,task.scaled%10].filter(n=>n!==0).sort((a,b)=>a-b);const scaled=parts.filter(x=>x.n!==0).map(x=>x.n*1000/x.d).sort((a,b)=>a-b);const amount=parts.reduce(add,rational(0));result=equal(amount,task.answer)&&scaled.join(',')===expected.join(',')?{correct:true}:{correct:false,message:'Separate each non-zero digit into its own place-value part.'};}
  else result=checkDecimal(task,value);
  if(result.correct&&state.scaled!==task.scaled)return{correct:false,message:'Your answer matches. Finish building the same number in the place-value model.'};return result;
}
export function divisionSteps(dividend,divisor){let remainder=0;return String(dividend).split('').map(digit=>{const partial=remainder*10+Number(digit),quotient=Math.floor(partial/divisor),product=quotient*divisor;remainder=partial-product;return{digit:Number(digit),partial,quotient,product,remainder};});}
export function placeParts(value){return String(value).split('').map((digit,i,array)=>Number(digit)*10**(array.length-i-1)).filter(n=>n!==0);}
export function parseDecimalOrder(value){const parts=String(value).trim().split(/\s*[,<>]\s*|\s+/).filter(Boolean);if(parts.length!==4)return null;const numbers=parts.map(parseNumber);return numbers.some(n=>!n)?null:numbers.map(n=>n.n/n.d);}
export function checkCompareOrderRound(task,value,state){if(task.kind==='compare')return value.trim()===task.answer?{correct:true}:{correct:false,message:'Compare the first place where the digits differ. Trailing zeros do not change the value.'};if(task.kind==='order'){const parsed=parseDecimalOrder(value);return parsed&&parsed.every((n,i)=>n===task.answer[i])?{correct:true}:{correct:false,message:'Compare whole numbers first, then tenths, then hundredths.'};}const r=checkDecimal(task,value);return r.correct&&state.position!==task.answer.n/task.answer.d?{correct:false,message:'Your answer is correct. Move the point to the nearest tenth too.'}:r;}
