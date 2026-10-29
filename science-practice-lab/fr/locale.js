/* Local interface adapter for the shared renderer. Scientific content is authored in French. */
(function(root){'use strict';
const bank=typeof module!=='undefined'?require('./bank.js'):root.ScienceLabFrenchBank;
const ui=typeof module!=='undefined'?require('./strings.js'):root.ScienceLabFrenchStrings;
const dictionary={...bank.strings,...ui};
const french=new Set(Object.values(dictionary));
const stages={solid:'solide',liquid:'liquide',gas:'gazeux'},direction={left:'à gauche',right:'à droite'};
function translate(value){
 const original=String(value??''),s=original.trim();if(!s)return original;
 let out=dictionary[s];
 if(out===undefined&&french.has(s))return original;
 if(out===undefined){
 const rules=[
 [/^GRADE 6 SCIENCE · (.+)$/,(m,a)=>'SCIENCES 6e ANNÉE · '+a],
 [/^Science Practice Lab · (.+)$/,(m,a)=>'Labo de sciences · '+a],
 [/^(.+) learning goals$/,(m,a)=>a+' · objectifs d’apprentissage'],
 [/^(.+) · curriculum & coverage$/,(m,a)=>a+' · programme et couverture'],
 [/^(\d+) questions · (\d+) goals$/,(m,a,b)=>a+' questions · '+b+' objectifs'],
 [/^(\d+) \/ (\d+) seen · (\d+) correct$/,(m,a,b,c)=>a+' / '+b+' vues · '+c+' réussies'],
 [/^(\d+) questions seen$/,(m,a)=>a+(a==='1'?' question vue':' questions vues')],
 [/^(\d+) correct · (\d+) seen$/,(m,a,b)=>a+(a==='1'?' réussie · ':' réussies · ')+b+(b==='1'?' vue':' vues')],
 [/^(\d+) of (\d+) answered correctly$/,(m,a,b)=>a+' sur '+b+(a==='1'?' réussie':' réussies')],
 [/^(\d+) questions · 9 formats$/,(m,a)=>a+' questions · 9 formats'],
 [/^(\d+) questions? ready to try$/,(m,a)=>a+(a==='1'?' question prête':' questions prêtes')],
 [/^Question (\d+) of (\d+) · (.+)$/,(m,a,b,c)=>'Question '+a+' sur '+b+' · '+translate(c)],
 [/^Start (.+) practice →$/,(m,a)=>'Commencer : '+a+' →'],
 [/^Pictures & diagrams · (\d+) questions$/,(m,a)=>'Images et schémas · '+a+' questions'],
 [/^Choose (\d+) answers\. You can change your choices before checking\.$/,(m,a)=>'Choisis '+a+' réponses. Tu peux modifier tes choix avant de vérifier.'],
 [/^Choose one answer for each of the (\d+) statements\.$/,(m,a)=>'Choisis une réponse pour chacun des '+a+' énoncés.'],
 [/^Choose (\d+) fewer answers?\.$/,(m,a)=>'Retire '+a+(a==='1'?' réponse.':' réponses.')],
 [/^(\d+) of (\d+) (selected|completed|placed|entered)$/,(m,a,b,c)=>a+' / '+b+' '+({selected:'choix',completed:'énoncé'+(b==='1'?'':'s'),placed:'fiche'+(b==='1'?'':'s'),entered:'nombre'+(b==='1'?'':'s')}[c])],
 [/^Your answer in (.+)$/,(m,a)=>'Ta réponse en '+a],
 [/^Move step (\d+) (up|down)$/,(m,a,b)=>'Déplacer l’étape '+a+(b==='up'?' vers le haut':' vers le bas')],
 [/^Selected: (.+)\. Choose a destination\.$/,(m,a)=>'Fiche sélectionnée : '+a+'. Choisis une destination.'],
 [/^Place selected card in (.+)$/,(m,a)=>'Placer la fiche sélectionnée dans '+translate(a)],
 [/^(.+) placed in (.+)\.$/,(m,a,b)=>a+' placé dans '+b+'.'],
 [/^(\d+) of (\d+) parts correct\. Keep going\.$/,(m,a,b)=>a+(a==='1'?' partie sur ':' parties sur ')+b+(a==='1'?' est correcte. Continue.':' sont correctes. Continue.')],
 [/^Question (\d+): (.+)$/,(m,a,b)=>'Question '+a+' : '+translate(b)],
 [/^(\d+) of (\d+) questions submitted$/,(m,a,b)=>a+(a==='1'?' question sur ':' questions sur ')+b+(a==='1'?' soumise':' soumises')],
 [/^(\d+) of (\d+) answers saved · (\d+) flagged$/,(m,a,b,c)=>a+(a==='1'?' réponse sur ':' réponses sur ')+b+(a==='1'?' enregistrée · ':' enregistrées · ')+c+' à revoir'],
 [/^(.+) · round complete$/,(m,a)=>a+' · série terminée'],
 [/^(\d+) of (\d+) questions have an answer\. (\d+) flagged for another look\.$/,(m,a,b,c)=>a+(a==='1'?' question sur ':' questions sur ')+b+(a==='1'?' a une réponse. ':' ont une réponse. ')+c+' à revoir.'],
 [/^You can return to any question\. Finishing now will include (\d+) unanswered questions? in your review\.$/,(m,a)=>'Tu peux revenir à toute question. Si tu termines maintenant, le bilan comprendra '+a+(a==='1'?' question sans réponse.':' questions sans réponse.')],
 [/^Add (.+) to practice set$/,(m,a)=>'Ajouter '+a+' à la sélection'],
 [/^TEACHER TOOLS · (.+)$/,(m,a)=>'OUTILS ENSEIGNANTS · '+a],
 [/^(\d+) of (\d+) matching questions$/,(m,a,b)=>a+' sur '+b+' questions trouvées'],
 [/^(\d+) selected$/,(m,a)=>a+(a==='1'?' sélectionnée':' sélectionnées')],
 [/^Browse and select (\d+) matching questions$/,(m,a)=>'Parcourir et sélectionner les '+a+' questions trouvées'],
 [/^Copied: (\d+) questions?\. Share this link with students\.$/,(m,a)=>'Lien copié : '+a+' question(s). Partagez ce lien avec les élèves.'],
 [/^(\d+) original Grade 6 practice questions$/,(m,a)=>a+' questions originales de 6e année'],
 [/^Answer: (_+)(.*)$/,(m,a,b)=>'Réponse : '+a+b],
 [/^TEACHING NOTES · (.+)$/,(m,a)=>'NOTES PÉDAGOGIQUES · '+a],
 [/^Curriculum references: (.+)$/,(m,a)=>'Références au programme : '+a],
 [/^(\d+) original (.+) questions across (\d+) KUSP groups\. Each group has two questions in each of nine formats\. Progress below belongs to this device\.$/,(m,a,b,c)=>a+' questions originales sur le thème « '+b+' », réparties en '+c+' groupes du programme. Chaque groupe comprend deux questions dans chacun des neuf formats. La progression ci-dessous concerne cet appareil.'],
 [/^(.+) · curriculum statements$/,(m,a)=>a+' · énoncés du programme'],
 [/^(\d+) mapped questions · (\d+) seen · (.+)$/,(m,a,b,c)=>a+(a==='1'?' question associée · ':' questions associées · ')+b+(b==='1'?' vue · ':' vues · ')+c],
 [/^Curriculum mapping follows the (.+) section of Science 1–6 Curriculum NEW Alberta supplied by Darren\. The app is independent of Alberta Education and Vretta\. “Correct” reports question performance, not mastery of an entire curriculum statement\.$/,(m,a)=>'Les références suivent l’onglet « 6e année » du classeur Science 1–6 Curriculum NEW Alberta fourni par Darren, pour le thème « '+a+' ». L’application est indépendante d’Alberta Education et de Vretta. Une réponse réussie ne démontre pas à elle seule la maitrise de tout un énoncé du programme.'],
 [/^Clear (.+) progress on this device$/,(m,a)=>'Effacer la progression : '+a],
 [/^Confirm clear (.+) progress$/,(m,a)=>'Confirmer l’effacement : '+a],
 [/^Press the button again to clear (.+) question history and its saved round on this device\. Other topics will be kept\.$/,(m,a)=>'Appuyez encore pour effacer l’historique et la série enregistrée du thème « '+a+' » sur cet appareil. Les autres thèmes seront conservés.'],
 [/^Stage (\d+)$/,(m,a)=>'Étape '+a],
 [/^Illustration ([A-D])$/,(m,a)=>'Illustration '+a],
 [/^Panel ([A-D]): (.+)$/,(m,a,b)=>'Panneau '+a+' : '+translate(b)],
 [/^Example repeated (.+) values across equal time intervals\.$/,(m,a)=>'Exemple de valeurs répétées en '+translate(a)+' à intervalles de temps égaux.'],
 [/^Example repeated (.+) values shown as bars\.$/,(m,a)=>'Exemple de valeurs répétées en '+translate(a)+', représentées en barres.'],
 [/^Simplified (solid|liquid|gas) particle model\.$/,(m,a)=>'Modèle particulaire simplifié : '+stages[a]+'.'],
 [/^Arrow ([A-D]) goes from (solid|liquid|gas) to (solid|liquid|gas)\. Arrow ([A-D]) goes from (solid|liquid|gas) to (solid|liquid|gas)\.$/,(m,a,b,c,d,e,f)=>'La flèche '+a+' va de l’état '+stages[b]+' à l’état '+stages[c]+'. La flèche '+d+' va de l’état '+stages[e]+' à l’état '+stages[f]+'.'],
 [/^Celsius thermometer from (-?\d+) to (-?\d+) degrees, with (\d+) degree intervals\. (.+)$/,(m,a,b,c,d)=>'Thermomètre Celsius de '+a+' à '+b+' degrés, gradué tous les '+c+' degrés. '+translate(d)],
 [/^The liquid level is (\d+) small intervals? above (-?\d+) degrees\.$/,(m,a,b)=>'Le niveau du liquide se trouve '+a+' petit(s) intervalle(s) au-dessus de '+b+' degrés.'],
 [/^The liquid level ends at the labelled (-?\d+) degree mark\.$/,(m,a)=>'Le liquide atteint la graduation de '+a+' degrés.'],
 [/^(View [AB]|Bridge joint): two sections with fixed outside endpoints, separated by a (wider|narrower) joint gap\.$/,(m,a,b)=>translate(a)+' : deux sections aux extrémités extérieures fixes, séparées par un joint '+(b==='wider'?'plus large.':'plus étroit.')],
 [/^Cart A is on the left and cart B on the right\. (Both force arrows are attached to cart A\.|One force arrow is attached to each cart\.) The left model arrow points (left|right) and the other points (left|right)\. Arrow lengths are (equal|unequal)\.$/,(m,a,b,c,d)=>'Le chariot A est à gauche et B à droite. '+translate(a)+' La flèche de gauche pointe '+direction[b]+' et l’autre '+direction[c]+'. Leurs longueurs sont '+(d==='equal'?'égales.':'différentes.')],
 [/^Spring scale from (\d+) to (\d+) newtons, marked every (\d+) newton\. The indicator is four small intervals above zero\.$/,(m,a,b,c)=>'Dynamomètre de '+a+' à '+b+' newtons, gradué tous les '+c+' newton(s). L’indicateur est quatre petits intervalles au-dessus de zéro.'],
 [/^(-?\d+)\.(\d+)( ?(?:cm|mm|m|g|kg|°C|N|%|m²|km²))?$/,(m,a,b,c)=>a+','+b+(c||'')]
 ];
 for(const[pattern,fn]of rules)if(pattern.test(s)){out=s.replace(pattern,fn);break;}
 }
 if(out===undefined){
 // Fragments around inline emphasis are separate text nodes in the shared templates.
 out=s.replace(/^of (\d+)/,'sur $1').replace(/^· Test practice$/,'· Mode test').replace(/^· Learn & retry$/,'· Apprendre et réessayer').replace(/^· Question preview$/,'· Aperçu de la question').replace(/^⚑ Flagged · /,'⚑ À revoir · ');
 if(out===s)return original;
 }
 return original.slice(0,original.indexOf(s))+out+original.slice(original.indexOf(s)+s.length);
}
function localize(node=root.document){if(!node)return;const doc=node.ownerDocument||node;
 const visit=el=>{if(!el?.getAttribute||/^(SCRIPT|STYLE|NOSCRIPT)$/.test(el.tagName))return;for(const attr of ['aria-label','title','placeholder','alt'])if(el.hasAttribute(attr)){const old=el.getAttribute(attr),next=translate(old);if(next!==old)el.setAttribute(attr,next);}};
 if(node.nodeType===3){if(!/^(SCRIPT|STYLE|NOSCRIPT)$/.test(node.parentElement?.tagName)){const next=translate(node.nodeValue);if(next!==node.nodeValue)node.nodeValue=next;}return;}
 visit(node);const walker=doc.createTreeWalker(node,5);let child;while((child=walker.nextNode())){if(child.nodeType===1)visit(child);else if(!/^(SCRIPT|STYLE|NOSCRIPT)$/.test(child.parentElement?.tagName)){const next=translate(child.nodeValue);if(next!==child.nodeValue)child.nodeValue=next;}}
}
const api={lang:'fr-CA',topicStorageKey:'science-practice-lab-fr-topic',translate,localize,dictionary};root.ScienceLabLocale=api;
if(typeof module!=='undefined'){module.exports=api;return;}
let queued=false;const schedule=()=>{if(!queued){queued=true;queueMicrotask(()=>{queued=false;localize(document);});}};
new MutationObserver(schedule).observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','placeholder','alt']});
document.addEventListener('DOMContentLoaded',()=>localize(document));
})(typeof globalThis!=='undefined'?globalThis:this);
