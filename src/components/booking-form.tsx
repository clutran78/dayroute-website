"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "./ui/button";

/**
 * BookingForm
 *
 * Public "Request a free 15-min setup call" form. Submits to /api/book-setup,
 * which saves the lead to Supabase and emails the team. Self-hosted — no
 * third-party booking service required.
 */
export function BookingForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    // Read values straight off the form.
    const formEl = e.currentTarget;
    const data = new FormData(formEl);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      preferredTimes: data.get("preferredTimes"),
      message: data.get("message"),
    };

    try {
      const res = await fetch("/api/book-setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("success");
      formEl.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  // Success state — friendly confirmation.
  if (status === "success") {
    return (
      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-primary mb-3" />
        <h3 className="text-lg font-semibold">Request received!</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Thanks — we&apos;ll be in touch shortly to lock in a time that suits you.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1.5">
            Your name <span className="text-primary">*</span>
          </label>
          <input id="name" name="name" type="text" required className={inputClass} placeholder="Jane Smith" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1.5">
            Email <span className="text-primary">*</span>
          </label>
          <input id="email" name="email" type="email" required className={inputClass} placeholder="jane@email.com" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1.5">
            Phone
          </label>
          <input id="phone" name="phone" type="tel" className={inputClass} placeholder="0400 000 000" />
        </div>
        <div>
          <label htmlFor="preferredTimes" className="block text-sm font-medium mb-1.5">
            Best times to reach you
          </label>
          <input id="preferredTimes" name="preferredTimes" type="text" className={inputClass} placeholder="Weekday mornings" />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1.5">
          Anything you&apos;d like help with?
        </label>
        <textarea id="message" name="message" rows={3} className={inputClass} placeholder="Tell us a bit about your business…" />
      </div>

      {status === "error" && (
        <p className="text-sm text-destructive">{errorMsg}</p>
      )}

      <Button type="submit" size="lg" className="w-full min-h-[48px]" disabled={status === "loading"}>
        {status === "loading" ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="mr-2 h-5 w-5" />
            Request my free setup call
          </>
        )}
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        No obligation. We&apos;ll only use your details to arrange your setup call.
      </p>
    </form>
  );
}
