// ─────────────────────────────────────────────
// Portfolio Data — Single source of truth
// Add new projects, experiences, research entries here.
// ─────────────────────────────────────────────

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  github?: string;
  live?: string;
  image?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  tags?: string[];
}

export interface ResearchEntry {
  id: string;
  title: string;
  area: string;
  description: string;
  status: "ongoing" | "completed" | "published" | "exploring";
}

export interface Club {
  id: string;
  name: string;
  role: string;
  description: string;
  period?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

// ── Hero ──
export const hero = {
  name: "Sibhi S",
  tagline: "Exploring Security, Quantum Systems & Intelligent Technologies",
  subtitle: "Computer Science Engineering · VIT Chennai",
};

// ── About ──
export const about = {
  paragraphs: [
    "I am a Computer Science Engineering student at VIT Chennai with a deep fascination for frontier technologies. My work sits at the intersection of cybersecurity, quantum computing, and machine learning — driven by intellectual curiosity and a desire to build systems that push boundaries.",
    "I approach engineering not as a set of tools to learn, but as a discipline of thinking — rigorously, creatively, and at scale. Whether it's designing secure architectures, exploring quantum algorithms, or training intelligent models, I pursue depth over breadth.",
    "My goal is to contribute to research-driven engineering that solves consequential problems. I believe the most impactful work emerges from combining theoretical understanding with hands-on systems building.",
  ],
};

// ── Skills ──
export const skills: SkillCategory[] = [
  {
    category: "Programming",
    items: ["Python", "C/C++", "JavaScript", "TypeScript", "Java", "SQL"],
  },
  {
    category: "Cybersecurity",
    items: [
      "Network Security",
      "SIEM Systems",
      "Threat Analysis",
      "Penetration Testing",
      "Cryptography",
      "Digital Forensics",
    ],
  },
  {
    category: "Machine Learning",
    items: [
      "Deep Learning",
      "Neural Networks",
      "NLP",
      "Computer Vision",
      "TensorFlow",
      "PyTorch",
    ],
  },
  {
    category: "Systems & Infrastructure",
    items: [
      "Linux Administration",
      "Docker",
      "Cloud Computing",
      "Networking",
      "Distributed Systems",
    ],
  },
  {
    category: "Research & Analysis",
    items: [
      "Quantum Algorithms",
      "Research Methodology",
      "Technical Writing",
      "Data Analysis",
      "Statistical Modeling",
    ],
  },
  {
    category: "Tools & Frameworks",
    items: [
      "Git",
      "React / Next.js",
      "Node.js",
      "Wireshark",
      "Metasploit",
      "VS Code",
    ],
  },
];

// ── Projects ──
export const projects: Project[] = [
  {
    id: "nova-cps",
    title: "Nova CPS",
    description:
      "A college club website featuring a full recruitment drive system, handling everything from applications to interview scheduling and club management.",
    tags: ["TypeScript", "Tailwind CSS"],
    github: "https://github.com/SibhiSS/NOVA-CPS",
    live: "https://novacps.vercel.app/",
    featured: true,
  },
  {
    id: "phishnet",
    title: "PhishNet",
    description:
      "A phishing detection system focused on identifying malicious emails and websites using Machine Learning and NLP techniques, featuring Gmail integration and real-time analysis.",
    tags: ["Python", "JavaScript", "Machine Learning", "NLP"],
    github: "https://github.com/SibhiSS/PhishNet",
    featured: true,
  },
  {
    id: "sentinel-siem",
    title: "Sentinel SIEM",
    description:
      "A browser-based log analysis and incident management system inspired by SIEM architecture. Enables client-side ingestion, parsing, rule-based detection, and visualization of log data.",
    tags: ["HTML", "CSS", "JavaScript", "Security"],
    github: "https://github.com/SibhiSS/Sentinel-SIEM",
    live: "https://sentinel-siem.vercel.app",
    featured: true,
  },
  {
    id: "cardioscope",
    title: "CardioScope",
    description:
      "A Python-based project for analyzing and predicting cardiac data using machine learning and signal processing techniques, leveraging scientific libraries for model training and visualization.",
    tags: ["Python", "Machine Learning", "Signal Processing"],
    github: "https://github.com/SibhiSS/CardioScope",
    featured: true,
  },
];

// ── Experience ──
export const experiences: Experience[] = [
  {
    id: "exp-1",
    role: "Security Research Intern",
    organization: "VIT Chennai — Cybersecurity Lab",
    period: "2025 — Present",
    description:
      "Contributing to research in network security and SIEM system development. Analyzing threat patterns and developing automated detection pipelines for campus infrastructure.",
    tags: ["Cybersecurity", "Research", "SIEM"],
  },
  {
    id: "exp-2",
    role: "Technical Lead",
    organization: "Coding Club — VIT Chennai",
    period: "2024 — Present",
    description:
      "Leading technical workshops on security fundamentals and modern web development. Mentoring junior students in competitive programming and system design.",
    tags: ["Leadership", "Mentoring", "Technical"],
  },
  {
    id: "exp-3",
    role: "Open Source Contributor",
    organization: "Various Projects",
    period: "2023 — Present",
    description:
      "Contributing to open-source security tools and machine learning frameworks. Focused on improving documentation, fixing edge-case bugs, and implementing new features.",
    tags: ["Open Source", "Community", "Development"],
  },
];

// ── Research ──
export const research: ResearchEntry[] = [
  {
    id: "research-1",
    title: "Quantum-Resistant Cryptographic Protocols",
    area: "Post-Quantum Cryptography",
    description:
      "Investigating lattice-based cryptographic schemes and their practical implementation for securing communications against quantum adversaries.",
    status: "ongoing",
  },
  {
    id: "research-2",
    title: "ML-Driven Anomaly Detection in Network Traffic",
    area: "Machine Learning × Cybersecurity",
    description:
      "Developing hybrid deep learning architectures that combine autoencoders with attention mechanisms for real-time network intrusion detection.",
    status: "ongoing",
  },
  {
    id: "research-3",
    title: "Quantum Algorithm Optimization",
    area: "Quantum Computing",
    description:
      "Exploring variational quantum eigensolver (VQE) optimizations and their applications in computational chemistry simulations.",
    status: "exploring",
  },
];

// ── Clubs / Leadership ──
export const clubs: Club[] = [
  {
    id: "club-1",
    name: "Cybersecurity Club",
    role: "Core Committee Member",
    description:
      "Organizing CTF competitions, security workshops, and awareness campaigns. Building a community of security-minded engineers at VIT Chennai.",
    period: "2024 — Present",
  },
  {
    id: "club-2",
    name: "Research & Innovation Cell",
    role: "Student Researcher",
    description:
      "Participating in interdisciplinary research initiatives bridging computer science with emerging technology domains.",
    period: "2024 — Present",
  },
  {
    id: "club-3",
    name: "Coding Club",
    role: "Technical Lead",
    description:
      "Leading workshops on algorithms, data structures, and modern development practices. Fostering peer-to-peer learning culture.",
    period: "2023 — Present",
  },
];

// ── Social Links ──
export const socials = {
  email: "sibhis5223@gmail.com",
  github: "https://github.com/SibhiSS",
  linkedin: "https://www.linkedin.com/in/sibhis/",
  instagram: "https://instagram.com/sibhi_",
};

// ── Resume ──
export const resumeUrl = "/resume.pdf";
