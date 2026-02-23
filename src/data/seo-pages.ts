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

/** Feature page — targets a problem or workflow (route planning, invoicing, etc.) */
export interface FeatureSeoPage extends BaseSeoPage {
  pageType: "feature";
  breadcrumbParent: { label: string; href: string };
  problem: { heading: string; description: string; bullets: string[] };
  solution: { heading: string; description: string; steps: { title: string; description: string }[] };
  industryExamples: { industry: string; example: string }[];
}

/** Discriminated union — a page is either a category page or a feature page. */
export type SeoPage = CategorySeoPage | FeatureSeoPage;

// =============================================================================
// VALIDATION — prevents accidental thin / empty pages
// =============================================================================

/**
 * Validates a single SEO page entry. Throws a descriptive error if
 * minimum content thresholds are not met.
 */
export function validateSeoPage(page: SeoPage): void {
  const errors: string[] = [];
  const ctx = `[${page.slug}]`;

  if (!page.slug || page.slug.length < 5) errors.push(`${ctx} slug is too short`);
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
  // Check for duplicate slugs
  const slugs = new Set<string>();
  for (const page of pages) {
    if (slugs.has(page.slug)) {
      throw new Error(`Duplicate SEO page slug: "${page.slug}"`);
    }
    slugs.add(page.slug);
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
      { label: "Pricing", href: "/pricing" },
      { label: "Cleaning business app", href: "/cleaning-business-scheduling-invoicing-app-australia" },
      { label: "Handyman app", href: "/handyman-job-management-route-invoicing-app-australia" },
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
      { label: "Pricing", href: "/pricing" },
      { label: "Gardening business app", href: "/gardening-business-scheduling-invoicing-app-australia" },
      { label: "NDIS support worker app", href: "/ndis-support-worker-route-planner-invoicing-app-australia" },
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
      { label: "Pricing", href: "/pricing" },
      { label: "Handyman app", href: "/handyman-job-management-route-invoicing-app-australia" },
      { label: "Mobile detailing app", href: "/mobile-detailing-route-invoicing-app-australia" },
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
      { question: "How much does DayRoute cost?", answer: "DayRoute Pro starts at $19 AUD/month with a 7-day free trial. It covers route planning, job scheduling, invoicing, receipt scanning, and vehicle logbook — all the tools a field worker needs in one app." },
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
