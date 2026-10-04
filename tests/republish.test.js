// Tests for lib/republish.js. Run: node tests/republish.test.js   (exit 1 on any failure)
"use strict";
const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { WEEK, schedule, loadRevisits, toHtml, load } = require("../lib/republish");

let pass = 0, fail = 0;
function check(name, fn) {
  try { fn(); pass++; } catch (e) { fail++; console.log(`  FAIL  ${name}\n        ${e.message}`); }
}

const day = (d) => Date.parse(d + "T00:00:00Z");
const N = 5;
const posts = Array.from({ length: N }, (_, i) => ({ slug: `p${i}`, file: `x-p${i}.md`, date: day("2026-01-04") + i * WEEK }));
const START = day("2026-03-01");                        // after the last post (2026-02-01)
const at = (slot, hours = 12) => START + slot * WEEK + hours * 3600 * 1000;
const none = new Map();

check("before start: nothing republished, every post keeps its own date", () => {
  const r = schedule(posts, START, START - 1, none);
  assert.strictEqual(r.active, false);
  assert.strictEqual(r.current, null);
  for (const p of posts) {
    const i = r.info.get(p.slug);
    assert.deepStrictEqual([i.cycle, i.label, i.effective, i.lastModified], [0, "original", p.date, p.date]);
  }
});

check("two full cycles: slot s republishes post s % N, in order, then restarts at post 1", () => {
  for (let s = 0; s < 2 * N; s++) {
    const r = schedule(posts, START, at(s), none);
    assert.strictEqual(r.current.slug, `p${s % N}`, `slot ${s}`);
    assert.strictEqual(r.current.cycle, Math.floor(s / N) + 1, `slot ${s} cycle`);
    assert.strictEqual(r.current.effective, START + s * WEEK, `slot ${s} date`);
    const newest = Math.max(...[...r.info.values()].map((i) => i.effective));
    assert.strictEqual(r.current.effective, newest, `slot ${s}: the republished post must be the newest`);
  }
});

check("the republish happens on its day, not before", () => {
  assert.strictEqual(schedule(posts, START, START - 1, none).active, false);
  assert.strictEqual(schedule(posts, START, START, none).current.slug, "p0");
  assert.strictEqual(schedule(posts, START, at(1, 0) - 1, none).current.slug, "p0");
  assert.strictEqual(schedule(posts, START, at(1, 0), none).current.slug, "p1");
});

check("no effective date is ever in the future", () => {
  for (let s = 0; s < 3 * N; s++) {
    const nowMs = at(s, 5);
    for (const i of schedule(posts, START, nowMs, none).info.values()) assert.ok(i.effective <= nowMs);
  }
});

check("without a Revisited addition: label 'archive' and the dates search engines see do NOT move", () => {
  const i = schedule(posts, START, at(0), none).info.get("p0");
  assert.strictEqual(i.label, "archive");
  assert.strictEqual(i.lastModified, posts[0].date);
});

check("with a reviewed addition: label 'updated' and lastModified = the republish date", () => {
  const rv = new Map([["p0#1", { html: "<p>x</p>" }]]);
  const i = schedule(posts, START, at(0), rv).info.get("p0");
  assert.strictEqual(i.label, "updated");
  assert.strictEqual(i.lastModified, START);
  assert.strictEqual(i.revisits.length, 1);
});

check("next cycle without a new addition: 'archive', but the earlier addition stays and so does its date", () => {
  const rv = new Map([["p0#1", { html: "<p>x</p>" }]]);
  const i = schedule(posts, START, at(N), rv).info.get("p0");           // slot N = p0, cycle 2
  assert.strictEqual(i.cycle, 2);
  assert.strictEqual(i.label, "archive");
  assert.strictEqual(i.lastModified, START);
  assert.strictEqual(i.revisits.length, 1);
});

check("an addition for a later round is not shown early", () => {
  const rv = new Map([["p1#1", { html: "<p>y</p>" }], ["p0#2", { html: "<p>z</p>" }]]);
  const r = schedule(posts, START, at(0), rv);
  assert.strictEqual(r.info.get("p1").revisits.length, 0);
  assert.strictEqual(r.info.get("p0").revisits.length, 0);
});

check("start on or before the last post is rejected with an actionable error", () => {
  assert.throws(() => schedule(posts, posts[N - 1].date, START, none), /must be after the last post/);
});

check("no start configured: republishing begins one week after the last post", () => {
  assert.strictEqual(schedule(posts, null, START, none).start, posts[N - 1].date + WEEK);
});

check("only REVIEWED additions load", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "revisits-"));
  fs.writeFileSync(path.join(dir, "a.c1.md"), "---\nreviewed: true\n---\nYes.\n");
  fs.writeFileSync(path.join(dir, "b.c1.md"), "---\nreviewed: false\n---\nNo.\n");
  fs.writeFileSync(path.join(dir, "c.c1.md"), "No front matter at all.\n");
  const m = loadRevisits(dir);
  assert.deepStrictEqual([...m.keys()], ["a#1"]);
});

check("markdown subset: paragraphs, links, emphasis, and HTML is escaped", () => {
  assert.strictEqual(toHtml("One *two*\nthree.\n\nSee [the post](/blog/x/) & <b>"),
    '<p>One <em>two</em> three.</p><p>See <a href="/blog/x/">the post</a> &amp; &lt;b&gt;</p>');
});

check("this site: config is valid and every reviewed addition targets a real post", () => {
  const site = path.join(__dirname, "..");
  const r = load(site, Date.now());
  for (const key of loadRevisits(path.join(site, "revisits")).keys()) {
    assert.ok(r.info.has(key.split("#")[0]), `revisit ${key} has no matching post`);
  }
});

console.log(`republish tests: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
