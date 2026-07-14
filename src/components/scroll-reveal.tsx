"use client";

import React, { useEffect, useRef, useState } from "react";

// =============================================================================
// ScrollReveal
//
// Wraps content so it fades + rises into view when scrolled into the viewport.
// The heavy lifting (fade+rise, reduced-motion fallback) lives in globals.css
// via the `.reveal` / `.is-visible` classes — this component just toggles them
// using a lightweight IntersectionObserver.
//
// `delay` (ms) staggers a group of items (e.g. 0, 80, 160, ... for cards).
// =============================================================================

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Render as a different element (default div). */
  as?: "div" | "li" | "section";
};

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Reveal once, when ~15% of the element is on screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // reveal only once — no re-hiding
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
