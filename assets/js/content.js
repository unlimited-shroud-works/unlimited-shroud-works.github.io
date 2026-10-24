// リンクが決まったら url の null を実際のURLに変更します。
// 動画本体はYouTubeへ。ページや外部サービスは同じ入口から案内できます。
window.USW_CONTENT = {
  siteUpdatedAt: "2026-10-24",
  newDays: 14,
  categories: [
    { id: "videos", code: "01 / VIDEO", title: "動画", description: "映像で残す、つくる、伝える。", destination: "YouTube", url: null },
    { id: "articles", code: "02 / ARTICLE", title: "記事", description: "考えたことを、ひとつの文章に。", destination: "Articles", url: null },
    { id: "blog", code: "03 / JOURNAL", title: "ブログ", description: "日々のことや、制作の途中のメモ。", destination: "Journal", url: null },
    { id: "photos", code: "04 / PHOTO", title: "写真", description: "目に留まった風景を、少しずつ。", destination: "Photos", url: null }
  ],
  // 実際に公開したコンテンツだけ追加してください。最新6件をTOPに表示します。
  // { category: "videos", title: "実際の動画名", url: "https://www.youtube.com/watch?v=...",
  //   publishedAt: "2026-10-24", updatedAt: "2026-10-24", hot: false }
  entries: [],
  notices: [
    { title: "TOPページの基本構成を整えました。各コンテンツの入口は準備中です。", publishedAt: "2026-10-24", hot: false }
  ]
};
