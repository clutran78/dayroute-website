/**
 * ============================================================================
 * DayRoute — Central SEO Pages Data File
 * ============================================================================
 *
 * WHAT THIS FILE DOES:
 * This is the single source of truth for ALL long-tail SEO pages on the
 * DayRoute website. Every entry in the `seoPages` array produces a unique
 * page at /{slug}. The dynamic route at src/app/[slug]/page.tsx reads this
 * data and renders the appropriate template.
 *
 * PAGE TYPES:
 *   "category"  — Industry vertical pages (e.g. gardening, cleaning, NDIS).
 *                 Template: pain points → features → testimonial → FAQs.
 *   "feature"   — Problem/workflow pages (e.g. route planning, invoicing).
 *                 Template: problem → solution steps → industry examples → FAQs.
 *
 * ============================================================================
 * HOW TO ADD A NEW PAGE (under 10 minutes):
 * ============================================================================
 *
 * 1. Copy an existing entry of the same pageType ("category" or "feature").
 * 2. Change the slug — this becomes the URL path (e.g. "/my-new-page").
 * 3. Write unique content for EVERY field. Do NOT keyword-swap from another
 *    page — Google will penalise thin/duplicate content.
 * 4. Minimum content requirements (enforced by validateSeoPage()):
 *    - seoTitle: 10+ characters
 *    - metaDescription: 50+ characters, max 160
 *    - h1: 10+ characters
 *    - intro: 80+ characters
 *    - faqs: at least 3
 *    - relatedLinks: at least 2
 *    - Category pages: at least 3 painPoints, 3 featureHighlights
 *    - Feature pages: at least 3 problem bullets, 3 solution steps
 * 5. Run `npm run build` — validation runs at build time. Thin pages will
 *    throw an error with a clear message.
 * 6. Push to GitHub — Vercel auto-deploys.
 *
 * HOW TO UPDATE TITLE / META:
 *   Find the page by slug, change `seoTitle` or `metaDescription`.
 *
 * HOW TO LINK FROM /industries:
 *   Open src/app/industries/page.tsx → find the category card → set
 *   `nichePage: "/your-slug"` to link the card to your new page.
 *
 * ============================================================================
 * RULES:
 * ============================================================================
 * - Australian English throughout.
 * - Do NOT mention competitor brand names (see brand protection policy).
 * - Do NOT claim features or integrations that don't exist.
 * - Every page must be genuinely useful to the target audience.
 */

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/** Shared FAQ type used by all page types. */
export interface SeoFaq {
  question: string;
  answer: string;
}

/** Shared related-link type. */
export interface SeoRelatedLink {
  label: string;
  href: string;
}

/** Base fields shared by every SEO page. */
interface BaseSeoPage {
  slug: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  shortName: string;
  intro: string;
  faqs: SeoFaq[];
  relatedLinks: SeoRelatedLink[];
}

/** Category page — targets an industry vertical (gardening, cleaning, etc.) */
export interface CategorySeoPage extends BaseSeoPage {
  pageType: "category";
  painPoints: { title: string; description: string }[];
  featureHighlights: { title: string; description: string }[];
  testimonial: { quote: string; name: string; role: string; location: string };
}

/** Social proof — optional on feature/BOFU pages. */
export interface SeoTestimonial {
  quote: string;
  name: string;
  role: string;
  location: string;
}

/** Fact chip for BOFU proof strip (stat must be defensible). */
export interface SeoProofPoint {
  stat: string;
  label: string;
}

/** Feature page — targets a problem or workflow (route planning, invoicing, etc.) */
export interface FeatureSeoPage extends BaseSeoPage {
  pageType: "feature";
  breadcrumbParent: { label: string; href: string };
  problem: { heading: string; description: string; bullets: string[] };
  solution: { heading: string; description: string; steps: { title: string; description: string }[] };
  industryExamples: { industry: string; example: string }[];
  proofStrip?: SeoProofPoint[];
  testimonial?: SeoTestimonial;
  bottomCtaHeading?: string;
  bottomCtaSubtext?: string;
}

/** Discriminated union — a page is either a category page or a feature page. */
export type SeoPage = CategorySeoPage | FeatureSeoPage;

// =============================================================================
// SLUG NAMING CONVENTIONS
// =============================================================================
//
// Slugs are URL paths. They must follow these rules:
//
//   FORMAT:
//   - Lowercase only (no uppercase letters)
//   - Words separated by hyphens (no spaces, underscores, or dots)
//   - No leading or trailing hyphens
//   - No consecutive hyphens (e.g. "my--slug")
//   - No special characters (only a-z, 0-9, and hyphens)
//   - Minimum 5 characters
//
//   NAMING PATTERNS (Australian market):
//
//   Category pages (industry verticals):
//     /{industry}-business-scheduling-invoicing-app-australia
//     Examples:
//       gardening-business-scheduling-invoicing-app-australia
//       cleaning-business-scheduling-invoicing-app-australia
//
//   Feature pages (problem/workflow):
//     /{feature}-for-service-businesses-australia
//     Examples:
//       route-planning-for-service-businesses-australia
//       mileage-logbook-receipts-for-service-businesses-australia
//
//   Comparison pages (brand-neutral):
//     /mobile-field-service-app-vs-{generic-category}
//
//   BOFU pages (DayRoute-branded):
//     /dayroute-vs-{alternative}
//     /dayroute-vs-{competitor}-solo-operators  (only when explicitly approved)
//     /best-{topic}-{industry}-australia
//
//   IMPORTANT:
//   - Avoid competitor names in slugs unless explicitly approved (e.g. ServiceM8 BOFU).
//   - Use Australian English spelling (e.g. "optimisation" not "optimization").
//   - Keep slugs descriptive but under 80 characters.
//
// =============================================================================

// =============================================================================
// SLUG VALIDATION
// =============================================================================

/** Regex: lowercase letters, digits, and hyphens only. No leading/trailing/double hyphens. */
const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** Reserved paths that must not be used as SEO page slugs. */
const RESERVED_SLUGS = new Set([
  "features",
  "pricing",
  "industries",
  "use-cases",
  "faq",
  "support",
  "security",
  "privacy",
  "terms",
  "contact",
  "api",
  "book-free-setup",
  "compare",
]);

/**
 * Normalise a slug: trim, lowercase, collapse whitespace/underscores to hyphens,
 * strip invalid characters, collapse consecutive hyphens, trim leading/trailing hyphens.
 * Use this when generating slugs programmatically.
 */
export function normaliseSlug(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")       // spaces and underscores → hyphens
    .replace(/[^a-z0-9-]/g, "")    // strip everything except a-z, 0-9, hyphens
    .replace(/-{2,}/g, "-")        // collapse consecutive hyphens
    .replace(/^-+|-+$/g, "");      // trim leading/trailing hyphens
}

// =============================================================================
// CONTENT VALIDATION — prevents thin / empty / broken pages at build time
// =============================================================================

/**
 * Validates a single SEO page entry. Throws a descriptive error if
 * content thresholds or slug rules are violated.
 */
export function validateSeoPage(page: SeoPage): void {
  const errors: string[] = [];
  const ctx = `[${page.slug}]`;

  // --- Slug format checks ---
  if (!page.slug || page.slug.length < 5) {
    errors.push(`${ctx} slug is too short (min 5 chars)`);
  }
  if (page.slug && page.slug.length > 80) {
    errors.push(`${ctx} slug is too long (${page.slug.length} chars, max 80)`);
  }
  if (page.slug && !SLUG_PATTERN.test(page.slug)) {
    errors.push(`${ctx} slug has invalid characters — must be lowercase a-z, 0-9, hyphens only, no leading/trailing/double hyphens`);
  }
  if (page.slug && page.slug !== page.slug.toLowerCase()) {
    errors.push(`${ctx} slug contains uppercase letters — use lowercase only`);
  }
  if (page.slug && RESERVED_SLUGS.has(page.slug)) {
    errors.push(`${ctx} slug "${page.slug}" conflicts with a reserved route`);
  }

  // --- Content checks ---
  if (!page.seoTitle || page.seoTitle.length < 10) errors.push(`${ctx} seoTitle must be 10+ characters`);
  if (!page.metaDescription || page.metaDescription.length < 50) errors.push(`${ctx} metaDescription must be 50+ characters`);
  if (page.metaDescription && page.metaDescription.length > 160) errors.push(`${ctx} metaDescription exceeds 160 characters (${page.metaDescription.length})`);
  if (!page.h1 || page.h1.length < 10) errors.push(`${ctx} h1 must be 10+ characters`);
  if (!page.intro || page.intro.length < 80) errors.push(`${ctx} intro must be 80+ characters`);
  if (!page.faqs || page.faqs.length < 3) errors.push(`${ctx} needs at least 3 FAQs`);
  if (!page.relatedLinks || page.relatedLinks.length < 2) errors.push(`${ctx} needs at least 2 relatedLinks`);

  if (page.pageType === "category") {
    if (!page.painPoints || page.painPoints.length < 3) errors.push(`${ctx} category page needs at least 3 painPoints`);
    if (!page.featureHighlights || page.featureHighlights.length < 3) errors.push(`${ctx} category page needs at least 3 featureHighlights`);
    if (!page.testimonial?.quote) errors.push(`${ctx} category page needs a testimonial`);
  }

  if (page.pageType === "feature") {
    if (!page.problem?.bullets || page.problem.bullets.length < 3) errors.push(`${ctx} feature page needs at least 3 problem bullets`);
    if (!page.solution?.steps || page.solution.steps.length < 3) errors.push(`${ctx} feature page needs at least 3 solution steps`);
    if (!page.industryExamples || page.industryExamples.length < 3) errors.push(`${ctx} feature page needs at least 3 industry examples`);
  }

  if (errors.length > 0) {
    throw new Error(`SEO page validation failed:\n${errors.join("\n")}`);
  }
}

/** Validates all pages. Called at module load time to catch issues early. */
function validateAll(pages: SeoPage[]): void {
  const slugs = new Set<string>();
  for (const page of pages) {
    // Duplicate slug check
    if (slugs.has(page.slug)) {
      throw new Error(`Duplicate SEO page slug: "${page.slug}"`);
    }
    slugs.add(page.slug);

    // Full page validation
    validateSeoPage(page);
  }
}

// =============================================================================
// PAGE DATA
// =============================================================================

export const seoPages: SeoPage[] = [
  // ===========================================================================
  // CATEGORY PAGES (industry verticals)
  // ===========================================================================

  {
    pageType: "category",
    slug: "pool-service-business-scheduling-invoicing-app-australia",
    seoTitle: "Pool Service Business Scheduling & Invoicing App Australia",
    metaDescription:
      "DayRoute helps Australian pool service businesses plan daily routes, schedule regular clients, track chemical costs, and invoice on the spot.",
    h1: "Scheduling and invoicing for Australian pool service businesses",
    shortName: "Pool Services",
    intro:
      "Pool servicing is a route-heavy, recurring business — you visit the same pools every week or fortnight, testing water, balancing chemicals, and cleaning filters. DayRoute helps you plan the fastest route between pools, track chemical and equipment costs, manage recurring schedules, and invoice on the spot. Built for solo pool techs and small pool service teams across Australia.",
    painPoints: [
      { title: "Driving between pools wastes hours every week", description: "Pool visits are spread across suburbs. Without route planning, you criss-cross the same areas and burn fuel getting to jobs you could've grouped together." },
      { title: "Tracking chemical costs per pool is tedious", description: "Chlorine, acid, salt, stabiliser — every pool needs different amounts. If you're not tracking costs per client, you're probably under-charging some and over-charging others." },
      { title: "Remembering which pool is due when", description: "Weekly clients, fortnightly clients, seasonal openings and closures — keeping it all in your head or on paper leads to missed visits and unhappy customers." },
    ],
    featureHighlights: [
      { title: "Multi-stop route optimisation", description: "Enter your pool visits and DayRoute plans the fastest order. Spend more time at the pool and less time in the van." },
      { title: "Recurring job scheduling", description: "Set up weekly or fortnightly visits per client. DayRoute auto-generates jobs on your schedule so no pool gets missed." },
      { title: "Chemical and equipment expense tracking", description: "Snap receipts for chemicals, parts, and equipment. The AI scanner extracts totals and GST — sorted for BAS time." },
      { title: "On-the-spot invoicing", description: "Complete a visit, tap invoice, and send. Fixed monthly rates or per-visit billing — DayRoute handles both." },
    ],
    faqs: [
      { question: "Can I set up recurring visits for regular pool clients?", answer: "Yes. DayRoute supports weekly, fortnightly, and monthly recurring bookings. Jobs are auto-generated so you never miss a client's pool service." },
      { question: "Can I track chemical costs per pool?", answer: "Yes. Log expenses against each job using the AI receipt scanner or manual entry. Over time you'll see exactly what each pool costs to service." },
      { question: "Does DayRoute work for pool service teams?", answer: "Yes. The Team plan supports up to 10 users with shared scheduling, route assignment, and location sharing — ideal for growing pool service businesses." },
    ],
    testimonial: { quote: "I service 60 pools across the northern beaches. DayRoute cut my drive time by nearly an hour a day and my invoices go out before I leave each property.", name: "Brett", role: "Pool Service Technician", location: "Sydney" },
    relatedLinks: [
      { label: "All features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Gardening app", href: "/gardening-business-scheduling-invoicing-app-australia" },
      { label: "Pest control app", href: "/pest-control-job-scheduling-route-app-australia" },
      { label: "Blog: Pool service costs", href: "/blog/how-much-does-it-cost-to-run-a-pool-service-round-in-australia" },
    ],
  },

  {
    pageType: "category",
    slug: "irrigation-business-scheduling-invoicing-app-australia",
    seoTitle: "Irrigation Business Scheduling & Invoicing App Australia",
    metaDescription:
      "DayRoute helps Australian irrigation businesses plan install and maintenance routes, track parts, and invoice clients from your phone.",
    h1: "Scheduling and invoicing for irrigation businesses in Australia",
    shortName: "Irrigation",
    intro:
      "Irrigation work means visiting properties to install, repair, or maintain sprinkler systems, drip lines, and controllers — often with multiple stops per day across rural and suburban areas. DayRoute helps you plan efficient routes between sites, track parts and materials, and invoice on completion. Built for Australian irrigation contractors and landscapers who handle water systems.",
    painPoints: [
      { title: "Jobs are spread across wide areas", description: "Irrigation work covers large service areas — sometimes rural properties 30+ minutes apart. Without route planning, you waste hours on the road." },
      { title: "Tracking parts and materials per job", description: "Sprinkler heads, PVC fittings, valves, controllers — every job uses different parts. Keeping track of costs per client is essential for accurate invoicing." },
      { title: "Seasonal demand creates scheduling chaos", description: "Spring and summer bring a flood of new install requests on top of existing maintenance rounds. Without a system, you double-book and miss jobs." },
    ],
    featureHighlights: [
      { title: "Route optimisation across wide service areas", description: "Plan your day with the shortest drive between sites. DayRoute handles both suburban streets and rural property addresses." },
      { title: "Parts and materials expense tracking", description: "Log fittings, controllers, and pipe costs per job. Snap receipts and let the AI extract totals and GST." },
      { title: "Job notes for system details", description: "Record controller models, zone layouts, and maintenance notes per property. Notes carry over to repeat visits." },
      { title: "Professional invoicing with line items", description: "Invoice for labour plus itemised parts. Send via SMS or email from your phone before you leave the property." },
    ],
    faqs: [
      { question: "Can I store irrigation system details per property?", answer: "Yes. Use the job notes field to record controller models, zone configurations, and maintenance history. Notes are saved per client and carry over to every visit." },
      { question: "Does DayRoute handle both installs and maintenance visits?", answer: "Yes. Schedule one-off installation jobs alongside recurring maintenance rounds. DayRoute optimises the route for whatever mix of jobs you have each day." },
      { question: "Can I invoice for parts plus labour?", answer: "Yes. Create invoices with separate line items for labour and each part used. GST is calculated automatically." },
    ],
    testimonial: { quote: "I cover a huge area across regional Victoria. DayRoute helps me group jobs by location so I'm not driving back and forth across the same highways.", name: "Tom", role: "Irrigation Contractor", location: "Geelong" },
    relatedLinks: [
      { label: "All features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Gardening app", href: "/gardening-business-scheduling-invoicing-app-australia" },
      { label: "Pool service app", href: "/pool-service-business-scheduling-invoicing-app-australia" },
    ],
  },

  {
    pageType: "category",
    slug: "hot-water-service-business-scheduling-invoicing-app-australia",
    seoTitle: "Hot Water Service Business Scheduling & Invoicing App Australia",
    metaDescription:
      "DayRoute helps Australian hot water service businesses plan routes, schedule installs and repairs, track parts, and invoice on the spot.",
    h1: "Scheduling and invoicing for hot water service businesses",
    shortName: "Hot Water",
    intro:
      "Hot water system installations, repairs, and servicing take you across suburbs every day — often with urgent callouts mixed into your planned schedule. DayRoute helps you plan efficient routes, slot in emergency jobs without blowing up your day, track parts costs, and invoice clients before you leave the property. Built for Australian plumbers and hot water specialists.",
    painPoints: [
      { title: "Emergency callouts disrupt your planned day", description: "A burst hot water system can't wait until next week. You need to slot it in without missing your other appointments." },
      { title: "Parts costs vary wildly between jobs", description: "A simple tempering valve vs. a full system replacement — tracking what you spend per job is essential for accurate quoting and invoicing." },
      { title: "Clients want fast, reliable service", description: "Nobody wants to wait days for hot water. Efficient scheduling and reliable ETAs keep clients happy and earn you referrals." },
    ],
    featureHighlights: [
      { title: "Flexible scheduling with re-optimisation", description: "Add an urgent callout mid-day and DayRoute recalculates the best order for your remaining jobs. No manual reshuffling." },
      { title: "Parts and equipment cost tracking", description: "Log valves, thermostats, anodes, and system costs per job. Snap receipts for instant expense logging with AI." },
      { title: "ETA notifications for clients", description: "Send a one-tap 'On My Way' message with your estimated arrival. Clients know exactly when to expect you." },
      { title: "On-site invoicing with parts line items", description: "Create invoices with labour and itemised parts. Send via SMS or email while you're still at the property." },
    ],
    faqs: [
      { question: "Can I add emergency callouts mid-day?", answer: "Yes. Add an urgent job at any time and DayRoute re-optimises your route for the rest of the day. You won't miss existing appointments." },
      { question: "Can I track parts costs per job?", answer: "Yes. Log parts via the AI receipt scanner or manual entry. Each expense is linked to the job so you know your true cost per call." },
      { question: "Does DayRoute support both plumbers and hot water specialists?", answer: "Yes. DayRoute works for any trade that visits multiple job sites per day. You can set up custom service types for different kinds of hot water work." },
    ],
    testimonial: { quote: "I handle both planned services and emergency callouts across Perth. DayRoute helps me fit everything in without running late to anyone.", name: "Steve", role: "Hot Water Specialist", location: "Perth" },
    relatedLinks: [
      { label: "All features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Handyman app", href: "/handyman-job-management-route-invoicing-app-australia" },
      { label: "Pressure washing app", href: "/pressure-washing-business-route-invoicing-app-australia" },
    ],
  },

  {
    pageType: "category",
    slug: "gardening-business-scheduling-invoicing-app-australia",
    seoTitle: "Gardening Business Scheduling & Invoicing App Australia",
    metaDescription:
      "DayRoute helps Australian gardeners and landscapers plan daily routes, schedule clients, track expenses, and send invoices from your phone.",
    h1: "The scheduling and invoicing app built for Australian gardeners",
    shortName: "Gardening",
    intro:
      "Running a gardening or landscaping round means visiting multiple properties every day, often in a tight window. DayRoute helps you plan the fastest route between jobs, keep track of recurring clients, log your fuel and materials, and invoice on the spot — so you spend less time on admin and more time in the garden.",
    painPoints: [
      { title: "Driving between jobs wastes hours every week", description: "Without route planning, you end up criss-crossing suburbs and sitting in traffic. That burns fuel and cuts into paid work time." },
      { title: "Keeping track of recurring clients is a headache", description: "Fortnightly mows, monthly hedges, seasonal clean-ups — it's easy to forget who's due when if you're relying on memory or a paper diary." },
      { title: "Invoicing gets pushed to the weekend", description: "After a full day of physical work, the last thing you want to do is sit down and type up invoices. Receipts pile up and payments come in late." },
    ],
    featureHighlights: [
      { title: "Multi-stop route optimisation", description: "Drop in your jobs for the day and DayRoute calculates the fastest order. Cut driving time, save fuel, and fit in an extra job." },
      { title: "Recurring job scheduling", description: "Set up weekly, fortnightly, or monthly bookings for each client. DayRoute auto-generates the jobs so you never miss a visit." },
      { title: "On-the-spot invoicing", description: "Create and send a professional invoice the moment you finish a job. Clients get it via SMS or email while you're still on site." },
      { title: "Expense and receipt tracking", description: "Snap a photo of your Bunnings receipt. DayRoute's AI reads the total, GST, and merchant automatically — ready for BAS time." },
    ],
    faqs: [
      { question: "Can I set up recurring jobs for regular gardening clients?", answer: "Yes. DayRoute supports weekly, fortnightly, and monthly recurring bookings. Once set up, jobs are auto-generated on your schedule so you never forget a client." },
      { question: "Does DayRoute work for landscaping businesses with a small team?", answer: "Absolutely. The Team plan supports up to 10 users with shared scheduling, location sharing, and role-based permissions — ideal for a landscaping crew." },
      { question: "Can I track fuel and materials expenses for my gardening business?", answer: "Yes. Snap receipts with the AI scanner to log fuel, soil, mulch, plants, and any other expenses. Everything is categorised and GST-tracked for BAS reporting." },
    ],
    testimonial: { quote: "I manage 40 regular gardens across three suburbs. DayRoute cut my driving by 45 minutes a day — that's an extra client I can fit in each week.", name: "James", role: "Gardener & Landscaper", location: "Brisbane" },
    relatedLinks: [
      { label: "All features", href: "/features" },
      { label: "Best route planner for gardeners", href: "/best-route-planner-gardeners-australia" },
      { label: "DayRoute vs spreadsheet", href: "/dayroute-vs-spreadsheet" },
      { label: "Cleaning business app", href: "/cleaning-business-scheduling-invoicing-app-australia" },
      { label: "Compare options", href: "/compare" },
    ],
  },

  {
    pageType: "category",
    slug: "cleaning-business-scheduling-invoicing-app-australia",
    seoTitle: "Cleaning Business Scheduling & Invoicing App Australia",
    metaDescription:
      "DayRoute is the scheduling and invoicing app for Australian cleaners. Plan daily routes, manage clients, track expenses, and get paid faster.",
    h1: "Run your cleaning business from your phone",
    shortName: "Cleaning",
    intro:
      "Whether you clean homes, offices, or holiday rentals, your day is a series of back-to-back appointments across town. DayRoute keeps your schedule tight, your routes efficient, and your invoices sent before you leave the driveway. Built for solo cleaners and small cleaning teams across Australia.",
    painPoints: [
      { title: "Clients get anxious when you're late", description: "Arriving late — or without warning — frustrates clients and damages trust. You need accurate ETAs and a way to let people know you're on the way." },
      { title: "Juggling keys, codes, and client preferences", description: "Every home has different entry instructions, preferred products, and special requests. Keeping that info in your head doesn't scale." },
      { title: "Chasing payments wastes your evenings", description: "If you wait until the end of the week to invoice, clients forget and you spend nights following up. Sending invoices on the spot gets you paid faster." },
    ],
    featureHighlights: [
      { title: "Optimised cleaning routes", description: "Enter your appointments and DayRoute orders them by distance and time. Less windshield time, more houses cleaned per day." },
      { title: "Client notes and access details", description: "Store lock codes, alarm instructions, pet info, and product preferences against each client. Available at a glance before you walk in." },
      { title: "'On My Way' ETA messages", description: "Send a one-tap SMS or iMessage to your next client with your estimated arrival time. No more 'where are you?' calls." },
      { title: "Instant invoicing after each clean", description: "Tap 'Complete', review the job details, and send a professional invoice immediately. Supports hourly or fixed-price billing." },
    ],
    faqs: [
      { question: "Can I send my clients an ETA before I arrive?", answer: "Yes. DayRoute has a one-tap 'On My Way' feature that sends an SMS or iMessage with your estimated arrival time based on live traffic." },
      { question: "Does DayRoute handle both hourly and flat-rate cleaning jobs?", answer: "Yes. You can set each client to hourly or fixed pricing. DayRoute calculates the amount automatically when you complete the job." },
      { question: "Can I store entry codes and client preferences?", answer: "Absolutely. Each client profile has a notes field where you can store lock codes, alarm PINs, pet details, and cleaning preferences." },
    ],
    testimonial: { quote: "My clients love knowing exactly when I'll arrive. The route planning saves me 30 minutes every day — and I get paid the same afternoon.", name: "Sarah", role: "Cleaning Business Owner", location: "Sydney" },
    relatedLinks: [
      { label: "All features", href: "/features" },
      { label: "Best scheduling app for cleaners", href: "/best-job-scheduling-app-cleaners-australia" },
      { label: "DayRoute vs paper diary", href: "/dayroute-vs-paper-diary" },
      { label: "Gardening business app", href: "/gardening-business-scheduling-invoicing-app-australia" },
      { label: "Compare options", href: "/compare" },
    ],
  },

  {
    pageType: "category",
    slug: "handyman-job-management-route-invoicing-app-australia",
    seoTitle: "Handyman Job Management, Route & Invoicing App Australia",
    metaDescription:
      "DayRoute is the job management app for Australian handymen. Schedule jobs, plan routes, snap receipts, and invoice clients on the spot.",
    h1: "Job management and invoicing for Australian handymen",
    shortName: "Handyman",
    intro:
      "A typical handyman day might include a tap repair in Parramatta, a fence fix in Castle Hill, and a door hang in Penrith — all before 3 pm school pick-up. DayRoute helps you fit it all in by planning the fastest route, storing job details and photos, and getting invoices sent before you leave the driveway.",
    painPoints: [
      { title: "Every job is different, in a different suburb", description: "Unlike trades with regular sites, handymen jump between one-off jobs all over town. Without a route plan, you waste time and fuel driving back and forth." },
      { title: "Quoting and invoicing on paper is slow", description: "Scribbling quotes on the back of a business card doesn't look professional. And chasing handwritten invoices is a nightmare come tax time." },
      { title: "Tracking materials and receipts is messy", description: "A trip to Bunnings for every job means a wallet full of receipts. Losing even one means paying more tax than you should." },
    ],
    featureHighlights: [
      { title: "Smart route planning between job sites", description: "Enter your jobs and let DayRoute order them by distance. One tap opens navigation in Google Maps or Apple Maps." },
      { title: "Before & after job photos", description: "Snap before-and-after photos for each job. Great for client records, disputes, and showing off your work on social media." },
      { title: "AI receipt scanner", description: "Point your camera at a receipt from Bunnings, Mitre 10, or any supplier. DayRoute reads the total, GST, and items automatically." },
      { title: "Professional invoices in seconds", description: "Create an invoice from the completed job with one tap. Line items, GST, and client details are pre-filled. Send via SMS or email." },
    ],
    faqs: [
      { question: "Can I take before-and-after photos of handyman jobs?", answer: "Yes. DayRoute lets you attach before and after photos to each job. They're stored with the job record and can be included in invoices or reports." },
      { question: "Does the receipt scanner work with Bunnings and Mitre 10 receipts?", answer: "Yes. The AI scanner reads receipts from any Australian retailer — Bunnings, Mitre 10, Total Tools, and more. It extracts the merchant, items, GST, and total automatically." },
      { question: "Can I manage one-off jobs and regular maintenance clients?", answer: "Absolutely. DayRoute handles both one-off jobs and recurring bookings. Set up weekly or monthly visits for regular clients, and add one-off callouts on any day." },
    ],
    testimonial: { quote: "I used to waste an hour a day driving back and forth across Sydney. Now I finish by 3 and actually pick the kids up on time.", name: "Dave", role: "Handyman", location: "Sydney" },
    relatedLinks: [
      { label: "All features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Pressure washing app", href: "/pressure-washing-business-route-invoicing-app-australia" },
      { label: "Pest control app", href: "/pest-control-job-scheduling-route-app-australia" },
      { label: "Blog: ATO logbook guide", href: "/blog/ato-vehicle-logbook-requirements-for-tradies-2026" },
    ],
  },

  {
    pageType: "category",
    slug: "pressure-washing-business-route-invoicing-app-australia",
    seoTitle: "Pressure Washing Business Route & Invoicing App Australia",
    metaDescription:
      "DayRoute helps Australian pressure washing businesses plan routes, schedule jobs, track equipment costs, and invoice clients on the spot. Try free for 7 days.",
    h1: "Route planning and invoicing for pressure washing businesses",
    shortName: "Pressure Washing",
    intro:
      "Pressure washing is a high-volume, location-heavy trade — you might hit five driveways, two decks, and a commercial frontage in a single day. DayRoute keeps your schedule locked in, your routes efficient, and your invoices sent while the concrete is still drying. Built for solo pressure washers and small crews across Australia.",
    painPoints: [
      { title: "Jobs are spread across wide areas", description: "Driveways and decks don't cluster neatly. Without route optimisation you'll drive past jobs you could've grouped together." },
      { title: "Equipment and chemical costs add up fast", description: "Detergents, surface cleaners, tip replacements, fuel — it's a lot of expenses to track. Missing a receipt means overpaying on tax." },
      { title: "Seasonal demand makes scheduling unpredictable", description: "Spring and pre-sale clean-ups flood your calendar. Without a system you double-book, forget quotes, and lose work to competitors." },
    ],
    featureHighlights: [
      { title: "Multi-stop route optimisation", description: "Plot all your jobs on the map and let DayRoute find the fastest order. Spend more time washing and less time driving." },
      { title: "Job-specific notes and photos", description: "Record surface type, pressure settings, chemicals used, and before-and-after photos for every job. Handy for repeat visits and disputes." },
      { title: "Expense tracking with AI receipt scanner", description: "Snap receipts for chemicals, fuel, and equipment. The AI extracts merchant, total, and GST — sorted and ready for BAS." },
      { title: "Send invoices before you leave the site", description: "Complete the job, tap invoice, and send. Fixed-price or hourly — DayRoute handles both. Clients pay faster when invoices arrive immediately." },
    ],
    faqs: [
      { question: "Can I record before-and-after photos for pressure washing jobs?", answer: "Yes. DayRoute supports before and after photos on every job. They're great for showing clients the result and for marketing your business on social media." },
      { question: "Does DayRoute track chemical and equipment expenses?", answer: "Yes. Use the AI receipt scanner or manual entry to log chemicals, tips, hoses, fuel, and any other costs. Everything is categorised and GST-tracked." },
      { question: "Can I handle seasonal surges in bookings?", answer: "Absolutely. DayRoute's scheduling handles any volume. Set up recurring clients for regular washes and add one-off jobs as they come in." },
    ],
    testimonial: { quote: "I do 6-8 driveways a day across the Gold Coast. DayRoute shaved 40 minutes off my drive time and my invoices go out before I pack up the trailer.", name: "Mick", role: "Pressure Washing Business Owner", location: "Gold Coast" },
    relatedLinks: [
      { label: "All features", href: "/features" },
      { label: "Best app for pressure washing", href: "/best-app-pressure-washing-businesses-australia" },
      { label: "DayRoute vs spreadsheet", href: "/dayroute-vs-spreadsheet" },
      { label: "Handyman app", href: "/handyman-job-management-route-invoicing-app-australia" },
      { label: "Compare options", href: "/compare" },
    ],
  },

  {
    pageType: "category",
    slug: "pest-control-job-scheduling-route-app-australia",
    seoTitle: "Pest Control Job Scheduling & Route App Australia",
    metaDescription:
      "DayRoute helps Australian pest control techs schedule inspections, plan routes, track chemicals, and invoice clients from your phone.",
    h1: "Job scheduling and route planning for pest control technicians",
    shortName: "Pest Control",
    intro:
      "Pest control means balancing regular inspections with emergency callouts — cockroaches don't wait for your calendar. DayRoute helps you plan efficient routes between appointments, record treatments and chemicals per property, and invoice on completion. Built for solo pest techs and small teams across Australia.",
    painPoints: [
      { title: "Emergency callouts break your planned schedule", description: "A termite sighting means dropping everything. Without a flexible scheduling tool, the rest of your day falls apart." },
      { title: "Recording treatments per property is a compliance requirement", description: "Regulators and commercial clients need records of what was applied, when, and where. Paper logbooks get lost in the van." },
      { title: "Driving between inspections burns profit", description: "Residential pest jobs are short — 30 to 45 minutes. If you drive 40 minutes between them, you're losing money on every trip." },
    ],
    featureHighlights: [
      { title: "Flexible scheduling with route re-optimisation", description: "Slot in an emergency callout and DayRoute re-calculates your route. The rest of your day adjusts automatically." },
      { title: "Job notes for treatment records", description: "Record chemicals used, bait station locations, and treatment areas per property. Notes carry over to repeat visits." },
      { title: "Vehicle logbook for tax", description: "GPS trip recording logs every kilometre driven. Distinguish business and personal trips for ATO-compliant records." },
      { title: "Instant invoicing with line items", description: "Invoice for inspection fees, treatment costs, and follow-up visits — all itemised with GST. Send via SMS or email immediately." },
    ],
    faqs: [
      { question: "Can I record which chemicals I used at each property?", answer: "Yes. Use the job notes field to record chemical names, application rates, and bait station locations. Notes are saved per job and carry over to repeat visits." },
      { question: "Does DayRoute handle emergency pest callouts?", answer: "Yes. Add an urgent job at any time and DayRoute re-optimises your route for the rest of the day. You won't miss existing appointments." },
      { question: "Can I track kilometres for tax deductions?", answer: "Absolutely. The GPS vehicle logbook records every trip with start/end odometer, distance, and purpose. Export the data for your accountant or BAS return." },
    ],
    testimonial: { quote: "When you're dealing with pests, timing matters. DayRoute lets me slot in emergency jobs without blowing up the rest of my schedule.", name: "Dave", role: "Pest Control Technician", location: "Newcastle" },
    relatedLinks: [
      { label: "All features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Handyman app", href: "/handyman-job-management-route-invoicing-app-australia" },
      { label: "NDIS support worker app", href: "/ndis-support-worker-route-planner-invoicing-app-australia" },
    ],
  },

  {
    pageType: "category",
    slug: "mobile-detailing-route-invoicing-app-australia",
    seoTitle: "Mobile Detailing Route & Invoicing App Australia",
    metaDescription:
      "DayRoute is the route planning and invoicing app for Australian mobile car detailers. Schedule appointments, plan efficient routes, and invoice on the spot.",
    h1: "Route planning and invoicing for mobile car detailers",
    shortName: "Mobile Detailing",
    intro:
      "Mobile detailing is all about fitting as many cars into your day as possible without burning half your time on the road. DayRoute helps you plan tight routes between bookings, manage client details and vehicle info, track product costs, and send invoices before you pack up your gear. Built for solo detailers and small mobile detailing teams.",
    painPoints: [
      { title: "Appointments are scattered across the city", description: "A morning detail in the CBD, a lunchtime SUV in the eastern suburbs, an afternoon fleet job in the west. Without a route plan, you spend as much time driving as detailing." },
      { title: "Keeping track of vehicle details and client preferences", description: "Some clients want a basic wash, others want a full ceramic coat. Remembering who wants what — and which car — gets messy fast." },
      { title: "Product costs eat into margins if you don't track them", description: "Ceramic coatings, polishing compounds, microfibre cloths — they're not cheap. If you're not tracking expenses properly, you're probably under-pricing jobs." },
    ],
    featureHighlights: [
      { title: "Route optimisation for mobile detailing", description: "Enter your appointments and DayRoute calculates the fastest route. Less driving means more cars detailed per day." },
      { title: "Client and vehicle profiles", description: "Store client names, addresses, vehicle make/model, and service preferences. Everything's at your fingertips before each job." },
      { title: "Product expense tracking", description: "Log product costs per job. Snap receipts and let the AI scanner extract GST and totals. Know your true cost per detail." },
      { title: "Professional invoicing from your phone", description: "Send a polished invoice via SMS or email the second you finish. Supports fixed-price packages and hourly rates." },
    ],
    faqs: [
      { question: "Can I store vehicle details for each client?", answer: "Yes. Each client profile in DayRoute includes a notes field where you can store vehicle make, model, colour, and any specific detailing preferences." },
      { question: "Does DayRoute support fixed-price detailing packages?", answer: "Yes. Set up fixed prices per client or per service type. When you complete the job, the invoice is pre-filled with the agreed amount." },
      { question: "Can I track how much I spend on detailing products?", answer: "Absolutely. Log expenses by category (products, fuel, equipment) and snap receipts with the AI scanner. GST is tracked automatically for BAS time." },
    ],
    testimonial: { quote: "I detail 5-6 cars a day across Melbourne. DayRoute saves me 30+ minutes of driving and my invoices go out before I leave the client's driveway.", name: "Chris", role: "Mobile Detailer", location: "Melbourne" },
    relatedLinks: [
      { label: "All features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Pressure washing app", href: "/pressure-washing-business-route-invoicing-app-australia" },
      { label: "Cleaning business app", href: "/cleaning-business-scheduling-invoicing-app-australia" },
    ],
  },

  {
    pageType: "category",
    slug: "ndis-support-worker-route-planner-invoicing-app-australia",
    seoTitle: "NDIS Support Worker Route Planner & Invoicing App Australia",
    metaDescription:
      "DayRoute helps NDIS support workers plan participant visit routes, track travel for reimbursement, and create NDIS-compatible invoices.",
    h1: "Route planning and invoicing for NDIS support workers",
    shortName: "NDIS Support",
    intro:
      "NDIS support workers and sole-trader providers visit multiple participants each day — often across wide service areas. Reliable arrival times matter because participants plan their entire day around your visit. DayRoute helps you plan efficient routes, record travel for reimbursement, and create invoices that align with NDIS line items. Built for Australian disability support professionals.",
    painPoints: [
      { title: "Participants need reliable arrival times", description: "Being late disrupts a participant's routine and can cause real distress. Accurate ETAs and 'on my way' notifications build trust and reduce anxiety." },
      { title: "Travel time and kilometres need to be recorded for claims", description: "NDIS travel claims require accurate records. Estimating from memory or Google Maps after the fact is inaccurate and time-consuming." },
      { title: "Invoicing to plan managers and NDIA requires specific formats", description: "NDIS invoices need line item numbers, correct support categories, and participant references. Generic invoice tools don't support this." },
    ],
    featureHighlights: [
      { title: "Participant visit route planning", description: "Enter your participant visits and DayRoute optimises the order. See accurate drive times between visits and plan realistic schedules." },
      { title: "GPS travel logging for reimbursement", description: "The vehicle logbook records every trip with start/end locations, distance, and time. Export for NDIS travel claims." },
      { title: "'On My Way' arrival notifications", description: "Send a one-tap message to participants (or their carers) with your estimated arrival time. Reduces no-answer doors and anxiety." },
      { title: "NDIS-compatible invoice templates", description: "Create invoices with NDIS support item numbers, participant details, and plan manager info. Send directly via email or SMS." },
    ],
    faqs: [
      { question: "Does DayRoute support NDIS line item numbers on invoices?", answer: "Yes. DayRoute's invoice templates include fields for NDIS support item numbers, participant references, and plan manager details — making it easy to submit compliant invoices." },
      { question: "Can I record travel time and kilometres for NDIS travel claims?", answer: "Absolutely. The GPS vehicle logbook tracks every trip automatically. Export the data for travel reimbursement claims with distance, time, and purpose." },
      { question: "Is DayRoute suitable for NDIS sole traders and small providers?", answer: "Yes. The Pro plan is ideal for sole-trader support workers. For organisations with multiple support workers, the Team plan supports up to 10 users with shared scheduling." },
      { question: "Can I send arrival notifications to participants or carers?", answer: "Yes. The 'On My Way' feature sends an SMS or iMessage with your ETA to the participant's phone number — or their carer's — with a single tap." },
    ],
    testimonial: { quote: "Accurate arrival times make a real difference for our participants. They can plan their day around our visits instead of waiting by the window.", name: "Emma", role: "NDIS Support Coordinator", location: "Perth" },
    relatedLinks: [
      { label: "All features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Cleaning business app", href: "/cleaning-business-scheduling-invoicing-app-australia" },
      { label: "Gardening business app", href: "/gardening-business-scheduling-invoicing-app-australia" },
      { label: "Blog: NDIS travel claims guide", href: "/blog/ndis-travel-claims-what-support-workers-can-claim" },
    ],
  },

  // ===========================================================================
  // FEATURE PAGES (problem / workflow)
  // ===========================================================================

  {
    pageType: "feature",
    slug: "route-planning-for-service-businesses-australia",
    seoTitle: "Route Planning for Service Businesses in Australia",
    metaDescription:
      "Plan efficient multi-stop routes for your service business. DayRoute optimises job order, shows ETAs, and integrates with Google Maps. Try free for 7 days.",
    h1: "Multi-stop route planning built for Australian service businesses",
    shortName: "Route Planning",
    breadcrumbParent: { label: "Features", href: "/features" },
    intro:
      "If you visit multiple job sites each day — whether you're mowing lawns, fixing taps, or providing in-home care — driving between them in the wrong order burns fuel, wastes time, and pushes your last job into the evening. DayRoute takes your daily job list and calculates the fastest route using Google Maps, so you spend more time working and less time behind the wheel.",
    problem: {
      heading: "Why most service businesses waste time on the road",
      description: "Without a route planner, field workers typically visit jobs in the order they were booked — not the order that makes geographic sense. The result is avoidable backtracking, missed appointment windows, and higher fuel costs.",
      bullets: [
        "Criss-crossing suburbs to reach jobs booked in random order",
        "No visibility on drive times between stops until you're already late",
        "Manually checking Google Maps for each address, one at a time",
        "Fuel costs climbing because routes aren't optimised for distance",
        "Clients frustrated by vague arrival windows or late arrivals",
      ],
    },
    solution: {
      heading: "How DayRoute plans your route in seconds",
      description: "Enter your jobs for the day — or sync them from your calendar — and DayRoute calculates the most efficient order. You see drive times, ETAs, and a visual route on the map before you leave home.",
      steps: [
        { title: "Add your jobs", description: "Enter client addresses manually or import from your phone calendar. Each job includes time, duration, and notes." },
        { title: "Tap 'Optimise Route'", description: "DayRoute uses Google Maps to find the fastest order. It considers real distances and typical drive times between stops." },
        { title: "See ETAs at a glance", description: "Every job card shows your estimated arrival time. If a client asks 'what time will you be here?', you've got the answer instantly." },
        { title: "Navigate with one tap", description: "Tap any job to open turn-by-turn navigation in Google Maps or Apple Maps. No copy-pasting addresses." },
      ],
    },
    industryExamples: [
      { industry: "Gardening & landscaping", example: "Plan rounds of 8-12 gardens across two suburbs without doubling back." },
      { industry: "Cleaning", example: "Sequence 5-6 house cleans by proximity and send 'On My Way' ETAs to each client." },
      { industry: "Trades / handyman", example: "Fit in a last-minute callout without blowing up the rest of your schedule." },
      { industry: "Pest control", example: "Balance regular inspections with emergency jobs — DayRoute re-optimises on the fly." },
      { industry: "NDIS / home support", example: "Plan participant visits so arrival times are reliable and travel is claimable." },
      { industry: "Mobile detailing", example: "Detail 5-6 cars across the city with the shortest drive between each." },
    ],
    faqs: [
      { question: "Does DayRoute use Google Maps for route optimisation?", answer: "Yes. DayRoute uses Google Maps data for distance calculations and provides one-tap navigation via Google Maps or Apple Maps." },
      { question: "Can I add or remove jobs mid-day and re-optimise?", answer: "Yes. Add a new job or remove a cancellation at any time. Tap 'Optimise' again and DayRoute recalculates the best order for your remaining stops." },
      { question: "How many stops can I plan in one route?", answer: "DayRoute supports a full day of jobs — there's no hard stop limit. Most field workers plan between 5 and 15 stops per day." },
      { question: "Does it work in regional Australia, not just cities?", answer: "Yes. Anywhere Google Maps has road data, DayRoute can plan a route. It works in metro, suburban, and regional areas across Australia." },
    ],
    relatedLinks: [
      { label: "All features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Mobile invoicing", href: "/mobile-invoicing-after-job-completion-iphone" },
      { label: "Mileage logbook & receipts", href: "/mileage-logbook-receipts-for-service-businesses-australia" },
      { label: "Gardening app", href: "/gardening-business-scheduling-invoicing-app-australia" },
      { label: "Cleaning app", href: "/cleaning-business-scheduling-invoicing-app-australia" },
    ],
  },

  {
    pageType: "feature",
    slug: "mobile-invoicing-after-job-completion-iphone",
    seoTitle: "Mobile Invoicing After Job Completion on iPhone",
    metaDescription:
      "Create and send professional invoices from your iPhone the moment you finish a job. DayRoute pre-fills details, calculates GST, and sends via SMS.",
    h1: "Send invoices from your iPhone the moment you finish a job",
    shortName: "Mobile Invoicing",
    breadcrumbParent: { label: "Features", href: "/features" },
    intro:
      "The fastest way to get paid is to invoice while you're still on site. DayRoute lets you create a professional invoice on your iPhone in under 30 seconds — client details, line items, and GST are pre-filled from the job. Send via SMS, email, or WhatsApp before you pack up your tools.",
    problem: {
      heading: "Why invoicing at the end of the week costs you money",
      description: "Most field workers batch their invoicing to Sunday night or hand-write them at the kitchen table. The delay means slower payments, forgotten jobs, and inaccurate totals.",
      bullets: [
        "Forgetting to invoice small jobs because they slip through the cracks",
        "Clients disputing amounts weeks after the work was done",
        "Spending Sunday evenings doing admin instead of resting",
        "Handwritten invoices that look unprofessional and lack GST detail",
        "No record of what was invoiced vs. what was paid",
      ],
    },
    solution: {
      heading: "How DayRoute makes invoicing instant",
      description: "When you mark a job as complete, DayRoute offers to create an invoice with one tap. Everything is pre-filled — you just review and send.",
      steps: [
        { title: "Complete the job", description: "Mark the job as done. DayRoute records the duration, any extra charges, and completion notes." },
        { title: "Tap 'Create Invoice'", description: "An invoice is generated with the client's name, address, service description, line items, and GST — all pre-filled from the job details." },
        { title: "Review and send", description: "Make any adjustments (discounts, extra charges, notes), then send via SMS, email, or WhatsApp. The client receives a professional PDF." },
        { title: "Track payment status", description: "DayRoute tracks whether each invoice is draft, sent, paid, or overdue. You always know who owes you money." },
      ],
    },
    industryExamples: [
      { industry: "Trades / handyman", example: "Invoice for a tap repair while still at the client's house. Include parts from Bunnings as a line item." },
      { industry: "Cleaning", example: "Send a fixed-price invoice after each clean. Regular clients get the same amount every visit." },
      { industry: "Gardening", example: "Invoice for mowing + hedge trimming with separate line items and GST breakdown." },
      { industry: "NDIS / home support", example: "Create invoices with NDIS support item numbers and participant references for plan managers." },
      { industry: "Pressure washing", example: "Invoice for driveway + deck with before-and-after photos attached as proof of work." },
      { industry: "Mobile detailing", example: "Send a polished invoice for a full detail package before you drive to the next car." },
    ],
    faqs: [
      { question: "Can I include GST on invoices?", answer: "Yes. DayRoute calculates GST automatically. You can set whether your prices are GST-inclusive or exclusive, and the invoice shows the GST amount separately." },
      { question: "Can I send invoices via SMS or WhatsApp?", answer: "Yes. DayRoute generates a professional PDF invoice that you can send via SMS, email, or WhatsApp — whichever your client prefers." },
      { question: "Does DayRoute track which invoices have been paid?", answer: "Yes. Each invoice has a status: draft, sent, paid, or overdue. You can see all outstanding invoices at a glance from the invoices screen." },
      { question: "Can I customise the invoice template with my business details?", answer: "Yes. Add your business name, ABN, logo, phone number, and bank details in settings. They appear on every invoice you send." },
    ],
    relatedLinks: [
      { label: "All features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Before & after photos", href: "/before-after-photos-for-service-jobs" },
      { label: "Route planning", href: "/route-planning-for-service-businesses-australia" },
      { label: "Handyman app", href: "/handyman-job-management-route-invoicing-app-australia" },
    ],
  },

  {
    pageType: "feature",
    slug: "before-after-photos-for-service-jobs",
    seoTitle: "Before & After Photos for Service Jobs",
    metaDescription:
      "Capture before-and-after photos for every job with DayRoute. Attach to job records and invoices as proof of work. For tradies, cleaners, and field pros.",
    h1: "Before-and-after photos that prove your work — attached to every job",
    shortName: "Before & After Photos",
    breadcrumbParent: { label: "Features", href: "/features" },
    intro:
      "A picture is worth a thousand words — especially when a client disputes the quality of your work or when you want to show off a transformation on social media. DayRoute lets you snap before-and-after photos for every job, automatically attached to the job record. Use them for proof of work, client communication, or marketing.",
    problem: {
      heading: "Why you need photo proof for every job",
      description: "Disputes happen. Clients forget what state things were in before you arrived. Without timestamped photo evidence, it's your word against theirs.",
      bullets: [
        "Clients claim the work wasn't done properly — you have no proof",
        "Insurance or warranty claims need visual evidence",
        "Marketing your business on social media requires good before/after shots",
        "Photos stored in your camera roll get mixed in with personal pictures",
        "No way to link a photo back to the specific job and client",
      ],
    },
    solution: {
      heading: "How DayRoute handles job photos",
      description: "Take before-and-after photos directly from the job screen. They're timestamped, tagged to the job, and stored with the client record.",
      steps: [
        { title: "Snap a 'before' photo on arrival", description: "Open the job, tap the camera icon, and take a photo. It's automatically tagged as a 'before' shot with a timestamp." },
        { title: "Complete the work", description: "Do your job as normal. Notes, time tracking, and materials are all recorded on the same job card." },
        { title: "Snap an 'after' photo before you leave", description: "Take the 'after' shot from the same angle. DayRoute stores both photos side by side on the job record." },
        { title: "Attach to invoices or share with clients", description: "Include photos as proof of work when sending invoices, or share them directly with the client for peace of mind." },
      ],
    },
    industryExamples: [
      { industry: "Pressure washing", example: "Show the driveway transformation — grey and mossy before, bright and clean after." },
      { industry: "Cleaning", example: "Document the state of a rental property at check-in and check-out for bond disputes." },
      { industry: "Gardening", example: "Photograph an overgrown garden before and a neat, trimmed result after." },
      { industry: "Trades / handyman", example: "Record a damaged fence before repair and the finished fix — useful if the client questions the charge." },
      { industry: "NDIS / home support", example: "Document home modifications or setup tasks with visual records for reporting." },
      { industry: "Pest control", example: "Photograph termite damage and bait station placement for compliance records." },
    ],
    faqs: [
      { question: "Are photos stored on my phone or in the cloud?", answer: "Photos are stored locally on your device and synced to your DayRoute account. They stay attached to the job record so you can access them later." },
      { question: "Can I attach photos to invoices?", answer: "Yes. When creating an invoice from a completed job, you can include before-and-after photos as proof of work." },
      { question: "Are photos timestamped?", answer: "Yes. Each photo is automatically timestamped with the date and time it was taken, providing a verifiable record." },
      { question: "Can I use photos for marketing on social media?", answer: "Absolutely. The photos are saved to your device and can be shared to Instagram, Facebook, or any platform to showcase your work." },
    ],
    relatedLinks: [
      { label: "All features", href: "/features" },
      { label: "Mobile invoicing", href: "/mobile-invoicing-after-job-completion-iphone" },
      { label: "Pressure washing app", href: "/pressure-washing-business-route-invoicing-app-australia" },
      { label: "Cleaning app", href: "/cleaning-business-scheduling-invoicing-app-australia" },
    ],
  },

  {
    pageType: "feature",
    slug: "mileage-logbook-receipts-for-service-businesses-australia",
    seoTitle: "Mileage Logbook & Receipts for Service Businesses in Australia",
    metaDescription:
      "Track work kilometres, scan receipts with AI, and export BAS-ready reports. DayRoute is the mileage logbook and expense tracker for Aussie service businesses.",
    h1: "Mileage logbook, receipt scanner, and BAS reporting — all in one app",
    shortName: "Logbook & Receipts",
    breadcrumbParent: { label: "Features", href: "/features" },
    intro:
      "The ATO expects you to keep accurate records of business kilometres and expenses. Most tradies and field workers know this — but doing it consistently is another story. DayRoute records your trips with GPS, scans your receipts with AI, and generates BAS-ready expense summaries. No more shoeboxes of receipts at tax time.",
    problem: {
      heading: "Why tax time is painful for field workers",
      description: "The ATO requires business vehicle logs and expense records. Without a system, you either estimate (and risk an audit) or spend hours reconstructing records from memory.",
      bullets: [
        "Forgetting to record trips and guessing at BAS time",
        "Receipts fading, getting lost, or piling up in the glovebox",
        "Not knowing which trips were business vs. personal",
        "Spending hours manually entering expenses into spreadsheets",
        "Missing legitimate deductions because you lost the receipt",
      ],
    },
    solution: {
      heading: "How DayRoute simplifies logbook and expenses",
      description: "Start a trip and DayRoute logs the kilometres via GPS. Snap a receipt and the AI extracts the details. At BAS time, export a clean summary.",
      steps: [
        { title: "Start a trip with one tap", description: "Tap 'Start Trip' and DayRoute records your start location and odometer. GPS runs only while you're tracking — never in the background without permission." },
        { title: "Snap receipts as you go", description: "Point your camera at a receipt. The AI (powered by Google Gemini) reads the merchant, date, items, GST, and total — no manual typing." },
        { title: "Categorise automatically", description: "Expenses are auto-categorised (fuel, materials, tools, etc.) and tagged with GST amounts. Review and adjust if needed." },
        { title: "Export BAS-ready reports", description: "When BAS quarter ends, export an income vs. expense summary with GST totals. Hand it to your accountant or lodge it yourself." },
      ],
    },
    industryExamples: [
      { industry: "Trades / handyman", example: "Log every trip between job sites and scan Bunnings receipts for materials." },
      { industry: "Gardening", example: "Track kilometres across your weekly garden rounds and log fuel, soil, and plant purchases." },
      { industry: "Cleaning", example: "Record mileage for your daily cleaning route and scan receipts for cleaning supplies." },
      { industry: "Pest control", example: "Log inspection trips and track chemical purchases per property for compliance and tax." },
      { industry: "NDIS / home support", example: "Record travel between participant visits for NDIS travel reimbursement claims." },
      { industry: "HVAC", example: "Track trips to commercial sites and log parts, refrigerant, and tool purchases." },
    ],
    faqs: [
      { question: "Is the logbook ATO-compliant?", answer: "DayRoute records start/end locations, odometer readings, distance, and purpose (business or personal) for each trip — the key fields the ATO requires for a vehicle logbook." },
      { question: "Does the receipt scanner work with faded or crumpled receipts?", answer: "The AI scanner handles most receipt conditions well. For very damaged receipts, you can manually enter the details. The photo is still stored as proof." },
      { question: "Can I export expense data for my accountant?", answer: "Yes. DayRoute generates quarterly and annual summaries with income, expenses, and GST totals. You can share the report directly with your accountant." },
      { question: "Does GPS tracking drain my battery?", answer: "GPS runs only when you actively start a trip. It stops when you end the trip. DayRoute never tracks your location in the background without permission." },
    ],
    relatedLinks: [
      { label: "All features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Route planning", href: "/route-planning-for-service-businesses-australia" },
      { label: "Mobile invoicing", href: "/mobile-invoicing-after-job-completion-iphone" },
      { label: "Handyman app", href: "/handyman-job-management-route-invoicing-app-australia" },
    ],
  },

  {
    pageType: "feature",
    slug: "mobile-field-service-app-vs-desktop-accounting-software",
    seoTitle: "Mobile Field Service App vs Desktop Accounting Software",
    metaDescription:
      "DayRoute is a mobile-first field service app for tradies who need invoicing, expenses, route planning, and job management from their phone.",
    h1: "Why desktop accounting software doesn't work in the field",
    shortName: "Mobile vs Desktop",
    breadcrumbParent: { label: "Features", href: "/features" },
    intro:
      "Traditional accounting software is powerful — but it's built for people who sit at a desk. If you spend your day in a van visiting job sites, you need something that works from your phone, in the field, with dirty hands. DayRoute is a mobile-first workflow app that handles the parts of your workday that accounting platforms weren't designed for: route planning, job scheduling, receipt scanning, and on-site invoicing.",
    problem: {
      heading: "Why desktop accounting tools don't fit field service work",
      description: "Accounting software is designed for bookkeepers and office-based businesses. Field workers need tools that work at the job site, not behind a computer screen.",
      bullets: [
        "Creating invoices on a phone through accounting apps is clunky and slow",
        "No route planning or job scheduling — you need separate apps for that",
        "Receipt entry requires manual typing or desktop scanning",
        "No vehicle logbook or GPS trip tracking built in",
        "Full accounting suites are overkill for solo operators who just need to invoice, track expenses, and plan routes",
      ],
    },
    solution: {
      heading: "What DayRoute does differently",
      description: "DayRoute isn't a replacement for your accountant's tools. It's a mobile companion that handles the fieldwork side — then your accountant can use whatever platform they prefer for the rest.",
      steps: [
        { title: "Plan your day and routes", description: "Schedule jobs, optimise your route, and see ETAs — something accounting apps simply don't do." },
        { title: "Invoice on the spot", description: "Create and send invoices from your phone in under 30 seconds. No laptop required." },
        { title: "Scan receipts with AI", description: "Point your camera at a receipt. The AI extracts merchant, items, GST, and total instantly — no manual data entry." },
        { title: "Export for your accountant", description: "At BAS time, export your income, expenses, and GST summaries. Your accountant can import the data into whatever accounting platform they use." },
      ],
    },
    industryExamples: [
      { industry: "Trades / handyman", example: "Use DayRoute for daily job management and invoicing. Export totals to your accountant at BAS time." },
      { industry: "Cleaning", example: "Track income and expenses in DayRoute daily. Hand your accountant a clean quarterly summary instead of a shoebox of receipts." },
      { industry: "Gardening", example: "Invoice clients on the spot and scan receipts. No more Sunday-night data entry into accounting software." },
      { industry: "Pest control", example: "Manage jobs, routes, and expenses in DayRoute. Let your bookkeeper handle the ledger in their accounting platform." },
      { industry: "HVAC", example: "Record parts expenses and job income on site. Export for your accountant rather than keeping loose receipts in the glovebox." },
      { industry: "NDIS / home support", example: "Create NDIS-formatted invoices on your phone. Share summaries with your plan manager or bookkeeper." },
    ],
    faqs: [
      { question: "Does DayRoute replace my accounting software?", answer: "No. DayRoute is a mobile field-service tool — not a full accounting platform. It handles the parts of your day that accounting software isn't designed for: route planning, job scheduling, on-site invoicing, and receipt scanning. Your accountant can continue using whatever accounting platform they prefer for bookkeeping and lodgement." },
      { question: "Can my accountant use DayRoute's data?", answer: "Yes. DayRoute generates income, expense, and GST summaries that your accountant can use for BAS lodgement and end-of-year tax. You can share these reports directly — they import into any accounting platform." },
      { question: "How is DayRoute different from accounting software?", answer: "Accounting software focuses on bookkeeping, tax, and compliance. DayRoute focuses on the fieldwork side: planning routes, managing jobs, invoicing on the spot, and scanning receipts. They complement each other — DayRoute handles the work, your accountant handles the books." },
      { question: "How much does DayRoute cost?", answer: "DayRoute Pro starts at $19.99 AUD/month with a 7-day free trial. It covers route planning, job scheduling, invoicing, receipt scanning, and vehicle logbook — all the tools a field worker needs in one app." },
    ],
    relatedLinks: [
      { label: "All features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Mobile invoicing", href: "/mobile-invoicing-after-job-completion-iphone" },
      { label: "Mileage logbook & receipts", href: "/mileage-logbook-receipts-for-service-businesses-australia" },
      { label: "Field service workflow app", href: "/field-service-workflow-app-for-iphone-australia" },
    ],
  },

  {
    pageType: "feature",
    slug: "field-service-workflow-app-for-iphone-australia",
    seoTitle: "Field Service Workflow App for iPhone — Australia",
    metaDescription:
      "DayRoute is the all-in-one field service workflow app for iPhone. Schedule jobs, plan routes, invoice clients, scan receipts, and track mileage.",
    h1: "The all-in-one field service workflow app for iPhone",
    shortName: "Field Service Workflow",
    breadcrumbParent: { label: "Features", href: "/features" },
    intro:
      "Most field service workers use 4-5 separate apps and tools to get through the day: a calendar for scheduling, Google Maps for navigation, a spreadsheet for expenses, a Word template for invoices, and a notebook for client details. DayRoute combines all of these into a single iPhone app designed for people who work on the road, not at a desk.",
    problem: {
      heading: "Why juggling multiple apps slows you down",
      description: "Switching between apps, re-entering data, and losing track of information across different tools is the hidden cost of not having a unified workflow.",
      bullets: [
        "Client details in one app, schedule in another, invoicing in a third",
        "Manually copying addresses from your calendar into Google Maps",
        "No single view of your entire day — jobs, route, and finances",
        "Receipts in your camera roll, expenses in a spreadsheet, logbook on paper",
        "Wasting 30-60 minutes per day on admin that could be automated",
      ],
    },
    solution: {
      heading: "One app for your entire workday",
      description: "DayRoute connects every part of your field service workflow — from the morning schedule to the last invoice — in a single app on your iPhone.",
      steps: [
        { title: "Schedule and plan", description: "Add jobs, set times, and optimise your route. See your entire day — schedule, map, and drive times — in one view." },
        { title: "Navigate and track", description: "One-tap navigation to each job. GPS mileage tracking runs automatically. Send ETA notifications to clients." },
        { title: "Complete and invoice", description: "Mark jobs done, snap before/after photos, and create invoices with pre-filled details. Send via SMS or email on the spot." },
        { title: "Scan and report", description: "Photograph receipts for AI extraction. View income vs. expense summaries and export BAS-ready reports at quarter end." },
      ],
    },
    industryExamples: [
      { industry: "Trades / handyman", example: "Schedule 6 jobs, optimise your route, invoice after each one, and scan every receipt — all before 4 pm." },
      { industry: "Cleaning", example: "Run a daily cleaning round with accurate ETAs, client notes, and instant invoicing after each house." },
      { industry: "Gardening", example: "Manage weekly rounds, recurring bookings, route optimisation, and BAS-ready expense tracking." },
      { industry: "NDIS / home support", example: "Plan participant visits, log travel for reimbursement, and create NDIS-compatible invoices." },
      { industry: "Pest control", example: "Schedule inspections, record treatments, track chemicals, and invoice — all from one screen." },
      { industry: "HVAC", example: "Manage service calls, log parts, track mileage, and send professional invoices on site." },
    ],
    faqs: [
      { question: "Does DayRoute work offline?", answer: "Yes. Your schedule, job details, and client information are stored on your device. You need internet to optimise routes and sync data, but you can view and complete jobs offline." },
      { question: "Is DayRoute only for iPhone?", answer: "Currently, yes. DayRoute is available on iPhone and iPad via the Apple App Store. Android support is on the roadmap." },
      { question: "How long does it take to set up?", answer: "Most users are up and running in under 10 minutes. Add your clients, create a few jobs, and optimise your first route. You can also import appointments from your phone calendar." },
      { question: "Can I use DayRoute with a small team?", answer: "Yes. The Team plan supports up to 10 users with shared scheduling, location sharing, job assignment, and role-based permissions." },
    ],
    relatedLinks: [
      { label: "All features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Route planning", href: "/route-planning-for-service-businesses-australia" },
      { label: "Mobile invoicing", href: "/mobile-invoicing-after-job-completion-iphone" },
      { label: "Mileage logbook & receipts", href: "/mileage-logbook-receipts-for-service-businesses-australia" },
      { label: "Mobile vs desktop accounting", href: "/mobile-field-service-app-vs-desktop-accounting-software" },
    ],
  },

  // ===========================================================================
  // BOFU — DayRoute vs alternatives
  // ===========================================================================

  {
    pageType: "feature",
    slug: "dayroute-vs-paper-diary",
    seoTitle: "DayRoute vs Paper Diary for Service Businesses",
    metaDescription:
      "Compare DayRoute to a paper diary for tradies and mobile operators. Routes, ETAs, on-site invoicing, and ATO-ready records — without Sunday-night admin.",
    h1: "Paper diary vs DayRoute: what actually costs you time",
    shortName: "vs Paper Diary",
    breadcrumbParent: { label: "Compare", href: "/compare" },
    intro:
      "A paper diary feels simple until you're juggling five suburbs, chasing payments, and rebuilding your week every Sunday night. DayRoute keeps your schedule, routes, invoices, and expenses in one iPhone app — so your day stays organised while you're on the road, not after the kids are in bed.",
    problem: {
      heading: "The hidden cost of staying on paper",
      description:
        "Paper works until your round grows. Then lost pages, missed visits, and weekend catch-up start eating into profit and family time.",
      bullets: [
        "No automatic route order — you drive back and forth across suburbs without realising it",
        "Invoices wait until the weekend, so clients forget the job and payments slip",
        "Receipts and fuel notes live in the glovebox — easy to lose before BAS time",
        "No way to send a reliable ETA when you're running late",
        "Recurring clients are easy to miss when the diary page gets smudged or torn",
      ],
    },
    solution: {
      heading: "What changes when your diary is on your phone",
      description:
        "DayRoute replaces the parts of a paper diary that break first at scale: scheduling, routing, invoicing, and record-keeping.",
      steps: [
        { title: "Plan the day in stop order", description: "Add jobs and let DayRoute suggest the fastest route. One tap opens navigation — no retyping addresses." },
        { title: "Invoice before you leave the driveway", description: "Mark a job complete and send a professional invoice via SMS or email while you're still on site." },
        { title: "Store client notes digitally", description: "Access codes, pet details, and preferences sit on the job card — not scribbled in margins." },
        { title: "Track trips and receipts as you go", description: "GPS logbook entries and AI receipt scanning build an ATO-friendly trail without a shoebox of paper." },
      ],
    },
    industryExamples: [
      { industry: "Gardening", example: "Run weekly mowing rounds with recurring bookings and optimised stop order instead of flipping diary pages." },
      { industry: "Cleaning", example: "Send 'On My Way' ETAs and invoice each house before driving to the next suburb." },
      { industry: "Handyman", example: "Jump between one-off jobs with a clear route and photos attached to each job record." },
      { industry: "Pest control", example: "Keep treatment notes and next-visit dates on the job — not lost in a notebook." },
      { industry: "NDIS / home support", example: "Log travel between participants and invoice immediately after each visit." },
      { industry: "Pressure washing", example: "Fit more driveways per day with grouped suburbs and on-site invoicing." },
    ],
    proofStrip: [
      { stat: "30–60 min", label: "Typical daily driving saved with route planning" },
      { stat: "7 days", label: "Free Pro trial — no credit card required" },
      { stat: "$19.99/mo", label: "Pro plan for solo operators (AUD)" },
    ],
    testimonial: {
      quote: "I used to spend Sunday night typing up invoices. Now they're sent before I leave each job.",
      name: "Mark",
      role: "Handyman",
      location: "Melbourne",
    },
    faqs: [
      { question: "Can I still use a notebook for quick notes?", answer: "Yes. Many operators jot on paper during a job, then capture the important details in DayRoute on the job card. The app becomes your source of truth for scheduling, routes, and money." },
      { question: "How long does it take to switch from a paper diary?", answer: "Most solo operators add their regular clients and first week's jobs in under 15 minutes. You can import calendar appointments from your iPhone too." },
      { question: "Is DayRoute hard to use with dirty or wet hands?", answer: "DayRoute is built for field use — large tap targets, quick job completion, and voice-friendly workflows. You don't need a desk to run your day." },
      { question: "Is it worth switching if I only have 10 regular clients?", answer: "Yes — even a small round benefits from route order, on-site invoicing, and digital records. As you grow, you won't need to rebuild your system later." },
    ],
    bottomCtaHeading: "Stop re-typing Sunday night invoices",
    bottomCtaSubtext: "Download DayRoute, add this week's jobs, and send your first on-site invoice today. 7-day free trial, no credit card.",
    relatedLinks: [
      { label: "Compare all options", href: "/compare" },
      { label: "DayRoute vs spreadsheet", href: "/dayroute-vs-spreadsheet" },
      { label: "Route planning", href: "/route-planning-for-service-businesses-australia" },
      { label: "Pricing", href: "/pricing" },
      { label: "Blog: Multi-stop routes", href: "/blog/how-to-plan-efficient-multi-stop-routes-for-service-businesses" },
    ],
  },

  {
    pageType: "feature",
    slug: "dayroute-vs-spreadsheet",
    seoTitle: "DayRoute vs Spreadsheet for Job Scheduling & Routes",
    metaDescription:
      "Still scheduling jobs in Excel or Google Sheets? See how DayRoute replaces spreadsheets with routes, ETAs, invoicing, and expenses on your iPhone.",
    h1: "Spreadsheets vs DayRoute for field service scheduling",
    shortName: "vs Spreadsheet",
    breadcrumbParent: { label: "Compare", href: "/compare" },
    intro:
      "Spreadsheets are flexible — but they weren't built for a day on the road. Copying addresses into Maps, chasing version conflicts, and bolting on separate apps for invoices and receipts adds 30–60 minutes of admin most days. DayRoute puts schedule, route, invoice, and expenses in one iPhone workflow.",
    problem: {
      heading: "Why spreadsheets break down in the van",
      description:
        "A spreadsheet tracks data; it doesn't run your workday. Field operators end up duct-taping Maps, email, and camera roll on top.",
      bullets: [
        "You manually copy each address into Google Maps or Apple Maps",
        "No live ETAs for clients when traffic blows out your schedule",
        "Invoices live in another tab, tool, or Word template",
        "Receipt photos pile up in your camera roll with no GST breakdown",
        "One wrong sort order on the sheet means driving past a job you could have hit earlier",
      ],
    },
    solution: {
      heading: "One app instead of five tabs",
      description:
        "DayRoute connects the parts spreadsheets can't — location, timing, and money — in a single mobile workflow.",
      steps: [
        { title: "Schedule with a real map view", description: "See jobs, drive times, and stop order together — not as rows you'll reinterpret later." },
        { title: "Navigate with one tap", description: "Open your preferred maps app from each job without copy-paste errors." },
        { title: "Invoice from the completed job", description: "Line items and GST fill in automatically. Send before you start the engine." },
        { title: "Export BAS-ready summaries", description: "Income, expenses, and GST totals export for your accountant — no re-keying spreadsheet totals." },
      ],
    },
    industryExamples: [
      { industry: "Cleaning", example: "Replace the daily sheet with optimised cleans, client access notes, and same-day invoices." },
      { industry: "Gardening", example: "Manage recurring fortnightly mows without maintaining a fragile master spreadsheet." },
      { industry: "Mobile detailing", example: "Cluster bookings by suburb and track product costs per job." },
      { industry: "HVAC", example: "Log parts and trips per service call instead of a shared workbook." },
      { industry: "Pest control", example: "Attach treatment records and photos to jobs — not separate folders." },
      { industry: "Pool service", example: "Track chemical costs and visit notes per property in one place." },
    ],
    proofStrip: [
      { stat: "1 app", label: "Schedule, route, invoice, and expenses" },
      { stat: "<10 min", label: "Typical setup for solo operators" },
      { stat: "7 days", label: "Free trial on Pro features" },
    ],
    testimonial: {
      quote: "My clients love knowing exactly when I'll arrive. The route planning saves me 30 minutes every day.",
      name: "Sarah",
      role: "Cleaning Business Owner",
      location: "Sydney",
    },
    faqs: [
      { question: "Can I export data if I want a spreadsheet for my accountant?", answer: "Yes. DayRoute produces income, expense, and GST summaries you can share. Your accountant can still use Excel or their platform — you just stop maintaining the day-to-day sheet yourself." },
      { question: "I already have client lists in Google Sheets — do I start again?", answer: "You'll re-enter active clients once (usually a few minutes per client). Many operators do it over a quiet evening rather than mid-season." },
      { question: "Does DayRoute work if my partner also schedules jobs?", answer: "The Team plan supports shared scheduling for small crews. Solo operators use Pro; growing teams can add users when needed." },
      { question: "Is a spreadsheet cheaper than DayRoute?", answer: "The sheet itself is free — your time isn't. If you spend even 30 minutes a day on admin, the cost of that time usually exceeds DayRoute Pro at $19.99 AUD/month." },
    ],
    bottomCtaHeading: "Replace your patchwork of tabs",
    bottomCtaSubtext: "Try DayRoute free for 7 days. Plan tomorrow's jobs, optimise the route, and invoice on the spot.",
    relatedLinks: [
      { label: "Compare all options", href: "/compare" },
      { label: "DayRoute vs paper diary", href: "/dayroute-vs-paper-diary" },
      { label: "Field service workflow app", href: "/field-service-workflow-app-for-iphone-australia" },
      { label: "Pricing", href: "/pricing" },
      { label: "Blog: Cleaning routes", href: "/blog/how-to-plan-a-daily-cleaning-route-that-saves-time-and-fuel" },
    ],
  },

  {
    pageType: "feature",
    slug: "dayroute-vs-servicem8-solo-operators",
    seoTitle: "DayRoute vs ServiceM8 for Solo Operators Australia",
    metaDescription:
      "Fair comparison: ServiceM8 vs DayRoute for solo tradies and mobile operators. When each fits, pricing context, and route-first iPhone workflow.",
    h1: "DayRoute vs ServiceM8: which fits a solo operator?",
    shortName: "vs ServiceM8",
    breadcrumbParent: { label: "Compare", href: "/compare" },
    intro:
      "ServiceM8 is a capable field service platform used by thousands of Australian businesses — especially teams that need job cards, quoting, and office-based workflows. DayRoute is built for a different moment: a solo operator on an iPhone who needs route planning, scheduling, invoicing, and expenses without enterprise setup. This page explains when each makes sense — honestly.",
    problem: {
      heading: "When a full FSM platform is more than you need",
      description:
        "Solo operators often adopt team-scale software and then use a fraction of it — while still lacking a route-first daily view on the phone.",
      bullets: [
        "Per-seat pricing adds up before you've hired your first employee",
        "Setup and configuration can take longer than a solo week allows",
        "Route planning and 'what's my day look like on the map' may not be the centrepiece",
        "You may still need your phone, maps, and receipts workflows alongside the platform",
        "If you're one person in a van, complexity slows you down instead of helping",
      ],
    },
    solution: {
      heading: "Where DayRoute fits solo operators",
      description:
        "DayRoute is a mobile-first day planner — not a replacement for every ServiceM8 workflow. It's the iPhone-native option when routes and same-day admin are the bottleneck.",
      steps: [
        { title: "Route-first daily planning", description: "Optimise stop order, see drive times, and navigate job to job — designed around how solo operators actually spend the day." },
        { title: "Fast on-site invoicing", description: "Complete a job and send an invoice in seconds from your phone — no office session required." },
        { title: "Simple solo pricing", description: "DayRoute Pro starts at $19.99 AUD/month with a 7-day free trial — built for one person, not a seat calculator." },
        { title: "Logbook and receipts included", description: "GPS trip tracking and AI receipt scanning support BAS-ready records without bolting on extra tools." },
      ],
    },
    industryExamples: [
      { industry: "Solo handyman", example: "Use DayRoute to run the day; export summaries for your bookkeeper at BAS time." },
      { industry: "Cleaner (solo)", example: "Daily route, ETAs, and instant invoices without configuring a team dispatch board." },
      { industry: "Gardener (solo)", example: "Recurring rounds and suburb clustering without a desktop-first setup." },
      { industry: "Pressure washing", example: "High-volume routing and on-site invoices from one iPhone app." },
      { industry: "Small team (2–3)", example: "Consider ServiceM8 or DayRoute Team depending on dispatch needs — see pricing for both." },
      { industry: "Growing company (5+)", example: "ServiceM8's team workflows and integrations may be the better long-term fit." },
    ],
    proofStrip: [
      { stat: "$19.99/mo", label: "DayRoute Pro for solos (AUD)" },
      { stat: "iPhone", label: "Native app — built for the road" },
      { stat: "7 days", label: "Free trial — try before you commit" },
    ],
    faqs: [
      { question: "When is ServiceM8 the better choice?", answer: "If you run a growing team, need deep job-card workflows, heavy quoting, or integrations with accounting and suppliers at scale, ServiceM8 is built for that world. Check their current plans on servicem8.com for team pricing and features." },
      { question: "When is DayRoute the better choice?", answer: "If you're solo (or a very small crew), live on your iPhone, and want route planning, scheduling, invoicing, and expenses in one simple app — DayRoute is designed for that daily workflow." },
      { question: "Can I use both?", answer: "Some operators use DayRoute for daily routes and on-site admin, then hand structured summaries to a bookkeeper using another platform. They complement different parts of the business." },
      { question: "Is switching worth it if I'm already on ServiceM8?", answer: "Only if your pain is daily routing and mobile simplicity, not team dispatch. Try DayRoute's 7-day trial on a busy week and compare how much driving and evening admin you save." },
    ],
    bottomCtaHeading: "Solo on the road? Try the route-first option",
    bottomCtaSubtext: "Download DayRoute and run one real week — 7-day free trial, no credit card. Compare how your day feels.",
    relatedLinks: [
      { label: "Compare all options", href: "/compare" },
      { label: "DayRoute vs spreadsheet", href: "/dayroute-vs-spreadsheet" },
      { label: "Field service workflow", href: "/field-service-workflow-app-for-iphone-australia" },
      { label: "Pricing", href: "/pricing" },
      { label: "Mobile vs desktop accounting", href: "/mobile-field-service-app-vs-desktop-accounting-software" },
    ],
  },

  // ===========================================================================
  // BOFU — "Best app" pages (criteria-first)
  // ===========================================================================

  {
    pageType: "feature",
    slug: "best-route-planner-gardeners-australia",
    seoTitle: "Best Route Planner for Gardeners Australia (2026 Guide)",
    metaDescription:
      "What to look for in a route planner for Australian gardeners: recurring rounds, suburb clustering, and less driving. How DayRoute fits each criterion.",
    h1: "Best route planner for gardeners in Australia",
    shortName: "Best Gardener Routes",
    breadcrumbParent: { label: "Compare", href: "/compare" },
    intro:
      "The best route planner for a gardening business isn't the one with the most features — it's the one that respects how you actually work: recurring fortnightly mows, tight suburbs, and limited hours of daylight. Use this checklist to evaluate any app, then see how DayRoute maps to each point.",
    problem: {
      heading: "What to look for (evaluation checklist)",
      description:
        "Before you download anything, score each app against these criteria — they're what separate profitable rounds from wasted fuel.",
      bullets: [
        "Recurring jobs (weekly / fortnightly / monthly) without manual re-entry each week",
        "Multi-stop optimisation that respects your time windows, not just distance",
        "Suburb clustering so new clients slot into the right day, not the first gap",
        "One-tap navigation to each property without copying addresses",
        "On-site invoicing so you're not quoting admin hours every Sunday night",
      ],
    },
    solution: {
      heading: "How DayRoute meets each criterion",
      description:
        "DayRoute is built for Australian mobile service businesses — gardeners included — with route planning as the core of the day view.",
      steps: [
        { title: "Recurring bookings built in", description: "Set fortnightly mows and seasonal clean-ups once; jobs regenerate on your schedule." },
        { title: "Optimised stop order", description: "Drop in today's properties and get a sensible drive sequence — less backtracking between suburbs." },
        { title: "Geographic discipline", description: "When a new enquiry comes in, slot them on the day you already cover their area." },
        { title: "Navigate and invoice on site", description: "Open Maps from the job card; send the invoice before you start the mower at the next house." },
      ],
    },
    industryExamples: [
      { industry: "Lawn mowing rounds", example: "Run 30–40 regulars across three suburbs with a tighter route each season." },
      { industry: "Hedge & garden maintenance", example: "Attach before/after photos and notes per property for repeat visits." },
      { industry: "Landscaping (small crew)", example: "Team plan shares the day's schedule when you add a second operator." },
      { industry: "One-off clean-ups", example: "Drop callouts into the optimised day without rebuilding the whole week." },
      { industry: "Commercial gardens", example: "Fixed-price jobs invoice immediately after completion." },
      { industry: "Solo operator", example: "Pro plan from $19.99 AUD/month with 7-day free trial." },
    ],
    proofStrip: [
      { stat: "45 min", label: "Driving time saved daily (example gardener, Brisbane)" },
      { stat: "Recurring", label: "Weekly, fortnightly, monthly bookings" },
      { stat: "7 days", label: "Free trial" },
    ],
    testimonial: {
      quote: "I manage 40 regular gardens across three suburbs. DayRoute cut my driving by 45 minutes a day — that's an extra client I can fit in each week.",
      name: "James",
      role: "Gardener & Landscaper",
      location: "Brisbane",
    },
    faqs: [
      { question: "Is Google Maps enough for gardening routes?", answer: "Maps navigates one address at a time — it doesn't optimise your full day or store recurring clients. Most gardeners outgrow Maps once they pass 15–20 regular properties." },
      { question: "Does DayRoute handle one-off jobs as well as recurring?", answer: "Yes. Mix recurring maintenance and one-off clean-ups on the same day; the route recalculates when you add or move jobs." },
      { question: "Can I track mulch and fuel expenses?", answer: "Yes. Snap receipts with the AI scanner — merchant, GST, and totals are captured for BAS reporting." },
      { question: "How does DayRoute compare to a full gardening CRM?", answer: "DayRoute focuses on your daily run: routes, jobs, invoices, and expenses. If you need heavy CRM pipelines, pair DayRoute with your accountant's tools or evaluate a larger platform." },
    ],
    bottomCtaHeading: "Fit one more garden per week",
    bottomCtaSubtext: "Plan tomorrow's round in minutes. 7-day free trial on iPhone — no credit card.",
    relatedLinks: [
      { label: "DayRoute for gardeners", href: "/gardening-business-scheduling-invoicing-app-australia" },
      { label: "Compare options", href: "/compare" },
      { label: "Route planning feature", href: "/route-planning-for-service-businesses-australia" },
      { label: "Blog: Gardening quotes", href: "/blog/how-to-quote-gardening-jobs-in-australia" },
      { label: "Pricing", href: "/pricing" },
    ],
  },

  {
    pageType: "feature",
    slug: "best-job-scheduling-app-cleaners-australia",
    seoTitle: "Best Job Scheduling App for Cleaners Australia",
    metaDescription:
      "Choose a scheduling app for Australian cleaners: ETAs, access codes, recurring cleans, and routes. Criteria checklist plus how DayRoute fits.",
    h1: "Best job scheduling app for cleaners in Australia",
    shortName: "Best Cleaner Scheduling",
    breadcrumbParent: { label: "Compare", href: "/compare" },
    intro:
      "Cleaners don't need the flashiest software — they need reliable arrival times, client notes at the door, and invoices sent before the next house. Here's an honest checklist for Australian cleaning businesses, and where DayRoute fits if you're comparing apps.",
    problem: {
      heading: "What matters most for cleaning schedules",
      description:
        "Cleaning is high-frequency and location-heavy. The wrong app costs you 'where are you?' texts and evening invoice chasing.",
      bullets: [
        "Accurate ETAs and easy 'On My Way' messages when traffic shifts your day",
        "Secure storage of access codes, alarms, pets, and product preferences per client",
        "Recurring weekly or fortnightly cleans without double-booking",
        "Route order that minimises driving between suburbs",
        "Instant invoicing (hourly or fixed) when you finish each property",
      ],
    },
    solution: {
      heading: "How DayRoute scores on each point",
      description:
        "DayRoute treats scheduling and routing as one workflow — because for cleaners, they're the same problem.",
      steps: [
        { title: "One-tap ETAs", description: "Send an SMS or iMessage with your estimated arrival based on live traffic — fewer anxious clients." },
        { title: "Client notes on the job card", description: "Lock codes and instructions are visible before you walk in — not buried in texts." },
        { title: "Recurring clean schedules", description: "Weekly and fortnightly jobs regenerate automatically on your calendar." },
        { title: "Optimised daily route", description: "Sequence houses by proximity so you clean more and drive less." },
      ],
    },
    industryExamples: [
      { industry: "Residential house cleaning", example: "Run 4–6 homes per day with ETAs and same-day payment requests." },
      { industry: "End-of-lease cleans", example: "Drop one-off jobs into the optimised route between regulars." },
      { industry: "Commercial offices", example: "Fixed-price invoicing immediately after each site." },
      { industry: "Holiday rentals", example: "Tight turnarounds with reliable arrival windows for property managers." },
      { industry: "Small cleaning team", example: "Team plan for shared schedules when you hire your first helper." },
      { industry: "Solo cleaner", example: "Pro from $19.99 AUD/month — 7-day free trial." },
    ],
    proofStrip: [
      { stat: "30 min", label: "Daily driving saved (example cleaner, Sydney)" },
      { stat: "On My Way", label: "One-tap ETA messages" },
      { stat: "Same day", label: "Invoice before you leave the street" },
    ],
    testimonial: {
      quote: "My clients love knowing exactly when I'll arrive. The route planning saves me 30 minutes every day — and I get paid the same afternoon.",
      name: "Sarah",
      role: "Cleaning Business Owner",
      location: "Sydney",
    },
    faqs: [
      { question: "Can DayRoute do hourly and flat-rate cleans?", answer: "Yes. Set pricing per client. When you complete the job, the amount calculates automatically on the invoice." },
      { question: "What if a client cancels mid-day?", answer: "Remove or reschedule the job and re-optimise the route — the rest of your day adjusts." },
      { question: "Do I need a separate app for routes?", answer: "No. Scheduling, route order, navigation, and invoicing live in DayRoute — you don't need a second routing tool." },
      { question: "Is this overkill for a part-time cleaner?", answer: "If you clean more than a couple of homes per day, organised routes and instant invoices usually pay for the app within the first week." },
    ],
    bottomCtaHeading: "Fewer 'where are you?' texts",
    bottomCtaSubtext: "Try DayRoute free for 7 days. Set up recurring cleans and send your first ETA tomorrow.",
    relatedLinks: [
      { label: "DayRoute for cleaners", href: "/cleaning-business-scheduling-invoicing-app-australia" },
      { label: "Compare options", href: "/compare" },
      { label: "DayRoute vs spreadsheet", href: "/dayroute-vs-spreadsheet" },
      { label: "Blog: Cleaning routes", href: "/blog/how-to-plan-a-daily-cleaning-route-that-saves-time-and-fuel" },
      { label: "Pricing", href: "/pricing" },
    ],
  },

  {
    pageType: "feature",
    slug: "best-app-pressure-washing-businesses-australia",
    seoTitle: "Best App for Pressure Washing Businesses Australia",
    metaDescription:
      "Best app criteria for Australian pressure washing: routing, on-site invoices, chemical costs. Compare features honestly and see how DayRoute fits.",
    h1: "Best app for pressure washing businesses in Australia",
    shortName: "Best Pressure Washing App",
    breadcrumbParent: { label: "Compare", href: "/compare" },
    intro:
      "Pressure washing is volume-driven — more jobs per day means more profit. The best app helps you cluster suburbs, track chemical and fuel costs, and invoice while the driveway is still wet. Use this guide to evaluate options in Australia, then see how DayRoute lines up.",
    problem: {
      heading: "What pressure washers should demand from an app",
      description:
        "Generic calendars don't understand driveways, seasonal rushes, or chemical receipts scattered across the ute.",
      bullets: [
        "Route planning that groups driveways, decks, and commercial jobs by area",
        "Quick quotes or invoices on site — especially for real-estate and strata work",
        "Expense tracking for detergents, tips, fuel, and equipment wear",
        "Job photos for before/after marketing and dispute protection",
        "Calendar that survives spring rush without double-booking",
      ],
    },
    solution: {
      heading: "How DayRoute supports pressure washing workflows",
      description:
        "DayRoute is a mobile field-service app — not a pressure-washing-only CRM — but it covers the daily workflow most solo operators actually need.",
      steps: [
        { title: "Multi-stop routes", description: "Plan five driveways and two decks in logical order — less dead time between suburbs." },
        { title: "Invoice on completion", description: "Send professional invoices from the job card before you pack the hose away." },
        { title: "Receipt scanning", description: "Log chemical and fuel purchases with GST captured for BAS." },
        { title: "Before/after photos", description: "Attach photos to the job for proof of work and social content later." },
      ],
    },
    industryExamples: [
      { industry: "Residential driveways", example: "Cluster morning jobs in one suburb; afternoon in another." },
      { industry: "Deck & patio restoration", example: "Longer jobs with materials costs tracked per visit." },
      { industry: "Pre-sale house washes", example: "Quick quotes and invoices for agents who need fast turnaround." },
      { industry: "Strata & commercial", example: "Fixed schedules with recurring monthly routes." },
      { industry: "Roof cleaning", example: "Attach safety notes and photos to the job record." },
      { industry: "Solo operator", example: "7-day free trial on Pro — $19.99 AUD/month after." },
    ],
    proofStrip: [
      { stat: "5+ jobs", label: "Typical solo day — routing matters" },
      { stat: "AI scan", label: "Receipt capture for chemicals & fuel" },
      { stat: "7 days", label: "Free trial" },
    ],
    faqs: [
      { question: "Does DayRoute include chemical mixing calculators?", answer: "No — DayRoute focuses on scheduling, routes, invoicing, and expenses. Use your existing chemical protocols; log costs via receipts." },
      { question: "Can I handle quotes for large commercial jobs?", answer: "DayRoute excels at day-to-day scheduling and on-site invoicing. Complex commercial quotes may still need a detailed proposal — then schedule the job in DayRoute once approved." },
      { question: "Will it help with Google review photos?", answer: "Before/after photos stored on the job make it easy to post your best work — with permission from the client." },
      { question: "Is DayRoute better than a paper run sheet?", answer: "For most operators doing 3+ jobs daily, yes — route order and instant invoices recover the subscription quickly." },
    ],
    bottomCtaHeading: "More driveways per day",
    bottomCtaSubtext: "Download DayRoute, map this week's jobs, and optimise your first route. Free for 7 days.",
    relatedLinks: [
      { label: "DayRoute for pressure washing", href: "/pressure-washing-business-route-invoicing-app-australia" },
      { label: "Compare options", href: "/compare" },
      { label: "Blog: Pricing guide", href: "/blog/pressure-washing-pricing-guide-australia" },
      { label: "Route planning", href: "/route-planning-for-service-businesses-australia" },
      { label: "Pricing", href: "/pricing" },
    ],
  },

  {
    pageType: "feature",
    slug: "best-iphone-app-mobile-service-businesses-australia",
    seoTitle: "Best iPhone App for Mobile Service Businesses Australia",
    metaDescription:
      "Best iPhone app for Australian mobile service businesses: routes, scheduling, invoicing, logbook. Evaluation criteria and how DayRoute fits solos on the road.",
    h1: "Best iPhone app for mobile service businesses in Australia",
    shortName: "Best iPhone App",
    breadcrumbParent: { label: "Compare", href: "/compare" },
    intro:
      "If your office is your ute and your desk is your iPhone, you need an app that works offline-friendly, respects Australian tax records, and doesn't force you through desktop setup. Here's what to look for — and how DayRoute compares for solo operators and small teams.",
    problem: {
      heading: "Criteria for a true field-service iPhone app",
      description:
        "Many 'business apps' are accounting tools with a mobile login bolted on. Mobile service work needs something else.",
      bullets: [
        "Native iPhone experience — fast, thumb-friendly, works at the job site",
        "Route planning and navigation integrated with your job list",
        "Invoicing and expenses without opening a laptop",
        "ATO-friendly logbook and GST-aware receipt capture",
        "Pricing that makes sense for one person before you hire a team",
      ],
    },
    solution: {
      heading: "Why operators choose DayRoute on iPhone",
      description:
        "DayRoute is iPhone-first (iPad supported). Android is on the roadmap — this page is for operators already on Apple devices.",
      steps: [
        { title: "Whole day on one screen", description: "Schedule, map, drive times, and job status together — not scattered across apps." },
        { title: "Invoice in under a minute", description: "Pre-filled client details and line items from the completed job." },
        { title: "Mileage and receipts automatic", description: "Start a trip for the logbook; scan receipts with AI for GST breakdowns." },
        { title: "Australian context built in", description: "AUD pricing, BAS summaries, and workflows familiar to Aussie tradies and carers." },
      ],
    },
    industryExamples: [
      { industry: "Tradies / handyman", example: "See the handyman app page for job photos and Bunnings receipts." },
      { industry: "NDIS providers", example: "NDIS-formatted invoice templates and travel logging between participants." },
      { industry: "Mobile detailing", example: "Suburb-clustered booking days with on-site invoices." },
      { industry: "Pest control", example: "Treatment notes and routes for inspection-heavy weeks." },
      { industry: "Pet grooming (mobile)", example: "Recurring grooms with ETAs for anxious pet owners." },
      { industry: "HVAC", example: "Service calls, parts expenses, and invoices from the roof." },
    ],
    proofStrip: [
      { stat: "iPhone", label: "Native App Store app" },
      { stat: "$19.99/mo", label: "Pro for solo operators (AUD)" },
      { stat: "21+", label: "Pre-built service categories in-app" },
    ],
    faqs: [
      { question: "Is DayRoute available on Android?", answer: "Currently DayRoute is on iPhone and iPad via the Apple App Store. Android is planned — check the site for updates." },
      { question: "Does it work without signal?", answer: "You can view and complete jobs offline. Route optimisation and sync need internet — most operators sync at breakfast or between suburbs." },
      { question: "How does DayRoute compare to desktop accounting apps?", answer: "Accounting apps handle books; DayRoute handles the day on the road. Many users export summaries to their accountant's platform at BAS time." },
      { question: "What if I'm comparing several apps?", answer: "Start at /compare for DayRoute vs paper, spreadsheets, and ServiceM8 for solos — then try the 7-day trial on your busiest week." },
    ],
    bottomCtaHeading: "Replace your patchwork of iPhone apps",
    bottomCtaSubtext: "One download. 7-day free trial. Built for Australian mobile professionals.",
    relatedLinks: [
      { label: "Compare all options", href: "/compare" },
      { label: "Field service workflow", href: "/field-service-workflow-app-for-iphone-australia" },
      { label: "Industries", href: "/industries" },
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
];

// Run validation at module load time — thin pages will crash the build.
validateAll(seoPages);

// =============================================================================
// LOOKUP HELPERS
// =============================================================================

/** Get all SEO pages. */
export function getAllSeoPages(): SeoPage[] {
  return seoPages;
}

/** Get all slugs (used by generateStaticParams). */
export function getAllSeoSlugs(): string[] {
  return seoPages.map((p) => p.slug);
}

/** Look up any SEO page by slug. */
export function getSeoPageBySlug(slug: string): SeoPage | undefined {
  return seoPages.find((p) => p.slug === slug);
}

/** Get only category pages. */
export function getCategoryPages(): CategorySeoPage[] {
  return seoPages.filter((p): p is CategorySeoPage => p.pageType === "category");
}

/** Get only feature pages. */
export function getFeaturePages(): FeatureSeoPage[] {
  return seoPages.filter((p): p is FeatureSeoPage => p.pageType === "feature");
}
