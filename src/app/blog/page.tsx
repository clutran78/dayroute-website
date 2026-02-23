import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Clock, Calendar } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { getAllBlogPosts } from "../../data/blog-posts";

export const metadata: Metadata = {
  title: "Blog - Tips for Australian Service Businesses",
  description:
    "Practical tips for tradies, cleaners, NDIS providers, and mobile service professionals. Route planning, invoicing, tax tips, and business advice from DayRoute.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "DayRoute Blog - Tips for Australian Service Businesses",
    description:
      "Practical tips on route planning, invoicing, tax, and running a mobile service business in Australia.",
    url: "https://dayroute.com.au/blog",
    type: "website",
    locale: "en_AU",
    siteName: "DayRoute",
  },
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://dayroute.com.au" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://dayroute.com.au/blog" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="flex flex-col">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-6">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="text-foreground font-medium">Blog</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="relative overflow-hidden py-16 sm:py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                Tips for running a smarter service business
              </h1>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground">
                Practical advice on route planning, invoicing, tax, and growing your mobile 
                service business in Australia. Written for tradies, cleaners, NDIS providers, 
                and anyone who works on the road.
              </p>
            </div>
          </div>
        </section>

        {/* Post grid */}
        <section className="py-12 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                  <Card className="h-full hover:border-primary/50 transition-colors">
                    <CardContent className="p-5 sm:p-6 flex flex-col h-full">
                      {/* Category badge */}
                      <span className="inline-flex self-start items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary mb-3">
                        {post.category}
                      </span>

                      {/* Title */}
                      <h2 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground pt-3 border-t border-border">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(post.publishDate).toLocaleDateString("en-AU", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {post.readingTime}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
