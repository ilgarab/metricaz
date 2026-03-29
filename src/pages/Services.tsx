import { useTranslation } from "react-i18next";
import SectionHeader from "@/components/SectionHeader";
import ServiceCard from "@/components/ServiceCard";
import CTABanner from "@/components/CTABanner";
import { services } from "@/data/mockData";

export default function Services() {
  const { t } = useTranslation();

  const serviceDescs: Record<string, string> = {
    "metric-bi": t("services.metricBi"),
    "metric-alert": t("services.metricAlert"),
    "metric-ai": t("services.metricAi"),
    "metric-fraud": t("services.metricFraud"),
  };

  return (
    <div className="pt-16">
      <section className="hero-gradient section-padding">
        <div className="container">
          <SectionHeader
            badge={t("services.badge")}
            title={t("services.pageTitle")}
            subtitle={t("services.pageSubtitle")}
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((s, i) => (
              <ServiceCard key={s.id} {...s} shortDesc={serviceDescs[s.id] || s.shortDesc} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title={t("cta.servicesTitle")}
        subtitle={t("cta.servicesSubtitle")}
        buttonText={t("cta.servicesButton")}
      />
    </div>
  );
}
