# Zero Forcing Lab

日本語で遊べる Zero Forcing / Fort / 根付き合成の数学実験室。

https://129besan.github.io/zero-forcing-playground/

## 体験

- 頂点を選択し、1手ずつ・自動・強制元を指定してZero Forcingを進める。巻き戻しも可能。
- 停止した白い集合をFort判定に渡す。違反する外側の頂点を赤で表示。
- FortとMinimal Fortを全列挙し、各集合を表示。
- K4を1〜4個つないだ風車で、3^t通りの選択と全数3^t+3tを確認。
- 道・サイクル・星・発表の6頂点グラフ・H35に対応。

データの送信やアカウントは不要。Google Fontsが利用できない場合は端末のフォントで表示。

## ローカル

```sh
python3 -m http.server 8000
# http://localhost:8000
npm test
```

依存パッケージ・ビルド不要。HTML/CSS/JavaScriptだけの静的サイト。
GitHub Pagesはmainブランチのルートを配信。

## 数学と検証

空集合はFortから除外。Minimal Fortは包含関係についての極小であり、1頂点削除だけでは判定しない。
サイズ順のFort列挙から、既知の極小Fortを含む集合を除く。テストでは全ての真部分集合の直接検査とも照合。
Zero Forcing数は全初期集合のclosureを計算して厳密に求める（このアプリの小グラフに限定）。

H35：木の辺 ap, po, oq, qb, oc。x,yは木の全頂点に隣接し互いに非隣接。根rはa,b,c,p,qに隣接。
Minimal Fort 56個、根を含むもの35個、含まないもの21個。

参考：AIM Minimum Rank–Special Graphs Work Group (2008), Zero forcing sets and the minimum rank of graphs.
https://doi.org/10.1016/j.laa.2007.10.009

制御との関係：Burgarth et al., Zero Forcing, Linear and Quantum Controllability for Systems Evolving on Networks.
https://arxiv.org/abs/1111.1475

根付き合成とH35は、ユーザーの研究発表原稿の例を使用。未公開の原稿・PDF・研究データ自体はこのリポジトリには含めていない。
