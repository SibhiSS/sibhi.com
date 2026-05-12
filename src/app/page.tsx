"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import BackgroundEffect from "@/components/BackgroundEffect";
import Navigation from "@/components/Navigation";
import LogoMarquee from "@/components/LogoMarquee";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import EducationSection from "@/components/sections/EducationSection";
import ResearchSection from "@/components/sections/ResearchSection";
import GitHubSection from "@/components/sections/GitHubSection";
import ResumeSection from "@/components/sections/ResumeSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";

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
