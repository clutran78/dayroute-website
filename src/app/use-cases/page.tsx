import { Metadata } from "next";
import Link from "next/link";
import {
  Wrench,
  Sparkles,
  Leaf,
  Heart,
  Stethoscope,
  PawPrint,
  Bug,
  Truck,
  Check,
  Smartphone,
  ArrowRight,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

export const metadata: Metadata = {
  title: "Use Cases - Route Planning for Tradies, Cleaners, NDIS & More",
  description:
    "See how DayRoute helps tradies, cleaners, gardeners, NDIS providers, home-visit clinicians, and mobile service professionals across Australia plan efficient routes and manage jobs.",
  openGraph: {
    title: "DayRoute Use Cases - For Every Mobile Service Professional",
    description:
      "Route planning and job management for tradies, cleaners, NDIS providers, and more.",
  },
};

const useCases = [
  {
    icon: Wrench,
    title: "Tradies",
    subtitle: "Plumbers, electricians, builders, and more",
    description:
      "Visit multiple job sites each day without backtracking. Track your vehicle for tax, snap receipts for materials, and send invoices on the spot.",
    benefits: [
      "Optimise routes between job sites",
      "Track vehicle kilometres for tax",
      "Scan receipts for materials and supplies",
      "Create invoices from completed jobs",
      "Manage client details and job history",
    ],
    quote: "I used to waste an hour a day driving back and forth. Now I finish my jobs and get home earlier.",
    quoteName: "Michael, Electrician",
    quoteLocation: "Melbourne",
  },
  {
    icon: Sparkles,
    title: "Cleaners",
    subtitle: "Residential and commercial cleaning",
    description:
      "Plan your cleaning rounds efficiently. Know exactly when you'll arrive at each house so clients aren't kept waiting.",
    benefits: [
      "Plan weekly cleaning routes",
      "Send arrival time notifications",
      "Track recurring appointments",
      "Manage client preferences and access codes",
      "Record expenses for supplies",
    ],
    quote: "My clients love knowing exactly when I'll arrive. The route planning saves me 30 minutes every day.",
    quoteName: "Sarah, Cleaning Business Owner",
    quoteLocation: "Sydney",
  },
  {
    icon: Leaf,
    title: "Gardeners & Landscapers",
    subtitle: "Garden maintenance and landscaping",
    description:
      "Handle multiple properties per day with ease. Track seasonal work and keep notes on each garden.",
    benefits: [
      "Manage regular maintenance schedules",
      "Route between properties efficiently",
      "Track time spent at each job",
      "Record expenses for plants and materials",
      "Note seasonal requirements per client",
    ],
    quote: "I manage 40 regular gardens. DayRoute helps me visit more properties and still finish on time.",
    quoteName: "James, Gardener",
    quoteLocation: "Brisbane",
  },
  {
    icon: Heart,
    title: "NDIS Providers",
    subtitle: "Disability support and care services",
    description:
      "Deliver reliable support services with accurate arrival times. Track visits for NDIS reporting and manage participant information securely.",
    benefits: [
      "Plan daily visit schedules",
      "Track visit times for reporting",
      "Store participant details securely",
      "Record travel for reimbursement",
      "Manage team schedules (Team plans)",
    ],
    quote: "Accurate arrival times make a real difference for our participants. They can plan their day around our visits.",
    quoteName: "Emma, NDIS Support Coordinator",
    quoteLocation: "Perth",
  },
  {
    icon: Stethoscope,
    title: "Home-visit Clinicians",
    subtitle: "Nurses, physios, allied health",
    description:
      "See more patients without rushing. Efficient routing means more time for care and less time driving.",
    benefits: [
      "Optimise patient visit routes",
      "Track mileage for reimbursement",
      "Manage patient appointment times",
      "Send running late notifications",
      "Record notes per visit",
    ],
    quote: "I can see two extra patients a day now. That's a real difference for people waiting for care.",
    quoteName: "Dr. Chen, Mobile Physiotherapist",
    quoteLocation: "Adelaide",
  },
  {
    icon: PawPrint,
    title: "Mobile Pet Services",
    subtitle: "Dog grooming, pet sitting, dog walking",
    description:
      "Keep pet owners informed and manage your furry client list. Plan routes that work for you and the pets.",
    benefits: [
      "Plan grooming rounds efficiently",
      "Store pet details and preferences",
      "Track visit history per pet",
      "Send arrival notifications to owners",
      "Manage recurring appointments",
    ],
    quote: "Pet owners get anxious if you're late. DayRoute helps me stay on schedule and keep clients happy.",
    quoteName: "Lisa, Mobile Dog Groomer",
    quoteLocation: "Gold Coast",
  },
  {
    icon: Bug,
    title: "Pest Control",
    subtitle: "Residential and commercial pest management",
    description:
      "Handle emergency callouts alongside regular inspections. Route optimisation helps you respond faster.",
    benefits: [
      "Balance regular inspections with callouts",
      "Track treatment history per property",
      "Record chemicals and materials used",
      "Manage commercial contracts",
      "Create service reports",
    ],
    quote: "When you're dealing with pests, timing matters. Fast response keeps customers happy.",
    quoteName: "Dave, Pest Control Technician",
    quoteLocation: "Newcastle",
  },
  {
    icon: Truck,
    title: "Delivery & Courier",
    subtitle: "Local deliveries and courier services",
    description:
      "Maximise deliveries per trip with smart routing. Track your vehicle and keep proof of delivery.",
    benefits: [
      "Optimise multi-stop delivery routes",
      "Track kilometres for tax",
      "Record delivery confirmations",
      "Manage pickup and dropoff details",
      "Plan return routes",
    ],
    quote: "I do 30+ deliveries a day. Good routing is the difference between profit and loss.",
    quoteName: "Ryan, Courier Driver",
    quoteLocation: "Canberra",
  },
];

export default function UseCasesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Built for mobile professionals
              <br />
              <span className="text-primary">across Australia</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you&apos;re a tradie visiting job sites, a cleaner doing rounds,
              or an NDIS provider seeing participants — DayRoute helps you work
              smarter.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {useCases.map((useCase, index) => (
              <div
                key={useCase.title}
                className={`flex flex-col lg:flex-row gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                      <useCase.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{useCase.title}</h2>
                      <p className="text-muted-foreground">{useCase.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-lg text-muted-foreground mb-6">
                    {useCase.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {useCase.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-center gap-2 text-sm"
                      >
                        <Check className="h-4 w-4 text-primary shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  <Button asChild>
                    <Link href="/features">
                      See all features
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {/* Quote Card */}
                <div className="flex-1 max-w-md">
                  <Card className="bg-card/80">
                    <CardContent className="p-6">
                      <p className="text-lg italic mb-4">
                        &ldquo;{useCase.quote}&rdquo;
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-semibold">
                            {useCase.quoteName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold">{useCase.quoteName}</p>
                          <p className="text-sm text-muted-foreground">
                            {useCase.quoteLocation}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32 bg-card/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Whatever your trade, DayRoute helps
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of Australian mobile professionals who plan smarter
              routes and finish faster.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/#download">
                  <Smartphone className="mr-2 h-5 w-5" />
                  Coming Soon on App Store
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
