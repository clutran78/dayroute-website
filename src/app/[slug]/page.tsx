import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, AlertTriangle, ChevronRight, ArrowRight } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { AppStoreCTA, SetupCTA } from "../../components/app-store-button";
import {
  industryPages,
  getIndustryBySlug,
  getAllIndustrySlugs,
} from "../../data/industries";

// =============================================================================
// Static generation — pre-render every industry page at build time
// =============================================================================

export function generateStaticParams() {
  return getAllIndustrySlugs().map((slug) => ({ slug }));
}

// =============================================================================
// Dynamic metadata — unique title, description, OG tags, canonical per page
// =============================================================================

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getIndustryBySlug(slug);
  if (!page) return {};

  const canonical = `https://dayroute.com.au/${page.slug}`;

  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url: canonical,
      type: "website",
      locale: "en_AU",
      siteName: "DayRoute",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.metaDescription,
    },
  };
}

// =============================================================================
// Page component
// =============================================================================

export default async function IndustryPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getIndustryBySlug(slug);
  if (!page) notFound();

  const canonical = `https://dayroute.com.au/${page.slug}`;

  // ---------------------------------------------------------------------------
  // Schema: BreadcrumbList
  // ---------------------------------------------------------------------------
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://dayroute.com.au",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Use Cases",
        item: "https://dayroute.com.au/use-cases",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.shortName,
        item: canonical,
      },
    ],
  };

  // ---------------------------------------------------------------------------
  // Schema: FAQPage
  // ---------------------------------------------------------------------------
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="flex flex-col">
        {/* ===== BREADCRUMB ===== */}
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
            <ChevronRight className="h-3.5 w-3.5" />
            <li>
              <Link href="/use-cases" className="hover:text-foreground transition-colors">
                Use Cases
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="text-foreground font-medium truncate">{page.shortName}</li>
          </ol>
        </nav>

        {/* ===== HERO ===== */}
        <section className="relative overflow-hidden py-16 sm:py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                {page.h1}
              </h1>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground">
                {page.intro}
              </p>

              {/* Primary + secondary CTAs */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <AppStoreCTA
                  size="lg"
                  className="w-full sm:w-auto min-h-[48px]"
                  location={`industry-hero-${page.slug}`}
                />
                <SetupCTA
                  size="lg"
                  className="w-full sm:w-auto min-h-[48px]"
                  location={`industry-hero-${page.slug}`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===== PAIN POINTS ===== */}
        <section className="py-12 sm:py-20 bg-card/50 border-y border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-10 sm:mb-12">
              Common challenges for {page.shortName.toLowerCase()} businesses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {page.painPoints.map((point) => (
                <Card key={point.title} className="border-destructive/20">
                  <CardContent className="p-5 sm:p-6">
                    <AlertTriangle className="h-6 w-6 text-destructive/70 mb-3" />
                    <h3 className="font-semibold text-base sm:text-lg mb-2">
                      {point.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      {point.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FEATURES ===== */}
        <section className="py-12 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-10 sm:mb-12">
              How DayRoute helps
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {page.features.map((feature) => (
                <Card
                  key={feature.title}
                  className="group hover:border-primary/50 transition-colors"
                >
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-base sm:text-lg mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ===== TESTIMONIAL ===== */}
        <section className="py-12 sm:py-20 bg-card/50 border-y border-border">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <blockquote className="text-lg sm:text-xl italic text-foreground">
              &ldquo;{page.testimonial.quote}&rdquo;
            </blockquote>
            <div className="mt-4 flex items-center justify-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-semibold">
                  {page.testimonial.name.charAt(0)}
                </span>
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm">{page.testimonial.name}</p>
                <p className="text-xs text-muted-foreground">
                  {page.testimonial.role}, {page.testimonial.location}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FAQs ===== */}
        <section className="py-12 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-12">
              Frequently asked questions
            </h2>
            <div className="space-y-6 sm:space-y-8">
              {page.faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== BOTTOM CTA ===== */}
        <section className="py-16 sm:py-24 bg-card/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                Ready to streamline your {page.shortName.toLowerCase()} business?
              </h2>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Download DayRoute and start your 7-day free trial. No credit
                card required.
              </p>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
                <AppStoreCTA
                  size="lg"
                  className="w-full sm:w-auto min-h-[48px]"
                  location={`industry-bottom-${page.slug}`}
                />
                <SetupCTA
                  size="lg"
                  className="w-full sm:w-auto min-h-[48px]"
                  location={`industry-bottom-${page.slug}`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===== RELATED LINKS ===== */}
        <section className="py-10 sm:py-14 border-t border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">
              Related pages
            </h3>
            <div className="flex flex-wrap gap-3">
              {page.relatedLinks.map((link) => (
                <Button key={link.href} variant="outline" size="sm" asChild>
                  <Link href={link.href}>
                    {link.label}
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
