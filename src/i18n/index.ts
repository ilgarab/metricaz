import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import az from "./locales/az.json";
import en from "./locales/en.json";
import ru from "./locales/ru.json";

const supportedLanguages = ["az", "en", "ru"] as const;

/**
 * The URL is the single source of truth for the active language (see
 * LanguageProvider in App.tsx). This base instance is always Azerbaijani;
 * EN/RU are served by cloned instances bound to their URL prefix.
 */
i18n.use(initReactI18next).init({
  resources: { az: { translation: az }, en: { translation: en }, ru: { translation: ru } },
  fallbackLng: "az",
  lng: "az",
  supportedLngs: supportedLanguages,
  load: "languageOnly",
  interpolation: { escapeValue: false },
});

export default i18n;
