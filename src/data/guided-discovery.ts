/**
 * Guided Discovery — Configuration & Recommendation Engine
 *
 * Powers the floating tutorial on the homepage. Users answer 2 questions
 * and get a personalised recommendation for where to go next.
 *
 * To add options or change recommendations, edit the arrays below.
 * No backend needed — everything is rule-based and client-side.
 */

// =============================================================================
// STEP 1: Intent — "What are you mainly trying to do today?"
// =============================================================================

export interface IntentOption {
  id: string;
  label: string;
  /** Lucide icon name — rendered by the component via iconMap. */
  icon: string;
}

export const intentOptions: IntentOption[] = [
  { id: "routes", label: "Plan jobs and routes", icon: "route" },
  { id: "invoicing", label: "Send invoices faster", icon: "file-text" },
  { id: "photos", label: "Track before/after photos", icon: "camera" },
  { id: "expenses", label: "Manage receipts & logbook", icon: "receipt" },
  { id: "workflow", label: "Set up my business workflow", icon: "zap" },
  { id: "exploring", label: "I'm just exploring", icon: "compass" },
];

// =============================================================================
// STEP 2: Industry — "What type of service business are you in?"
// =============================================================================

export interface IndustryOption {
  id: string;
  label: string;
  /** Lucide icon name — rendered by the component via iconMap. */
  icon: string;
}

export const industryOptions: IndustryOption[] = [
  { id: "gardening", label: "Gardening / Lawn Care", icon: "leaf" },
  { id: "cleaning", label: "Cleaning", icon: "sparkles" },
  { id: "trades", label: "Handyman / Trades", icon: "wrench" },
  { id: "pressure-washing", label: "Pressure Washing", icon: "droplets" },
  { id: "pest-control", label: "Pest Control", icon: "bug" },
  { id: "detailing", label: "Mobile Detailing", icon: "car" },
  { id: "hvac", label: "HVAC / Air Conditioning", icon: "wind" },
  { id: "ndis", label: "NDIS / Mobile Support", icon: "heart" },
  { id: "pool", label: "Pool & Spa Services", icon: "waves" },
  { id: "appliance", label: "Appliance Repair", icon: "cog" },
  { id: "other", label: "Other", icon: "grid-3x3" },
];

// =============================================================================
// RECOMMENDATION ENGINE — maps intent + industry to a personalised result
// =============================================================================

export interface Recommendation {
  /** Heading shown on the recommendation screen. */
  heading: string;
  /** Short explanation of why this is the best path for them. */
  explanation: string;
  /** URL of the recommended page. */
  recommendedPage: string;
  /** Label for the recommended page link. */
  recommendedPageLabel: string;
  /** Primary CTA label. */
  primaryCtaLabel: string;
  /** Secondary CTA label. */
  secondaryCtaLabel: string;
}

/**
 * Industry-specific page mapping. If a niche page exists for this industry,
 * it's listed here. Falls back to /industries if not.
 */
const industryPages: Record<string, { url: string; label: string }> = {
  gardening: { url: "/gardening-business-scheduling-invoicing-app-australia", label: "DayRoute for Gardeners" },
  cleaning: { url: "/cleaning-business-scheduling-invoicing-app-australia", label: "DayRoute for Cleaners" },
  trades: { url: "/handyman-job-management-route-invoicing-app-australia", label: "DayRoute for Tradies" },
  "pressure-washing": { url: "/pressure-washing-business-route-invoicing-app-australia", label: "DayRoute for Pressure Washers" },
  "pest-control": { url: "/pest-control-job-scheduling-route-app-australia", label: "DayRoute for Pest Control" },
  detailing: { url: "/mobile-detailing-route-invoicing-app-australia", label: "DayRoute for Mobile Detailers" },
  ndis: { url: "/ndis-support-worker-route-planner-invoicing-app-australia", label: "DayRoute for NDIS Providers" },
  pool: { url: "/pool-service-business-scheduling-invoicing-app-australia", label: "DayRoute for Pool Services" },
};

/**
 * Feature page mapping — maps intents to the best feature page.
 */
const featurePages: Record<string, { url: string; label: string }> = {
  routes: { url: "/route-planning-for-service-businesses-australia", label: "Route Planning" },
  invoicing: { url: "/mobile-invoicing-after-job-completion-iphone", label: "Mobile Invoicing" },
  photos: { url: "/before-after-photos-for-service-jobs", label: "Before & After Photos" },
  expenses: { url: "/mileage-logbook-receipts-for-service-businesses-australia", label: "Logbook & Receipts" },
  workflow: { url: "/field-service-workflow-app-for-iphone-australia", label: "Field Service Workflow" },
};

/**
 * Generate a personalised recommendation based on user answers.
 */
export function getRecommendation(intentId: string, industryId: string): Recommendation {
  const industry = industryOptions.find((i) => i.id === industryId);
  const industryLabel = industry?.label ?? "your business";

  // "Just exploring" — send to industries hub
  if (intentId === "exploring") {
    return {
      heading: `Great — let's show you around`,
      explanation: `The industries page shows every service category DayRoute supports, with links to detailed pages for each one.`,
      recommendedPage: "/industries",
      recommendedPageLabel: "Browse all industries",
      primaryCtaLabel: "Download on the App Store",
      secondaryCtaLabel: "Book Free 15-Min Setup",
    };
  }

  // If we have a niche industry page, prioritise that
  const nicheIndustry = industryPages[industryId];
  const featurePage = featurePages[intentId];

  if (nicheIndustry) {
    // We have a dedicated page for this industry
    const intentExplanations: Record<string, string> = {
      routes: `DayRoute plans the fastest route between your ${industryLabel.toLowerCase()} jobs each day — so you spend less time driving and more time working.`,
      invoicing: `DayRoute lets you create and send invoices from your phone the moment you finish a ${industryLabel.toLowerCase()} job. No more weekend admin.`,
      photos: `DayRoute lets you snap timestamped before-and-after photos for every ${industryLabel.toLowerCase()} job — attached to the job record for proof of work.`,
      expenses: `DayRoute scans receipts with AI and tracks your vehicle mileage automatically. Everything is GST-tracked and BAS-ready for your ${industryLabel.toLowerCase()} business.`,
      workflow: `DayRoute combines route planning, job scheduling, invoicing, and expense tracking in one app — built for ${industryLabel.toLowerCase()} professionals.`,
    };

    return {
      heading: `Here's what we recommend for ${industryLabel}`,
      explanation: intentExplanations[intentId] ?? `DayRoute is built for ${industryLabel.toLowerCase()} businesses across Australia.`,
      recommendedPage: nicheIndustry.url,
      recommendedPageLabel: nicheIndustry.label,
      primaryCtaLabel: "Download on the App Store",
      secondaryCtaLabel: "Book Free 15-Min Setup",
    };
  }

  // No niche industry page — use the feature page instead
  if (featurePage) {
    return {
      heading: `Here's the best starting point for you`,
      explanation: `Based on your focus on ${featurePage.label.toLowerCase()}, this page shows exactly how DayRoute handles it for ${industryLabel.toLowerCase()} businesses.`,
      recommendedPage: featurePage.url,
      recommendedPageLabel: `Learn about ${featurePage.label}`,
      primaryCtaLabel: "Download on the App Store",
      secondaryCtaLabel: "Book Free 15-Min Setup",
    };
  }

  // Final fallback
  return {
    heading: `DayRoute works for ${industryLabel}`,
    explanation: `DayRoute supports every mobile service business with route planning, job scheduling, invoicing, and expense tracking. See all supported industries.`,
    recommendedPage: "/industries",
    recommendedPageLabel: "Browse all industries",
    primaryCtaLabel: "Download on the App Store",
    secondaryCtaLabel: "Book Free 15-Min Setup",
  };
}

// =============================================================================
// LOCALSTORAGE KEYS
// =============================================================================

export const STORAGE_KEYS = {
  completed: "dayroute_discovery_completed",
  dismissed: "dayroute_discovery_dismissed",
  intent: "dayroute_discovery_intent",
  industry: "dayroute_discovery_industry",
} as const;
