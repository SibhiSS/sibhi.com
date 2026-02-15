"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, FileText } from "lucide-react"
import { BackgroundGrid } from "@/components/background-grid"

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-24 md:pt-32 pb-16">
            <BackgroundGrid />
            <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6 max-w-4xl mx-auto"
                >
                    <div className="flex justify-center">
                        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary border border-primary/20">
                            Open to Work
                        </span>
                    </div>

                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                        Cybersecurity & <br className="hidden md:block" />
                        <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-400">
                            Embedded Systems Engineer
                        </span>
                    </h1>

                    <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl leading-relaxed">
                        Building secure systems across software and hardware. Focused on <span className="text-foreground font-medium">vulnerability analysis</span>, <span className="text-foreground font-medium">secure application development</span>, and <span className="text-foreground font-medium">embedded system design</span>.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-wrap items-center justify-center gap-4 pt-4"
                    >
                        <Button asChild size="lg" className="h-12 px-8 text-base">
                            <Link href="/projects">
                                View Projects <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg" className="h-12 px-8 text-base" asChild>
                            <Link href="/resume.pdf" target="_blank">
                                <FileText className="mr-2 h-4 w-4" /> Download Resume
                            </Link>
                        </Button>
                        <div className="flex gap-2 ml-2">
                            <Button variant="ghost" size="icon" asChild>
                                <Link href="https://github.com/SibhiSS" target="_blank">
                                    <Github className="h-5 w-5" />
                                    <span className="sr-only">GitHub</span>
                                </Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                                <Link href="https://linkedin.com/in/sibhis" target="_blank">
                                    <Linkedin className="h-5 w-5" />
                                    <span className="sr-only">LinkedIn</span>
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
