import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useTranslation } from "react-i18next";
import { testimonials } from "@/data/mockData";

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 11000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const tData = testimonials[current];

  return (
    <div className="relative mx-auto max-w-3xl">
      <div className="glow-card p-8 md:p-12">
        <Quote aria-hidden="true" focusable="false" className="mb-6 text-primary/30" size={40} />
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="mb-8 text-lg md:text-xl" style={{ lineHeight: "1.8" }}>"{t(`testimonialQuotes.${current}`)}"</p>
          <div className="flex items-center gap-4">
            {tData.logo && (
              <img src={tData.logo} alt={tData.company} className="h-10 w-10 rounded-full border border-border object-contain bg-white p-0.5" />
            )}
            <div>
              <p className="font-semibold">{tData.author}</p>
              <p className="text-sm text-muted-foreground">{tData.role}, {tData.company}</p>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="mt-6 flex items-center justify-center gap-3">
        <button type="button" onClick={prev} aria-label={t("a11y.prevTestimonial")} className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-primary hover:text-primary-foreground active:scale-95">
          <ChevronLeft aria-hidden="true" focusable="false" size={18} />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              type="button"
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={t("a11y.showTestimonial", { n: i + 1 })}
              aria-current={i === current ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"}`}
            />
          ))}
        </div>
        <button type="button" onClick={next} aria-label={t("a11y.nextTestimonial")} className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-primary hover:text-primary-foreground active:scale-95">
          <ChevronRight aria-hidden="true" focusable="false" size={18} />
        </button>
      </div>
    </div>
  );
}
