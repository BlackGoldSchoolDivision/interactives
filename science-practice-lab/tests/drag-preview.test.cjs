'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {crop}=require('../drag-preview');
test('Drag thumbnails crop one panel from a four-picture strip',()=>{
 for(let panel=0;panel<4;panel++)assert.deepEqual(crop({left:120,top:200,width:180,height:120},{left:120-panel*180,top:200,width:720,height:120},1440,240),{x:panel*360,y:0,width:360,height:240});
});
test('Drag thumbnails respect two-row atlases, non-uniform frames, scroll offsets and zoom',()=>{
 const frame={left:31,top:-84,width:225,height:162};
 const image={left:-194,top:-300,width:450,height:378};
 const expected={x:768,y:1024*216/378,width:768,height:1024*162/378};
 const value=crop(frame,image,1536,1024);for(const key of Object.keys(expected))assert(Math.abs(value[key]-expected[key])<1e-9,key);
 const zoom=1.25,scaled=x=>Object.fromEntries(Object.entries(x).map(([k,v])=>[k,v*zoom]));
 assert.deepEqual(crop(scaled(frame),scaled(image),1536,1024),value);
});
test('Drag crop rejects unavailable images and confines sampling to the actual image',()=>{
 assert.equal(crop({left:0,top:0,width:100,height:100},{left:0,top:0,width:0,height:100},400,400),null);
 assert.equal(crop({left:0,top:0,width:100,height:100},{left:0,top:0,width:100,height:100},0,0),null);
 assert.deepEqual(crop({left:-10,top:-10,width:120,height:120},{left:0,top:0,width:100,height:100},400,400),{x:0,y:0,width:400,height:400});
});
