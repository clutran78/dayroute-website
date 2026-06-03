/**
 * Marketing graphics — single source of truth for hero/feature visuals.
 * Files live in /public/marketing/ (472×1024 PNGs).
 */

export interface MarketingImageItem {
  src: string;
  alt: string;
  label: string;
  description?: string;
}

const base = "/marketing";

export const marketingImages = {
  runTheDay: `${base}/run-the-day-not-the-admin.png`,
  planRoute: `${base}/plan-the-fastest-route.png`,
  stayOnJob: `${base}/stay-on-top-of-every-job.png`,
  invoice: `${base}/invoice-before-you-leave.png`,
  receipts: `${base}/snap-receipts-ai-admin.png`,
  logbook: `${base}/track-business-kilometres.png`,
  bas: `${base}/bas-reports-without-headache.png`,
  clients: `${base}/know-every-client.png`,
  team: `${base}/keep-the-team-in-sync.png`,
  australianPros: `${base}/built-for-australian-field-pros.png`,
} as const;

/** Homepage carousel — ordered for the “day on the road” story. */
export const homepageShowcase: MarketingImageItem[] = [
  {
    src: marketingImages.runTheDay,
    label: "Run the day",
    description: "Jobs, routes, invoices and tax tools in one app",
    alt: "DayRoute — run the day, not the admin. Schedule, routes, invoices and reports on iPhone",
  },
  {
    src: marketingImages.planRoute,
    label: "Route planning",
    description: "Optimise stops and send On My Way SMS",
    alt: "DayRoute — plan the fastest route with live ETAs and client SMS updates",
  },
  {
    src: marketingImages.stayOnJob,
    label: "Job workflow",
    description: "Timers, checklists and proof in the field",
    alt: "DayRoute — stay on top of every job with timers, checklists and photos",
  },
  {
    src: marketingImages.invoice,
    label: "Invoicing",
    description: "GST invoices before you leave the site",
    alt: "DayRoute — invoice before you leave with professional GST invoices",
  },
  {
    src: marketingImages.receipts,
    label: "Receipt scanner",
    description: "AI extracts GST and totals in seconds",
    alt: "DayRoute — snap receipts and let AI handle merchant, date and GST",
  },
  {
    src: marketingImages.logbook,
    label: "Vehicle logbook",
    description: "Track every business kilometre",
    alt: "DayRoute — automatic GPS logbook for business and private trips",
  },
  {
    src: marketingImages.bas,
    label: "BAS reports",
    description: "GST, income and expenses in one place",
    alt: "DayRoute — BAS reports without the headache",
  },
  {
    src: marketingImages.clients,
    label: "Client profiles",
    description: "Notes, history and quick rebooking",
    alt: "DayRoute — know every client at a glance with addresses and job history",
  },
  {
    src: marketingImages.team,
    label: "Team sync",
    description: "Assign jobs and see live locations",
    alt: "DayRoute — keep the team in sync with job assignment and live map",
  },
  {
    src: marketingImages.australianPros,
    label: "Built for Australia",
    description: "ABN, GST invoices and BAS-ready reports",
    alt: "DayRoute — built for Australian field professionals",
  },
];

/** All marketing assets (e.g. features page mobile gallery). */
export const allMarketingShowcase: MarketingImageItem[] = homepageShowcase;
