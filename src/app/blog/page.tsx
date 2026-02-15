import { getAllBlogPosts } from "@/lib/mdx"
import Link from "next/link"
import { formatDate, cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata = {
    title: "Blog | Sibhi S",
    description: "Writing about cybersecurity, web development, and tech.",
}

export default async function BlogPage() {
    const posts = await getAllBlogPosts()

    return (
        <div className="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
            <div className="space-y-4 mb-12">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Blog</h1>
                <p className="text-muted-foreground md:text-xl">
                    Thoughts on cybersecurity, offensive security, and full-stack engineering.
                </p>
            </div>

            <div className="grid gap-6">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`}>
                            <Card className="hover:bg-muted/50 transition-colors">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-xl">{post.frontmatter.title}</CardTitle>
                                        <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                                            {formatDate(post.frontmatter.date)}
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground line-clamp-2 mb-4">{post.frontmatter.description}</p>
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                                        {post.frontmatter.readingTime && (
                                            <span>{post.frontmatter.readingTime}</span>
                                        )}
                                        {post.frontmatter.difficulty && (
                                            <Badge variant="outline" className={cn(
                                                "border-primary/20",
                                                post.frontmatter.difficulty === "Advanced" ? "text-red-400" : "text-primary"
                                            )}>
                                                {post.frontmatter.difficulty}
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        {post.frontmatter.tags?.map((tag) => (
                                            <Badge key={tag} variant="secondary" className="text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))
                ) : (
                    <div className="text-center py-12 text-muted-foreground">
                        No posts found. check back soon!
                    </div>
                )}
            </div>
        </div>
    )
}
