import { blogPosts } from "@/data/mockData";
import az from "@/i18n/locales/az.json";
import en from "@/i18n/locales/en.json";
import ru from "@/i18n/locales/ru.json";
import {
  BLOG_POST_PATH,
  DEFAULT_LANG,
  HTML_LANG,
  LANGS,
  Lang,
  OG_LOCALE,
  PAGE_KEYS,
  PageKey,
  ROUTE_PATHS,
  alternatesForPath,
  canonicalPath,
  langFromPath,
  matchRoute,
} from "@/i18n/routes";

export const SITE = "https://metric.az";
export const OG_IMAGE = `${SITE}/og-image.jpg`;
export const OG_IMAGE_ALT = "Metric Analytics - data analitika və Power BI həlləri";

export { LANGS, DEFAULT_LANG, HTML_LANG, OG_LOCALE, canonicalPath, langFromPath, alternatesForPath };
export type { Lang };

const locales: Record<Lang, typeof az> = { az, en, ru as unknown as typeof az } as never;

export interface RouteSeo {
  lang: Lang;
  title: string;
  description: string;
  canonical: string;
  alternates: Record<Lang, string>;
  ogImage: string;
  ogImageAlt: string;
  ogType: "website" | "article";
  ogLocale: string;
  htmlLang: string;
}

type Meta = { title: string; description: string };

const pageSeo: Record<Lang, Record<PageKey, Meta>> = {
  az: {
    home: {
      title: "Metric Analytics: Analitika və Süni İntellekt Həlləri",
      description:
        "Analitik hesabatlar, smart bildirişlər, süni intellekt və fraud aşkarlama həlləri təqdim edirik. Biznesinizi data əsaslı idarə edin.",
    },
    services: {
      title: "Analitika, AI və Data Həlləri | Metric Analytics",
      description:
        "Metric BI, Alert, AI və Fraud ilə biznes analitikası, data həlləri, smart bildirişlər, süni intellekt və fraud aşkarlama sistemləri.",
    },
    dataAnalytics: {
      title: "Data analitikası və biznes analitikası xidmətləri | Metric Analytics",
      description:
        "Bakıda analitika şirkəti: data analitikası, biznes analitikası, BI dashboard, hesabatların yaradılması, AI proqnoz və fraud aşkarlama xidmətləri.",
    },
    reporting: {
      title: "Hesabatlıq Sistemi, Reporting və Power BI | Metric Analytics",
      description:
        "ERP, 1C, SAP, POS və CRM məlumatları üçün Power BI hesabatlıq sistemi, reporting avtomatlaşdırılması, dashboard və smart bildiriş həlləri.",
    },
    about: {
      title: "Haqqımızda - Metric Analytics komandası və missiyamız",
      description:
        "Metric Analytics - Bakıda yerləşən data analitika şirkəti. Missiyamız, vizyonumuz və komandamız ilə tanış olun.",
    },
    blog: {
      title: "Bloq - Data analitika və BI üzrə məqalələr | Metric Analytics",
      description:
        "Biznes analitikası, BI dashboard, data idarəetməsi və AI mövzularında Metric Analytics ekspertlərinin məqalələri.",
    },
    contact: {
      title: "Əlaqə - Metric Analytics ilə əlaqə saxlayın",
      description:
        "Metric Analytics ilə əlaqə: Əcəmi Naxçıvani, Bakı. Demo, konsultasiya və əməkdaşlıq üçün bizə yazın.",
    },
  },
  en: {
    home: {
      title: "Metric Analytics: Analytics and Artificial Intelligence Solutions",
      description:
        "We provide analytical reports, smart alerts, artificial intelligence and fraud detection solutions. Manage your business with data-driven insights.",
    },
    services: {
      title: "Analytics, AI and Data Solutions | Metric Analytics",
      description:
        "Business analytics, data solutions, smart alerts, artificial intelligence and fraud detection systems with Metric BI, Alert, AI and Fraud.",
    },
    dataAnalytics: {
      title: "Data analytics and business analytics services | Metric Analytics",
      description:
        "Analytics company in Baku: data analytics, business analytics, BI dashboards, report building, AI forecasting and fraud detection services.",
    },
    reporting: {
      title: "Reporting System, Reporting Automation and Power BI | Metric Analytics",
      description:
        "Power BI reporting system, reporting automation, dashboards and smart alert solutions for ERP, 1C, SAP, POS and CRM data.",
    },
    about: {
      title: "About us - the Metric Analytics team and our mission",
      description:
        "Metric Analytics - a data analytics company based in Baku. Get to know our mission, our vision and our team.",
    },
    blog: {
      title: "Blog - articles on data analytics and BI | Metric Analytics",
      description:
        "Articles by Metric Analytics experts on business analytics, BI dashboards, data management and AI.",
    },
    contact: {
      title: "Contact - get in touch with Metric Analytics",
      description:
        "Contact Metric Analytics: Ajami Nakhchivani, Baku. Write to us for a demo, a consultation or partnership.",
    },
  },
  ru: {
    home: {
      title: "Metric Analytics: Аналитика и решения на основе искусственного интеллекта",
      description:
        "Мы предлагаем аналитические отчёты, умные уведомления, решения на основе искусственного интеллекта и выявление мошенничества. Управляйте бизнесом на основе данных.",
    },
    services: {
      title: "Аналитика, ИИ и решения для данных | Metric Analytics",
      description:
        "Бизнес-аналитика, решения для данных, умные уведомления, искусственный интеллект и системы выявления мошенничества с Metric BI, Alert, AI и Fraud.",
    },
    dataAnalytics: {
      title: "Услуги аналитики данных и бизнес-аналитики | Metric Analytics",
      description:
        "Аналитическая компания в Баку: аналитика данных, бизнес-аналитика, BI-дашборды, построение отчётов, ИИ-прогнозы и выявление мошенничества.",
    },
    reporting: {
      title: "Система отчётности, автоматизация отчётности и Power BI | Metric Analytics",
      description:
        "Система отчётности на Power BI, автоматизация отчётности, дашборды и умные уведомления для данных ERP, 1C, SAP, POS и CRM.",
    },
    about: {
      title: "О нас - команда Metric Analytics и наша миссия",
      description:
        "Metric Analytics - компания по аналитике данных в Баку. Познакомьтесь с нашей миссией, видением и командой.",
    },
    blog: {
      title: "Блог - статьи об аналитике данных и BI | Metric Analytics",
      description:
        "Статьи экспертов Metric Analytics о бизнес-аналитике, BI-дашбордах, управлении данными и искусственном интеллекте.",
    },
    contact: {
      title: "Контакты - свяжитесь с Metric Analytics",
      description: "Связь с Metric Analytics: Аджеми Нахчывани, Баку. Напишите нам для демо, консультации или сотрудничества.",
    },
  },
};

const blogTitleSuffix: Record<Lang, string> = {
  az: " | Metric Analytics",
  en: " | Metric Analytics",
  ru: " | Metric Analytics",
};

const homeName: Record<Lang, string> = { az: "Ana səhifə", en: "Home", ru: "Главная" };

/** Every canonical, fully translated route of the site. */
export const allRoutes: string[] = [
  ...LANGS.flatMap((lang) => PAGE_KEYS.map((key) => ROUTE_PATHS[key][lang])),
  ...LANGS.flatMap((lang) => blogPosts.map((post) => BLOG_POST_PATH[lang](post.id))),
];

export const staticRoutes = LANGS.flatMap((lang) => PAGE_KEYS.map((key) => ROUTE_PATHS[key][lang]));
export const blogRoutes = LANGS.flatMap((lang) => blogPosts.map((post) => BLOG_POST_PATH[lang](post.id)));

function blogMeta(lang: Lang, id: string): Meta | null {
  const post = blogPosts.find((p) => p.id === id);
  if (!post) return null;
  const localized = (locales[lang] as unknown as {
    blog: { posts: Record<string, { title: string; excerpt: string }> };
  }).blog.posts[id];
  const title = localized?.title ?? post.title;
  const excerpt = localized?.excerpt ?? post.excerpt;
  return { title: `${title}${blogTitleSuffix[lang]}`, description: excerpt.slice(0, 155) };
}

export function seoForRoute(route: string): RouteSeo | null {
  const path = canonicalPath(route);
  const match = matchRoute(path);
  if (!match) return null;

  const { lang } = match;
  const alternates = alternatesForPath(path)!;
  const meta =
    match.page === "blogPost" ? blogMeta(lang, match.postId!) : pageSeo[lang][match.page as PageKey];
  if (!meta) return null;

  return {
    lang,
    title: meta.title,
    description: meta.description,
    canonical: `${SITE}${path}`,
    alternates,
    ogImage: OG_IMAGE,
    ogImageAlt: OG_IMAGE_ALT,
    ogType: match.page === "blogPost" ? "article" : "website",
    ogLocale: OG_LOCALE[lang],
    htmlLang: HTML_LANG[lang],
  };
}

/* ------------------------------------------------------------------ *
 * Route-specific JSON-LD (single source of truth for prerender + client)
 * ------------------------------------------------------------------ */

type JsonLd = Record<string, unknown>;

const breadcrumb = (path: string, name: string, lang: Lang): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  inLanguage: lang,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: homeName[lang], item: `${SITE}${ROUTE_PATHS.home[lang]}` },
    { "@type": "ListItem", position: 2, name, item: `${SITE}${path}` },
  ],
});

const service = (
  path: string,
  lang: Lang,
  name: string,
  description: string,
  alternateName: string[],
): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "Service",
  inLanguage: lang,
  name,
  description,
  serviceType: name,
  alternateName,
  areaServed: { "@type": "Country", name: "Azerbaijan" },
  provider: { "@id": `${SITE}/#organization` },
  url: `${SITE}${path}`,
});

const serviceCopy: Record<Lang, Partial<Record<PageKey, { name: string; description: string; alternateName: string[] }>>> = {
  az: {
    dataAnalytics: {
      name: "Data analitikası və biznes analitikası",
      description:
        "Data analitikası, biznes analitikası, Power BI hesabatlıq, AI analitikası və fraud aşkarlama xidmətləri.",
      alternateName: ["biznes analitikası", "Power BI hesabatlıq", "AI analitikası", "fraud aşkarlama"],
    },
    reporting: {
      name: "Power BI hesabatlıq və reporting avtomatlaşdırılması",
      description:
        "Power BI hesabatlıq sistemi, reporting avtomatlaşdırılması və ERP məlumat analitikası ilə data mənbələrinin inteqrasiyası.",
      alternateName: ["reporting avtomatlaşdırılması", "ERP məlumat analitikası", "hesabatların yaradılması"],
    },
    services: {
      name: "Metric BI, Alert, AI və Fraud həlləri",
      description: "Biznes analitikası, Power BI hesabatlıq, AI analitikası və fraud aşkarlama həlləri.",
      alternateName: ["data analitikası", "biznes analitikası", "Power BI hesabatlıq", "AI analitikası", "fraud aşkarlama"],
    },
  },
  en: {
    dataAnalytics: {
      name: "Data analytics and business analytics",
      description: "Data analytics, business analytics, Power BI reporting, AI analytics and fraud detection services.",
      alternateName: ["business analytics", "Power BI reporting", "AI analytics", "fraud detection"],
    },
    reporting: {
      name: "Power BI reporting and reporting automation",
      description:
        "Power BI reporting system, reporting automation and data source integration with ERP data analytics.",
      alternateName: ["reporting automation", "ERP data analytics", "report building"],
    },
    services: {
      name: "Metric BI, Alert, AI and Fraud solutions",
      description: "Business analytics, Power BI reporting, AI analytics and fraud detection solutions.",
      alternateName: ["data analytics", "business analytics", "Power BI reporting", "AI analytics", "fraud detection"],
    },
  },
  ru: {
    dataAnalytics: {
      name: "Аналитика данных и бизнес-аналитика",
      description:
        "Аналитика данных, бизнес-аналитика, отчётность на Power BI, ИИ-аналитика и выявление мошенничества.",
      alternateName: ["бизнес-аналитика", "отчётность Power BI", "ИИ-аналитика", "выявление мошенничества"],
    },
    reporting: {
      name: "Отчётность на Power BI и автоматизация отчётности",
      description:
        "Система отчётности на Power BI, автоматизация отчётности и интеграция источников данных с аналитикой ERP.",
      alternateName: ["автоматизация отчётности", "аналитика данных ERP", "построение отчётов"],
    },
    services: {
      name: "Решения Metric BI, Alert, AI и Fraud",
      description: "Бизнес-аналитика, отчётность Power BI, ИИ-аналитика и выявление мошенничества.",
      alternateName: ["аналитика данных", "бизнес-аналитика", "отчётность Power BI", "ИИ-аналитика", "выявление мошенничества"],
    },
  },
};

/**
 * Route-level structured data. Sitewide Organization / WebSite blocks stay in
 * index.html and are never duplicated here.
 */
export function jsonLdForRoute(route: string): JsonLd[] {
  const path = canonicalPath(route);
  const match = matchRoute(path);
  const seo = seoForRoute(path);
  if (!match || !seo) return [];

  const { lang } = match;
  if (match.page === "home") return [];

  if (match.page === "blogPost") {
    const post = blogPosts.find((p) => p.id === match.postId);
    if (!post) return [];
    const headline = seo.title.replace(blogTitleSuffix[lang], "");
    return [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        inLanguage: lang,
        headline,
        description: seo.description,
        datePublished: post.date,
        dateModified: post.date,
        image: post.image || OG_IMAGE,
        author: { "@id": `${SITE}/#organization` },
        publisher: { "@id": `${SITE}/#organization` },
        mainEntityOfPage: `${SITE}${path}`,
      },
      breadcrumb(path, headline, lang),
    ];
  }

  const name = seo.title.split(" - ")[0].split(" | ")[0];
  const out: JsonLd[] = [breadcrumb(path, name, lang)];
  const copy = serviceCopy[lang][match.page as PageKey];
  if (copy) out.push(service(path, lang, copy.name, copy.description, copy.alternateName));
  return out;
}
