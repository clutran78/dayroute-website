"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  MessageSquare,
  RefreshCw,
  Settings,
  HelpCircle,
  ChevronRight,
  Check,
  AlertCircle,
  Smartphone,
  Calendar,
  MapPin,
  Camera,
  Send,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

export function SupportContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        const data = await response.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Failed to send message. Please email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

      {/* Contact Form */}
      <section id="contact" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Contact Support</h2>
              <p className="mt-4 text-muted-foreground">
                Can&apos;t find what you need? Send us a message and we&apos;ll get back
                to you.
              </p>
            </div>

            {/* Email option */}
            <div className="flex items-center justify-center gap-4 mb-8 p-4 rounded-2xl bg-secondary">
              <Mail className="h-5 w-5 text-primary" />
              <span className="text-sm">
                Or email us directly at{" "}
                <a
                  href="mailto:yourhelp@dayroute.com.au"
                  className="text-primary hover:underline font-medium"
                >
                  yourhelp@dayroute.com.au
                </a>
              </span>
            </div>

            {submitted ? (
              <Card className="border-primary/50 bg-primary/5">
                <CardContent className="p-8 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Message sent!</h3>
                  <p className="text-muted-foreground">
                    Thanks for reaching out. We&apos;ll get back to you as soon as
                    possible, usually within 1-2 business days.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6 sm:p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                      >
                        Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-2"
                      >
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="How can we help?"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        required
                        rows={5}
                      />
                    </div>

                    {error && (
                      <div className="flex items-center gap-2 text-sm text-red-500">
                        <AlertCircle className="h-4 w-4" />
                        {error}
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
