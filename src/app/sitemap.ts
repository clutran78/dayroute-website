import { MetadataRoute } from "next";
import { getAllSeoSlugs } from "../data/seo-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dayroute.com.au";

  // Core site pages
  const coreRoutes = [
    "",
    "/features",
    "/industries",
    "/pricing",
    "/use-cases",
    "/security",
    "/faq",
    "/support",
    "/privacy",
    "/terms",
  ];

  const coreEntries: MetadataRoute.Sitemap = coreRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : ["/features", "/pricing", "/industries"].includes(route) ? 0.9 : 0.8,
  }));

  // Long-tail SEO pages (auto-generated from unified data file)
  const seoEntries: MetadataRoute.Sitemap = getAllSeoSlugs().map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...coreEntries, ...seoEntries];
}
