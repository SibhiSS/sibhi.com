"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, GraduationCap, Briefcase, Award, Terminal, BookOpen } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 space-y-16">
            {/* Bio Section */}
            <section className="grid gap-8 md:grid-cols-2 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                >
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h1>
                        <p className="text-xl text-primary font-medium">Cybersecurity & Embedded Systems Engineer</p>
                    </div>

                    <div className="text-muted-foreground space-y-4 md:text-lg leading-relaxed">
                        <p>
                            I am a <strong>Computer Science sophomore</strong> focused on <strong>Cybersecurity</strong> and <strong>Embedded Systems</strong>.
                            My passion lies in designing secure web applications, analyzing system vulnerabilities, and building hardware-integrated solutions
                            using microcontrollers and Linux-based systems.
                        </p>
                        <p>
                            Beyond the code, I actively contribute to the tech community. Currently, I serve in an operational capacity
                            at <strong>IEEE SSCS VIT Chennai</strong>, organizing technical workshops and hackathons.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold text-foreground">Core Interests</h3>
                        <div className="flex flex-wrap gap-2">
                            {["Web App Security", "Network Security", "Secure Architecture", "Embedded & IoT", "Hardware Hacking"].map((item) => (
                                <Badge key={item} variant="secondary">{item}</Badge>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button asChild size="lg">
                            <Link href="/resume.pdf" target="_blank">
                                <Download className="mr-2 h-4 w-4" /> Download Resume
                            </Link>
                        </Button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative aspect-square w-full max-w-sm mx-auto md:mr-0 overflow-hidden rounded-xl bg-muted border border-border"
                >
                    <div className="flex flex-col items-center justify-center h-full w-full bg-card/50 text-muted-foreground gap-4">
                        <Terminal className="h-16 w-16 opacity-50" />
                        <span className="text-lg font-mono">user@sibhi:~$ whoami</span>
                    </div>
                </motion.div>
            </section>

            {/* Currently Learning Section (NEW) */}
            <section className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter flex items-center gap-3">
                    <BookOpen className="h-8 w-8 text-primary" /> Currently Learning & Exploring
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border border-primary/20 rounded-lg bg-primary/5">
                        <h3 className="font-semibold text-lg mb-2 text-primary">Advanced Web Exploitation</h3>
                        <p className="text-sm text-muted-foreground">Deep diving into OSEP-level web attacks, advanced SQLi techniques, and server-side template injection.</p>
                    </div>
                    <div className="p-4 border border-primary/20 rounded-lg bg-primary/5">
                        <h3 className="font-semibold text-lg mb-2 text-primary">System Security Concepts</h3>
                        <p className="text-sm text-muted-foreground">Studying kernel exploitation, memory corruption vulnerabilities, and secure OS design principles.</p>
                    </div>
                </div>
            </section>

            {/* Experience & Education Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Experience Column */}
                <Card className="h-full bg-card/40 border-primary/10 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-4 border-b border-muted/20">
                        <CardTitle className="text-2xl font-bold flex items-center gap-3">
                            <Briefcase className="h-6 w-6 text-primary" /> Experience
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-8">
                        {/* IEEE */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-lg">Associate – Operations</h3>
                                    <div className="text-muted-foreground">IEEE Solid-State Circuits Society | VIT Chennai</div>
                                </div>
                                <Badge variant="secondary" className="font-mono text-xs">Aug 2025 – Present</Badge>
                            </div>
                            <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1 ml-1">
                                <li>Coordinated technical events and workshops</li>
                                <li>Managed cross-team operational planning</li>
                                <li>Assisted in organizing student technical initiatives</li>
                            </ul>
                        </div>

                        <div className="h-px bg-muted/20" />

                        {/* GDG */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-lg">Technical Team Member</h3>
                                    <div className="text-muted-foreground">GDG on Campus | VIT Chennai</div>
                                </div>
                                <Badge variant="secondary" className="font-mono text-xs">Sep 2025 – Present</Badge>
                            </div>
                            <p className="text-muted-foreground text-sm">
                                Contributed to technical sessions and collaborative development activities
                            </p>
                        </div>

                        <div className="h-px bg-muted/20" />

                        {/* OSPC */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-lg">CyberSec Team Member</h3>
                                    <div className="text-muted-foreground">Open Source Programming Club VITC</div>
                                </div>
                                <Badge variant="secondary" className="font-mono text-xs">Sep 2025 – Present</Badge>
                            </div>
                            <p className="text-muted-foreground text-sm">
                                Participated in security-focused learning sessions and practical exercises
                            </p>
                        </div>

                        <div className="h-px bg-muted/20" />

                        {/* CYSCOM */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-lg">Technical Team Member</h3>
                                    <div className="text-muted-foreground">CYSCOM VIT Chennai</div>
                                </div>
                                <Badge variant="secondary" className="font-mono text-xs">Sep 2025 – Present</Badge>
                            </div>
                            <p className="text-muted-foreground text-sm">
                                Engaged in cybersecurity-related discussions and hands-on practice
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Education Column */}
                <Card className="h-full bg-card/40 border-primary/10 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-4 border-b border-muted/20">
                        <CardTitle className="text-2xl font-bold flex items-center gap-3">
                            <GraduationCap className="h-6 w-6 text-primary" /> Education
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-bold text-xl">Vellore Institute of Technology</h3>
                                <div className="text-lg text-primary/80">Bachelor of Technology – Computer Science Engineering</div>
                                <div className="text-muted-foreground mt-1 font-mono text-sm">Jun 2024 – Jul 2028</div>
                            </div>

                            <div className="space-y-2 pt-2">
                                <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Focus Areas</span>
                                <div className="flex flex-wrap gap-2">
                                    {["Cybersecurity", "Operating Systems", "Computer Networks", "Data Structures & Algorithms"].map((tag) => (
                                        <Badge key={tag} variant="outline" className="border-primary/20 bg-primary/5 text-primary">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Certifications Section - Kept as extra credit since user didn't explicitly delete, but moved to bottom/compact */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tighter flex items-center gap-3">
                    <Award className="h-6 w-6 text-primary" /> Certifications
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <Card className="bg-card/40 border-primary/10">
                        <CardHeader className="py-4">
                            <CardTitle className="text-base">Google Cybersecurity Professional</CardTitle>
                            <div className="text-xs text-muted-foreground">Coursera • Jul 2024</div>
                        </CardHeader>
                    </Card>
                    <Card className="bg-card/40 border-primary/10">
                        <CardHeader className="py-4">
                            <CardTitle className="text-base">Cybersecurity Job Simulation</CardTitle>
                            <div className="text-xs text-muted-foreground">Mastercard (Forage) • Nov 2025</div>
                        </CardHeader>
                    </Card>
                </div>
            </section>
        </div>
    )
}

