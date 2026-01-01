import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

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
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU" className="dark">
      <head>
        <link rel="canonical" href="https://dayroute.com.au" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "DayRoute",
              url: "https://dayroute.com.au",
              logo: "https://dayroute.com.au/logo.png",
              description:
                "Field-service day planner for tradies, cleaners, NDIS providers, and mobile professionals in Australia.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "AU",
              },
              contactPoint: {
                "@type": "ContactPoint",
                email: "support@dayroute.com.au",
                contactType: "customer support",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "DayRoute",
              operatingSystem: "iOS",
              applicationCategory: "BusinessApplication",
              description:
                "Route planner and job scheduler for field service professionals in Australia. Features multi-stop routing, job cards, receipt scanning, and vehicle logbook.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "AUD",
                description: "Free to download with in-app subscriptions",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "100",
              },
            }),
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
