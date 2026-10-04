// Homepage "Post of the week": a weekly-rotating pick from the permanent post library.
// Every post stays live and indexable at /blog/<slug>/; this only chooses which ONE the homepage
// highlights this week. It advances by itself on the daily GitHub Actions rebuild, cycling through the
// whole library via week-number modulo N and repeating every N weeks (N = number of live posts), so the
// homepage stays weekly-fresh forever with no new content and no manual work. It rotates the HIGHLIGHT,
// not which pages exist. (BookHarness publishing model: all posts indexable, freshness via featured pick.)
//
// Added 2026-10-04: this site's 200-post weekly drip finished on 2026-08-09, and unlike the other two
// book sites it had no featured rotation, so nothing on it changed week to week after the drip ended.
const fs = require("fs");
const path = require("path");
const WEEK = 7 * 24 * 3600 * 1000;
const EPOCH = Date.parse("2022-10-16T00:00:00Z"); // week 0 = first post date, per BOOK_HARNESS.md

// Read one front-matter field, quoted or not. 85 of this site's 200 posts have an UNQUOTED title
// (`title: Have You Had a Tuesday`), and the double-quote-only regex copied from the sister sites fell
// back to showing the raw slug on the homepage for those weeks.
function field(raw, name) {
  const fm = raw.split(/\r?\n---/)[0];
  const m = fm.match(new RegExp("^" + name + ":[ \\t]*(.*)$", "m"));
  if (!m) return "";
  const v = m[1].trim();
  const q = v[0];
  return (q === '"' || q === "'") && v.endsWith(q) ? v.slice(1, -1) : v;
}

module.exports = function () {
  const dir = path.join(__dirname, "..", "posts");
  const now = process.env.ROTATION_NOW ? Number(process.env.ROTATION_NOW) : Date.now();
  // Rotate only through posts whose date has ARRIVED (the live library); a future-dated post the author
  // adds later joins the rotation on its day. Stable filename order keeps the weekly sequence deterministic.
  const files = fs.readdirSync(dir)
    .filter((f) => /^\d{4}-\d{2}-\d{2}-.*\.md$/.test(f))
    .filter((f) => Date.parse(f.slice(0, 10) + "T00:00:00Z") <= now)
    .sort();
  const N = files.length;
  if (N === 0) return null;
  const wk = Math.floor((now - EPOCH) / WEEK);
  const f = files[((wk % N) + N) % N];
  const slug = f.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(dir, f), "utf8");
  const title = field(raw, "title") || slug;
  const description = field(raw, "pageDescription");
  return { slug, title, description, url: `/blog/${slug}/`, week: wk, poolSize: N };
};
