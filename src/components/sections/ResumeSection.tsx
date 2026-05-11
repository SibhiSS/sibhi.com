"use client";

import { motion } from "framer-motion";
import { resumeUrl } from "@/data/portfolio";
import { fadeUp } from "@/lib/animations";

export default function ResumeSection() {
  return (
    <section id="resume" className="relative py-32 md:py-44">
      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center text-center"
        >
          {/* Glass Card */}
          <div className="relative p-12 md:p-16 rounded-3xl border border-white/[0.04] bg-white/[0.01] max-w-2xl w-full overflow-hidden">
            {/* Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-[radial-gradient(ellipse,rgba(255,255,255,0.02)_0%,transparent_60%)] blur-2xl" />

            <div className="relative">
              <span className="text-[10px] tracking-[0.35em] uppercase text-white/25 font-light">
                Document
              </span>

              <h2 className="mt-4 text-3xl md:text-4xl font-light text-white/90 tracking-tight">
                Résumé
              </h2>

              <p className="mt-4 text-sm text-white/30 font-light max-w-md mx-auto leading-relaxed">
                A comprehensive overview of my academic background, technical
                skills, projects, and research experience.
              </p>

              <motion.a
                href={resumeUrl}
                download
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="inline-flex items-center gap-3 mt-10 px-10 py-4 text-xs tracking-[0.2em] uppercase text-white/70 border border-white/[0.08] rounded-full hover:bg-white/[0.04] hover:text-white/90 hover:border-white/[0.15] transition-all duration-500"
              >
                {/* Download Icon */}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                Download PDF
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
