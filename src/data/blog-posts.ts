/**
 * ============================================================================
 * DayRoute Blog — Content Data
 * ============================================================================
 *
 * Each entry produces a blog post at /blog/{slug}.
 * Articles are designed to attract backlinks from industry sites,
 * rank for informational long-tail keywords, and drive traffic
 * to DayRoute's product and industry pages.
 *
 * HOW TO ADD A NEW POST:
 * 1. Add an entry to the `blogPosts` array below.
 * 2. Write genuine, useful content — not keyword-stuffed filler.
 * 3. Include relatedPages linking to relevant product/industry pages.
 * 4. Run `npm run build` to verify.
 * 5. Push to GitHub — Vercel auto-deploys.
 *
 * RULES:
 * - Australian English throughout.
 * - Never mention competitor brand names.
 * - Every claim must be truthful and verifiable.
 * - Each article must be genuinely useful standalone content.
 */

export interface BlogPost {
  slug: string;
  title: string;
  metaDescription: string;
  publishDate: string;
  updatedDate?: string;
  author: string;
  category: string;
  readingTime: string;
  /** Short summary shown on the blog index page. */
  excerpt: string;
  /** Full article body — array of content sections. */
  sections: {
    heading: string;
    content: string;
    bullets?: string[];
  }[];
  /** Related product/industry pages to link to. */
  relatedPages: { label: string; href: string }[];
  /** Tags for filtering and SEO. */
  tags: string[];
}

// =============================================================================
// BLOG POSTS
// =============================================================================

export const blogPosts: BlogPost[] = [
  // =========================================================================
  // 1. ROUTE PLANNING FOR TRADIES
  // =========================================================================
  {
    slug: "how-to-plan-efficient-multi-stop-routes-for-service-businesses",
    title: "How to Plan Efficient Multi-Stop Routes for Service Businesses",
    metaDescription:
      "Learn how to plan efficient daily routes for your service business. Reduce driving time, save fuel, and fit more jobs into every day.",
    publishDate: "2026-02-23",
    author: "DayRoute Team",
    category: "Route Planning",
    readingTime: "5 min read",
    excerpt:
      "If you visit multiple job sites each day, the order you drive between them can mean the difference between finishing at 3 pm or 6 pm. Here's how to plan efficient routes that save fuel, reduce stress, and fit more billable work into every day.",
    sections: [
      {
        heading: "Why job order matters more than you think",
        content:
          "Most field workers visit jobs in the order they were booked — not the order that makes geographic sense. A plumber might drive from the northern suburbs to the south, then back north, then west. That's hours of wasted driving every week. Studies show that optimising a 10-stop route can save 30-60 minutes per day compared to visiting stops in booking order.",
      },
      {
        heading: "The cost of bad routing",
        content:
          "Wasted driving isn't just about time. It costs real money.",
        bullets: [
          "Fuel costs: At $2/litre, an extra 50 km per day costs around $3,500 per year",
          "Vehicle wear: More kilometres means more servicing, tyres, and depreciation",
          "Lost revenue: Every hour driving is an hour you could be billing a client",
          "Client frustration: Late arrivals damage trust and cost you repeat business",
          "Personal toll: Getting home late every day burns out even the toughest tradie",
        ],
      },
      {
        heading: "How to optimise your daily route",
        content:
          "You don't need a maths degree to plan better routes. Here's a practical approach that works for any service business.",
        bullets: [
          "Group jobs by area: Try to cluster morning jobs in one suburb and afternoon jobs in another",
          "Start and end near home: Your first and last jobs should be closest to where you start and finish",
          "Account for time windows: If a client needs you between 9-10 am, lock that in first and build around it",
          "Leave buffer time: Traffic, parking, and jobs running over are inevitable — build in 10-15 minutes between stops",
          "Use a route planning app: Tools like DayRoute calculate the optimal order automatically using real distance data",
        ],
      },
      {
        heading: "What about same-day changes?",
        content:
          "Real life doesn't follow a perfect plan. Clients cancel, emergency callouts come in, and jobs run over time. The best approach is to use a tool that lets you re-optimise mid-day. Add a new job, remove a cancellation, and the route recalculates automatically. This flexibility is what separates professionals who are always on time from those who are always apologising.",
      },
      {
        heading: "How much can you actually save?",
        content:
          "Australian field workers who switch from manual planning to route optimisation typically report saving 30-60 minutes of driving per day. Over a 5-day week, that's 2.5-5 hours back. Over a year, that's 130-260 hours — or roughly 6-13 extra working weeks. That time translates directly into either more billable jobs or getting home earlier. Most service businesses find the savings pay for a route planning tool within the first week.",
      },
    ],
    relatedPages: [
      { label: "Route planning feature", href: "/route-planning-for-service-businesses-australia" },
      { label: "Mileage logbook & receipts", href: "/mileage-logbook-receipts-for-service-businesses-australia" },
      { label: "All industries", href: "/industries" },
    ],
    tags: ["route planning", "multi-stop routing", "fuel savings", "field service", "tradies"],
  },

  // =========================================================================
  // 2. ATO VEHICLE LOGBOOK
  // =========================================================================
  {
    slug: "ato-vehicle-logbook-requirements-for-tradies-2026",
    title: "ATO Vehicle Logbook Requirements for Tradies in 2026",
    metaDescription:
      "What the ATO requires for vehicle logbook records in 2026. A plain-English guide for tradies, cleaners, and field workers claiming work kilometres.",
    publishDate: "2026-02-23",
    author: "DayRoute Team",
    category: "Tax & BAS",
    readingTime: "6 min read",
    excerpt:
      "If you use your vehicle for work, you can claim a tax deduction — but only if you keep proper records. Here's what the ATO actually requires for a vehicle logbook and how to avoid the mistakes that trigger audits.",
    sections: [
      {
        heading: "Why the ATO cares about your logbook",
        content:
          "The ATO allows you to claim work-related vehicle expenses as a tax deduction. But they need proof that the kilometres you claim were genuinely for work. A vehicle logbook is the gold standard — it records every trip with enough detail to satisfy an audit. Without one, you're limited to the cents-per-kilometre method, which caps at 5,000 km regardless of how much you actually drive.",
      },
      {
        heading: "What the ATO requires in a logbook",
        content:
          "A compliant logbook must be kept for a continuous 12-week period and must record every trip — both business and personal — during that period.",
        bullets: [
          "Start date and time of each trip",
          "End date and time of each trip",
          "Odometer reading at start and end",
          "Total kilometres for the trip",
          "Purpose of the trip (business or personal)",
          "Description of the business purpose (e.g. 'Travel to client site — Smith residence, Parramatta')",
        ],
      },
      {
        heading: "How long is a logbook valid?",
        content:
          "Once you complete a valid 12-week logbook, you can use the business-use percentage it establishes for up to 5 years — as long as your circumstances don't change significantly. If you change jobs, get a new vehicle, or your work pattern changes substantially, you need to do a new 12-week period.",
      },
      {
        heading: "Common mistakes that trigger audits",
        content:
          "The ATO data-matches vehicle claims against income and industry norms. These are the red flags.",
        bullets: [
          "Claiming 100% business use (almost nobody drives exclusively for work)",
          "Round numbers for every trip (e.g. always exactly 25 km)",
          "No logbook at all — just estimates",
          "Logbook doesn't cover a full 12-week period",
          "Missing odometer readings",
          "Claiming the same percentage year after year without a current logbook",
        ],
      },
      {
        heading: "Paper logbook vs. app-based logbook",
        content:
          "The ATO accepts both paper and digital logbooks — as long as they contain the required information. The practical advantage of an app-based logbook is accuracy. GPS records your exact start and end locations, calculates distance automatically, and timestamps every trip. No more estimating or forgetting to write it down at the end of the day. Apps like DayRoute record trips with one tap and let you mark each trip as business or personal.",
      },
      {
        heading: "What you can claim with a logbook",
        content:
          "Once you have a valid logbook, you can claim the business-use percentage of your actual vehicle expenses: fuel, registration, insurance, servicing, tyres, depreciation, and interest on a car loan. For a tradie driving 40,000 km per year with 75% business use, this can be worth $8,000-$12,000 in deductions — significantly more than the cents-per-kilometre cap of 5,000 km.",
      },
    ],
    relatedPages: [
      { label: "Mileage logbook & receipts", href: "/mileage-logbook-receipts-for-service-businesses-australia" },
      { label: "Mobile invoicing", href: "/mobile-invoicing-after-job-completion-iphone" },
      { label: "Handyman app", href: "/handyman-job-management-route-invoicing-app-australia" },
    ],
    tags: ["ATO", "vehicle logbook", "tax deductions", "tradies", "BAS", "work kilometres"],
  },

  // =========================================================================
  // 3. NDIS TRAVEL CLAIMS
  // =========================================================================
  {
    slug: "ndis-travel-claims-what-support-workers-can-claim",
    title: "NDIS Travel Claims: What Support Workers Can and Can't Claim",
    metaDescription:
      "A plain-English guide to NDIS travel claims for support workers. What you can claim, how to record it, and how to invoice plan managers correctly.",
    publishDate: "2026-02-23",
    author: "DayRoute Team",
    category: "NDIS",
    readingTime: "6 min read",
    excerpt:
      "NDIS travel can be claimed under specific conditions — but the rules are detailed and getting it wrong means rejected invoices or compliance issues. Here's a practical guide for support workers and sole-trader providers.",
    sections: [
      {
        heading: "When NDIS travel is claimable",
        content:
          "Travel is claimable when a support worker needs to travel to deliver a support to a participant. This typically applies when the support is delivered at the participant's home or in the community — not at a centre or office. The key principle is that travel must be directly related to delivering a funded support.",
      },
      {
        heading: "What counts as claimable travel",
        content:
          "The NDIS Price Guide specifies what travel is claimable and at what rate.",
        bullets: [
          "Travel between participant visits during a working day",
          "Travel from your last participant visit to your home/office (in some circumstances)",
          "Travel time is charged at the relevant support item rate",
          "Kilometres may be claimable as a separate line item depending on the service agreement",
          "Travel time is typically capped — check the current Price Guide for limits",
        ],
      },
      {
        heading: "What is NOT claimable",
        content:
          "Not all travel qualifies. Understanding the exclusions prevents rejected claims.",
        bullets: [
          "Travel from home to your first participant of the day (commuting)",
          "Travel that is unreasonably long due to poor planning",
          "Travel to training, meetings, or non-participant activities",
          "Travel already included in the support item price (some items bundle travel)",
        ],
      },
      {
        heading: "How to record travel correctly",
        content:
          "Accurate records protect you during audits and make invoicing faster. For each claimable trip, record the start location, end location, distance in kilometres, time spent travelling, and the participant the travel relates to. GPS-based logbook apps make this automatic — start the trip when you leave one participant and end it when you arrive at the next.",
      },
      {
        heading: "Invoicing travel to plan managers",
        content:
          "When invoicing for travel, use the correct NDIS support item number for travel. Include the participant's NDIS number, the date, the distance or time, and the rate. Plan managers expect itemised invoices — lumping travel into the support charge without separating it can cause delays or rejections.",
      },
      {
        heading: "Tips for reducing travel between participants",
        content:
          "Less travel means more time with participants and fewer claims to manage. Group participants by area when scheduling your day. Use route optimisation to find the shortest path between visits. Build in realistic buffer time so you're not rushing between appointments. And communicate ETAs to participants — they appreciate knowing when to expect you.",
      },
    ],
    relatedPages: [
      { label: "NDIS support worker app", href: "/ndis-support-worker-route-planner-invoicing-app-australia" },
      { label: "Mileage logbook & receipts", href: "/mileage-logbook-receipts-for-service-businesses-australia" },
      { label: "Route planning", href: "/route-planning-for-service-businesses-australia" },
    ],
    tags: ["NDIS", "travel claims", "support workers", "invoicing", "plan managers"],
  },

  // =========================================================================
  // 4. BEFORE AND AFTER PHOTOS
  // =========================================================================
  {
    slug: "why-before-and-after-photos-protect-your-service-business",
    title: "Why Before-and-After Photos Protect Your Service Business",
    metaDescription:
      "Before-and-after photos prevent client disputes, prove your work quality, and help market your service business. Here's how to make them part of every job.",
    publishDate: "2026-02-23",
    author: "DayRoute Team",
    category: "Business Tips",
    readingTime: "4 min read",
    excerpt:
      "A client says the driveway wasn't cleaned properly. A homeowner claims you damaged the garden. A tenant disputes the bond clean. In every case, timestamped before-and-after photos would have settled it in seconds.",
    sections: [
      {
        heading: "The disputes that cost you money",
        content:
          "Every service business eventually faces a client who disputes the quality of work, claims damage that was pre-existing, or refuses to pay because they 'expected more.' Without evidence, these disputes come down to your word against theirs — and the client usually wins. A simple before-and-after photo habit eliminates this risk entirely.",
      },
      {
        heading: "Three reasons to photograph every job",
        content:
          "Beyond dispute protection, photos serve your business in multiple ways.",
        bullets: [
          "Proof of work: Timestamped photos show exactly what you did and when. Invaluable for insurance claims, bond disputes, and payment disagreements.",
          "Marketing content: Before-and-after transformations are the most engaging content on social media. A mossy driveway turned bright white, an overgrown garden made neat — these posts get shared and generate leads.",
          "Quality control: Reviewing your own before-and-after photos helps you maintain consistent quality and spot areas for improvement.",
        ],
      },
      {
        heading: "How to take useful before-and-after photos",
        content:
          "Not all job photos are equally useful. Follow these simple rules.",
        bullets: [
          "Same angle: Take the before and after from the same position and angle so the comparison is clear",
          "Wide shot first: Capture the full area before zooming into details",
          "Include context: Show enough of the surroundings so it's clearly the same location",
          "Good lighting: Natural daylight works best — avoid harsh shadows or dark indoor shots",
          "Take them before you start and after you finish: Not halfway through when you remember",
        ],
      },
      {
        heading: "Keeping photos organised",
        content:
          "The biggest problem with job photos isn't taking them — it's finding them later. If they're in your camera roll mixed with personal photos, you'll never find the right one when a client calls to complain. The solution is to attach photos directly to the job record. Apps like DayRoute let you snap before-and-after photos from the job screen — they're automatically timestamped and linked to the client and date.",
      },
    ],
    relatedPages: [
      { label: "Before & after photos feature", href: "/before-after-photos-for-service-jobs" },
      { label: "Mobile invoicing", href: "/mobile-invoicing-after-job-completion-iphone" },
      { label: "Pressure washing app", href: "/pressure-washing-business-route-invoicing-app-australia" },
    ],
    tags: ["before after photos", "proof of work", "client disputes", "marketing", "service business"],
  },

  // =========================================================================
  // 5. POOL SERVICE COSTS
  // =========================================================================
  {
    slug: "how-much-does-it-cost-to-run-a-pool-service-round-in-australia",
    title: "How Much Does It Cost to Run a Pool Service Round in Australia?",
    metaDescription:
      "Real costs of running a pool service business in Australia. Chemicals, fuel, equipment, insurance, and how to price your services to stay profitable.",
    publishDate: "2026-02-23",
    author: "DayRoute Team",
    category: "Business Planning",
    readingTime: "6 min read",
    excerpt:
      "Thinking about starting a pool service business? Already running one but not sure if your pricing is right? Here's a realistic breakdown of what it actually costs to service pools across Australian suburbs.",
    sections: [
      {
        heading: "The real costs most pool techs underestimate",
        content:
          "Many pool service operators set their prices based on what competitors charge — without calculating their own actual costs. This leads to underpricing, especially when chemical costs, fuel, and vehicle expenses are factored in. Understanding your true cost per pool is the foundation of a profitable business.",
      },
      {
        heading: "Chemical costs per pool",
        content:
          "Chemical costs vary by pool size, condition, and season, but here are typical ranges for Australian conditions.",
        bullets: [
          "Chlorine (liquid or granular): $3-8 per visit depending on pool size and demand",
          "pH adjusters (acid/soda ash): $1-3 per visit",
          "Stabiliser (cyanuric acid): $2-5 per visit (seasonal, not every visit)",
          "Salt (for salt chlorinated pools): $5-15 per top-up (every few months)",
          "Algaecide and specialty treatments: $5-20 per treatment (as needed)",
          "Average total chemical cost per regular visit: $5-15",
        ],
      },
      {
        heading: "Fuel and vehicle costs",
        content:
          "Driving between pools is your second biggest expense after chemicals. A typical pool tech in suburban Sydney or Melbourne drives 60-120 km per day.",
        bullets: [
          "Fuel: $15-30 per day at current prices (depending on vehicle and distances)",
          "Vehicle servicing: $2,000-4,000 per year for a ute or van",
          "Tyres: $800-1,500 per set, replaced every 40,000-60,000 km",
          "Registration and insurance: $2,000-4,000 per year",
          "Depreciation: $3,000-8,000 per year depending on vehicle age and value",
        ],
      },
      {
        heading: "Equipment and insurance",
        content:
          "Ongoing equipment costs and business insurance add up.",
        bullets: [
          "Test kit supplies: $200-500 per year",
          "Replacement parts (filter cartridges, O-rings, etc.): $500-1,500 per year",
          "Public liability insurance: $500-1,200 per year",
          "Professional indemnity: $400-800 per year",
          "Business registration and accounting: $500-1,500 per year",
        ],
      },
      {
        heading: "What should you charge?",
        content:
          "With all costs factored in, a solo pool tech servicing 60 pools per week needs to charge $50-80 per regular visit to maintain healthy margins. Premium services (green pool recovery, equipment repairs) should be priced at $100-200+ depending on scope. The key is tracking your actual costs per pool — not guessing. Logging every chemical purchase, fuel receipt, and kilometre driven gives you the data to price confidently.",
      },
    ],
    relatedPages: [
      { label: "Pool service app", href: "/pool-service-business-scheduling-invoicing-app-australia" },
      { label: "Mileage logbook & receipts", href: "/mileage-logbook-receipts-for-service-businesses-australia" },
      { label: "Route planning", href: "/route-planning-for-service-businesses-australia" },
    ],
    tags: ["pool service", "business costs", "pricing", "chemicals", "Australia"],
  },

  // =========================================================================
  // 6. CLEANING ROUTE PLANNING
  // =========================================================================
  {
    slug: "how-to-plan-a-daily-cleaning-route-that-saves-time-and-fuel",
    title: "How to Plan a Daily Cleaning Route That Saves Time and Fuel",
    metaDescription:
      "Plan efficient daily cleaning routes across suburbs. Reduce driving time, fit more cleans into your day, and keep clients happy with reliable arrival times.",
    publishDate: "2026-02-23",
    author: "DayRoute Team",
    category: "Cleaning Business",
    readingTime: "5 min read",
    excerpt:
      "A well-planned cleaning route is the difference between a profitable day and a stressful one. Here's how to sequence your daily cleans to cut driving time, save fuel, and still arrive on time for every client.",
    sections: [
      {
        heading: "Why cleaning businesses need route planning",
        content:
          "Cleaning is a high-frequency, location-dependent business. A solo cleaner might visit 4-6 houses per day, every day, across multiple suburbs. A small team might handle 15-20. Unlike one-off trade jobs, cleaning routes are mostly recurring — the same clients on the same days each week. This makes route optimisation especially powerful because small improvements compound every single week.",
      },
      {
        heading: "The basics of an efficient cleaning route",
        content:
          "Good route planning for cleaners follows a few simple principles.",
        bullets: [
          "Group by area: Monday might be northern suburbs, Tuesday eastern, Wednesday southern. Avoid mixing distant suburbs on the same day.",
          "Sequence by proximity: Visit the closest house next, not the one booked first. A 5-minute detour between each of 5 houses adds 25 minutes to your day.",
          "Account for clean duration: A 2-bedroom unit takes less time than a 5-bedroom house. Put shorter cleans between longer ones if they're nearby.",
          "Plan for access: If a client has a narrow window (e.g. 9-11 am school drop-off), schedule them first and build around it.",
          "Allow buffer time: 10-15 minutes between cleans for driving, parking, and unloading gives you breathing room.",
        ],
      },
      {
        heading: "How to handle recurring clients",
        content:
          "Most cleaning businesses run a weekly or fortnightly rotation. The most efficient approach is to build your 'ideal week' — assign each day to a geographic area and fill it with recurring clients in that zone. When a new client enquires, slot them into the day that covers their suburb rather than the first available gap. This discipline pays off enormously over time as your routes become tighter and your driving distances shrink.",
      },
      {
        heading: "Dealing with cancellations and one-offs",
        content:
          "Cancellations leave gaps. One-off deep cleans and end-of-lease jobs need to fit around your regulars. The key is flexibility without chaos. When a regular cancels, use the gap for a one-off job in the same area. Keep a waitlist of one-off requests and match them to cancellation slots by suburb. A route planning app makes this easier because you can add and remove jobs and see the impact on your drive times instantly.",
      },
      {
        heading: "Sending ETAs to clients",
        content:
          "Cleaning clients are often home during the clean — or need to leave access before they go out. Sending an 'On My Way' message with your estimated arrival time builds trust and reduces the 'where are you?' calls. Most route planning apps can send these automatically based on your current location and traffic conditions. This small touch separates professional operations from casual cleaners.",
      },
    ],
    relatedPages: [
      { label: "Cleaning business app", href: "/cleaning-business-scheduling-invoicing-app-australia" },
      { label: "Route planning", href: "/route-planning-for-service-businesses-australia" },
      { label: "Mobile invoicing", href: "/mobile-invoicing-after-job-completion-iphone" },
    ],
    tags: ["cleaning business", "route planning", "cleaning routes", "fuel savings", "client management"],
  },
];

// =============================================================================
// HELPERS
// =============================================================================

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}
