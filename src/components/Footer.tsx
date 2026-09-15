import { Link } from "@/i18n/Link";
import { Mail, Phone, MapPin, Linkedin, Facebook } from "lucide-react";
import { useTranslation } from "react-i18next";
import metricLogo from "@/assets/metric-icon.png";
import trustedLight from "@/assets/tb-trusted-light.svg";
import trustedDark from "@/assets/tb-trusted-dark.svg";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container section-padding-sm">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
              <img src={metricLogo} alt="" className="h-7 w-auto" />
              <span>metric</span>
            </Link>
            <p className="mt-2 text-sm font-medium text-primary">{t("footer.slogan")}</p>
            <p className="mt-2 text-sm text-muted-foreground" style={{ lineHeight: "1.7" }}>
              {t("footer.description")}
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t("footer.pages")}</h2>
            <ul className="space-y-2.5 text-sm">
              {[
                ["/services/", t("nav.services")],
                ["/data-analitikasi/", "Data analitikası"],
                ["/hesabat-sistemi/", "Reporting sistemi necə qurulur?"],
                ["/blog/", t("nav.blog")],
                ["/about/", t("nav.about")],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link to={href} className="text-muted-foreground transition-colors hover:text-foreground">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t("footer.servicesTitle")}</h2>
            <ul className="space-y-2.5 text-sm">
              {[
                "Metric BI",
                "Metric Alert",
                "Metric AI",
                "Metric Fraud",
              ].map((s) => (
                <li key={s} className="text-muted-foreground">{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t("footer.contactTitle")}</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail aria-hidden="true" focusable="false" size={14} className="text-primary" /> info@metric.az
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone aria-hidden="true" focusable="false" size={14} className="text-primary" /> +994 51 652 49 45
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin aria-hidden="true" focusable="false" size={14} className="mt-0.5 text-primary" /> {t("contact.addressValue")}
              </li>
            </ul>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/metricanalytics1/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Linkedin aria-hidden="true" focusable="false" size={16} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100094764317816"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Facebook aria-hidden="true" focusable="false" size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-10">
          <img src={trustedLight} alt="Trusted on Trustpilot" className="h-auto w-[88px] dark:hidden" />
          <img src={trustedDark} alt="Trusted on Trustpilot" className="hidden h-auto w-[88px] dark:block" />
        </div>

        <div className="mt-4 border-t border-border pt-4 text-center md:mt-6 md:pt-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Metric. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
