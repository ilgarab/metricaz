import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { BarChart3, Database, FileSpreadsheet, GaugeCircle, RefreshCw, ShieldCheck } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import CTABanner from "@/components/CTABanner";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/Link";

const stepIcons = [Database, RefreshCw, BarChart3, GaugeCircle];
const outcomeIcons = [FileSpreadsheet, ShieldCheck, GaugeCircle];

export default function ReportingSystem() {
  const { t } = useTranslation();
  const steps = t("pages.reporting.steps", { returnObjects: true }) as { title: string; text: string }[];
  const outcomes = t("pages.reporting.outcomes", { returnObjects: true }) as { title: string; text: string }[];

  return (
    <div className="pt-16">
      <section className="hero-gradient section-padding">
        <div className="container">
          <SectionHeader
            badge={t("pages.reporting.badge")}
            as="h1"
            title={t("pages.reporting.title")}
            subtitle={t("pages.reporting.subtitle")}
          />
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/contact/">{t("pages.reporting.ctaPrimary")}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/services/">{t("pages.reporting.ctaSecondary")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <SectionHeader title={t("pages.reporting.stepsTitle")} subtitle={t("pages.reporting.stepsSubtitle")} />
          <div className="grid gap-6 md:grid-cols-2">
            {steps.map((s, i) => {
              const Icon = stepIcons[i];
              return (
                <motion.article
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <Icon className="mb-4 text-primary" size={26} />
                  <h2 className="text-lg font-semibold">{s.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground" style={{ lineHeight: "1.7" }}>
                    {s.text}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-card/50">
        <div className="container">
          <SectionHeader
            title={t("pages.reporting.outcomesTitle")}
            subtitle={t("pages.reporting.outcomesSubtitle")}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {outcomes.map((o, i) => {
              const Icon = outcomeIcons[i];
              return (
                <div key={o.title} className="rounded-2xl border border-border bg-background p-6">
                  <Icon className="mb-4 text-primary" size={24} />
                  <h2 className="text-base font-semibold">{o.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground" style={{ lineHeight: "1.7" }}>
                    {o.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTABanner
        title={t("pages.reporting.ctaTitle")}
        subtitle={t("pages.reporting.ctaSubtitle")}
        buttonText={t("pages.reporting.ctaButton")}
      />
    </div>
  );
}
