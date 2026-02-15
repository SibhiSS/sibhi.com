import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const techCategories = [
    {
        title: "Languages",
        skills: ["Python", "C++", "Java", "JavaScript", "TypeScript", "SQL"],
    },
    {
        title: "Frontend",
        skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    },
    {
        title: "Backend",
        skills: ["Node.js", "Flask", "PostgreSQL"],
    },
    {
        title: "Systems & Security",
        skills: ["Linux", "Docker", "Git", "Cybersecurity", "Bash"],
    },
]

export function TechStack() {
    return (
        <section className="container mx-auto px-4 md:px-6 py-24">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Tech Stack</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    A robust technical toolkit for building secure, scalable systems.
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
                {techCategories.map((category) => (
                    <Card key={category.title} className="bg-card/50 border-primary/20 hover:border-primary/50 transition-colors">
                        <CardHeader>
                            <CardTitle className="text-center text-lg">{category.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-wrap justify-center gap-2">
                            {category.skills.map((skill) => (
                                <Badge key={skill} variant="secondary" className="bg-secondary/50 hover:bg-secondary">
                                    {skill}
                                </Badge>
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}
