import { MetadataRoute } from "next";
import { getAllIndustrySlugs } from "../data/industries";
import { getAllFeaturePageSlugs } from "../data/feature-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dayroute.com.au";

  // Core site pages
  const coreRoutes = [
    "",
    "/features",
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
    priority: route === "" ? 1 : route === "/features" || route === "/pricing" ? 0.9 : 0.8,
  }));

  // Long-tail industry pages (auto-generated from data)
  const industryEntries: MetadataRoute.Sitemap = getAllIndustrySlugs().map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Long-tail feature / problem pages (auto-generated from data)
  const featureEntries: MetadataRoute.Sitemap = getAllFeaturePageSlugs().map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...coreEntries, ...industryEntries, ...featureEntries];
}
