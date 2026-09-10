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
    title: "Metric Analytics:  Analitika və Süni İntellekt Həlləri",
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

