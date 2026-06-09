"use client";

import Link from "next/link";
import {
  Calendar,
  Clock,
  Route,
  Users,
  Receipt,
  Car,
  Smartphone,
  ChevronRight,
  Check,
  Sparkles,
  ChevronLeft,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { AppStoreCTA } from "../components/app-store-button";
import { GuidedDiscovery } from "../components/guided-discovery";
import { SocialEmbed } from "../components/social-embed";
import { MarketingImage } from "../components/marketing-image";
import { homepageShowcase } from "../data/marketing-images";
import { useState, useEffect, useRef } from "react";

/**
 * Features shown in the grid section.
 * Each feature has an icon, title, and description.
 */
const features = [
  {
    icon: Route,
    title: "Smart daily routes",
    description:
      "Drop in your jobs and let DayRoute plan the best order. Reduce back-tracking, save fuel and fit in more paid work.",
  },
  {
    icon: Calendar,
    title: "Job cards & reminders",
    description:
      "Store client details, notes, photos and job status in one place. Get reminders so nothing slips through the cracks.",
  },
  {
    icon: Smartphone,
    title: "Tap-to-navigate",
    description:
      "Open your favourite maps app (Apple/Google) with one tap from each job. No more copy-pasting addresses.",
  },
  {
    icon: Receipt,
    title: "Logbook & expenses",
    description:
      "Track work kilometres, fuel, receipts and other deductible expenses as you go. Export reports that make BAS and tax time easier.",
  },
  {
    icon: Car,
    title: "Automatic mileage tracking",
    description:
      "GPS trip recording for tax purposes. Start a trip and let DayRoute log the kilometres in the background.",
  },
  {
    icon: Users,
    title: "Built for solo operators & small teams",
    description:
      "Start on your own, then add team members as you grow. Keep everyone on the same schedule and reduce 'where are you?' calls.",
  },
];

/**
 * Industries/professions that benefit from DayRoute.
 */
const industries = [
  "Tradies",
  "Cleaners",
  "Gardeners",
  "NDIS Providers",
  "Home-visit Clinicians",
  "Maintenance Workers",
  "Mobile Dog Groomers",
  "Pest Control",
];

/**
 * Key benefits shown in the hero section.
 */
const benefits = [
  "Reduce driving time with multi-stop routing",
  "Stay on schedule with job cards + reminders",
  "Track work and costs (logbook, expenses, receipts)",
];

/**
 * Real problems field-service operators face, each paired with how DayRoute
 * fixes it. This is the core "selling / solution" section — left = the pain in
 * the operator's own words, right = the DayRoute fix.
 */
const problemSolutions = [
  {
    problem: "\u201cI quote off the top of my head.\u201d",
    solution:
      "Pick your trade and DayRoute loads ready-made services with price guides. Quote in under a minute.",
  },
  {
    problem: "\u201cI forget to invoice, then forget who\u2019s paid.\u201d",
    solution:
      "Send a GST-correct invoice by text or email before you leave the driveway. See who still owes you at a glance.",
  },
  {
    problem: "\u201cMy receipts live in the glovebox till tax time.\u201d",
    solution:
      "Snap a photo and DayRoute reads the receipt — amount, date, details — logged instantly.",
  },
  {
    problem: "\u201cI never track my work kms.\u201d",
    solution:
      "A built-in GPS logbook records work trips automatically and reminds you when you get home. ATO-ready.",
  },
  {
    problem: "\u201cCustomers ring all day asking where I am.\u201d",
    solution:
      "DayRoute texts them for you: ETA, running-late alerts and a 15-minutes-away heads-up.",
  },
  {
    problem: "\u201cI waste fuel doubling back across town.\u201d",
    solution:
      "DayRoute orders your day\u2019s jobs the smart way and navigates you door to door.",
  },
  {
    problem: "\u201cBAS time is spreadsheets at 9pm Sunday.\u201d",
    solution:
      "Income, expenses and GST sorted as you go. Your BAS is ready when you are.",
  },
];

/**
 * Short feature labels for the compact feature strip under the problems.
 */
const featureStrip = [
  "Smart daily route planning",
  "One-tap GST invoicing",
  "AI receipt scanning",
  "Automatic ATO mileage logbook",
  "Automated customer ETA texts",
  "BAS-ready reporting",
  "iPhone, iPad & Mac",
  "Cloud sync & backup",
];

export default function HomePage() {
  const [showFloatingCta, setShowFloatingCta] = useState(false);

  // Show floating CTA after scrolling past hero section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Show after scrolling 400px (past hero)
      setShowFloatingCta(scrollY > 400);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-primary/10 rounded-full blur-3xl opacity-30" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-primary mb-6">
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Built for Australian mobile professionals</span>
            </div>

            {/* Warm pre-heading */}
            <p className="text-sm sm:text-base text-muted-foreground mb-3">
              G&apos;day. Still running your business from the glovebox?
            </p>

            {/* Headline - responsive text sizes */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Run your whole trade from your phone —
              <br />
              <span className="text-primary">not your glovebox.</span>
            </h1>

            {/* Subheadline */}
            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
              DayRoute turns quoting, invoicing, receipts, mileage and tax into a
              few taps on site — so you stop doing admin at 9pm on a Sunday.
            </p>

            {/* Benefit bullets - stack on mobile, inline on larger screens */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:flex-wrap justify-center gap-2 sm:gap-4 lg:gap-6 px-2">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-2 text-sm text-muted-foreground justify-center sm:justify-start"
                >
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-left">{benefit}</span>
                </div>
              ))}
            </div>

            {/* "Perfect for" chips in hero */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 px-2">
              <span className="text-xs sm:text-sm text-muted-foreground">Perfect for:</span>
              {["Tradies", "Cleaners", "NDIS Providers", "Home-visit Clinicians"].map((industry) => (
                <span
                  key={industry}
                  className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs sm:text-sm font-medium text-primary"
                >
                  {industry}
                </span>
              ))}
            </div>

            {/* CTAs - stack on mobile, row on tablet+ */}
            {/* download anchor for deep linking */}
            <div id="download" className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
              <AppStoreCTA
                size="lg"
                className="w-full sm:w-auto min-h-[48px] text-base"
                location="hero"
              />
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto min-h-[48px] text-base"
                asChild
              >
                <Link href="/pricing">
                  See Pricing
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* App Store trust badge under the primary CTAs */}
            <div className="mt-5 flex justify-center">
              <AppStoreCTA showBadge location="hero-badge" />
            </div>

            {/* Trust / proof line */}
            <p className="mt-6 text-xs sm:text-sm text-muted-foreground">
              Built in Australia for tradies, gardeners, cleaners, NDIS &amp;
              home-care pros, and small crews. From $19.99/month — 7-day free trial.
            </p>
          </div>
        </div>
      </section>

      {/* ===== PROBLEM → SOLUTION ===== */}
      <section className="py-16 sm:py-24 border-y border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Sound familiar? DayRoute fixes it.
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              The real headaches of running a mobile business — and exactly how
              DayRoute sorts each one from your phone, on site.
            </p>
          </div>

          {/* Pain (left) → Fix (right) rows */}
          <div className="space-y-3 sm:space-y-4">
            {problemSolutions.map((item) => (
              <div
                key={item.problem}
                className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-0 rounded-2xl border border-border overflow-hidden"
              >
                {/* The pain, in the operator's words */}
                <div className="flex items-start gap-3 p-4 sm:p-5 bg-card/40">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive text-sm font-bold">
                    ?
                  </span>
                  <p className="text-sm sm:text-base font-medium italic text-muted-foreground">
                    {item.problem}
                  </p>
                </div>
                {/* The DayRoute fix */}
                <div className="flex items-start gap-3 p-4 sm:p-5 bg-primary/5 md:border-l border-border">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <p className="text-sm sm:text-base">{item.solution}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Feature strip */}
          <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {featureStrip.map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs sm:text-sm font-medium text-primary"
              >
                <Check className="h-3.5 w-3.5" />
                {label}
              </span>
            ))}
          </div>

          {/* CTA under the problem/solution block */}
          <div className="mt-10 text-center">
            <AppStoreCTA
              size="lg"
              className="min-h-[48px]"
              location="problem-solution"
            />
          </div>
        </div>
      </section>

      {/* ===== 3-COLUMN BENEFITS ===== */}
      <section className="py-16 sm:py-20 bg-card/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {/* Benefit 1 */}
            <div className="text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                <Route className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Drive less, earn more</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Multi-stop routes that cut backtracking and traffic. Less fuel, less stress, more billable jobs per day.
              </p>
            </div>
            {/* Benefit 2 */}
            <div className="text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Stay on top of every job</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Job cards with reminders, notes and status. No more &quot;which client is next?&quot; moments.
              </p>
            </div>
            {/* Benefit 3 */}
            <div className="text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                <Receipt className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Know where your money goes</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Logbook, expenses, receipts and BAS-ready export. Your accountant will actually like you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MARKETING SHOWCASE ===== */}
      <section className="py-16 sm:py-24 overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <Smartphone className="h-4 w-4" />
              See It In Action
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Built for the road
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Routes, jobs, invoices, logbook and BAS — one iPhone app for Aussie field pros
            </p>
          </div>
        </div>

        <div className="relative">
          <div
            className="flex gap-5 sm:gap-8 overflow-x-auto pb-6 px-4 sm:px-8 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="shrink-0 w-4 sm:w-8 lg:w-[calc((100vw-1280px)/2)]" />

            {homepageShowcase.map((item, index) => (
              <div key={item.label} className="shrink-0 snap-center group w-[220px] sm:w-[260px] lg:w-[280px]">
                <div className="group-hover:scale-[1.02] transition-transform duration-300">
                  <MarketingImage
                    src={item.src}
                    alt={item.alt}
                    priority={index === 0}
                    className="max-w-none w-full"
                    sizes="(max-width: 640px) 220px, (max-width: 1024px) 260px, 280px"
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="font-semibold text-sm sm:text-base">{item.label}</p>
                  {item.description && (
                    <p className="text-xs sm:text-sm text-muted-foreground">{item.description}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="shrink-0 w-4 sm:w-8 lg:w-[calc((100vw-1280px)/2)]" />
          </div>

          <div className="text-center mt-4 text-sm text-muted-foreground flex items-center justify-center gap-2">
            <ChevronLeft className="h-4 w-4 animate-pulse" />
            <span>Swipe to explore</span>
            <ChevronRight className="h-4 w-4 animate-pulse" />
          </div>
        </div>
      </section>

      {/* ===== FEATURES GRID ===== */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Why DayRoute beats paper diaries and spreadsheets
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              Cut the admin, not your hours. DayRoute helps you plan the day, get to every job on time, 
              and keep your books in order – without spreadsheets or paper diaries.
            </p>
          </div>

          {/* Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group hover:border-primary/50 transition-colors"
              >
                <CardContent className="p-5 sm:p-6">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-primary/10 mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 sm:mt-12 text-center">
            <Button 
              variant="default" 
              className="min-h-[44px] bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all duration-300 ring-2 ring-primary/20 ring-offset-2 ring-offset-background animate-pulse hover:animate-none" 
              asChild
            >
              <Link href="/features">
                <Sparkles className="mr-2 h-4 w-4" />
                View all features
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-16 sm:py-24 lg:py-32 bg-card/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Simple to use, powerful results
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground">
              Get started in minutes, not hours.
            </p>
          </div>

          {/* 3-step process - responsive grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {[
              {
                step: "1",
                title: "Add your jobs",
                description:
                  "Enter client details and schedule jobs. Import from your calendar if you like.",
              },
              {
                step: "2",
                title: "Optimise your route",
                description:
                  "DayRoute calculates the fastest order. See drive times and ETAs at a glance.",
              },
              {
                step: "3",
                title: "Hit the road",
                description:
                  "Navigate to each stop. Track your trip, scan receipts, and get home earlier.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg sm:text-xl mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground max-w-xs mx-auto">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 sm:mt-12 text-center">
            <Button variant="outline" className="min-h-[44px]" asChild>
              <Link href="/industries">
                See all supported industries
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ===== PRICING PREVIEW ===== */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Simple, transparent pricing
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground">
              All plans include a{" "}
              <span className="text-primary font-semibold">
                7-day free trial
              </span>
              . All prices in AUD.
            </p>
          </div>

          {/* Pricing cards - 1 col mobile, 2 col tablet+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {/* Pro - Solo Operators */}
            <Card className="relative border-primary">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                  Most Popular
                </span>
              </div>
              <CardContent className="p-5 sm:p-6 pt-7 sm:pt-8">
                <h3 className="text-lg font-semibold">Pro</h3>
                <p className="text-sm text-muted-foreground mb-3 sm:mb-4">
                  For solo operators
                </p>
                <p className="text-2xl sm:text-3xl font-bold">
                  $19.99
                  <span className="text-sm sm:text-base font-normal text-muted-foreground">
                    /mo
                  </span>
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  or $190/year (save 2 months)
                </p>
                <ul className="mt-5 sm:mt-6 space-y-2 sm:space-y-3">
                  {[
                    "Unlimited jobs & clients",
                    "Route optimisation",
                    "Receipt scanner + AI",
                    "Vehicle logbook (GPS)",
                    "Full BAS reports",
                    "Invoice templates",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-xs sm:text-sm"
                    >
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 sm:mt-6 text-xs sm:text-sm text-primary font-medium">
                  7-day free trial included
                </p>
              </CardContent>
            </Card>

            {/* Team */}
            <Card className="relative">
              <CardContent className="p-5 sm:p-6">
                <h3 className="text-lg font-semibold">Team</h3>
                <p className="text-sm text-muted-foreground mb-3 sm:mb-4">
                  For teams up to 10 users
                </p>
                <p className="text-2xl sm:text-3xl font-bold">
                  From $49.99
                  <span className="text-sm sm:text-base font-normal text-muted-foreground">
                    /mo
                  </span>
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  3 users: $49.99/mo • 10 users: $99.99/mo
                </p>
                <p className="mt-1 text-xs sm:text-sm font-semibold text-primary">
                  just ~$10 per user on Team 10
                </p>
                <ul className="mt-5 sm:mt-6 space-y-2 sm:space-y-3">
                  {[
                    "Everything in Pro",
                    "Team scheduling",
                    "Location sharing",
                    "User permissions / roles",
                    "Admin dashboard",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-xs sm:text-sm"
                    >
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 sm:mt-6 text-xs sm:text-sm text-primary font-medium">
                  7-day free trial included
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Comparison callout — value vs per-seat platforms */}
          <div className="mt-8 sm:mt-10 max-w-3xl mx-auto rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6 text-center">
            <p className="text-sm sm:text-base font-semibold">
              The big platforms charge around{" "}
              <span className="text-primary">$49 per user/month</span>. A DayRoute
              crew of 10 costs less than one seat elsewhere.
            </p>
          </div>

          <div className="mt-8 sm:mt-10 text-center">
            <Button className="min-h-[44px]" asChild>
              <Link href="/pricing">View full pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ===== MINI FAQ ===== */}
      <section className="py-16 sm:py-24 border-t border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-12">
            Quick answers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border">
              <h3 className="font-semibold text-base sm:text-lg mb-2">Who is DayRoute for?</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Tradies, cleaners, gardeners, NDIS providers, home-visit nurses, pest control, 
                mobile groomers – anyone who visits multiple locations each day.
              </p>
            </div>
            <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border">
              <h3 className="font-semibold text-base sm:text-lg mb-2">Will it work offline?</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Yes. Your schedule and job details are stored on your device. 
                You only need internet to sync or optimise a new route.
              </p>
            </div>
            <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border">
              <h3 className="font-semibold text-base sm:text-lg mb-2">Is DayRoute available now?</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Yes! DayRoute is now available on the Apple App Store. Download it 
                today and start your 7-day free trial.
              </p>
            </div>
            <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border">
              <h3 className="font-semibold text-base sm:text-lg mb-2">Is there a free trial?</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Yes! Every plan includes a 7-day free trial. No credit card required 
                to start – just download and go.
              </p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href="/faq">
                See all FAQs
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ===== LATEST FROM THE BLOG ===== */}
      <section className="py-16 sm:py-24 bg-card/50 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Tips for running a smarter business
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground">
              Practical guides for tradies, cleaners, NDIS providers, and mobile service pros.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "How to Plan Efficient Multi-Stop Routes",
                excerpt: "Save 30-60 minutes of driving per day by optimising the order you visit job sites.",
                href: "/blog/how-to-plan-efficient-multi-stop-routes-for-service-businesses",
                category: "Route Planning",
              },
              {
                title: "ATO Vehicle Logbook Requirements for Tradies",
                excerpt: "What the ATO actually requires for vehicle logbook records — and the mistakes that trigger audits.",
                href: "/blog/ato-vehicle-logbook-requirements-for-tradies-2026",
                category: "Tax & BAS",
              },
              {
                title: "NDIS Travel Claims: What You Can Claim",
                excerpt: "A plain-English guide to NDIS travel claims for support workers and sole-trader providers.",
                href: "/blog/ndis-travel-claims-what-support-workers-can-claim",
                category: "NDIS",
              },
            ].map((post) => (
              <Link key={post.href} href={post.href} className="group">
                <Card className="h-full hover:border-primary/50 transition-colors">
                  <CardContent className="p-5 sm:p-6">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary mb-3">
                      {post.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {post.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" className="min-h-[44px]" asChild>
              <Link href="/blog">
                Read all articles
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ===== SOCIAL FEED — live Facebook posts, viewable without login ===== */}
      <SocialEmbed />

      {/* ===== DOWNLOAD NOW ===== */}
      <section id="download-now" className="py-16 sm:py-24 lg:py-32 bg-card/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Now available on the App Store
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground px-2">
              Download DayRoute and start your 7-day free trial. 
              No credit card required — just download and go.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
              <AppStoreCTA
                size="lg"
                className="w-full sm:w-auto min-h-[48px] text-base"
                location="download-section"
              />
              <Button 
                size="lg" 
                variant="outline"
                className="w-full sm:w-auto min-h-[48px] text-base"
                asChild
              >
                <Link href="/pricing">
                  View Plans &amp; Pricing
                </Link>
              </Button>
            </div>

            <p className="mt-6 text-xs sm:text-sm text-muted-foreground">
              All plans include a 7-day free trial. Cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-r from-primary/20 via-primary/10 to-transparent p-6 sm:p-10 lg:p-16 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-primary/20 rounded-full blur-3xl" />
            
            <div className="relative max-w-2xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                Stop running your business from the glovebox.
              </h2>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground">
                Start running it from DayRoute — quoting, invoicing, receipts,
                mileage and tax, all from your phone. 7-day free trial.
              </p>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <AppStoreCTA
                  size="lg"
                  className="w-full sm:w-auto min-h-[48px]"
                  location="final-cta"
                />
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full sm:w-auto min-h-[48px]"
                  asChild
                >
                  <Link href="/features">Learn more</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FLOATING CTA - View Features ===== */}
      <div 
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
          showFloatingCta 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
      >
        <Button 
          size="lg"
          className="shadow-2xl shadow-primary/40 bg-gradient-to-r from-primary via-primary to-emerald-500 hover:scale-110 transition-transform duration-300 rounded-full px-6 py-6 text-base font-semibold animate-bounce"
          asChild
        >
          <Link href="/features">
            <Sparkles className="mr-2 h-5 w-5" />
            See All Features
          </Link>
        </Button>
      </div>

      {/* ===== GUIDED DISCOVERY — floating tutorial for first-time visitors ===== */}
      <GuidedDiscovery />
    </div>
  );
}
