import { createClient, SupabaseClient } from "@supabase/supabase-js";

// =============================================================================
// Server-only Supabase admin client.
//
// Uses the SERVICE ROLE key, which BYPASSES Row Level Security. This must NEVER
// be imported into client components or exposed to the browser — it can read
// and write every row. We only use it inside server-side admin API routes.
// =============================================================================

/**
 * Returns a Supabase client with full (service-role) access, or null if the
 * service role key isn't configured yet. Callers should handle the null case
 * gracefully so the site never crashes when the env var is missing.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;

  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
