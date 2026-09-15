import { Link, useLocation } from "react-router-dom";
import { LANGS, alternatesForPath, canonicalPath, langFromPath, localizePath } from "@/i18n/routes";

const labels: Record<string, string> = { az: "AZ", en: "EN", ru: "RU" };

export default function LanguageSwitcher() {
  const { pathname } = useLocation();
  const activeLanguage = langFromPath(pathname);
  const alternates = alternatesForPath(pathname);

  return (
    <div className="flex items-center gap-0.5">
      {LANGS.map((code) => {
        const href = alternates ? alternates[code] : localizePath(canonicalPath(pathname), code);
        return (
          <Link
            key={code}
            to={href}
            hrefLang={code}
            className={`rounded-md px-2 py-1 text-xs font-medium transition-colors hover:bg-muted ${
              code === activeLanguage ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {labels[code]}
          </Link>
        );
      })}
    </div>
  );
}
