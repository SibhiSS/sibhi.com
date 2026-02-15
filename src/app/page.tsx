import { Hero } from "@/components/hero"
import { ProjectCard } from "@/components/project-card"
import { TechStack } from "@/components/tech-stack"
import { HardwareSection } from "@/components/hardware-section"
import { ContactSection } from "@/components/contact-section"
import { projects } from "@/lib/projects"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { getAllBlogPosts } from "@/lib/mdx"
import { formatDate, cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function Home() {
  const featuredProjects = projects.filter((p) => p.featured)
  const allPosts = await getAllBlogPosts()
  const recentPosts = allPosts.slice(0, 3)

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      <HardwareSection />

      <section className="container mx-auto px-4 md:px-6 py-24">
        <div className="flex flex-col space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground">Featured Projects</h2>
            <Button variant="ghost" asChild>
              <Link href="/projects" className="group">
                View All <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </section>

      <TechStack />

      <section className="container mx-auto px-4 md:px-6 py-24 bg-muted/10">
        <div className="flex flex-col space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Latest from the Blog</h2>
            <Button variant="ghost" asChild>
              <Link href="/blog" className="group">
                Read Blog <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3 stagger-animation">
            {recentPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block h-full">
                <Card className="h-full hover:bg-muted/50 transition-colors border-primary/10 hover:border-primary/30">
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{post.frontmatter.title}</CardTitle>
                    <div className="text-xs text-muted-foreground mt-2 flex justify-between items-center">
                      <span>{formatDate(post.frontmatter.date)}</span>
                      {post.frontmatter.difficulty && (
                        <Badge variant="outline" className="text-[10px] px-1 py-0 h-5 border-primary/20 text-primary">
                          {post.frontmatter.difficulty}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {post.frontmatter.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  )
}
