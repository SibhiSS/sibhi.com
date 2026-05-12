"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const logos = [
  { name: "Python", src: "/python-logo.png" },
  { name: "C++", src: "/cpp-logo.png" },
  { name: "Kali", src: "/kali-logo.png", scale: 1.1 },
  { name: "Docker", src: "/docker-logo.png", scale: 1.1 },
  { name: "Cloudflare", src: "/cloudflare-logo.png", scale: 1.1 },
  { name: "MySQL", src: "/mysql-logo.png", scale: 1.1 },
  { name: "Burp Suite", src: "/burpsuite-logo.png", scale: 1.1 },
  { name: "PyTorch", src: "/pytorch-logo.jpg", scale: 1.1 },
];

export default function LogoMarquee() {
  return (
    <div className="relative pt-4 pb-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div 
          className="overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          }}
        >
          <div className="flex w-max">
          {/* First set of logos */}
          <motion.div
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex items-center gap-16 md:gap-24 px-8"
          >
            {logos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="relative invert grayscale brightness-200 opacity-100 transition-all duration-500 mix-blend-screen"
                style={{
                  width: "var(--logo-size)",
                  height: "var(--logo-size)",
                  transform: `scale(${logo.scale || 1})`,
                  // @ts-ignore
                  "--logo-size": "clamp(80px, 15vw, 110px)",
                }}
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
            ))}
          </motion.div>

          {/* Duplicate set for seamless loop */}
          <motion.div
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex items-center gap-16 md:gap-24 px-8"
          >
            {logos.map((logo, index) => (
              <div
                key={`${logo.name}-dup-${index}`}
                className="relative invert grayscale brightness-200 opacity-100 hover:scale-110 transition-all duration-500 mix-blend-screen"
                style={{
                  width: "var(--logo-size)",
                  height: "var(--logo-size)",
                  transform: `scale(${logo.scale || 1})`,
                  // @ts-ignore
                  "--logo-size": "clamp(80px, 15vw, 110px)",
                }}
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  </div>
);
}


