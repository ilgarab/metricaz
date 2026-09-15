import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Brain, LineChart, PieChart, ShieldAlert, Target, Workflow } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import CTABanner from "@/components/CTABanner";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/Link";

const icons = [PieChart, LineChart, Workflow, Brain, ShieldAlert, Target];

export default function DataAnalytics() {
  const { t } = useTranslation();
  const areas = t("pages.dataAnalytics.areas", { returnObjects: true }) as { title: string; text: string }[];

  return (
    <div className="pt-16">
      <section className="hero-gradient section-padding">
        <div className="container">
          <SectionHeader
            badge={t("pages.dataAnalytics.badge")}
            as="h1"
            title={t("pages.dataAnalytics.title")}
            subtitle={t("pages.dataAnalytics.subtitle")}
          />
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/contact/">{t("pages.dataAnalytics.ctaPrimary")}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/hesabat-sistemi/">{t("pages.dataAnalytics.ctaSecondary")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <SectionHeader
            title={t("pages.dataAnalytics.areasTitle")}
            subtitle={t("pages.dataAnalytics.areasSubtitle")}
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {areas.map((a, i) => {
              const Icon = icons[i];
              return (
                <motion.article
                  key={a.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <Icon className="mb-4 text-primary" size={26} />
                  <h2 className="text-lg font-semibold">{a.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground" style={{ lineHeight: "1.7" }}>
                    {a.text}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-card/50">
        <div className="container max-w-3xl">
          <h2 className="text-2xl font-bold md:text-3xl">{t("pages.dataAnalytics.whyTitle")}</h2>
          <p className="mt-4 text-muted-foreground" style={{ lineHeight: "1.8" }}>
            {t("pages.dataAnalytics.whyP1")}
          </p>
          <p className="mt-4 text-muted-foreground" style={{ lineHeight: "1.8" }}>
            {t("pages.dataAnalytics.whyP2")}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link to="/services/">{t("pages.dataAnalytics.linkServices")}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/about/">{t("pages.dataAnalytics.linkAbout")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <CTABanner
        title={t("pages.dataAnalytics.ctaTitle")}
        subtitle={t("pages.dataAnalytics.ctaSubtitle")}
        buttonText={t("pages.dataAnalytics.ctaButton")}
      />
    </div>
  );
}
