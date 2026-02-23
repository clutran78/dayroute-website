/**
 * Centralized Site Links
 *
 * Single source of truth for all external URLs and key internal routes
 * used across the DayRoute website. Every CTA component reads from here.
 *
 * To update the App Store URL, change APPLE_APP_ID below.
 * All download buttons site-wide will update automatically.
 */

// =============================================================================
// Apple App Store
// =============================================================================

/** Numeric App ID from App Store Connect. */
const APPLE_APP_ID = "6757166638";

/** Live App Store listing (Australia). */
export const APP_STORE_URL = `https://apps.apple.com/au/app/dayroute/id${APPLE_APP_ID}`;

/** Deep-link to the "Write a Review" sheet in the App Store. */
export const APP_STORE_REVIEW_URL = `${APP_STORE_URL}?action=write-review`;

// =============================================================================
// Internal routes
// =============================================================================

/**
 * Book Free 15-Min Setup page.
 * TODO: Replace with real Calendly / Cal.com link once set up.
 */
export const BOOK_FREE_SETUP_URL = "/book-free-setup";

// =============================================================================
// Convenience object (handy for passing around as a group)
// =============================================================================

export const links = {
  appStore: APP_STORE_URL,
  appStoreReview: APP_STORE_REVIEW_URL,
  bookFreeSetup: BOOK_FREE_SETUP_URL,
  pricing: "/pricing",
  features: "/features",
  support: "/support",
  faq: "/faq",
} as const;
