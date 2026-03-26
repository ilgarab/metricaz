import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { blogPosts } from "@/data/mockData";
import BlogCard from "@/components/BlogCard";

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Məqalə tapılmadı</h1>
          <Link to="/blog" className="mt-4 inline-block text-primary hover:underline">Bloqa qayıt</Link>
        </div>
      </div>
    );
  }

  const related = blogPosts.filter((p) => p.id !== id).slice(0, 3);

  return (
    <div className="pt-16">
      <section className="hero-gradient section-padding">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto max-w-3xl">
            <Link to="/blog" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={14} /> Bloq
            </Link>
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{post.category}</span>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl" style={{ lineHeight: "1.15" }}>{post.title}</h1>
            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
              <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {post.image && (
        <section className="container -mt-8 mb-8">
          <div className="mx-auto max-w-3xl">
            <img src={post.image} alt={post.title} className="w-full rounded-2xl border border-border shadow-lg" />
          </div>
        </section>
      )}

      <section className="section-padding">
        <div className="container">
          <div className="prose prose-lg mx-auto max-w-3xl text-foreground">
            {post.content ? (
              post.content.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-muted-foreground" style={{ lineHeight: "1.8" }}>
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-muted-foreground" style={{ lineHeight: "1.8" }}>{post.excerpt}</p>
            )}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-padding bg-card/30">
          <div className="container">
            <h2 className="mb-8 text-2xl font-bold">Əlaqəli məqalələr</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((p, i) => (
                <BlogCard key={p.id} {...p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
