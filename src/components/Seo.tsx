import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { jsonLdForRoute, seoForRoute, OG_IMAGE, OG_IMAGE_ALT, SITE } from "@/seo/config";
import { HTML_LANG, LANGS, OG_LOCALE, langFromPath } from "@/i18n/routes";

const NOT_FOUND: Record<string, { title: string; description: string }> = {
  az: {
    title: "Səhifə tapılmadı (404) | Metric Analytics",
    description: "Axtardığınız səhifə mövcud deyil. Ana səhifəyə qayıdın və ya xidmətlərimizlə tanış olun.",
  },
  en: {
    title: "Page not found (404) | Metric Analytics",
    description: "The page you are looking for does not exist. Return to the home page or explore our services.",
  },
  ru: {
    title: "Страница не найдена (404) | Metric Analytics",
    description: "Запрашиваемая страница не существует. Вернитесь на главную страницу или посмотрите наши услуги.",
  },
};

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string | null) {
  const existing = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!href) {
    existing?.remove();
    return;
  }
  const link = existing ?? document.head.appendChild(Object.assign(document.createElement("link"), { rel: "canonical" }));
  link.href = href;
}

/** Reciprocal hreflang set; removed entirely for non-indexable routes. */
function setHreflang(alternates: Record<string, string> | null) {
  document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
  if (!alternates) return;
  const entries: [string, string][] = [
    ...LANGS.map((lang) => [lang, alternates[lang]] as [string, string]),
    ["x-default", alternates.az],
  ];
  for (const [hreflang, path] of entries) {
    const link = document.createElement("link");
    link.rel = "alternate";
    link.hreflang = hreflang;
    link.href = `${SITE}${path}`;
    document.head.appendChild(link);
  }
}

/** Replaces route-level JSON-LD; sitewide Organization/WebSite blocks stay untouched. */
function setRouteJsonLd(blocks: Record<string, unknown>[]) {
  document.head.querySelectorAll('script[data-seo="route"]').forEach((el) => el.remove());
  for (const block of blocks) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.seo = "route";
    script.textContent = JSON.stringify(block);
    document.head.appendChild(script);
  }
}

/**
 * Keeps lang / title / description / canonical / hreflang / robots / OG /
 * Twitter / route JSON-LD in sync with the current route during client-side
 * navigation. Same source of truth (src/seo/config.ts) as the static prerender.
 */
export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = seoForRoute(pathname);
    const lang = langFromPath(pathname);
    document.documentElement.lang = HTML_LANG[lang];

    if (!seo) {
      const nf = NOT_FOUND[lang];
      document.title = nf.title;
      setMeta("name", "description", nf.description);
      setMeta("name", "robots", "noindex, follow");
      setMeta("property", "og:title", nf.title);
      setMeta("property", "og:description", nf.description);
      setMeta("property", "og:type", "website");
      setMeta("property", "og:locale", OG_LOCALE[lang]);
      setMeta("property", "og:image", OG_IMAGE);
      setMeta("property", "og:image:width", "1200");
      setMeta("property", "og:image:height", "640");
      setMeta("property", "og:image:alt", OG_IMAGE_ALT);
      setMeta("name", "twitter:title", nf.title);
      setMeta("name", "twitter:description", nf.description);
      setMeta("name", "twitter:image", OG_IMAGE);
      document.head.querySelector('meta[property="og:url"]')?.remove();
      setCanonical(null);
      setHreflang(null);
      setRouteJsonLd([]);
      return;
    }

    document.title = seo.title;
    setMeta("name", "description", seo.description);
    setMeta("name", "robots", "index, follow, max-image-preview:large");
    setMeta("property", "og:title", seo.title);
    setMeta("property", "og:description", seo.description);
    setMeta("property", "og:url", seo.canonical);
    setMeta("property", "og:type", seo.ogType);
    setMeta("property", "og:locale", seo.ogLocale);
    setMeta("property", "og:image", seo.ogImage);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "640");
    setMeta("property", "og:image:alt", seo.ogImageAlt);
    setMeta("name", "twitter:title", seo.title);
    setMeta("name", "twitter:description", seo.description);
    setMeta("name", "twitter:image", seo.ogImage);
    setCanonical(seo.canonical);
    setHreflang(seo.alternates);
    setRouteJsonLd(jsonLdForRoute(pathname));
  }, [pathname]);

  return null;
}
