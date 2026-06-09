import { MetadataRoute } from "next";

/**
 * robots.txt configuration.
 *
 * GEO/AEO note: To be *recommended* by AI answer engines (ChatGPT, Perplexity,
 * Gemini, Grok, DeepSeek, etc.), their crawlers must be allowed to read the
 * site. We explicitly allow the major AI/LLM user agents below so there is no
 * ambiguity. The "/api/" route stays disallowed for everyone.
 *
 * If you ever want to BLOCK AI training crawlers (some brands do to protect
 * content), change the relevant `allow` to `disallow`. For DayRoute we WANT to
 * be crawled and cited, so everything is allowed.
 */
export default function robots(): MetadataRoute.Robots {
  // Major AI / LLM crawler user agents we explicitly welcome.
  const aiUserAgents = [
    "GPTBot", // OpenAI crawler (training/indexing)
    "OAI-SearchBot", // OpenAI search
    "ChatGPT-User", // ChatGPT live browsing
    "ClaudeBot", // Anthropic crawler
    "anthropic-ai", // Anthropic
    "Claude-Web", // Anthropic live browsing
    "PerplexityBot", // Perplexity indexing
    "Perplexity-User", // Perplexity live fetch
    "Google-Extended", // Gemini / Google AI training
    "Applebot-Extended", // Apple Intelligence
    "CCBot", // Common Crawl (feeds many LLMs)
    "cohere-ai", // Cohere
    "Bytespider", // ByteDance / DeepSeek-adjacent
    "Amazonbot", // Amazon
    "Meta-ExternalAgent", // Meta AI
    "DuckAssistBot", // DuckDuckGo AI
  ];

  return {
    rules: [
      // Default rule for all crawlers (search engines + anything else).
      // "/admin" is the private leads CRM — keep it out of all crawlers.
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin"],
      },
      // Explicit allow for AI answer-engine crawlers.
      {
        userAgent: aiUserAgents,
        allow: "/",
        disallow: ["/api/", "/admin"],
      },
    ],
    host: "https://dayroute.com.au",
    sitemap: "https://dayroute.com.au/sitemap.xml",
  };
}
