"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  MailIcon, 
  PhoneIcon, 
  MessageCircleIcon, 
  CopyIcon, 
  CheckIcon, 
  DownloadIcon, 
  XIcon,
  EyeIcon
} from "@animateicons/react/lucide";
import { sounds } from "./AudioEffects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const ctaBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardContainerRef.current,
        { opacity: 0, scale: 0.96, y: 35 },
        {
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", toggleActions: "play none none reverse" },
          opacity: 1, scale: 1, y: 0, duration: 0.85, ease: "power3.out",
        }
      );
      gsap.fromTo(
        ctaBarRef.current,
        { opacity: 0, y: 20 },
        {
          scrollTrigger: { trigger: cardContainerRef.current, start: "bottom 92%" },
          opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.4)",
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardContainerRef.current) return;
    const rect = cardContainerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(cardContainerRef.current, { rotationY: x * 4, rotationX: -y * 4, transformPerspective: 1200, ease: "power1.out", duration: 0.4 });
  };

  const handleMouseLeave = () => {
    if (!cardContainerRef.current) return;
    gsap.to(cardContainerRef.current, { rotationY: 0, rotationX: 0, ease: "power2.out", duration: 0.6 });
  };

  const handleCopy = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    sounds.playSlideClick();
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2200);
    }
  };

  return (
    <section id="about-nesreena" ref={sectionRef} style={{ padding: "5.5rem 0.75rem 4.5rem", position: "relative", backgroundColor: "#0a090f", overflowX: "clip" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "1640px", margin: "0 auto", padding: "0 0.5rem" }}>
        {/* Section Header: Centered on all screen sizes */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", width: "100%", marginBottom: "2.4rem" }}>
          <span className="badge" style={{ marginBottom: "0.8rem", fontSize: "0.85rem" }}>Credentials & Profile</span>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 900, color: "#fff", marginBottom: "0.8rem", textAlign: "center", width: "100%" }}>
            Call Me <span style={{ color: "var(--primary-purple-light)", textShadow: "0 0 25px rgba(155, 36, 232, 0.5)" }}>Nesreena</span>
          </h2>
          <p style={{ fontSize: "1.08rem", color: "var(--text-secondary)", maxWidth: "720px", margin: "0 auto", lineHeight: 1.6, textAlign: "center" }}>
            The official illustrated artist profile, career milestones, educational honors, and direct contact channels.
          </p>
        </div>

        {/* Massive Artwork Card: Spans full width up to 1600px */}
        <div
          ref={cardContainerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => { setIsZoomed(true); sounds.playSlideClick(); }}
          className="about-hero-card"
          title="Click to view full screen"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/slides/responsive/slide-02-1280.webp"
            srcSet="/slides/responsive/slide-02-640.webp 640w, /slides/responsive/slide-02-1280.webp 1280w, /slides/responsive/slide-02-1600.webp 1600w, /slides/slide-02.webp 2160w"
            sizes="(max-width: 1600px) calc(100vw - 40px), 1560px"
            alt="Call Me Nesreena Illustrated Artist Profile Card"
            width="2160"
            height="1215"
            loading="lazy"
            style={{ width: "100%", height: "auto", objectFit: "contain", userSelect: "none", display: "block" }}
          />

          <div className="about-zoom-pill">
            <EyeIcon size={16} />
            <span style={{ display: "inline-block", lineHeight: 1 }}>Click to view full screen</span>
          </div>
        </div>

        {/* Rich, Full-Sized Action Buttons */}
        <div id="about-contact-bar" ref={ctaBarRef} className="about-buttons-wrapper">
          <button onClick={() => handleCopy("Nesreen.1d@gmail.com", "email")} className="about-btn" aria-label="Copy Nesreen's email address">
            {copiedEmail ? <CheckIcon size={18} /> : <MailIcon size={18} />}
            <span>{copiedEmail ? "Email Copied!" : "Nesreen.1d@gmail.com"}</span>
            <CopyIcon size={16} />
          </button>

          <button onClick={() => handleCopy("+201015344062", "phone")} className="about-btn" aria-label="Copy Nesreen's phone number">
            {copiedPhone ? <CheckIcon size={18} /> : <PhoneIcon size={18} />}
            <span>{copiedPhone ? "Phone Copied!" : "+20 101 534 4062"}</span>
            <CopyIcon size={16} />
          </button>

          <a href="https://wa.me/201015344062?text=Hello%20Nesreen,%20I%20love%20your%20creative%20portfolio!" target="_blank" rel="noopener noreferrer" className="about-btn whatsapp-highlight" aria-label="Chat with Nesreen on WhatsApp">
            <MessageCircleIcon size={18} />
            <span>Chat on WhatsApp</span>
          </a>

          <a href="/nesreen-mohammed-portfolio.pdf" download="Nesreen-Mohammed-Portfolio-2026.pdf" className="about-btn" aria-label="Download PDF — Nesreen Mohammed Portfolio">
            <DownloadIcon size={18} />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      {/* Full-Screen Zoom Lightbox */}
      {isZoomed && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1100,
            backgroundColor: "rgba(5, 4, 8, 0.96)",
            backdropFilter: "blur(20px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            cursor: "zoom-out",
          }}
          onClick={() => setIsZoomed(false)}
        >
          <button
            onClick={() => setIsZoomed(false)}
            aria-label="Close zoomed view"
            style={{
              position: "absolute",
              top: "1.2rem",
              right: "1.2rem",
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.12)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              cursor: "pointer",
              lineHeight: 0,
            }}
          >
            <XIcon size={20} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/slides/slide-02.webp"
            alt="Full-Resolution Call Me Nesreena Artwork"
            style={{ maxWidth: "98vw", maxHeight: "92vh", objectFit: "contain", borderRadius: "16px", boxShadow: "0 0 50px rgba(155, 36, 232, 0.5)" }}
          />
        </div>
      )}

      <style jsx>{`
        .about-hero-card {
          position: relative;
          width: 100%;
          max-width: 1560px;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.9), 0 0 60px rgba(155, 36, 232, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.18);
          background-color: #ebe9e4;
          transform-style: preserve-3d;
          will-change: transform;
          cursor: zoom-in;
        }
        .about-zoom-pill {
          position: absolute;
          top: 14px;
          right: 14px;
          background: rgba(12, 11, 17, 0.9);
          backdrop-filter: blur(12px);
          padding: 0.45rem 1rem;
          border-radius: 9999px;
          font-size: 0.82rem;
          font-weight: 700;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          line-height: 1;
          pointer-events: none;
        }
        .about-buttons-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.9rem;
          width: 100%;
          max-width: 1050px;
          margin-top: 2.2rem;
        }
        .about-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 0.85rem 1.6rem;
          border-radius: 9999px;
          font-size: 0.95rem;
          font-weight: 600;
          color: #ffffff;
          background: rgba(22, 20, 31, 0.85);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
          transition: all 0.22s ease;
          cursor: pointer;
          white-space: nowrap;
        }
        .about-btn:hover {
          background: rgba(155, 36, 232, 0.25);
          border-color: var(--primary-purple);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(155, 36, 232, 0.4);
        }
        .whatsapp-highlight {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(5, 150, 105, 0.35) 100%);
          border-color: rgba(16, 185, 129, 0.4);
        }
        .whatsapp-highlight:hover {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border-color: #34d399;
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.45);
        }
        @media (max-width: 768px) {
          .about-hero-card {
            border-radius: 16px;
            width: 100%;
          }
          .about-buttons-wrapper {
            display: grid;
            grid-template-columns: 1fr;
            width: 100%;
            max-width: 480px;
            gap: 0.75rem;
          }
          .about-btn {
            width: 100%;
            justify-content: center;
            padding: 0.9rem 1.4rem;
          }
        }
      `}</style>
    </section>
  );
}
