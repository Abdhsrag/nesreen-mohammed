"use client";

import React from "react";
import { DownloadIcon, MessageCircleIcon, ArrowUpIcon } from "@animateicons/react/lucide";
import { sounds } from "./AudioEffects";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    sounds.playSlideClick();
  };

  return (
    <footer
      id="contact"
      style={{
        marginTop: "5rem",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        backgroundColor: "#09080d",
        padding: "3.5rem 0 5.5rem",
        color: "var(--text-secondary)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "2rem",
            paddingBottom: "2rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.4rem" }}>
              <span style={{ fontWeight: 800, fontSize: "1.2rem", color: "#ffffff", letterSpacing: "0.04em" }}>
                NESREEN MOHAMMED
              </span>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--primary-purple)" }} />
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", maxWidth: "420px", lineHeight: 1.5 }}>
              Creative Portfolio 2025 - 2026 • Specialized in illustration, graphic & character design, and animation storyboarding.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", flexWrap: "wrap" }}>
            <a
              href="/nesreen-mohammed-portfolio.pdf"
              download="Nesreen-Mohammed-Portfolio-2026.pdf"
              className="btn-secondary"
              style={{ fontSize: "0.85rem", padding: "0.6rem 1.2rem" }}
              aria-label="Download Nesreen Mohammed Portfolio PDF"
            >
              <DownloadIcon size={16} />
              <span>Download PDF</span>
            </a>

            <a
              href="https://wa.me/201015344062?text=Hello%20Nesreen,%20I%20love%20your%20portfolio!"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontSize: "0.85rem", padding: "0.6rem 1.2rem", background: "linear-gradient(135deg, #10b981 0%, #059669 100%)" }}
              aria-label="Chat with Nesreen on WhatsApp"
            >
              <MessageCircleIcon size={16} />
              <span>WhatsApp Chat</span>
            </a>

            <button onClick={scrollToTop} className="btn-icon" style={{ width: "42px", height: "42px" }} title="Back to top" aria-label="Scroll back to top of page">
              <ArrowUpIcon size={18} />
            </button>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            paddingTop: "1.8rem",
            fontSize: "0.82rem",
            color: "var(--text-muted)",
          }}
        >
          <div>
            © 2025 - 2026 <strong>Nesreen Mohammed</strong>. All artwork, illustrations & designs reserved.
          </div>

          <div>
            Cairo, Egypt • <a href="mailto:Nesreen.1d@gmail.com" style={{ color: "var(--primary-purple-light)" }}>Nesreen.1d@gmail.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
