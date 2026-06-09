"use client";

import React, { useState } from "react";
import { Lock, Loader2 } from "lucide-react";
import { Button } from "../../components/ui/button";

/** Password gate for the admin CRM. On success it reloads the page. */
export function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Login failed.");
      // Cookie is set — reload so the server renders the CRM.
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-24">
      <div className="rounded-2xl border border-border bg-card p-8">
        <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 mx-auto mb-5">
          <Lock className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-xl font-bold text-center mb-1">Admin access</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Enter your admin password to view leads.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            autoFocus
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
