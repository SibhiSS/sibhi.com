"use client"

import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Play, Terminal } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
    title: string
    description: string
    tags: string[]
    image?: string
    video?: string
    demoLink?: string
    repoLink?: string
    featured?: boolean
}

export function ProjectCard({
    title,
    description,
    tags,
    image,
    video,
    demoLink,
    repoLink,
    featured = false,
}: ProjectCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    // Placeholder pattern for projects without images
    const Placeholder = () => (
        <div className="flex h-full w-full items-center justify-center bg-muted/30 border-b border-border/50 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]">
            <Terminal className="h-12 w-12 text-muted-foreground/20" />
        </div>
    )

    if (featured) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative grid gap-4 overflow-hidden rounded-xl border bg-card/50 text-card-foreground shadow-sm md:grid-cols-2 md:gap-8 transition-all hover:border-primary/50"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="relative aspect-video w-full overflow-hidden md:h-full border-r-0 md:border-r border-border/50">
                    {video && isHovered ? (
                        <div className="flex h-full w-full items-center justify-center bg-black/10">
                            <span className="text-muted-foreground">Video Preview</span>
                        </div>
                    ) : (
                        <div className="h-full w-full">
                            {image ? (
                                <Image src={image} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                            ) : (
                                <Placeholder />
                            )}
                        </div>
                    )}
                </div>
                <div className="flex flex-col justify-center gap-4 p-6 md:p-8">
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">{title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="border-primary/20 text-primary/80">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                    <div className="flex gap-4 pt-4">
                        {demoLink && (
                            <Button asChild className="rounded-full">
                                <Link href={demoLink} target="_blank">
                                    <Play className="mr-2 h-4 w-4" /> Live Demo
                                </Link>
                            </Button>
                        )}
                        {repoLink && (
                            <Button variant="outline" asChild className="rounded-full">
                                <Link href={repoLink} target="_blank">
                                    <Github className="mr-2 h-4 w-4" /> Source Code
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </motion.div>
        )
    }

    return (
        <Card className="flex flex-col overflow-hidden transition-all hover:shadow-md h-full hover:border-primary/50 bg-card/50">
            <CardHeader className="p-0 border-b border-border/50">
                <div className="aspect-video w-full relative overflow-hidden group">
                    {image ? (
                        <Image src={image} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                        <Placeholder />
                    )}
                </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-2.5 p-6">
                <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors">{title}</CardTitle>
                <CardDescription className="line-clamp-3">{description}</CardDescription>
                <div className="flex flex-wrap gap-2 pt-2">
                    {tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-primary/20 text-primary/80">
                            {tag}
                        </Badge>
                    ))}
                    {tags.length > 3 && (
                        <Badge variant="outline" className="text-xs border-primary/20">
                            +{tags.length - 3}
                        </Badge>
                    )}
                </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
                <div className="flex w-full gap-2">
                    {demoLink && (
                        <Button variant="ghost" size="sm" className="flex-1" asChild>
                            <Link href={demoLink} target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" /> Demo
                            </Link>
                        </Button>
                    )}
                    {repoLink && (
                        <Button variant="outline" size="sm" className="flex-1" asChild>
                            <Link href={repoLink} target="_blank">
                                <Github className="mr-2 h-4 w-4" /> Code
                            </Link>
                        </Button>
                    )}
                </div>
            </CardFooter>
        </Card>
    )
}
