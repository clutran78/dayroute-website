"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Download } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { Logo } from "./logo";
import { APP_STORE_URL } from "../lib/links";

/**
 * Navigation links for the header.
 * These appear in both desktop nav and mobile menu.
 */
const navigation = [
  { name: "Features", href: "/features" },
  { name: "Industries", href: "/industries" },
  { name: "Blog", href: "/blog" },
  { name: "Pricing", href: "/pricing" },
  { name: "Support", href: "/support" },
];

/**
 * Responsive Header Component
 * 
 * Desktop (md+): Horizontal nav with logo left, links centre, CTAs right
 * Mobile (<md): Logo + hamburger, collapsible full-width menu panel
 * 
 * Touch targets are minimum 44x44px for accessibility.
 * Download CTA reads from src/lib/links.ts (single source of truth).
 */
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Track scroll so the bar stays transparent at the very top, then gains a
  // blur + hairline border once the user scrolls (benchmark nav behaviour).
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/70 backdrop-blur-md border-b border-border"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-[68px] items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 min-h-[44px] min-w-[44px]"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Logo size={36} className="shrink-0" />
            <span className="text-lg sm:text-xl font-bold">DayRoute</span>
          </Link>

          {/* Desktop Navigation - hidden on mobile */}
          <div className="hidden md:flex md:items-center md:gap-1 lg:gap-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-lg hover:bg-secondary/50"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex md:items-center md:gap-3">
            <Button size="sm" asChild>
              <Link
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="gap-2"
                data-cta="app_store"
                data-location="nav"
              >
                <Download className="h-4 w-4" />
                <span>Start Free</span>
              </Link>
            </Button>
          </div>

          {/* Mobile: Download button + Menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <Button size="sm" asChild className="h-10 px-3">
              <Link
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="app_store"
                data-location="nav-mobile"
              >
                <Download className="h-4 w-4" />
              </Link>
            </Button>
            
            {/* Hamburger menu button - 44x44 minimum touch target */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2.5 min-h-[44px] min-w-[44px] hover:bg-secondary/50 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">
                {mobileMenuOpen ? "Close menu" : "Open menu"}
              </span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu — full-screen overlay (not a dropdown). Large centred
          links, fades + eases in. Body scroll is locked while it's open. */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-40 bg-background/98 backdrop-blur-xl transition-all duration-300 ease-in-out",
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      >
        <div className="flex h-full flex-col items-center justify-center gap-2 px-6">
          {navigation.map((item, i) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "font-display text-3xl font-bold text-foreground/90 hover:text-primary transition-all duration-300 py-2",
                mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
              )}
              style={{ transitionDelay: mobileMenuOpen ? `${i * 60}ms` : "0ms" }}
            >
              {item.name}
            </Link>
          ))}

          {/* Single dominant CTA */}
          <Button size="lg" className="mt-8 w-full max-w-xs gap-2" asChild>
            <Link
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              data-cta="app_store"
              data-location="nav-mobile-menu"
            >
              <Download className="h-5 w-5" />
              Start Free
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
