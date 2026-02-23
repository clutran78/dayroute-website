import { Metadata } from "next";
import Link from "next/link";
import {
  Leaf,
  Sparkles,
  Wrench,
  Droplets,
  Bug,
  Wind,
  Car,
  Cog,
  Shield,
  Heart,
  PawPrint,
  Truck,
  Dumbbell,
  Monitor,
  PartyPopper,
  Settings,
  ChevronRight,
  ArrowRight,
  Check,
  Waves,
  UtensilsCrossed,
  Camera,
  Music,
  Smartphone,
  Flame,
  Sprout,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { AppStoreCTA, SetupCTA } from "../../components/app-store-button";

// =============================================================================
// METADATA
// =============================================================================

export const metadata: Metadata = {
  title: "Industries - DayRoute for Service Businesses in Australia",
  description:
    "DayRoute supports gardeners, cleaners, tradies, pest control, NDIS providers, mobile detailers, and 15+ other service categories across Australia. See how it works for your industry.",
  alternates: { canonical: "https://dayroute.com.au/industries" },
  openGraph: {
    title: "DayRoute for Service Businesses in Australia",
    description:
      "Route planning, job scheduling, invoicing, and expense tracking for every mobile service industry. See your category.",
    url: "https://dayroute.com.au/industries",
    type: "website",
    locale: "en_AU",
    siteName: "DayRoute",
  },
};

// =============================================================================
// CATEGORY DATA
// =============================================================================

interface IndustryCategory {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  description: string;
  exampleJobs: string[];
  keyFeatures: string[];
  /** Link to the dedicated niche page, if one exists. */
  nichePage?: string;
}

const categories: IndustryCategory[] = [
  // --- Matches app "Browse All Service Types" order ---
  {
    icon: Waves,
    name: "Pool & Spa",
    description:
      "Schedule pool servicing rounds, log water testing results, track chemical costs, and invoice clients after each visit.",
    exampleJobs: ["Water testing", "Chemical treatment", "Filter cleaning", "Pool equipment repair"],
    keyFeatures: ["Recurring job scheduling", "Chemical expense tracking", "Route optimisation"],
    nichePage: "/pool-service-business-scheduling-invoicing-app-australia",
  },
  {
    icon: Leaf,
    name: "Garden & Landscape",
    description:
      "Plan weekly mowing rounds, manage seasonal clean-ups, and keep track of recurring clients across multiple suburbs.",
    exampleJobs: ["Lawn mowing", "Hedge trimming", "Tree pruning", "Landscaping projects"],
    keyFeatures: ["Recurring job scheduling", "Route optimisation", "Expense tracking"],
    nichePage: "/gardening-business-scheduling-invoicing-app-australia",
  },
  {
    icon: Sparkles,
    name: "Cleaning",
    description:
      "Sequence your daily cleaning appointments by proximity, store client access codes, and invoice after every visit.",
    exampleJobs: ["House cleaning", "Commercial cleaning", "End-of-lease cleans", "Window cleaning"],
    keyFeatures: ["Client notes & access codes", "'On My Way' ETA messages", "Instant invoicing"],
    nichePage: "/cleaning-business-scheduling-invoicing-app-australia",
  },
  {
    icon: Droplets,
    name: "Pressure Washing",
    description:
      "Plan efficient routes between driveway and deck jobs, track chemical costs, and invoice while the concrete is still drying.",
    exampleJobs: ["Driveway cleaning", "Deck restoration", "Patio cleaning", "Roof cleaning"],
    keyFeatures: ["Multi-stop routing", "Job photos for proof of work", "Expense tracking"],
    nichePage: "/pressure-washing-business-route-invoicing-app-australia",
  },
  {
    icon: Wrench,
    name: "Building & Trades",
    description:
      "Jump between job sites without backtracking, snap receipts for materials, and send professional invoices from your phone.",
    exampleJobs: ["Plumbing repairs", "Electrical work", "Carpentry", "General handyman"],
    keyFeatures: ["Before & after photos", "AI receipt scanner", "Professional invoicing"],
    nichePage: "/handyman-job-management-route-invoicing-app-australia",
  },
  {
    icon: Heart,
    name: "NDIS Services",
    description:
      "Plan participant visit routes with reliable ETAs, log travel for reimbursement, and create NDIS-compatible invoices.",
    exampleJobs: ["Disability support visits", "Community access", "Personal care", "Home modifications"],
    keyFeatures: ["Travel logging for claims", "ETA notifications", "NDIS invoice templates"],
    nichePage: "/ndis-support-worker-route-planner-invoicing-app-australia",
  },
  {
    icon: Bug,
    name: "Pest Control",
    description:
      "Balance regular inspections with emergency callouts, record treatments per property, and log chemical usage for compliance.",
    exampleJobs: ["Pest treatment", "Termite inspections", "Rodent control", "Pre-purchase inspections"],
    keyFeatures: ["Flexible scheduling", "Job notes for treatment records", "Vehicle logbook"],
    nichePage: "/pest-control-job-scheduling-route-app-australia",
  },
  {
    icon: Wind,
    name: "Air Conditioning",
    description:
      "Schedule service calls and installations, track parts and refrigerant costs, and invoice on completion — all from your phone.",
    exampleJobs: ["AC servicing", "Repairs", "Installations", "Duct cleaning"],
    keyFeatures: ["Route planning", "Parts expense tracking", "On-site invoicing"],
  },
  {
    icon: PawPrint,
    name: "Pet Services",
    description:
      "Plan grooming rounds or dog walking routes, store pet details and owner preferences, and manage recurring bookings.",
    exampleJobs: ["Dog walking", "Pet grooming", "Pet sitting", "Pet transport"],
    keyFeatures: ["Recurring bookings", "Client & pet notes", "Route optimisation"],
  },
  {
    icon: UtensilsCrossed,
    name: "Catering Services",
    description:
      "Coordinate food deliveries and event catering across multiple venues, track ingredient costs, and invoice organisers.",
    exampleJobs: ["Event catering", "Food preparation", "Corporate lunches", "Wedding catering"],
    keyFeatures: ["Multi-venue routing", "Ingredient expense tracking", "Event invoicing"],
  },
  {
    icon: Camera,
    name: "Photography",
    description:
      "Plan shoots across multiple locations, manage client bookings, and send invoices with session details and extras.",
    exampleJobs: ["Event photography", "Portraits", "Commercial shoots", "Real estate photography"],
    keyFeatures: ["Location-based routing", "Client scheduling", "Session invoicing"],
  },
  {
    icon: Music,
    name: "DJ / Music Services",
    description:
      "Manage gig schedules across venues, track equipment and setup times, and invoice promoters or event organisers.",
    exampleJobs: ["DJ services", "Live music", "Sound equipment hire", "Event entertainment"],
    keyFeatures: ["Venue scheduling", "Equipment tracking", "Gig invoicing"],
  },
  {
    icon: Monitor,
    name: "Computer Repair",
    description:
      "Plan on-site tech support visits, record equipment details per client, and invoice for time and parts.",
    exampleJobs: ["PC repair", "Laptop servicing", "Virus removal", "Data recovery"],
    keyFeatures: ["Job notes", "Parts tracking", "Time-based invoicing"],
  },
  {
    icon: Smartphone,
    name: "Phone Repair",
    description:
      "Schedule mobile phone repair visits or manage a repair queue, track parts inventory, and invoice on completion.",
    exampleJobs: ["Screen replacement", "Battery repair", "Water damage", "Software fixes"],
    keyFeatures: ["Job scheduling", "Parts expense tracking", "On-site invoicing"],
  },
  {
    icon: Car,
    name: "Automotive Services",
    description:
      "Detail cars, service fleets, or do mobile mechanical work — plan your route across the city and invoice at each stop.",
    exampleJobs: ["Mobile detailing", "Car detailing", "Tyre fitting", "Mobile mechanic"],
    keyFeatures: ["Route optimisation", "Client & vehicle notes", "Fixed-price invoicing"],
    nichePage: "/mobile-detailing-route-invoicing-app-australia",
  },
  {
    icon: Cog,
    name: "Appliance Services",
    description:
      "Visit multiple homes for appliance repairs or installations, record parts used, and invoice before you leave.",
    exampleJobs: ["Appliance repair", "Dishwasher servicing", "Washing machine repair", "Oven installation"],
    keyFeatures: ["Job scheduling", "Parts tracking", "Invoice with line items"],
  },
  {
    icon: Shield,
    name: "Security Services",
    description:
      "Plan patrol routes or alarm installation schedules, log site visits, and track mileage for tax purposes.",
    exampleJobs: ["Locksmith", "Alarm systems", "CCTV installation", "Access control"],
    keyFeatures: ["Route planning", "GPS logbook", "Job completion records"],
  },
  {
    icon: Truck,
    name: "Removals & Delivery",
    description:
      "Optimise multi-stop delivery routes, track kilometres, and record proof of delivery with photos.",
    exampleJobs: ["Furniture removals", "Courier services", "Local deliveries", "Freight drops"],
    keyFeatures: ["Multi-stop routing", "Mileage tracking", "Photo proof of delivery"],
  },
  {
    icon: Dumbbell,
    name: "Health & Fitness",
    description:
      "Schedule in-home training sessions or mobile therapy visits across town, send ETAs, and invoice after each session.",
    exampleJobs: ["Personal training", "Massage therapy", "Mobile physiotherapy", "Yoga instruction"],
    keyFeatures: ["Client scheduling", "ETA messages", "Session invoicing"],
  },
  {
    icon: Sprout,
    name: "Irrigation Services",
    description:
      "Plan installation and maintenance visits across properties, track parts and materials, and invoice on completion.",
    exampleJobs: ["Sprinkler systems", "Drip irrigation", "Irrigation repairs", "System upgrades"],
    keyFeatures: ["Route planning", "Parts expense tracking", "Job scheduling"],
  },
  {
    icon: Flame,
    name: "Hot Water Services",
    description:
      "Schedule hot water system installations, repairs, and servicing across suburbs. Track parts and invoice clients on site.",
    exampleJobs: ["Hot water installation", "Repairs", "Tempering valve service", "System upgrades"],
    keyFeatures: ["Route optimisation", "Parts tracking", "On-site invoicing"],
  },
  {
    icon: PartyPopper,
    name: "Events",
    description:
      "Coordinate setup and pack-down across multiple venues, track hire equipment, and invoice event organisers.",
    exampleJobs: ["Marquee setup", "Sound & lighting", "Event coordination", "AV hire"],
    keyFeatures: ["Multi-venue routing", "Equipment tracking", "Event invoicing"],
  },
  {
    icon: Settings,
    name: "Custom Service Category",
    description:
      "DayRoute lets you create your own service categories with custom names. If your industry isn't listed above, you can still use every feature.",
    exampleJobs: ["Any mobile service", "Custom job types", "Your own categories"],
    keyFeatures: ["Custom service types", "Full feature access", "Flexible pricing"],
  },
];

// =============================================================================
// FAQ DATA
// =============================================================================

const faqs = [
  {
    question: "Does DayRoute only work for the industries listed here?",
    answer:
      "No. DayRoute works for any mobile service business that visits multiple locations. The categories above are pre-built service types in the app, but you can create custom categories for any industry.",
  },
  {
    question: "Can I create my own service categories in DayRoute?",
    answer:
      "Yes. DayRoute includes a 'Custom' service category option. You can name your service types whatever you like and they'll appear in your job cards and invoices.",
  },
  {
    question: "Is DayRoute suitable for solo operators and small teams?",
    answer:
      "Yes. The Pro plan is designed for solo operators. The Team plan supports up to 10 users with shared scheduling, location sharing, and role-based permissions.",
  },
  {
    question: "How much does DayRoute cost?",
    answer:
      "Pro starts at $19 AUD/month. Team plans start at $49 AUD/month for up to 3 users. All plans include a 7-day free trial. See the pricing page for full details.",
  },
  {
    question: "Is DayRoute available on Android?",
    answer:
      "DayRoute is currently available on iPhone and iPad via the Apple App Store. Android support is on the roadmap — stay tuned for updates.",
  },
];

// =============================================================================
// PAGE COMPONENT
// =============================================================================

export default function IndustriesPage() {
  // Schema: BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://dayroute.com.au" },
      { "@type": "ListItem", position: 2, name: "Industries", item: "https://dayroute.com.au/industries" },
    ],
  };

  // Schema: FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="flex flex-col">
        {/* ===== BREADCRUMB ===== */}
        <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-6">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="text-foreground font-medium">Industries</li>
          </ol>
        </nav>

        {/* ===== HERO ===== */}
        <section className="relative overflow-hidden py-16 sm:py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                DayRoute for service businesses in Australia
              </h1>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground">
                DayRoute is a phone-first day planner built for people who spend their workday 
                on the road — not at a desk. It combines route planning, job scheduling, invoicing, 
                receipt scanning, and mileage tracking in a single iPhone app. The app ships with 
                pre-built service categories for 21+ industries, plus a custom option for anything 
                we haven&apos;t thought of yet.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <AppStoreCTA size="lg" className="w-full sm:w-auto min-h-[48px]" location="industries-hero" />
                <SetupCTA size="lg" className="w-full sm:w-auto min-h-[48px]" location="industries-hero" />
              </div>
            </div>
          </div>
        </section>

        {/* ===== CATEGORY GRID ===== */}
        <section className="py-12 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-10 sm:mb-12">
              Supported service categories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {categories.map((cat) => (
                <Card key={cat.name} className="group hover:border-primary/50 transition-colors flex flex-col">
                  <CardContent className="p-5 sm:p-6 flex-1 flex flex-col">
                    {/* Icon + name */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <cat.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-base sm:text-lg">{cat.name}</h3>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4">{cat.description}</p>

                    {/* Example jobs */}
                    <div className="mb-4">
                      <p className="text-xs font-medium text-muted-foreground mb-1.5">Example jobs:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.exampleJobs.map((job) => (
                          <span
                            key={job}
                            className="inline-flex items-center rounded-full bg-secondary/60 px-2.5 py-0.5 text-xs text-muted-foreground"
                          >
                            {job}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key features */}
                    <ul className="space-y-1.5 mb-5 flex-1">
                      {cat.keyFeatures.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-xs sm:text-sm">
                          <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA row */}
                    <div className="flex items-center gap-2 mt-auto pt-2">
                      {cat.nichePage ? (
                        <Button variant="outline" size="sm" asChild className="flex-1">
                          <Link href={cat.nichePage}>
                            Learn more
                            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      ) : (
                        <AppStoreCTA size="sm" variant="outline" className="flex-1" location={`industries-card-${cat.name}`} ctaText="Get DayRoute" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ===== MORE SERVICES — catches everyone not in the pre-built list ===== */}
        <section className="py-12 sm:py-20 border-t border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              More service businesses that use DayRoute
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-3xl">
              DayRoute works for any mobile service business — not just the pre-built categories above.
              These industries use DayRoute with custom service types every day.
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {[
                "Painting & Decorating",
                "Roofing",
                "Fencing",
                "Carpet Cleaning",
                "Window Cleaning",
                "Gutter Cleaning",
                "Solar Panel Cleaning",
                "Solar Installation",
                "Tree Services & Arborist",
                "Concreting & Paving",
                "Tiling",
                "Plastering & Rendering",
                "Skip Bin & Waste Removal",
                "House Washing",
                "Lawn Care & Turf",
                "Stump Grinding",
                "Glazier & Glass Repair",
                "Antenna & TV Installation",
                "Roller Door Repair",
                "Upholstery Cleaning",
                "Mattress Cleaning",
                "Oven Cleaning",
                "Mobile Car Wash",
                "Boat Detailing",
                "Caravan & RV Servicing",
                "Scaffolding",
                "Plumbing",
                "Electrical",
                "Gas Fitting",
                "Floor Sanding & Polishing",
                "Waterproofing",
                "Demolition",
                "Asbestos Removal",
                "Fire Protection Services",
                "Signage & Wrapping",
                "Mobile Welding",
                "Air Duct Cleaning",
                "Grease Trap Cleaning",
                "Septic Tank Services",
                "Mobile Mechanic",
                "Bicycle Repair",
                "Tutoring & Education",
                "Music Lessons",
                "Aged Care Services",
                "Home Nursing",
                "Occupational Therapy",
                "Speech Therapy",
                "Dietitian (Home Visits)",
                "Real Estate Photography",
                "Drone Services",
                "Surveying",
                "Building Inspection",
              ].map((service) => (
                <span
                  key={service}
                  className="inline-flex items-center rounded-full bg-primary/10 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-primary"
                >
                  {service}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Don&apos;t see your industry? No worries — DayRoute&apos;s custom service categories 
              let you set up your own job types, pricing, and workflows for any mobile service business.
            </p>
            <div className="mt-4">
              <AppStoreCTA size="sm" variant="outline" ctaText="Try DayRoute for your business" location="industries-more-services" />
            </div>
          </div>
        </section>

        {/* ===== FEATURE HIGHLIGHTS ===== */}
        <section className="py-12 sm:py-20 bg-card/50 border-y border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Every industry gets the full toolkit
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-10 max-w-3xl">
              No matter which service category you work in, DayRoute gives you access to every feature — 
              nothing is locked behind industry-specific tiers.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {[
                { title: "Multi-stop route optimisation", href: "/route-planning-for-service-businesses-australia" },
                { title: "Mobile invoicing after each job", href: "/mobile-invoicing-after-job-completion-iphone" },
                { title: "Before & after job photos", href: "/before-after-photos-for-service-jobs" },
                { title: "AI receipt scanner & BAS reports", href: "/mileage-logbook-receipts-for-service-businesses-australia" },
                { title: "GPS vehicle logbook", href: "/mileage-logbook-receipts-for-service-businesses-australia" },
                { title: "All-in-one field service workflow", href: "/field-service-workflow-app-for-iphone-australia" },
              ].map((feature) => (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group"
                >
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm sm:text-base font-medium group-hover:text-primary transition-colors">
                    {feature.title}
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto shrink-0 group-hover:text-primary transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FAQs ===== */}
        <section className="py-12 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-12">
              Frequently asked questions
            </h2>
            <div className="space-y-6 sm:space-y-8">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== BOTTOM CTA ===== */}
        <section className="py-16 sm:py-24 bg-card/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                Whatever your trade, DayRoute helps
              </h2>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Download DayRoute and start your 7-day free trial. No credit card required.
              </p>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
                <AppStoreCTA size="lg" className="w-full sm:w-auto min-h-[48px]" location="industries-bottom" />
                <SetupCTA size="lg" className="w-full sm:w-auto min-h-[48px]" location="industries-bottom" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
