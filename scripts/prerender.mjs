/**
 * Static prerender: renders every public route (AZ/EN/RU) to real HTML at build
 * time so title / description / canonical / hreflang / OG / JSON-LD / H1 / body
 * copy are present in the initial HTML without JavaScript. Metadata and
 * route-level JSON-LD come from the shared SEO config (src/seo/config.ts), the
 * same source the runtime <Seo /> uses.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrEntry = pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href;

const { render, allRoutes, blogPosts, seoForRoute, jsonLdForRoute, SITE, OG_IMAGE, OG_IMAGE_ALT, LANGS } =
  await import(ssrEntry);

const esc = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

function buildHtml({
  route,
  title,
  description,
  appHtml,
  htmlLang = "az",
  ogLocale = "az_AZ",
  alternates = null,
  noindex = false,
  extraJsonLd = [],
  ogType = "website",
}) {
  const canonical = `${SITE}${route === "/" ? "/" : route.endsWith("/") ? route : `${route}/`}`;
  let html = template;

  const replaceMeta = (attr, key, content) => {
    const re = new RegExp(`<meta ${attr}="${key}" content="[\\s\\S]*?" />`);
    html = html.replace(re, `<meta ${attr}="${key}" content="${esc(content)}" />`);
  };

  html = html.replace('<html lang="az">', `<html lang="${htmlLang}">`);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  replaceMeta("name", "description", description);
  replaceMeta("property", "og:title", title);
  replaceMeta("property", "og:description", description);
  replaceMeta("property", "og:url", canonical);
  replaceMeta("property", "og:type", ogType);
  replaceMeta("property", "og:locale", ogLocale);
  replaceMeta("property", "og:image", OG_IMAGE);
  replaceMeta("property", "og:image:secure_url", OG_IMAGE);
  replaceMeta("property", "og:image:type", "image/jpeg");
  replaceMeta("property", "og:image:width", "1200");
  replaceMeta("property", "og:image:height", "630");
  replaceMeta("property", "og:image:alt", OG_IMAGE_ALT);
  replaceMeta("name", "twitter:title", title);
  replaceMeta("name", "twitter:description", description);
  replaceMeta("name", "twitter:image", OG_IMAGE);
  html = html.replace('"inLanguage": "az"', `"inLanguage": "${htmlLang}"`);

  if (noindex) {
    replaceMeta("name", "robots", "noindex, follow");
    html = html.replace(/\s*<link rel="canonical" href="[\s\S]*?" \/>/, "");
    html = html.replace(/\s*<meta property="og:url" content="[\s\S]*?" \/>/, "");
  } else {
    html = html.replace(/<link rel="canonical" href="[\s\S]*?" \/>/, `<link rel="canonical" href="${canonical}" />`);
  }

  const head = [];
  if (alternates) {
    for (const lang of LANGS) {
      head.push(`<link rel="alternate" hreflang="${lang}" href="${SITE}${alternates[lang]}" />`);
    }
    head.push(`<link rel="alternate" hreflang="x-default" href="${SITE}${alternates.az}" />`);
  }
  for (const data of extraJsonLd) {
    head.push(`<script type="application/ld+json" data-seo="route">${JSON.stringify(data)}</script>`);
  }
  if (head.length) html = html.replace("</head>", `  ${head.join("\n    ")}\n  </head>`);

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

for (const route of allRoutes) {
  const seo = seoForRoute(route);
  if (!seo) throw new Error(`Missing SEO metadata for ${route}`);
  const appHtml = render(route);
  results.push(
    write(
      route,
      buildHtml({
        route,
        title: seo.title,
        description: seo.description,
        appHtml,
        htmlLang: seo.htmlLang,
        ogLocale: seo.ogLocale,
        alternates: seo.alternates,
        ogType: seo.ogType,
        extraJsonLd: jsonLdForRoute(route),
      }),
    ),
  );

  const isBlogPost = /\/blog\/[^/]+\/$/.test(route);
  const post = isBlogPost ? blogPosts.find((p) => route.endsWith(`/blog/${p.id}/`)) : null;
  const isHome = /^\/(en\/|ru\/)?$/.test(route);
  sitemapEntries.push({
    route,
    lastmod: post ? post.date : undefined,
    changefreq: isHome ? "weekly" : isBlogPost ? "monthly" : "monthly",
    priority: isHome ? "1.0" : isBlogPost ? "0.6" : "0.8",
  });
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

// Sitemap: only canonical, fully translated, prerendered (HTTP 200) URLs.
const urls = sitemapEntries
  .map(
    (e) =>
      `  <url>\n    <loc>${SITE}${e.route}</loc>${e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : ""}\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
  )
  .join("\n");
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemapXml);
fs.writeFileSync(path.join(root, "public", "sitemap.xml"), sitemapXml);
results.push("sitemap.xml");

console.log(`Prerendered ${results.length} files:\n- ${results.join("\n- ")}`);
