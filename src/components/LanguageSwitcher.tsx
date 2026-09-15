import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LANGS, alternatesForPath, canonicalPath, langFromPath, localizePath } from "@/i18n/routes";

const labels: Record<string, string> = { az: "AZ", en: "EN", ru: "RU" };
const fullNames: Record<string, string> = { az: "Azərbaycan", en: "English", ru: "Русский" };

export default function LanguageSwitcher() {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const activeLanguage = langFromPath(pathname);
  const alternates = alternatesForPath(pathname);

  return (
    <nav aria-label={t("a11y.languageSwitcher")} className="flex items-center gap-0.5">
      {LANGS.map((code) => {
        const href = alternates ? alternates[code] : localizePath(canonicalPath(pathname), code);
        return (
          <Link
            key={code}
            to={href}
            hrefLang={code}
            aria-label={fullNames[code]}
            aria-current={code === activeLanguage ? "true" : undefined}
            className={`rounded-md px-2 py-1 text-xs font-medium transition-colors hover:bg-muted ${
              code === activeLanguage ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {labels[code]}
          </Link>
        );
      })}
    </nav>
  );
}
