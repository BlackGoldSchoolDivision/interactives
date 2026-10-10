import {rational,parseNumber,equal,primeFactors,isPrime,add,subtract,multiply,divide,asFraction} from '../math.js';
export function integerBank(random=Math.random){return Array.from({length:32},()=>{const a=Math.floor(random()*41)-20,b=Math.floor(random()*41)-20;return{a,b,answer:rational(a+b)};});}
export function orderingBank(random=Math.random){return Array.from({length:24},()=>{const values=[];while(values.length<4){const n=Math.floor(random()*41)-20;if(!values.includes(n))values.push(n);}const ascending=random()<.5;return{values,ascending,answer:[...values].sort((a,b)=>ascending?a-b:b-a)};});}
export const situationBank=[
  ['The temperature was −5°C. It increased by 8°C. What is the new temperature?',-5,8,'°C'],
  ['A submarine is 120 m below sea level. It ascends 45 m. What is its signed position relative to sea level?',-120,45,'m'],
  ['You have $15 and owe $23. What is your balance?',15,-23,'dollars'],
  ['The elevator is at level −3. It goes up 7 floors. What level is it on?',-3,7,'level'],
  ['The temperature was 12°C. It dropped by 18°C. What is the temperature?',12,-18,'°C'],
  ['A diver is 30 m below sea level. They descend another 15 m. What is their signed position relative to sea level?',-30,-15,'m'],
  ['Your account balance is −$50. You receive $75. What is your new balance?',-50,75,'dollars'],
  ['The morning temperature was −8°C. By noon it was 15°C warmer. What is the temperature?',-8,15,'°C']
].map(([question,a,b,unit])=>({question,a,b,unit,answer:rational(a+b)}));
export const factorBank=[12,18,24,36,48,60,72,90,100,120,45,50,80,96,150].map(value=>({value,factors:primeFactors(value)}));
export const exponentBank=Array.from({length:18},(_,i)=>({base:2+i%9,exponent:2+Math.floor(i/9),answer:rational((2+i%9)**(2+Math.floor(i/9)))}));
const op=(operator,left,right,grouped=false)=>({operator,left,right,grouped});
export const bedmasBank=[
  ['3² + 4 × 2',op('+',op('^',3,2),op('×',4,2)),17],
  ['2³ − 10 ÷ 2',op('−',op('^',2,3),op('÷',10,2)),3],
  ['(5 + 3) × 2',op('×',op('+',5,3,true),2),16],
  ['4² − (3 × 2)',op('−',op('^',4,2),op('×',3,2,true)),10],
  ['10 + 2³ × 2',op('+',10,op('×',op('^',2,3),2)),26],
  ['20 ÷ 5 + 4²',op('+',op('÷',20,5),op('^',4,2)),20],
  ['(10 − 2) ÷ 2³',op('÷',op('−',10,2,true),op('^',2,3)),1],
  ['5 × 2² − 10',op('−',op('×',5,op('^',2,2)),10),10]
].map(([expression,tree,result])=>({expression,tree,answer:rational(result)}));
export const algebraBank=[
  ['2x = 10',2,0,10,5],['x + 7 = 15',1,7,15,8],['3x − 2 = 7',3,-2,7,3],['x ÷ 2 = 6',.5,0,6,12],['4x + 1 = 17',4,1,17,4],['x − 5 = 12',1,-5,12,17],['5x = 35',5,0,35,7],['2x + 5 = 15',2,5,15,5]
].map(([expression,a,b,right,answer])=>({expression,a:parseNumber(a),b:rational(b),right:rational(right),answer:rational(answer)}));
export function checkNumeric(task,value){const answer=parseNumber(String(value).replace(/^x\s*=\s*/i,''));return !answer?{invalid:true,message:'Enter a valid number.'}:equal(answer,task.answer)?{correct:true}:{correct:false,message:'Try again. Use the model to follow each change.'};}
export function parseOrder(value){const s=String(value).trim().replace(/−/g,'-');if(!/^[\d\s,<>+\-]+$/.test(s))return null;const parts=s.split(/\s*[,<>]\s*|\s+/).filter(Boolean);if(parts.length!==4||parts.some(p=>!/^[-+]?\d+$/.test(p)))return null;return parts.map(Number);}
export function checkOrder(task,value){const parsed=parseOrder(value);if(!parsed)return{invalid:true,message:'Write the four integers separated by commas, such as −4, −1, 2, 7.'};return parsed.every((n,i)=>n===task.answer[i])?{correct:true}:{correct:false,message:task.ascending?'Start with the point farthest left on the number line.':'Start with the point farthest right on the number line.'};}
export function parseFactors(value){const normal=String(value).trim().replace(/²/g,'^2').replace(/³/g,'^3').replace(/⁴/g,'^4').replace(/⁵/g,'^5');const parts=normal.split(/\s*[×*x]\s*/);const values=[];for(const p of parts){const m=p.match(/^(\d+)(?:\s*\^\s*([1-9]))?$/);if(!m)return null;const base=Number(m[1]),count=Number(m[2]||1);if(!isPrime(base)||count>9)return null;values.push(...Array(count).fill(base));}return values.sort((a,b)=>a-b);}
export function checkFactors(task,value,state){const values=parseFactors(value);if(!values)return{invalid:true,message:'Use prime factors, with × or * between them. Powers such as 2^3 are welcome.'};if(values.join(',')!==task.factors.join(','))return{correct:false,message:'Check that every factor is prime and their product is the starting number.'};if(state.leaves.some(n=>!isPrime(n)))return{correct:false,message:'Your factorization is correct. Keep splitting every composite leaf in your tree.'};return{correct:true};}
export function evaluateTree(tree){if(typeof tree==='number')return tree;const a=evaluateTree(tree.left),b=evaluateTree(tree.right);return tree.operator==='+'?a+b:tree.operator==='−'?a-b:tree.operator==='×'?a*b:tree.operator==='÷'?a/b:a**b;}
export function reduceTree(tree,path){if(path.length===0)return evaluateTree(tree);const [branch,...rest]=path;return{...tree,[branch]:reduceTree(tree[branch],rest)};}
export function treeSteps(tree,path=[]){if(typeof tree==='number')return[];const ready=typeof tree.left==='number'&&typeof tree.right==='number';return[{path,node:tree,ready},...treeSteps(tree.left,[...path,'left']),...treeSteps(tree.right,[...path,'right'])];}
export function transformEquation(state,operator,value){if(!value||value.n===0&&(operator==='÷'||operator==='×'))throw new RangeError('Use a non-zero scale');if(operator==='+')return{a:state.a,b:add(state.b,value),right:add(state.right,value)};if(operator==='−')return{a:state.a,b:subtract(state.b,value),right:subtract(state.right,value)};if(!['×','÷'].includes(operator))throw new RangeError('Unknown operation');const fn=operator==='×'?multiply:divide;return{a:fn(state.a,value),b:fn(state.b,value),right:fn(state.right,value)};}
export const equationText = state => `${asFraction(state.a)}x ${state.b.n<0?'−':'+'} ${asFraction(rational(Math.abs(state.b.n),state.b.d))} = ${asFraction(state.right)}`;
