/**
 * Static prerender: renders every public route to real HTML at build time so
 * title / description / canonical / OG / JSON-LD / H1 / body copy are present
 * in the initial HTML without JavaScript. Metadata and route-level JSON-LD come
 * from the shared SEO config (src/seo/config.ts), the same source the runtime
 * <Seo /> uses.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrEntry = pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href;

const { render, staticRoutes, blogRoutes, blogPosts, seoForRoute, jsonLdForRoute, SITE, OG_IMAGE, OG_IMAGE_ALT } =
  await import(ssrEntry);

const esc = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

function buildHtml({ route, title, description, appHtml, noindex = false, extraJsonLd = [], ogType = "website" }) {
  const canonical = `${SITE}${route === "/" ? "/" : route.endsWith("/") ? route : `${route}/`}`;
  let html = template;

  const replaceMeta = (attr, key, content) => {
    const re = new RegExp(`<meta ${attr}="${key}" content="[\\s\\S]*?" />`);
    html = html.replace(re, `<meta ${attr}="${key}" content="${esc(content)}" />`);
  };

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  replaceMeta("name", "description", description);
  replaceMeta("property", "og:title", title);
  replaceMeta("property", "og:description", description);
  replaceMeta("property", "og:url", canonical);
  replaceMeta("property", "og:type", ogType);
  replaceMeta("property", "og:image", OG_IMAGE);
  replaceMeta("property", "og:image:alt", OG_IMAGE_ALT);
  replaceMeta("name", "twitter:title", title);
  replaceMeta("name", "twitter:description", description);
  replaceMeta("name", "twitter:image", OG_IMAGE);

  if (noindex) {
    replaceMeta("name", "robots", "noindex, follow");
    html = html.replace(/\s*<link rel="canonical" href="[\s\S]*?" \/>/, "");
    html = html.replace(/\s*<meta property="og:url" content="[\s\S]*?" \/>/, "");
  } else {
    html = html.replace(/<link rel="canonical" href="[\s\S]*?" \/>/, `<link rel="canonical" href="${canonical}" />`);
  }

  const jsonLd = extraJsonLd
    .map((data) => `<script type="application/ld+json" data-seo="route">${JSON.stringify(data)}</script>`)
    .join("\n    ");
  if (jsonLd) html = html.replace("</head>", `  ${jsonLd}\n  </head>`);

  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  return html;
}

function write(route, html) {
  const target =
    route === "/" ? path.join(dist, "index.html") : path.join(dist, route.replace(/^\//, ""), "index.html");
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html);
  return path.relative(dist, target);
}

const results = [];
const sitemapEntries = [];

for (const route of staticRoutes) {
  const seo = seoForRoute(route);
  const appHtml = render(route);
  results.push(
    write(
      route,
      buildHtml({
        route,
        title: seo.title,
        description: seo.description,
        appHtml,
        extraJsonLd: jsonLdForRoute(route),
      }),
    ),
  );
  sitemapEntries.push({ route, changefreq: route === "/" ? "weekly" : "monthly", priority: route === "/" ? "1.0" : "0.8" });
}

for (const route of blogRoutes) {
  const id = route.replace(/^\/blog\//, "").replace(/\/$/, "");
  const post = blogPosts.find((p) => p.id === id);
  const seo = seoForRoute(route);
  const appHtml = render(route);
  results.push(
    write(
      route,
      buildHtml({
        route,
        title: seo.title,
        description: seo.description,
        appHtml,
        ogType: "article",
        extraJsonLd: jsonLdForRoute(route),
      }),
    ),
  );
  sitemapEntries.push({ route, lastmod: post.date, changefreq: "monthly", priority: "0.6" });
}

// Real 404 document for unknown URLs (host serves it with HTTP 404).
const notFoundHtml = buildHtml({
  route: "/404",
  title: "Səhifə tapılmadı (404) | Metric Analytics",
  description: "Axtardığınız səhifə mövcud deyil. Ana səhifəyə qayıdın və ya xidmətlərimizlə tanış olun.",
  appHtml: render("/__not_found__"),
  noindex: true,
});
fs.writeFileSync(path.join(dist, "404.html"), notFoundHtml);
results.push("404.html");

// Sitemap: only canonical, prerendered (HTTP 200) URLs.
const urls = sitemapEntries
  .map(
    (e) =>
      `  <url>\n    <loc>${SITE}${e.route === "/" ? "/" : e.route}</loc>${e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : ""}\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
  )
  .join("\n");
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemapXml);
fs.writeFileSync(path.join(root, "public", "sitemap.xml"), sitemapXml);
results.push("sitemap.xml");

console.log(`Prerendered ${results.length} files:\n- ${results.join("\n- ")}`);
