"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative py-12 md:py-16 border-t border-white/[0.03]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-6">
            <span
              className="text-white/30 text-lg tracking-wider font-light"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Sibhi S
            </span>
          </div>

          <p className="text-[10px] tracking-[0.2em] uppercase text-white/15">
            © {year} · Crafted with precision
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
