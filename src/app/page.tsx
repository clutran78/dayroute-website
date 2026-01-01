"use client";

import Link from "next/link";
import {
  MapPin,
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
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useState } from "react";

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

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would submit to an API
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl opacity-30" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <Sparkles className="h-4 w-4" />
              <span>Built for Australian mobile professionals</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Plan smarter routes.
              <br />
              <span className="text-primary">Finish jobs faster.</span>
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              DayRoute is a field-service day planner for tradies, cleaners,
              maintenance workers, NDIS providers, and home-visit clinicians in
              Australia.
            </p>

            {/* Benefit bullets */}
            <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-6">
              {[
                "Reduce driving time with multi-stop routing",
                "Stay on schedule with job cards + reminders",
                "Track work and costs (logbook, expenses, receipts)",
              ].map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="#download" id="download">
                  <Smartphone className="mr-2 h-5 w-5" />
                  Coming Soon on the App Store
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#waitlist">
                  Join the Waitlist
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <span className="text-sm text-muted-foreground">Perfect for:</span>
            {industries.map((industry) => (
              <span
                key={industry}
                className="text-sm font-medium text-foreground/80"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Everything you need to run your day
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              From route planning to expense tracking, DayRoute handles the
              admin so you can focus on the work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group hover:border-primary/50 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" asChild>
              <Link href="/features">
                View all features
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 sm:py-32 bg-card/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Simple to use, powerful results
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Get started in minutes, not hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview - Updated with correct AUD pricing */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              All plans include a <span className="text-primary font-semibold">7-day free trial</span>. All prices in AUD.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Pro - Solo Operators */}
            <Card className="relative border-primary">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
              <CardContent className="p-6 pt-8">
                <h3 className="text-lg font-semibold">Pro</h3>
                <p className="text-sm text-muted-foreground mb-4">For solo operators</p>
                <p className="text-3xl font-bold">
                  $19
                  <span className="text-base font-normal text-muted-foreground">/mo</span>
                </p>
                <p className="text-sm text-muted-foreground">or $190/year (save 2 months)</p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Unlimited jobs & clients",
                    "Route optimisation",
                    "Receipt scanner + AI",
                    "Vehicle logbook (GPS)",
                    "Full BAS reports",
                    "Invoice templates",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-primary font-medium">7-day free trial included</p>
              </CardContent>
            </Card>

            {/* Team */}
            <Card className="relative">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold">Team</h3>
                <p className="text-sm text-muted-foreground mb-4">For teams up to 10 users</p>
                <p className="text-3xl font-bold">
                  From $49
                  <span className="text-base font-normal text-muted-foreground">/mo</span>
                </p>
                <p className="text-sm text-muted-foreground">3 users: $49/mo • 10 users: $99/mo</p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Everything in Pro",
                    "Team scheduling",
                    "Location sharing",
                    "User permissions / roles",
                    "Admin dashboard",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-primary font-medium">7-day free trial included</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button asChild>
              <Link href="/pricing">View full pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="py-24 sm:py-32 bg-card/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Be the first to know
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              DayRoute is coming soon to the App Store. Join the waitlist to get
              early access and launch updates.
            </p>

            {submitted ? (
              <div className="mt-8 p-6 rounded-2xl bg-primary/10 border border-primary/20">
                <Check className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-lg font-medium">You&apos;re on the list!</p>
                <p className="text-muted-foreground">
                  We&apos;ll email you when DayRoute launches.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleWaitlist}
                className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit">Join Waitlist</Button>
              </form>
            )}

            <p className="mt-4 text-sm text-muted-foreground">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-r from-primary/20 via-primary/10 to-transparent p-8 sm:p-12 lg:p-16 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
            <div className="relative max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold">
                Ready to take control of your day?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Join thousands of Australian mobile professionals who plan
                smarter and finish faster with DayRoute.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="#download">
                    <Smartphone className="mr-2 h-5 w-5" />
                    Coming Soon on App Store
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
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
