import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Lazily initialize Resend only when API key is available
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Get Resend client (null if not configured)
    const resend = getResendClient();

    // Check if Resend API key is configured
    if (!resend) {
      console.log("Support form submission (no email configured):", {
        name,
        email,
        message,
      });
      // In development or if email not configured, just log and return success
      return NextResponse.json({ success: true });
    }

    // Send email via Resend
    await resend.emails.send({
      from: "DayRoute Support <yourhelp@dayroute.com.au>",
      to: ["yourhelp@dayroute.com.au"],
      replyTo: email,
      subject: `Support Request from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}

---
Sent from DayRoute website support form
      `,
      html: `
<h2>Support Request</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<h3>Message:</h3>
<p>${message.replace(/\n/g, "<br>")}</p>
<hr>
<p style="color: #666; font-size: 12px;">Sent from DayRoute website support form</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Support form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
