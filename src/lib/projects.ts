export type ProjectCategory = "Security" | "Embedded/IoT" | "Web Dev"

export interface Project {
    title: string
    description: string
    tags: string[]
    image?: string
    video?: string
    demoLink?: string
    repoLink?: string
    featured?: boolean
    category: ProjectCategory
}

export const projects: Project[] = [
    {
        title: "PhishNet",
        description: "Real-time phishing detection system using machine learning to analyze URL structures and behavioral indicators. Built with Python, Flask, and Scikit-learn for model training and deployment.",
        tags: ["Python", "Flask", "Scikit-learn", "Machine Learning", "Security"],
        repoLink: "https://github.com/SibhiSS/PhishNet",
        featured: true,
        category: "Security",
    },
    {
        title: "IntelliGrow",
        description: "IoT-based smart agriculture system integrating sensor data (Soil Moisture, Temp/Humidity) for real-time crop monitoring and analytics. Built using Node.js, MQTT, and a React dashboard.",
        tags: ["IoT", "Node.js", "React", "MQTT", "ESP32", "Sensors"],
        repoLink: "https://github.com/SibhiSS/IntelliGrow",
        featured: true,
        category: "Embedded/IoT",
    },
    {
        title: "Nova CPS Website",
        description: "Designed and developed a responsive committee website using React, TypeScript, and Tailwind CSS with modern UI animations powered by Framer Motion.",
        tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
        repoLink: "https://github.com/SibhiSS/sibhi.com",
        demoLink: "https://sibhi-com.vercel.app",
        featured: true,
        category: "Web Dev",
    },
]
