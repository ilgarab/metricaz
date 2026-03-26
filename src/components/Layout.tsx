import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import FloatingDataIcons from "@/components/FloatingDataIcons";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="relative flex min-h-screen flex-col">
      <FloatingDataIcons />
      <Navbar />
      <main className="relative z-[3] flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
