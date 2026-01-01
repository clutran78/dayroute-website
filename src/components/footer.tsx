import Link from "next/link";
import { Logo } from "./logo";
import { Download } from "lucide-react";
import { Button } from "./ui/button";
import {
  getDownloadUrl,
  getDownloadCta,
  APP_STORE_URL,
  IS_APP_LIVE,
} from "../lib/app-store-config";

/**
 * Footer navigation links organized by category.
 */
const footerLinks = {
  product: [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Use Cases", href: "/use-cases" },
    { name: "Security", href: "/security" },
  ],
  support: [
    { name: "Help Centre", href: "/support" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/support#contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Use", href: "/terms" },
  ],
};

/**
 * Responsive Footer Component
 * 
 * Desktop: 4-column layout
 * Tablet: 2x2 grid for links, brand spans full width on top
 * Mobile: Stacked single column
 * 
 * Touch targets are minimum 44px height for accessibility.
 * 
 * Uses centralized app-store-config for download links.
 * When the app is live on App Store, links automatically update.
 */
export function Footer() {
  // Get download URL and CTA from centralized config
  const downloadUrl = getDownloadUrl();
  const downloadCta = getDownloadCta();

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand section - full width on mobile, first column on desktop */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 min-h-[44px]"
            >
              <Logo size={36} className="shrink-0" />
              <span className="text-lg sm:text-xl font-bold">DayRoute</span>
            </Link>
            <p className="mt-3 sm:mt-4 text-sm text-muted-foreground max-w-xs">
              The field-service day planner for tradies, cleaners, NDIS
              providers, and mobile professionals across Australia.
            </p>
            
            {/* Download CTA - uses centralized config */}
            <div className="mt-5 sm:mt-6">
              <Button size="sm" className="gap-2" asChild>
                <Link 
                  href={downloadUrl}
                  // Open in new tab when linking to external App Store
                  target={IS_APP_LIVE ? "_blank" : undefined}
                  rel={IS_APP_LIVE ? "noopener noreferrer" : undefined}
                >
                  <Download className="h-4 w-4" />
                  {downloadCta}
                </Link>
              </Button>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Product</h3>
            <ul className="space-y-1">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors py-2 min-h-[44px]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Support</h3>
            <ul className="space-y-1">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors py-2 min-h-[44px]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Legal</h3>
            <ul className="space-y-1">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors py-2 min-h-[44px]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar with copyright */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
              © {new Date().getFullYear()} DayRoute. All rights reserved.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Made in Australia 🇦🇺
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
