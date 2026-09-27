"use client";

import React, { useState } from "react";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import FloatingDeckDock from "@/components/FloatingDeckDock";
import Footer from "@/components/Footer";
import { sounds } from "@/components/AudioEffects";

export default function Home() {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    sounds.enabled = newState;
    if (newState) sounds.playSlideClick();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", position: "relative" }}>
      {/* Top Neon Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Main Single Page Application Flow */}
      <main style={{ flex: 1 }}>
        {/* Cover Hero (Page 1) — Immediately visible on load */}
        <HeroSection />

        {/* Call Me Nesreena (Page 2 Exact Artwork Card) */}
        <AboutSection />

        {/* Projects Showcase (Selected Works) */}
        <ProjectsSection />
      </main>

      {/* Floating Smart Deck Dock at the Bottom */}
      <FloatingDeckDock soundEnabled={soundEnabled} onToggleSound={toggleSound} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
