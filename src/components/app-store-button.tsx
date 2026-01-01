"use client";

import React from "react";
import Link from "next/link";
import { Download, Apple } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import {
  getDownloadUrl,
  getDownloadCta,
  isComingSoon,
  APP_STORE_URL,
  IS_APP_LIVE,
} from "../lib/app-store-config";

// =============================================================================
// APP STORE BUTTON COMPONENT
// =============================================================================

interface AppStoreButtonProps {
  /** Button size variant */
  size?: "default" | "sm" | "lg";
  /** Button style variant */
  variant?: "default" | "outline" | "secondary" | "ghost";
  /** Additional CSS classes */
  className?: string;
  /** Show full Apple badge or just icon + text */
  showBadge?: boolean;
  /** Override the default CTA text */
  ctaText?: string;
  /** Whether to open in new tab (default: true for external links) */
  newTab?: boolean;
}

/**
 * App Store Download Button Component
 * 
 * A reusable button for App Store downloads.
 * Automatically handles:
 * - "Coming Soon" vs "Download" text based on IS_APP_LIVE config
 * - Correct App Store URL
 * - Accessibility attributes
 * 
 * Usage:
 * <AppStoreButton />                           // Default button
 * <AppStoreButton size="lg" showBadge />       // Large with Apple badge
 * <AppStoreButton variant="outline" />         // Outline style
 */
export function AppStoreButton({
  size = "default",
  variant = "default",
  className,
  showBadge = false,
  ctaText,
  newTab = true,
}: AppStoreButtonProps) {
  const url = getDownloadUrl();
  const defaultCta = getDownloadCta();
  const text = ctaText || defaultCta;
  
  // When app is not live, link to waitlist section (same page anchor)
  const isExternalLink = IS_APP_LIVE && url.startsWith("http");
  
  // Badge style - looks like official App Store badge
  if (showBadge) {
    return (
      <Link
        href={url}
        target={isExternalLink && newTab ? "_blank" : undefined}
        rel={isExternalLink ? "noopener noreferrer" : undefined}
        className={cn(
          "inline-flex items-center gap-2 bg-black text-white rounded-xl px-4 py-2 hover:bg-black/90 transition-colors",
          "min-h-[44px]", // Touch target
          className
        )}
        aria-label={IS_APP_LIVE ? "Download DayRoute on the App Store" : "Join the DayRoute waitlist"}
      >
        <Apple className="h-8 w-8" />
        <div className="flex flex-col items-start text-left">
          <span className="text-[10px] leading-none opacity-80">
            {isComingSoon() ? "Coming Soon on" : "Download on the"}
          </span>
          <span className="text-lg font-semibold leading-tight">App Store</span>
        </div>
      </Link>
    );
  }
  
  // Standard button style
  return (
    <Button
      size={size}
      variant={variant}
      asChild
      className={cn("min-h-[44px]", className)}
    >
      <Link
        href={url}
        target={isExternalLink && newTab ? "_blank" : undefined}
        rel={isExternalLink ? "noopener noreferrer" : undefined}
        aria-label={IS_APP_LIVE ? "Download DayRoute on the App Store" : "Join the DayRoute waitlist"}
      >
        <Download className="mr-2 h-5 w-5" />
        {text}
      </Link>
    </Button>
  );
}

// =============================================================================
// SUBSCRIBE BUTTON - Links to in-app subscription
// =============================================================================

interface SubscribeButtonProps {
  /** The plan to subscribe to */
  plan?: "pro-monthly" | "pro-yearly" | "team-3" | "team-10";
  /** Button size */
  size?: "default" | "sm" | "lg";
  /** Button variant */
  variant?: "default" | "outline" | "secondary";
  /** Additional classes */
  className?: string;
  /** Override CTA text */
  ctaText?: string;
}

/**
 * Subscribe Button Component
 * 
 * Links to specific subscription plans.
 * When the app is live, this opens the app to the subscription screen.
 * When the app is not live, links to the pricing page.
 */
export function SubscribeButton({
  plan,
  size = "default",
  variant = "default",
  className,
  ctaText = "Start 7-day free trial",
}: SubscribeButtonProps) {
  // When app is live, we'd use deep links
  // For now, link to App Store or pricing page
  const url = IS_APP_LIVE 
    ? (plan ? `${APP_STORE_URL}` : APP_STORE_URL)
    : "/pricing";
  
  return (
    <Button
      size={size}
      variant={variant}
      asChild
      className={cn("min-h-[44px]", className)}
    >
      <Link
        href={url}
        target={IS_APP_LIVE ? "_blank" : undefined}
        rel={IS_APP_LIVE ? "noopener noreferrer" : undefined}
      >
        {ctaText}
      </Link>
    </Button>
  );
}

export default AppStoreButton;

