import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image?: string;
  index?: number;
}

export default function BlogCard({ id, title, excerpt, category, date, readTime, image, index = 0 }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/blog/${id}`} className="group block h-full">
        <div className="glow-card flex h-full flex-col overflow-hidden">
          <div className="relative h-44 overflow-hidden bg-gradient-to-br from-accent/20 to-primary/10">
            {image ? (
              <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-5xl font-bold text-primary/20">M</span>
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col p-6">
            <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">{category}</span>
              <span className="flex items-center gap-1"><Calendar size={12} /> {date}</span>
              <span className="flex items-center gap-1"><Clock size={12} /> {readTime}</span>
            </div>
            <h3 className="mb-2 text-lg font-semibold tracking-tight transition-colors group-hover:text-primary">{title}</h3>
            <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-3" style={{ lineHeight: "1.7" }}>{excerpt}</p>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-all duration-200 group-hover:gap-3">
              Oxu <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
