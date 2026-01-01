import { Metadata } from "next";
import Link from "next/link";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy - How DayRoute Handles Your Data",
  description:
    "DayRoute Privacy Policy. Learn how we collect, use, and protect your personal information. Receipts stored on-device. Minimal data collection. Australian privacy practices.",
  openGraph: {
    title: "DayRoute Privacy Policy",
    description: "How DayRoute handles and protects your personal data.",
  },
};

export default function PrivacyPage() {
  const lastUpdated = "1 January 2025";

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <Shield className="h-4 w-4" />
              Privacy Policy
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Privacy Policy
            </h1>
            <p className="mt-6 text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="space-y-12">
              {/* Introduction */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                <p className="text-muted-foreground">
                  DayRoute (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your
                  privacy. This Privacy Policy explains how we collect, use, and
                  safeguard your information when you use our mobile application
                  DayRoute (the &ldquo;App&rdquo;).
                </p>
                <p className="text-muted-foreground mt-4">
                  We are an Australian company and operate in accordance with the
                  Australian Privacy Principles (APPs) under the Privacy Act 1988
                  (Cth).
                </p>
              </div>

              {/* Information We Collect */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Information We Collect
                </h2>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  Information stored on our servers
                </h3>
                <p className="text-muted-foreground">
                  <strong>Email address:</strong> We collect your email address
                  when you create an account. This is used solely for
                  authentication (sending magic link login emails) and to contact
                  you about your account if necessary.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  Information stored on your device only
                </h3>
                <p className="text-muted-foreground">
                  The following data is stored locally on your device and is NOT
                  transmitted to or stored on our servers:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                  <li>Receipt images and scanned data</li>
                  <li>Expense and income records</li>
                  <li>Client information (names, addresses, phone numbers)</li>
                  <li>Job details and schedules</li>
                  <li>Invoice data</li>
                  <li>Vehicle logbook entries and trip data</li>
                  <li>App settings and preferences</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  Device permissions
                </h3>
                <p className="text-muted-foreground">
                  The App may request access to the following device features.
                  These are optional and you can deny or revoke access at any
                  time in your device settings:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                  <li>
                    <strong>Camera:</strong> To scan receipts. Images are
                    processed and stored on your device only.
                  </li>
                  <li>
                    <strong>Location:</strong> For route planning and vehicle
                    logbook trip tracking. Location is only accessed while using
                    the app or when you explicitly start trip tracking.
                  </li>
                  <li>
                    <strong>Calendar:</strong> To import appointments from your
                    device calendar. Calendar data is read locally and not
                    transmitted to our servers.
                  </li>
                  <li>
                    <strong>Contacts:</strong> Optional, to auto-fill client
                    details. Contact data is read locally and not transmitted to
                    our servers.
                  </li>
                </ul>
              </div>

              {/* How We Use Your Information */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  How We Use Your Information
                </h2>
                <p className="text-muted-foreground">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                  <li>
                    <strong>Authentication:</strong> Your email is used to send
                    magic link login emails via Supabase Auth.
                  </li>
                  <li>
                    <strong>App functionality:</strong> Device data (stored
                    locally) powers features like route planning, job scheduling,
                    expense tracking, and receipt scanning.
                  </li>
                  <li>
                    <strong>Route planning:</strong> Job addresses are sent to
                    Google Maps for route calculation. Addresses are not stored
                    by us.
                  </li>
                  <li>
                    <strong>Receipt scanning:</strong> Receipt images are sent to
                    Google Gemini AI for text extraction. Images are processed
                    and not stored by Google or us.
                  </li>
                  <li>
                    <strong>Support:</strong> If you contact support, we use your
                    email to respond to your enquiry.
                  </li>
                </ul>
              </div>

              {/* Third-Party Services */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
                <p className="text-muted-foreground">
                  DayRoute uses the following third-party services:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-3">
                  <li>
                    <strong>Supabase:</strong> Authentication provider. Stores
                    your email address and authentication tokens.{" "}
                    <a
                      href="https://supabase.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Supabase Privacy Policy
                    </a>
                  </li>
                  <li>
                    <strong>Google Maps:</strong> Route planning and
                    optimisation. Addresses are processed but not stored.{" "}
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Google Privacy Policy
                    </a>
                  </li>
                  <li>
                    <strong>RevenueCat:</strong> Subscription management.
                    Receives an anonymous user ID and subscription status.{" "}
                    <a
                      href="https://www.revenuecat.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      RevenueCat Privacy Policy
                    </a>
                  </li>
                  <li>
                    <strong>Google Gemini AI:</strong> Receipt text extraction.
                    Images are processed for text extraction only.{" "}
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Google Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>

              {/* Data Security */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Data Security</h2>
                <p className="text-muted-foreground">
                  We implement appropriate security measures to protect your
                  information:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                  <li>
                    Passwordless authentication eliminates risks associated with
                    password storage and breaches.
                  </li>
                  <li>All data transmission uses HTTPS encryption.</li>
                  <li>
                    Sensitive business data is stored locally on your device, not
                    on our servers.
                  </li>
                  <li>
                    Third-party services are vetted for security and compliance.
                  </li>
                </ul>
              </div>

              {/* Your Rights and Controls */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Your Rights and Controls
                </h2>
                <p className="text-muted-foreground">You have the right to:</p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                  <li>
                    <strong>Access your data:</strong> Your local data is
                    accessible within the app. Contact us for data stored on our
                    servers.
                  </li>
                  <li>
                    <strong>Delete your data:</strong> Uninstall the app to
                    delete all local data. Contact us to delete your account and
                    server-stored data.
                  </li>
                  <li>
                    <strong>Control permissions:</strong> Grant or revoke app
                    permissions in your device settings at any time.
                  </li>
                  <li>
                    <strong>Manage subscriptions:</strong> Cancel or change your
                    subscription through Apple ID settings.
                  </li>
                  <li>
                    <strong>Export data:</strong> Contact us if you need to
                    export your data.
                  </li>
                </ul>
              </div>

              {/* Data Retention */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Data Retention</h2>
                <p className="text-muted-foreground">
                  <strong>Server data:</strong> Your email address is retained as
                  long as your account is active. Upon account deletion, your
                  email is removed within 30 days.
                </p>
                <p className="text-muted-foreground mt-4">
                  <strong>Device data:</strong> Local data is retained until you
                  delete it within the app or uninstall the app.
                </p>
              </div>

              {/* Children's Privacy */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Children&apos;s Privacy
                </h2>
                <p className="text-muted-foreground">
                  DayRoute is not intended for use by children under 16 years of
                  age. We do not knowingly collect personal information from
                  children.
                </p>
              </div>

              {/* Changes to This Policy */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Changes to This Policy
                </h2>
                <p className="text-muted-foreground">
                  We may update this Privacy Policy from time to time. We will
                  notify you of any material changes by posting the new policy on
                  this page and updating the &ldquo;Last updated&rdquo; date.
                </p>
              </div>

              {/* Contact Us */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions about this Privacy Policy or our data
                  practices, please contact us:
                </p>
                <p className="text-muted-foreground mt-4">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:privacy@dayroute.com.au"
                    className="text-primary hover:underline"
                  >
                    privacy@dayroute.com.au
                  </a>
                </p>
                <p className="text-muted-foreground mt-2">
                  <strong>Support:</strong>{" "}
                  <Link href="/support" className="text-primary hover:underline">
                    dayroute.com.au/support
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
