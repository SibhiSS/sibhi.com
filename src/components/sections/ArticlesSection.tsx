"use client";

import { motion } from "framer-motion";
import { articles } from "@/data/portfolio";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { ArrowUpRight } from "lucide-react";

export default function ArticlesSection() {
  if (!articles || articles.length === 0) return null;

  return (
    <section id="articles" className="relative py-12 md:py-24 border-t border-white/[0.04]">
      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[10px] tracking-[0.35em] uppercase text-white/25 font-light">
                Insights
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-light text-white/90 tracking-tight">
                Articles & <span className="text-white/50">Case Studies.</span>
              </h2>
            </div>
            <p className="text-white/40 max-w-md text-sm leading-relaxed">
              Deep dives into machine learning, quantum systems, and engineering challenges.
            </p>
          </motion.div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article, index) => (
              <motion.a
                key={article.id}
                href={article.link || "#"}
                target={article.link ? "_blank" : undefined}
                rel={article.link ? "noopener noreferrer" : undefined}
                variants={fadeUp}
                className="group relative flex flex-col justify-between p-8 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors duration-500 overflow-hidden"
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex-grow">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-xs text-white/40 tracking-wider uppercase font-light">
                      {article.date}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-white/70 transition-colors duration-300" />
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-light text-white/80 mb-4 leading-snug group-hover:text-white transition-colors duration-300">
                    {article.title}
                  </h3>
                  
                  <p className="text-white/40 text-sm leading-relaxed mb-8">
                    {article.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-[10px] uppercase tracking-wider text-white/30 bg-white/[0.03] rounded-full border border-white/[0.05]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
