import { Metadata } from "next";
import Link from "next/link";
import { Check, Users, Zap, Star, Crown } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { SubscribeCTA, AppStoreCTA } from "../../components/app-store-button";
import { REVENUECAT_PRODUCTS } from "../../lib/app-store-config";

// =============================================================================
// METADATA - Updated for correct pricing
// =============================================================================
export const metadata: Metadata = {
  title: "Pricing - Plans for Tradies, NDIS Providers & Field Service Teams",
  description:
    "DayRoute pricing for Australian tradies, NDIS providers, cleaners & mobile service teams. Pro $19.99/mo. Team from just ~$10 per user. 7-day free trial. No per-head pricing.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "DayRoute Pricing - From ~$10 Per User, Not $49",
    description:
      "Pro and Team plans with a 7-day free trial. The big platforms charge ~$49 per user/month — a DayRoute crew of 10 costs less than one seat elsewhere. All prices in AUD.",
  },
};

// =============================================================================
// SOLO OPERATOR PLANS - Pro Monthly & Pro Yearly
// These product IDs match RevenueCat/App Store Connect configuration.
// =============================================================================
const soloPlans = [
  {
    id: "pro_monthly",
    productId: REVENUECAT_PRODUCTS.proMonthly, // Links to App Store product ID
    name: "Pro Monthly",
    subtitle: "For solo operators",
    price: "$19.99",
    period: "/month",
    billingNote: "Billed monthly",
    isPopular: true,
    badge: "Most Popular",
    hasFreeTrial: true,
    features: [
      "Unlimited jobs & clients",
      "Full BAS reports",
      "Vehicle logbook (GPS trip tracking)",
      "Expense scanner with AI",
      "Advanced message templates",
      "Invoice templates (incl. NDIS options)",
      "Booking reminders",
      "Priority support",
    ],
  },
  {
    id: "pro_yearly",
    productId: REVENUECAT_PRODUCTS.proYearly, // Links to App Store product ID
    name: "Pro Yearly",
    subtitle: "Best value for solo operators",
    price: "$190",
    period: "/year",
    billingNote: "Billed annually",
    isPopular: false,
    badge: "Save 2 months",
    hasFreeTrial: true,
    features: [
      "Unlimited jobs & clients",
      "Full BAS reports",
      "Vehicle logbook (GPS trip tracking)",
      "Expense scanner with AI",
      "Advanced message templates",
      "Invoice templates (incl. NDIS options)",
      "Booking reminders",
      "Priority support",
    ],
  },
];

// =============================================================================
// TEAM PLANS - Team 3 & Team 10 (Monthly & Yearly options)
// These product IDs match RevenueCat/App Store Connect configuration.
// =============================================================================
const teamPlans = [
  {
    id: "team_3",
    monthlyProductId: REVENUECAT_PRODUCTS.team3Monthly, // Links to App Store product ID
    yearlyProductId: REVENUECAT_PRODUCTS.team3Yearly,   // Links to App Store product ID
    name: "Team",
    subtitle: "Up to 3 users",
    monthlyPrice: "$49.99",
    yearlyPrice: "$490",
    perUser: "just ~$16.66 per user / month",
    maxUsers: 3,
    isBestValue: true,
    badge: "Most popular for crews",
    hasFreeTrial: true,
    features: [
      "Everything in Pro",
      "Team location sharing",
      "User permissions / roles",
      "Shared routes",
      "Team scheduling",
      "Admin dashboard",
    ],
  },
  {
    id: "team_10",
    monthlyProductId: REVENUECAT_PRODUCTS.team10Monthly, // Links to App Store product ID
    yearlyProductId: REVENUECAT_PRODUCTS.team10Yearly,   // Links to App Store product ID
    name: "Team",
    subtitle: "Up to 10 users",
    monthlyPrice: "$99.99",
    yearlyPrice: "$990",
    perUser: "just ~$10 per user / month",
    maxUsers: 10,
    isBestValue: false,
    badge: "Best value per user",
    hasFreeTrial: true,
    features: [
      "Everything in Team (3 users)",
      "Up to 10 team members",
      "All Pro features included",
      "All team features included",
    ],
  },
];

// =============================================================================
// EXTRA MEMBER ADD-ON — add seats to any Team plan anytime
// =============================================================================
const extraMember = {
  monthlyPrice: "$14.99",
  yearlyPrice: "$149.99",
};

// =============================================================================
// PRICING FAQ SCHEMA (JSON-LD)
// Helps these pricing answers show as rich results in Google search.
// Keep questions/answers in sync with the visible FAQ section below.
// =============================================================================
const pricingFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does DayRoute cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DayRoute Pro is $19.99 AUD/month or $190/year for solo operators. Team plans are $49.99/month for up to 3 users (~$16.66 per user) and $99.99/month for up to 10 users (~$10 per user). Extra members are $14.99/member/month. All plans include a 7-day free trial.",
      },
    },
    {
      "@type": "Question",
      name: "Does DayRoute charge per user?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. DayRoute Team plans cover a whole crew for one price — up to 3 or up to 10 users. The big platforms often charge around $49 per user per month, so a DayRoute crew of 10 costs less than a single seat elsewhere.",
      },
    },
    {
      "@type": "Question",
      name: "How does the 7-day free trial work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All plans start with a 7-day free trial. Download the app, pick your plan, and get full access. Cancel anytime during the trial and you won't be charged. Subscriptions are managed through your Apple ID.",
      },
    },
    {
      "@type": "Question",
      name: "Is DayRoute available for Android?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DayRoute is currently available on iOS (iPhone & iPad). Android support is on our roadmap.",
      },
    },
  ],
};

// =============================================================================
// PRICING PAGE COMPONENT
// =============================================================================
export default function PricingPage() {
  return (
    <div className="flex flex-col">
      {/* Pricing FAQ structured data for rich search results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingFaqSchema) }}
      />
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Simple, transparent pricing
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              One price for your whole crew — not charged per head. Built for
              tradies, NDIS providers, cleaners, and mobile service pros across
              Australia. All plans include a{" "}
              <span className="text-primary font-semibold">
                7-day free trial
              </span>
              . Cancel anytime.
            </p>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground">
              All prices in AUD
            </p>
          </div>
        </div>
      </section>

      {/* ===== SOLO OPERATOR PLANS ===== */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="mb-10 sm:mb-12 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-primary mb-3 sm:mb-4">
              <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Solo Operator Plans
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              For individual professionals
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground max-w-xl">
              Perfect for tradies, cleaners, NDIS providers, and home-visit
              clinicians working solo.
            </p>
          </div>

          {/* Solo plan cards - 1 col mobile, 2 col tablet+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {soloPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative flex flex-col ${
                  plan.isPopular
                    ? "border-primary shadow-lg shadow-primary/10"
                    : "border-border"
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${
                        plan.isPopular
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                <CardHeader className="pt-7 sm:pt-8 pb-4">
                  <CardTitle className="text-xl sm:text-2xl">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {plan.subtitle}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 pt-0">
                  {/* Price display */}
                  <div className="mb-1 sm:mb-2">
                    <span className="text-3xl sm:text-4xl font-bold">
                      {plan.price}
                    </span>
                    <span className="text-sm sm:text-base text-muted-foreground">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-5 sm:mb-6">
                    {plan.billingNote}
                  </p>

                  {/* Features list */}
                  <ul className="space-y-2.5 sm:space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-xs sm:text-sm"
                      >
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Free trial note */}
                  <div className="mt-5 sm:mt-6 pt-4 border-t border-border">
                    <p className="text-xs sm:text-sm text-primary font-medium flex items-center gap-2">
                      <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      7-day free trial included
                    </p>
                  </div>
                </CardContent>

                <CardFooter className="pt-0 pb-6">
                  <SubscribeCTA
                    variant={plan.isPopular ? "default" : "outline"}
                    className="w-full min-h-[48px] text-sm sm:text-base"
                    size="lg"
                    location={`pricing-solo-${plan.id}`}
                  />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEAM PLANS ===== */}
      <section className="py-12 sm:py-16 lg:py-24 bg-card/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="mb-10 sm:mb-12 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-primary mb-3 sm:mb-4">
              <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Team Plans
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              For teams with multiple staff
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground max-w-xl">
              Coordinate your team with shared routes, location tracking, and
              admin controls. All team plans include a 7-day free trial.
            </p>
          </div>

          {/* Team plan cards - 1 col mobile, 2 col tablet+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {teamPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative flex flex-col ${
                  plan.isBestValue
                    ? "border-primary shadow-lg shadow-primary/10"
                    : "border-border"
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <CardHeader className="pt-7 sm:pt-8 pb-4">
                  <CardTitle className="text-xl sm:text-2xl flex flex-wrap items-center gap-2">
                    {plan.name}
                    <span className="text-base sm:text-lg font-normal text-muted-foreground">
                      ({plan.maxUsers} users)
                    </span>
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {plan.subtitle}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 pt-0">
                  {/* Monthly price */}
                  <div className="mb-1 sm:mb-2">
                    <span className="text-3xl sm:text-4xl font-bold">
                      {plan.monthlyPrice}
                    </span>
                    <span className="text-sm sm:text-base text-muted-foreground">
                      /month
                    </span>
                  </div>

                  {/* Per-user value — the killer angle vs per-seat platforms */}
                  <p className="mb-2 text-xs sm:text-sm font-semibold text-primary">
                    {plan.perUser}
                  </p>

                  {/* Yearly option with savings */}
                  <div className="mb-5 sm:mb-6 p-2.5 sm:p-3 rounded-lg bg-secondary/50">
                    <p className="text-xs sm:text-sm">
                      <span className="font-medium">
                        or {plan.yearlyPrice}/year
                      </span>
                      <span className="ml-2 text-primary font-semibold">
                        (Save 2 months)
                      </span>
                    </p>
                  </div>

                  {/* Features list */}
                  <ul className="space-y-2.5 sm:space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-xs sm:text-sm"
                      >
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Free trial note */}
                  <div className="mt-5 sm:mt-6 pt-4 border-t border-border">
                    <p className="text-xs sm:text-sm text-primary font-medium flex items-center gap-2">
                      <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      7-day free trial included
                    </p>
                  </div>
                </CardContent>

                <CardFooter className="pt-0 pb-6">
                  <SubscribeCTA
                    className="w-full min-h-[48px] text-sm sm:text-base"
                    size="lg"
                    variant={plan.isBestValue ? "default" : "outline"}
                    location={`pricing-team-${plan.id}`}
                  />
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Extra member add-on note */}
          <p className="mt-6 text-center text-sm text-muted-foreground max-w-2xl mx-auto">
            Need more seats? Add extra members to any Team plan anytime for{" "}
            <span className="font-semibold text-foreground">
              {extraMember.monthlyPrice}/member/month
            </span>{" "}
            (or {extraMember.yearlyPrice}/member/year).
          </p>

          {/* Comparison callout — the value angle vs per-seat platforms */}
          <div className="mt-8 sm:mt-10 max-w-3xl mx-auto rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-7 text-center">
            <p className="text-base sm:text-lg font-semibold">
              The big platforms charge around{" "}
              <span className="text-primary">$49 per user / month</span>.
            </p>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              A DayRoute crew of 10 costs less than a single seat elsewhere — and
              mileage tracking is built in, so you don&apos;t pay for a second app.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-12">
              Pricing questions
            </h2>

            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">
                  How does the 7-day free trial work?
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  All plans start with a 7-day free trial. Download the app,
                  pick your plan, and enjoy full access. You can cancel anytime
                  during the trial and won&apos;t be charged. Subscriptions are
                  managed through your Apple ID.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">
                  What happens after the free trial?
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  After 7 days, your subscription will automatically renew at
                  the plan price you selected. You&apos;ll keep full access to
                  all features as long as your subscription is active.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">
                  How do I cancel my subscription?
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Subscriptions are managed through your Apple ID settings. Go
                  to Settings → Your Name → Subscriptions → DayRoute to cancel
                  or change your plan. You can cancel anytime.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">
                  Can I switch between plans?
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Yes! You can upgrade or downgrade your plan at any time
                  through your Apple ID settings. Changes take effect at the
                  start of your next billing period.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">
                  Is DayRoute available for Android?
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  DayRoute is currently available on iOS (iPhone &amp; iPad). Android
                  support is on our roadmap — stay tuned for updates.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">
                  Do you offer refunds?
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Refunds are handled by Apple according to their App Store
                  refund policy. Contact Apple Support for refund requests.
                </p>
              </div>
            </div>

            <div className="mt-10 sm:mt-12 text-center">
              <Button variant="outline" className="min-h-[44px]" asChild>
                <Link href="/faq">View all FAQs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-16 sm:py-24 lg:py-32 bg-card/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Crown className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-5 sm:mb-6" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Start your 7-day free trial today
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              Join thousands of Australian tradies, NDIS providers, and mobile
              professionals who plan smarter and finish faster with DayRoute.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
              <AppStoreCTA
                size="lg"
                className="w-full sm:w-auto min-h-[48px]"
                location="pricing-bottom"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
