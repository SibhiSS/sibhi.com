"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { hero } from "@/data/portfolio";

function AnimatedName() {
  const letters = hero.name.split("");

  return (
    <motion.h1
      className="hero-name flex items-center justify-start flex-wrap"
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

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const count = Math.min(60, Math.floor(window.innerWidth / 25));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.05,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.03 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Atmospheric Background */}
      <div className="absolute inset-0">
        {/* Base Gradient Layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#080808] to-[#000000]" />

        {/* Lighting Accents */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.015)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(120,130,140,0.06)_0%,transparent_60%)] blur-3xl pointer-events-none" />

        {/* Particle Field */}
        <ParticleField />

        {/* Subtle Grid */}
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
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 items-center h-screen pt-20 md:pt-0"
      >
        {/* Left Side — Typography */}
        <div className="flex flex-col items-start text-left z-20">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/60 text-base md:text-lg font-light tracking-wide mb-2 pl-2"
          >
            Hi, I am
          </motion.div>

          {/* Name */}
          <AnimatedName />

          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 pl-2"
          >
            <span className="inline-block text-[10px] md:text-xs tracking-[0.35em] uppercase text-white/30 font-light">
              Computer Science Engineering · VIT Chennai
            </span>
          </motion.div>

          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-24 h-[1px] bg-gradient-to-r from-white/20 to-transparent my-8 origin-left"
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/35 text-sm md:text-base lg:text-lg tracking-[0.08em] font-light max-w-md leading-relaxed"
          >
            {hero.tagline}
          </motion.p>

          {/* CTA Buttons */}
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

        {/* Right Side — Image */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute md:relative right-0 bottom-0 md:bottom-auto w-full h-[60vh] md:h-[80vh] opacity-30 md:opacity-100 pointer-events-none flex items-end justify-end md:pl-10 pb-10"
        >
          <div className="relative w-full md:w-[90%] h-full rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
            {/* Fading gradient at the bottom inside the rounded container */}
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
