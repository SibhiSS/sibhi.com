"use client";

import { motion } from "framer-motion";
import { 
  SiPython, 
  SiCplusplus, 
  SiKalilinux, 
  SiDocker, 
  SiCloudflare, 
  SiMysql, 
  SiBurpsuite, 
  SiPytorch 
} from "react-icons/si";

const logos = [
  { name: "Python", Icon: SiPython },
  { name: "C++", Icon: SiCplusplus },
  { name: "Kali", Icon: SiKalilinux },
  { name: "Docker", Icon: SiDocker },
  { name: "Cloudflare", Icon: SiCloudflare },
  { name: "MySQL", Icon: SiMysql },
  { name: "Burp Suite", Icon: SiBurpsuite },
  { name: "PyTorch", Icon: SiPytorch },
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
                duration: 35,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex items-center gap-16 md:gap-24 px-8"
            >
              {logos.map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="flex items-center justify-center opacity-70 hover:opacity-100 transition-all duration-500"
                  style={{
                    width: "var(--logo-size)",
                    height: "var(--logo-size)",
                    // @ts-ignore
                    "--logo-size": "clamp(36px, 6vw, 48px)",
                  }}
                >
                  <logo.Icon className="w-full h-full text-white" />
                </div>
              ))}
            </motion.div>

            {/* Duplicate set for seamless loop */}
            <motion.div
              animate={{ x: ["0%", "-100%"] }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex items-center gap-16 md:gap-24 px-8"
            >
              {logos.map((logo, index) => (
                <div
                  key={`${logo.name}-dup-${index}`}
                  className="flex items-center justify-center opacity-70 hover:opacity-100 transition-all duration-500"
                  style={{
                    width: "var(--logo-size)",
                    height: "var(--logo-size)",
                    // @ts-ignore
                    "--logo-size": "clamp(36px, 6vw, 48px)",
                  }}
                >
                  <logo.Icon className="w-full h-full text-white" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}


