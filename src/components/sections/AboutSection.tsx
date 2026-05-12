"use client";

import { motion } from "framer-motion";
import { about } from "@/data/portfolio";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-12 md:py-22">
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
      </div>
    </section>
  );
}
