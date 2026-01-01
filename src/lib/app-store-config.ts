/**
 * App Store Connect Configuration
 * 
 * This file contains all App Store-related configuration.
 * Update these values once your app is live on the App Store.
 * 
 * HOW TO FIND YOUR APP ID:
 * 1. Go to App Store Connect → Apps → DayRoute
 * 2. Under "App Information", find "Apple ID"
 * 3. Or check your App Store URL: apps.apple.com/app/dayroute/id{THIS_NUMBER}
 */

// =============================================================================
// APP STORE CONFIGURATION
// =============================================================================

/**
 * Your Apple App ID from App Store Connect.
 * Replace with your actual App ID once the app is approved.
 * Format: numeric string (e.g., "1234567890")
 */
export const APPLE_APP_ID = "XXXXXXXXXX"; // TODO: Replace with actual App ID

/**
 * Your Apple Developer Team ID.
 * Find this at developer.apple.com → Membership → Team ID
 */
export const APPLE_TEAM_ID = "XXXXXXXXXX"; // TODO: Replace with actual Team ID

/**
 * Your app's bundle identifier.
 * This should match what's in your Xcode project.
 */
export const APP_BUNDLE_ID = "com.dayroute.app"; // TODO: Verify this matches Xcode

/**
 * Whether the app is currently live on the App Store.
 * Set to true once the app is approved and published.
 */
export const IS_APP_LIVE = false;

// =============================================================================
// GENERATED URLS (do not edit these directly)
// =============================================================================

/**
 * Full App Store URL for the DayRoute app (Australia store).
 * Used for all "Download" and "Get the App" links.
 */
export const APP_STORE_URL = `https://apps.apple.com/au/app/dayroute/id${APPLE_APP_ID}`;

/**
 * App Store URL for writing a review.
 * Deep links directly to the review section.
 */
export const APP_STORE_REVIEW_URL = `https://apps.apple.com/au/app/dayroute/id${APPLE_APP_ID}?action=write-review`;

/**
 * Universal/Deep link URLs for specific app screens.
 * These work when the app is installed (via Universal Links).
 */
export const DEEP_LINKS = {
  // Subscription/paywall screens
  subscribe: "https://dayroute.com.au/subscribe",
  subscribeProMonthly: "https://dayroute.com.au/subscribe/pro-monthly",
  subscribeProYearly: "https://dayroute.com.au/subscribe/pro-yearly",
  subscribeTeam3: "https://dayroute.com.au/subscribe/team-3",
  subscribeTeam10: "https://dayroute.com.au/subscribe/team-10",
  
  // General app deep links
  download: "https://dayroute.com.au/download",
  app: "https://dayroute.com.au/app",
} as const;

// =============================================================================
// REVENUECAT PRODUCT IDS (for reference)
// =============================================================================

/**
 * RevenueCat product identifiers.
 * These should match your App Store Connect in-app purchase product IDs.
 */
export const REVENUECAT_PRODUCTS = {
  proMonthly: "dayroute_pro_monthly",
  proYearly: "dayroute_pro_yearly",
  team3Monthly: "dayroute_team_3_monthly",
  team3Yearly: "dayroute_team_3_yearly",
  team10Monthly: "dayroute_team_10_monthly",
  team10Yearly: "dayroute_team_10_yearly",
} as const;

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get the appropriate download URL based on whether the app is live.
 * Returns App Store URL if live, otherwise returns a fallback anchor.
 */
export function getDownloadUrl(): string {
  if (IS_APP_LIVE) {
    return APP_STORE_URL;
  }
  // When app is not live, link to waitlist section
  return "/#waitlist";
}

/**
 * Get the CTA text based on whether the app is live.
 */
export function getDownloadCta(): string {
  if (IS_APP_LIVE) {
    return "Download on App Store";
  }
  return "Coming Soon on App Store";
}

/**
 * Check if we should show "Coming Soon" messaging.
 */
export function isComingSoon(): boolean {
  return !IS_APP_LIVE;
}

