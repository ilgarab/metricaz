import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface CTABannerProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function CTABanner({
  title = "Biznesinizdə analitikanın real gücünü ortaya çıxaraq",
  subtitle = "Pulsuz konsultasiya üçün bizimlə əlaqə saxlayın və sizin üçün ən uyğun həlli təklif edək.",
  buttonText = "Bizimlə əlaqə",
  buttonLink = "/contact",
}: CTABannerProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="section-padding"
    >
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-card to-accent/10 p-10 md:p-16 text-center border border-primary/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.1),transparent_60%)]" />
          <div className="relative z-10">
            <h2 className="text-balance text-2xl font-bold tracking-tight md:text-4xl" style={{ lineHeight: "1.15" }}>
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{subtitle}</p>
            <Link to={buttonLink}>
              <Button size="lg" className="mt-8 active:scale-[0.97]">{buttonText}</Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
