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
  Download,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useState } from "react";
import {
  getDownloadUrl,
  getDownloadCta,
  isComingSoon,
  IS_APP_LIVE,
} from "../lib/app-store-config";

/**
 * Features shown in the grid section.
 * Each feature has an icon, title, and description.
 */
const features = [
  {
    icon: Route,
    title: "Multi-stop route optimisation",
    description:
      "Reduce driving time with smart routing powered by Google Maps. See ETAs for every stop.",
  },
  {
    icon: Calendar,
    title: "Daily job scheduling",
    description:
      "Job cards with client info, time, location. Sync with your phone calendar.",
  },
  {
    icon: Clock,
    title: "Booking reminders",
    description:
      "Never miss an appointment with 30-minute and 1-hour reminders.",
  },
  {
    icon: Receipt,
    title: "Receipt scanner with AI",
    description:
      "Snap receipts, AI extracts the details. Track expenses for BAS time.",
  },
  {
    icon: Car,
    title: "Vehicle logbook",
    description:
      "GPS trip recording for tax purposes. Background tracking only when you start a trip.",
  },
  {
    icon: Users,
    title: "Team features",
    description:
      "Share routes, manage permissions, approve expenses. Built for small teams.",
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

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Get download URL and CTA from centralized config
  const downloadUrl = getDownloadUrl();
  const downloadCta = getDownloadCta();
  const comingSoon = isComingSoon();

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would submit to an API
    setSubmitted(true);
  };

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
              G&apos;day. Flat-out all day on the road?
            </p>

            {/* Headline - responsive text sizes */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Plan smarter routes.
              <br />
              <span className="text-primary">Finish jobs faster.</span>
            </h1>

            {/* Subheadline */}
            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
              DayRoute is a field-service day planner for Aussie tradies, cleaners, 
              maintenance crews, NDIS providers and home-visit clinicians. It helps 
              turn a messy day of jobs and driving into a clear, organised run.
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
              <Button 
                size="lg" 
                className="w-full sm:w-auto min-h-[48px] text-base gap-2"
                asChild
              >
                <Link 
                  href={downloadUrl}
                  target={IS_APP_LIVE ? "_blank" : undefined}
                  rel={IS_APP_LIVE ? "noopener noreferrer" : undefined}
                >
                  <Download className="h-5 w-5" />
                  {downloadCta}
                </Link>
              </Button>
              {/* Show waitlist button only when app is coming soon */}
              {comingSoon && (
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto min-h-[48px] text-base"
                  asChild
                >
                  <Link href="#waitlist">
                    Join the Waitlist
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              )}
              {/* Show "Learn more" when app is live */}
              {!comingSoon && (
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto min-h-[48px] text-base"
                  asChild
                >
                  <Link href="/features">
                    Learn More
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>

            {/* Proof line */}
            <p className="mt-6 text-xs sm:text-sm text-muted-foreground italic">
              Built by an Aussie tradie turned app founder for field crews who live on the road.
            </p>
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

      {/* ===== FEATURES GRID ===== */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Everything you need to run your day
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              From route planning to expense tracking, DayRoute handles the
              admin so you can focus on the work.
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
            <Button variant="outline" className="min-h-[44px]" asChild>
              <Link href="/features">
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
                  $19
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
                  From $49
                  <span className="text-sm sm:text-base font-normal text-muted-foreground">
                    /mo
                  </span>
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  3 users: $49/mo • 10 users: $99/mo
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

          <div className="mt-10 sm:mt-12 text-center">
            <Button className="min-h-[44px]" asChild>
              <Link href="/pricing">View full pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ===== WAITLIST ===== */}
      <section id="waitlist" className="py-16 sm:py-24 lg:py-32 bg-card/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Be the first to know
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground px-2">
              DayRoute is coming soon to the App Store. Join the waitlist to get
              early access and launch updates.
            </p>

            {submitted ? (
              <div className="mt-6 sm:mt-8 p-5 sm:p-6 rounded-2xl bg-primary/10 border border-primary/20">
                <Check className="h-7 w-7 sm:h-8 sm:w-8 text-primary mx-auto mb-2" />
                <p className="text-base sm:text-lg font-medium">
                  You&apos;re on the list!
                </p>
                <p className="text-sm sm:text-base text-muted-foreground">
                  We&apos;ll email you when DayRoute launches.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleWaitlist}
                className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto px-2 sm:px-0"
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 h-12 text-base"
                />
                <Button type="submit" className="h-12 px-6 text-base">
                  Join Waitlist
                </Button>
              </form>
            )}

            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground">
              No spam. Unsubscribe anytime.
            </p>

            {/* Trust note */}
            <p className="mt-6 text-xs text-muted-foreground/70">
              Your data is stored securely and never sold. You control your information at all times.
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
                Ready to take control of your day?
              </h2>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground">
                Join thousands of Australian mobile professionals who plan
                smarter and finish faster with DayRoute.
              </p>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto min-h-[48px] gap-2"
                  asChild
                >
                  <Link 
                    href={downloadUrl}
                    target={IS_APP_LIVE ? "_blank" : undefined}
                    rel={IS_APP_LIVE ? "noopener noreferrer" : undefined}
                  >
                    <Download className="h-5 w-5" />
                    {downloadCta}
                  </Link>
                </Button>
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
    </div>
  );
}
