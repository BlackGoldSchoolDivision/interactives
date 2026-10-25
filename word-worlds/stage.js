(function(g){'use strict';
const M=g.WordWorlds,names=['cottage','shop','townhouse','tree','cypress','bridge','boat','shrub'],images={};
const ready=Promise.all(names.map(name=>new Promise(resolve=>{const im=new Image();im.onload=()=>resolve();im.onerror=()=>resolve();im.src=(g.__assetData||{})['assets/'+name+'.webp']||'assets/'+name+'.webp';images[name]=im;})));
function hill(c,color,y,amplitude,seed,offset){c.fillStyle=color;c.beginPath();c.moveTo(-80,600);for(let x=-80;x<=1280;x+=12)c.lineTo(x+offset,y+Math.sin(x/190+seed)*amplitude+Math.sin(x/43+seed)*4);c.lineTo(1280,600);c.closePath();c.fill();}
let aspect=1;
function object(c,name,x,y,w,rotation=0){const im=images[name];if(!im?.naturalWidth)return;w*=Math.min(1,1/aspect);const h=w*im.naturalHeight/im.naturalWidth*aspect;c.save();c.translate(x,y);c.rotate(rotation);c.drawImage(im,-w/2,-h,w,h);c.restore();}
function draw(canvas,v,time=0,view=0){
 const c=canvas.getContext('2d'),W=1200,H=540,mood=M.moods[v.mood],motion=M.verbs[v.verb];aspect=(canvas.width/W)/(canvas.height/H);c.save();c.setTransform(canvas.width/W,0,0,canvas.height/H,0,0);c.clearRect(0,0,W,H);c.fillStyle=mood.sky;c.fillRect(0,0,W,H);
 // Every layer moves at its own depth when the stage is turned.
 const p=view*65,t=time*motion.speed;
 c.fillStyle=v.mood==='golden'?'#fff1cf':'#eee9d8';c.beginPath();c.arc(965-p*.08,83,28,0,Math.PI*2);c.fill();
 hill(c,mood.hill,210,36,1,-p*.12);hill(c,mood.ink,275,28,2,-p*.3);
 for(let i=0;i<10;i++)object(c,'cypress',i*155+40-p*.42,365,68+14*Math.sin(i),Math.sin(t+i)*motion.sway*.3);
 hill(c,mood.ground,345,12,3,-p*.4);
 c.fillStyle=v.mood==='icy'?'#c2d5df':'#8b9eb8';c.beginPath();c.moveTo(0,420);c.bezierCurveTo(380,370,540,475,1200,368);c.lineTo(1200,540);c.lineTo(0,540);c.fill();
 c.strokeStyle='#ede2d2';c.lineWidth=v.world==='town'?67:35;c.beginPath();c.moveTo(650-p*.8,275);c.bezierCurveTo(590-p*.9,380,1090-p,366,1050-p*1.2,550);c.stroke();
 const sway=(phase,scale=1)=>Math.sin(t*1.5+phase)*motion.sway*scale;
 if(v.world==='town'){
  object(c,'cottage',265-p*.65,382,218);object(c,'townhouse',700-p*.65,343,100);object(c,'shop',855-p*.9,447,235);object(c,'townhouse',508-p*.6,370,104);object(c,'bridge',360-p,482,259);
 }else if(v.world==='harbour'){
  object(c,'cottage',225-p*.65,378,190);object(c,'shop',876-p*.85,389,182);object(c,'bridge',618-p*.7,409,213);
  for(let i=0;i<3;i++)object(c,'boat',310+i*265+Math.sin(t*.5+i)*8-p,493+i%2*20,100+i*10,Math.sin(t+i)*.035);
 }else{
  for(let i=0;i<6;i++)object(c,i%2?'tree':'cypress',170+i*180-p*.7,390+(i%3)*22,145+(i%3)*25,sway(i,.6));object(c,'bridge',720-p*.8,468,220);
 }
 object(c,'tree',92-p*1.2,492,235,sway(1));object(c,'cypress',1115-p*1.2,490,174,sway(3));object(c,'shrub',196-p*1.35,540,245);object(c,'shrub',1010-p*1.35,558,275);
 c.strokeStyle='#d9d6df';c.lineWidth=2;
 for(let i=0;i<12;i++){const x=(i*137+t*80)%1320-70,y=419+i%4*28;c.beginPath();c.moveTo(x,y);c.lineTo(x+36,y);c.stroke();}
 if(v.subject==='fog'){
  c.fillStyle=v.mood==='icy'?'#edf3f4':'#e2e0eb';for(let i=0;i<7;i++){c.globalAlpha=.12+(i%2)*.06;c.beginPath();c.ellipse(100+i*191+Math.sin(t*.5+i)*90,310+(i%3)*61,230,32+i%2*23,0,0,7);c.fill();}c.globalAlpha=1;
 }else if(v.subject==='rain'){
  c.strokeStyle=v.mood==='golden'?'#fff0d3':'#465f7b';c.globalAlpha=.46;c.lineWidth=1.7;for(let i=0;i<100;i++){const x=(i*91+t*70)%1300-50,y=(i*97+time*(140+motion.speed*100))%650-65;c.beginPath();c.moveTo(x,y);c.lineTo(x-6-motion.speed*5,y+14+motion.speed*5);c.stroke();}c.globalAlpha=1;
 }else if(v.subject==='sunlight'){
  c.fillStyle='#fff3cc';for(let i=0;i<4;i++){c.globalAlpha=.045+Math.sin(t+i)*.015;c.beginPath();c.moveTo(930+i*12,30);c.lineTo(330+i*180+Math.sin(t*.3)*25,540);c.lineTo(430+i*180+Math.sin(t*.3)*25,540);c.closePath();c.fill();}c.globalAlpha=1;
 }else{
  c.strokeStyle='#f7f1d8';c.lineWidth=2.2;c.globalAlpha=.8;for(let i=0;i<4;i++){const xx=(t*80+i*300)%1700-350,yy=100+i*63;c.beginPath();c.moveTo(xx,yy);c.bezierCurveTo(xx+105,yy-45,xx+230,yy+70,xx+400,yy+12);c.stroke();}c.globalAlpha=1;
 }
 const leaves=v.subject==='rain'?10:30;
 for(let i=0;i<leaves;i++){let x=(i*137+t*(v.verb==='raced'?190:80))%1300-50,y=115+(i*67)%370+Math.sin(t*(v.verb==='danced'?2.5:1)+i)*20;c.save();c.translate(x,y);c.rotate(t+i);c.fillStyle=v.mood==='icy'?'#f5f3e8':i%3?'#a5ad75':'#d1bb8f';c.beginPath();c.moveTo(-6,0);c.quadraticCurveTo(0,-7,9,0);c.quadraticCurveTo(0,7,-6,0);c.fill();c.restore();}
 c.fillStyle=v.mood==='deserted'?'#263657':'#f7d6a4';c.globalAlpha=mood.light;c.fillRect(0,0,W,H);c.globalAlpha=1;c.restore();
}
function snapshot(v){const c=document.createElement('canvas');c.width=1200;c.height=540;draw(c,v,4,0);return c.toDataURL('image/jpeg',.9);}
g.PaperStage={ready,draw,snapshot};
})(globalThis);
