import {activities,bonusGames} from './catalogue.js';
const key='bgsd-number-sense-v1';
const activityIDs=new Set(activities.map(a=>a.id)),bonusIDs=new Set(bonusGames.map(g=>g.id));
const count=value=>Number.isInteger(value)&&value>=0?Math.min(value,1000000):0;
const empty=()=>({version:1,remember:false,activities:{},bonus:{}});
function validate(value){if(!value||value.version!==1)return null;const state=empty();state.remember=value.remember===true;for(const id of activityIDs){const record=value.activities?.[id];if(!record)continue;const completed=count(record.completed),firstTry=Math.min(completed,count(record.firstTry));state.activities[id]={completed,firstTry,supported:completed-firstTry,attempts:Math.max(completed,count(record.attempts)),rounds:count(record.rounds)};}for(const id of bonusIDs){const record=value.bonus?.[id];if(record)state.bonus[id]={plays:count(record.plays),best:Math.min(200,count(record.best)),last:Math.min(200,count(record.last))};}return state;}
export function createProgress({local=null,session=null}={}){
  let state=empty(),notice='';
  const read=storage=>{if(!storage)return null;try{return validate(JSON.parse(storage.getItem(key)));}catch{return null;}};
  const remembered=read(local),sessionState=read(session);if(remembered?.remember)state=remembered;else if(sessionState){state=sessionState;state.remember=false;}
  function write(){try{session?.setItem(key,JSON.stringify(state));}catch{notice='This browser cannot retain tab progress. Your practice continues while the page stays open.';}if(state.remember){try{if(!local)throw Error();local.setItem(key,JSON.stringify(state));}catch{state.remember=false;notice='This browser could not save progress between visits. Practice continues for this session.';try{session?.setItem(key,JSON.stringify(state));}catch{}}}}
  const activityRecord=id=>state.activities[id]||(state.activities[id]={completed:0,firstTry:0,supported:0,attempts:0,rounds:0});
  return{
    snapshot:()=>JSON.parse(JSON.stringify(state)),
    get notice(){return notice;},
    record(record){if(!activityIDs.has(record.activity))return;const r=activityRecord(record.activity);r.completed++;if(record.firstTry)r.firstTry++;else r.supported++;r.attempts+=Math.max(1,count(record.attempts));write();},
    complete(id){if(!activityIDs.has(id))return;activityRecord(id).rounds++;write();},
    bonus(id,score){if(!bonusIDs.has(id)||!Number.isInteger(score)||score<0||score>200)return;const r=state.bonus[id]||(state.bonus[id]={plays:0,best:0,last:0});r.plays++;r.last=score;r.best=Math.max(r.best,score);write();},
    remember(enabled){notice='';state.remember=!!enabled;if(!enabled){try{local?.removeItem(key);}catch{notice='Remembering is off for this session, but this browser could not remove an earlier saved record.';}}write();return{ok:enabled?state.remember:!notice,message:notice};},
    reset(){state=empty();notice='';for(const storage of [local,session]){try{storage?.removeItem(key);}catch{notice='Progress is reset here, but this browser could not clear an earlier saved record.';}}return{ok:!notice,message:notice};}
  };
}
export const progressKey=key;
