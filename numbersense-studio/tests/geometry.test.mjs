import {test} from 'node:test';
import assert from 'node:assert/strict';
import {coordinateBank,transformationBank,areaBank,volumeBank,parsePoint,checkGeometryPoint,checkGeometryNumber,polygonArea} from '../activities/geometry-data.js';
test('all original geometry examples remain with additional four-quadrant practice',()=>{
 assert.deepEqual([coordinateBank.length,transformationBank.length,areaBank.length,volumeBank.length],[8,8,8,8]);
 for(const t of coordinateBank.filter(t=>t.kind==='point'))assert.ok(checkGeometryPoint(t,`(${t.point.join(',')})`,{point:t.point}).correct);
 for(const t of transformationBank.filter(t=>t.kind==='point'))assert.ok(checkGeometryPoint(t,t.point.join(','),{point:t.point}).correct);
 assert.deepEqual(parsePoint('(−3, 2)'),[-3,2]);
 assert.deepEqual(transformationBank[4].point,[-3,2]);assert.deepEqual(transformationBank[5].point,[-2,-4]);
});
test('area rearrangements preserve area and use perpendicular heights',()=>{
 for(const t of areaBank){const b=t.base,h=t.height,s=1.3;const triangle=[[0,0],[b,0],[s,h]],copy=[[b,0],[s,h],[b+s,h]];assert.equal(polygonArea(triangle),b*h/2);assert.ok(Math.abs(polygonArea(copy)-b*h/2)<1e-12);const original=[[0,0],[b,0],[b+s,h],[s,h]],rectangle=[[s,0],[s+b,0],[s+b,h],[s,h]];assert.ok(Math.abs(polygonArea(original)-b*h)<1e-12);assert.ok(Math.abs(polygonArea(rectangle)-b*h)<1e-12);assert.ok(checkGeometryNumber(t,String(t.answer.n/t.answer.d)).correct);}
});
test('volume counts exactly the base cubes times the layers',()=>{
 const original=[24,60,27,100];volumeBank.forEach((t,i)=>{assert.equal(t.answer.n,t.length*t.width*t.height);assert.equal(t.baseArea,t.length*t.width);if(i<4)assert.equal(t.answer.n,original[i]);});
});
