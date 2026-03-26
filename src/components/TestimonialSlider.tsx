import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/mockData";

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const t = testimonials[current];

  return (
    <div className="relative mx-auto max-w-3xl">
      <div className="glow-card p-8 md:p-12">
        <Quote className="mb-6 text-primary/30" size={40} />
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="mb-8 text-lg md:text-xl" style={{ lineHeight: "1.8" }}>"{t.quote}"</p>
          <div className="flex items-center gap-4">
            {t.logo && (
              <img src={t.logo} alt={t.company} className="h-10 w-10 rounded-full border border-border object-contain bg-white p-0.5" />
            )}
            <div>
              <p className="font-semibold">{t.author}</p>
              <p className="text-sm text-muted-foreground">{t.role}, {t.company}</p>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="mt-6 flex items-center justify-center gap-3">
        <button onClick={prev} className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-primary hover:text-primary-foreground active:scale-95">
          <ChevronLeft size={18} />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"}`}
            />
          ))}
        </div>
        <button onClick={next} className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-primary hover:text-primary-foreground active:scale-95">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
