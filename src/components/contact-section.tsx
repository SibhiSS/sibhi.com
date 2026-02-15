"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Instagram } from "lucide-react"

export function ContactSection() {
    return (
        <section className="container mx-auto px-4 md:px-6 py-24 mb-12">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Get in Touch</h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                    Interested in discussing secure architecture, embedded systems, or potential collaborations?
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    <Button size="lg" className="rounded-full" asChild>
                        <Link href="mailto:sibhis5223@gmail.com">
                            <Mail className="mr-2 h-4 w-4" /> Email Me
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-full" asChild>
                        <Link href="https://linkedin.com/in/sibhis" target="_blank">
                            <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-full" asChild>
                        <Link href="https://github.com/SibhiSS" target="_blank">
                            <Github className="mr-2 h-4 w-4" /> GitHub
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-full" asChild>
                        <Link href="https://instagram.com/sibhi_" target="_blank">
                            <Instagram className="mr-2 h-4 w-4" /> Instagram
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
