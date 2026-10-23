// All presets stay small enough for exact enumeration in the browser.
export const catalog = [
  {id:'six',name:'発表の6頂点グラフ',family:'研究の例',note:'同じ2頂点でも、選ぶ場所で結果が変わります。'},
  {id:'path',name:'道',symbol:'Pₙ',family:'基本の形',size:true,note:'端から順に色を広げるには、何頂点必要でしょう？'},
  {id:'cycle',name:'サイクル',symbol:'Cₙ',family:'基本の形',size:true,note:'道の両端をつなぐと、出発点はどう変わるでしょう？'},
  {id:'star',name:'星',symbol:'K₁,ₙ₋₁',family:'基本の形',size:true,note:'中心と葉では、白い隣の数が大きく違います。'},
  {id:'complete',name:'完全グラフ',symbol:'Kₙ',family:'基本の形',size:true,note:'すべての2頂点が隣接しています。辺が多いと有利でしょうか？'},
  {id:'wheel',name:'車輪',symbol:'Wₙ',family:'基本の形',size:true,note:'サイクルのすべての頂点を中心につなぎました。'},
  {id:'bipartite',name:'完全二部グラフ',symbol:'K₃,₃',family:'つながりを比べる',note:'左右の組の間だけに、すべての辺を引いたグラフです。'},
  {id:'ladder',name:'はしご',symbol:'P₂ □ P₄',family:'つながりを比べる',note:'2本の道を横木でつないでいます。'},
  {id:'grid',name:'3 × 3 格子',symbol:'P₃ □ P₃',family:'つながりを比べる',note:'角、辺、中央で必要な選び方はどう違うでしょう？'},
  {id:'tree',name:'二分木',symbol:'7 vertices',family:'つながりを比べる',note:'枝分かれする場所で、強制が止まる理由を考えてみましょう。'},
  {id:'bowtie',name:'蝶ネクタイ',symbol:'2 triangles',family:'つながりを比べる',note:'2つの三角形が、1つの頂点だけを共有しています。'},
  {id:'barbell',name:'ダンベル',symbol:'bridge',family:'つながりを比べる',note:'2つの三角形を1本の辺でつないでいます。'},
  {id:'cube',name:'立方体',symbol:'Q₃',family:'対称な形',note:'立方体の頂点と辺を平面に描きました。どの頂点も次数3です。'},
  {id:'petersen',name:'Petersenグラフ',symbol:'G(5, 2)',family:'対称な形',note:'外側の五角形と内側の星形をつなぎます。どの頂点も次数3です。'},
  {id:'prism',name:'三角柱',symbol:'C₃ □ P₂',family:'対称な形',note:'2つの三角形の対応する頂点をつないでいます。'},
  {id:'disconnected',name:'離れた2つの三角形',symbol:'2K₃',family:'つながりを比べる',note:'辺を通じて別の成分へ色を広げることはできません。'},
  {id:'distance',name:'距離グラフ',symbol:'Δ = {3, 4, 5}',family:'研究の例',size:true,note:'番号の差が3、4、5のときに辺を引きます。有限のグラフの個数と漸近成長率は別の量です。'},
  {id:'wind',name:'風車',symbol:'K₄ × 2',family:'研究の例',note:'K₄を2つ、根だけ共有してつなぎます。3番目のタブで部品を増やせます。'},
  {id:'h35',name:'研究の部品',symbol:'H₃₅',family:'研究の例',note:'根を含む極小Fortが35個ある、研究で使う9頂点のグラフです。'},
];
export const preset = id => catalog.find(item => item.id === id);
