import { Metadata } from "next";
import {
  Route,
  Calendar,
  Clock,
  Users,
  Receipt,
  Car,
  MapPin,
  FileText,
  DollarSign,
  Bell,
  Shield,
  Smartphone,
  ChevronRight,
  Check,
  Sparkles,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Features - Route Planning, Job Scheduling & Expense Tracking",
  description:
    "Explore DayRoute features: multi-stop route optimisation, daily job scheduling, receipt scanner with AI, vehicle logbook, team management, and more for Australian field service professionals.",
  openGraph: {
    title: "DayRoute Features - Field Service Management for Australia",
    description:
      "Multi-stop routing, job scheduling, receipt scanning, vehicle logbook, and team features for tradies and mobile professionals.",
  },
};

const coreFeatures = [
  {
    icon: Calendar,
    title: "Daily Job Scheduling",
    description:
      "Create and manage jobs with all the details you need - client info, time, duration, location, and notes. See your entire day at a glance.",
    details: [
      "Job cards with full client details",
      "Time and duration tracking",
      "Job status updates (pending, in progress, completed)",
      "Notes and special instructions",
    ],
  },
  {
    icon: Route,
    title: "Route Optimisation",
    description:
      "Stop wasting time criss-crossing suburbs. DayRoute calculates the most efficient order for your stops using Google Maps.",
    details: [
      "Multi-stop route planning",
      "Real-time ETAs for every job",
      "Google Maps integration",
      "One-tap navigation to each stop",
    ],
  },
  {
    icon: MapPin,
    title: "Map Visualisation",
    description:
      "See all your jobs plotted on a map. Drag to reorder if needed, or let the optimiser do its magic.",
    details: [
      "Interactive map view",
      "Route preview with stops",
      "Distance and time estimates",
      "Visual route line",
    ],
  },
  {
    icon: Bell,
    title: "Booking Reminders",
    description:
      "Never miss an appointment. Get push notifications 30 minutes and 1 hour before each job.",
    details: [
      "Customisable reminder times",
      "Push notifications",
      "SMS client notifications (coming soon)",
      "Calendar integration",
    ],
  },
];

const clientFeatures = [
  {
    icon: Users,
    title: "Client Management",
    description:
      "Keep all your client information organised. Names, addresses, phone numbers, and default pricing.",
    details: [
      "Client profiles",
      "Contact details",
      "Address with map coordinates",
      "Default pricing per client",
      "Job history",
    ],
  },
  {
    icon: Calendar,
    title: "Calendar Sync",
    description:
      "Import appointments from your phone calendar. Supports Google Calendar, Outlook, and iOS Calendar.",
    details: [
      "Two-way calendar sync",
      "Import existing appointments",
      "Avoid double-booking",
      "Works with any calendar app",
    ],
  },
];

const financialFeatures = [
  {
    icon: Receipt,
    title: "Receipt Scanner with AI",
    description:
      "Snap a photo of your receipt. Our AI (powered by Gemini 2.0) extracts the merchant, date, items, GST, and total automatically.",
    details: [
      "AI-powered text extraction",
      "Automatic GST calculation",
      "Category suggestions",
      "Stored on-device for privacy",
    ],
  },
  {
    icon: DollarSign,
    title: "BAS Helper",
    description:
      "Track income and expenses throughout the quarter. When BAS time comes, you'll have everything ready.",
    details: [
      "Quarterly summaries",
      "GST tracking",
      "Income vs expense reports",
      "Export-ready data",
    ],
  },
  {
    icon: FileText,
    title: "Invoice Creation",
    description:
      "Create professional invoices from completed jobs. Send to clients or export as PDF.",
    details: [
      "Professional templates",
      "Auto-fill from job details",
      "Track paid vs unpaid",
      "PDF export",
    ],
  },
  {
    icon: Car,
    title: "Vehicle Logbook",
    description:
      "Record trips for tax purposes. GPS tracking runs only when you start a trip — never in the background without permission.",
    details: [
      "GPS trip recording",
      "Automatic distance calculation",
      "Business vs personal trips",
      "ATO-compliant records",
    ],
  },
];

const teamFeatures = [
  {
    icon: Users,
    title: "Team Management",
    description:
      "Add team members with role-based permissions. Owners, admins, and members see what they need.",
    details: [
      "Up to 10 team members",
      "Role-based permissions",
      "Owner/Admin/Member roles",
      "Manage from one dashboard",
    ],
  },
  {
    icon: MapPin,
    title: "Location Sharing",
    description:
      "See where your team is in real-time. Great for dispatching and coordination.",
    details: [
      "Live location updates",
      "Team map view",
      "Privacy controls",
      "Opt-in only",
    ],
  },
  {
    icon: Route,
    title: "Shared Routes",
    description:
      "Assign routes to team members. Everyone sees their jobs for the day.",
    details: [
      "Assign jobs to team members",
      "Team scheduling view",
      "Route sharing",
      "Workload balancing",
    ],
  },
  {
    icon: Check,
    title: "Expense Approvals",
    description:
      "Team members submit receipts for approval. Admins review and approve before adding to accounts.",
    details: [
      "Submission workflow",
      "Approval queue",
      "Admin notifications",
      "Audit trail",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Powerful features for
              <br />
              <span className="text-primary">field service professionals</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to plan routes, manage jobs, track expenses,
              and run your mobile business efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <Zap className="h-4 w-4" />
              Core Features
            </div>
            <h2 className="text-3xl font-bold">Daily planning made simple</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {coreFeatures.map((feature) => (
              <Card key={feature.title} className="overflow-hidden">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {feature.description}
                      </p>
                      <ul className="space-y-2">
                        {feature.details.map((detail) => (
                          <li
                            key={detail}
                            className="flex items-center gap-2 text-sm"
                          >
                            <Check className="h-4 w-4 text-primary shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Client Management */}
      <section className="py-16 sm:py-24 bg-card/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <Users className="h-4 w-4" />
              Client Management
            </div>
            <h2 className="text-3xl font-bold">
              Keep your clients organised
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {clientFeatures.map((feature) => (
              <Card key={feature.title} className="overflow-hidden">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {feature.description}
                      </p>
                      <ul className="space-y-2">
                        {feature.details.map((detail) => (
                          <li
                            key={detail}
                            className="flex items-center gap-2 text-sm"
                          >
                            <Check className="h-4 w-4 text-primary shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Features */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <DollarSign className="h-4 w-4" />
              Financial Tools
            </div>
            <h2 className="text-3xl font-bold">Track money in and out</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {financialFeatures.map((feature) => (
              <Card key={feature.title} className="overflow-hidden">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {feature.description}
                      </p>
                      <ul className="space-y-2">
                        {feature.details.map((detail) => (
                          <li
                            key={detail}
                            className="flex items-center gap-2 text-sm"
                          >
                            <Check className="h-4 w-4 text-primary shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Features */}
      <section className="py-16 sm:py-24 bg-card/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <Users className="h-4 w-4" />
              Team Features
            </div>
            <h2 className="text-3xl font-bold">Built for small teams</h2>
            <p className="mt-4 text-muted-foreground">
              Available on Team plans. Manage up to 10 team members.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {teamFeatures.map((feature) => (
              <Card key={feature.title} className="overflow-hidden">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {feature.description}
                      </p>
                      <ul className="space-y-2">
                        {feature.details.map((detail) => (
                          <li
                            key={detail}
                            className="flex items-center gap-2 text-sm"
                          >
                            <Check className="h-4 w-4 text-primary shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Ready to work smarter?
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              Download DayRoute and start planning efficient routes today.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
              <Button size="lg" className="w-full sm:w-auto min-h-[48px] gap-2" asChild>
                <Link href="/#download">
                  <Smartphone className="h-5 w-5" />
                  Coming Soon on App Store
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto min-h-[48px]" asChild>
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
