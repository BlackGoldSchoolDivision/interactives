import {rational,gcd,lcm,parseNumber,equal,asFraction,add,subtract,multiply} from '../math.js';

// Every original fraction example is retained; structured numbers replace display-string answers.
export const simplifyBank=[[4,8],[6,9],[10,15],[12,16],[15,20],[8,12],[6,18],[14,21],[9,12],[20,25],[18,24],[15,45]].map(([n,d])=>({n,d,answer:rational(n,d)}));
export const sharingBank=[['pizzas',3,4],['cakes',2,5],['pie',1,6],['chocolate bars',3,4],['pizzas',5,8],['sandwiches',2,3],['apples',4,6],['pizza',1,8]].map(([item,wholes,people])=>({item,wholes,people,answer:rational(wholes,people)}));
export const addSubBank=[[1,2,'+',1,4],[2,3,'+',1,6],[1,3,'+',1,4],[3,4,'−',1,2],[5,6,'−',1,3],[2,3,'−',1,4],[1,2,'+',1,3],[3,4,'+',1,6],[7,8,'−',1,4],[2,5,'+',1,10]].map(([an,ad,op,bn,bd])=>({a:{n:an,d:ad},b:{n:bn,d:bd},op,denominator:lcm(ad,bd),answer:(op==='+'?add:subtract)(rational(an,ad),rational(bn,bd))}));
export const multiplyBank=[[1,2,6],[1,3,9],[2,3,6],[3,4,8],[1,4,12],[2,5,10],[3,5,15],[1,6,18],[5,6,12],[4,5,20]].map(([n,d,whole])=>({n,d,whole,answer:multiply(rational(n,d),rational(whole))}));

export function checkFraction(task,value) {
  const parsed=parseNumber(value);
  if(!parsed)return {invalid:true,message:'Use a number or a fraction with a non-zero denominator, such as 3/4.'};
  return equal(parsed,task.answer)?{correct:true}:{correct:false,message:'The amount is different. Compare the filled parts with the whole.'};
}
export function checkSimplify(task,value,state) {
  const result=checkFraction(task,value);if(!result.correct)return result;
  const input=String(value).trim().match(/^([+-]?\d+)\s*\/\s*(\d+)$/);
  if(!input||gcd(Number(input[1]),Number(input[2]))!==1)return {correct:false,message:'That is the same amount. Now write it as a fraction in simplest form.'};
  return {correct:true};
}
export function checkSharing(task,value,state) {
  const result=checkFraction(task,value);if(!result.correct)return result;
  if(!state.shares.every(n=>n===task.wholes))return {correct:false,message:'Your fraction has the right value. Finish sharing every piece equally in the model.'};
  return {correct:true};
}
export function checkAddSub(task,value,state) {
  const result=checkFraction(task,value);if(!result.correct)return result;
  if(state.denominator%task.a.d||state.denominator%task.b.d)return {correct:false,message:'Choose a partition that can show both starting fractions as whole equal-sized parts.'};
  if(!equal(rational(state.count,state.denominator),task.answer))return {correct:false,message:'Your fraction has the right value. Adjust your model to show that same amount.'};
  return {correct:true};
}
export function checkMultiply(task,value,state) {
  const result=checkFraction(task,value);if(!result.correct)return result;
  if(state.selected.size!==task.n)return {correct:false,message:`Your answer has the right value. Select ${task.n} of the ${task.d} equal groups in the model.`};
  return {correct:true};
}
export const fractionLabel = f => asFraction(f);
