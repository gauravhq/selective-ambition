# Syndicating the blog to Substack and Medium

The canonical home for every post is this site. Whenever you cross-post, set the
syndicated copy's CANONICAL URL back to the original here, so search engines and LLM
crawlers credit this site and you do not split your ranking.

RSS feed (all published posts, full text): https://gauravhq.github.io/selective-ambition/feed.xml

## Substack (bulk import, then schedule)
1. Log in to your Substack account.
2. Go to Dashboard -> Settings -> Imports (Substack also offers "Import" during onboarding).
3. Choose import from an RSS feed and paste:
   https://gauravhq.github.io/selective-ambition/feed.xml
   Substack pulls the posts in as DRAFTS.
4. For each imported draft, open its settings and set the Canonical URL to the original:
   https://gauravhq.github.io/selective-ambition/blog/<slug>/
5. Publish now, or use Substack's built-in scheduler to release them (for example one per week).

Note: Substack's RSS import is a one-time pull. For ongoing auto-sync of new posts, either
re-import periodically, or set up a Zapier / Make automation ("new RSS item -> create Substack
draft") under your own login.

## Medium (per-post, auto-canonical)
1. Log in to Medium.
2. Top-right menu -> "Import a story", and paste a post URL:
   https://gauravhq.github.io/selective-ambition/blog/<slug>/
3. Medium imports it and automatically sets the canonical tag back to your original URL.
4. Publish. Medium has no bulk RSS import, so do this for your strongest posts.

## Why the canonical link matters
Duplicate content across sites can split or dilute search ranking. The canonical URL tells
Google, Bing, and LLM crawlers which copy is authoritative - always your own site. Both
Substack and Medium let you set it (Medium sets it for you on import).
