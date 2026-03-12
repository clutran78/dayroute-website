import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import {
  APPLE_APP_ID,
  APP_STORE_URL,
  IS_APP_LIVE,
} from "../lib/app-store-config";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// =============================================================================
// METADATA - SEO & Social Sharing
// =============================================================================
export const metadata: Metadata = {
  metadataBase: new URL("https://dayroute.com.au"),
  title: {
    default: "DayRoute – Route Planner & Job Manager for Tradies & Mobile Pros in Australia",
    template: "%s | DayRoute",
  },
  description:
    "Plan smarter routes, manage jobs & track expenses. DayRoute is the day planner for Aussie tradies, cleaners, NDIS providers & mobile pros. BAS-ready logbook included.",
  keywords: [
    "route planner",
    "field service management",
    "tradies app",
    "job scheduling",
    "Australia",
    "NDIS provider app",
    "cleaning business app",
    "multi-stop routing",
    "vehicle logbook",
    "receipt scanner",
  ],
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "DayRoute" }],
  creator: "DayRoute",
  
  // Apple-specific metadata
  // The Smart App Banner will show at the top of Safari on iOS
  // Format: app-id=YOUR_APP_ID, affiliate-data=OPTIONAL, app-argument=OPTIONAL
  other: {
    "apple-itunes-app": `app-id=${APPLE_APP_ID}`,
  },
  
  // App Links for Facebook/Meta
  appLinks: {
    ios: {
      url: APP_STORE_URL,
      app_store_id: APPLE_APP_ID,
    },
    web: {
      url: "https://dayroute.com.au",
    },
  },
  
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://dayroute.com.au",
    siteName: "DayRoute",
    title: "DayRoute - Route Planner for Tradies & Field Service in Australia",
    description:
      "Plan smarter routes. Finish jobs faster. The day planner for mobile professionals in Australia.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DayRoute - Route Planner for Field Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DayRoute - Route Planner for Tradies & Field Service",
    description:
      "Plan smarter routes. Finish jobs faster. The day planner for mobile professionals in Australia.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Google Search Console verification is done via DNS — no meta tag needed.
  // If you ever need to add it: verification: { google: "your-actual-code" },
};

// =============================================================================
// ROOT LAYOUT
// =============================================================================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // =============================================================================
  // STRUCTURED DATA FOR GEO (Generative Engine Optimization)
  // These schemas help AI systems (Google AI, ChatGPT, Perplexity) cite our content
  // =============================================================================

  // Organization Schema - Establishes DayRoute as a known entity
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DayRoute",
    alternateName: "DayRoute Australia",
    url: "https://dayroute.com.au",
    logo: "https://dayroute.com.au/dayroute-logo-512.png",
    description:
      "DayRoute is an Australian field-service day planner app for tradies, cleaners, NDIS providers, and mobile professionals. It combines multi-stop route optimization, job scheduling, receipt scanning with AI, and vehicle logbook tracking.",
    foundingDate: "2024",
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "AU",
      },
    },
    areaServed: {
      "@type": "Country",
      name: "Australia",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "AU",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "yourhelp@dayroute.com.au",
      contactType: "customer support",
      availableLanguage: "English",
    },
    sameAs: [
      "https://apps.apple.com/au/app/dayroute/id6757166638",
      "https://www.facebook.com/profile.php?id=1036987819491182",
      "https://www.instagram.com/dayroute2026/",
      "https://www.linkedin.com/company/112463933/",
      // TODO: Add YouTube once channel is verified
    ],
  };

  // SoftwareApplication Schema - Detailed app information for AI
  const softwareAppSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: "DayRoute",
    operatingSystem: "iOS 15.0 or later",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Field Service Management",
    description:
      "DayRoute is a route planner and job scheduler designed for Australian field service professionals. Key features include: multi-stop route optimization using Google Maps, daily job scheduling with client details, AI-powered receipt scanning for expense tracking, GPS vehicle logbook for ATO tax purposes, BAS reporting tools, invoice creation, and team management for up to 10 users. Built specifically for tradies, cleaners, NDIS providers, and home-visit clinicians working across Australia.",
    featureList: [
      "Multi-stop route optimization",
      "Daily job scheduling",
      "AI receipt scanner (powered by Google Gemini)",
      "GPS vehicle logbook",
      "BAS reporting",
      "Invoice creation and sending",
      "Team management up to 10 users",
      "Google Maps integration",
      "Calendar sync",
      "SMS and iMessage ETA notifications",
    ],
    screenshot: [
      "https://dayroute.com.au/screenshots/today.png",
      "https://dayroute.com.au/screenshots/route-map.png",
      "https://dayroute.com.au/screenshots/invoice.png",
    ],
    offers: [
      {
        "@type": "Offer",
        name: "Pro Monthly",
        price: "19",
        priceCurrency: "AUD",
        description: "For solo operators. Includes all features, 7-day free trial.",
        priceValidUntil: "2026-12-31",
      },
      {
        "@type": "Offer",
        name: "Pro Yearly",
        price: "190",
        priceCurrency: "AUD",
        description: "For solo operators. Save 2 months per year. 7-day free trial.",
        priceValidUntil: "2026-12-31",
      },
      {
        "@type": "Offer",
        name: "Team (3 users)",
        price: "49",
        priceCurrency: "AUD",
        description: "For small teams up to 3 users. Monthly billing.",
        priceValidUntil: "2026-12-31",
      },
      {
        "@type": "Offer",
        name: "Team (10 users)",
        price: "99",
        priceCurrency: "AUD",
        description: "For teams up to 10 users. Monthly billing.",
        priceValidUntil: "2026-12-31",
      },
    ],
    // NOTE: Do NOT add aggregateRating until real, verifiable reviews exist
    // on the App Store or a review platform. Fake review counts can trigger
    // a Google structured data penalty.
    author: {
      "@type": "Organization",
      name: "DayRoute",
    },
    maintainer: {
      "@type": "Organization",
      name: "DayRoute",
    },
  };

  // Add download URLs only when app is live
  if (IS_APP_LIVE) {
    softwareAppSchema.installUrl = APP_STORE_URL;
    softwareAppSchema.downloadUrl = APP_STORE_URL;
  }

  // NOTE: FAQPage schema was removed from the global layout to prevent
  // "Duplicate field FAQPage" errors in Google Search Console. The FAQ
  // schema now lives only on pages that actually display FAQs:
  //   - /faq (src/app/faq/page.tsx) — main FAQ page with 27 questions
  //   - /industries (src/app/industries/page.tsx) — industry-specific FAQs
  //   - /[slug] (src/app/[slug]/page.tsx) — per-page FAQs on SEO pages

  // HowTo Schema - Step-by-step content AI can cite
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to plan efficient routes for field service work in Australia",
    description: "Use DayRoute to plan optimized multi-stop routes for tradies, cleaners, and field service professionals.",
    step: [
      {
        "@type": "HowToStep",
        name: "Add your jobs for the day",
        text: "Enter your client jobs with addresses, times, and notes. You can sync from your calendar or add manually.",
      },
      {
        "@type": "HowToStep",
        name: "Optimize your route",
        text: "Tap 'Optimize Route' and DayRoute will calculate the most efficient order using Google Maps, reducing driving time and fuel costs.",
      },
      {
        "@type": "HowToStep",
        name: "Start navigation",
        text: "Tap 'Start Route' to begin. DayRoute tracks your mileage for tax purposes and sends ETA notifications to clients.",
      },
      {
        "@type": "HowToStep",
        name: "Complete jobs and invoice",
        text: "Mark jobs as complete, snap receipts for expenses, and create professional invoices to send to clients.",
      },
    ],
  };

  // WebSite Schema with SearchAction - Helps with site search in AI
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DayRoute",
    url: "https://dayroute.com.au",
    description: "Route planner and field service management app for Australian tradies and mobile professionals",
    publisher: {
      "@type": "Organization",
      name: "DayRoute",
    },
  };

  // Speakable Schema - For voice assistants (Google Assistant, Siri)
  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "DayRoute - Route Planner for Australian Field Service Professionals",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".hero-description", ".feature-title"],
    },
    url: "https://dayroute.com.au",
  };

  return (
    <html lang="en-AU" className="dark">
      <head>
        {/* IMPORTANT: Do NOT add a hardcoded <link rel="canonical"> here.
            Each page sets its own canonical via metadata.alternates.
            A global canonical would tell Google every page is a duplicate of the homepage. */}
        
        {/* Apple Smart App Banner - shows download banner in Safari on iOS */}
        <meta name="apple-itunes-app" content={`app-id=${APPLE_APP_ID}`} />
        
        {/* Structured Data - Organization (establishes entity for AI) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        
        {/* Structured Data - SoftwareApplication (app details for AI) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareAppSchema),
          }}
        />

        {/* Structured Data - HowTo (step-by-step for AI) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(howToSchema),
          }}
        />

        {/* Structured Data - WebSite (site identity for AI) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />

        {/* Structured Data - Speakable (for voice assistants) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(speakableSchema),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
