// Weekly republishing, after the original post drip has finished. BookHarness STAGE 9.
//
// Agreed publishing model: one post a week. Once every post has gone out, republish post 1, then 2, ...
// through N, then start again at 1, forever. The existing daily deploy cron advances it; nothing here
// needs manual work.
//
// HONEST DATES. A republished post keeps its one permanent URL and its original text; nothing is copied
// and no post file is re-dated. Search engines treat an unchanged page with a fresh date as noise, and
// sites that bump dates without changing content train Google to ignore their dates. So:
//   - every republish moves the post to the top of the blog list, the homepage and the RSS feed, and
//     gives it a new RSS item, which is what readers and feed subscribers see;
//   - the post's "last modified" date (sitemap <lastmod>, JSON-LD dateModified) moves ONLY when a
//     REVIEWED "Revisited" addition goes live with it. Without one, the post is labelled "From the
//     archive" and keeps its original dates.
//
// Revisited additions live in <site>/revisits/<slug>.c<cycle>.md, outside src/ so Eleventy never renders
// them as pages. Front matter must contain `reviewed: true` or the file is ignored: an addition goes live
// only after the author has approved it. Cycle 1 is the first republish, cycle 2 the second, and so on.
//
// Pure scheduling lives in schedule(); load() reads the site's files. SITE_NOW (epoch ms) pins the clock
// for tests and preview builds; production uses the real time.
"use strict";
const fs = require("fs");
const path = require("path");

const WEEK = 7 * 24 * 3600 * 1000;
const POST_FILE = /^(\d{4}-\d{2}-\d{2})-(.+)\.md$/;
const REVISIT_FILE = /^(.+)\.c(\d+)\.md$/;

function now() {
  const pinned = process.env.SITE_NOW || process.env.ROTATION_NOW;
  return pinned ? Number(pinned) : Date.now();
}

const utcDay = (day) => Date.parse(day + "T00:00:00Z");

// posts: [{slug, file, date}] ascending by date. revisits: Map "<slug>#<cycle>" -> {html, file}.
// start: epoch ms of the first republish slot, or null for "one week after the last post".
function schedule(posts, start, nowMs, revisits) {
  const n = posts.length;
  if (!n) return { start: null, active: false, slot: -1, current: null, info: new Map() };
  const last = posts[n - 1].date;
  const first = start == null ? last + WEEK : start;
  if (first <= last) {
    throw new Error(`republish.start (${new Date(first).toISOString().slice(0, 10)}) must be after the ` +
      `last post's date (${new Date(last).toISOString().slice(0, 10)}): republishing starts once every ` +
      `post has gone out. Fix site.js republish.start.`);
  }
  const active = nowMs >= first;
  const slot = active ? Math.floor((nowMs - first) / WEEK) : -1;    // latest slot that has arrived
  const info = new Map();
  posts.forEach((p, i) => {
    // latest slot s <= slot with s % n === i, i.e. this post's most recent republish
    const s = slot >= i ? slot - ((slot - i) % n) : null;
    const cycle = s == null ? 0 : Math.floor(s / n) + 1;
    const live = [];
    for (let c = 1; c <= cycle; c++) {
      const r = revisits.get(`${p.slug}#${c}`);
      if (r) live.push({ cycle: c, date: first + ((c - 1) * n + i) * WEEK, html: r.html });
    }
    const updatedThisCycle = cycle > 0 && live.length > 0 && live[live.length - 1].cycle === cycle;
    info.set(p.slug, {
      slug: p.slug,
      file: p.file,
      published: p.date,
      effective: s == null ? p.date : first + s * WEEK,
      cycle,
      label: cycle === 0 ? "original" : updatedThisCycle ? "updated" : "archive",
      lastModified: live.length ? live[live.length - 1].date : p.date,
      revisits: live,
    });
  });
  const current = active ? posts[slot % n] : null;
  return { start: first, active, slot, current: current && info.get(current.slug), info };
}

function splitFrontMatter(raw) {
  const text = raw.replace(/^﻿/, "");
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  return m ? { fm: m[1], body: m[2] } : { fm: "", body: text };
}

// Deliberately tiny markdown: paragraphs, [links](/url/) and *emphasis*. A Revisited addition is short
// prose; a full markdown engine here would be an undeclared dependency for no gain.
function toHtml(md) {
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return md.trim().split(/\r?\n\s*\r?\n/).map((para) => {
    let h = esc(para.replace(/\s*\r?\n\s*/g, " "));
    h = h.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
    h = h.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    return `<p>${h}</p>`;
  }).join("");
}

function loadRevisits(dir) {
  const map = new Map();
  if (!dir || !fs.existsSync(dir)) return map;
  for (const f of fs.readdirSync(dir)) {
    const m = f.match(REVISIT_FILE);
    if (!m) continue;
    const { fm, body } = splitFrontMatter(fs.readFileSync(path.join(dir, f), "utf8"));
    if (!/^reviewed:\s*true\s*$/m.test(fm)) continue;          // only approved additions go live
    map.set(`${m[1]}#${Number(m[2])}`, { html: toHtml(body), file: f });
  }
  return map;
}

function load(siteRoot, nowMs = now()) {
  const site = require(path.join(siteRoot, "src", "_data", "site.js"));
  const cfg = site.republish || {};
  const posts = fs.readdirSync(path.join(siteRoot, "src", "posts"))
    .map((f) => f.match(POST_FILE)).filter(Boolean)
    .map((m) => ({ slug: m[2], file: m[0], date: utcDay(m[1]) }))
    .sort((a, b) => a.date - b.date);
  const revisitsDir = process.env.REVISITS_DIR || path.join(siteRoot, "revisits");
  const result = schedule(posts, cfg.start ? utcDay(cfg.start) : null, nowMs, loadRevisits(revisitsDir));
  result.byUrl = (url) => {
    const m = typeof url === "string" && url.match(/^\/blog\/([^/]+)\/$/);
    return (m && result.info.get(m[1])) || null;
  };
  return result;
}

module.exports = { WEEK, now, schedule, load, loadRevisits, toHtml, splitFrontMatter };
