import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dayroute.com.au";

  const routes = [
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

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/features" || route === "/pricing" ? 0.9 : 0.8,
  }));
}
