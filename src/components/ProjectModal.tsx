"use client";

import React, { useState, useEffect, useRef } from "react";
import { XIcon, ChevronLeftIcon, ChevronRightIcon } from "@animateicons/react/lucide";
import { ProjectItem } from "@/data/projects";
import { sounds } from "./AudioEffects";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (!project) return;
      if (e.key === "ArrowRight") {
        setActiveImageIdx((prev) => (prev < project.images.length - 1 ? prev + 1 : 0));
        sounds.playSlideClick();
      }
      if (e.key === "ArrowLeft") {
        setActiveImageIdx((prev) => (prev > 0 ? prev - 1 : project.images.length - 1));
        sounds.playSlideClick();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [project, onClose]);

  if (!project) return null;

  const currentImage = project.images[activeImageIdx] || project.images[0];

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 40) {
      // Swiped Left -> Next Image
      setActiveImageIdx((prev) => (prev < project.images.length - 1 ? prev + 1 : 0));
      sounds.playSlideClick();
    } else if (distance < -40) {
      // Swiped Right -> Prev Image
      setActiveImageIdx((prev) => (prev > 0 ? prev - 1 : project.images.length - 1));
      sounds.playSlideClick();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        backgroundColor: "rgba(6, 5, 10, 0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(0.5rem, 3vw, 1.5rem)",
      }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
        style={{
          position: "relative",
          maxWidth: "1280px",
          width: "100%",
          maxHeight: "95vh",
          backgroundColor: "#13121b",
          borderRadius: "clamp(16px, 3vw, 28px)",
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 25px 80px rgba(0, 0, 0, 0.85), 0 0 45px rgba(155, 36, 232, 0.35)",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.85rem clamp(1rem, 2vw, 1.5rem)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            backgroundColor: "rgba(255, 255, 255, 0.02)",
            gap: "0.8rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem", overflow: "hidden" }}>
            <span className="badge" style={{ fontSize: "0.75rem", padding: "0.2rem 0.6rem" }}>{project.category}</span>
            <strong id="modal-project-title" style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)", color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {project.title}
            </strong>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>• {project.year}</span>
          </div>

          {/* Pixel-perfect dead-centered Close Button */}
          <button
            onClick={onClose}
            aria-label="Close project modal dialog"
            title="Close (Esc)"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              minWidth: "36px",
              minHeight: "36px",
              borderRadius: "50%",
              padding: 0,
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#ffffff",
              cursor: "pointer",
              lineHeight: 0,
              flexShrink: 0,
              transition: "all 0.2s ease",
            }}
          >
            <XIcon size={18} />
          </button>
        </div>

        {/* Modal Artwork Viewport with Touch Swipe */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            position: "relative",
            flex: 1,
            minHeight: "220px",
            backgroundColor: "#07060b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            userSelect: "none",
            touchAction: "pan-y",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentImage.url}
            alt={currentImage.caption}
            style={{ width: "100%", maxHeight: "62vh", objectFit: "contain", display: "block" }}
          />

          {project.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIdx((prev) => (prev > 0 ? prev - 1 : project.images.length - 1));
                  sounds.playSlideClick();
                }}
                className="deck-arrow-btn left modal-nav-arrow"
                style={{ width: "46px", height: "46px" }}
                aria-label="View previous visual slide"
                title="Previous image"
              >
                <ChevronLeftIcon size={24} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIdx((prev) => (prev < project.images.length - 1 ? prev + 1 : 0));
                  sounds.playSlideClick();
                }}
                className="deck-arrow-btn right modal-nav-arrow"
                style={{ width: "46px", height: "46px" }}
                aria-label="View next visual slide"
                title="Next image"
              >
                <ChevronRightIcon size={24} />
              </button>
            </>
          )}

          <div
            style={{
              position: "absolute",
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(12, 11, 16, 0.88)",
              backdropFilter: "blur(8px)",
              padding: "0.3rem 0.85rem",
              borderRadius: "9999px",
              fontSize: "0.78rem",
              color: "#e2e0ee",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              whiteSpace: "nowrap",
              pointerEvents: "none",
            }}
          >
            {currentImage.caption} ({activeImageIdx + 1} / {project.images.length}) • Swipe to browse
          </div>
        </div>

        {/* Modal Description & Tags */}
        <div style={{ padding: "1rem clamp(1rem, 2vw, 1.5rem)", borderTop: "1px solid rgba(255, 255, 255, 0.08)", background: "#111018", overflowY: "auto", maxHeight: "25vh" }}>
          <p style={{ fontSize: "0.92rem", color: "#c8c6d6", lineHeight: 1.5, marginBottom: "0.5rem" }}>
            {project.details}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
            {project.tags.map((t, idx) => (
              <span key={idx} style={{ fontSize: "0.72rem", padding: "0.18rem 0.55rem", borderRadius: "9999px", background: "rgba(255, 255, 255, 0.06)", color: "var(--text-secondary)" }}>
                #{t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
