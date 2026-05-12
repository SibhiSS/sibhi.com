"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/portfolio";
import type { Project } from "@/data/portfolio";
import { fadeUp, staggerContainer } from "@/lib/animations";

function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{
        y: -8,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      }}
      onClick={onClick}
      className="group relative cursor-pointer"
    >
      <div className="relative p-8 md:p-10 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.08] transition-all duration-700 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/[0.01] rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="relative">
          {/* Featured badge */}
          {project.featured && (
            <span className="inline-block px-2.5 py-1 text-[8px] tracking-[0.25em] uppercase text-white/30 border border-white/[0.06] rounded-full mb-6">
              Featured
            </span>
          )}

          <h3 className="text-xl md:text-2xl font-light text-white/80 tracking-tight group-hover:text-white/95 transition-colors duration-500">
            {project.title}
          </h3>

          <p className="mt-4 text-sm text-white/30 font-light leading-relaxed line-clamp-3 group-hover:text-white/45 transition-colors duration-500">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[9px] tracking-[0.1em] text-white/20 border border-white/[0.03] rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Arrow indicator */}
          <div className="flex items-center gap-2 mt-8 text-white/20 group-hover:text-white/50 transition-colors duration-500">
            <span className="text-[10px] tracking-[0.2em] uppercase">
              View Details
            </span>
            <svg
              className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl" />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-3xl border border-white/[0.06] bg-black p-8 md:p-12"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/30 hover:text-white/70 transition-colors cursor-pointer"
          aria-label="Close project details"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {project.featured && (
          <span className="inline-block px-2.5 py-1 text-[8px] tracking-[0.25em] uppercase text-white/30 border border-white/[0.06] rounded-full mb-6">
            Featured Project
          </span>
        )}

        <h2 className="text-3xl md:text-4xl font-light text-white/90 tracking-tight">
          {project.title}
        </h2>

        <div className="w-12 h-[1px] bg-white/[0.08] my-8" />

        <p className="text-white/40 text-base font-light leading-[1.8]">
          {project.longDescription || project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 text-[10px] tracking-[0.1em] text-white/30 border border-white/[0.05] rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 mt-10">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 text-[10px] tracking-[0.2em] uppercase text-white/60 border border-white/[0.08] rounded-full hover:bg-white/[0.04] hover:text-white/90 transition-all duration-500"
            >
              GitHub
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 text-[10px] tracking-[0.2em] uppercase text-white/60 border border-white/[0.08] rounded-full hover:bg-white/[0.04] hover:text-white/90 transition-all duration-500"
            >
              Live Demo
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section id="projects" className="relative py-16 md:py-22">
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
              Selected Work
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-white/90 tracking-tight">
              Featured <span className="text-white/40">Projects</span>
            </h2>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
          >
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
