import { ReactNode, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/useTheme";
import Layout from "@/components/Layout";
import i18n from "@/i18n";
import { BLOG_POST_PATH, LANGS, Lang, PAGE_KEYS, ROUTE_PATHS, langFromPath } from "@/i18n/routes";
import Index from "./pages/Index";
import Services from "./pages/Services";
import DataAnalytics from "./pages/DataAnalytics";
import ReportingSystem from "./pages/ReportingSystem";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const pageElements = {
  home: <Index />,
  services: <Services />,
  dataAnalytics: <DataAnalytics />,
  reporting: <ReportingSystem />,
  about: <About />,
  blog: <Blog />,
  contact: <Contact />,
};

/** One i18n instance per language, so the URL is the single source of truth. */
const instances: Partial<Record<Lang, typeof i18n>> = { az: i18n };
function instanceFor(lang: Lang) {
  if (!instances[lang]) instances[lang] = i18n.cloneInstance({ lng: lang, initImmediate: false });
  return instances[lang]!;
}

const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const lang = langFromPath(pathname);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("i18nextLng", lang);
    } catch {
      /* storage may be unavailable */
    }
  }, [lang]);

  return <I18nextProvider i18n={instanceFor(lang)}>{children}</I18nextProvider>;
};

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {children}
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export const AppRoutes = () => (
  <LanguageProvider>
    <Layout>
      <Routes>
        {LANGS.flatMap((lang) => [
          ...PAGE_KEYS.map((key) => (
            <Route key={`${lang}-${key}`} path={ROUTE_PATHS[key][lang]} element={pageElements[key]} />
          )),
          <Route key={`${lang}-post`} path={BLOG_POST_PATH[lang](":id")} element={<BlogPost />} />,
        ])}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  </LanguageProvider>
);

const App = () => (
  <AppProviders>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AppProviders>
);

export default App;
