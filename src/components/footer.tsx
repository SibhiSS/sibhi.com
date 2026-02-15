import Link from "next/link"
import { Github, Linkedin, Instagram } from "lucide-react"

export function Footer() {
    return (
        <footer className="w-full border-t border-border/40 bg-background py-6 md:py-0">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    Engineered by{" "}
                    <a
                        href="https://github.com/SibhiSS"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4"
                    >
                        Sibhi S
                    </a>
                    . using Next.js & Tailwind.
                </p>
                <div className="flex items-center space-x-4">
                    <Link
                        href="https://github.com/SibhiSS"
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                    </Link>
                    <Link
                        href="https://linkedin.com/in/sibhis"
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                    </Link>
                    <Link
                        href="https://instagram.com/sibhi_"
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <Instagram className="h-5 w-5" />
                        <span className="sr-only">Instagram</span>
                    </Link>
                </div>
            </div>
        </footer>
    )
}
