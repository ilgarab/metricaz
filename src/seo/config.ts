import { blogPosts } from "@/data/mockData";

export const SITE = "https://metric.az";
export const OG_IMAGE = `${SITE}/og-image.jpg`;
export const OG_IMAGE_ALT = "Metric Analytics - data analitika və Power BI həlləri";

export interface RouteSeo {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  ogImageAlt: string;
  ogType: "website" | "article";
}

const staticSeo: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Metric Analytics: Analitika və Süni İntellekt Həlləri",
    description:
      "Analitik hesabatlar, smart bildirişlər, süni intellekt və fraud aşkarlama həlləri təqdim edirik. Biznesinizi data əsaslı idarə edin.",
  },
  "/services/": {
    title: "Analitika, AI və Data Həlləri | Metric Analytics",
    description:
      "Metric BI, Alert, AI və Fraud ilə biznes analitikası, data həlləri, smart bildirişlər, süni intellekt və fraud aşkarlama sistemləri.",
  },
  "/data-analitikasi/": {
    title: "Data analitikası və biznes analitikası xidmətləri | Metric Analytics",
    description:
      "Bakıda analitika şirkəti: data analitikası, biznes analitikası, BI dashboard, hesabatların yaradılması, AI proqnoz və fraud aşkarlama xidmətləri.",
  },
  "/hesabat-sistemi/": {
    title: "Hesabatlıq Sistemi, Reporting və Power BI | Metric Analytics",
    description:
      "ERP, 1C, SAP, POS və CRM məlumatları üçün Power BI hesabatlıq sistemi, reporting avtomatlaşdırılması, dashboard və smart bildiriş həlləri.",
  },
  "/about/": {
    title: "Haqqımızda - Metric Analytics komandası və missiyamız",
    description:
      "Metric Analytics - Bakıda yerləşən data analitika şirkəti. Missiyamız, vizyonumuz və komandamız ilə tanış olun.",
  },
  "/blog/": {
    title: "Bloq - Data analitika və BI üzrə məqalələr | Metric Analytics",
    description:
      "Biznes analitikası, BI dashboard, data idarəetməsi və AI mövzularında Metric Analytics ekspertlərinin məqalələri.",
  },
  "/contact/": {
    title: "Əlaqə - Metric Analytics ilə əlaqə saxlayın",
    description:
      "Metric Analytics ilə əlaqə: Əcəmi Naxçıvani, Bakı. Demo, konsultasiya və əməkdaşlıq üçün bizə yazın.",
  },
};

export const staticRoutes = Object.keys(staticSeo);
export const blogRoutes = blogPosts.map((post) => `/blog/${post.id}/`);

/** Canonical URL form: root stays "/", every other route ends with a trailing slash. */
export function canonicalPath(route: string): string {
  const clean = route.split("?")[0].split("#")[0];
  if (clean === "" || clean === "/") return "/";
  return clean.endsWith("/") ? clean : `${clean}/`;
}

export function seoForRoute(route: string): RouteSeo | null {
  const path = canonicalPath(route);
  const base = { ogImage: OG_IMAGE, ogImageAlt: OG_IMAGE_ALT, canonical: `${SITE}${path}` };

  if (staticSeo[path]) {
    return { ...staticSeo[path], ...base, ogType: "website" };
  }

  if (path.startsWith("/blog/")) {
    const id = path.replace(/^\/blog\//, "").replace(/\/$/, "");
    const post = blogPosts.find((p) => p.id === id);
    if (!post) return null;
    return {
      title: `${post.title} | Metric Analytics`,
      description: post.excerpt.slice(0, 155),
      ...base,
      ogType: "article",
    };
  }

  return null;
}


/* ------------------------------------------------------------------ *
 * Route-specific JSON-LD (single source of truth for prerender + client)
 * ------------------------------------------------------------------ */

type JsonLd = Record<string, unknown>;

const breadcrumb = (path: string, name: string): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ana səhifə", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name, item: `${SITE}${path}` },
  ],
});

const service = (
  path: string,
  name: string,
  description: string,
  alternateName: string[],
): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  serviceType: name,
  alternateName,
  areaServed: { "@type": "Country", name: "Azerbaijan" },
  provider: { "@id": `${SITE}/#organization` },
  url: `${SITE}${path}`,
});

const serviceSchema: Record<string, JsonLd> = {
  "/data-analitikasi/": service(
    "/data-analitikasi/",
    "Data analitikası və biznes analitikası",
    "Data analitikası, biznes analitikası, Power BI hesabatlıq, AI analitikası və fraud aşkarlama xidmətləri.",
    ["biznes analitikası", "Power BI hesabatlıq", "AI analitikası", "fraud aşkarlama"],
  ),
  "/hesabat-sistemi/": service(
    "/hesabat-sistemi/",
    "Power BI hesabatlıq və reporting avtomatlaşdırılması",
    "Power BI hesabatlıq sistemi, reporting avtomatlaşdırılması və ERP məlumat analitikası ilə data mənbələrinin inteqrasiyası.",
    ["reporting avtomatlaşdırılması", "ERP məlumat analitikası", "hesabatların yaradılması"],
  ),
  "/services/": service(
    "/services/",
    "Metric BI, Alert, AI və Fraud həlləri",
    "Biznes analitikası, Power BI hesabatlıq, AI analitikası və fraud aşkarlama həlləri.",
    ["data analitikası", "biznes analitikası", "Power BI hesabatlıq", "AI analitikası", "fraud aşkarlama"],
  ),
};

/**
 * Route-level structured data. Sitewide Organization / WebSite blocks stay in
 * index.html and are never duplicated here.
 */
export function jsonLdForRoute(route: string): JsonLd[] {
  const path = canonicalPath(route);
  const seo = seoForRoute(path);
  if (!seo) return [];

  if (path === "/") return [];

  if (path.startsWith("/blog/") && path !== "/blog/") {
    const id = path.replace(/^\/blog\//, "").replace(/\/$/, "");
    const post = blogPosts.find((p) => p.id === id);
    if (!post) return [];
    return [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: seo.description,
        datePublished: post.date,
        dateModified: post.date,
        image: post.image || OG_IMAGE,
        author: { "@id": `${SITE}/#organization` },
        publisher: { "@id": `${SITE}/#organization` },
        mainEntityOfPage: `${SITE}${path}`,
      },
      breadcrumb(path, post.title),
    ];
  }

  const out: JsonLd[] = [breadcrumb(path, seo.title.split(" - ")[0].split(" | ")[0])];
  if (serviceSchema[path]) out.push(serviceSchema[path]);
  return out;
}
