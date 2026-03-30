import { useTranslation } from "react-i18next";

const languages = [
  { code: "az", label: "AZ" },
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="flex items-center gap-0.5">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className={`rounded-md px-2 py-1 text-sm font-medium transition-colors hover:bg-muted ${
            lang.code === i18n.language ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
