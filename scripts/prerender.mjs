/**
 * Static prerender: renders every public route to real HTML at build time so
 * title / description / canonical / OG / JSON-LD / H1 / body copy are present
 * in the initial HTML without JavaScript. Metadata comes from the shared SEO
 * config (src/seo/config.ts), the same source the runtime <Seo /> uses.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrEntry = pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href;

const { render, staticRoutes, blogRoutes, blogPosts, seoForRoute, SITE, OG_IMAGE, OG_IMAGE_ALT } =
  await import(ssrEntry);

const esc = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const breadcrumb = (route, name) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ana səhifə", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name, item: `${SITE}${route}` },
  ],
});

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

function buildHtml({ route, title, description, appHtml, noindex = false, extraJsonLd = [], ogType = "website" }) {
  const canonical = `${SITE}${route === "/" ? "/" : route.endsWith("/") ? route : `${route}/`}`;
  let html = template;

  const replaceMeta = (attr, key, content) => {
    const re = new RegExp(`<meta ${attr}="${key}" content="[\\s\\S]*?" />`);
    html = html.replace(re, `<meta ${attr}="${key}" content="${esc(content)}" />`);
  };

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  html = html.replace(
    /<link rel="canonical" href="[\s\S]*?" \/>/,
    `<link rel="canonical" href="${canonical}" />`,
  );
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

  if (noindex) replaceMeta("name", "robots", "noindex, follow");

  const jsonLd = extraJsonLd
    .map((data) => `<script type="application/ld+json">${JSON.stringify(data)}</script>`)
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

const service = (name, description, route, alternateName) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  serviceType: name,
  ...(alternateName ? { alternateName } : {}),
  areaServed: { "@type": "Country", name: "Azerbaijan" },
  provider: { "@id": `${SITE}/#organization` },
  url: `${SITE}${route}`,
});

const serviceSchema = {
  "/data-analitikasi/": service(
    "Data analitikası və biznes analitikası",
    "Data analitikası, biznes analitikası, Power BI hesabatlıq, AI analitikası və fraud aşkarlama xidmətləri.",
    "/data-analitikasi/",
    ["biznes analitikası", "Power BI hesabatlıq", "AI analitikası", "fraud aşkarlama"],
  ),
  "/hesabat-sistemi/": service(
    "Power BI hesabatlıq və reporting avtomatlaşdırılması",
    "Power BI hesabatlıq sistemi, reporting avtomatlaşdırılması və ERP məlumat analitikası ilə data mənbələrinin inteqrasiyası.",
    "/hesabat-sistemi/",
    ["reporting avtomatlaşdırılması", "ERP məlumat analitikası", "hesabatların yaradılması"],
  ),
  "/services/": service(
    "Metric BI, Alert, AI və Fraud həlləri",
    "Biznes analitikası, Power BI hesabatlıq, AI analitikası və fraud aşkarlama həlləri.",
    "/services/",
    ["data analitikası", "biznes analitikası", "Power BI hesabatlıq", "AI analitikası", "fraud aşkarlama"],
  ),
};

const results = [];
const sitemapEntries = [];

for (const route of staticRoutes) {
  const seo = seoForRoute(route);
  const appHtml = render(route);
  const extra = route === "/" ? [] : [breadcrumb(route, seo.title.split(" - ")[0].split(" | ")[0])];
  if (serviceSchema[route]) extra.push(serviceSchema[route]);
  results.push(
    write(route, buildHtml({ route, title: seo.title, description: seo.description, appHtml, extraJsonLd: extra })),
  );
  sitemapEntries.push({ route, changefreq: route === "/" ? "weekly" : "monthly", priority: route === "/" ? "1.0" : "0.8" });
}

for (const route of blogRoutes) {
  const id = route.replace(/^\/blog\//, "").replace(/\/$/, "");
  const post = blogPosts.find((p) => p.id === id);
  const seo = seoForRoute(route);
  const appHtml = render(route);
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: seo.description,
    datePublished: post.date,
    dateModified: post.date,
    image: OG_IMAGE,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@id": `${SITE}/#organization` },
    mainEntityOfPage: `${SITE}${route}`,
  };
  results.push(
    write(
      route,
      buildHtml({
        route,
        title: seo.title,
        description: seo.description,
        appHtml,
        ogType: "article",
        extraJsonLd: [article, breadcrumb(route, post.title)],
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
