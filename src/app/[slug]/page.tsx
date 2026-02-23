import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Check,
  AlertTriangle,
  ChevronRight,
  ArrowRight,
  Lightbulb,
  Users,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { AppStoreCTA, SetupCTA } from "../../components/app-store-button";
import { getIndustryBySlug, getAllIndustrySlugs } from "../../data/industries";
import {
  getFeaturePageBySlug,
  getAllFeaturePageSlugs,
  type FeaturePage,
} from "../../data/feature-pages";
import type { IndustryPage } from "../../data/industries";

// =============================================================================
// Static generation — pre-render every SEO page at build time
// =============================================================================

export function generateStaticParams() {
  const industrySlugs = getAllIndustrySlugs().map((slug) => ({ slug }));
  const featureSlugs = getAllFeaturePageSlugs().map((slug) => ({ slug }));
  return [...industrySlugs, ...featureSlugs];
}

// =============================================================================
// Dynamic metadata — unique per page
// =============================================================================

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const industry = getIndustryBySlug(slug);
  const feature = getFeaturePageBySlug(slug);
  const page = industry || feature;
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
// Page component — routes to the correct template
// =============================================================================

export default async function SlugPage({ params }: PageProps) {
  const { slug } = await params;

  const industry = getIndustryBySlug(slug);
  if (industry) return <IndustryTemplate page={industry} />;

  const feature = getFeaturePageBySlug(slug);
  if (feature) return <FeatureTemplate page={feature} />;

  notFound();
}

// =============================================================================
// INDUSTRY TEMPLATE (vertical: gardening, cleaning, etc.)
// =============================================================================

function IndustryTemplate({ page }: { page: IndustryPage }) {
  const canonical = `https://dayroute.com.au/${page.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://dayroute.com.au" },
      { "@type": "ListItem", position: 2, name: "Use Cases", item: "https://dayroute.com.au/use-cases" },
      { "@type": "ListItem", position: 3, name: page.shortName, item: canonical },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="flex flex-col">
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "Use Cases", href: "/use-cases" },
          { label: page.shortName },
        ]} />

        {/* Hero */}
        <HeroSection h1={page.h1} intro={page.intro} slug={page.slug} prefix="industry" />

        {/* Pain points */}
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
                    <h3 className="font-semibold text-base sm:text-lg mb-2">{point.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">{point.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-10 sm:mb-12">How DayRoute helps</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {page.features.map((f) => (
                <Card key={f.title} className="group hover:border-primary/50 transition-colors">
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-base sm:text-lg mb-1">{f.title}</h3>
                        <p className="text-sm sm:text-base text-muted-foreground">{f.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <TestimonialSection testimonial={page.testimonial} />

        {/* FAQs */}
        <FaqSection faqs={page.faqs} />

        {/* Bottom CTA */}
        <BottomCta
          heading={`Ready to streamline your ${page.shortName.toLowerCase()} business?`}
          slug={page.slug}
          prefix="industry"
        />

        {/* Related links */}
        <RelatedLinks links={page.relatedLinks} />
      </div>
    </>
  );
}

// =============================================================================
// FEATURE TEMPLATE (problem/workflow: route planning, invoicing, etc.)
// =============================================================================

function FeatureTemplate({ page }: { page: FeaturePage }) {
  const canonical = `https://dayroute.com.au/${page.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://dayroute.com.au" },
      { "@type": "ListItem", position: 2, name: page.breadcrumbParent.label, item: `https://dayroute.com.au${page.breadcrumbParent.href}` },
      { "@type": "ListItem", position: 3, name: page.shortName, item: canonical },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="flex flex-col">
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: page.breadcrumbParent.label, href: page.breadcrumbParent.href },
          { label: page.shortName },
        ]} />

        {/* Hero */}
        <HeroSection h1={page.h1} intro={page.intro} slug={page.slug} prefix="feature" />

        {/* The problem */}
        <section className="py-12 sm:py-20 bg-card/50 border-y border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">{page.problem.heading}</h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6">{page.problem.description}</p>
              <ul className="space-y-3">
                {page.problem.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground">
                    <AlertTriangle className="h-4 w-4 text-destructive/70 shrink-0 mt-1" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* The solution */}
        <section className="py-12 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">{page.solution.heading}</h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-10 max-w-3xl">{page.solution.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {page.solution.steps.map((step, i) => (
                <Card key={step.title} className="group hover:border-primary/50 transition-colors">
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-base sm:text-lg mb-1">{step.title}</h3>
                        <p className="text-sm sm:text-base text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Industry examples */}
        <section className="py-12 sm:py-20 bg-card/50 border-y border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-10 sm:mb-12">
              <Users className="h-6 w-6 text-primary" />
              <h2 className="text-2xl sm:text-3xl font-bold">Who uses this</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {page.industryExamples.map((ex) => (
                <Card key={ex.industry}>
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-sm sm:text-base mb-1">{ex.industry}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">{ex.example}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <FaqSection faqs={page.faqs} />

        {/* Bottom CTA */}
        <BottomCta
          heading="Try DayRoute free for 7 days"
          slug={page.slug}
          prefix="feature"
        />

        {/* Related links */}
        <RelatedLinks links={page.relatedLinks} />
      </div>
    </>
  );
}

// =============================================================================
// SHARED SUB-COMPONENTS
// =============================================================================

function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-6">
      <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}
            {item.href ? (
              <Link href={item.href} className="hover:text-foreground transition-colors">{item.label}</Link>
            ) : (
              <span className="text-foreground font-medium truncate">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function HeroSection({ h1, intro, slug, prefix }: { h1: string; intro: string; slug: string; prefix: string }) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">{h1}</h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground">{intro}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <AppStoreCTA size="lg" className="w-full sm:w-auto min-h-[48px]" location={`${prefix}-hero-${slug}`} />
            <SetupCTA size="lg" className="w-full sm:w-auto min-h-[48px]" location={`${prefix}-hero-${slug}`} />
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialSection({ testimonial }: { testimonial: IndustryPage["testimonial"] }) {
  return (
    <section className="py-12 sm:py-20 bg-card/50 border-y border-border">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <blockquote className="text-lg sm:text-xl italic text-foreground">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        <div className="mt-4 flex items-center justify-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-semibold">{testimonial.name.charAt(0)}</span>
          </div>
          <div className="text-left">
            <p className="font-semibold text-sm">{testimonial.name}</p>
            <p className="text-xs text-muted-foreground">{testimonial.role}, {testimonial.location}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <section className="py-12 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-12">Frequently asked questions</h2>
        <div className="space-y-6 sm:space-y-8">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <h3 className="text-base sm:text-lg font-semibold mb-2">{faq.question}</h3>
              <p className="text-sm sm:text-base text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BottomCta({ heading, slug, prefix }: { heading: string; slug: string; prefix: string }) {
  return (
    <section className="py-16 sm:py-24 bg-card/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">{heading}</h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Download DayRoute and start your 7-day free trial. No credit card required.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
            <AppStoreCTA size="lg" className="w-full sm:w-auto min-h-[48px]" location={`${prefix}-bottom-${slug}`} />
            <SetupCTA size="lg" className="w-full sm:w-auto min-h-[48px]" location={`${prefix}-bottom-${slug}`} />
          </div>
        </div>
      </div>
    </section>
  );
}

function RelatedLinks({ links }: { links: { label: string; href: string }[] }) {
  return (
    <section className="py-10 sm:py-14 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h3 className="text-sm font-semibold text-muted-foreground mb-4">Related pages</h3>
        <div className="flex flex-wrap gap-3">
          {links.map((link) => (
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
  );
}
