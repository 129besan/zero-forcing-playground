export function graph(kind,t=2,size=6){
 let labels=[],edges=[],pos=[];
 const add=(a,b)=>edges.push([a,b]);
 const init=n=>{labels=Array.from({length:n},(_,i)=>String(i+1));};
 const ring=(n,r=175,cx=360,cy=230)=>Array.from({length:n},(_,i)=>[cx+r*Math.cos(i*2*Math.PI/n-Math.PI/2),cy+r*Math.sin(i*2*Math.PI/n-Math.PI/2)]);
 const cycle=(n,offset=0)=>{for(let i=0;i<n;i++)add(offset+i,offset+(i+1)%n);};
 if(!Number.isInteger(size)||size<4||size>12)throw new RangeError('size must be 4..12');
 if(kind==='wind'){
  if(!Number.isInteger(t)||t<1||t>4)throw new RangeError('parts must be 1..4');
  labels=['r'];pos=[[360,230]];
  for(let j=0;j<t;j++){
   const theta=2*Math.PI*j/t-Math.PI/2;
   for(let k=0;k<3;k++){const a=theta+(k-1)*.40;labels.push(`${['a','b','c'][k]}${j+1}`);pos.push([360+205*Math.cos(a),230+175*Math.sin(a)]);}
   const vs=[0,1+3*j,2+3*j,3+3*j];for(let a=0;a<4;a++)for(let b=a+1;b<4;b++)add(vs[a],vs[b]);
  }
 }else if(kind==='h35'){
  labels=['a','p','o','q','b','c','x','y','r'];pos=[[100,290],[230,290],[360,290],[490,290],[620,290],[360,415],[190,160],[530,160],[360,45]];
  [[0,1],[1,2],[2,3],[3,4],[2,5]].forEach(e=>add(...e));for(const v of [6,7])for(let j=0;j<6;j++)add(v,j);for(const v of [0,1,3,4,5])add(8,v);
 }else if(['six','path','cycle','star','complete','wheel','distance'].includes(kind)){
  const n=kind==='six'?6:size;init(n);pos=ring(n);
  if(kind==='six'){pos=[[170,100],[360,100],[550,100],[550,350],[360,350],[170,350]];cycle(n);add(1,3);}
  if(kind==='path'){pos=Array.from({length:n},(_,i)=>[75+570*i/(n-1),230]);for(let i=0;i<n-1;i++)add(i,i+1);}
  if(kind==='cycle')cycle(n);
  if(kind==='complete')for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)add(i,j);
  if(kind==='star'||kind==='wheel'){pos=[[360,230],...ring(n-1)];for(let i=1;i<n;i++)add(0,i);if(kind==='wheel')cycle(n-1,1);}
  if(kind==='distance'){pos=Array.from({length:n},(_,i)=>[65+590*i/(n-1),230]);for(let i=0;i<n;i++)for(const d of [3,4,5])if(i+d<n)add(i,i+d);}
 }else if(kind==='bipartite'){
  init(6);pos=Array.from({length:6},(_,i)=>[i<3?210:510,85+(i%3)*145]);for(let i=0;i<3;i++)for(let j=3;j<6;j++)add(i,j);
 }else if(kind==='grid'||kind==='ladder'){
  const rows=kind==='grid'?3:2,cols=kind==='grid'?3:4;init(rows*cols);
  for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const v=r*cols+c;pos.push([140+440*c/(cols-1),100+260*r/(rows-1)]);if(c)add(v-1,v);if(r)add(v-cols,v);}
 }else if(kind==='tree'){
  init(7);pos=[[360,65],[210,210],[510,210],[120,370],[280,370],[440,370],[600,370]];for(let i=1;i<7;i++)add(Math.floor((i-1)/2),i);
 }else if(kind==='cube'||kind==='prism'){
  const k=kind==='cube'?4:3;init(k*2);pos=[...ring(k,195),...ring(k,90)];cycle(k);cycle(k,k);for(let i=0;i<k;i++)add(i,i+k);
 }else if(kind==='petersen'){
  init(10);pos=[...ring(5,195),...ring(5,90)];cycle(5);for(let i=0;i<5;i++){add(i,i+5);add(i+5,(i+2)%5+5);}
 }else if(kind==='bowtie'){
  init(5);pos=[[360,230],[140,90],[140,370],[580,90],[580,370]];[[0,1],[1,2],[2,0],[0,3],[3,4],[4,0]].forEach(e=>add(...e));
 }else if(kind==='barbell'||kind==='disconnected'){
  init(6);pos=[[110,90],[110,370],[280,230],[440,230],[610,90],[610,370]];cycle(3);cycle(3,3);if(kind==='barbell')add(2,3);
 }else throw new RangeError(`Unknown graph: ${kind}`);
 const adj=labels.map(()=>[]);for(const [a,b]of edges){adj[a].push(b);adj[b].push(a);}return {labels,edges,pos,adj,n:labels.length};
}
export const count=m=>{let n=0;for(;m;m&=m-1)n++;return n;};
export function moves(g,mask){return g.adj.flatMap((ns,u)=>{if(!(mask&(1<<u)))return [];const w=ns.filter(v=>!(mask&(1<<v)));return w.length===1?[{u,v:w[0]}]:[];});}
export function closure(g,m){let ms;while((ms=moves(g,m)).length)m|=1<<ms[0].v;return m;}
export function violations(g,m){return g.adj.flatMap((ns,u)=> !(m&(1<<u))&&ns.filter(v=>m&(1<<v)).length===1?[u]:[]);}
export const isFort=(g,m)=>m!==0&&!violations(g,m).length;
export function enumerate(g){const forts=[];for(let m=1;m<(1<<g.n);m++)if(isFort(g,m))forts.push(m);forts.sort((a,b)=>count(a)-count(b)||a-b);const minimal=[];for(const m of forts)if(!minimal.some(f=>(m&f)===f))minimal.push(m);let z=g.n,best=(1<<g.n)-1;for(let m=1;m<(1<<g.n);m++)if(count(m)<z&&closure(g,m)===(1<<g.n)-1){z=count(m);best=m;}return {forts,minimal,z,best};}
