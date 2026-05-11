"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ResearchSection from "@/components/sections/ResearchSection";
import ClubsSection from "@/components/sections/ClubsSection";
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
      <CustomCursor />
      <Navigation />

      <main>
        <HeroSection />

        {/* Section Divider */}
        <div className="section-divider" />

        <AboutSection />
        <div className="section-divider" />

        <SkillsSection />
        <div className="section-divider" />

        <ProjectsSection />
        <div className="section-divider" />

        <ExperienceSection />
        <div className="section-divider" />

        <ResearchSection />
        <div className="section-divider" />

        <ClubsSection />
        <div className="section-divider" />

        <ResumeSection />
        <div className="section-divider" />

        <ContactSection />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
