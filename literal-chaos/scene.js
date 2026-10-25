(function(g){'use strict';const names=['bowl','beans','cake','ice','butterfly','cloud','heart','key','flame','moon','clock','feather'],images={};const ready=Promise.all(names.map(name=>new Promise(resolve=>{const im=new Image();im.onload=im.onerror=()=>resolve();im.src=(g.__assetData||{})['assets/'+name+'.webp']||'assets/'+name+'.webp';images[name]=im;})));
function sprite(c,name,x,y,w,angle=0){const im=images[name];if(!im?.naturalWidth)return;c.save();c.translate(x,y);c.rotate(angle);const h=w*im.naturalHeight/im.naturalWidth;c.drawImage(im,-w/2,-h/2,w,h);c.restore();}
function backdrop(c,w=1000,h=660,color='#87cce8'){c.fillStyle=color;c.fillRect(0,0,w,h);c.fillStyle='#f3c565';c.beginPath();c.moveTo(0,h*.78);c.lineTo(w,h*.7);c.lineTo(w,h);c.lineTo(0,h);c.fill();c.strokeStyle='#203448';c.lineWidth=3;c.beginPath();c.moveTo(0,h*.78);c.lineTo(w,h*.7);c.stroke();}
function draw(canvas,q,t=0){const c=canvas.getContext('2d');c.save();c.setTransform(canvas.width/1000,0,0,canvas.height/660,0,0);backdrop(c);const scene=q.scene;
 if(scene==='bowl'||scene==='beans'){sprite(c,'bowl',365,354,460,Math.sin(t*.7)*.025);for(let i=0;i<9;i++){const phase=(t*.4+i*.12)%1,x=510+phase*370,y=300+phase*phase*260-Math.sin(phase*Math.PI*3)*26;sprite(c,'beans',x,y,55+8*(i%2),phase*6+i);}}
 else if(scene==='cake'){if(q.id==='mountain-cake')for(let row=0;row<3;row++)for(let j=0;j<3-row;j++)sprite(c,'cake',340+j*170+row*85,475-row*130,190,0);else sprite(c,'cake',500,345+Math.sin(t)*7,415,Math.sin(t*.7)*.02);}
 else if(scene==='butterfly'){for(let i=0;i<5;i++)sprite(c,'butterfly',200+i*150+Math.sin(t+i)*28,260+Math.sin(t*1.4+i)*100,135+20*(i%2),Math.sin(t*3+i)*.17);}
 else if(scene==='ice'){sprite(c,'ice',485,380,410,Math.sin(t*.8)*.025);sprite(c,'ice',765,471,150);c.strokeStyle='#f6f2db';c.lineWidth=4;for(let i=0;i<5;i++){c.beginPath();c.moveTo(240+i*125,535);c.lineTo(280+i*125+Math.sin(t)*4,535);c.stroke();}}
 else if(scene==='clock'){sprite(c,'clock',500,325,360,Math.sin(t*(q.type==='hyperbole'?8:3))*(q.type==='hyperbole'?.15:.05));c.strokeStyle='#203448';c.lineWidth=4;for(let i=0;i<3;i++){c.beginPath();c.arc(500,325,250+i*24,-.8+Math.sin(t)*.08,-.5+Math.sin(t)*.08);c.stroke();}}
 else if(scene==='cloud'){sprite(c,'cloud',500,245,520,Math.sin(t*.6)*.015);c.strokeStyle='#376b91';c.lineWidth=5;for(let i=0;i<16;i++){const x=280+i*30,y=300+(i*79+t*145)%220;c.beginPath();c.moveTo(x,y);c.lineTo(x-9,y+20);c.stroke();}}
 else if(scene==='feather'){sprite(c,'feather',500+Math.sin(t*.5)*70,300+Math.sin(t)*28,380,Math.sin(t*.7)*.2);}
 else if(scene==='flame'){for(let i=0;i<3;i++)sprite(c,'flame',365+i*140,400-i%2*80,220+Math.sin(t*4+i)*13,Math.sin(t*3+i)*.05);}
 else if(scene==='heart'){sprite(c,'heart',500,320,350+Math.sin(t*5)*16);sprite(c,'heart',760,400,125+Math.sin(t*5+1)*5);}
 else if(scene==='key'){sprite(c,'key',500,330,460,Math.sin(t*.6)*.12);if(q.id==='heart-door')sprite(c,'heart',735,205,125);}
 else if(scene==='moon'){c.fillStyle='#344d70';c.fillRect(0,0,1000,660);sprite(c,'moon',500,280+Math.sin(t*.4)*10,360,Math.sin(t*.3)*.025);c.fillStyle='#263952';for(let i=0;i<9;i++){c.fillRect(i*130-20,500-i%3*30,100,170);c.beginPath();c.moveTo(i*130-30,500-i%3*30);c.lineTo(i*130+30,455-i%3*30);c.lineTo(i*130+90,500-i%3*30);c.fill();}}
 c.restore();}
function edit(canvas,objects,selected=-1){const c=canvas.getContext('2d');c.save();c.setTransform(canvas.width/1000,0,0,canvas.height/600,0,0);backdrop(c,1000,600);objects.forEach((o,i)=>{sprite(c,o.name,o.x,o.y,o.size,o.angle);if(i===selected){const im=images[o.name],h=o.size*(im?.naturalHeight||1)/(im?.naturalWidth||1);c.save();c.translate(o.x,o.y);c.rotate(o.angle);c.strokeStyle='#e5422d';c.lineWidth=3;c.setLineDash([8,6]);c.strokeRect(-o.size/2-8,-h/2-8,o.size+16,h+16);c.restore();}});c.restore();}
function snapshot(objects){const c=document.createElement('canvas');c.width=1000;c.height=600;edit(c,objects);return c.toDataURL('image/jpeg',.9);}
g.LiteralScene={names,images,ready,draw,edit,snapshot};
})(globalThis);
