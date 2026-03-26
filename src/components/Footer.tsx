import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import metricLogo from "@/assets/metric-icon.png";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container section-padding-sm">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
              <img src={metricLogo} alt="Metric" className="h-7 w-auto" />
              <span>metric</span>
            </Link>
            <p className="mt-2 text-sm font-medium text-primary">Datalar danışır</p>
            <p className="mt-2 text-sm text-muted-foreground" style={{ lineHeight: "1.7" }}>
              Analitik həllərimizdən faydalanaraq biznesinizi inkişaf etdirin.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Səhifələr</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                ["/services", "Xidmətlər"],
                ["/blog", "Bloq"],
                ["/about", "Haqqımızda"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link to={href} className="text-muted-foreground transition-colors hover:text-foreground">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Xidmətlər</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                "Metric BI",
                "Metric Alert",
                "Metric AI",
                "Metric Fraud",
              ].map((s) => (
                <li key={s} className="text-muted-foreground">{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Əlaqə</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail size={14} className="text-primary" /> info@metric.az
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone size={14} className="text-primary" /> +994 51 652 49 45
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin size={14} className="mt-0.5 text-primary" /> Ajami Nakhchivani, Bakı
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Metric. Bütün hüquqlar qorunur.
        </div>
      </div>
    </footer>
  );
}
