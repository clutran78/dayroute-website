/**
 * Long-Tail SEO Industry Pages — Content Data
 *
 * Each entry produces a unique page at /{slug}.
 * To add a new page, append an object to this array and rebuild.
 * The dynamic route at src/app/[slug]/page.tsx renders the template.
 *
 * Guidelines:
 * - Every page MUST have unique intro, pain points, features, and FAQs.
 * - Australian English throughout.
 * - Do NOT duplicate content across pages — Google will penalise thin clones.
 */

export interface IndustryFaq {
  question: string;
  answer: string;
}

export interface IndustryPage {
  /** URL slug — becomes the route path (e.g. "gardening-business-scheduling-invoicing-app-australia"). */
  slug: string;

  /** Page <title> tag (will be appended with " | DayRoute" via template). */
  title: string;

  /** Meta description (max ~155 chars). */
  metaDescription: string;

  /** H1 heading on the page. */
  h1: string;

  /** Short label used in breadcrumbs & internal links (e.g. "Gardening"). */
  shortName: string;

  /** Hero intro paragraph (2-3 sentences, unique per page). */
  intro: string;

  /** Industry-specific pain points (3-5 items). */
  painPoints: {
    title: string;
    description: string;
  }[];

  /** Which DayRoute features matter most for this industry. */
  features: {
    title: string;
    description: string;
  }[];

  /** Industry-specific FAQs (3-5 items). */
  faqs: IndustryFaq[];

  /** Testimonial / quote. */
  testimonial: {
    quote: string;
    name: string;
    role: string;
    location: string;
  };

  /** Related internal links shown at the bottom of the page. */
  relatedLinks: {
    label: string;
    href: string;
  }[];
}

// =============================================================================
// INDUSTRY PAGES
// =============================================================================

export const industryPages: IndustryPage[] = [
  // =========================================================================
  // 1. GARDENING
  // =========================================================================
  {
    slug: "gardening-business-scheduling-invoicing-app-australia",
    title: "Gardening Business Scheduling & Invoicing App Australia",
    metaDescription:
      "DayRoute helps Australian gardeners and landscapers plan efficient daily routes, schedule regular clients, track expenses, and send invoices — all from your phone.",
    h1: "The scheduling and invoicing app built for Australian gardeners",
    shortName: "Gardening",
    intro:
      "Running a gardening or landscaping round means visiting multiple properties every day, often in a tight window. DayRoute helps you plan the fastest route between jobs, keep track of recurring clients, log your fuel and materials, and invoice on the spot — so you spend less time on admin and more time in the garden.",
    painPoints: [
      {
        title: "Driving between jobs wastes hours every week",
        description:
          "Without route planning, you end up criss-crossing suburbs and sitting in traffic. That burns fuel and cuts into paid work time.",
      },
      {
        title: "Keeping track of recurring clients is a headache",
        description:
          "Fortnightly mows, monthly hedges, seasonal clean-ups — it's easy to forget who's due when if you're relying on memory or a paper diary.",
      },
      {
        title: "Invoicing gets pushed to the weekend",
        description:
          "After a full day of physical work, the last thing you want to do is sit down and type up invoices. Receipts pile up and payments come in late.",
      },
    ],
    features: [
      {
        title: "Multi-stop route optimisation",
        description:
          "Drop in your jobs for the day and DayRoute calculates the fastest order. Cut driving time, save fuel, and fit in an extra job.",
      },
      {
        title: "Recurring job scheduling",
        description:
          "Set up weekly, fortnightly, or monthly bookings for each client. DayRoute auto-generates the jobs so you never miss a visit.",
      },
      {
        title: "On-the-spot invoicing",
        description:
          "Create and send a professional invoice the moment you finish a job. Clients get it via SMS or email while you're still on site.",
      },
      {
        title: "Expense and receipt tracking",
        description:
          "Snap a photo of your Bunnings receipt. DayRoute's AI reads the total, GST, and merchant automatically — ready for BAS time.",
      },
    ],
    faqs: [
      {
        question: "Can I set up recurring jobs for regular gardening clients?",
        answer:
          "Yes. DayRoute supports weekly, fortnightly, and monthly recurring bookings. Once set up, jobs are auto-generated on your schedule so you never forget a client.",
      },
      {
        question: "Does DayRoute work for landscaping businesses with a small team?",
        answer:
          "Absolutely. The Team plan supports up to 10 users with shared scheduling, location sharing, and role-based permissions — ideal for a landscaping crew.",
      },
      {
        question: "Can I track fuel and materials expenses for my gardening business?",
        answer:
          "Yes. Snap receipts with the AI scanner to log fuel, soil, mulch, plants, and any other expenses. Everything is categorised and GST-tracked for BAS reporting.",
      },
    ],
    testimonial: {
      quote:
        "I manage 40 regular gardens across three suburbs. DayRoute cut my driving by 45 minutes a day — that's an extra client I can fit in each week.",
      name: "James",
      role: "Gardener & Landscaper",
      location: "Brisbane",
    },
    relatedLinks: [
      { label: "All features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Cleaning business app", href: "/cleaning-business-scheduling-invoicing-app-australia" },
      { label: "Handyman app", href: "/handyman-job-management-route-invoicing-app-australia" },
    ],
  },

  // =========================================================================
  // 2. CLEANING
  // =========================================================================
  {
    slug: "cleaning-business-scheduling-invoicing-app-australia",
    title: "Cleaning Business Scheduling & Invoicing App Australia",
    metaDescription:
      "DayRoute is the scheduling and invoicing app for Australian cleaning businesses. Plan daily cleaning routes, manage clients, track expenses, and get paid faster.",
    h1: "Run your cleaning business from your phone",
    shortName: "Cleaning",
    intro:
      "Whether you clean homes, offices, or holiday rentals, your day is a series of back-to-back appointments across town. DayRoute keeps your schedule tight, your routes efficient, and your invoices sent before you leave the driveway. Built for solo cleaners and small cleaning teams across Australia.",
    painPoints: [
      {
        title: "Clients get anxious when you're late",
        description:
          "Arriving late — or without warning — frustrates clients and damages trust. You need accurate ETAs and a way to let people know you're on the way.",
      },
      {
        title: "Juggling keys, codes, and client preferences",
        description:
          "Every home has different entry instructions, preferred products, and special requests. Keeping that info in your head doesn't scale.",
      },
      {
        title: "Chasing payments wastes your evenings",
        description:
          "If you wait until the end of the week to invoice, clients forget and you spend nights following up. Sending invoices on the spot gets you paid faster.",
      },
    ],
    features: [
      {
        title: "Optimised cleaning routes",
        description:
          "Enter your appointments and DayRoute orders them by distance and time. Less windshield time, more houses cleaned per day.",
      },
      {
        title: "Client notes and access details",
        description:
          "Store lock codes, alarm instructions, pet info, and product preferences against each client. Available at a glance before you walk in.",
      },
      {
        title: "'On My Way' ETA messages",
        description:
          "Send a one-tap SMS or iMessage to your next client with your estimated arrival time. No more 'where are you?' calls.",
      },
      {
        title: "Instant invoicing after each clean",
        description:
          "Tap 'Complete', review the job details, and send a professional invoice immediately. Supports hourly or fixed-price billing.",
      },
    ],
    faqs: [
      {
        question: "Can I send my clients an ETA before I arrive?",
        answer:
          "Yes. DayRoute has a one-tap 'On My Way' feature that sends an SMS or iMessage with your estimated arrival time based on live traffic.",
      },
      {
        question: "Does DayRoute handle both hourly and flat-rate cleaning jobs?",
        answer:
          "Yes. You can set each client to hourly or fixed pricing. DayRoute calculates the amount automatically when you complete the job.",
      },
      {
        question: "Can I store entry codes and client preferences?",
        answer:
          "Absolutely. Each client profile has a notes field where you can store lock codes, alarm PINs, pet details, and cleaning preferences.",
      },
    ],
    testimonial: {
      quote:
        "My clients love knowing exactly when I'll arrive. The route planning saves me 30 minutes every day — and I get paid the same afternoon.",
      name: "Sarah",
      role: "Cleaning Business Owner",
      location: "Sydney",
    },
    relatedLinks: [
      { label: "All features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Gardening business app", href: "/gardening-business-scheduling-invoicing-app-australia" },
      { label: "NDIS support worker app", href: "/ndis-support-worker-route-planner-invoicing-app-australia" },
    ],
  },

  // =========================================================================
  // 3. HANDYMAN
  // =========================================================================
  {
    slug: "handyman-job-management-route-invoicing-app-australia",
    title: "Handyman Job Management, Route & Invoicing App Australia",
    metaDescription:
      "DayRoute is the job management app for Australian handymen. Schedule jobs, plan routes between sites, snap receipts for materials, and invoice clients on the spot.",
    h1: "Job management and invoicing for Australian handymen",
    shortName: "Handyman",
    intro:
      "A typical handyman day might include a tap repair in Parramatta, a fence fix in Castle Hill, and a door hang in Penrith — all before 3 pm school pick-up. DayRoute helps you fit it all in by planning the fastest route, storing job details and photos, and getting invoices sent before you leave the driveway.",
    painPoints: [
      {
        title: "Every job is different, in a different suburb",
        description:
          "Unlike trades with regular sites, handymen jump between one-off jobs all over town. Without a route plan, you waste time and fuel driving back and forth.",
      },
      {
        title: "Quoting and invoicing on paper is slow",
        description:
          "Scribbling quotes on the back of a business card doesn't look professional. And chasing handwritten invoices is a nightmare come tax time.",
      },
      {
        title: "Tracking materials and receipts is messy",
        description:
          "A trip to Bunnings for every job means a wallet full of receipts. Losing even one means paying more tax than you should.",
      },
    ],
    features: [
      {
        title: "Smart route planning between job sites",
        description:
          "Enter your jobs and let DayRoute order them by distance. One tap opens navigation in Google Maps or Apple Maps.",
      },
      {
        title: "Before & after job photos",
        description:
          "Snap before-and-after photos for each job. Great for client records, disputes, and showing off your work on social media.",
      },
      {
        title: "AI receipt scanner",
        description:
          "Point your camera at a receipt from Bunnings, Mitre 10, or any supplier. DayRoute reads the total, GST, and items automatically.",
      },
      {
        title: "Professional invoices in seconds",
        description:
          "Create an invoice from the completed job with one tap. Line items, GST, and client details are pre-filled. Send via SMS or email.",
      },
    ],
    faqs: [
      {
        question: "Can I take before-and-after photos of handyman jobs?",
        answer:
          "Yes. DayRoute lets you attach before and after photos to each job. They're stored with the job record and can be included in invoices or reports.",
      },
      {
        question: "Does the receipt scanner work with Bunnings and Mitre 10 receipts?",
        answer:
          "Yes. The AI scanner reads receipts from any Australian retailer — Bunnings, Mitre 10, Total Tools, and more. It extracts the merchant, items, GST, and total automatically.",
      },
      {
        question: "Can I manage one-off jobs and regular maintenance clients?",
        answer:
          "Absolutely. DayRoute handles both one-off jobs and recurring bookings. Set up weekly or monthly visits for regular clients, and add one-off callouts on any day.",
      },
    ],
    testimonial: {
      quote:
        "I used to waste an hour a day driving back and forth across Sydney. Now I finish by 3 and actually pick the kids up on time.",
      name: "Dave",
      role: "Handyman",
      location: "Sydney",
    },
    relatedLinks: [
      { label: "All features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Pressure washing app", href: "/pressure-washing-business-route-invoicing-app-australia" },
      { label: "Pest control app", href: "/pest-control-job-scheduling-route-app-australia" },
    ],
  },

  // =========================================================================
  // 4. PRESSURE WASHING
  // =========================================================================
  {
    slug: "pressure-washing-business-route-invoicing-app-australia",
    title: "Pressure Washing Business Route & Invoicing App Australia",
    metaDescription:
      "DayRoute helps Australian pressure washing businesses plan routes, schedule jobs, track equipment costs, and invoice clients on the spot. Try free for 7 days.",
    h1: "Route planning and invoicing for pressure washing businesses",
    shortName: "Pressure Washing",
    intro:
      "Pressure washing is a high-volume, location-heavy trade — you might hit five driveways, two decks, and a commercial frontage in a single day. DayRoute keeps your schedule locked in, your routes efficient, and your invoices sent while the concrete is still drying. Built for solo pressure washers and small crews across Australia.",
    painPoints: [
      {
        title: "Jobs are spread across wide areas",
        description:
          "Driveways and decks don't cluster neatly. Without route optimisation you'll drive past jobs you could've grouped together.",
      },
      {
        title: "Equipment and chemical costs add up fast",
        description:
          "Detergents, surface cleaners, tip replacements, fuel — it's a lot of expenses to track. Missing a receipt means overpaying on tax.",
      },
      {
        title: "Seasonal demand makes scheduling unpredictable",
        description:
          "Spring and pre-sale clean-ups flood your calendar. Without a system you double-book, forget quotes, and lose work to competitors.",
      },
    ],
    features: [
      {
        title: "Multi-stop route optimisation",
        description:
          "Plot all your jobs on the map and let DayRoute find the fastest order. Spend more time washing and less time driving.",
      },
      {
        title: "Job-specific notes and photos",
        description:
          "Record surface type, pressure settings, chemicals used, and before-and-after photos for every job. Handy for repeat visits and disputes.",
      },
      {
        title: "Expense tracking with AI receipt scanner",
        description:
          "Snap receipts for chemicals, fuel, and equipment. The AI extracts merchant, total, and GST — sorted and ready for BAS.",
      },
      {
        title: "Send invoices before you leave the site",
        description:
          "Complete the job, tap invoice, and send. Fixed-price or hourly — DayRoute handles both. Clients pay faster when invoices arrive immediately.",
      },
    ],
    faqs: [
      {
        question: "Can I record before-and-after photos for pressure washing jobs?",
        answer:
          "Yes. DayRoute supports before and after photos on every job. They're great for showing clients the result and for marketing your business on social media.",
      },
      {
        question: "Does DayRoute track chemical and equipment expenses?",
        answer:
          "Yes. Use the AI receipt scanner or manual entry to log chemicals, tips, hoses, fuel, and any other costs. Everything is categorised and GST-tracked.",
      },
      {
        question: "Can I handle seasonal surges in bookings?",
        answer:
          "Absolutely. DayRoute's scheduling handles any volume. Set up recurring clients for regular washes and add one-off jobs as they come in.",
      },
    ],
    testimonial: {
      quote:
        "I do 6-8 driveways a day across the Gold Coast. DayRoute shaved 40 minutes off my drive time and my invoices go out before I pack up the trailer.",
      name: "Mick",
      role: "Pressure Washing Business Owner",
      location: "Gold Coast",
    },
    relatedLinks: [
      { label: "All features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Handyman app", href: "/handyman-job-management-route-invoicing-app-australia" },
      { label: "Mobile detailing app", href: "/mobile-detailing-route-invoicing-app-australia" },
    ],
  },

  // =========================================================================
  // 5. PEST CONTROL
  // =========================================================================
  {
    slug: "pest-control-job-scheduling-route-app-australia",
    title: "Pest Control Job Scheduling & Route App Australia",
    metaDescription:
      "DayRoute helps Australian pest control technicians schedule inspections, plan efficient routes, track chemicals used, and invoice clients — all from your phone.",
    h1: "Job scheduling and route planning for pest control technicians",
    shortName: "Pest Control",
    intro:
      "Pest control means balancing regular inspections with emergency callouts — cockroaches don't wait for your calendar. DayRoute helps you plan efficient routes between appointments, record treatments and chemicals per property, and invoice on completion. Built for solo pest techs and small teams across Australia.",
    painPoints: [
      {
        title: "Emergency callouts break your planned schedule",
        description:
          "A termite sighting means dropping everything. Without a flexible scheduling tool, the rest of your day falls apart.",
      },
      {
        title: "Recording treatments per property is a compliance requirement",
        description:
          "Regulators and commercial clients need records of what was applied, when, and where. Paper logbooks get lost in the van.",
      },
      {
        title: "Driving between inspections burns profit",
        description:
          "Residential pest jobs are short — 30 to 45 minutes. If you drive 40 minutes between them, you're losing money on every trip.",
      },
    ],
    features: [
      {
        title: "Flexible scheduling with route re-optimisation",
        description:
          "Slot in an emergency callout and DayRoute re-calculates your route. The rest of your day adjusts automatically.",
      },
      {
        title: "Job notes for treatment records",
        description:
          "Record chemicals used, bait station locations, and treatment areas per property. Notes carry over to repeat visits.",
      },
      {
        title: "Vehicle logbook for tax",
        description:
          "GPS trip recording logs every kilometre driven. Distinguish business and personal trips for ATO-compliant records.",
      },
      {
        title: "Instant invoicing with line items",
        description:
          "Invoice for inspection fees, treatment costs, and follow-up visits — all itemised with GST. Send via SMS or email immediately.",
      },
    ],
    faqs: [
      {
        question: "Can I record which chemicals I used at each property?",
        answer:
          "Yes. Use the job notes field to record chemical names, application rates, and bait station locations. Notes are saved per job and carry over to repeat visits.",
      },
      {
        question: "Does DayRoute handle emergency pest callouts?",
        answer:
          "Yes. Add an urgent job at any time and DayRoute re-optimises your route for the rest of the day. You won't miss existing appointments.",
      },
      {
        question: "Can I track kilometres for tax deductions?",
        answer:
          "Absolutely. The GPS vehicle logbook records every trip with start/end odometer, distance, and purpose. Export the data for your accountant or BAS return.",
      },
    ],
    testimonial: {
      quote:
        "When you're dealing with pests, timing matters. DayRoute lets me slot in emergency jobs without blowing up the rest of my schedule.",
      name: "Dave",
      role: "Pest Control Technician",
      location: "Newcastle",
    },
    relatedLinks: [
      { label: "All features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Handyman app", href: "/handyman-job-management-route-invoicing-app-australia" },
      { label: "NDIS support worker app", href: "/ndis-support-worker-route-planner-invoicing-app-australia" },
    ],
  },

  // =========================================================================
  // 6. MOBILE DETAILING
  // =========================================================================
  {
    slug: "mobile-detailing-route-invoicing-app-australia",
    title: "Mobile Detailing Route & Invoicing App Australia",
    metaDescription:
      "DayRoute is the route planning and invoicing app for Australian mobile car detailers. Schedule appointments, plan efficient routes, and invoice on the spot.",
    h1: "Route planning and invoicing for mobile car detailers",
    shortName: "Mobile Detailing",
    intro:
      "Mobile detailing is all about fitting as many cars into your day as possible without burning half your time on the road. DayRoute helps you plan tight routes between bookings, manage client details and vehicle info, track product costs, and send invoices before you pack up your gear. Built for solo detailers and small mobile detailing teams.",
    painPoints: [
      {
        title: "Appointments are scattered across the city",
        description:
          "A morning detail in the CBD, a lunchtime SUV in the eastern suburbs, an afternoon fleet job in the west. Without a route plan, you spend as much time driving as detailing.",
      },
      {
        title: "Keeping track of vehicle details and client preferences",
        description:
          "Some clients want a basic wash, others want a full ceramic coat. Remembering who wants what — and which car — gets messy fast.",
      },
      {
        title: "Product costs eat into margins if you don't track them",
        description:
          "Ceramic coatings, polishing compounds, microfibre cloths — they're not cheap. If you're not tracking expenses properly, you're probably under-pricing jobs.",
      },
    ],
    features: [
      {
        title: "Route optimisation for mobile detailing",
        description:
          "Enter your appointments and DayRoute calculates the fastest route. Less driving means more cars detailed per day.",
      },
      {
        title: "Client and vehicle profiles",
        description:
          "Store client names, addresses, vehicle make/model, and service preferences. Everything's at your fingertips before each job.",
      },
      {
        title: "Product expense tracking",
        description:
          "Log product costs per job. Snap receipts and let the AI scanner extract GST and totals. Know your true cost per detail.",
      },
      {
        title: "Professional invoicing from your phone",
        description:
          "Send a polished invoice via SMS or email the second you finish. Supports fixed-price packages and hourly rates.",
      },
    ],
    faqs: [
      {
        question: "Can I store vehicle details for each client?",
        answer:
          "Yes. Each client profile in DayRoute includes a notes field where you can store vehicle make, model, colour, and any specific detailing preferences.",
      },
      {
        question: "Does DayRoute support fixed-price detailing packages?",
        answer:
          "Yes. Set up fixed prices per client or per service type. When you complete the job, the invoice is pre-filled with the agreed amount.",
      },
      {
        question: "Can I track how much I spend on detailing products?",
        answer:
          "Absolutely. Log expenses by category (products, fuel, equipment) and snap receipts with the AI scanner. GST is tracked automatically for BAS time.",
      },
    ],
    testimonial: {
      quote:
        "I detail 5-6 cars a day across Melbourne. DayRoute saves me 30+ minutes of driving and my invoices go out before I leave the client's driveway.",
      name: "Chris",
      role: "Mobile Detailer",
      location: "Melbourne",
    },
    relatedLinks: [
      { label: "All features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Pressure washing app", href: "/pressure-washing-business-route-invoicing-app-australia" },
      { label: "Cleaning business app", href: "/cleaning-business-scheduling-invoicing-app-australia" },
    ],
  },

  // =========================================================================
  // 7. NDIS SUPPORT WORKER
  // =========================================================================
  {
    slug: "ndis-support-worker-route-planner-invoicing-app-australia",
    title: "NDIS Support Worker Route Planner & Invoicing App Australia",
    metaDescription:
      "DayRoute helps Australian NDIS support workers and providers plan participant visit routes, track travel time for reimbursement, and create NDIS-compatible invoices.",
    h1: "Route planning and invoicing for NDIS support workers",
    shortName: "NDIS Support",
    intro:
      "NDIS support workers and sole-trader providers visit multiple participants each day — often across wide service areas. Reliable arrival times matter because participants plan their entire day around your visit. DayRoute helps you plan efficient routes, record travel for reimbursement, and create invoices that align with NDIS line items. Built for Australian disability support professionals.",
    painPoints: [
      {
        title: "Participants need reliable arrival times",
        description:
          "Being late disrupts a participant's routine and can cause real distress. Accurate ETAs and 'on my way' notifications build trust and reduce anxiety.",
      },
      {
        title: "Travel time and kilometres need to be recorded for claims",
        description:
          "NDIS travel claims require accurate records. Estimating from memory or Google Maps after the fact is inaccurate and time-consuming.",
      },
      {
        title: "Invoicing to plan managers and NDIA requires specific formats",
        description:
          "NDIS invoices need line item numbers, correct support categories, and participant references. Generic invoice tools don't support this.",
      },
    ],
    features: [
      {
        title: "Participant visit route planning",
        description:
          "Enter your participant visits and DayRoute optimises the order. See accurate drive times between visits and plan realistic schedules.",
      },
      {
        title: "GPS travel logging for reimbursement",
        description:
          "The vehicle logbook records every trip with start/end locations, distance, and time. Export for NDIS travel claims.",
      },
      {
        title: "'On My Way' arrival notifications",
        description:
          "Send a one-tap message to participants (or their carers) with your estimated arrival time. Reduces no-answer doors and anxiety.",
      },
      {
        title: "NDIS-compatible invoice templates",
        description:
          "Create invoices with NDIS support item numbers, participant details, and plan manager info. Send directly via email or SMS.",
      },
    ],
    faqs: [
      {
        question: "Does DayRoute support NDIS line item numbers on invoices?",
        answer:
          "Yes. DayRoute's invoice templates include fields for NDIS support item numbers, participant references, and plan manager details — making it easy to submit compliant invoices.",
      },
      {
        question: "Can I record travel time and kilometres for NDIS travel claims?",
        answer:
          "Absolutely. The GPS vehicle logbook tracks every trip automatically. Export the data for travel reimbursement claims with distance, time, and purpose.",
      },
      {
        question: "Is DayRoute suitable for NDIS sole traders and small providers?",
        answer:
          "Yes. The Pro plan is ideal for sole-trader support workers. For organisations with multiple support workers, the Team plan supports up to 10 users with shared scheduling.",
      },
      {
        question: "Can I send arrival notifications to participants or carers?",
        answer:
          "Yes. The 'On My Way' feature sends an SMS or iMessage with your ETA to the participant's phone number — or their carer's — with a single tap.",
      },
    ],
    testimonial: {
      quote:
        "Accurate arrival times make a real difference for our participants. They can plan their day around our visits instead of waiting by the window.",
      name: "Emma",
      role: "NDIS Support Coordinator",
      location: "Perth",
    },
    relatedLinks: [
      { label: "All features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Cleaning business app", href: "/cleaning-business-scheduling-invoicing-app-australia" },
      { label: "Gardening business app", href: "/gardening-business-scheduling-invoicing-app-australia" },
    ],
  },
];

/**
 * Look up an industry page by slug.
 * Returns undefined if not found (used by the dynamic route to 404).
 */
export function getIndustryBySlug(slug: string): IndustryPage | undefined {
  return industryPages.find((p) => p.slug === slug);
}

/**
 * Get all slugs (used by generateStaticParams).
 */
export function getAllIndustrySlugs(): string[] {
  return industryPages.map((p) => p.slug);
}
