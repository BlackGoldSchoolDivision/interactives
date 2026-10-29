/* Original French schematic replaces a source image containing English text. */
(function(){'use strict';
const V=window.ScienceLabVisuals,scene=V.scene.bind(V),esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
// Localize the source descriptions before shared controls compose accessible labels.
const L=window.ScienceLabLocale;
for(const asset of Object.values(V.assets))asset.alts=asset.alts.map(L.translate);
function orbital(){const sun='<circle cx="110" cy="70" r="14" fill="#e6b44e"/>',earth=(x,y)=>'<circle cx="'+x+'" cy="'+y+'" r="11" fill="#418da7" stroke="#27627e" stroke-width="2"/>';
const pieces=[['Excentricité','Forme de l’orbite',sun+'<ellipse cx="110" cy="70" rx="92" ry="39" fill="none" stroke="#548599" stroke-width="3"/>'+earth(187,49)],['Obliquité','Inclinaison de l’axe',sun+earth(42,70)+'<path d="M27 98L57 42" stroke="#38586e" stroke-width="3"/><path d="M42 105V35" stroke="#95b0bd" stroke-width="2" stroke-dasharray="4 4"/>'],['Précession','Orientation de l’axe',earth(110,80)+'<path d="M110 111V43M110 80L132 40M110 80L88 40" stroke="#38586e" stroke-width="3"/><ellipse cx="110" cy="38" rx="24" ry="8" fill="none" stroke="#b27838" stroke-width="3"/>']];
return '<div class="french-orbital-model" role="img" aria-label="Trois variations à long terme : forme de l’orbite, inclinaison de l’axe et orientation de l’axe terrestre. Modèles simplifiés, pas à l’échelle.">'+pieces.map(([title,caption,art])=>'<figure><svg viewBox="0 0 220 140" aria-hidden="true"><rect width="220" height="140" rx="12" fill="#e8f2f6"/>'+art+'</svg><figcaption><b>'+title+'</b><span>'+caption+'</span></figcaption></figure>').join('')+'</div>';
}
V.scene=(id,panel=0)=>id==='earth-climate-causes'&&panel===1?orbital():scene(id,panel);
V.contextPhoto=p=>'<figure class="question-photo">'+V.scene(p.asset,p.panel)+'<figcaption>'+esc(p.caption||'Scène d’enquête')+'</figcaption></figure>';
V.sceneStrip=p=>{const asset=V.assets[p.asset];if(!asset)return'';const panels=p.panels||asset.alts.map((_,i)=>i),limit=p.columns||Math.min(panels.length,4);return'<div class="raster-scene-strip strip-'+limit+'" role="group" aria-label="'+esc(p.groupLabel||'Photographies d’observation')+'">'+panels.map(i=>'<figure class="raster-strip-card">'+V.scene(p.asset,i)+'</figure>').join('')+'</div>'+(p.caption?'<p class="diagram-caption">'+esc(p.caption)+'</p>':'');};
})();
