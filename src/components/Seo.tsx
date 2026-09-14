import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { jsonLdForRoute, seoForRoute, OG_IMAGE, OG_IMAGE_ALT } from "@/seo/config";

const NOT_FOUND = {
  title: "Səhifə tapılmadı (404) | Metric Analytics",
  description:
    "Axtardığınız səhifə mövcud deyil. Ana səhifəyə qayıdın və ya xidmətlərimizlə tanış olun.",
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
 * Keeps title / description / canonical / robots / OG / Twitter / route JSON-LD
 * in sync with the current route during client-side navigation.
 * Same source of truth (src/seo/config.ts) as the static prerender.
 */
export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = seoForRoute(pathname);

    if (!seo) {
      document.title = NOT_FOUND.title;
      setMeta("name", "description", NOT_FOUND.description);
      setMeta("name", "robots", "noindex, follow");
      setMeta("property", "og:title", NOT_FOUND.title);
      setMeta("property", "og:description", NOT_FOUND.description);
      setMeta("property", "og:type", "website");
      setMeta("property", "og:image", OG_IMAGE);
      setMeta("property", "og:image:width", "1200");
      setMeta("property", "og:image:height", "640");
      setMeta("property", "og:image:alt", OG_IMAGE_ALT);
      setMeta("name", "twitter:title", NOT_FOUND.title);
      setMeta("name", "twitter:description", NOT_FOUND.description);
      setMeta("name", "twitter:image", OG_IMAGE);
      document.head.querySelector('meta[property="og:url"]')?.remove();
      setCanonical(null);
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
    setMeta("property", "og:image", seo.ogImage);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "640");
    setMeta("property", "og:image:alt", seo.ogImageAlt);
    setMeta("name", "twitter:title", seo.title);
    setMeta("name", "twitter:description", seo.description);
    setMeta("name", "twitter:image", seo.ogImage);
    setCanonical(seo.canonical);
    setRouteJsonLd(jsonLdForRoute(pathname));
  }, [pathname]);

  return null;
}
