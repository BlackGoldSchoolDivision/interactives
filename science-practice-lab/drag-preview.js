/* Flatten one visible photo crop so native drag feedback cannot include its atlas neighbours. */
(function(root){'use strict';
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
function crop(frame,image,naturalWidth,naturalHeight){
 if(!frame.width||!frame.height||!image.width||!image.height||!naturalWidth||!naturalHeight)return null;
 const x=clamp((frame.left-image.left)/image.width*naturalWidth,0,naturalWidth);
 const y=clamp((frame.top-image.top)/image.height*naturalHeight,0,naturalHeight);
 const right=clamp((frame.left+frame.width-image.left)/image.width*naturalWidth,0,naturalWidth);
 const bottom=clamp((frame.top+frame.height-image.top)/image.height*naturalHeight,0,naturalHeight);
 return right>x&&bottom>y?{x,y,width:right-x,height:bottom-y}:null;
}
function lines(ctx,text,width){
 const result=[];let line='';
 for(const word of text.trim().split(/\s+/)){const next=line?line+' '+word:word;if(line&&ctx.measureText(next).width>width){result.push(line);line=word;}else line=next;}
 if(line)result.push(line);
 if(result.length>3){result.length=3;while(result[2]&&ctx.measureText(result[2]+'…').width>width)result[2]=result[2].slice(0,-1);result[2]+='…';}
 return result;
}
function create(source,event){
 const frame=source?.querySelector('.piece-picture .scene-art'),image=frame?.querySelector('img');
 if(!frame||!image)return null;
 const doc=source.ownerDocument,node=doc.createElement('canvas'),ctx=node.getContext('2d');if(!ctx)return null;
 const box=source.getBoundingClientRect(),visible=frame.getBoundingClientRect(),width=Math.round(clamp(box.width,140,240)),pad=8;
 const photoHeight=Math.round(clamp((width-pad*2)*visible.height/Math.max(1,visible.width),60,164));
 ctx.font='600 13px system-ui,sans-serif';
 const label=source.querySelector('.piece-label')?.textContent||'',wrapped=lines(ctx,label,width-pad*2);
 const height=pad*3+photoHeight+Math.max(1,wrapped.length)*18;
 node.width=width;node.height=height;
 Object.assign(node.style,{position:'fixed',left:'-10000px',top:'0',width:width+'px',height:height+'px',pointerEvents:'none'});
 node.className='picture-drag-preview';node.setAttribute('aria-hidden','true');node.dataset.dragPiece=source.dataset.piece;
 ctx.fillStyle='#fff';ctx.fillRect(0,0,width,height);ctx.strokeStyle='#8fada5';ctx.strokeRect(.5,.5,width-1,height-1);
 ctx.fillStyle='#edf3f1';ctx.fillRect(pad,pad,width-pad*2,photoHeight);
 const area=crop(visible,image.getBoundingClientRect(),image.naturalWidth,image.naturalHeight);
 if(image.complete&&area)ctx.drawImage(image,area.x,area.y,area.width,area.height,pad,pad,width-pad*2,photoHeight);
 ctx.font='600 13px system-ui,sans-serif';ctx.fillStyle='#183e35';ctx.textBaseline='top';
 wrapped.forEach((line,i)=>ctx.fillText(line,pad,pad*2+photoHeight+i*18,width-pad*2));
 doc.body.append(node);source.classList.add('drag-source');
 return {node,source,x:Math.round(clamp((event.clientX-box.left)/Math.max(1,box.width)*width,0,width)),y:Math.round(clamp((event.clientY-box.top)/Math.max(1,box.height)*height,0,height))};
}
function destroy(preview){if(preview){preview.node.remove();preview.source.classList.remove('drag-source');}}
const api={crop,create,destroy};root.ScienceLabDragPreview=api;if(typeof module!=='undefined')module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
