import SectionHeader from "@/components/SectionHeader";
import ServiceCard from "@/components/ServiceCard";
import CTABanner from "@/components/CTABanner";
import { services } from "@/data/mockData";

export default function Services() {
  return (
    <div className="pt-16">
      <section className="hero-gradient section-padding">
        <div className="container">
          <SectionHeader
            badge="Xidmətlər"
            title="Xidmətlərimiz"
            subtitle="Datanı sadəcə göstərmirik - onu qərar, nəzarət və nəticəyə çevirən həllər təqdim edirik."
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((s, i) => (
              <ServiceCard key={s.id} {...s} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Hansı xidmət sizin üçün uyğundur?"
        subtitle="Pulsuz konsultasiya ilə ehtiyaclarınızı birlikdə müəyyənləşdirək"
        buttonText="Pulsuz konsultasiya"
      />
    </div>
  );
}
