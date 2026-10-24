(() => {
  "use strict";
  const data = window.USW_CONTENT;
  if (!data) return;
  const DAY = 86400000;
  // 日本時間の午前0時を基準とし、表示端末の時差に依存しない。
  function dateValue(value) {
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return NaN;
    const date = Date.parse(`${value}T00:00:00+09:00`);
    return Number.isFinite(date) && new Date(date + 9 * 3600000).toISOString().slice(0, 10) === value ? date : NaN;
  }
  const today = dateValue(new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Tokyo" }));
  function safeURL(value) {
    if (typeof value !== "string" || !value.trim()) return null;
    try {
      const url = new URL(value, document.baseURI);
      return ["https:", "http:"].includes(url.protocol) ? url.href : null;
    } catch { return null; }
  }
  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function badges(item) {
    const box = element("span", "badges");
    const age = today - dateValue(item.publishedAt);
    if (age >= 0 && age < data.newDays * DAY) box.append(element("span", "badge", "NEW"));
    if (item.hot === true) box.append(element("span", "badge badge-hot", "HOT"));
    return box;
  }
  function time(value) {
    const node = element("time", "", value.replaceAll("-", "."));
    node.dateTime = value;
    return node;
  }
  // 未来の日付は公開予定として扱い、公開日まで表示しない。
  const visible = item => Number.isFinite(dateValue(item.publishedAt)) && dateValue(item.publishedAt) <= today;
  const entries = data.entries.filter(item => visible(item) && safeURL(item.url));
  const notices = data.notices.filter(visible);
  const latestFirst = (a, b) => dateValue(b.publishedAt) - dateValue(a.publishedAt);
  const categoryList = document.querySelector("#category-list");
  for (const category of data.categories) {
    const card = element("article", "category-card");
    const top = element("div", "category-top");
    top.append(element("span", "category-code", category.code));
    const recent = entries.filter(item => item.category === category.id).sort(latestFirst)[0];
    if (recent) top.append(badges(recent));
    const bottom = element("div", "category-bottom");
    bottom.append(element("span", "category-destination", category.destination));
    const url = safeURL(category.url);
    if (url) {
      const link = element("a", "text-link", `${category.title}へ →`);
      link.href = url;
      bottom.append(link);
    } else { bottom.append(element("span", "pending", "準備中")); }
    card.append(top, element("h3", "", category.title), element("p", "", category.description), bottom);
    categoryList.append(card);
  }
  const updates = [...entries, ...notices].sort(latestFirst);
  const list = document.querySelector("#update-list");
  for (const item of updates.slice(0, 6)) {
    const row = element("li", "update-item");
    const meta = element("div", "update-meta");
    meta.append(time(item.publishedAt), badges(item));
    const body = element("p");
    const url = safeURL(item.url);
    if (url) {
      const link = element("a", "", item.title);
      link.href = url;
      body.append(link);
    } else { body.textContent = item.title; }
    row.append(meta, body);
    list.append(row);
  }
  document.querySelector("#updates-empty").hidden = updates.length > 0;
  const dates = [data.siteUpdatedAt, ...updates.flatMap(item => [item.publishedAt, item.updatedAt])]
    .filter(value => Number.isFinite(dateValue(value)) && dateValue(value) <= today)
    .sort((a, b) => dateValue(b) - dateValue(a));
  const lastUpdated = document.querySelector("#last-updated");
  if (dates.length) lastUpdated.replaceWith(Object.assign(time(dates[0]), { id: "last-updated" }));
})();
