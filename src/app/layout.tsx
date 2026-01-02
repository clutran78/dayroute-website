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
    default: "DayRoute - Route Planner for Tradies & Field Service in Australia",
    template: "%s | DayRoute",
  },
  description:
    "Plan smarter routes. Finish jobs faster. DayRoute is the field-service day planner for tradies, cleaners, maintenance workers, NDIS providers, and home-visit clinicians in Australia.",
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
  verification: {
    google: "your-google-verification-code", // TODO: Add your Google Search Console verification
  },
};

// =============================================================================
// ROOT LAYOUT
// =============================================================================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Structured data for Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DayRoute",
    url: "https://dayroute.com.au",
    logo: "https://dayroute.com.au/dayroute-logo-512.png",
    description:
      "Field-service day planner for tradies, cleaners, NDIS providers, and mobile professionals in Australia.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "AU",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "yourhelp@dayroute.com.au",
      contactType: "customer support",
    },
  };

  // Structured data for the App
  // When app is live, this includes the actual download URL
  const softwareAppSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "DayRoute",
    operatingSystem: "iOS",
    applicationCategory: "BusinessApplication",
    description:
      "Route planner and job scheduler for field service professionals in Australia. Features multi-stop routing, job cards, receipt scanning, and vehicle logbook.",
    offers: [
      {
        "@type": "Offer",
        name: "Pro Monthly",
        price: "19",
        priceCurrency: "AUD",
        description: "Pro plan - monthly subscription",
      },
      {
        "@type": "Offer",
        name: "Pro Yearly",
        price: "190",
        priceCurrency: "AUD",
        description: "Pro plan - yearly subscription (save 2 months)",
      },
      {
        "@type": "Offer",
        name: "Team 3 Monthly",
        price: "49",
        priceCurrency: "AUD",
        description: "Team plan for up to 3 users - monthly",
      },
      {
        "@type": "Offer",
        name: "Team 10 Monthly",
        price: "99",
        priceCurrency: "AUD",
        description: "Team plan for up to 10 users - monthly",
      },
    ],
    // Placeholder rating - update with real data when available
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "100",
      bestRating: "5",
      worstRating: "1",
    },
  };

  // Add download URLs only when app is live (avoids TypeScript spread error)
  if (IS_APP_LIVE) {
    softwareAppSchema.installUrl = APP_STORE_URL;
    softwareAppSchema.downloadUrl = APP_STORE_URL;
  }

  return (
    <html lang="en-AU" className="dark">
      <head>
        <link rel="canonical" href="https://dayroute.com.au" />
        
        {/* Apple Smart App Banner - shows download banner in Safari on iOS */}
        {/* This meta tag is also set in metadata.other, but we include it here for clarity */}
        <meta name="apple-itunes-app" content={`app-id=${APPLE_APP_ID}`} />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        
        {/* Structured Data - SoftwareApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareAppSchema),
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
