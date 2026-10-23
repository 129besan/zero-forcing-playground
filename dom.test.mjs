import {JSDOM} from 'jsdom';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import test from 'node:test';
import {fileURLToPath} from 'node:url';
test('19種のグラフと3モードのDOM操作',async()=>{
const dir=fileURLToPath(new URL('.',import.meta.url));
const dom=new JSDOM(fs.readFileSync(dir+'/index.html','utf8'),{url:'http://localhost:8000'});
globalThis.document=dom.window.document;globalThis.matchMedia=()=>({matches:true});
dom.window.HTMLElement.prototype.scrollIntoView=()=>{};
let tick;globalThis.setInterval=f=>{tick=f;return 1;};globalThis.clearInterval=()=>{tick=null;};
await import('./app.js');
const $=id=>document.getElementById(id),clickNode=i=>document.querySelector(`#board [data-index="${i}"]`).dispatchEvent(new dom.window.MouseEvent('click'));
const choose=id=>{$('graph').value=id;$('graph').onchange();};
const tab=id=>document.querySelector(`[data-mode="${id}"]`).click();
const text=new Set();const collect=()=>document.querySelectorAll('h1,h2,h3,p,#legend,button,#status').forEach(e=>{if(e.textContent.trim()&&!e.closest('svg'))text.add(e.textContent.trim());});
collect();assert.equal(document.querySelectorAll('.graph-card').length,19);assert.equal(document.querySelectorAll('#graph option').length,19);
clickNode(0);clickNode(1);$('step').click();assert.equal($('selected-count').textContent,'3');$('undo').click();assert.equal($('selected-count').textContent,'2');
$('auto').click();for(let i=0;tick&&i<20;i++)tick();assert.match($('status').textContent,/成功/);assert.equal($('auto').textContent,'自動で進める');collect();
$('reset').click();clickNode(0);clickNode(2);assert.equal($('step').disabled,true);$('result').querySelector('button').click();assert.match($('status').textContent,/Fort/);collect();
$('hint').click();assert.equal($('hint').getAttribute('aria-expanded'),'true');$('hint').click();assert.equal($('hint-text').textContent,'');
$('step').click();assert.match($('status').textContent,/極小Fort/);collect();
for(const card of [...document.querySelectorAll('.graph-card')]){card.click();assert.equal($('graph').value,card.dataset.graph);assert.equal(document.querySelectorAll('.graph-card[aria-pressed="true"]').length,1);collect();tab('fort');$('step').click();assert.match($('status').textContent,/極小Fort/);collect();tab('force');}
choose('distance');$('size').value='12';$('size').onchange();assert.equal(document.querySelectorAll('#board .node').length,12);assert.equal($('size-control').hidden,false);collect();
choose('h35');assert.equal($('size-control').hidden,true);tab('product');for(const n of [1,2,3,4]){$('parts').value=String(n);$('parts').onchange();assert.equal(Number($('fort-count').textContent),3**n+3*n);assert.equal(document.querySelectorAll('#board .root-edge').length,0);$('step').click();collect();}
document.querySelector('[data-graph="petersen"]').click();assert.equal(document.querySelector('[data-mode="force"]').getAttribute('aria-pressed'),'true');assert.equal(document.querySelectorAll('#board .node').length,10);
const filter=[...document.querySelectorAll('#filters button')].find(b=>b.textContent==='対称な形');filter.click();assert.equal(document.querySelectorAll('.graph-card').length,3);

document.querySelector('#board [data-index="0"]').focus();
document.activeElement.dispatchEvent(new dom.window.KeyboardEvent('keydown',{key:'Enter'}));
assert.equal(document.activeElement.getAttribute('data-index'),'0');
assert.equal(document.activeElement.getAttribute('aria-pressed'),'true');
dom.window.close();
});
