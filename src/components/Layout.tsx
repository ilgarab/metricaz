import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import FloatingDataIcons from "@/components/FloatingDataIcons";
import ScrollToTop from "@/components/ScrollToTop";
import Seo from "@/components/Seo";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="relative flex min-h-screen flex-col">
      <Seo />
      <FloatingDataIcons />
      <Navbar />
      <main className="relative z-[3] flex-1">{children}</main>
      <Footer />
      <aside aria-label={t("a11y.quickActions")}>
        <WhatsAppButton />
        <ScrollToTop />
      </aside>
    </div>
  );
}
