"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { experiences } from "@/data/portfolio";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function ExperienceSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="experience" className="relative py-32 md:py-44">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(255,255,255,0.005)_0%,transparent_50%)]" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:mb-20"
        >
          <span className="text-[10px] tracking-[0.35em] uppercase text-white/25 font-light">
            Journey
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-light text-white/90 tracking-tight">
            Experience
            <span className="text-white/40 ml-3">& Growth</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative"
        >
          {/* Timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute left-0 md:left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/[0.06] via-white/[0.04] to-transparent origin-top"
          />

          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp) => {
              const isExpanded = expandedId === exp.id;

              return (
                <motion.div
                  key={exp.id}
                  variants={fadeUp}
                  className="group relative pl-8 md:pl-20"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-8 top-2 -translate-x-1/2">
                    <div className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-white/30 transition-colors duration-500" />
                    <div className="absolute inset-0 w-2 h-2 rounded-full bg-white/5 animate-ping" />
                  </div>

                  <div 
                    onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                    className="p-6 md:p-8 rounded-2xl border border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/[0.08] transition-all duration-500 cursor-pointer overflow-hidden"
                  >
                    <div className="flex justify-between items-center gap-4">
                      <div className="flex items-center gap-4 md:gap-5">
                        {/* Organization Logo */}
                        {exp.logo && (
                          <div className="relative w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-full overflow-hidden bg-white shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/10">
                            <Image
                              src={exp.logo}
                              alt={`${exp.organization} logo`}
                              fill
                              className="object-contain p-2 hover:scale-110 transition-transform duration-500" 
                            />
                          </div>
                        )}
                        
                        {/* Text Content */}
                        <div className="-mt-1 md:-mt-2">
                          <span className="text-[10px] tracking-[0.25em] uppercase text-white/20 font-mono">
                            {exp.period}
                          </span>
                          <h3 className="mt-0.5 md:mt-1 text-lg md:text-xl font-light text-white/80 tracking-tight">
                            {exp.role}
                          </h3>
                          <p className="text-sm text-white/35 font-light mt-1">
                            {exp.organization}
                          </p>
                        </div>
                      </div>
                      
                      <button className="text-white/20 hover:text-white/60 transition-colors text-xl font-light p-2 shrink-0">
                        {isExpanded ? "−" : "+"}
                      </button>
                    </div>

                    <p className="text-sm text-white/30 font-light leading-relaxed mt-4">
                      {exp.description}
                    </p>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="pt-6 mt-6 border-t border-white/[0.04]">
                            {exp.images && exp.images.length > 0 && (
                              <div className={`flex flex-wrap ${exp.imageLayout === 'photo' ? 'gap-6' : 'gap-4 md:gap-6'} mb-8 mt-2`}>
                                {exp.images.map((imgSrc, idx) => (
                                  <div 
                                    key={idx} 
                                    className={`relative overflow-hidden border border-white/10 bg-white/5 shadow-lg shrink-0 ${
                                      exp.imageLayout === 'photo' 
                                        ? 'w-full md:w-[45%] aspect-video rounded-xl' 
                                        : 'w-20 h-20 md:w-28 md:h-28 rounded-[2rem]'
                                    }`}
                                  >
                                    <Image 
                                      src={imgSrc} 
                                      alt={`${exp.role} image ${idx + 1}`} 
                                      fill 
                                      className={`object-cover transition-all duration-700 ${
                                        exp.imageLayout === 'photo' ? 'hover:scale-105' : 'hover:scale-110'
                                      }`} 
                                    />
                                  </div>
                                ))}
                              </div>
                            )}

                            {exp.tasks && exp.tasks.length > 0 && (
                              <ul className="space-y-3 mb-6">
                                {exp.tasks.map((task, idx) => (
                                  <li key={idx} className="flex items-start text-sm text-white/40 font-light">
                                    <span className="text-white/20 mr-3 mt-1 text-[10px]">⊛</span>
                                    <span className="leading-relaxed">{task}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                            
                            {exp.postLink && (
                              <a
                                href={exp.postLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-[10px] md:text-xs tracking-wider uppercase text-white/30 hover:text-white/70 transition-colors duration-300"
                                onClick={(e) => e.stopPropagation()} // Prevent card collapse when clicking link
                              >
                                <span>View LinkedIn Post</span>
                                <svg className="w-3 h-3 ml-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {exp.tags && (
                      <div className="flex flex-wrap gap-2 mt-5">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 text-[9px] tracking-[0.1em] text-white/20 border border-white/[0.03] rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
