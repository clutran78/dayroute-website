/**
 * Long-Tail SEO Feature / Problem Pages — Content Data
 *
 * These pages target search intent based on a specific PROBLEM or WORKFLOW
 * (e.g. "mobile invoicing after job") rather than an industry vertical.
 *
 * Each entry produces a unique page at /{slug}.
 * The dynamic route at src/app/[slug]/page.tsx renders the template.
 *
 * Guidelines:
 * - Every page MUST have genuinely unique content — not keyword swaps.
 * - Australian English throughout.
 * - Do NOT claim integrations or features that don't exist.
 */

export interface IndustryExample {
  industry: string;
  example: string;
}

export interface FeatureFaq {
  question: string;
  answer: string;
}

export interface FeaturePage {
  /** URL slug — becomes the route path. */
  slug: string;

  /** Page <title> tag (appended with " | DayRoute" via template). */
  title: string;

  /** Meta description (max ~155 chars). */
  metaDescription: string;

  /** H1 heading. */
  h1: string;

  /** Short label for breadcrumbs. */
  shortName: string;

  /** Breadcrumb parent — e.g. "Features" or "Use Cases". */
  breadcrumbParent: { label: string; href: string };

  /** Hero intro paragraph. */
  intro: string;

  /** The problem this feature solves — framed from the user's perspective. */
  problem: {
    heading: string;
    description: string;
    bullets: string[];
  };

  /** How DayRoute solves it — step-by-step or capability list. */
  solution: {
    heading: string;
    description: string;
    steps: { title: string; description: string }[];
  };

  /** Real-world examples across industries. */
  industryExamples: IndustryExample[];

  /** Page-specific FAQs. */
  faqs: FeatureFaq[];

  /** Related internal links. */
  relatedLinks: { label: string; href: string }[];
}

// =============================================================================
// FEATURE / PROBLEM PAGES
// =============================================================================

export const featurePages: FeaturePage[] = [
  // =========================================================================
  // 1. ROUTE PLANNING FOR SERVICE BUSINESSES
  // =========================================================================
  {
    slug: "route-planning-for-service-businesses-australia",
    title: "Route Planning for Service Businesses in Australia",
    metaDescription:
      "Plan efficient multi-stop routes for your service business. DayRoute optimises job order, shows ETAs, and integrates with Google Maps. Try free for 7 days.",
    h1: "Multi-stop route planning built for Australian service businesses",
    shortName: "Route Planning",
    breadcrumbParent: { label: "Features", href: "/features" },
    intro:
      "If you visit multiple job sites each day — whether you're mowing lawns, fixing taps, or providing in-home care — driving between them in the wrong order burns fuel, wastes time, and pushes your last job into the evening. DayRoute takes your daily job list and calculates the fastest route using Google Maps, so you spend more time working and less time behind the wheel.",
    problem: {
      heading: "Why most service businesses waste time on the road",
      description:
        "Without a route planner, field workers typically visit jobs in the order they were booked — not the order that makes geographic sense. The result is avoidable backtracking, missed appointment windows, and higher fuel costs.",
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
      description:
        "Enter your jobs for the day — or sync them from your calendar — and DayRoute calculates the most efficient order. You see drive times, ETAs, and a visual route on the map before you leave home.",
      steps: [
        {
          title: "Add your jobs",
          description:
            "Enter client addresses manually or import from your phone calendar. Each job includes time, duration, and notes.",
        },
        {
          title: "Tap 'Optimise Route'",
          description:
            "DayRoute uses Google Maps to find the fastest order. It considers real distances and typical drive times between stops.",
        },
        {
          title: "See ETAs at a glance",
          description:
            "Every job card shows your estimated arrival time. If a client asks 'what time will you be here?', you've got the answer instantly.",
        },
        {
          title: "Navigate with one tap",
          description:
            "Tap any job to open turn-by-turn navigation in Google Maps or Apple Maps. No copy-pasting addresses.",
        },
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
      {
        question: "Does DayRoute use Google Maps for route optimisation?",
        answer:
          "Yes. DayRoute uses Google Maps data for distance calculations and provides one-tap navigation via Google Maps or Apple Maps.",
      },
      {
        question: "Can I add or remove jobs mid-day and re-optimise?",
        answer:
          "Yes. Add a new job or remove a cancellation at any time. Tap 'Optimise' again and DayRoute recalculates the best order for your remaining stops.",
      },
      {
        question: "How many stops can I plan in one route?",
        answer:
          "DayRoute supports a full day of jobs — there's no hard stop limit. Most field workers plan between 5 and 15 stops per day.",
      },
      {
        question: "Does it work in regional Australia, not just cities?",
        answer:
          "Yes. Anywhere Google Maps has road data, DayRoute can plan a route. It works in metro, suburban, and regional areas across Australia.",
      },
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

  // =========================================================================
  // 2. MOBILE INVOICING AFTER JOB COMPLETION
  // =========================================================================
  {
    slug: "mobile-invoicing-after-job-completion-iphone",
    title: "Mobile Invoicing After Job Completion on iPhone",
    metaDescription:
      "Create and send professional invoices from your iPhone the moment you finish a job. DayRoute pre-fills client details, calculates GST, and sends via SMS or email.",
    h1: "Send invoices from your iPhone the moment you finish a job",
    shortName: "Mobile Invoicing",
    breadcrumbParent: { label: "Features", href: "/features" },
    intro:
      "The fastest way to get paid is to invoice while you're still on site. DayRoute lets you create a professional invoice on your iPhone in under 30 seconds — client details, line items, and GST are pre-filled from the job. Send via SMS, email, or WhatsApp before you pack up your tools.",
    problem: {
      heading: "Why invoicing at the end of the week costs you money",
      description:
        "Most field workers batch their invoicing to Sunday night or hand-write them at the kitchen table. The delay means slower payments, forgotten jobs, and inaccurate totals.",
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
      description:
        "When you mark a job as complete, DayRoute offers to create an invoice with one tap. Everything is pre-filled — you just review and send.",
      steps: [
        {
          title: "Complete the job",
          description:
            "Mark the job as done. DayRoute records the duration, any extra charges, and completion notes.",
        },
        {
          title: "Tap 'Create Invoice'",
          description:
            "An invoice is generated with the client's name, address, service description, line items, and GST — all pre-filled from the job details.",
        },
        {
          title: "Review and send",
          description:
            "Make any adjustments (discounts, extra charges, notes), then send via SMS, email, or WhatsApp. The client receives a professional PDF.",
        },
        {
          title: "Track payment status",
          description:
            "DayRoute tracks whether each invoice is draft, sent, paid, or overdue. You always know who owes you money.",
        },
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
      {
        question: "Can I include GST on invoices?",
        answer:
          "Yes. DayRoute calculates GST automatically. You can set whether your prices are GST-inclusive or exclusive, and the invoice shows the GST amount separately.",
      },
      {
        question: "Can I send invoices via SMS or WhatsApp?",
        answer:
          "Yes. DayRoute generates a professional PDF invoice that you can send via SMS, email, or WhatsApp — whichever your client prefers.",
      },
      {
        question: "Does DayRoute track which invoices have been paid?",
        answer:
          "Yes. Each invoice has a status: draft, sent, paid, or overdue. You can see all outstanding invoices at a glance from the invoices screen.",
      },
      {
        question: "Can I customise the invoice template with my business details?",
        answer:
          "Yes. Add your business name, ABN, logo, phone number, and bank details in settings. They appear on every invoice you send.",
      },
    ],
    relatedLinks: [
      { label: "All features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Before & after photos", href: "/before-after-photos-for-service-jobs" },
      { label: "Route planning", href: "/route-planning-for-service-businesses-australia" },
      { label: "Handyman app", href: "/handyman-job-management-route-invoicing-app-australia" },
    ],
  },

  // =========================================================================
  // 3. BEFORE & AFTER PHOTOS FOR SERVICE JOBS
  // =========================================================================
  {
    slug: "before-after-photos-for-service-jobs",
    title: "Before & After Photos for Service Jobs",
    metaDescription:
      "Capture before-and-after photos for every job with DayRoute. Attach them to job records and invoices as proof of work. Perfect for tradies, cleaners, and field pros.",
    h1: "Before-and-after photos that prove your work — attached to every job",
    shortName: "Before & After Photos",
    breadcrumbParent: { label: "Features", href: "/features" },
    intro:
      "A picture is worth a thousand words — especially when a client disputes the quality of your work or when you want to show off a transformation on social media. DayRoute lets you snap before-and-after photos for every job, automatically attached to the job record. Use them for proof of work, client communication, or marketing.",
    problem: {
      heading: "Why you need photo proof for every job",
      description:
        "Disputes happen. Clients forget what state things were in before you arrived. Without timestamped photo evidence, it's your word against theirs.",
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
      description:
        "Take before-and-after photos directly from the job screen. They're timestamped, tagged to the job, and stored with the client record.",
      steps: [
        {
          title: "Snap a 'before' photo on arrival",
          description:
            "Open the job, tap the camera icon, and take a photo. It's automatically tagged as a 'before' shot with a timestamp.",
        },
        {
          title: "Complete the work",
          description:
            "Do your job as normal. Notes, time tracking, and materials are all recorded on the same job card.",
        },
        {
          title: "Snap an 'after' photo before you leave",
          description:
            "Take the 'after' shot from the same angle. DayRoute stores both photos side by side on the job record.",
        },
        {
          title: "Attach to invoices or share with clients",
          description:
            "Include photos as proof of work when sending invoices, or share them directly with the client for peace of mind.",
        },
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
      {
        question: "Are photos stored on my phone or in the cloud?",
        answer:
          "Photos are stored locally on your device and synced to your DayRoute account. They stay attached to the job record so you can access them later.",
      },
      {
        question: "Can I attach photos to invoices?",
        answer:
          "Yes. When creating an invoice from a completed job, you can include before-and-after photos as proof of work.",
      },
      {
        question: "Are photos timestamped?",
        answer:
          "Yes. Each photo is automatically timestamped with the date and time it was taken, providing a verifiable record.",
      },
      {
        question: "Can I use photos for marketing on social media?",
        answer:
          "Absolutely. The photos are saved to your device and can be shared to Instagram, Facebook, or any platform to showcase your work.",
      },
    ],
    relatedLinks: [
      { label: "All features", href: "/features" },
      { label: "Mobile invoicing", href: "/mobile-invoicing-after-job-completion-iphone" },
      { label: "Pressure washing app", href: "/pressure-washing-business-route-invoicing-app-australia" },
      { label: "Cleaning app", href: "/cleaning-business-scheduling-invoicing-app-australia" },
    ],
  },

  // =========================================================================
  // 4. MILEAGE LOGBOOK & RECEIPTS
  // =========================================================================
  {
    slug: "mileage-logbook-receipts-for-service-businesses-australia",
    title: "Mileage Logbook & Receipts for Service Businesses in Australia",
    metaDescription:
      "Track work kilometres, scan receipts with AI, and export BAS-ready reports. DayRoute is the mileage logbook and expense tracker for Australian service businesses.",
    h1: "Mileage logbook, receipt scanner, and BAS reporting — all in one app",
    shortName: "Logbook & Receipts",
    breadcrumbParent: { label: "Features", href: "/features" },
    intro:
      "The ATO expects you to keep accurate records of business kilometres and expenses. Most tradies and field workers know this — but doing it consistently is another story. DayRoute records your trips with GPS, scans your receipts with AI, and generates BAS-ready expense summaries. No more shoeboxes of receipts at tax time.",
    problem: {
      heading: "Why tax time is painful for field workers",
      description:
        "The ATO requires business vehicle logs and expense records. Without a system, you either estimate (and risk an audit) or spend hours reconstructing records from memory.",
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
      description:
        "Start a trip and DayRoute logs the kilometres via GPS. Snap a receipt and the AI extracts the details. At BAS time, export a clean summary.",
      steps: [
        {
          title: "Start a trip with one tap",
          description:
            "Tap 'Start Trip' and DayRoute records your start location and odometer. GPS runs only while you're tracking — never in the background without permission.",
        },
        {
          title: "Snap receipts as you go",
          description:
            "Point your camera at a receipt. The AI (powered by Google Gemini) reads the merchant, date, items, GST, and total — no manual typing.",
        },
        {
          title: "Categorise automatically",
          description:
            "Expenses are auto-categorised (fuel, materials, tools, etc.) and tagged with GST amounts. Review and adjust if needed.",
        },
        {
          title: "Export BAS-ready reports",
          description:
            "When BAS quarter ends, export an income vs. expense summary with GST totals. Hand it to your accountant or lodge it yourself.",
        },
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
      {
        question: "Is the logbook ATO-compliant?",
        answer:
          "DayRoute records start/end locations, odometer readings, distance, and purpose (business or personal) for each trip — the key fields the ATO requires for a vehicle logbook.",
      },
      {
        question: "Does the receipt scanner work with faded or crumpled receipts?",
        answer:
          "The AI scanner handles most receipt conditions well. For very damaged receipts, you can manually enter the details. The photo is still stored as proof.",
      },
      {
        question: "Can I export expense data for my accountant?",
        answer:
          "Yes. DayRoute generates quarterly and annual summaries with income, expenses, and GST totals. You can share the report directly with your accountant.",
      },
      {
        question: "Does GPS tracking drain my battery?",
        answer:
          "GPS runs only when you actively start a trip. It stops when you end the trip. DayRoute never tracks your location in the background without permission.",
      },
    ],
    relatedLinks: [
      { label: "All features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Route planning", href: "/route-planning-for-service-businesses-australia" },
      { label: "Mobile invoicing", href: "/mobile-invoicing-after-job-completion-iphone" },
      { label: "Handyman app", href: "/handyman-job-management-route-invoicing-app-australia" },
    ],
  },

  // =========================================================================
  // 5. XERO / QUICKBOOKS ALTERNATIVE
  // =========================================================================
  {
    slug: "xero-quickbooks-mobile-workflow-alternative-for-field-service",
    title: "Xero & QuickBooks Mobile Alternative for Field Service Workflows",
    metaDescription:
      "DayRoute is a simpler, mobile-first alternative to Xero and QuickBooks for field service workers who need invoicing, expenses, and job management on their phone.",
    h1: "A simpler mobile alternative to Xero and QuickBooks for field workers",
    shortName: "Xero / QuickBooks Alternative",
    breadcrumbParent: { label: "Features", href: "/features" },
    intro:
      "Xero and QuickBooks are powerful accounting platforms — but they're built for people who sit at a desk. If you spend your day in a van visiting job sites, you need something that works from your phone, in the field, with dirty hands. DayRoute is a mobile-first workflow app that handles the parts of your day Xero and QuickBooks weren't designed for: route planning, job scheduling, receipt scanning, and on-site invoicing.",
    problem: {
      heading: "Why desktop accounting tools don't fit field service work",
      description:
        "Xero and QuickBooks are great for bookkeeping — but they assume you're at a computer. Field workers need tools that work at the job site, not the office.",
      bullets: [
        "Creating invoices on a phone in Xero/QuickBooks is clunky and slow",
        "No route planning or job scheduling — you need separate apps for that",
        "Receipt entry requires manual typing or desktop scanning",
        "No vehicle logbook or GPS trip tracking built in",
        "Overkill for solo operators who just need to invoice, track expenses, and plan routes",
      ],
    },
    solution: {
      heading: "What DayRoute does differently",
      description:
        "DayRoute isn't a replacement for your accountant's tools. It's a mobile companion that handles the fieldwork side — then your accountant can use Xero or QuickBooks for the rest.",
      steps: [
        {
          title: "Plan your day and routes",
          description:
            "Schedule jobs, optimise your route, and see ETAs — something accounting apps simply don't do.",
        },
        {
          title: "Invoice on the spot",
          description:
            "Create and send invoices from your phone in under 30 seconds. No laptop required.",
        },
        {
          title: "Scan receipts with AI",
          description:
            "Point your camera at a receipt. The AI extracts merchant, items, GST, and total instantly — no manual data entry.",
        },
        {
          title: "Export for your accountant",
          description:
            "At BAS time, export your income, expenses, and GST summaries. Your accountant can import the data into Xero, QuickBooks, or MYOB.",
        },
      ],
    },
    industryExamples: [
      { industry: "Trades / handyman", example: "Use DayRoute for daily job management and invoicing. Export totals to your accountant's Xero at BAS time." },
      { industry: "Cleaning", example: "Track income and expenses in DayRoute daily. Hand your accountant a clean quarterly summary." },
      { industry: "Gardening", example: "Invoice clients on the spot and scan receipts. No more Sunday-night data entry into accounting software." },
      { industry: "Pest control", example: "Manage jobs, routes, and expenses in DayRoute. Let your bookkeeper handle the ledger in Xero." },
      { industry: "HVAC", example: "Record parts expenses and job income on site. Export for your accountant rather than keeping a shoebox of receipts." },
      { industry: "NDIS / home support", example: "Create NDIS-formatted invoices on your phone. Share summaries with your plan manager or bookkeeper." },
    ],
    faqs: [
      {
        question: "Does DayRoute integrate directly with Xero or QuickBooks?",
        answer:
          "DayRoute does not currently have a direct integration with Xero or QuickBooks. However, you can export income and expense summaries from DayRoute and share them with your accountant for entry into their preferred accounting platform.",
      },
      {
        question: "Is DayRoute a replacement for Xero or QuickBooks?",
        answer:
          "No. DayRoute is a mobile field-service tool — not a full accounting platform. It handles the parts of your day that accounting software isn't designed for: route planning, job scheduling, on-site invoicing, and receipt scanning. Your accountant can continue using Xero, QuickBooks, or MYOB for bookkeeping.",
      },
      {
        question: "Can my accountant use DayRoute's data?",
        answer:
          "Yes. DayRoute generates income, expense, and GST summaries that your accountant can use for BAS lodgement and end-of-year tax. You can share these reports directly.",
      },
      {
        question: "Is DayRoute cheaper than Xero or QuickBooks?",
        answer:
          "DayRoute Pro starts at $19 AUD/month, which is comparable to or less than most accounting software plans. But the comparison isn't apples-to-apples — DayRoute focuses on fieldwork (routes, jobs, invoicing, expenses) while Xero/QuickBooks focus on accounting.",
      },
    ],
    relatedLinks: [
      { label: "All features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Mobile invoicing", href: "/mobile-invoicing-after-job-completion-iphone" },
      { label: "Mileage logbook & receipts", href: "/mileage-logbook-receipts-for-service-businesses-australia" },
      { label: "Field service workflow app", href: "/field-service-workflow-app-for-iphone-australia" },
    ],
  },

  // =========================================================================
  // 6. FIELD SERVICE WORKFLOW APP
  // =========================================================================
  {
    slug: "field-service-workflow-app-for-iphone-australia",
    title: "Field Service Workflow App for iPhone — Australia",
    metaDescription:
      "DayRoute is the all-in-one field service workflow app for iPhone. Schedule jobs, plan routes, invoice clients, scan receipts, and track mileage — built for Australian pros.",
    h1: "The all-in-one field service workflow app for iPhone",
    shortName: "Field Service Workflow",
    breadcrumbParent: { label: "Features", href: "/features" },
    intro:
      "Most field service workers use 4-5 separate apps and tools to get through the day: a calendar for scheduling, Google Maps for navigation, a spreadsheet for expenses, a Word template for invoices, and a notebook for client details. DayRoute combines all of these into a single iPhone app designed for people who work on the road, not at a desk.",
    problem: {
      heading: "Why juggling multiple apps slows you down",
      description:
        "Switching between apps, re-entering data, and losing track of information across different tools is the hidden cost of not having a unified workflow.",
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
      description:
        "DayRoute connects every part of your field service workflow — from the morning schedule to the last invoice — in a single app on your iPhone.",
      steps: [
        {
          title: "Schedule and plan",
          description:
            "Add jobs, set times, and optimise your route. See your entire day — schedule, map, and drive times — in one view.",
        },
        {
          title: "Navigate and track",
          description:
            "One-tap navigation to each job. GPS mileage tracking runs automatically. Send ETA notifications to clients.",
        },
        {
          title: "Complete and invoice",
          description:
            "Mark jobs done, snap before/after photos, and create invoices with pre-filled details. Send via SMS or email on the spot.",
        },
        {
          title: "Scan and report",
          description:
            "Photograph receipts for AI extraction. View income vs. expense summaries and export BAS-ready reports at quarter end.",
        },
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
      {
        question: "Does DayRoute work offline?",
        answer:
          "Yes. Your schedule, job details, and client information are stored on your device. You need internet to optimise routes and sync data, but you can view and complete jobs offline.",
      },
      {
        question: "Is DayRoute only for iPhone?",
        answer:
          "Currently, yes. DayRoute is available on iPhone and iPad via the Apple App Store. Android support is on the roadmap.",
      },
      {
        question: "How long does it take to set up?",
        answer:
          "Most users are up and running in under 10 minutes. Add your clients, create a few jobs, and optimise your first route. You can also import appointments from your phone calendar.",
      },
      {
        question: "Can I use DayRoute with a small team?",
        answer:
          "Yes. The Team plan supports up to 10 users with shared scheduling, location sharing, job assignment, and role-based permissions.",
      },
    ],
    relatedLinks: [
      { label: "All features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Route planning", href: "/route-planning-for-service-businesses-australia" },
      { label: "Mobile invoicing", href: "/mobile-invoicing-after-job-completion-iphone" },
      { label: "Mileage logbook & receipts", href: "/mileage-logbook-receipts-for-service-businesses-australia" },
      { label: "Xero/QuickBooks alternative", href: "/xero-quickbooks-mobile-workflow-alternative-for-field-service" },
    ],
  },
];

/**
 * Look up a feature page by slug.
 */
export function getFeaturePageBySlug(slug: string): FeaturePage | undefined {
  return featurePages.find((p) => p.slug === slug);
}

/**
 * Get all feature page slugs (used by generateStaticParams).
 */
export function getAllFeaturePageSlugs(): string[] {
  return featurePages.map((p) => p.slug);
}
