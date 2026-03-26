import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/SectionHeader";

const serviceOptions = [
  "Metric Bİ",
  "Metric Alert",
  "Metric Aİ",
  "Metric Fraud",
  "Digər",
];

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  };

  return (
    <div className="pt-16">
      <section className="hero-gradient section-padding">
        <div className="container">
          <SectionHeader badge="Əlaqə" title="Bizimlə əlaqə" subtitle="Layihəniz haqqında danışmaq üçün bizimlə əlaqə saxlayın" />
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-5">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="mb-6 text-xl font-bold">Əlaqə məlumatları</h3>
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><Mail size={18} /></div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">info@metric.az</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><Phone size={18} /></div>
                    <div>
                      <p className="text-sm text-muted-foreground">Telefon</p>
                      <p className="font-medium">+994 51 652 49 45</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><MapPin size={18} /></div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ünvan</p>
                      <p className="font-medium">Ajami Nakhchivani, Bakı</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <div className="overflow-hidden rounded-xl border border-border">
                <iframe
                  src="https://www.google.com/maps?q=Metric+Analytics,+Ajami+Nakhchivani,+Baku,+Azerbaijan&output=embed"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Metric Analytics - Ajami Nakhchivani, Bakı"
                />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-3">
              {submitted ? (
                <div className="flex h-full items-center justify-center rounded-xl border border-border bg-card p-12 text-center">
                  <div>
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Send size={28} />
                    </div>
                    <h3 className="text-xl font-bold">Müraciətiniz göndərildi!</h3>
                    <p className="mt-2 text-muted-foreground">Ən qısa zamanda sizinlə əlaqə saxlayacağıq.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glow-card space-y-5 p-6 md:p-8">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Ad Soyad *</label>
                      <input required className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Şirkət</label>
                      <input className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Email *</label>
                      <input type="email" required className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Telefon</label>
                      <input type="tel" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Hansı xidmət ilə maraqlanırsınız?</label>
                    <select className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                      <option value="">Seçin</option>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Mesaj *</label>
                    <textarea required rows={4} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
                  </div>
                  <Button type="submit" size="lg" className="w-full active:scale-[0.97]" disabled={loading}>
                    {loading ? "Göndərilir..." : "Göndər"}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
