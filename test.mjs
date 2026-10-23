import test from 'node:test';import assert from 'node:assert/strict';import {graph,closure,isFort,enumerate,count} from './math.js';
test('発表の強制例と停止集合',()=>{const g=graph('six');assert.equal(closure(g,3),63);assert.equal(closure(g,5),5);assert(isFort(g,63^5));assert(!isFort(g,63^3));assert.equal(enumerate(g).z,2);});
test('既知の風車の全個数・根あり/なし',()=>{for(let t=1;t<=4;t++){const d=enumerate(graph('wind',t));assert.equal(d.minimal.length,3**t+3*t);assert.equal(d.minimal.filter(m=>m&1).length,3**t);}});
test('H35 の総数56・strong35',()=>{const g=graph('h35'),d=enumerate(g);assert.equal(d.minimal.length,56);assert.equal(d.minimal.filter(m=>m&(1<<8)).length,35);});
test('全Fort交差とforcing成功が同値・極小性を全真部分集合で独立照合',()=>{for(const kind of ['six','path','cycle','star','h35']){const g=graph(kind),d=enumerate(g);for(let m=0;m<(1<<g.n);m++){assert.equal(closure(g,m)===(1<<g.n)-1,d.minimal.every(f=>(m&f)!==0));if(isFort(g,m)){let minimal=true;for(let s=(m-1)&m;s;s=(s-1)&m)if(isFort(g,s)){minimal=false;break;}assert.equal(d.minimal.includes(m),minimal);}}}});

import {catalog} from './graphs.js';
test('追加プリセットの頂点・辺と既知のZero Forcing数',()=>{
 const expected={bipartite:[6,9,4],ladder:[8,10,2],grid:[9,12,3],tree:[7,6,3],bowtie:[5,6,3],barbell:[6,7,3],cube:[8,12,4],petersen:[10,15,5],prism:[6,9,3],disconnected:[6,6,4]};
 for(const [kind,[n,e,z]] of Object.entries(expected)){const g=graph(kind);assert.equal(g.n,n,kind);assert.equal(g.edges.length,e,kind);assert.equal(enumerate(g).z,z,kind);}
 for(const p of catalog){const g=graph(p.id);assert.equal(g.pos.length,g.n);assert.equal(new Set(g.edges.map(([a,b])=>[a,b].sort((x,y)=>x-y).join(','))).size,g.edges.length,p.id);for(const [a,b] of g.edges){assert(a!==b);assert(a>=0&&b>=0&&a<g.n&&b<g.n);assert(g.adj[a].includes(b)&&g.adj[b].includes(a));}}
});
test('頂点数4..12で道・サイクル・星・完全グラフを確認',()=>{
 for(let n=4;n<=12;n++)for(const [kind,z] of [['path',1],['cycle',2],['star',n-2],['complete',n-1]]){const g=graph(kind,2,n),d=enumerate(g);assert.equal(g.n,n);assert.equal(d.z,z,`${kind}/${n}`);assert.equal(count(d.best),z);assert.equal(closure(g,d.best),(1<<n)-1);}
});
test('全19プリセットでFortの交差条件を独立な到達計算と照合',()=>{
 for(const p of catalog){const g=graph(p.id),d=enumerate(g);for(let m=0;m<(1<<g.n);m++){assert.equal(closure(g,m)===(1<<g.n)-1,d.minimal.every(f=>(m&f)!==0),`${p.id}/${m}`);}}
});
test('距離グラフは番号差3,4,5で隣接し、極小性は全真部分集合で確認',()=>{
 for(let n=4;n<=12;n++){const g=graph('distance',2,n),d=enumerate(g);for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)assert.equal(g.adj[i].includes(j),[3,4,5].includes(j-i));for(const f of d.minimal)for(let s=(f-1)&f;s;s=(s-1)&f)assert(!isFort(g,s));}
 assert.throws(()=>graph('unknown'));assert.throws(()=>graph('path',2,30));
});
