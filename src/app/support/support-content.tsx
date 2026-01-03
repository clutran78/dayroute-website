import Link from "next/link";
import {
  Mail,
  RefreshCw,
  Settings,
  HelpCircle,
  ChevronRight,
  AlertCircle,
  Calendar,
  MapPin,
  Camera,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

export function SupportContent() {
  const troubleshootingTopics = [
    {
      icon: Mail,
      title: "Not receiving login emails",
      description:
        "Check your spam folder. Add yourhelp@dayroute.com.au to contacts. If using work email, try a personal email instead.",
    },
    {
      icon: Calendar,
      title: "Calendar not syncing",
      description:
        "Go to Settings → Privacy & Security → Calendars → ensure DayRoute is enabled. Try toggling the permission off and on.",
    },
    {
      icon: MapPin,
      title: "Location or maps issues",
      description:
        "Check Settings → Privacy & Security → Location Services → DayRoute is set to 'While Using the App'. Ensure internet connection.",
    },
    {
      icon: Camera,
      title: "Receipt scanner not working",
      description:
        "Ensure good lighting, hold steady, keep entire receipt in frame. Avoid shadows and glare. Crumpled receipts may not scan well.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <HelpCircle className="h-4 w-4" />
              Support
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              How can we help?
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Get help with DayRoute. Check troubleshooting tips below or contact
              our support team.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card className="hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 mb-4">
                  <RefreshCw className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Restore Purchases</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Reinstalled the app or got a new device? Restore your
                  subscription in the app settings.
                </p>
                <p className="text-sm">
                  Open DayRoute → Settings → Restore Purchases
                </p>
              </CardContent>
            </Card>

            <Card className="hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 mb-4">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Manage Subscription
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Cancel, upgrade, or renew your subscription through Apple ID
                  settings.
                </p>
                <p className="text-sm">
                  Settings → [Your Name] → Subscriptions → DayRoute
                </p>
              </CardContent>
            </Card>

            <Card className="hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 mb-4">
                  <HelpCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Read the FAQ</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Find answers to common questions about features, privacy, and
                  billing.
                </p>
                <Link
                  href="/faq"
                  className="text-sm text-primary hover:underline inline-flex items-center"
                >
                  View FAQ
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Subscription Info Box */}
          <div className="max-w-3xl mx-auto mb-16">
            <Card className="border-amber-500/30 bg-amber-500/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="h-6 w-6 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-2">
                      Subscription management
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      DayRoute subscriptions are managed through the Apple App
                      Store, not through our app or website. To cancel, change,
                      or renew your subscription:
                    </p>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Open the Settings app on your iPhone</li>
                      <li>Tap your name at the top</li>
                      <li>Tap Subscriptions</li>
                      <li>Tap DayRoute</li>
                      <li>Make changes or cancel</li>
                    </ol>
                    <p className="text-sm text-muted-foreground mt-4">
                      For refunds, please contact Apple Support at{" "}
                      <a
                        href="https://reportaproblem.apple.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        reportaproblem.apple.com
                      </a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="py-16 sm:py-24 bg-card/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Troubleshooting</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {troubleshootingTopics.map((topic) => (
              <Card key={topic.title}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <topic.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{topic.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    {topic.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support - Simple email button */}
      <section id="contact" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold">Contact Support</h2>
            <p className="mt-4 text-muted-foreground">
              Can&apos;t find what you need? Email us and we&apos;ll get back to you
              within 1-2 business days.
            </p>

            {/* Big email button - opens user's email app */}
            <Button 
              size="lg" 
              className="mt-8 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 h-auto w-full sm:w-auto max-w-sm mx-auto"
              asChild
            >
              <a 
                href="mailto:yourhelp@dayroute.com.au?subject=DayRoute%20Support%20Request"
                className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3"
              >
                <Mail className="h-6 w-6 sm:h-5 sm:w-5" />
                <span className="flex flex-col sm:flex-row sm:gap-1">
                  <span>Email Us</span>
                  <span className="text-sm sm:text-base opacity-90">yourhelp@dayroute.com.au</span>
                </span>
              </a>
            </Button>

            <p className="mt-6 text-xs sm:text-sm text-muted-foreground px-4">
              This will open your email app so you can send us a message directly.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
