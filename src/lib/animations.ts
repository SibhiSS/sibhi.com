// ─────────────────────────────────────────────
// Reusable Animation Variants & Utilities
// Framer Motion presets for cinematic feel
// ─────────────────────────────────────────────

import type { Variants, Transition } from "framer-motion";

// ── Premium Easing Curves ──
export const ease = {
  smooth: [0.25, 0.1, 0.25, 1] as const,
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.76, 0, 0.24, 1] as const,
  spring: { type: "spring", stiffness: 100, damping: 20 } as const,
  springGentle: { type: "spring", stiffness: 60, damping: 15 } as const,
};

// ── Cinematic Transitions ──
export const transition: Record<string, Transition> = {
  slow: { duration: 1.2, ease: ease.out as [number, number, number, number] },
  medium: { duration: 0.8, ease: ease.out as [number, number, number, number] },
  fast: { duration: 0.5, ease: ease.out as [number, number, number, number] },
  spring: ease.spring,
  springGentle: ease.springGentle,
};

// ── Reveal Animation Variants ──
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// ── Stagger Container ──
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// ── Glass Card Hover ──
export const glassCardHover = {
  rest: {
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

// ── Magnetic Hover (for buttons) ──
export const magneticHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  },
  tap: { scale: 0.97 },
};

// ── Hero Letter Animation ──
export const letterAnimation: Variants = {
  hidden: { opacity: 0, y: 100, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.05,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

// ── Line Reveal ──
export const lineReveal: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

// ── Float Animation (ambient) ──
export const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
  },
};
