import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Sibhi S — Engineer · Researcher · Builder",
  description:
    "Personal portfolio of Sibhi S — a Computer Science Engineering student at VIT Chennai exploring cybersecurity, quantum computing, and machine learning.",
  keywords: [
    "Sibhi S",
    "portfolio",
    "computer science",
    "cybersecurity",
    "quantum computing",
    "machine learning",
    "VIT Chennai",
    "engineer",
    "researcher",
  ],
  authors: [{ name: "Sibhi S" }],
  openGraph: {
    title: "Sibhi S — Engineer · Researcher · Builder",
    description:
      "Exploring Security, Quantum Systems & Intelligent Technologies.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sibhi S — Engineer · Researcher · Builder",
    description:
      "Exploring Security, Quantum Systems & Intelligent Technologies.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
        <meta name="theme-color" content="#030303" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body 
        className="min-h-screen bg-[#030303] text-white/50 font-[var(--font-inter)]"
        suppressHydrationWarning
      >
        {/* Noise Texture Overlay */}
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
