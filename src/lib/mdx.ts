import fs from "fs"
import path from "path"
import { compileMDX } from "next-mdx-remote/rsc"
import rehypePrettyCode from "rehype-pretty-code"
import { MdxComponents } from "@/components/mdx-components"

const root = process.cwd()
const contentDir = path.join(root, "src", "content")

export type Frontmatter = {
    title: string
    date: string
    description: string
    tags?: string[]
    readingTime?: string
    difficulty?: "Beginner" | "Intermediate" | "Advanced"
}

export type BlogPost = {
    slug: string
    content: React.ReactElement
    frontmatter: Frontmatter
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    const filePath = path.join(contentDir, "blog", `${slug}.mdx`)

    if (!fs.existsSync(filePath)) {
        return null
    }

    const rawContent = fs.readFileSync(filePath, "utf-8")

    const { content, frontmatter } = await compileMDX<Frontmatter>({
        source: rawContent,
        components: MdxComponents as any,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                rehypePlugins: [
                    [
                        rehypePrettyCode,
                        {
                            theme: "github-dark",
                            keepBackground: false,
                        },
                    ],
                ],
            },
        },
    })

    return {
        slug,
        content,
        frontmatter: {
            ...frontmatter,
            readingTime: Math.ceil(rawContent.split(/\s+/).length / 200) + " min read"
        }
    }
}

export async function getAllBlogPosts() {
    const blogDir = path.join(contentDir, "blog")

    if (!fs.existsSync(blogDir)) {
        return []
    }

    const files = fs.readdirSync(blogDir)
    const posts = await Promise.all(
        files
            .filter((file) => path.extname(file) === ".mdx")
            .map(async (file) => {
                const slug = file.replace(/\.mdx$/, "")
                const post = await getBlogPost(slug)
                return post
            })
    )

    // Sort by date desc
    return posts
        .filter((post): post is BlogPost => post !== null)
        .sort((a, b) => (new Date(a.frontmatter.date) > new Date(b.frontmatter.date) ? -1 : 1))
}
