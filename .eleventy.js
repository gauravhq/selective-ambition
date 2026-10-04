const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const republish = require("./lib/republish");

module.exports = function (eleventyConfig) {
  // Republishing schedule for this build (lib/republish.js), computed when the posts collection is built
  // and read by the `rp` filter in every template that shows a post's date.
  let RP = null;
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  // rewrites internal href/src to include the pathPrefix (project GitHub Pages site)
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  // Published posts are those whose date has ARRIVED. Future-dated posts stay hidden
  // until their day (the daily deploy cron re-publishes as dates arrive). Newest first, where
  // "newest" is the most recent publish OR republish, so this week's republished post leads.
  eleventyConfig.addCollection("posts", (api) => {
    const now = republish.now();
    RP = republish.load(__dirname, now);
    const when = (p) => (RP.byUrl(p.url) || { effective: p.date.getTime() }).effective;
    return api
      .getFilteredByGlob("src/posts/*.md")
      .filter((p) => p.date.getTime() <= now)
      .sort((a, b) => when(b) - when(a));
  });
  // Republish facts for one post URL (null for any non-post page). See lib/republish.js.
  eleventyConfig.addFilter("rp", (url) => (RP ? RP.byUrl(url) : null));
  eleventyConfig.addFilter("monthYear", (d) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", timeZone: "UTC" })
  );
  eleventyConfig.addFilter("isoDay", (d) => new Date(d).toISOString().slice(0, 10));
  // Feed readers resolve links against the feed, not the page, so root-relative hrefs inside a
  // Revisited addition must become absolute in RSS. siteUrl already carries the project path.
  eleventyConfig.addFilter("absolutize", (html, siteUrl) =>
    String(html || "").replace(/href="\//g, `href="${siteUrl}/`)
  );

  eleventyConfig.addFilter("readableDate", (d) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })
  );
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString());
  eleventyConfig.addFilter("rssDate", (d) => new Date(d).toUTCString());
  // BreadcrumbList JSON-LD for every inner page (GEO structure; checklist 25 item 14p). Built in JS to
  // avoid Nunjucks loop-scoping and to guarantee valid JSON via JSON.stringify. Returns "" for the home
  // page. URLs are absolute (site.url already carries the project path), so the base plugin leaves them.
  eleventyConfig.addFilter("breadcrumbLd", (url, pageTitle, siteUrl) => {
    if (!url || url === "/") return "";
    const segs = url.split("/").filter(Boolean);
    const items = [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl + "/" }];
    let acc = "";
    segs.forEach((seg, i) => {
      acc += "/" + seg;
      const last = i === segs.length - 1;
      const name = last && pageTitle
        ? pageTitle
        : seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      items.push({ "@type": "ListItem", position: i + 2, name, item: siteUrl + acc + "/" });
    });
    return '<script type="application/ld+json">' +
      JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items }) +
      "</script>";
  });
  // Recent posts excluding one URL, so the homepage "latest" list never repeats the featured card.
  eleventyConfig.addFilter("recentExcluding", (posts, url, n) =>
    (posts || []).filter((p) => p.url !== url).slice(0, n || 3)
  );
  eleventyConfig.addShortcode("year", () => String(new Date().getFullYear()));

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    pathPrefix: process.env.PATH_PREFIX || "/selective-ambition/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
