import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppProviders, AppRoutes } from "./App";
import { blogPosts } from "./data/mockData";
import {
  SITE,
  OG_IMAGE,
  OG_IMAGE_ALT,
  seoForRoute,
  jsonLdForRoute,
  staticRoutes,
  blogRoutes,
  allRoutes,
} from "./seo/config";
import { LANGS, langFromPath } from "./i18n/routes";
import "./i18n";

export function render(url: string) {
  return renderToString(
    <AppProviders>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </AppProviders>,
  );
}

export {
  blogPosts,
  SITE,
  OG_IMAGE,
  OG_IMAGE_ALT,
  seoForRoute,
  jsonLdForRoute,
  staticRoutes,
  blogRoutes,
  allRoutes,
  LANGS,
  langFromPath,
};
