import { Metadata } from "next";
import Link from "next/link";
import { Quote, MapPin, Receipt, Camera, Route as RouteIcon } from "lucide-react";
import { AppStoreCTA } from "../../components/app-store-button";

// =============================================================================
// METADATA
// =============================================================================
export const metadata: Metadata = {
  title: "About DayRoute - Built by an Aussie Service Business Owner",
  description:
    "DayRoute was built by founder Adrian Stroe, a service business owner who lived the admin headache himself. Meet the person behind the all-in-one field-service app.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About DayRoute - The Story Behind the App",
    description:
      "Founder Adrian Stroe built DayRoute to solve his own problem: running a service business from spreadsheets and after-hours admin.",
  },
};

// =============================================================================
// STRUCTURED DATA — Person (founder) + AboutPage
// Gives AI answer engines a clear, citable founder entity tied to DayRoute.
// =============================================================================
const founderSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Adrian Stroe",
  jobTitle: "Founder",
  description:
    "Adrian Stroe is the founder of DayRoute, an Australian field-service app for sole traders and small crews. He has founded several ventures including Athletic Skins and TaxReturn Pro, and runs a gardening business that inspired DayRoute.",
  worksFor: {
    "@type": "Organization",
    name: "DayRoute",
    url: "https://dayroute.com.au",
  },
  knowsAbout: [
    "Field service businesses",
    "Gardening and lawn care",
    "Small business operations",
    "Invoicing and tax in Australia",
  ],
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About DayRoute",
  url: "https://dayroute.com.au/about",
  about: {
    "@type": "Organization",
    name: "DayRoute",
    url: "https://dayroute.com.au",
    founder: { "@type": "Person", name: "Adrian Stroe" },
  },
};

// =============================================================================
// ABOUT PAGE
// =============================================================================
export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(founderSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Founder avatar — initials fallback.
              TODO: drop a headshot at /public/founder-adrian-stroe.jpg and
              swap this block for a next/image when the photo is ready. */}
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/15 ring-2 ring-primary/30 text-2xl font-bold text-primary">
            AS
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Built by someone who lived the problem
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground">
            DayRoute was created by founder{" "}
            <span className="font-semibold text-foreground">Adrian Stroe</span> —
            not in a boardroom, but between jobs in a ute, running a real
            Australian service business.
          </p>
        </div>
      </section>

      {/* ===== THE STORY ===== */}
      <section className="py-12 sm:py-16 border-t border-border">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
          <p>
            A few years ago I started my entrepreneurial journey with my first
            brand, Athletic Skins. I invested around $15,000 of my own money into
            business coaching — because after years of steady government work, I
            realised that path was never going to give me the life I actually
            wanted. I wanted to build things, not wait for a retirement that
            someone else had planned for me.
          </p>
          <p>
            That decision sent me deep into learning how business really works —
            operations, marketing, the lot. It led to my next idea: an app to
            help everyday Australians claim more at tax time, something I was
            already doing for myself. So I built{" "}
            <a
              href="https://taxreturnpro.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              TaxReturn Pro
            </a>
            .
          </p>
          <p>
            Running that app cost real money in AI usage, so I leaned on a skill I
            already had — gardening — and set up a gardening business to fund it.
            It worked better than I expected. And running it day to day showed me
            a problem I couldn&apos;t unsee.
          </p>

          {/* Founder pull quote */}
          <blockquote className="my-8 rounded-2xl border-l-4 border-primary bg-card/60 p-5 sm:p-6">
            <Quote className="h-6 w-6 text-primary mb-3" />
            <p className="text-lg sm:text-xl font-medium text-foreground italic">
              I don&apos;t believe in waiting for retirement to start living. You
              should do what makes your heart sing — and build the tools that let
              you do more of it.
            </p>
            <footer className="mt-3 text-sm text-muted-foreground">
              — Adrian Stroe, Founder of DayRoute
            </footer>
          </blockquote>

          <p>
            My customers were spread across spreadsheets. I didn&apos;t have their
            addresses, emails and phone numbers in one place. I was doing invoices
            after hours in clunky bookkeeping software, instead of being with my
            family. I had no easy way to prove a job was done, and I was burning
            fuel driving an unplanned route across town.
          </p>
          <p>
            So I built the app I wished I&apos;d had —{" "}
            <span className="font-semibold text-foreground">DayRoute</span>. One
            place for every client, on-site GST invoicing, before-and-after photos
            for proof, automatic mileage tracking for tax, and a route that&apos;s
            planned for you so you save time and petrol. Everything I needed,
            without the after-hours admin.
          </p>
        </div>
      </section>

      {/* ===== WHY IT'S DIFFERENT ===== */}
      <section className="py-12 sm:py-16 bg-card/50 border-t border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
            Why DayRoute is different
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {[
              {
                icon: RouteIcon,
                title: "Built by an operator, not a software team",
                text: "Every feature exists because it solved a real problem on a real job — not because it looked good in a demo.",
              },
              {
                icon: MapPin,
                title: "One place for your whole round",
                text: "Clients, addresses, schedules and routes together — no more chasing details across spreadsheets.",
              },
              {
                icon: Receipt,
                title: "Admin done on site, not after hours",
                text: "Quote, invoice and log expenses before you leave the driveway, so your evenings are yours again.",
              },
              {
                icon: Camera,
                title: "Proof and tax sorted automatically",
                text: "Before-and-after photos and an ATO-ready mileage logbook, captured as you work.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 p-5 rounded-2xl bg-background border border-border"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Run your business the way I wish I could have
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground">
            Try DayRoute free for 7 days and get your evenings back.
          </p>
          <div className="mt-8 flex justify-center">
            <AppStoreCTA size="lg" className="min-h-[48px]" location="about-cta" />
          </div>
        </div>
      </section>
    </div>
  );
}
