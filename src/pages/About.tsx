import { motion } from "framer-motion";
import { Target, Eye, Crosshair, Shield, Compass, BarChart3 } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import CTABanner from "@/components/CTABanner";
import { teamMembers, companyInfo } from "@/data/mockData";
import partnersImg from "@/assets/partners.png";

const features = [
  { icon: Crosshair, title: "Biznesə uyğun həllər", desc: "Hər sektorun spesifik ehtiyacına uyğunlaşdırılmış analitik sistemlər" },
  { icon: Compass, title: "Real təcrübə", desc: "Müxtəlif şirkətlərdə tətbiq olunmuş və nəticə vermiş həllər" },
  { icon: BarChart3, title: "360 dərəcə analitika", desc: "Daha ağıllı və sürətli qərar, daha güclü nəzarət və daha aydın idarəetmə imkanı yaradırıq" },
  { icon: Shield, title: "Etibarlılıq və məxfilik", desc: "Məlumat təhlükəsizliyi və məxfilik yanaşmamızın əsas hissəsidir" },
];

export default function About() {
  return (
    <div className="pt-16">
      <section className="hero-gradient section-padding">
        <div className="container">
          <SectionHeader badge="Haqqımızda" title="Haqqımızda" subtitle="Metric Analytics - Datalar danışır" />
        </div>
      </section>

      {/* Story with image */}
      <section className="section-padding">
        <div className="container">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <img
                src={companyInfo.aboutImage}
                alt="Metric Analytics komandası"
                className="w-full rounded-2xl border border-border shadow-lg"
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="mb-4 text-2xl font-bold">Metric Analytics – Şirkətimiz Haqqında</h2>
              <p className="mb-4 text-muted-foreground" style={{ lineHeight: "1.8" }}>
                {companyInfo.description}
              </p>
              <p className="mb-4 text-muted-foreground" style={{ lineHeight: "1.8" }}>
                {companyInfo.philosophy}
              </p>
              <p className="text-muted-foreground" style={{ lineHeight: "1.8" }}>
                {companyInfo.approach}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding-sm bg-card/30">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glow-card p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent"><Eye size={24} /></div>
              <h3 className="mb-3 text-xl font-bold">Visionumuz</h3>
              <p className="text-muted-foreground" style={{ lineHeight: "1.7" }}>Metric-i dünyanın müxtəlif ölkələrindəki bizneslərin asanlıqla inteqrasiya olaraq, strateji və operativ qərarlarını bizim analitik ekosistemimiz üzərindən verdiyi çevik və universal bir analitika platformasına çevirmək.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glow-card p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary"><Target size={24} /></div>
              <h3 className="mb-3 text-xl font-bold">Missiyamız</h3>
              <p className="text-muted-foreground" style={{ lineHeight: "1.7" }}>Müxtəlif sektorlarda fəaliyyət göstərən bizneslərə avtomatlaşdırılmış analitik həllər təqdim edərək onların daha ağıllı qərarlar verməsini, vaxta və resurslara qənaət etməsini və dayanıqlı inkişafını təmin edirik.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container">
          <SectionHeader title="Komandamız" subtitle="Təcrübəli mütəxəssislərdən ibarət komandamız" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glow-card p-6 text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/10 text-xl font-bold text-primary">
                  {m.initials}
                </div>
                <h3 className="font-semibold">{m.name}</h3>
                <p className="text-sm text-muted-foreground">{m.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="section-padding bg-card/30">
        <div className="container">
          <SectionHeader title="Niyə biz?" subtitle="Metric-i seçməyiniz üçün əsas səbəblər" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glow-card p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary"><f.icon size={24} /></div>
                <h3 className="mb-2 font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section-padding-sm">
        <div className="container">
          <SectionHeader title="Tərəfdaşlarımız" />
          <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 dark:bg-white/10">
            <img
              src={partnersImg}
              alt="Tərəfdaşlarımız"
              className="w-full dark:brightness-110"
            />
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
