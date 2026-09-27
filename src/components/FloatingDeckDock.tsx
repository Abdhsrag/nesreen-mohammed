"use client";

import React, { useState, useEffect } from "react";
import { 
  LayersIcon, 
  DownloadIcon, 
  MessageCircleIcon, 
  Volume2Icon,
  VolumeXIcon,
  SparklesIcon,
  UserIcon,
  MailIcon,
  ArrowUpIcon
} from "@animateicons/react/lucide";
import { sounds } from "./AudioEffects";

interface FloatingDeckDockProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export default function FloatingDeckDock({
  soundEnabled,
  onToggleSound,
}: FloatingDeckDockProps) {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 350;
      const isNearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 180;
      const about = document.getElementById("about-nesreena");
      const projects = document.getElementById("projects");
      const contact = document.getElementById("contact");

      if (isNearBottom || (contact && scrollPos >= contact.offsetTop)) {
        setActiveSection("contact");
      } else if (projects && scrollPos >= projects.offsetTop) {
        setActiveSection("projects");
      } else if (about && scrollPos >= about.offsetTop) {
        setActiveSection("about");
      } else {
        setActiveSection("hero");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    sounds.playSlideClick();
    if (id === "contact") {
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
      }
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.2rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 900,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pointerEvents: "none",
        width: "max-content",
        maxWidth: "calc(100vw - 1rem)",
      }}
    >
      <nav
        aria-label="Floating SPA Navigation Dock"
        style={{
          pointerEvents: "auto",
          display: "flex",
          alignItems: "center",
          gap: "0.3rem",
          padding: "0.4rem 0.6rem",
          background: "rgba(16, 15, 23, 0.92)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.14)",
          borderRadius: "9999px",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.75), 0 0 30px rgba(155, 36, 232, 0.3)",
          maxWidth: "100%",
          overflowX: "auto",
        }}
        className="deck-dock"
      >
        {/* Cover */}
        <button
          onClick={() => scrollToSection("hero")}
          className={`dock-item ${activeSection === "hero" ? "dock-active" : ""}`}
          title="Cover"
          aria-label="Navigate to Cover"
        >
          <SparklesIcon size={19} />
          <span className="dock-tooltip">Cover</span>
        </button>

        {/* About */}
        <button
          onClick={() => scrollToSection("about-nesreena")}
          className={`dock-item ${activeSection === "about" ? "dock-active" : ""}`}
          title="About Nesreena"
          aria-label="Navigate to About Nesreena"
        >
          <UserIcon size={19} />
          <span className="dock-tooltip">About</span>
        </button>

        {/* Projects */}
        <button
          onClick={() => scrollToSection("projects")}
          className={`dock-item ${activeSection === "projects" ? "dock-active" : ""}`}
          title="Projects"
          aria-label="Navigate to Projects"
        >
          <LayersIcon size={19} />
          <span className="dock-tooltip">Projects</span>
        </button>

        {/* Contact */}
        <button
          onClick={() => scrollToSection("contact")}
          className={`dock-item ${activeSection === "contact" ? "dock-active" : ""}`}
          title="Contact"
          aria-label="Navigate to Contact and Footer"
        >
          <MailIcon size={19} />
          <span className="dock-tooltip">Contact</span>
        </button>

        <div className="dock-divider" />

        {/* WhatsApp Chat */}
        <a
          href="https://wa.me/201015344062?text=Hello%20Nesreen,%20I%20love%20your%20creative%20portfolio!"
          target="_blank"
          rel="noopener noreferrer"
          className="dock-item"
          title="WhatsApp Chat"
          aria-label="Chat with Nesreen on WhatsApp"
        >
          <MessageCircleIcon size={19} color="#4ade80" />
          <span className="dock-tooltip">WhatsApp</span>
        </a>

        {/* Download PDF */}
        <a
          href="/nesreen-mohammed-portfolio.pdf"
          download="Nesreen-Mohammed-Portfolio-2026.pdf"
          className="dock-item"
          title="Download PDF"
          aria-label="Download PDF — Nesreen Mohammed Portfolio"
        >
          <DownloadIcon size={19} />
          <span className="dock-tooltip">Download PDF</span>
        </a>

        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          className="dock-item"
          title={soundEnabled ? "Mute" : "Unmute"}
          aria-label={soundEnabled ? "Mute UI sound effects" : "Enable UI sound effects"}
        >
          {soundEnabled ? (
            <Volume2Icon size={19} color="var(--primary-purple-light)" />
          ) : (
            <VolumeXIcon size={19} color="var(--text-muted)" />
          )}
          <span className="dock-tooltip">{soundEnabled ? "Sound ON" : "Sound OFF"}</span>
        </button>

        {/* Back to Top */}
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            sounds.playSlideClick();
          }}
          className="dock-item"
          title="Top"
          aria-label="Scroll back to top of page"
        >
          <ArrowUpIcon size={18} />
          <span className="dock-tooltip">Top</span>
        </button>
      </nav>
    </div>
  );
}
