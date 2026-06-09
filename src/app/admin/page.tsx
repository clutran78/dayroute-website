import { Metadata } from "next";
import { isAdminAuthed } from "../../lib/admin-auth";
import { AdminLoginForm } from "./login-form";
import { CrmTable } from "./crm-table";

// Keep the admin area out of search engines entirely.
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// Always render fresh — never cache the admin/auth state.
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = await isAdminAuthed();

  // Not signed in -> show the password gate. Signed in -> show the CRM.
  return authed ? <CrmTable /> : <AdminLoginForm />;
}
