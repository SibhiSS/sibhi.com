"use client";

import { motion } from "framer-motion";
import { clubs } from "@/data/portfolio";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function ClubsSection() {
  return (
    <section id="clubs" className="relative py-32 md:py-44">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(255,255,255,0.005)_0%,transparent_50%)]" />

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
            Community
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-light text-white/90 tracking-tight">
            Leadership
            <span className="text-white/40 ml-3">& Clubs</span>
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        >
          {clubs.map((club, i) => (
            <motion.div
              key={club.id}
              variants={fadeUp}
              whileHover={{
                y: -6,
                transition: {
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                },
              }}
              className="group relative p-6 md:p-8 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.08] transition-all duration-700"
            >
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/15 font-mono">
                0{i + 1}
              </span>

              <h3 className="mt-4 text-base md:text-lg font-light text-white/75 tracking-tight group-hover:text-white/90 transition-colors duration-500">
                {club.name}
              </h3>

              <p className="text-xs text-white/30 font-light mt-1 tracking-wide">
                {club.role}
              </p>

              {club.period && (
                <p className="text-[10px] text-white/15 font-mono mt-2 tracking-wide">
                  {club.period}
                </p>
              )}

              <div className="w-6 h-[1px] bg-white/[0.05] my-4 group-hover:w-10 group-hover:bg-white/10 transition-all duration-700" />

              <p className="text-xs text-white/25 font-light leading-relaxed group-hover:text-white/40 transition-colors duration-500">
                {club.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
