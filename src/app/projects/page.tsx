"use client"

import { ProjectCard } from "@/components/project-card"
import { projects, ProjectCategory } from "@/lib/projects"
import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function ProjectsPage() {
    const [filter, setFilter] = useState<ProjectCategory | "All">("All")

    const filteredProjects = projects.filter(
        (project) => filter === "All" || project.category === filter
    )

    const categories: (ProjectCategory | "All")[] = ["All", "Security", "Embedded/IoT", "Web Dev"]

    return (
        <div className="container mx-auto px-4 md:px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 mb-12 text-center"
            >
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Projects</h1>
                <p className="text-muted-foreground md:text-xl max-w-[700px] mx-auto">
                    A collection of my work in Cybersecurity, Embedded Systems, and Full Stack Development.
                </p>
            </motion.div>

            <div className="flex justify-center gap-2 mb-12 flex-wrap">
                {categories.map((category) => (
                    <Button
                        key={category}
                        variant={filter === category ? "default" : "outline"}
                        onClick={() => setFilter(category)}
                        className="rounded-full"
                    >
                        {category}
                    </Button>
                ))}
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project, index) => (
                    <motion.div
                        key={project.title}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ProjectCard {...project} />
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
