import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link, useLocalizedPath } from "@/i18n/Link";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import metricLogo from "@/assets/metric-icon.png";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const lp = useLocalizedPath();

  const links = [
    { href: lp("/services/"), label: t("nav.services") },
    { href: lp("/blog/"), label: t("nav.blog") },
    { href: lp("/about/"), label: t("nav.about") },
    { href: lp("/contact/"), label: t("nav.contact") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="container flex h-16 items-center justify-between md:h-18">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <img src={metricLogo} alt="" className="h-8 w-auto" />
          <span>metric</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200 hover:bg-muted ${
                location.pathname.startsWith(l.href) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-95"
            aria-label={t("a11y.themeToggle")}
          >
            {theme === "dark" ? <Sun aria-hidden="true" focusable="false" size={18} /> : <Moon aria-hidden="true" focusable="false" size={18} />}
          </button>
          <Button asChild size="sm" className="active:scale-[0.97]">
            <Link to="/contact/">{t("nav.cta")}</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted"
            aria-label={t("a11y.themeToggle")}
          >
            {theme === "dark" ? <Sun aria-hidden="true" focusable="false" size={18} /> : <Moon aria-hidden="true" focusable="false" size={18} />}
          </button>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground"
            aria-label={open ? t("a11y.closeMenu") : t("a11y.openMenu")}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X aria-hidden="true" focusable="false" size={22} /> : <Menu aria-hidden="true" focusable="false" size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-border bg-background md:hidden"
          >
            <div className="container flex flex-col gap-1 py-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted ${
                    location.pathname.startsWith(l.href) ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <Button asChild className="mt-2 w-full active:scale-[0.97]">
                <Link to="/contact/">{t("nav.cta")}</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
