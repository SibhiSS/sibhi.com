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
  tasks?: string[]; // Detailed list of what was done
  postLink?: string; // Link to related LinkedIn post
  images?: string[]; // Optional images to display
  imageLayout?: "badge" | "photo"; // Style of the images
  logo?: string; // Small organization logo
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  logo?: string;
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
    id: "home-lab",
    title: "Self-Hosted Cloud Server — Home Lab",
    description:
      "Converted an old laptop into a Linux server and deployed a containerized stack — Nextcloud, PostgreSQL, Redis, and Nginx as a reverse proxy, securely exposed via Cloudflare Tunnel on a custom domain.",
    longDescription: "Architecture: Cloudflare → Tunnel → Nginx → Nextcloud → PostgreSQL",
    tags: ["Linux", "Docker", "Nginx", "PostgreSQL", "Cloudflare"],
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
    role: "Contributor and Ambassador",
    organization: "GirlScript Summer of Code",
    period: "Apr 2026 — Present",
    description:
      "Selected as a Contributor and Ambassador for GSSoC, actively engaging in open-source software development, global collaboration, and community building.",
    tags: ["Open Source", "Community"],
    tasks: [
      "Mentored beginners in open-source contribution and git workflows.",
      "Contributed high-quality code to various open-source repositories.",
      "Represented the program and promoted open-source awareness.",
    ],
    postLink: "https://www.linkedin.com/posts/sibhis_selected-for-girlscript-summer-of-code-2026-activity-7456039149490593792-Tn2u",
    images: ["/gssoc-1.jpg", "/gssoc-2.jpg", "/gssoc-3.jpg"],
    imageLayout: "badge",
    logo: "/gssoc-logo-new.png",
  },
  {
    id: "exp-2",
    role: "Summer Research Intern",
    organization: "Centre for Cyber Physical Systems, VIT Chennai",
    period: "Mar 2026 — Present",
    description:
      "ML Research Intern focusing on advanced Machine Learning applications and hardware-accelerated processing using CUDA.",
    tags: ["Machine Learning", "CUDA", "Research"],
    tasks: [
      "Researched ML models for cyber-physical systems.",
      "Optimized data processing pipelines utilizing CUDA for GPU acceleration.",
      "Collaborated with professors and researchers on publication drafts.",
    ],
    logo: "/vit-logo-new.jpg",
  },
  {
    id: "exp-3",
    role: "Associate Operations Team Lead",
    organization: "IEEE Solid-State Circuits Society (SSCS)",
    period: "Aug 2025 — Present",
    description:
      "Leading operations for technical events including 'Capture the Signal' and managing cross-team logistics for 75+ members. Previously managed the end-to-end recruitment process, successfully handling over 250 applications.",
    tags: ["Leadership", "Event Management", "Operations"],
    tasks: [
      "Spearheaded the 'Capture the Signal' technical event logistics.",
      "Managed end-to-end recruitment of 250+ candidates including screening and interviews.",
      "Coordinated cross-functional teams to ensure smooth chapter operations.",
    ],
    postLink: "https://www.linkedin.com/posts/sibhis_ieee-teamwork-vitchennai-activity-7448031511804526592-ad1K",
    images: ["/sscs-1.jpg", "/sscs-2.jpg"],
    imageLayout: "photo",
    logo: "/ieee-sscs-logo.jpg",
  },
];

// ── Education ──
export const education: Education[] = [
  {
    id: "edu-1",
    degree: "B.Tech CSE (Specialisation in Cyber Physical Systems)",
    institution: "VIT Chennai",
    period: "2024 — 2028",
    logo: "/vit-logo-new.jpg",
  },
  {
    id: "edu-2",
    degree: "Grade 1 to 12",
    institution: "The Ashok Leyland School, Hosur",
    period: "Completed 2024",
    logo: "/tals-logo.jpg",
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
