// =============================================================================
// IndexNow push script
//
// IndexNow lets you INSTANTLY tell Bing (and therefore Perplexity & ChatGPT,
// which lean heavily on Bing's index) about all your pages — instead of waiting
// days/weeks for a crawl. Yandex, Seznam and others share the same protocol.
//
// How it works:
//   1. A secret key file lives at https://dayroute.com.au/<KEY>.txt (already added).
//   2. This script reads your live sitemap.xml, collects every URL, and POSTs
//      the list to IndexNow with that key as proof you own the site.
//
// Run it after each deploy that adds/changes pages:
//   npm run indexnow
// =============================================================================

const HOST = "dayroute.com.au";
const KEY = "ae5661131afe5a6a76d5f32ae83f1c70";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

async function main() {
  console.log(`Fetching sitemap: ${SITEMAP_URL}`);
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) {
    throw new Error(`Could not load sitemap (HTTP ${res.status}).`);
  }
  const xml = await res.text();

  // Pull every <loc>...</loc> URL out of the sitemap.
  const urlList = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim());
  if (urlList.length === 0) {
    throw new Error("No URLs found in sitemap.");
  }
  console.log(`Found ${urlList.length} URLs. Submitting to IndexNow…`);

  const submit = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    }),
  });

  // IndexNow returns 200 or 202 on success.
  if (submit.ok) {
    console.log(`✅ Submitted ${urlList.length} URLs (HTTP ${submit.status}).`);
  } else {
    const text = await submit.text();
    console.error(`❌ IndexNow rejected the request (HTTP ${submit.status}): ${text}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("IndexNow push failed:", err.message);
  process.exit(1);
});
