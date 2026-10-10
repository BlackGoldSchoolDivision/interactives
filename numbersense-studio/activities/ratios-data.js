import {rational,parseNumber,equal} from '../math.js';
const conversions=[[1,2],[1,4],[3,4],[1,5],[2,5],[1,10],[3,10],[4,5]];
export const conversionBank=conversions.flatMap(([n,d])=>['percent','fraction','decimal'].map(kind=>({n,d,kind,percent:n*100/d,answer:kind==='percent'?rational(n*100,d):rational(n,d)})));
export const percentDivisionBank=[[3,8],[5,8],[7,8],[1,8],[2,5],[3,5],[1,3],[2,3],[5,6],[1,6]].map(([n,d])=>({n,d,answer:rational(Math.round(n*1000/d),10),exact:equal(rational(n*100,d),rational(Math.round(n*1000/d),10))}));
export const ratioBank=[[2,3],[1,4],[3,5],[2,5],[4,7]].flatMap(([a,b])=>[2,3,4,5].map(scale=>({a,b,scale,answer:[a*scale,b*scale]})));
export const percentOfBank=[[20,50],[25,80],[50,120],[10,200],[75,40],[30,100],[15,60],[40,150],[5,200],[60,90],[12,50],[35,80],[45,200],[88,100],[70,140]].map(([percent,quantity])=>({percent,quantity,answer:rational(percent*quantity,100)}));
export const unitRateBank=[
 ['If 4 pens cost $8, what is the price for 1 pen?',8,4,'dollars','pens','$/pen'],
 ['A car travels 150 km in 3 hours. What is its average speed?',150,3,'km','hours','km/h'],
 ['If 5 apples cost $2.50, how much does 1 apple cost?',2.5,5,'dollars','apples','$/apple'],
 ['You earn $60 for 4 hours of work. What is your hourly rate?',60,4,'dollars','hours','$/h'],
 ['Six notebooks cost $18. What is the price per notebook?',18,6,'dollars','notebooks','$/notebook'],
 ['A car travels 210 km in 3 hours. What is its average speed?',210,3,'km','hours','km/h'],
 ['Four oranges cost $3. What is the price per orange?',3,4,'dollars','oranges','$/orange'],
 ['You earn $84 for 6 hours of work. What is your hourly rate?',84,6,'dollars','hours','$/h']
].map(([question,total,units,totalLabel,unitLabel,resultUnit])=>({question,total,units,totalLabel,unitLabel,resultUnit,answer:rational(Math.round(total*100),units*100)}));
export const parsePercent=value=>parseNumber(String(value).trim().replace(/%$/,''));
export function checkConversion(task,value,state){const s=String(value).trim();if(task.kind==='fraction'&&!/^[+-]?\d+\s*\/\s*\d+$/.test(s))return{invalid:true,message:'Write the amount as a fraction, such as 2/4. Equivalent fractions are accepted.'};const answer=task.kind==='percent'?parsePercent(s):parseNumber(s);if(!answer)return{invalid:true,message:'Enter the requested fraction, decimal or percent.'};if(!equal(answer,task.answer))return{correct:false,message:'Use the same whole for all three forms.'};if(state.percent!==task.percent)return{correct:false,message:'Your conversion is correct. Fill the grid to show the same amount.'};return{correct:true};}
export function checkPercentDivision(task,value,state){const answer=parsePercent(value);if(!answer)return{invalid:true,message:'Enter a percentage, rounded to the nearest tenth of a percent if needed.'};if(!equal(answer,task.answer))return{correct:false,message:'Divide numerator by denominator, multiply by 100, then round to the nearest tenth of a percent.'};return state.completed===state.total?{correct:true}:{correct:false,message:'Your percentage is correct. Finish the long-division steps.'};}
export function checkRatio(task,value,state){const m=String(value).trim().match(/^(\d+)\s*:\s*(\d+)$/);if(!m)return{invalid:true,message:'Write a ratio using :, such as 4:6.'};const a=Number(m[1]),b=Number(m[2]);if(a<=0||b<=0||a*task.b!==b*task.a)return{correct:false,message:'Multiply both quantities by the same factor.'};return a===task.a*state.scale&&b===task.b*state.scale&&state.scale===task.scale?{correct:true}:{correct:false,message:`That ratio is equivalent. Set the model to ${task.scale} equal groups and write its ratio.`};}
