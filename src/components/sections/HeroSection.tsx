"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { hero } from "@/data/portfolio";

function AnimatedName() {
  const letters = hero.name.split("");

  return (
    <motion.h1
      className="hero-name flex items-center justify-center md:justify-start flex-wrap text-center md:text-left"
      aria-label={hero.name}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 120, rotateX: -80 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 1,
            delay: 0.3 + i * 0.07,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`inline-block ${letter === " " ? "w-[0.3em]" : ""}`}
          style={{ perspective: "800px" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-0"
    >
      {/* Atmospheric Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#080808] to-[#000000]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.015)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(120,130,140,0.06)_0%,transparent_60%)] blur-3xl pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity, y, scale }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:grid md:grid-cols-2 items-center justify-center gap-12"
      >
        {/* Profile Image — Top on Mobile, Right on Desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 md:order-2 w-full max-w-[320px] md:max-w-none aspect-square md:aspect-auto md:h-[70vh] flex items-center justify-center pointer-events-none"
        >
          <div className="relative w-full h-full rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#000000] via-[#000000]/50 to-transparent z-10" />
            <Image
              src="/profile-main.jpg"
              alt="Sibhi S"
              fill
              className="object-cover object-center grayscale opacity-90"
              priority
            />
          </div>
        </motion.div>

        {/* Typography — Bottom on Mobile, Left on Desktop */}
        <div className="order-2 md:order-1 flex flex-col items-center md:items-start text-center md:text-left z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/60 text-base md:text-lg font-light tracking-wide mb-2"
          >
            Hi, I am
          </motion.div>

          <AnimatedName />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6"
          >
            <span className="block text-[10px] md:text-xs tracking-[0.35em] uppercase text-white/30 font-light mb-3">
              Computer Science Engineering · VIT Chennai
            </span>
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs md:text-sm text-white/40 font-light tracking-wide">
              <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
              <span>Exploring AI & Security</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-24 h-[1px] bg-gradient-to-r from-white/20 to-transparent my-8 origin-center md:origin-left"
          />

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/35 text-sm md:text-base lg:text-lg tracking-[0.08em] font-light max-w-md leading-relaxed"
          >
            {hero.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6 mt-12"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative px-8 py-3 text-xs tracking-[0.2em] uppercase text-white/80 overflow-hidden rounded-full border border-white/10 hover:border-white/20 transition-all duration-500"
            >
              <span className="relative z-10">View Work</span>
              <div className="absolute inset-0 bg-white/[0.03] group-hover:bg-white/[0.07] transition-all duration-500" />
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-xs tracking-[0.2em] uppercase text-white/40 hover:text-white/70 transition-all duration-500"
            >
              Contact
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-white/20">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-8 bg-gradient-to-b from-white/20 to-transparent"
        />
      </motion.div>
    </section>
  );
}
