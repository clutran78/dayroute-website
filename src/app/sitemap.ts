import { MetadataRoute } from "next";
import { getAllSeoSlugs } from "../data/seo-pages";
import { getAllBlogSlugs } from "../data/blog-posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dayroute.com.au";

  // Core site pages
  const coreRoutes = [
    "",
    "/features",
    "/industries",
    "/pricing",
    "/use-cases",
    "/blog",
    "/security",
    "/faq",
    "/support",
    "/privacy",
    "/terms",
    "/contact",
    "/book-free-setup",
  ];

  const coreEntries: MetadataRoute.Sitemap = coreRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : route === "/blog" ? "weekly" : "monthly",
    priority: route === "" ? 1 : ["/features", "/pricing", "/industries", "/blog"].includes(route) ? 0.9 : 0.8,
  }));

  // Long-tail SEO pages
  const seoEntries: MetadataRoute.Sitemap = getAllSeoSlugs().map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Blog posts
  const blogEntries: MetadataRoute.Sitemap = getAllBlogSlugs().map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...coreEntries, ...seoEntries, ...blogEntries];
}
