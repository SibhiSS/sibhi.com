"use client";

import { motion } from "framer-motion";
import { research } from "@/data/portfolio";
import { fadeUp, staggerContainer } from "@/lib/animations";

const statusStyles: Record<string, { label: string; color: string }> = {
  ongoing: { label: "Ongoing", color: "text-emerald-400/40" },
  completed: { label: "Completed", color: "text-blue-400/40" },
  published: { label: "Published", color: "text-amber-400/40" },
  exploring: { label: "Exploring", color: "text-purple-400/40" },
};

export default function ResearchSection() {
  return (
    <section id="research" className="relative py-16 md:py-22">
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
            Explorations
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-light text-white/90 tracking-tight">
            Research <span className="text-white/40">& Inquiry</span>
          </h2>
          <p className="mt-4 text-sm text-white/25 font-light max-w-xl leading-relaxed">
            Active areas of intellectual exploration and technical inquiry at the
            intersection of security, quantum systems, and intelligent
            architectures.
          </p>
        </motion.div>

        {/* Research Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-4 md:space-y-6"
        >
          {research.map((entry, i) => (
            <motion.div
              key={entry.id}
              variants={fadeUp}
              whileHover={{
                x: 8,
                transition: {
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                },
              }}
              className="group relative p-6 md:p-8 rounded-2xl border border-white/[0.03] bg-white/[0.008] hover:bg-white/[0.02] hover:border-white/[0.06] transition-all duration-700"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                {/* Index + Status */}
                <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-2 md:min-w-[80px]">
                  <span className="text-[10px] tracking-[0.3em] text-white/15 font-mono">
                    0{i + 1}
                  </span>
                  <span
                    className={`text-[9px] tracking-[0.2em] uppercase ${
                      statusStyles[entry.status]?.color || "text-white/30"
                    }`}
                  >
                    {statusStyles[entry.status]?.label || entry.status}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white/20">
                    {entry.area}
                  </span>
                  <h3 className="mt-2 text-lg md:text-xl font-light text-white/75 tracking-tight group-hover:text-white/90 transition-colors duration-500">
                    {entry.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/30 font-light leading-relaxed">
                    {entry.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center text-white/10 group-hover:text-white/30 transition-colors duration-500">
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
