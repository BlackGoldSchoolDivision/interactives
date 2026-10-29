(function(root){'use strict';
const source=typeof module!=='undefined'?require('../topics.js'):root.ScienceLabTopics;
const bank=typeof module!=='undefined'?require('./bank.js'):root.ScienceLabFrenchBank;
const topics=JSON.parse(JSON.stringify(source));
function frenchRefs(ref){const swap={'reactions.K3':['reactions.U1'],'reactions.U1':['reactions.K3'],'planetary.K8':['planetary.U1'],'planetary.U1':['planetary.U2'],'exploration.K3':['exploration.K3','exploration.K4'],'exploration.K4':['exploration.K5'],'exploration.K5':['exploration.K6'],'exploration.K6':['exploration.K7']};return swap[ref]||[ref];}
for(const t of topics){Object.assign(t,bank.metadata.topics[t.id]);t.storageKey='science-practice-lab-fr-'+t.id+'-v1';for(const g of t.data.groups)Object.assign(g,bank.metadata.groups[g.id],bank.curriculum.groups[g.id]);for(const q of t.data.questions){const correct=q.type==='dropdown'?q.data.blanks.map((b,i)=>b.options.indexOf(q.answer[i])):null;for(const[p,text]of bank.records[q.id]){const keys=p.split('.'),leaf=keys.pop();let obj=q;for(const k of keys)obj=obj[k];obj[leaf]=text;}if(correct)q.answer=q.data.blanks.map((b,i)=>b.options[correct[i]]);q.refs=[...new Set(q.refs.flatMap(frenchRefs))];}}
root.ScienceLabTopics=topics;if(typeof module!=='undefined')module.exports=topics;
})(typeof globalThis!=='undefined'?globalThis:this);
