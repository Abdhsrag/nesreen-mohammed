"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { DownloadIcon, SparklesIcon, ArrowDownIcon, LayersIcon, UserIcon } from "@animateicons/react/lucide";
import { sounds } from "./AudioEffects";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(portraitRef.current, { y: -10, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!portraitRef.current) return;
    const rect = portraitRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(portraitRef.current, { rotationY: x * 8, rotationX: -y * 8, transformPerspective: 900, ease: "power1.out", duration: 0.35 });
  };

  const handleMouseLeave = () => {
    if (!portraitRef.current) return;
    gsap.to(portraitRef.current, { rotationY: 0, rotationX: 0, ease: "power2.out", duration: 0.6 });
  };

  const scrollTo = (id: string) => {
    sounds.playSlideClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      style={{
        position: "relative",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 1rem",
        overflowX: "clip",
        backgroundColor: "#0c0b11",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(ellipse at 70% 35%, rgba(155, 36, 232, 0.2) 0%, transparent 65%),
            radial-gradient(rgba(255, 255, 255, 0.05) 1.5px, transparent 0)
          `,
          backgroundSize: "100% 100%, 24px 24px",
          pointerEvents: "none",
        }}
      />

      <div className="container hero-grid-container" style={{ position: "relative", zIndex: 2, width: "100%" }}>
        {/* Left Column: Text & Actions */}
        <div className="hero-text-column">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.45rem 1.25rem",
              borderRadius: "9999px",
              background: "rgba(155, 36, 232, 0.16)",
              border: "1px solid rgba(155, 36, 232, 0.4)",
              color: "var(--primary-purple-light)",
              fontSize: "0.9rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              boxShadow: "0 0 25px rgba(155, 36, 232, 0.35)",
              marginBottom: "1.2rem",
            }}
          >
            <SparklesIcon size={17} />
            <span>PORTFOLIO 2025 - 2026</span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2.1rem, 6.5vw, 4.8rem)",
              fontWeight: 900,
              letterSpacing: "-0.025em",
              lineHeight: 1.08,
              color: "#ffffff",
              textTransform: "uppercase",
              marginBottom: "1.1rem",
              wordBreak: "break-word",
              width: "100%",
            }}
          >
            Nesreen Mohammed
          </h1>

          <p
            style={{
              fontSize: "clamp(1.05rem, 2vw, 1.35rem)",
              color: "var(--text-secondary)",
              fontWeight: 500,
              maxWidth: "580px",
              lineHeight: 1.6,
              marginBottom: "2.2rem",
              width: "100%",
            }}
          >
            Illustrator & Graphic Designer crafting memorable character universes, brand visual identities, and motion storyboards.
          </p>

          <div className="hero-actions">
            <button
              onClick={() => scrollTo("projects")}
              className="btn-primary hero-btn"
              aria-label="Explore Projects — Selected Portfolio"
            >
              <LayersIcon size={18} />
              <span>Explore Projects</span>
              <ArrowDownIcon size={16} />
            </button>

            <button
              onClick={() => scrollTo("about-nesreena")}
              className="btn-secondary hero-btn"
              aria-label="View Call Me Nesreena Artist Profile"
            >
              <UserIcon size={18} />
              <span>Call Me Nesreena</span>
            </button>

            <a
              href="/nesreen-mohammed-portfolio.pdf"
              download="Nesreen-Mohammed-Portfolio-2026.pdf"
              className="btn-secondary hero-btn"
              aria-label="Download PDF — Nesreen Mohammed Portfolio"
            >
              <DownloadIcon size={18} />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* Right Column: Illustrated Self-Portrait */}
        <div className="hero-portrait-column">
          <div
            ref={portraitRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "clamp(260px, 80vw, 390px)",
              aspectRatio: "3 / 4",
              borderRadius: "28px",
              overflow: "hidden",
              boxShadow:
                "0 0 0 5px #121019, 0 0 0 9px #9b24e8, 0 25px 60px rgba(0, 0, 0, 0.85), 0 0 45px rgba(155, 36, 232, 0.55)",
              backgroundColor: "#ebe9e4",
              transformStyle: "preserve-3d",
              willChange: "transform",
              cursor: "pointer",
              margin: "0 auto",
            }}
            title="Nesreen Mohammed"
          >
            <picture>
              <source
                type="image/avif"
                srcSet="/slides/responsive/nesreen-portrait-390.avif 390w, /slides/responsive/nesreen-portrait-640.avif 640w, /slides/responsive/nesreen-portrait-780.avif 780w"
                sizes="(max-width: 487px) 80vw, 390px"
              />
              <img
                src="/slides/responsive/nesreen-portrait-390.webp"
                srcSet="/slides/responsive/nesreen-portrait-390.webp 390w, /slides/responsive/nesreen-portrait-780.webp 780w, /slides/nesreen-portrait.webp 855w"
                sizes="(max-width: 487px) 80vw, 390px"
                fetchPriority="high"
                loading="eager"
                alt="Nesreen Mohammed Illustrated Self-Portrait"
                width="390"
                height="520"
                style={{ width: "100%", height: "100%", objectFit: "cover", userSelect: "none", display: "block" }}
              />
            </picture>

            <div
              style={{
                position: "absolute",
                bottom: "12px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(18, 17, 24, 0.9)",
                backdropFilter: "blur(12px)",
                padding: "0.4rem 1rem",
                borderRadius: "9999px",
                border: "1px solid rgba(155, 36, 232, 0.45)",
                fontSize: "0.82rem",
                fontWeight: 700,
                color: "#ffffff",
                whiteSpace: "nowrap",
              }}
            >
              Digital Illustrator & Visual Artist
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-grid-container {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          align-items: center;
          gap: 3.5rem;
        }
        .hero-text-column {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }
        .hero-actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.9rem;
        }
        .hero-btn {
          padding: 0.85rem 1.5rem;
          font-size: 0.95rem;
        }
        .hero-portrait-column {
          display: flex;
          justifyContent: center;
          align-items: center;
          width: 100%;
        }
        @media (max-width: 960px) {
          .hero-grid-container {
            grid-template-columns: 1fr;
            gap: 2.8rem;
          }
          .hero-text-column {
            align-items: center;
            text-align: center;
            width: 100%;
          }
          .hero-text-column h1 {
            text-align: center;
          }
          .hero-text-column p {
            text-align: center;
            margin-left: auto;
            margin-right: auto;
          }
          .hero-actions {
            justify-content: center;
            width: 100%;
          }
        }
        @media (max-width: 580px) {
          .hero-actions {
            width: 100%;
            flex-direction: column;
            align-items: stretch !important;
            gap: 0.75rem;
          }
          .hero-actions button,
          .hero-actions a {
            width: 100%;
            justify-content: center;
            padding: 0.9rem 1.2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
