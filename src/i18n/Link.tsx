import { forwardRef } from "react";
import { Link as RouterLink, LinkProps, useLocation } from "react-router-dom";
import { Lang, langFromPath, localizePath } from "@/i18n/routes";

/** Current UI language, derived from the URL (never from storage). */
export function useLang(): Lang {
  const { pathname } = useLocation();
  return langFromPath(pathname);
}

/** Maps an AZ source path to the current language equivalent. */
export function useLocalizedPath() {
  const lang = useLang();
  return (azPath: string) => localizePath(azPath, lang);
}

/**
 * Drop-in replacement for react-router's Link that keeps internal navigation
 * inside the active language URL space.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link({ to, ...rest }, ref) {
  const lang = useLang();
  const target = typeof to === "string" ? localizePath(to, lang) : to;
  return <RouterLink ref={ref} to={target} {...rest} />;
});

export default Link;
