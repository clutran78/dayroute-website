import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, adminToken, isValidPassword } from "../../../../lib/admin-auth";

// =============================================================================
// POST /api/admin/login   -> sets the admin session cookie if password matches
// =============================================================================
export async function POST(request: NextRequest) {
  let password = "";
  try {
    const body = await request.json();
    password = (body.password || "").toString();
  } catch {
    // ignore — empty password will simply fail below
  }

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Admin is not configured yet (ADMIN_PASSWORD missing)." },
      { status: 503 },
    );
  }

  if (!isValidPassword(password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  // httpOnly + secure cookie holding the derived (non-reversible) token.
  res.cookies.set(ADMIN_COOKIE, adminToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return res;
}
