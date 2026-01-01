"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { Logo } from "./logo";

const navigation = [
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "Use Cases", href: "/use-cases" },
  { name: "Support", href: "/support" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - orange/red pin with green curvy route */}
          <Link href="/" className="flex items-center gap-2">
            <Logo size={40} />
            <span className="text-xl font-bold">DayRoute</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex md:items-center md:gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="#waitlist">Join Waitlist</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="#download">Download App</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
          mobileMenuOpen ? "max-h-96 border-b border-border" : "max-h-0"
        )}
      >
        <div className="px-4 py-4 space-y-2 bg-background">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block rounded-xl px-4 py-3 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4 space-y-2">
            <Button variant="outline" className="w-full" asChild>
              <Link href="#waitlist">Join Waitlist</Link>
            </Button>
            <Button className="w-full" asChild>
              <Link href="#download">Download App</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
