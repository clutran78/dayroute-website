import { createHmac } from "crypto";
import { cookies } from "next/headers";

// =============================================================================
// Simple password gate for the private /admin CRM.
//
// How it works:
//   - You set ADMIN_PASSWORD in your environment (Vercel + .env.local).
//   - On login we store a one-way hashed token in an httpOnly cookie.
//   - Every admin request re-derives that token and compares it.
//
// This is intentionally lightweight (no user accounts) — right-sized for a
// single founder checking their own leads. The cookie is httpOnly + secure so
// it can't be read by JavaScript, and the raw password is never stored.
// =============================================================================

export const ADMIN_COOKIE = "dr_admin";

/** Derive the cookie token from the password. Returns "" if not configured. */
export function adminToken(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return "";
  // HMAC the password with itself as the key — stable, non-reversible token.
  return createHmac("sha256", password).update("dayroute-admin").digest("hex");
}

/** True if the given password matches ADMIN_PASSWORD. */
export function isValidPassword(input: string): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  return input === password;
}

/** True if the current request carries a valid admin session cookie. */
export async function isAdminAuthed(): Promise<boolean> {
  const expected = adminToken();
  if (!expected) return false; // ADMIN_PASSWORD not set — locked by default.
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === expected;
}
