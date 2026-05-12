"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { education } from "@/data/portfolio";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function EducationSection() {
  return (
    <section id="education" className="relative py-16 md:py-22">
      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:mb-20 text-right md:text-left"
        >
          <span className="text-[10px] tracking-[0.35em] uppercase text-white/25 font-light">
            Academics
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-light text-white/90 tracking-tight">
            Education
            <span className="text-white/40 ml-3">& Foundations</span>
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
            {education.map((edu) => (
              <motion.div
                key={edu.id}
                variants={fadeUp}
                className="group relative pl-8 md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-8 top-2 -translate-x-1/2">
                  <div className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-white/30 transition-colors duration-500" />
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-white/5 animate-ping" />
                </div>

                <div className="p-6 md:p-8 rounded-2xl border border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/[0.08] transition-all duration-500 overflow-hidden">
                  <div className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-4 md:gap-5">
                      {/* Institution Logo */}
                      {edu.logo && (
                        <div className="relative w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-full overflow-hidden bg-white shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/10">
                          <Image
                            src={edu.logo}
                            alt={`${edu.institution} logo`}
                            fill
                            className="object-contain p-2 hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      )}
                      
                      {/* Text Content */}
                      <div className="-mt-1 md:-mt-2">
                        <span className="text-[10px] tracking-[0.25em] uppercase text-white/20 font-mono">
                          {edu.period}
                        </span>
                        <h3 className="mt-0.5 md:mt-1 text-lg md:text-xl font-light text-white/80 tracking-tight">
                          {edu.degree}
                        </h3>
                        <p className="text-sm text-white/35 font-light mt-1">
                          {edu.institution}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
