export function gcd(a,b) {a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b];}return a;}
export const lcm = (a,b) => Math.abs(a*b)/gcd(a,b);
export function rational(n,d=1) {
  if(!Number.isSafeInteger(n)||!Number.isSafeInteger(d)||d===0) throw new RangeError('Invalid rational');
  const factor=gcd(n,d), sign=d<0?-1:1;
  return {n:n/factor*sign,d:d/factor*sign};
}
export function parseNumber(value) {
  const s=String(value).trim().replace(/−/g,'-');
  const fraction=s.match(/^([+-]?\d+)\s*\/\s*(\d+)$/);
  if(fraction){try{return rational(Number(fraction[1]),Number(fraction[2]));}catch{return null;}}
  if(!/^[+-]?(?:\d+(?:\.\d{0,6})?|\.\d{1,6})$/.test(s))return null;
  const places=s.split('.')[1]?.length||0;
  try{return rational(Math.round(Number(s)*10**places),10**places);}catch{return null;}
}
export const equal = (a,b) => !!a&&!!b&&a.n===b.n&&a.d===b.d;
export const asFraction = a => a.d===1?String(a.n):`${a.n}/${a.d}`;
export const add = (a,b) => rational(a.n*b.d+b.n*a.d,a.d*b.d);
export const subtract = (a,b) => rational(a.n*b.d-b.n*a.d,a.d*b.d);
export const multiply = (a,b) => rational(a.n*b.n,a.d*b.d);
export const divide = (a,b) => rational(a.n*b.d,a.d*b.n);
export function primeFactors(value){const factors=[];for(let p=2;p*p<=value;p++){while(value%p===0){factors.push(p);value/=p;}}if(value>1)factors.push(value);return factors;}
export const isPrime = value => Number.isInteger(value)&&value>1&&primeFactors(value).length===1;
export const numeric = a => a.n/a.d;
export function seededRandom(seed=1) {
  let state=seed>>>0;
  return ()=>{state+=0x6d2b79f5;let t=state;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};
}
export function shuffle(values,random=Math.random) {
  const result=[...values];
  for(let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}
  return result;
}
export const safeText = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
