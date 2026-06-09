import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthed } from "../../../../lib/admin-auth";
import { getSupabaseAdmin } from "../../../../lib/supabase-admin";

// Allowed lead statuses for the simple CRM pipeline.
const VALID_STATUSES = ["new", "contacted", "booked", "done", "archived"];

// =============================================================================
// GET /api/admin/leads   -> list all leads (newest first)
// =============================================================================
export async function GET() {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Admin database access not configured (SUPABASE_SERVICE_ROLE_KEY missing)." },
      { status: 503 },
    );
  }

  const { data, error } = await supabase
    .from("setup_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("admin leads fetch error:", error);
    return NextResponse.json({ error: "Failed to load leads." }, { status: 500 });
  }

  return NextResponse.json({ leads: data ?? [] });
}

// =============================================================================
// PATCH /api/admin/leads  -> update a lead's status and/or admin notes
// body: { id: string, status?: string, adminNotes?: string }
// =============================================================================
export async function PATCH(request: NextRequest) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Admin database access not configured." },
      { status: 503 },
    );
  }

  const body = await request.json();
  const id = (body.id || "").toString();
  if (!id) {
    return NextResponse.json({ error: "Missing lead id." }, { status: 400 });
  }

  // Only update the fields that were provided.
  const updates: Record<string, string> = {};
  if (typeof body.status === "string") {
    if (!VALID_STATUSES.includes(body.status)) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }
    updates.status = body.status;
  }
  if (typeof body.adminNotes === "string") {
    updates.admin_notes = body.adminNotes;
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
  }

  const { error } = await supabase.from("setup_requests").update(updates).eq("id", id);
  if (error) {
    console.error("admin leads update error:", error);
    return NextResponse.json({ error: "Failed to update lead." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
