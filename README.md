# Unlimited Shroud Works

スマホを中心に、動画・記事・ブログ・写真への入口をまとめる個人サイトです。
同じHTMLとCSSを全端末で使います。上部タブやフレームワーク、ビルド工程はありません。

## ファイル構成

```text
index.html                 TOPの構造と紹介文
assets/css/style.css       配色・余白・レスポンシブ表示
assets/js/content.js       入口のURL、コンテンツ、更新情報
assets/js/main.js          データ表示とバッジ・日付の計算
README.md                  運用メモ
```

## リンクを登録する

`assets/js/content.js` の `categories` 内の `url: null` を実際のURLに変更します。
未登録の入口はクリックできない「準備中」表示です。仮のURLは入れていません。
動画はYouTubeのチャンネルや再生リストへのリンクを設定してください。
動画ファイルはこのリポジトリに置きません。
記事・ブログ・写真は、今後追加するサイト内ページ（例：`./articles/`）でも外部サービスでも構いません。
実際のページを作ってからURLを設定します。

## コンテンツと更新情報

`entries` に実際の公開コンテンツを追加します。

```js
{
  category: "videos", // videos / articles / blog / photos
  title: "公開した動画のタイトル",
  url: "https://www.youtube.com/watch?v=実際の動画ID",
  publishedAt: "2026-10-24",
  updatedAt: "2026-10-24",
  hot: false
}
```

- `NEW`：公開日から14日未満に自動表示。期間は `newDays` で変更できます。
- `HOT`：`hot: true` の項目に表示。人気度の自動集計は未実装です。
- 最終更新日：`siteUpdatedAt` と、公開済み項目の `publishedAt` / `updatedAt` の最大値。
- 日付は `YYYY-MM-DD`、基準は日本時間。未来の公開日や無効な日付の項目は表示しません。
- 更新の記録：`entries` と `notices` を公開日順で最大6件表示。
- 活動の入口：そのカテゴリの最新公開コンテンツのバッジを表示。
- `notices`：リンクなしのお知らせも登録できます。

公開日や更新日は編集者が記入します。Gitの更新日やYouTube APIの自動取得は行いません。
将来APIや生成処理を足す場合も、このデータ構造を出力すれば表示側を再利用できます。
`siteUpdatedAt` はTOPの紹介文やデザインを更新した日に変更します。
JavaScript無効時は紹介文と準備中の案内が表示されます。

## 表示と確認

スマホは1列、640px以上で入口を2列、900px以上で紹介文と案内枠を横並びにします。
点滅や動画の自動再生、外部フォント、外部トラッキングは使いません。
ローカルの静的HTTPサーバーでルートを開き、320px前後の幅とPC幅で確認できます。

## GitHub Pages

確認時点では `main` ブランチの `/ (root)` から公開されています。
公開URL: https://unlimited-shroud-works.github.io/
変更を `main` にマージすると既存のPages処理で公開されます。
本変更はTOPの基本骨格までで、下層ページ・CMS・人気集計・YouTube埋め込みは含みません。
