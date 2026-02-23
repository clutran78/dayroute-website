import { MetadataRoute } from "next";
import { getAllIndustrySlugs } from "../data/industries";

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

  // Long-tail industry / SEO pages (auto-generated from data)
  const industrySlugs = getAllIndustrySlugs();
  const industryEntries: MetadataRoute.Sitemap = industrySlugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...coreEntries, ...industryEntries];
}
