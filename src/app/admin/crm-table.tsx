"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Mail, Phone, Clock, RefreshCw, LogOut } from "lucide-react";
import { Button } from "../../components/ui/button";

// Shape of a lead row (mirrors the setup_requests table).
type Lead = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  preferred_times: string | null;
  message: string | null;
  industry: string | null;
  status: string;
  admin_notes: string | null;
};

const STATUSES = ["new", "contacted", "booked", "done", "archived"];

const STATUS_STYLES: Record<string, string> = {
  new: "bg-primary/15 text-primary",
  contacted: "bg-amber-500/15 text-amber-600",
  booked: "bg-blue-500/15 text-blue-600",
  done: "bg-green-500/15 text-green-600",
  archived: "bg-muted text-muted-foreground",
};

export function CrmTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load leads from the protected admin API.
  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/leads");
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to load.");
      setLeads(json.leads);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  // Save a status or notes change for one lead.
  async function update(id: string, patch: { status?: string; adminNotes?: string }) {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === id
          ? { ...l, status: patch.status ?? l.status, admin_notes: patch.adminNotes ?? l.admin_notes }
          : l,
      ),
    );
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...patch }),
    });
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  // Count leads per status for the summary bar.
  const counts = STATUSES.reduce<Record<string, number>>((acc, s) => {
    acc[s] = leads.filter((l) => l.status === s).length;
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Leads CRM</h1>
          <p className="text-sm text-muted-foreground">{leads.length} total requests</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={load}>
            <RefreshCw className="h-4 w-4 mr-1.5" /> Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={logout}>
            <LogOut className="h-4 w-4 mr-1.5" /> Sign out
          </Button>
        </div>
      </div>

      {/* Status summary */}
      <div className="flex flex-wrap gap-2 mb-6">
        {STATUSES.map((s) => (
          <span key={s} className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${STATUS_STYLES[s]}`}>
            {s}: {counts[s]}
          </span>
        ))}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-16 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}

      {error && <p className="text-destructive py-6">{error}</p>}

      {!loading && !error && leads.length === 0 && (
        <p className="text-muted-foreground py-16 text-center">No leads yet.</p>
      )}

      {/* Lead cards */}
      <div className="space-y-4">
        {leads.map((lead) => (
          <div key={lead.id} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h3 className="font-semibold">{lead.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {new Date(lead.created_at).toLocaleString("en-AU")}
                  {lead.industry ? ` · ${lead.industry}` : ""}
                </p>
              </div>
              <select
                value={lead.status}
                onChange={(e) => update(lead.id, { status: e.target.value })}
                className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm capitalize"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-3 flex flex-col gap-1.5 text-sm">
              <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-foreground hover:text-primary">
                <Mail className="h-4 w-4 text-muted-foreground" /> {lead.email}
              </a>
              {lead.phone && (
                <a href={`tel:${lead.phone}`} className="flex items-center gap-2 text-foreground hover:text-primary">
                  <Phone className="h-4 w-4 text-muted-foreground" /> {lead.phone}
                </a>
              )}
              {lead.preferred_times && (
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" /> {lead.preferred_times}
                </span>
              )}
            </div>

            {lead.message && (
              <p className="mt-3 text-sm text-muted-foreground border-l-2 border-border pl-3">
                {lead.message}
              </p>
            )}

            {/* Private admin notes (saved on blur) */}
            <textarea
              defaultValue={lead.admin_notes ?? ""}
              placeholder="Private notes…"
              rows={2}
              onBlur={(e) => {
                if (e.target.value !== (lead.admin_notes ?? "")) {
                  update(lead.id, { adminNotes: e.target.value });
                }
              }}
              className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
