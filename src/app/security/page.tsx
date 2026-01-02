import { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  Lock,
  Smartphone,
  Database,
  Eye,
  MapPin,
  Key,
  Check,
  AlertCircle,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

export const metadata: Metadata = {
  title: "Security - How DayRoute Protects Your Data",
  description:
    "Learn how DayRoute keeps your data secure. Passwordless login, on-device receipt storage, minimal data collection, and transparent privacy practices for Australian users.",
  openGraph: {
    title: "DayRoute Security - Your Data, Protected",
    description:
      "Passwordless authentication, on-device storage, and privacy-first design.",
  },
};

const securityFeatures = [
  {
    icon: Key,
    title: "Passwordless Authentication",
    description:
      "Login with a magic link sent to your email. No passwords to remember or leak. Powered by Supabase Auth.",
    details: [
      "Magic link + OTP verification",
      "No password storage",
      "Secure email verification",
      "Session management",
    ],
  },
  {
    icon: Database,
    title: "On-Device Data Storage",
    description:
      "Your receipts, expenses, and business data are stored locally on your device — not on our servers.",
    details: [
      "Receipts stored on-device only",
      "Local filesystem for images",
      "AsyncStorage for app data",
      "Your data stays on your phone",
    ],
  },
  {
    icon: MapPin,
    title: "Location Privacy",
    description:
      "GPS tracking only runs when you explicitly start a trip. We never track your location in the background without your action.",
    details: [
      "No background location by default",
      "Trip tracking is opt-in",
      "Location data stays on device",
      "Clear permission requests",
    ],
  },
  {
    icon: Eye,
    title: "Minimal Data Collection",
    description:
      "We collect only what's needed for the app to work. Your email for login. That's the only personal data stored on our servers.",
    details: [
      "Email for authentication only",
      "No analytics tracking",
      "No selling of data",
      "GDPR-compliant practices",
    ],
  },
];

const thirdPartyServices = [
  {
    name: "Supabase Auth",
    purpose: "User authentication (magic link login)",
    dataShared: "Email address",
  },
  {
    name: "Google Maps",
    purpose: "Route planning and optimisation",
    dataShared: "Job addresses (for routing only, not stored)",
  },
  {
    name: "RevenueCat",
    purpose: "Subscription management",
    dataShared: "Anonymous user ID, subscription status",
  },
  {
    name: "Google Gemini AI",
    purpose: "Receipt text extraction",
    dataShared: "Receipt images (processed, not stored)",
  },
];

export default function SecurityPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <Shield className="h-4 w-4" />
              Security & Privacy
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Your data belongs to you
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              DayRoute is built with privacy at its core. We collect minimal
              data, store receipts on your device, and give you full control
              over your information.
            </p>
          </div>
        </div>
      </section>

      {/* Key Security Features */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">How we protect your data</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {securityFeatures.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Data Storage Clarification */}
      <section className="py-16 sm:py-24 bg-card/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Where is my data stored?</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-primary/5 border border-primary/20">
                <Smartphone className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    On your device (local storage)
                  </h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Receipt images</li>
                    <li>• Expense records</li>
                    <li>• Client information</li>
                    <li>• Job details</li>
                    <li>• Vehicle logbook entries</li>
                    <li>• Invoices</li>
                    <li>• App settings and preferences</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-2xl bg-secondary border border-border">
                <Lock className="h-6 w-6 text-muted-foreground shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    On our servers (Supabase)
                  </h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Your email address (for login only)</li>
                    <li>• Authentication tokens</li>
                  </ul>
                  <p className="mt-3 text-sm">
                    That&apos;s it. We don&apos;t store your receipts, clients, jobs, or
                    business data on our servers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-2xl border border-amber-500/30 bg-amber-500/5">
                <AlertCircle className="h-6 w-6 text-amber-500 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Important: Backup your data
                  </h3>
                  <p className="text-muted-foreground">
                    Since data is stored locally, it&apos;s important to back up your
                    device regularly. If you delete the app or lose your phone,
                    local data may be lost. We recommend using iCloud backup for
                    iOS devices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Third-Party Services */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Third-party services</h2>
            <p className="text-muted-foreground mb-8">
              DayRoute uses a small number of trusted third-party services to
              provide core functionality:
            </p>

            <div className="space-y-4">
              {thirdPartyServices.map((service) => (
                <div
                  key={service.name}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-secondary"
                >
                  <div className="mb-2 sm:mb-0">
                    <h3 className="font-semibold">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {service.purpose}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Data shared: {service.dataShared}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Your Controls */}
      <section className="py-16 sm:py-24 bg-card/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Your controls</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Manage permissions</h3>
                <p className="text-muted-foreground">
                  You can grant or revoke app permissions (location, camera,
                  calendar, contacts) at any time in your device&apos;s Settings app.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Delete local data</h3>
                <p className="text-muted-foreground">
                  Delete all local data by uninstalling the app, or use the
                  in-app settings to clear specific data types.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Manage subscription</h3>
                <p className="text-muted-foreground">
                  Subscriptions are managed through your Apple ID settings.
                  Cancel anytime, no questions asked.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Request account deletion</h3>
                <p className="text-muted-foreground">
                  Contact us at{" "}
                  <a
                    href="mailto:yourhelp@dayroute.com.au"
                    className="text-primary hover:underline"
                  >
                    yourhelp@dayroute.com.au
                  </a>{" "}
                  to request deletion of your account and any data we hold.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Questions about security?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Read our full privacy policy or contact us with any questions.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild>
                <Link href="/privacy">Read Privacy Policy</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/support">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
