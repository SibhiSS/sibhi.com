"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/portfolio";
import { fadeUp, staggerContainer } from "@/lib/animations";

function SkillCard({
  category,
  items,
  index,
}: {
  category: string;
  items: string[];
  index: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
      className="group relative h-full w-full p-6 md:p-8 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.08] transition-all duration-700"
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Index */}
      <div className="relative">
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/15 font-mono">
          0{index + 1}
        </span>

        <h3 className="mt-3 text-base md:text-lg font-light text-white/70 tracking-wide group-hover:text-white/90 transition-colors duration-500">
          {category}
        </h3>

        <div className="w-8 h-[1px] bg-white/[0.06] mt-4 mb-5 group-hover:w-12 group-hover:bg-white/10 transition-all duration-700" />

        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <span
              key={item}
              className="px-3 py-1.5 text-[10px] md:text-[11px] tracking-[0.1em] text-white/30 border border-white/[0.04] rounded-full group-hover:text-white/50 group-hover:border-white/[0.08] transition-all duration-500"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-12 md:py-22">
      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:mb-20"
        >
          <span className="text-[10px] tracking-[0.35em] uppercase text-white/25 font-light">
            Capabilities
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-light text-white/90 tracking-tight">
            Technical <span className="text-white/40">Expertise</span>
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap justify-center gap-4 md:gap-6"
        >
          {skills.map((skill, i) => (
            <div
              key={skill.category}
              className="flex w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] min-w-[280px]"
            >
              <SkillCard
                category={skill.category}
                items={skill.items}
                index={i}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
