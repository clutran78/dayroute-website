import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Clock, Calendar, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { AppStoreCTA } from "../../../components/app-store-button";
import {
  getAllBlogSlugs,
  getBlogPostBySlug,
} from "../../../data/blog-posts";

// =============================================================================
// Static generation
// =============================================================================

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

// =============================================================================
// Metadata
// =============================================================================

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  const canonical = `https://dayroute.com.au/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: canonical,
      type: "article",
      locale: "en_AU",
      siteName: "DayRoute",
      publishedTime: post.publishDate,
      modifiedTime: post.updatedDate || post.publishDate,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
    },
  };
}

// =============================================================================
// Page component
// =============================================================================

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const canonical = `https://dayroute.com.au/blog/${post.slug}`;

  // Schema: Article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishDate,
    dateModified: post.updatedDate || post.publishDate,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "DayRoute",
      url: "https://dayroute.com.au",
    },
    mainEntityOfPage: canonical,
  };

  // Schema: BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://dayroute.com.au" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://dayroute.com.au/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: canonical },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="flex flex-col">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mx-auto max-w-3xl w-full px-4 sm:px-6 lg:px-8 pt-6">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="text-foreground font-medium truncate max-w-[200px]">{post.category}</li>
          </ol>
        </nav>

        {/* Article header */}
        <header className="py-10 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
              {post.category}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {new Date(post.publishDate).toLocaleDateString("en-AU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readingTime}
              </span>
              <span>{post.author}</span>
            </div>
          </div>
        </header>

        {/* Article body */}
        <article className="pb-16 sm:pb-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-8 sm:space-y-10">
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                    {section.heading}
                  </h2>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
                    {section.content}
                  </p>
                  {section.bullets && (
                    <ul className="space-y-2.5 pl-1">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground">
                          <span className="text-primary mt-1.5 shrink-0">•</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl bg-card border border-border text-center">
              <h3 className="text-lg sm:text-xl font-bold mb-2">
                Ready to try DayRoute?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-6">
                Download DayRoute and start your 7-day free trial. No credit card required.
              </p>
              <AppStoreCTA location={`blog-${post.slug}`} />
            </div>

            {/* Related pages */}
            {post.relatedPages.length > 0 && (
              <div className="mt-10 sm:mt-12 pt-8 border-t border-border">
                <h3 className="text-sm font-semibold text-muted-foreground mb-4">Related pages</h3>
                <div className="flex flex-wrap gap-3">
                  {post.relatedPages.map((link) => (
                    <Button key={link.href} variant="outline" size="sm" asChild>
                      <Link href={link.href}>
                        {link.label}
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-secondary/60 px-3 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Back to blog */}
            <div className="mt-8">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/blog">
                  <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                  Back to all articles
                </Link>
              </Button>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
