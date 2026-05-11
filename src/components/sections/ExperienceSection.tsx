"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/portfolio";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative py-32 md:py-44">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(255,255,255,0.005)_0%,transparent_50%)]" />

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
            Journey
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-light text-white/90 tracking-tight">
            Experience
            <span className="text-white/40 ml-3">& Growth</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative"
        >
          {/* Timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute left-0 md:left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/[0.06] via-white/[0.04] to-transparent origin-top"
          />

          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                variants={fadeUp}
                className="group relative pl-8 md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-8 top-2 -translate-x-1/2">
                  <div className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-white/30 transition-colors duration-500" />
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-white/5 animate-ping" />
                </div>

                <div className="p-6 md:p-8 rounded-2xl border border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/[0.06] transition-all duration-700">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-white/20 font-mono">
                    {exp.period}
                  </span>

                  <h3 className="mt-3 text-lg md:text-xl font-light text-white/80 tracking-tight">
                    {exp.role}
                  </h3>

                  <p className="text-sm text-white/35 font-light mt-1">
                    {exp.organization}
                  </p>

                  <p className="text-sm text-white/30 font-light leading-relaxed mt-4">
                    {exp.description}
                  </p>

                  {exp.tags && (
                    <div className="flex flex-wrap gap-2 mt-5">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-[9px] tracking-[0.1em] text-white/20 border border-white/[0.03] rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
