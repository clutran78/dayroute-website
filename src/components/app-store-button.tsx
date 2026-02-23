"use client";

import React from "react";
import Link from "next/link";
import { Download, Apple, CalendarCheck } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { APP_STORE_URL, BOOK_FREE_SETUP_URL } from "../lib/links";

// =============================================================================
// AppStoreCTA — primary download button used site-wide
// =============================================================================

interface AppStoreCTAProps {
  /** Button size variant. */
  size?: "default" | "sm" | "lg";
  /** Button style variant. */
  variant?: "default" | "outline" | "secondary" | "ghost";
  /** Additional CSS classes. */
  className?: string;
  /** Render the Apple badge style instead of a standard button. */
  showBadge?: boolean;
  /** Override default CTA label. */
  ctaText?: string;
  /** Open in new tab (default true). */
  newTab?: boolean;
  /** Where this CTA appears — useful for analytics. */
  location?: string;
}

/**
 * Reusable App Store download button.
 *
 * Reads the canonical URL from src/lib/links.ts so every instance
 * across the site points to the same live listing.
 *
 * Usage:
 *   <AppStoreCTA />
 *   <AppStoreCTA size="lg" location="hero" />
 *   <AppStoreCTA showBadge />
 *   <AppStoreCTA variant="outline" ctaText="Get DayRoute" />
 */
export function AppStoreCTA({
  size = "default",
  variant = "default",
  className,
  showBadge = false,
  ctaText,
  newTab = true,
  location,
}: AppStoreCTAProps) {
  const label = ctaText ?? "Download on the App Store";

  // Apple badge style (black pill with Apple logo + two-line text)
  if (showBadge) {
    return (
      <Link
        href={APP_STORE_URL}
        target={newTab ? "_blank" : undefined}
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center gap-2 bg-black text-white rounded-xl px-4 py-2 hover:bg-black/90 transition-colors",
          "min-h-[44px]",
          className,
        )}
        aria-label="Download DayRoute on the App Store"
        data-cta="app_store"
        data-location={location}
      >
        <Apple className="h-8 w-8" />
        <div className="flex flex-col items-start text-left">
          <span className="text-[10px] leading-none opacity-80">Download on the</span>
          <span className="text-lg font-semibold leading-tight">App Store</span>
        </div>
      </Link>
    );
  }

  // Standard button style
  return (
    <Button size={size} variant={variant} asChild className={cn("min-h-[44px]", className)}>
      <Link
        href={APP_STORE_URL}
        target={newTab ? "_blank" : undefined}
        rel="noopener noreferrer"
        aria-label="Download DayRoute on the App Store"
        data-cta="app_store"
        data-location={location}
      >
        <Download className="mr-2 h-5 w-5" />
        {label}
      </Link>
    </Button>
  );
}

// =============================================================================
// SetupCTA — secondary "Book Free 15-Min Setup" button
// =============================================================================

interface SetupCTAProps {
  /** Button size variant. */
  size?: "default" | "sm" | "lg";
  /** Button style variant (default: outline). */
  variant?: "default" | "outline" | "secondary" | "ghost";
  /** Additional CSS classes. */
  className?: string;
  /** Override default CTA label. */
  ctaText?: string;
  /** Where this CTA appears — useful for analytics. */
  location?: string;
}

/**
 * Secondary CTA for booking a free onboarding setup call.
 *
 * Reads the setup URL from src/lib/links.ts.
 * TODO: Update BOOK_FREE_SETUP_URL in links.ts once a booking
 * page or Calendly link is live.
 */
export function SetupCTA({
  size = "default",
  variant = "outline",
  className,
  ctaText,
  location,
}: SetupCTAProps) {
  const label = ctaText ?? "Book Free 15-Min Setup";

  return (
    <Button size={size} variant={variant} asChild className={cn("min-h-[44px]", className)}>
      <Link
        href={BOOK_FREE_SETUP_URL}
        aria-label="Book a free 15-minute DayRoute setup call"
        data-cta="setup"
        data-location={location}
      >
        <CalendarCheck className="mr-2 h-5 w-5" />
        {label}
      </Link>
    </Button>
  );
}

// =============================================================================
// SubscribeCTA — links to App Store for in-app subscription
// =============================================================================

interface SubscribeCTAProps {
  /** Button size variant. */
  size?: "default" | "sm" | "lg";
  /** Button style variant. */
  variant?: "default" | "outline" | "secondary";
  /** Additional CSS classes. */
  className?: string;
  /** Override default CTA label. */
  ctaText?: string;
  /** Where this CTA appears — useful for analytics. */
  location?: string;
}

/**
 * Subscribe CTA that links to the App Store where the user can
 * pick a plan and start their 7-day free trial inside the app.
 */
export function SubscribeCTA({
  size = "default",
  variant = "default",
  className,
  ctaText,
  location,
}: SubscribeCTAProps) {
  const label = ctaText ?? "Start 7-day free trial";

  return (
    <Button size={size} variant={variant} asChild className={cn("min-h-[44px]", className)}>
      <Link
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-cta="subscribe"
        data-location={location}
      >
        {label}
      </Link>
    </Button>
  );
}

export default AppStoreCTA;
