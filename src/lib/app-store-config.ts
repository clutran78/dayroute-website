/**
 * App Store Connect Configuration
 *
 * Technical config for App Store Connect, RevenueCat product IDs,
 * and universal/deep links. For the canonical App Store URL used
 * by CTA components, see src/lib/links.ts.
 */

// Re-export the canonical URL so existing imports keep working.
export { APP_STORE_URL } from "./links";

// =============================================================================
// App Store Connect identifiers
// =============================================================================

export const APPLE_APP_ID = "6757166638";
export const APPLE_TEAM_ID = "XXXXXXXXXX";
export const APP_BUNDLE_ID = "com.dayroute.app";

/** The app is live on the Apple App Store. */
export const IS_APP_LIVE = true;

// =============================================================================
// Universal / Deep link URLs
// =============================================================================

export const DEEP_LINKS = {
  subscribe: "https://dayroute.com.au/subscribe",
  subscribeProMonthly: "https://dayroute.com.au/subscribe/pro-monthly",
  subscribeProYearly: "https://dayroute.com.au/subscribe/pro-yearly",
  subscribeTeam3: "https://dayroute.com.au/subscribe/team-3",
  subscribeTeam10: "https://dayroute.com.au/subscribe/team-10",
  download: "https://dayroute.com.au/download",
  app: "https://dayroute.com.au/app",
} as const;

// =============================================================================
// RevenueCat product IDs (must match App Store Connect)
// =============================================================================

export const REVENUECAT_PRODUCTS = {
  proMonthly: "dayroute_pro_monthly",
  proYearly: "dayroute_pro_yearly",
  team3Monthly: "dayroute_team_3_monthly",
  team3Yearly: "dayroute_team_3_yearly",
  team10Monthly: "dayroute_team_10_monthly",
  team10Yearly: "dayroute_team_10_yearly",
} as const;
