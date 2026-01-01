import { Metadata } from "next";
import { SupportContent } from "./support-content";

export const metadata: Metadata = {
  title: "Support - Get Help with DayRoute",
  description:
    "Get help with DayRoute. Contact support, restore purchases, manage subscriptions, and find troubleshooting tips for login, calendar, location, and receipt scanning issues.",
  openGraph: {
    title: "DayRoute Support - We're Here to Help",
    description:
      "Contact support, troubleshoot issues, and manage your DayRoute subscription.",
  },
};

export default function SupportPage() {
  return <SupportContent />;
}
