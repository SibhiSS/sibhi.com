
"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import BackgroundEffect from "@/components/BackgroundEffect";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
const SkillsSection = dynamic(() => import("@/components/sections/SkillsSection"));
const LogoMarquee = dynamic(() => import("@/components/LogoMarquee"));
const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection"));
const ExperienceSection = dynamic(() => import("@/components/sections/ExperienceSection"));
const EducationSection = dynamic(() => import("@/components/sections/EducationSection"));
const ResearchSection = dynamic(() => import("@/components/sections/ResearchSection"));
const GitHubSection = dynamic(() => import("@/components/sections/GitHubSection"));
const ResumeSection = dynamic(() => import("@/components/sections/ResumeSection"));
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"));
const Footer = dynamic(() => import("@/components/Footer"));

// Lazy load the custom cursor — desktop only, not critical
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});

export default function HomePage() {
  return (
    <SmoothScroll>
      <BackgroundEffect />
      <CustomCursor />
      <Navigation />

      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <LogoMarquee />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <ResearchSection />
        <GitHubSection />
        <ResumeSection />
        <ContactSection />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
