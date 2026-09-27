"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SearchIcon, EyeIcon, XIcon } from "@animateicons/react/lucide";
import { PROJECTS, CATEGORIES, ProjectItem } from "@/data/projects";
import { sounds } from "./AudioEffects";
import ProjectModal from "./ProjectModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((proj) => {
      const matchCat = activeCategory === "All" || proj.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchCat;

      return (
        matchCat &&
        (proj.title.toLowerCase().includes(query) ||
          proj.description.toLowerCase().includes(query) ||
          proj.client.toLowerCase().includes(query) ||
          proj.tags.some((t) => t.toLowerCase().includes(query)))
      );
    });
  }, [activeCategory, searchQuery]);

  // GSAP ScrollTrigger: Smooth enter and leave scroll animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".project-card", { opacity: 0, y: 40, scale: 0.96 });

      ScrollTrigger.batch(".project-card", {
        start: "top 88%",
        end: "bottom 8%",
        interval: 0.08,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1, y: 0, scale: 1, stagger: 0.09, duration: 0.8, ease: "power2.out", overwrite: "auto",
          });
        },
        onLeave: (batch) => {
          gsap.to(batch, {
            opacity: 0, y: -30, scale: 0.97, stagger: 0.05, duration: 0.55, ease: "power2.inOut", overwrite: "auto",
          });
        },
        onEnterBack: (batch) => {
          gsap.to(batch, {
            opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.8, ease: "power2.out", overwrite: "auto",
          });
        },
        onLeaveBack: (batch) => {
          gsap.to(batch, {
            opacity: 0, y: 40, scale: 0.96, stagger: 0.05, duration: 0.55, ease: "power2.inOut", overwrite: "auto",
          });
        },
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <section id="projects" ref={sectionRef} style={{ padding: "5.5rem 0 4.5rem", position: "relative" }}>
      <div className="container" style={{ display: "flex", flexDirection: "column", gap: "2.8rem" }}>
        {/* Title: 100% Centered */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", width: "100%" }}>
          <span className="badge" style={{ marginBottom: "0.8rem", fontSize: "0.85rem" }}>Portfolio Showcase</span>
          <h2 style={{ fontSize: "clamp(2.4rem, 5.5vw, 3.8rem)", fontWeight: 900, color: "#fff", marginBottom: "0.8rem", textTransform: "uppercase", textAlign: "center", width: "100%" }}>
            Selected Works
          </h2>
          <p style={{ fontSize: "1.15rem", color: "var(--text-secondary)", maxWidth: "680px", margin: "0 auto", lineHeight: 1.6, textAlign: "center" }}>
            Commercial event branding, character universes, packaging illustration, and animation storyboards.
          </p>
        </div>

        {/* Toolbar */}
        <div
          style={{
            background: "rgba(20, 19, 27, 0.75)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "var(--radius-xl)",
            padding: "1.2rem 1.4rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.1rem",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ position: "relative", flex: "1 1 280px", maxWidth: "460px" }}>
              <div style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", display: "flex" }}>
                <SearchIcon size={18} />
              </div>
              <input
                type="text"
                placeholder="Search projects, clients, tags (e.g. WE, GIZ, Mascot)..."
                aria-label="Search projects by client, title, or category"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.8rem 1rem 0.8rem 2.8rem",
                  borderRadius: "9999px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                  fontSize: "0.95rem",
                  outline: "none",
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search query"
                  style={{ position: "absolute", right: "0.8rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer" }}
                >
                  <XIcon size={16} />
                </button>
              )}
            </div>

            <span style={{ fontSize: "0.95rem", color: "var(--text-secondary)" }}>
              Showing <strong style={{ color: "#fff" }}>{filteredProjects.length}</strong> Projects
            </span>
          </div>

          <div style={{ display: "flex", gap: "0.55rem", overflowX: "auto", paddingBottom: "0.3rem" }}>
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  aria-pressed={isActive}
                  onClick={() => {
                    setActiveCategory(cat);
                    sounds.playSlideClick();
                  }}
                  style={{
                    flexShrink: 0,
                    padding: "0.55rem 1.25rem",
                    borderRadius: "9999px",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    backgroundColor: isActive ? "var(--primary-purple)" : "rgba(255, 255, 255, 0.05)",
                    color: isActive ? "#fff" : "var(--text-secondary)",
                    border: isActive ? "1px solid var(--primary-purple-light)" : "1px solid rgba(255, 255, 255, 0.08)",
                    boxShadow: isActive ? "0 4px 14px rgba(155, 36, 232, 0.45)" : "none",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: "1.8rem" }}>
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              role="button"
              tabIndex={0}
              aria-label={`Open project details: ${project.title} for ${project.client}`}
              onClick={() => {
                setSelectedProject(project);
                sounds.playSlideClick();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedProject(project);
                  sounds.playSlideClick();
                }
              }}
              style={{
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                background: "rgba(20, 19, 27, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                transition: "border-color 0.25s ease, box-shadow 0.25s ease",
                willChange: "transform, opacity",
              }}
              className="project-card"
            >
              <div style={{ position: "relative", width: "100%", paddingTop: "56.25%", overflow: "hidden", backgroundColor: "#0d0c14" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.coverImage}
                  alt={project.title}
                  width="600"
                  height="338"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.45s ease" }}
                  className="project-image"
                  loading="lazy"
                />

                <div style={{ position: "absolute", top: "10px", left: "10px", display: "flex", gap: "0.4rem" }}>
                  <span className="badge" style={{ fontSize: "0.78rem", padding: "0.28rem 0.7rem" }}>
                    {project.category}
                  </span>
                  <span style={{ background: "rgba(0, 0, 0, 0.75)", color: "#fff", fontSize: "0.78rem", fontWeight: 700, padding: "0.28rem 0.6rem", borderRadius: "9999px" }}>
                    {project.images.length} Visuals
                  </span>
                </div>

                <div style={{ position: "absolute", inset: 0, background: "rgba(155, 36, 232, 0.35)", opacity: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "opacity 0.2s ease" }} className="project-hover-overlay">
                  <div style={{ background: "rgba(15, 14, 22, 0.85)", borderRadius: "50%", width: "46px", height: "46px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", boxShadow: "0 4px 15px rgba(0,0,0,0.5)" }}>
                    <EyeIcon size={22} />
                  </div>
                </div>
              </div>

              <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.65rem", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontSize: "0.88rem", color: "var(--primary-purple-light)", fontWeight: 700, textTransform: "uppercase" }}>
                    {project.client}
                  </span>
                  <span style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>{project.year}</span>
                </div>

                <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#fff", lineHeight: 1.25 }}>
                  {project.title}
                </h3>

                <p style={{ fontSize: "0.98rem", color: "var(--text-secondary)", lineHeight: 1.55, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {project.description}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "auto", paddingTop: "0.9rem" }}>
                  {project.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} style={{ fontSize: "0.8rem", padding: "0.2rem 0.65rem", borderRadius: "9999px", background: "rgba(255, 255, 255, 0.05)", color: "var(--text-muted)" }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      <style jsx>{`
        .project-card:hover {
          border-color: rgba(155, 36, 232, 0.5) !important;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.6), 0 0 25px rgba(155, 36, 232, 0.3) !important;
        }
        .project-card:hover .project-image {
          transform: scale(1.06);
        }
        .project-card:hover .project-hover-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}
