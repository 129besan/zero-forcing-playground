export function graph(kind,t=2){
 let labels=[],edges=[],pos=[];const add=(a,b)=>edges.push([a,b]);
 if(kind==='wind'){labels=['r'];pos=[[360,230]];for(let j=0;j<t;j++){const theta=2*Math.PI*j/t-Math.PI/2;for(let k=0;k<3;k++){const a=theta+(k-1)*.30;labels.push(`${['a','b','c'][k]}${j+1}`);pos.push([360+190*Math.cos(a),230+170*Math.sin(a)]);}const vs=[0,1+3*j,2+3*j,3+3*j];for(let a=0;a<4;a++)for(let b=a+1;b<4;b++)add(vs[a],vs[b]);}}
 else if(kind==='h35'){labels=['a','p','o','q','b','c','x','y','r'];pos=[[100,290],[230,290],[360,290],[490,290],[620,290],[360,415],[190,160],[530,160],[360,45]];[[0,1],[1,2],[2,3],[3,4],[2,5]].forEach(e=>add(...e));for(const v of [6,7])for(let j=0;j<6;j++)add(v,j);for(const v of [0,1,3,4,5])add(8,v);}
 else {const n=kind==='star'?6:kind==='path'?6:6;labels=Array.from({length:n},(_,i)=>String(i+1));pos=kind==='six'?[[170,100],[360,100],[550,100],[550,350],[360,350],[170,350]]:Array.from({length:n},(_,i)=>[360+190*Math.cos(i*2*Math.PI/n-Math.PI/2),230+170*Math.sin(i*2*Math.PI/n-Math.PI/2)]);if(kind==='star'){pos[0]=[360,230];for(let i=1;i<n;i++){pos[i]=[360+185*Math.cos((i-1)*2*Math.PI/5-Math.PI/2),230+170*Math.sin((i-1)*2*Math.PI/5-Math.PI/2)];add(0,i);}}else{for(let i=0;i<n-1;i++)add(i,i+1);if(kind!=='path')add(n-1,0);if(kind==='six')add(1,3);}}
 const adj=labels.map(()=>[]);for(const [a,b]of edges){adj[a].push(b);adj[b].push(a);}return {labels,edges,pos,adj,n:labels.length};
}
export const count=m=>{let n=0;for(;m;m&=m-1)n++;return n;};
export function moves(g,mask){return g.adj.flatMap((ns,u)=>{if(!(mask&(1<<u)))return [];const w=ns.filter(v=>!(mask&(1<<v)));return w.length===1?[{u,v:w[0]}]:[];});}
export function closure(g,m){let ms;while((ms=moves(g,m)).length)m|=1<<ms[0].v;return m;}
export function violations(g,m){return g.adj.flatMap((ns,u)=> !(m&(1<<u))&&ns.filter(v=>m&(1<<v)).length===1?[u]:[]);}
export const isFort=(g,m)=>m!==0&&!violations(g,m).length;
export function enumerate(g){const forts=[];for(let m=1;m<(1<<g.n);m++)if(isFort(g,m))forts.push(m);forts.sort((a,b)=>count(a)-count(b)||a-b);const minimal=[];for(const m of forts)if(!minimal.some(f=>(m&f)===f))minimal.push(m);let z=g.n,best=0;for(let m=1;m<(1<<g.n);m++)if(count(m)<z&&closure(g,m)===(1<<g.n)-1){z=count(m);best=m;}return {forts,minimal,z,best};}
