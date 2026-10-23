/* Magnet Mix-Up: free play with pointer, touch and keyboard. No outside services. */
(()=>{
'use strict';
const $=id=>document.getElementById(id);
const ITEMS=[
{id:'clip',name:'Steel paper clip',icon:'📎',mag:true,xy:[.13,.20],mobile:[.18,.17]},
{id:'pencil',name:'Wooden pencil',icon:'✏️',mag:false,xy:[.39,.17],mobile:[.50,.17]},
{id:'bolt',name:'Steel bolt',icon:'🔩',mag:true,xy:[.66,.18],mobile:[.82,.17]},
{id:'eraser',name:'Kitchen sponge',icon:'🧽',mag:false,xy:[.86,.21],mobile:[.18,.36]},
{id:'pin',name:'Steel safety pin',icon:'🧷',mag:true,xy:[.18,.41],mobile:[.50,.36]},
{id:'block',name:'Wood block',icon:'🪵',mag:false,xy:[.46,.41],mobile:[.82,.36]},
{id:'washer',name:'Steel gear',icon:'⚙️',mag:true,xy:[.72,.40],mobile:[.18,.56]},
{id:'toy',name:'Stuffed teddy',icon:'🧸',mag:false,xy:[.88,.55],mobile:[.50,.56]},
{id:'tack',name:'Steel thumbtack',icon:'📌',mag:true,xy:[.12,.65],mobile:[.82,.56]},
{id:'ruler',name:'Plastic ruler',icon:'📏',mag:false,xy:[.35,.74],mobile:[.18,.77]},
{id:'key',name:'Steel key',icon:'🗝️',mag:true,xy:[.63,.78],mobile:[.50,.77]},
{id:'foil',name:'Paper sheet',icon:'📄',mag:false,xy:[.85,.79],mobile:[.82,.77]}
];
const board=$('freeBoard'),magnet=$('freeMagnet'),table=$('freeObjects'),carry=$('freeCarry');
let active=false,holding=false,px=.52,py=.48,lastNonmag='',found=new Set();
function move(x,y,test=true){
  const w=board.clientWidth,h=board.clientHeight;if(!w||!h)return;
  x=Math.max(55,Math.min(w-55,x));y=Math.max(58,Math.min(h-36,y));
  px=x/w;py=y/h;magnet.style.left=x+'px';magnet.style.top=y+'px';
  if(test)detect();
}
function layout(){
 const small=board.clientWidth<650;
 for(const item of ITEMS){
  const el=table.querySelector('[data-free-item="'+item.id+'"]');
  if(!el)continue;
  const position=small?item.mobile:item.xy;
  el.style.left=position[0]*100+'%';el.style.top=position[1]*100+'%';
 }
 move(px*board.clientWidth,py*board.clientHeight,false);
}
function reset(){
 found.clear();carry.replaceChildren();table.replaceChildren();
 magnet.classList.remove('attached');px=.52;py=.48;lastNonmag='';
 $('freeCount').textContent='0 / 6';$('freeStatus').textContent='Find all 6 magnetic objects!';
 ITEMS.forEach(item=>{
  const el=document.createElement('div');el.className='free-object';el.dataset.freeItem=item.id;
  el.setAttribute('aria-label',item.name+(item.mag?', magnetic':', nonmagnetic'));
  const glyph=document.createElement('span');glyph.className='specimen';glyph.textContent=item.icon;glyph.setAttribute('aria-hidden','true');
  const caption=document.createElement('span');caption.className='obj-label';caption.textContent=item.name;
  el.append(glyph,caption);table.append(el);
 });
 if(active)requestAnimationFrame(layout);
}
function detect(){
 if(!active)return;
 const m=magnet.querySelector('.free-magnet-face').getBoundingClientRect();
 for(const item of ITEMS){
  if(found.has(item.id))continue;
  const el=table.querySelector('[data-free-item="'+item.id+'"]');if(!el)continue;
  const b=el.querySelector('.specimen').getBoundingClientRect();
  if(!(m.left-9<b.right&&m.right+9>b.left&&m.top-8<b.bottom&&m.bottom+8>b.top))continue;
  if(item.mag)pickup(item,el);
  else if(lastNonmag!==item.id){
    lastNonmag=item.id;$('freeStatus').textContent=item.name+' stays put — not magnetic.';
  }
 }
}
function pickup(item,el){
 found.add(item.id);lastNonmag='';
 const n=found.size-1;
 el.classList.add('carried');
 el.style.left=(30+(n%3)*50)+'px';
 el.style.top=(40+Math.floor(n/3)*22)+'px';
 carry.append(el);magnet.classList.add('attached');
 $('freeCount').textContent=found.size+' / 6';
 $('freeStatus').textContent=found.size===6?
 '✨ All six found! Move your magnet and carry them together.':item.name+' sticks! Keep looking.';
 const star=document.createElement('span');star.className='free-spark';star.textContent='✨';
 const b=board.getBoundingClientRect(),m=magnet.getBoundingClientRect();
 star.style.left=(m.left-b.left+m.width/2)+'px';star.style.top=(m.top-b.top)+'px';
 board.append(star);setTimeout(()=>star.remove(),550);
}
function fromPointer(e){
 if(!active)return;
 if(e.pointerType!=='mouse'&&!holding)return;
 const b=board.getBoundingClientRect();
 move(e.clientX-b.left,e.clientY-b.top-(e.pointerType==='touch'?22:0));
}
board.addEventListener('pointerdown',e=>{
 if(!active)return;
 holding=true;board.setPointerCapture(e.pointerId);fromPointer(e);e.preventDefault();
});
board.addEventListener('pointermove',fromPointer);
board.addEventListener('pointerup',()=>holding=false);
board.addEventListener('pointercancel',()=>holding=false);
board.addEventListener('keydown',e=>{
 if(!active)return;
 const d=e.shiftKey?38:20;
 const keys={ArrowLeft:[-d,0],ArrowRight:[d,0],ArrowUp:[0,-d],ArrowDown:[0,d]};
 if(!keys[e.key])return;
 e.preventDefault();move(px*board.clientWidth+keys[e.key][0],py*board.clientHeight+keys[e.key][1]);
});
$('freeReset').addEventListener('click',reset);
new ResizeObserver(()=>{if(active)layout();}).observe(board);
window.MagnetFreePlay={
 enter(){active=true;holding=false;reset();},
 exit(){active=false;holding=false;},
 getState(){return {collected:[...found],count:found.size,position:{x:px,y:py}};}
};
})();
