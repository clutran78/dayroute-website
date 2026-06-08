import { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Table2,
  Building2,
  Leaf,
  Sparkles,
  Droplets,
  Smartphone,
  ChevronRight,
  ArrowRight,
  Shield,
  HelpCircle,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { AppStoreCTA, SetupCTA } from "../../components/app-store-button";
import { MarketingImage } from "../../components/marketing-image";
import { marketingImages } from "../../data/marketing-images";

export const metadata: Metadata = {
  title: "Compare DayRoute — Alternatives & Best Apps for Australian Service Businesses",
  description:
    "Compare DayRoute to paper diaries, spreadsheets, and ServiceM8. Find the best route planner and scheduling app for gardeners, cleaners, and mobile operators in Australia.",
  alternates: { canonical: "https://dayroute.com.au/compare" },
  openGraph: {
    title: "Compare DayRoute for Australian Service Businesses",
    description:
      "Honest comparisons and best-app guides for tradies, cleaners, gardeners, and mobile professionals.",
    url: "https://dayroute.com.au/compare",
    type: "website",
    locale: "en_AU",
    siteName: "DayRoute",
  },
};

const vsPages = [
  {
    icon: BookOpen,
    title: "Paper diary",
    fact: "Weekend invoicing backlog and no live ETAs",
    href: "/dayroute-vs-paper-diary",
    label: "DayRoute vs paper diary",
  },
  {
    icon: Table2,
    title: "Spreadsheet",
    fact: "Copy-paste addresses and scattered receipts",
    href: "/dayroute-vs-spreadsheet",
    label: "DayRoute vs spreadsheet",
  },
  {
    icon: Building2,
    title: "ServiceM8 (solo)",
    fact: "Fair compare for one-person operators on iPhone",
    href: "/dayroute-vs-servicem8-solo-operators",
    label: "DayRoute vs ServiceM8",
  },
];

const bestPages = [
  {
    icon: Leaf,
    title: "Gardeners",
    fact: "Recurring rounds and suburb clustering",
    href: "/best-route-planner-gardeners-australia",
    label: "Best route planner for gardeners",
  },
  {
    icon: Sparkles,
    title: "Cleaners",
    fact: "ETAs, access codes, and daily routes",
    href: "/best-job-scheduling-app-cleaners-australia",
    label: "Best scheduling app for cleaners",
  },
  {
    icon: Droplets,
    title: "Pressure washing",
    fact: "High-volume routing and on-site invoices",
    href: "/best-app-pressure-washing-businesses-australia",
    label: "Best app for pressure washing",
  },
  {
    icon: Smartphone,
    title: "All mobile services",
    fact: "iPhone-first workflow for any trade",
    href: "/best-iphone-app-mobile-service-businesses-australia",
    label: "Best iPhone app for mobile services",
  },
];

const proofFacts = [
  { stat: "7 days", label: "Free Pro trial" },
  { stat: "$19.99/mo", label: "Solo Pro plan (AUD)" },
  { stat: "iPhone", label: "Native App Store app" },
  { stat: "BAS-ready", label: "Income & expense exports" },
];

export default function ComparePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://dayroute.com.au" },
      { "@type": "ListItem", position: 2, name: "Compare", item: "https://dayroute.com.au/compare" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="flex flex-col">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-6"
        >
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-foreground font-medium">Compare</span>
            </li>
          </ol>
        </nav>

        <section className="relative overflow-hidden py-16 sm:py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
              <div className="max-w-3xl flex-1">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                  Not sure what you&apos;re using today?
                </h1>
                <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground">
                  Honest guides for Australian tradies, cleaners, gardeners, and mobile
                  operators. No hype — just criteria, facts, and when DayRoute fits your
                  workflow. Start with what sounds like you.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <AppStoreCTA size="lg" className="w-full sm:w-auto min-h-[48px]" location="compare-hero" />
                  <SetupCTA size="lg" className="w-full sm:w-auto min-h-[48px]" location="compare-hero" />
                </div>
              </div>
              <div className="flex-1 w-full flex justify-center lg:justify-end">
                <MarketingImage
                  src={marketingImages.runTheDay}
                  alt="DayRoute — run the day with jobs, routes, invoices and reports on iPhone"
                  priority
                  className="max-w-[260px] sm:max-w-[300px]"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-y border-border bg-card/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">DayRoute vs alternatives</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Pick the setup closest to yours. Each page explains trade-offs and when to
              switch.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
              {vsPages.map((item) => (
                <Card key={item.href} className="group hover:border-primary/50 transition-colors">
                  <CardContent className="p-5 sm:p-6 flex flex-col h-full">
                    <item.icon className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">{item.fact}</p>
                    <Button variant="outline" size="sm" className="w-full justify-between" asChild>
                      <Link href={item.href}>
                        {item.label}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Best apps by industry</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Evaluation checklists — what to look for before you download anything.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {bestPages.map((item) => (
                <Card key={item.href} className="group hover:border-primary/50 transition-colors">
                  <CardContent className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                    <item.icon className="h-8 w-8 text-primary shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-base sm:text-lg">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">{item.fact}</p>
                    </div>
                    <Button variant="outline" size="sm" className="shrink-0" asChild>
                      <Link href={item.href}>
                        Read guide
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-14 border-y border-border bg-primary/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {proofFacts.map((f) => (
                <div key={f.label}>
                  <p className="text-xl sm:text-2xl font-bold text-primary">{f.stat}</p>
                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground">{f.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-base sm:text-lg font-medium mb-4">
              Not sure which page fits? Browse by industry or use the guided tool on the
              homepage.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button variant="outline" asChild>
                <Link href="/industries">
                  Browse industries
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/#download">Find your fit on homepage</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <Link href="/pricing" className="hover:text-foreground flex items-center gap-1.5">
                <HelpCircle className="h-4 w-4" />
                Pricing
              </Link>
              <Link href="/security" className="hover:text-foreground flex items-center gap-1.5">
                <Shield className="h-4 w-4" />
                Security
              </Link>
              <Link href="/faq" className="hover:text-foreground flex items-center gap-1.5">
                FAQ
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 bg-card/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Try DayRoute on your busiest week
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              7-day free trial on iPhone. Plan routes, send invoices on site, and see if
              your evenings get quieter.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <AppStoreCTA size="lg" className="w-full sm:w-auto min-h-[48px]" location="compare-bottom" />
              <SetupCTA size="lg" className="w-full sm:w-auto min-h-[48px]" location="compare-bottom" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
