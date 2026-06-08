import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const BASE_URL = "https://www.sibhi.com";

// ── Viewport (replaces deprecated themeColor in metadata) ──
export const viewport: Viewport = {
  themeColor: "#030303",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

// ── Primary Metadata ──
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  // Title: 55 chars — within the ideal 50–60 char range
  title: {
    default: "Sibhi S | Engineer · Researcher · Builder | Portfolio",
    template: "%s | Sibhi S",
  },

  description:
    "Personal portfolio of Sibhi S — a Computer Science Engineering student at VIT Chennai exploring cybersecurity, quantum computing, and machine learning.",

  keywords: [
    "Sibhi S",
    "portfolio",
    "computer science engineer",
    "cybersecurity researcher",
    "quantum computing",
    "quantum key distribution",
    "QKD",
    "machine learning",
    "deep learning",
    "VIT Chennai",
    "NITK Surathkal",
    "research intern",
    "6G security",
    "FSO links",
    "software engineer India",
    "open source contributor",
  ],

  authors: [{ name: "Sibhi S", url: BASE_URL }],
  creator: "Sibhi S",
  publisher: "Sibhi S",
  applicationName: "Sibhi S — Portfolio",
  referrer: "origin-when-cross-origin",
  category: "technology",

  // ── Canonical URL ──
  alternates: {
    canonical: "/",
  },

  // ── Open Graph ──
  openGraph: {
    title: "Sibhi S | Engineer · Researcher · Builder | Portfolio",
    description:
      "Personal portfolio of Sibhi S — a Computer Science Engineering student at VIT Chennai exploring cybersecurity, quantum computing, and machine learning.",
    type: "profile",
    url: BASE_URL,
    siteName: "Sibhi S",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sibhi S — Engineer · Researcher · Builder",
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X Cards ──
  twitter: {
    card: "summary_large_image",
    title: "Sibhi S | Engineer · Researcher · Builder",
    description:
      "Exploring Security, Quantum Systems & Intelligent Technologies.",
    creator: "@sibhi_",
    images: [
      {
        url: "/og-image.png",
        alt: "Sibhi S — Engineer · Researcher · Builder",
      },
    ],
  },

  // ── Robots ──
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Apple Web App ──
  appleWebApp: {
    capable: true,
    title: "Sibhi S",
    statusBarStyle: "black-translucent",
  },

  // ── Format detection ──
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

// ── JSON-LD Structured Data ──
// Person + WebSite + ProfilePage schema for rich results & GEO
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Sibhi S",
      givenName: "Sibhi",
      familyName: "S",
      url: BASE_URL,
      image: {
        "@type": "ImageObject",
        "@id": `${BASE_URL}/#personimage`,
        url: `${BASE_URL}/profile-main.jpg`,
        contentUrl: `${BASE_URL}/profile-main.jpg`,
        caption: "Sibhi S — Engineer · Researcher · Builder",
      },
      description:
        "Computer Science Engineering student at VIT Chennai specializing in cybersecurity, quantum computing, and machine learning. Research Intern at NITK Surathkal working on Quantum Key Distribution for 6G FSO networks.",
      jobTitle: "Computer Science Engineering Student & Research Intern",
      worksFor: [
        {
          "@type": "EducationalOrganization",
          name: "VIT Chennai",
          url: "https://chennai.vit.ac.in",
          sameAs: "https://en.wikipedia.org/wiki/Vellore_Institute_of_Technology",
        },
        {
          "@type": "EducationalOrganization",
          name: "National Institute of Technology Karnataka (NITK), Surathkal",
          url: "https://www.nitk.ac.in",
        },
      ],
      alumniOf: [
        {
          "@type": "EducationalOrganization",
          name: "VIT Chennai",
          url: "https://chennai.vit.ac.in",
        },
        {
          "@type": "EducationalOrganization",
          name: "The Ashok Leyland School, Hosur",
        },
      ],
      knowsAbout: [
        "Cybersecurity",
        "Quantum Key Distribution",
        "Quantum Computing",
        "Machine Learning",
        "Deep Learning",
        "Computer Vision",
        "Free-Space Optical Communication",
        "6G Networks",
        "Docker",
        "Linux Administration",
        "Python",
        "React",
        "Next.js",
        "Convolutional Neural Networks",
        "Network Security",
      ],
      hasOccupation: {
        "@type": "Occupation",
        name: "Research Intern",
        occupationLocation: {
          "@type": "Country",
          name: "India",
        },
        skills:
          "Quantum Key Distribution, Machine Learning, Deep Learning, Cybersecurity",
      },
      sameAs: [
        "https://github.com/SibhiSS",
        "https://www.linkedin.com/in/sibhis/",
        "https://instagram.com/sibhi_",
      ],
      email: "mailto:sibhis5223@gmail.com",
      affiliation: [
        {
          "@type": "Organization",
          name: "IEEE Solid-State Circuits Society (SSCS)",
          url: "https://sscs.ieee.org",
        },
        {
          "@type": "Organization",
          name: "GirlScript Summer of Code",
          url: "https://gssoc.girlscript.tech",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Sibhi S — Engineer · Researcher · Builder",
      description:
        "Personal portfolio of Sibhi S — exploring cybersecurity, quantum computing, and machine learning.",
      author: { "@id": `${BASE_URL}/#person` },
      publisher: { "@id": `${BASE_URL}/#person` },
      inLanguage: "en-US",
      copyrightYear: "2025",
      potentialAction: {
        "@type": "ReadAction",
        target: [BASE_URL],
      },
    },
    {
      "@type": "ProfilePage",
      "@id": `${BASE_URL}/#profilepage`,
      url: BASE_URL,
      name: "Sibhi S | Engineer · Researcher · Builder | Portfolio",
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: { "@id": `${BASE_URL}/#person` },
      mainEntity: { "@id": `${BASE_URL}/#person` },
      inLanguage: "en-US",
      dateModified: "2026-06-01T00:00:00.000Z",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: BASE_URL,
          },
        ],
      },
    },
    {
      "@type": "ItemList",
      "@id": `${BASE_URL}/#projects`,
      name: "Projects by Sibhi S",
      description: "Featured software projects built by Sibhi S",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "SoftwareSourceCode",
            name: "SSCS Portal",
            description:
              "Centralized recruitment and administrative platform for IEEE SSCS VIT Chennai.",
            programmingLanguage: ["TypeScript", "React", "Supabase"],
            url: "https://sscsportal.vercel.app/",
            codeRepository: "https://github.com/SibhiSS/sscsportal",
            author: { "@id": `${BASE_URL}/#person` },
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "SoftwareSourceCode",
            name: "PhishNet",
            description:
              "ML-based phishing detection system for emails and websites using NLP.",
            programmingLanguage: ["Python", "JavaScript", "Machine Learning"],
            codeRepository: "https://github.com/SibhiSS/PhishNet",
            author: { "@id": `${BASE_URL}/#person` },
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "SoftwareSourceCode",
            name: "CardioScope",
            description:
              "Python-based cardiac data analysis using machine learning and signal processing.",
            programmingLanguage: ["Python", "Machine Learning"],
            codeRepository: "https://github.com/SibhiSS/CardioScope",
            author: { "@id": `${BASE_URL}/#person` },
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${jetbrainsMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* JSON-LD Structured Data — Person, WebSite, ProfilePage, Projects */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-screen bg-[#030303] text-white/50 font-[var(--font-inter)]"
        suppressHydrationWarning
      >
        {/* Noise Texture Overlay */}
        <div className="noise-overlay" aria-hidden="true" />
        {children}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
