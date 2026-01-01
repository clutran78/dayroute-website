"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Download } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { Logo } from "./logo";
import {
  getDownloadUrl,
  getDownloadCta,
  isComingSoon,
} from "../lib/app-store-config";

/**
 * Navigation links for the header.
 * These appear in both desktop nav and mobile menu.
 */
const navigation = [
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "Use Cases", href: "/use-cases" },
  { name: "FAQ", href: "/faq" },
  { name: "Support", href: "/support" },
];

/**
 * Responsive Header Component
 * 
 * Desktop (md+): Horizontal nav with logo left, links center, CTAs right
 * Mobile (<md): Logo + hamburger, collapsible full-width menu panel
 * 
 * Touch targets are minimum 44x44px for accessibility.
 * 
 * Uses centralized app-store-config for download links.
 * When the app is live on App Store, links automatically update.
 */
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get download URL and CTA text from centralized config
  const downloadUrl = getDownloadUrl();
  const downloadCta = getDownloadCta();
  const comingSoon = isComingSoon();

  // Close mobile menu on route change or escape key
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
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

          {/* Desktop CTAs - hidden on mobile */}
          <div className="hidden md:flex md:items-center md:gap-3">
            {/* Show waitlist when coming soon, hide when app is live */}
            {comingSoon && (
              <Button variant="outline" size="sm" asChild>
                <Link href="/#waitlist">Join Waitlist</Link>
              </Button>
            )}
            <Button size="sm" asChild>
              <Link href={downloadUrl} className="gap-2">
                <Download className="h-4 w-4" />
                <span className="hidden lg:inline">{downloadCta}</span>
                <span className="lg:hidden">Download</span>
              </Link>
            </Button>
          </div>

          {/* Mobile: Download button + Menu button */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Compact download button on mobile */}
            <Button size="sm" asChild className="h-10 px-3">
              <Link href={downloadUrl}>
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

      {/* Mobile menu panel - slides down */}
      <div
        className={cn(
          "md:hidden fixed inset-x-0 top-16 bottom-0 z-40 transition-all duration-300 ease-in-out",
          mobileMenuOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Menu content */}
        <div 
          className={cn(
            "relative bg-background border-b border-border shadow-xl transition-transform duration-300",
            mobileMenuOpen ? "translate-y-0" : "-translate-y-4"
          )}
        >
          <div className="px-4 py-6 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {/* Navigation links - large touch targets (min 48px height) */}
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center rounded-xl px-4 py-4 text-base font-medium text-foreground hover:bg-secondary transition-colors min-h-[48px]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Divider */}
            <div className="py-4">
              <div className="border-t border-border" />
            </div>
            
            {/* CTA buttons - full width, large touch targets */}
            <div className="space-y-3 pt-2">
              {/* Show waitlist when app is coming soon */}
              {comingSoon && (
                <Button 
                  variant="outline" 
                  className="w-full h-12 text-base" 
                  asChild
                >
                  <Link 
                    href="/#waitlist"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Join Waitlist
                  </Link>
                </Button>
              )}
              <Button 
                className="w-full h-12 text-base gap-2" 
                asChild
              >
                <Link 
                  href={downloadUrl}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Download className="h-5 w-5" />
                  {downloadCta}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
