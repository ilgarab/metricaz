/**
 * Crawlable multilingual URL map.
 * AZ keeps the original (unprefixed) URLs, EN/RU live under /en/ and /ru/.
 */
export const LANGS = ["az", "en", "ru"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "az";

export type PageKey = "home" | "services" | "dataAnalytics" | "reporting" | "about" | "blog" | "contact";

export const PAGE_KEYS: PageKey[] = [
  "home",
  "services",
  "dataAnalytics",
  "reporting",
  "about",
  "blog",
  "contact",
];

export const ROUTE_PATHS: Record<PageKey, Record<Lang, string>> = {
  home: { az: "/", en: "/en/", ru: "/ru/" },
  services: { az: "/services/", en: "/en/services/", ru: "/ru/services/" },
  dataAnalytics: { az: "/data-analitikasi/", en: "/en/data-analytics/", ru: "/ru/data-analytics/" },
  reporting: { az: "/hesabat-sistemi/", en: "/en/reporting-system/", ru: "/ru/reporting-system/" },
  about: { az: "/about/", en: "/en/about/", ru: "/ru/about/" },
  blog: { az: "/blog/", en: "/en/blog/", ru: "/ru/blog/" },
  contact: { az: "/contact/", en: "/en/contact/", ru: "/ru/contact/" },
};

export const BLOG_POST_PATH: Record<Lang, (id: string) => string> = {
  az: (id) => `/blog/${id}/`,
  en: (id) => `/en/blog/${id}/`,
  ru: (id) => `/ru/blog/${id}/`,
};

/** Canonical form: root stays "/", everything else ends with a trailing slash. */
export function canonicalPath(route: string): string {
  const clean = route.split("?")[0].split("#")[0];
  if (clean === "" || clean === "/") return "/";
  return clean.endsWith("/") ? clean : `${clean}/`;
}

export function langFromPath(route: string): Lang {
  const path = canonicalPath(route);
  if (path === "/en/" || path.startsWith("/en/")) return "en";
  if (path === "/ru/" || path.startsWith("/ru/")) return "ru";
  return "az";
}

export interface RouteMatch {
  lang: Lang;
  page: PageKey | "blogPost";
  postId?: string;
}

export function matchRoute(route: string): RouteMatch | null {
  const path = canonicalPath(route);
  const lang = langFromPath(path);

  for (const key of PAGE_KEYS) {
    if (ROUTE_PATHS[key][lang] === path) return { lang, page: key };
  }

  const blogBase = ROUTE_PATHS.blog[lang];
  if (path.startsWith(blogBase) && path.length > blogBase.length) {
    const postId = path.slice(blogBase.length).replace(/\/$/, "");
    if (postId && !postId.includes("/")) return { lang, page: "blogPost", postId };
  }

  return null;
}

/** All language variants of the given route (used for hreflang). */
export function alternatesForPath(route: string): Record<Lang, string> | null {
  const match = matchRoute(route);
  if (!match) return null;
  const out = {} as Record<Lang, string>;
  for (const lang of LANGS) {
    out[lang] =
      match.page === "blogPost" ? BLOG_POST_PATH[lang](match.postId!) : ROUTE_PATHS[match.page][lang];
  }
  return out;
}

/** Maps an AZ (source) path to its equivalent in `lang`. Falls back to the input. */
export function localizePath(azPath: string, lang: Lang): string {
  const path = canonicalPath(azPath);
  for (const key of PAGE_KEYS) {
    if (ROUTE_PATHS[key].az === path) return ROUTE_PATHS[key][lang];
  }
  if (path.startsWith("/blog/") && path !== "/blog/") {
    const id = path.slice("/blog/".length).replace(/\/$/, "");
    if (id) return BLOG_POST_PATH[lang](id);
  }
  return path;
}

export const HTML_LANG: Record<Lang, string> = { az: "az", en: "en", ru: "ru" };
export const OG_LOCALE: Record<Lang, string> = { az: "az_AZ", en: "en_US", ru: "ru_RU" };
