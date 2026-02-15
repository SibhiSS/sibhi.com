import { getBlogPost, getAllBlogPosts } from "@/lib/mdx"
import { formatDate } from "@/lib/utils"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface BlogPostPageProps {
    params: {
        slug: string
    }
}

export async function generateStaticParams() {
    const posts = await getAllBlogPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
    const post = await getBlogPost(params.slug)

    if (!post) {
        return
    }

    return {
        title: `${post.frontmatter.title} | Sibhi S`,
        description: post.frontmatter.description,
    }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const post = await getBlogPost(params.slug)

    if (!post) {
        notFound()
    }

    return (
        <div className="container mx-auto px-4 md:px-6 py-12 max-w-3xl">
            <Link
                href="/blog"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Link>

            <article className="prose prose-zinc dark:prose-invert max-w-none">
                <div className="mb-8 space-y-4">
                    <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl mb-2">
                        {post.frontmatter.title}
                    </h1>
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <time dateTime={post.frontmatter.date}>
                            {formatDate(post.frontmatter.date)}
                        </time>
                        <div className="flex gap-2">
                            {post.frontmatter.tags?.map((tag) => (
                                <Badge key={tag} variant="outline">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>

                {post.content}
            </article>
        </div>
    )
}
