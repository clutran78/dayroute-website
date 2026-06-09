import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// =============================================================================
// POST /api/book-setup
//
// Public endpoint for the "Request a free 15-min setup call" form.
// It does two things:
//   1. Saves the lead into the Supabase `setup_requests` table (your CRM data).
//   2. Best-effort emails you a notification via Resend (skipped if not set up).
//
// The lead is ALWAYS saved first, so even if email fails you never lose it —
// you can still see it on the private /admin page.
// =============================================================================

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = (body.name || "").toString().trim();
    const email = (body.email || "").toString().trim();
    const phone = (body.phone || "").toString().trim();
    const preferredTimes = (body.preferredTimes || "").toString().trim();
    const message = (body.message || "").toString().trim();
    const industry = (body.industry || "").toString().trim();

    // Basic validation — name + a valid-looking email are required.
    if (!name || !email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please enter your name and a valid email." },
        { status: 400 },
      );
    }

    // Capture light metadata (helpful context in the CRM).
    const userAgent = request.headers.get("user-agent") || "";
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ipAddress = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";

    // --- 1. Save the lead (anon key + insert-only RLS policy) ---
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { error } = await supabase.from("setup_requests").insert({
      name,
      email: email.toLowerCase(),
      phone: phone || null,
      preferred_times: preferredTimes || null,
      message: message || null,
      industry: industry || null,
      source: "book-free-setup",
      status: "new",
      ip_address: ipAddress,
      user_agent: userAgent,
    });

    if (error) {
      console.error("setup_requests insert error:", error);
      return NextResponse.json(
        { error: "Something went wrong saving your request. Please try again." },
        { status: 500 },
      );
    }

    // --- 2. Best-effort email notification (never blocks the response) ---
    await sendNotificationEmail({ name, email, phone, preferredTimes, message, industry });

    return NextResponse.json(
      { message: "Thanks! We'll be in touch shortly to lock in your time." },
      { status: 201 },
    );
  } catch (err) {
    console.error("book-setup API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// =============================================================================
// Email notification via Resend REST API (no SDK dependency needed).
// Completely optional: if RESEND_API_KEY is missing, we skip quietly.
// =============================================================================
async function sendNotificationEmail(lead: {
  name: string;
  email: string;
  phone: string;
  preferredTimes: string;
  message: string;
  industry: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return; // Email not configured yet — lead is still saved.

  const to = process.env.NOTIFY_EMAIL || "yourhelp@dayroute.com.au";
  // Must be a verified domain in Resend. Falls back to Resend's test sender.
  const from = process.env.RESEND_FROM || "DayRoute <onboarding@resend.dev>";

  const html = `
    <h2>New setup call request</h2>
    <p><strong>Name:</strong> ${escapeHtml(lead.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(lead.phone) || "—"}</p>
    <p><strong>Industry:</strong> ${escapeHtml(lead.industry) || "—"}</p>
    <p><strong>Preferred times:</strong> ${escapeHtml(lead.preferredTimes) || "—"}</p>
    <p><strong>Message:</strong><br/>${escapeHtml(lead.message) || "—"}</p>
    <hr/>
    <p>See all leads in your admin CRM: https://dayroute.com.au/admin</p>
  `;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject: `New setup request — ${lead.name}`,
        html,
        reply_to: lead.email,
      }),
    });
  } catch (e) {
    // Never fail the request because of email — the lead is already saved.
    console.error("Resend notification failed:", e);
  }
}

/** Minimal HTML escaping so lead input can't break the email markup. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
