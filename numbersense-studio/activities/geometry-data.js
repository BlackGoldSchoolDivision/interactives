import {rational,parseNumber,equal} from '../math.js';
export const coordinateBank=[
 {kind:'axis',question:'Which axis is the horizontal line?',answer:'x-axis',point:[4,0]},
 {kind:'point',question:'Plot the origin. What are its coordinates?',point:[0,0]},
 {kind:'coordinate',question:'The first number in (3, 5) represents which coordinate?',answer:'x-coordinate',point:[3,5]},
 {kind:'point',question:'Move 4 units right from the origin. Where do you arrive?',point:[4,0]},
 {kind:'axis',question:'Plot (0, 7). Which axis contains this point?',answer:'y-axis',point:[0,7]},
 {kind:'point',question:'Plot the point 3 units left and 2 units up from the origin.',point:[-3,2]},
 {kind:'point',question:'Plot the point 4 units left and 3 units down from the origin.',point:[-4,-3]},
 {kind:'point',question:'Plot the point 5 units right and 2 units down from the origin.',point:[5,-2]}
];
export const transformationBank=[
 {kind:'point',question:'Translate (2, 3) 2 units to the right.',start:[2,3],point:[4,3]},
 {kind:'point',question:'Translate (1, 1) 3 units up.',start:[1,1],point:[1,4]},
 {kind:'name',question:'Move the shape. It slides without turning. Name the transformation.',answer:'translation',motion:'slide'},
 {kind:'name',question:'Move the control. The shape flips across the vertical axis. Name the transformation.',answer:'reflection',motion:'flip'},
 {kind:'point',question:'Reflect (3, 2) across the y-axis.',start:[3,2],point:[-3,2]},
 {kind:'point',question:'Reflect (−2, 4) across the x-axis.',start:[-2,4],point:[-2,-4]},
 {kind:'point',question:'Translate (3, −1) 5 units left and 2 units up.',start:[3,-1],point:[-2,1]},
 {kind:'point',question:'Reflect (−4, −3) across the y-axis.',start:[-4,-3],point:[4,-3]}
];
export const areaBank=[['triangle',4,5,'cm'],['parallelogram',6,3,'m'],['triangle',8,4,'mm'],['parallelogram',10,7,'cm'],['triangle',6,4,'cm'],['parallelogram',8,5,'m'],['triangle',9,6,'cm'],['parallelogram',5,4,'mm']].map(([shape,base,height,unit])=>({shape,base,height,unit,answer:rational(base*height,shape==='triangle'?2:1)}));
export const volumeBank=[
 {length:2,width:3,height:4,unit:'cm'},
 {length:3,width:5,height:4,unit:'m',givenBase:true},
 {length:3,width:3,height:3,unit:'cm',cube:true},
 {length:5,width:2,height:10,unit:'m'},
 {length:4,width:2,height:3,unit:'cm'},
 {length:2,width:2,height:5,unit:'m'},
 {length:4,width:3,height:2,unit:'cm'},
 {length:2,width:4,height:4,unit:'m'}
].map(t=>({...t,baseArea:t.length*t.width,answer:rational(t.length*t.width*t.height)}));
export function parsePoint(value){const m=String(value).trim().replace(/−/g,'-').match(/^\(?\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*\)?$/);return m?[Number(m[1]),Number(m[2])]:null;}
export function checkGeometryPoint(task,value,state){if(task.kind==='point'){const p=parsePoint(value);if(!p)return{invalid:true,message:'Write an ordered pair, such as (−3, 2).'};if(!p.every((n,i)=>n===task.point[i]))return{correct:false,message:'Use x for horizontal position and y for vertical position. Check signs and direction.'};if(!state.point.every((n,i)=>n===task.point[i]))return{correct:false,message:'Your coordinates are correct. Move the plotted point to that same position.'};return{correct:true};}const result=value.trim().toLowerCase()===task.answer;return result?{correct:true}:{correct:false,message:'Look at the horizontal and vertical directions in the model.'};}
export function checkGeometryNumber(task,value){const n=parseNumber(value);if(!n)return{invalid:true,message:'Enter the number. The unit is shown in the question.'};return equal(n,task.answer)?{correct:true}:{correct:false,message:'Use the perpendicular height and the correct area or volume units.'};}
export function polygonArea(points){return Math.abs(points.reduce((sum,[x,y],i)=>{const [u,v]=points[(i+1)%points.length];return sum+x*v-y*u;},0))/2;}
