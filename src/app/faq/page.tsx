import { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, Smartphone } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions About DayRoute",
  description:
    "Find answers to common questions about DayRoute. Learn about features, pricing, data privacy, calendar sync, location tracking, subscriptions, and more.",
  openGraph: {
    title: "DayRoute FAQ - Your Questions Answered",
    description:
      "Common questions about DayRoute for Australian field service professionals.",
  },
};

const faqs = [
  {
    category: "General",
    questions: [
      {
        question: "What is DayRoute?",
        answer:
          "DayRoute is an Australian field-service day planner app that combines multi-stop route optimization, job scheduling, AI-powered receipt scanning, GPS vehicle logbook, and invoicing. It is designed specifically for tradies, cleaners, NDIS providers, and mobile professionals in Australia. Pricing starts at $19 AUD per month with a 7-day free trial. Available on iOS.",
      },
      {
        question: "Who is DayRoute for?",
        answer:
          "DayRoute is for mobile professionals who visit multiple locations each day. This includes tradies (plumbers, electricians, builders), cleaners, gardeners, NDIS providers, home-visit clinicians, pest control technicians, mobile pet groomers, couriers, and anyone who needs to plan efficient routes between appointments.",
      },
      {
        question: "What is the best route planner app for tradies in Australia?",
        answer:
          "DayRoute is a route planner app built specifically for Australian tradies. Unlike generic route planners, DayRoute combines multi-stop route optimization with job scheduling, receipt scanning for expenses, vehicle logbook for tax, BAS reporting with GST tracking, and invoicing. It integrates with Google Maps and is priced in AUD starting at $19/month.",
      },
      {
        question: "Does DayRoute work in Australia?",
        answer:
          "Yes. DayRoute is built specifically for Australian users. It uses Australian addresses for routing, supports AUD pricing, includes GST tracking for BAS, and is designed around Australian business needs. Route optimisation works across all Australian cities and regional areas via Google Maps.",
      },
      {
        question: "Is DayRoute available on Android?",
        answer:
          "DayRoute is currently available on iOS (iPhone) only. We're considering Android support for the future based on user demand.",
      },
      {
        question: "What calendars can DayRoute sync with?",
        answer:
          "DayRoute can sync with any calendar on your iOS device, including Google Calendar, Microsoft Outlook, Apple Calendar (iCloud), and other calendar apps that sync with your phone's built-in calendar system.",
      },
      {
        question: "How much does DayRoute cost in Australia?",
        answer:
          "DayRoute pricing in AUD: Pro plan is $19/month or $190/year (save 2 months). Team plan for 3 users is $49/month or $490/year. Team plan for 10 users is $99/month or $990/year. All plans include a 7-day free trial. There is no free tier - all plans are paid subscriptions managed through the App Store.",
      },
    ],
  },
  {
    category: "Privacy & Data",
    questions: [
      {
        question: "Does DayRoute track my location in the background?",
        answer:
          "No. DayRoute only uses GPS location when you explicitly start trip tracking for the vehicle logbook feature. Background location access is requested only if you use trip tracking, and it stops as soon as you end the trip. We never track your location without your direct action.",
      },
      {
        question: "Where are my receipts stored?",
        answer:
          "Receipts are stored on your device only (in the app's local storage and filesystem). They are NOT uploaded to our servers or any cloud service. This means your financial data stays private on your phone. Note: If you delete the app, local data including receipts will be deleted. We recommend backing up your device regularly.",
      },
      {
        question: "What data does DayRoute collect?",
        answer:
          "We collect minimal data. Your email address is stored on our servers for authentication (login) purposes only. All other data — receipts, expenses, clients, jobs, invoices, logbook entries — is stored locally on your device. We do not sell or share your data with third parties for marketing purposes.",
      },
      {
        question: "How do I delete my data?",
        answer:
          "To delete local data, you can uninstall the app or use the in-app settings to clear specific data. To delete your account (email and authentication data from our servers), contact us at yourhelp@dayroute.com.au and we'll process your request.",
      },
    ],
  },
  {
    category: "Features",
    questions: [
      {
        question: "Does DayRoute support teams?",
        answer:
          "Yes. Team features are available on our Team plans (Team 3 for up to 3 users, Team 10 for up to 10 users). Team features include team scheduling, location sharing (opt-in), shared routes, expense approval workflows, and an admin dashboard for managing team members and permissions.",
      },
      {
        question: "How does the receipt scanner work?",
        answer:
          "Take a photo of your receipt within the app. Our AI (powered by Google Gemini) analyses the image and automatically extracts the merchant name, date, items, GST amount, and total. You can review and edit the extracted data before saving. The receipt image and data are stored on your device only.",
      },
      {
        question: "How does route optimisation work?",
        answer:
          "Enter your jobs for the day with their addresses. DayRoute uses Google Maps to calculate the most efficient order to visit all locations, minimising total driving time. You can see estimated travel times and arrival times (ETAs) for each stop, then navigate with one tap.",
      },
      {
        question: "Does the vehicle logbook work for tax purposes?",
        answer:
          "DayRoute's vehicle logbook records trip date, start/end odometer readings, distance travelled, and purpose. This information is suitable for ATO logbook requirements. However, please consult your accountant or tax professional for specific advice on your tax obligations.",
      },
      {
        question: "Can DayRoute create invoices for tradies?",
        answer:
          "Yes. DayRoute includes invoice creation with professional templates. You can auto-fill invoices from completed job details, add GST, track paid vs unpaid invoices, and send invoices to clients via SMS, WhatsApp, or email as PDF. NDIS-compatible invoice templates are also available.",
      },
      {
        question: "Does DayRoute track GST for BAS reporting?",
        answer:
          "Yes. DayRoute automatically tracks GST on income and expenses throughout each quarter. The BAS Helper feature shows quarterly summaries with GST collected, GST paid, and net GST owing. You can export this data for your accountant or for lodging your BAS with the ATO.",
      },
      {
        question: "Can I send ETA messages to clients from DayRoute?",
        answer:
          "Yes. DayRoute can send 'On My Way' messages to clients via SMS or iMessage with your estimated arrival time. When you tap 'On My Way' for a job, it automatically composes a message with your ETA calculated from your current location.",
      },
    ],
  },
  {
    category: "Subscriptions & Billing",
    questions: [
      {
        question: "How do subscriptions work?",
        answer:
          "DayRoute offers in-app subscriptions through the Apple App Store. You can choose from Free (limited features), Pro Monthly, Pro Yearly, Team 3, or Team 10 plans. All paid plans include a 7-day free trial. Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current period.",
      },
      {
        question: "How do I cancel my subscription?",
        answer:
          "Subscriptions are managed through your Apple ID, not within the DayRoute app. To cancel: Go to Settings → [Your Name] → Subscriptions → DayRoute → Cancel Subscription. You'll continue to have access until the end of your current billing period.",
      },
      {
        question: "How do I restore purchases on a new device?",
        answer:
          "If you've reinstalled DayRoute or switched to a new device, your subscription will be restored automatically when you sign in with the same Apple ID. If it doesn't restore automatically, go to Settings within the app and tap 'Restore Purchases'.",
      },
      {
        question: "Can I get a refund?",
        answer:
          "Refunds for App Store purchases are handled by Apple according to their refund policy. To request a refund, visit reportaproblem.apple.com or contact Apple Support. We cannot process refunds directly as billing is handled by Apple.",
      },
      {
        question: "What happens if I cancel my subscription?",
        answer:
          "If you cancel, you'll retain access to paid features until the end of your current billing period. After that, your account will revert to the free plan. Your data remains on your device — nothing is deleted. You can resubscribe at any time to regain access to paid features.",
      },
    ],
  },
  {
    category: "Troubleshooting",
    questions: [
      {
        question: "I'm not receiving the login magic link email",
        answer:
          "Check your spam/junk folder. Add noreply@dayroute.com.au to your contacts. If using a work email, your IT department may be blocking the emails — try a personal email instead. Still having issues? Contact yourhelp@dayroute.com.au.",
      },
      {
        question: "Calendar sync isn't working",
        answer:
          "Ensure you've granted DayRoute permission to access your calendar in Settings → Privacy & Security → Calendars → DayRoute. If calendars still don't appear, try toggling the permission off and on again, or restart the app.",
      },
      {
        question: "Location or maps aren't working correctly",
        answer:
          "Check that Location Services are enabled in Settings → Privacy & Security → Location Services → DayRoute. For best results, select 'While Using the App'. If routes aren't calculating, ensure you have an internet connection.",
      },
      {
        question: "Receipt scanner isn't recognising text",
        answer:
          "For best results: ensure good lighting, hold the camera steady, make sure the entire receipt is in frame, and avoid shadows or glare. Crumpled or faded receipts may not scan well. You can always enter receipt details manually.",
      },
    ],
  },
];

// Generate FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.flatMap((category) =>
    category.questions.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    }))
  ),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="flex flex-col">
        {/* Hero */}
        <section className="relative overflow-hidden py-24 sm:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
                <HelpCircle className="h-4 w-4" />
                FAQ
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Frequently asked questions
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
                Find answers to common questions about DayRoute. Can&apos;t find what
                you&apos;re looking for? Contact our support team.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            {faqs.map((category) => (
              <div key={category.category} className="mb-12">
                <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {category.questions.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`${category.category}-${index}`}
                      className="bg-card rounded-2xl border px-6"
                    >
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-base">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 sm:py-32 bg-card/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold">
                Still have questions?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Our support team is here to help. Get in touch and we&apos;ll respond
                as quickly as we can.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild>
                  <Link href="/support">Contact Support</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/#download">
                    <Smartphone className="mr-2 h-5 w-5" />
                    Download DayRoute
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
