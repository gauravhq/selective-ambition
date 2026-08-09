#!/usr/bin/env python3
"""Static blog generator for the Selective Ambition site.

Reads posts/*.md (simple front matter + body) and emits:
  - blog/<slug>/index.html  (one per post, in the book's styling)
  - blog/index.html         (the journal list)
  - sitemap.xml             (home + blog + every post)

Every post automatically carries: the author's name (byline + attribution),
the book title in text, and links to BOTH the Kindle and paperback editions
(from CONFIG). Pure stdlib. Run:  python build_blog.py
"""
import os, re, html, glob, datetime

HERE = os.path.dirname(os.path.abspath(__file__))
POSTS_DIR = os.path.join(HERE, "posts")
BLOG_DIR = os.path.join(HERE, "blog")

CONFIG = {
    "author": "Gaurav Srivastava",
    "book": "Selective Ambition: The Joy of Missing Out on Purpose",
    "book_short": "Selective Ambition",
    "base": "https://gauravhq.github.io/selective-ambition",
    "asin": "B0HDKFJTF3",
    "kindle_url": "https://www.amazon.com/dp/B0HDKFJTF3",
    # Set to the paperback Amazon URL when available; empty -> "coming soon" button.
    "paperback_url": "",
    "show_draft_badge": True,   # flip to False once posts are approved
}

# ---------------- tiny markdown ----------------
def esc(t): return html.escape(t, quote=False)

def md_inline(t):
    t = esc(t)
    t = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", t)
    t = re.sub(r"\*(.+?)\*", r"<em>\1</em>", t)
    return t

def md_body(text):
    out = []
    for para in re.split(r"\n\s*\n", text.strip()):
        para = " ".join(l.strip() for l in para.splitlines() if l.strip())
        if para:
            out.append("<p>" + md_inline(para) + "</p>")
    return "\n      ".join(out)

def parse_post(path):
    raw = open(path, encoding="utf-8").read()
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n(.*)$", raw, re.S)
    if not m:
        raise ValueError("missing front matter: " + path)
    fm = {}
    for line in m.group(1).splitlines():
        if ":" in line:
            k, v = line.split(":", 1)
            fm[k.strip()] = v.strip()
    body = m.group(2).strip()
    fm["body"] = body
    fm["words"] = len(re.sub(r"[*_#>-]", "", body).split())
    fm.setdefault("date", "2026-08-09")
    fm.setdefault("tag", "From the book")
    fm.setdefault("dek", "")
    return fm

# ---------------- shared chrome ----------------
def head(title, desc, canonical, depth, jsonld):
    a = "../" * depth
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<link rel="canonical" href="{canonical}">
<meta name="author" content="{CONFIG['author']}">
<meta name="theme-color" content="#f3e8d6">
<meta property="og:type" content="article">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:image" content="{CONFIG['base']}/assets/cover.jpg">
<meta property="og:url" content="{canonical}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="{a}assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Playfair+Display:ital,wght@0,500;0,600;0,800;1,500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{a}assets/style.css">
<link rel="stylesheet" href="{a}assets/blog.css">
{jsonld}
</head>
<body>
<div class="grain" aria-hidden="true"></div>
<header class="site-head">
  <a class="wordmark" href="{a}">Selective&nbsp;Ambition</a>
  <nav class="site-nav">
    <a href="{a}blog/">Journal</a>
    <a class="nav-cta" href="{CONFIG['kindle_url']}" target="_blank" rel="noopener">Get the book</a>
  </nav>
</header>
'''

FOOT = f'''<footer class="site-foot">
  <p class="foot-title">Selective Ambition</p>
  <p class="foot-sub"><em>The Joy of Missing Out on Purpose</em> &middot; {CONFIG['author']}</p>
  <p class="foot-links"><a href="{CONFIG['kindle_url']}" target="_blank" rel="noopener">Amazon</a></p>
  <p class="foot-fine">&copy; 2026 {CONFIG['author']}. All rights reserved.</p>
</footer>
</body>
</html>
'''

def cta_block():
    if CONFIG["paperback_url"]:
        pb = f'<a class="btn btn-ghost" href="{CONFIG["paperback_url"]}" target="_blank" rel="noopener">Get the paperback</a>'
    else:
        pb = '<span class="btn btn-ghost is-disabled" aria-disabled="true">Paperback &mdash; coming soon</span>'
    return f'''<aside class="post-cta">
      <p>This is one idea from <em>{CONFIG['book']}</em> by {CONFIG['author']} &mdash; the case for caring deeply about fewer things, and letting the rest go on purpose.</p>
      <div class="cta-buttons">
        <a class="btn" href="{CONFIG['kindle_url']}" target="_blank" rel="noopener">Read on Kindle</a>
        {pb}
      </div>
    </aside>'''

def post_jsonld(p, canonical):
    return f'''<script type="application/ld+json">
{{"@context":"https://schema.org","@type":"BlogPosting",
"headline":{q(p['title'])},"datePublished":"{p['date']}","inLanguage":"en",
"author":{{"@type":"Person","name":"{CONFIG['author']}"}},
"publisher":{{"@type":"Person","name":"{CONFIG['author']}"}},
"mainEntityOfPage":"{canonical}","url":"{canonical}",
"image":"{CONFIG['base']}/assets/cover.jpg",
"isPartOf":{{"@type":"Book","name":{q(CONFIG['book'])},"author":{{"@type":"Person","name":"{CONFIG['author']}"}},"identifier":{{"@type":"PropertyValue","propertyID":"ASIN","value":"{CONFIG['asin']}"}},"url":"{CONFIG['kindle_url']}"}},
"about":{q(CONFIG['book_short'])}}}
</script>'''

def q(s):  # json string
    return '"' + s.replace('\\', '\\\\').replace('"', '\\"') + '"'

# ---------------- render ----------------
def render_post(p):
    slug = p["slug"]
    canonical = f"{CONFIG['base']}/blog/{slug}/"
    badge = '<span class="draft-badge">Draft</span>' if CONFIG["show_draft_badge"] else ""
    art = f'''<main>
  <article class="article">
    <p class="crumb"><a href="../">&larr; The Journal</a></p>
    <p class="eyebrow">{esc(p['tag'])} {badge}</p>
    <h1>{esc(p['title'])}</h1>
    <p class="byline">By {CONFIG['author']}</p>
    {'<p class="dek">'+md_inline(p['dek'])+'</p>' if p.get('dek') else ''}
    <div class="post-body">
      {md_body(p['body'])}
    </div>
    {cta_block()}
  </article>
</main>
'''
    doc = head(f"{p['title']} — Selective Ambition", p.get('dek') or p['title'],
               canonical, 2, post_jsonld(p, canonical)) + art + FOOT
    outdir = os.path.join(BLOG_DIR, slug)
    os.makedirs(outdir, exist_ok=True)
    open(os.path.join(outdir, "index.html"), "w", encoding="utf-8").write(doc)

def render_index(posts):
    canonical = f"{CONFIG['base']}/blog/"
    cards = []
    for p in posts:
        cards.append(f'''<a class="post-card" href="{p['slug']}/">
        <span class="card-tag">{esc(p['tag'])}</span>
        <h2>{esc(p['title'])}</h2>
        <p>{esc(p.get('dek') or '')}</p>
        <span class="card-more">Read &rarr;</span>
      </a>''')
    jsonld = f'''<script type="application/ld+json">
{{"@context":"https://schema.org","@type":"Blog","name":"The Selective Ambition Journal","url":"{canonical}","inLanguage":"en","author":{{"@type":"Person","name":"{CONFIG['author']}"}},"about":{q(CONFIG['book_short'])}}}
</script>'''
    body = f'''<main>
  <section class="journal-head">
    <p class="eyebrow">The Journal</p>
    <h1>Ideas from <em>Selective Ambition</em></h1>
    <p class="dek">Short reflections carved from <em>{CONFIG['book']}</em> by {CONFIG['author']} &mdash; one idea at a time. Each links back to the book on Kindle and in paperback.</p>
  </section>
  <section class="post-list">
    {"".join(cards)}
  </section>
</main>
'''
    doc = head("The Journal — Selective Ambition",
               f"Short ideas carved from Selective Ambition by {CONFIG['author']}.",
               canonical, 1, jsonld) + body + FOOT
    os.makedirs(BLOG_DIR, exist_ok=True)
    open(os.path.join(BLOG_DIR, "index.html"), "w", encoding="utf-8").write(doc)

def render_sitemap(posts):
    urls = [(f"{CONFIG['base']}/", "1.0"), (f"{CONFIG['base']}/blog/", "0.7")]
    urls += [(f"{CONFIG['base']}/blog/{p['slug']}/", "0.6") for p in posts]
    body = ['<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for loc, pr in urls:
        body.append(f"  <url><loc>{loc}</loc><lastmod>2026-08-09</lastmod><priority>{pr}</priority></url>")
    body.append("</urlset>\n")
    open(os.path.join(HERE, "sitemap.xml"), "w", encoding="utf-8").write("\n".join(body))

def main():
    files = sorted(glob.glob(os.path.join(POSTS_DIR, "*.md")))
    posts = [parse_post(f) for f in files]
    posts.sort(key=lambda p: (p.get("date", ""), p["slug"]), reverse=True)
    warn = [p["slug"] for p in posts if not (140 <= p["words"] <= 210)]
    for p in posts:
        render_post(p)
    render_index(posts)
    render_sitemap(posts)
    print(f"built {len(posts)} post(s) | paperback_url={'SET' if CONFIG['paperback_url'] else 'PENDING'} | draft_badge={CONFIG['show_draft_badge']}")
    if warn:
        print("  word-count out of 150-200 range:", ", ".join(f"{s}" for s in warn))

if __name__ == "__main__":
    main()
