import { Metadata } from "next";
import Link from "next/link";
import { Sparkles, Rocket, HeadphonesIcon, ChevronRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { AppStoreCTA } from "../../components/app-store-button";

export const metadata: Metadata = {
  title: "Book Free Setup - Get Started with DayRoute",
  description:
    "Get started with DayRoute in minutes. The app guides you through setup, but if you need a hand, our support team is here to help.",
  alternates: { canonical: "/book-free-setup" },
};

export default function BookFreeSetupPage() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-30" />

        <div className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Fun icon */}
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 mb-6">
            <Rocket className="h-8 w-8 text-primary" />
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            Good news — you&apos;re already set up!
          </h1>

          <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
            DayRoute is designed to get you running in under 10 minutes. 
            Just download the app, add your first clients, and optimise your first route. 
            No setup call needed — everything you need is right there in the app.
          </p>

          {/* Sparkles list */}
          <div className="mt-8 flex flex-col gap-3 max-w-md mx-auto text-left">
            {[
              "Add clients and jobs in seconds",
              "Import appointments from your phone calendar",
              "Optimise your first route with one tap",
              "Start your 7-day free trial instantly",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm sm:text-base text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary shrink-0" />
                {item}
              </div>
            ))}
          </div>

          {/* Primary CTA */}
          <div className="mt-10">
            <AppStoreCTA size="lg" className="min-h-[48px]" location="book-free-setup" />
          </div>

          {/* Support fallback */}
          <div className="mt-12 p-6 rounded-2xl bg-card border border-border">
            <div className="flex items-center justify-center gap-2 mb-3">
              <HeadphonesIcon className="h-5 w-5 text-primary" />
              <h2 className="text-base font-semibold">Need a hand?</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              If you need help getting started or have questions about DayRoute, 
              our support team is happy to help. No question is too small.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/support">
                Contact Support
                <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          {/* Personality line */}
          <p className="mt-8 text-xs text-muted-foreground/60 italic">
            We&apos;re working on a live booking option for personalised setup calls. 
            Stay tuned — it&apos;s coming soon!
          </p>
        </div>
      </section>
    </div>
  );
}
