"use client";

import React, { useEffect, useRef } from "react";

// =============================================================================
// HeroRoute
//
// The subtle animated backdrop behind the hero headline. It evokes what
// DayRoute does: a GPS route line that "draws" itself between job pins, with
// the pins gently pulsing. Two layers move at different rates on mouse-move and
// scroll to create depth (parallax).
//
// Performance: everything is transform/opacity only (GPU), so it holds 60fps
// and never triggers layout. Parallax is skipped entirely when the user prefers
// reduced motion; the CSS also freezes the line into a finished static frame.
// =============================================================================

export function HeroRoute() {
  const backRef = useRef<HTMLDivElement | null>(null);
  const frontRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    // Bail out of parallax for reduced-motion users (static backdrop remains).
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let mouseX = 0;
    let mouseY = 0;
    let scrollY = 0;
    let raf = 0;

    // Apply the combined mouse + scroll offset to each layer at its own rate.
    const apply = () => {
      if (backRef.current) {
        backRef.current.style.transform = `translate3d(${mouseX * 14}px, ${
          mouseY * 14 + scrollY * 0.15
        }px, 0)`;
      }
      if (frontRef.current) {
        frontRef.current.style.transform = `translate3d(${mouseX * 28}px, ${
          mouseY * 28 + scrollY * 0.3
        }px, 0)`;
      }
      raf = 0;
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onMouse = (e: MouseEvent) => {
      // Normalise pointer to -0.5..0.5 around the viewport centre.
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;
      schedule();
    };
    const onScroll = () => {
      scrollY = window.scrollY;
      schedule();
    };

    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Soft teal glow — the slow back layer. */}
      <div
        ref={backRef}
        className="absolute left-1/2 top-[-10%] h-[70vh] w-[70vh] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        style={{ willChange: "transform" }}
      />

      {/* Route line + pins — the faster front layer. */}
      <svg
        ref={frontRef}
        className="absolute inset-0 h-full w-full opacity-[0.5]"
        style={{ willChange: "transform" }}
        viewBox="0 0 1200 700"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* The winding route that draws itself in. */}
        <path
          className="route-line"
          d="M120 560 C 260 420, 360 500, 480 380 S 720 220, 860 300 S 1080 220, 1120 120"
          stroke="hsl(var(--primary))"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="10 14"
        />

        {/* Job pins along the route (each pulses). */}
        {[
          { x: 120, y: 560 },
          { x: 480, y: 380 },
          { x: 860, y: 300 },
          { x: 1120, y: 120 },
        ].map((p, i) => (
          <g
            key={i}
            className="route-pin"
            style={{ animationDelay: `${i * 0.6}s` }}
          >
            <circle cx={p.x} cy={p.y} r="16" fill="hsl(var(--primary) / 0.15)" />
            <circle cx={p.x} cy={p.y} r="6" fill="hsl(var(--primary))" />
          </g>
        ))}
      </svg>

      {/* Fade the backdrop into the page so it never competes with the text. */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
    </div>
  );
}
