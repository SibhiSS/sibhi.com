"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import GitHubContribGraph from "@/components/GitHubContribGraph";

export default function GitHubSection() {
  return (
    <section className="relative py-12 md:py-22">
      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        {/* Header — same style as other sections */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:mb-20"
        >
          <span className="text-[10px] tracking-[0.35em] uppercase text-white/25 font-light">
            Open Source
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-light text-white/90 leading-tight tracking-tight">
            GitHub <span className="text-white/50">Activity</span>
          </h2>
        </motion.div>

        {/* Streak + message row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
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
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/20 mb-2">Daily Progress</span>
            <h3 className="text-xl font-light text-white/80 leading-relaxed">
              Consistency is <span className="text-emerald-400/80 italic">everything</span>.
              Tracking daily progress across cybersecurity and development repos.
            </h3>
          </div>
        </motion.div>

        {/* Contribution Graph — styled to match site */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <GitHubContribGraph />
        </motion.div>
      </div>
    </section>
  );
}
