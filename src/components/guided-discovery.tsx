"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  X,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Route,
  FileText,
  Camera,
  Receipt,
  Zap,
  Compass,
  Leaf,
  Wrench,
  Droplets,
  Bug,
  Car,
  Wind,
  Heart,
  Waves,
  Cog,
  Grid3x3,
  type LucideIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { APP_STORE_URL, BOOK_FREE_SETUP_URL } from "../lib/links";
import {
  intentOptions,
  industryOptions,
  getRecommendation,
  STORAGE_KEYS,
  type Recommendation,
} from "../data/guided-discovery";

// =============================================================================
// ICON MAP — maps string names from config to Lucide components
// =============================================================================

const iconMap: Record<string, LucideIcon> = {
  route: Route,
  "file-text": FileText,
  camera: Camera,
  receipt: Receipt,
  zap: Zap,
  compass: Compass,
  leaf: Leaf,
  sparkles: Sparkles,
  wrench: Wrench,
  droplets: Droplets,
  bug: Bug,
  car: Car,
  wind: Wind,
  heart: Heart,
  waves: Waves,
  cog: Cog,
  "grid-3x3": Grid3x3,
};

function OptionIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}

// =============================================================================
// TYPES
// =============================================================================

type TutorialStep = "intent" | "industry" | "recommendation";
type PanelState = "expanded" | "collapsed" | "hidden";

// =============================================================================
// STORAGE HELPERS — safe for SSR (no window access during render)
// =============================================================================

function safeGet(key: string): string | null {
  if (typeof window === "undefined") return null;
  try { return localStorage.getItem(key); } catch { return null; }
}

function safeSet(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(key, value); } catch { /* noop */ }
}

function safeRemove(key: string): void {
  if (typeof window === "undefined") return;
  try { localStorage.removeItem(key); } catch { /* noop */ }
}

// =============================================================================
// ANALYTICS HOOKS (TODO: wire to your analytics provider)
// =============================================================================

function trackEvent(event: string, data?: Record<string, string>) {
  // TODO: Replace with your analytics call (e.g. Mixpanel, PostHog, GA4)
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    console.log(`[GuidedDiscovery] ${event}`, data);
  }
}

// =============================================================================
// COMPONENT
// =============================================================================

export function GuidedDiscovery() {
  const [panelState, setPanelState] = useState<PanelState>("hidden");
  const [step, setStep] = useState<TutorialStep>("intent");
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [mounted, setMounted] = useState(false);

  // Hydration — read localStorage after mount to avoid SSR mismatch
  useEffect(() => {
    setMounted(true);

    const completed = safeGet(STORAGE_KEYS.completed);
    const dismissed = safeGet(STORAGE_KEYS.dismissed);
    const savedIntent = safeGet(STORAGE_KEYS.intent);
    const savedIndustry = safeGet(STORAGE_KEYS.industry);

    if (completed === "true") {
      // Returning user who completed the tutorial — show collapsed with their choice
      setSelectedIntent(savedIntent);
      setSelectedIndustry(savedIndustry);
      setPanelState("collapsed");
      trackEvent("guided_tutorial_returning_user");
    } else if (dismissed === "true") {
      // User dismissed but didn't complete — show collapsed
      setPanelState("collapsed");
    } else {
      // First-time visitor — show expanded after a short delay
      const timer = setTimeout(() => {
        setPanelState("expanded");
        trackEvent("guided_tutorial_view");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Handle intent selection
  const handleIntentSelect = useCallback((intentId: string) => {
    setSelectedIntent(intentId);
    safeSet(STORAGE_KEYS.intent, intentId);
    trackEvent("guided_tutorial_answer_select", { step: "intent", value: intentId });

    if (intentId === "exploring") {
      // Skip industry step — go straight to recommendation
      const rec = getRecommendation(intentId, "other");
      setRecommendation(rec);
      setStep("recommendation");
      trackEvent("guided_tutorial_step_view", { step: "recommendation" });
    } else {
      setStep("industry");
      trackEvent("guided_tutorial_step_view", { step: "industry" });
    }
  }, []);

  // Handle industry selection
  const handleIndustrySelect = useCallback((industryId: string) => {
    setSelectedIndustry(industryId);
    safeSet(STORAGE_KEYS.industry, industryId);
    trackEvent("guided_tutorial_answer_select", { step: "industry", value: industryId });

    const rec = getRecommendation(selectedIntent!, industryId);
    setRecommendation(rec);
    setStep("recommendation");
    safeSet(STORAGE_KEYS.completed, "true");
    trackEvent("guided_tutorial_complete", { intent: selectedIntent!, industry: industryId });
    trackEvent("guided_tutorial_step_view", { step: "recommendation" });
  }, [selectedIntent]);

  // Dismiss — collapse to pill
  const handleDismiss = useCallback(() => {
    setPanelState("collapsed");
    safeSet(STORAGE_KEYS.dismissed, "true");
    trackEvent("guided_tutorial_dismiss");
  }, []);

  // Reopen from pill
  const handleReopen = useCallback(() => {
    setPanelState("expanded");
    trackEvent("guided_tutorial_reopen");
  }, []);

  // Reset — start over
  const handleReset = useCallback(() => {
    setStep("intent");
    setSelectedIntent(null);
    setSelectedIndustry(null);
    setRecommendation(null);
    safeRemove(STORAGE_KEYS.completed);
    safeRemove(STORAGE_KEYS.dismissed);
    safeRemove(STORAGE_KEYS.intent);
    safeRemove(STORAGE_KEYS.industry);
    setPanelState("expanded");
    trackEvent("guided_tutorial_reset");
  }, []);

  // Don't render anything until client-side hydration is complete
  if (!mounted) return null;

  // --- COLLAPSED PILL ---
  if (panelState === "collapsed") {
    const savedIndustryLabel = industryOptions.find((i) => i.id === selectedIndustry)?.label;
    const isCompleted = safeGet(STORAGE_KEYS.completed) === "true";

    return (
      <div className="fixed bottom-6 left-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <button
          onClick={handleReopen}
          className={cn(
            "flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium",
            "bg-primary text-primary-foreground shadow-lg shadow-primary/30",
            "hover:shadow-primary/50 hover:scale-105 transition-all duration-300",
            "min-h-[44px]",
          )}
          aria-label="Open guided discovery"
        >
          <Sparkles className="h-4 w-4" />
          {isCompleted && savedIndustryLabel ? (
            <span>Personalised for {savedIndustryLabel} — Change</span>
          ) : (
            <span>Need help finding the right setup?</span>
          )}
        </button>
      </div>
    );
  }

  // --- HIDDEN ---
  if (panelState === "hidden") return null;

  // --- EXPANDED PANEL ---
  return (
    <div
      className="fixed bottom-6 left-6 right-6 sm:right-auto sm:w-[420px] z-50 animate-in fade-in slide-in-from-bottom-6 duration-500"
      role="dialog"
      aria-label="Guided discovery"
      aria-modal="false"
    >
      <div className="bg-card border border-border rounded-2xl shadow-2xl shadow-black/20 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-card/80 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">
              {step === "intent" && "Find your setup"}
              {step === "industry" && "Almost there"}
              {step === "recommendation" && "Your recommendation"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {/* Step indicator dots */}
            <div className="flex items-center gap-1.5 mr-3">
              {["intent", "industry", "recommendation"].map((s, i) => (
                <div
                  key={s}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    s === step ? "w-4 bg-primary" : "w-1.5",
                    s !== step && i < ["intent", "industry", "recommendation"].indexOf(step) ? "bg-primary/50" : "",
                    s !== step && i >= ["intent", "industry", "recommendation"].indexOf(step) ? "bg-muted-foreground/30" : "",
                  )}
                />
              ))}
            </div>
            <button
              onClick={handleDismiss}
              className="p-1.5 rounded-lg hover:bg-secondary transition-colors min-h-[32px] min-w-[32px] flex items-center justify-center"
              aria-label="Close guided discovery"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-5 py-5 max-h-[60vh] overflow-y-auto">
          {/* STEP 1: Intent */}
          {step === "intent" && (
            <div className="animate-in fade-in duration-300">
              <p className="text-base font-semibold mb-1">
                What are you mainly trying to do today?
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Pick one — you can always change your answer later.
              </p>
              <div className="space-y-2">
                {intentOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleIntentSelect(option.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium",
                      "border border-border hover:border-primary/50 hover:bg-primary/5",
                      "transition-all duration-200 min-h-[48px]",
                      "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background",
                    )}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <OptionIcon name={option.icon} className="h-4 w-4 text-primary" />
                    </div>
                    <span className="flex-1">{option.label}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground/60 mt-4 text-center">
                You can skip this anytime
              </p>
            </div>
          )}

          {/* STEP 2: Industry */}
          {step === "industry" && (
            <div className="animate-in fade-in duration-300">
              <p className="text-base font-semibold mb-1">
                What type of service business are you in?
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                This helps us show you the most relevant features.
              </p>
              <div className="space-y-2">
                {industryOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleIndustrySelect(option.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium",
                      "border border-border hover:border-primary/50 hover:bg-primary/5",
                      "transition-all duration-200 min-h-[48px]",
                      "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background",
                    )}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <OptionIcon name={option.icon} className="h-4 w-4 text-primary" />
                    </div>
                    <span className="flex-1">{option.label}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                  </button>
                ))}
              </div>
              <button
                onClick={() => { setStep("intent"); trackEvent("guided_tutorial_step_back"); }}
                className="mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back
              </button>
            </div>
          )}

          {/* STEP 3: Recommendation */}
          {step === "recommendation" && recommendation && (
            <div className="animate-in fade-in duration-300">
              <div className="mb-5">
                <p className="text-base font-semibold mb-2">
                  {recommendation.heading}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {recommendation.explanation}
                </p>
              </div>

              {/* Recommended page link */}
              <Link
                href={recommendation.recommendedPage}
                onClick={() => trackEvent("guided_tutorial_recommendation_click", { type: "page", url: recommendation.recommendedPage })}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium",
                  "bg-primary/10 border border-primary/20 hover:bg-primary/20",
                  "transition-all duration-200 mb-3",
                )}
              >
                <span className="flex-1">{recommendation.recommendedPageLabel}</span>
                <ArrowRight className="h-4 w-4 text-primary shrink-0" />
              </Link>

              {/* CTAs */}
              <div className="space-y-2">
                <Button className="w-full min-h-[44px] text-sm" asChild>
                  <Link
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("guided_tutorial_recommendation_click", { type: "app_store" })}
                    data-cta="app_store"
                    data-location="guided-discovery"
                  >
                    {recommendation.primaryCtaLabel}
                  </Link>
                </Button>
                <Button variant="outline" className="w-full min-h-[44px] text-sm" asChild>
                  <Link
                    href={BOOK_FREE_SETUP_URL}
                    onClick={() => trackEvent("guided_tutorial_recommendation_click", { type: "setup" })}
                    data-cta="setup"
                    data-location="guided-discovery"
                  >
                    {recommendation.secondaryCtaLabel}
                  </Link>
                </Button>
              </div>

              {/* Reset */}
              <button
                onClick={handleReset}
                className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mx-auto"
              >
                <RotateCcw className="h-3 w-3" />
                Start over
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
