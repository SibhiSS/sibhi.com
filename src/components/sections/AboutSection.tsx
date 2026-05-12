"use client";

import { motion } from "framer-motion";
import { about } from "@/data/portfolio";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-16 md:py-22">
      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          {/* Left — Label */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-4"
          >
            <span className="text-[10px] tracking-[0.35em] uppercase text-white/25 font-light">
              About
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-white/90 leading-tight tracking-tight">
              Building at the
              <br />
              <span className="text-white/50">frontier.</span>
            </h2>

            {/* Decorative element */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="hidden lg:block w-[1px] h-32 bg-gradient-to-b from-white/10 to-transparent mt-10 origin-top"
            />
          </motion.div>

          {/* Right — Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-8 space-y-8"
          >
            {about.paragraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className="text-white/40 text-base md:text-lg font-light leading-[1.8] tracking-wide"
              >
                {paragraph}
              </motion.p>
            ))}

            {/* Stats / Highlights */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-white/[0.04]"
            >
              {[
                { label: "Focus Areas", value: "3+" },
                { label: "Projects", value: "10+" },
                { label: "Research", value: "Active" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl md:text-3xl font-light text-white/70 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[10px] tracking-[0.2em] uppercase text-white/25 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* GitHub Stats API - Full Width */}
        <motion.div 
          variants={fadeUp} 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 md:mt-24 space-y-6"
        >
          {/* Top Section: Streak Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a 
              href="https://github.com/SibhiSS" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-300 rounded-2xl border border-white/[0.05] bg-white/[0.01] p-4 md:p-6"
            >
              <img
                src="https://github-readme-streak-stats.herokuapp.com/?user=SibhiSS&theme=transparent&hide_border=true&ring=34d399&fire=34d399&currStreakNum=ffffff&sideNums=ffffff&currStreakLabel=a3a3a3&sideLabels=a3a3a3&dates=737373&stroke=ffffff20&v=4"
                alt="Sibhi's GitHub Streak Stats"
                className="w-full object-contain"
              />
            </a>
            
            <div className="flex flex-col justify-center p-8 rounded-2xl border border-white/[0.05] bg-white/[0.01]">
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/20 mb-2">GitHub Activity</span>
              <h3 className="text-xl font-light text-white/80 leading-relaxed">
                Consistency is <span className="text-emerald-400/80 italic">everything</span>. 
                Tracking daily progress across cybersecurity and development repos.
              </h3>
            </div>
          </div>

          {/* Bottom Section: Contribution Graph (Exact GitHub UI) */}
          <div className="w-full rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6 md:p-10 overflow-hidden group">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/20 font-medium">Live Contribution Stream</span>
              </div>
              <a 
                href="https://github.com/SibhiSS" 
                target="_blank" 
                rel="noreferrer" 
                className="text-[10px] tracking-[0.2em] uppercase text-white/40 hover:text-white/80 transition-colors"
              >
                View Profile →
              </a>
            </div>

            {/* The "GitHub Frame" */}
            <div className="bg-[#0d1117] rounded-xl border border-[#30363d] p-6 md:p-8">
              <div className="mb-6 px-1">
                <span className="text-sm md:text-base font-normal text-[#e6edf3]">199 contributions in the last year</span>
              </div>

              <div className="relative w-full overflow-x-auto scrollbar-hide rounded-lg border border-[#30363d] bg-[#0d1117] p-4">
                <img
                  src="https://ghchart.rshah.org/34d399/SibhiSS"
                  alt="Sibhi's GitHub Contribution Graph"
                  className="min-w-[850px] w-full object-contain"
                  style={{ filter: "invert(1) hue-rotate(180deg) brightness(1.15) contrast(1.05)" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
