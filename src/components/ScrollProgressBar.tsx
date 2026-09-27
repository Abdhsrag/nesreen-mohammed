"use client";

import React, { useEffect, useState } from "react";

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "4px",
        zIndex: 9999,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${scrollProgress}%`,
          background: "linear-gradient(90deg, #9b24e8 0%, #ec4899 50%, #fbbf24 100%)",
          boxShadow: "0 0 14px rgba(155, 36, 232, 0.9), 0 0 24px rgba(236, 72, 153, 0.6)",
          transition: "width 0.1s linear",
          borderRadius: "0 4px 4px 0",
        }}
      />
    </div>
  );
}
