import SectionHeader from "@/components/SectionHeader";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/data/mockData";

export default function Blog() {
  return (
    <div className="pt-16">
      <section className="hero-gradient section-padding">
        <div className="container">
          <SectionHeader badge="Bloq" title="Bloq" subtitle="Data analitikası sahəsindəki ən son trendlər, tövsiyələr və bizim təcrübəmiz" />
        </div>
      </section>
      <section className="section-padding">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((p, i) => (
              <BlogCard key={p.id} {...p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
