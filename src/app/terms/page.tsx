import { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Use - DayRoute Service Agreement",
  description:
    "DayRoute Terms of Use. Subscription terms, usage guidelines, and service agreement for the DayRoute field service planning app.",
  openGraph: {
    title: "DayRoute Terms of Use",
    description: "Terms and conditions for using DayRoute.",
  },
};

export default function TermsPage() {
  const lastUpdated = "1 January 2025";

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <FileText className="h-4 w-4" />
              Terms of Use
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Terms of Use
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
              {/* Agreement */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Agreement to Terms
                </h2>
                <p className="text-muted-foreground">
                  By downloading, installing, or using the DayRoute mobile
                  application (&ldquo;App&rdquo;), you agree to be bound by these Terms of
                  Use (&ldquo;Terms&rdquo;). If you do not agree to these Terms, do not use
                  the App.
                </p>
                <p className="text-muted-foreground mt-4">
                  DayRoute is operated by DayRoute Pty Ltd, an Australian company.
                  These Terms are governed by the laws of Australia.
                </p>
              </div>

              {/* Use of the App */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Use of the App</h2>
                <p className="text-muted-foreground">
                  DayRoute is a field service planning app designed for mobile
                  professionals. You may use the App for lawful purposes only and
                  in accordance with these Terms.
                </p>
                <p className="text-muted-foreground mt-4">You agree not to:</p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                  <li>
                    Use the App in any way that violates applicable laws or
                    regulations
                  </li>
                  <li>
                    Attempt to gain unauthorised access to the App or its systems
                  </li>
                  <li>
                    Use the App to transmit viruses, malware, or harmful code
                  </li>
                  <li>
                    Reverse engineer, decompile, or disassemble the App
                  </li>
                  <li>
                    Use the App for any fraudulent or misleading purpose
                  </li>
                </ul>
              </div>

              {/* Account and Authentication */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Account and Authentication
                </h2>
                <p className="text-muted-foreground">
                  To use certain features of the App, you must create an account
                  using a valid email address. You are responsible for:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                  <li>Providing accurate account information</li>
                  <li>
                    Maintaining the security of your email account and login
                    credentials
                  </li>
                  <li>All activities that occur under your account</li>
                  <li>
                    Notifying us immediately of any unauthorised account access
                  </li>
                </ul>
              </div>

              {/* Subscriptions */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Subscriptions and Payments
                </h2>
                <p className="text-muted-foreground">
                  DayRoute offers subscription-based access to premium features
                  through the Apple App Store.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  Free Trial
                </h3>
                <p className="text-muted-foreground">
                  Paid subscriptions may include a 7-day free trial. You will not
                  be charged during the trial period. If you do not cancel before
                  the trial ends, your subscription will automatically convert to
                  a paid subscription.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  Subscription Renewal
                </h3>
                <p className="text-muted-foreground">
                  Subscriptions automatically renew at the end of each billing
                  period (monthly or yearly, depending on your plan) unless
                  cancelled at least 24 hours before the renewal date.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  Cancellation
                </h3>
                <p className="text-muted-foreground">
                  You can cancel your subscription at any time through your Apple
                  ID settings. Cancellation takes effect at the end of your
                  current billing period. You will retain access to premium
                  features until then.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  Refunds
                </h3>
                <p className="text-muted-foreground">
                  All payments are processed by Apple and subject to Apple&apos;s
                  refund policy. To request a refund, visit{" "}
                  <a
                    href="https://reportaproblem.apple.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    reportaproblem.apple.com
                  </a>{" "}
                  or contact Apple Support. We cannot process refunds directly.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  Price Changes
                </h3>
                <p className="text-muted-foreground">
                  We may change subscription prices from time to time. Price
                  changes will not affect your current subscription period but may
                  apply to renewals. You will be notified of any price changes
                  before they take effect.
                </p>
              </div>

              {/* Apple Terms */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Apple App Store Terms
                </h2>
                <p className="text-muted-foreground">
                  Your use of the App is also subject to Apple&apos;s Standard
                  End User License Agreement (EULA) available at{" "}
                  <a
                    href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    apple.com/legal/internet-services/itunes/dev/stdeula
                  </a>
                  .
                </p>
                <p className="text-muted-foreground mt-4">
                  Apple is not responsible for the App or its content, and has no
                  obligation to provide maintenance, support, or warranty services
                  for the App.
                </p>
              </div>

              {/* Your Data */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Your Data</h2>
                <p className="text-muted-foreground">
                  You retain ownership of all data you create or store in the App
                  (clients, jobs, receipts, etc.). Most data is stored locally on
                  your device. See our{" "}
                  <Link
                    href="/privacy"
                    className="text-primary hover:underline"
                  >
                    Privacy Policy
                  </Link>{" "}
                  for details on data handling.
                </p>
                <p className="text-muted-foreground mt-4">
                  You are responsible for backing up your device to prevent data
                  loss. We are not responsible for any loss of locally stored
                  data.
                </p>
              </div>

              {/* Intellectual Property */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Intellectual Property
                </h2>
                <p className="text-muted-foreground">
                  The App, including its design, features, and content (excluding
                  user data), is owned by DayRoute and protected by intellectual
                  property laws. You are granted a limited, non-exclusive,
                  non-transferable license to use the App for personal or business
                  purposes in accordance with these Terms.
                </p>
              </div>

              {/* Disclaimer of Warranties */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Disclaimer of Warranties
                </h2>
                <p className="text-muted-foreground">
                  THE APP IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT
                  WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
                  LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                  PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>
                <p className="text-muted-foreground mt-4">
                  We do not warrant that the App will be uninterrupted,
                  error-free, or free of viruses or other harmful components. You
                  use the App at your own risk.
                </p>
              </div>

              {/* Limitation of Liability */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Limitation of Liability
                </h2>
                <p className="text-muted-foreground">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, DAYROUTE SHALL NOT BE
                  LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
                  PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR USE,
                  ARISING FROM YOUR USE OF THE APP.
                </p>
                <p className="text-muted-foreground mt-4">
                  Our total liability for any claims arising from your use of the
                  App shall not exceed the amount you paid for the App or
                  subscription in the 12 months preceding the claim.
                </p>
              </div>

              {/* Indemnification */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Indemnification</h2>
                <p className="text-muted-foreground">
                  You agree to indemnify and hold harmless DayRoute and its
                  officers, directors, employees, and agents from any claims,
                  damages, losses, or expenses arising from your use of the App or
                  violation of these Terms.
                </p>
              </div>

              {/* Termination */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Termination</h2>
                <p className="text-muted-foreground">
                  We may suspend or terminate your access to the App at any time,
                  with or without cause or notice. You may terminate your use of
                  the App at any time by uninstalling it and cancelling any active
                  subscription.
                </p>
                <p className="text-muted-foreground mt-4">
                  Upon termination, your right to use the App ceases immediately.
                  Provisions of these Terms that by their nature should survive
                  termination will survive.
                </p>
              </div>

              {/* Changes to Terms */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
                <p className="text-muted-foreground">
                  We may modify these Terms at any time. We will notify you of
                  material changes by posting the updated Terms on this page and
                  updating the &ldquo;Last updated&rdquo; date. Your continued use of the
                  App after changes constitutes acceptance of the new Terms.
                </p>
              </div>

              {/* Governing Law */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
                <p className="text-muted-foreground">
                  These Terms are governed by and construed in accordance with the
                  laws of Australia. Any disputes arising from these Terms or your
                  use of the App will be subject to the exclusive jurisdiction of
                  the courts of Australia.
                </p>
              </div>

              {/* Contact Us */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions about these Terms, please contact us:
                </p>
                <p className="text-muted-foreground mt-4">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:legal@dayroute.com.au"
                    className="text-primary hover:underline"
                  >
                    legal@dayroute.com.au
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
