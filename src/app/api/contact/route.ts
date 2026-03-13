import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const CONTACT_EMAIL = "saisrinivaspedhapolla@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email is not configured. Set RESEND_API_KEY in .env.local." },
      { status: 503 }
    );
  }

  let body: { name?: string; email?: string; phone?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  if (message.length > 5000) {
    return NextResponse.json(
      { error: "Message is too long." },
      { status: 400 }
    );
  }

  const messageHtml = escapeHtml(message).replace(/\n/g, "<br>");
  const html = `
    <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto; color: #1f2937;">
      <div style="background: linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%); padding: 24px 28px; border-radius: 12px 12px 0 0;">
        <h1 style="margin: 0; font-size: 18px; font-weight: 600; color: #f8fafc;">Portfolio contact – Let's talk about data roles</h1>
      </div>
      <div style="background: #f8fafc; padding: 24px 28px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0 6px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b;">Name</td>
          </tr>
          <tr>
            <td style="padding: 0 0 16px; font-size: 15px; color: #0f172a;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0 6px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b;">Email</td>
          </tr>
          <tr>
            <td style="padding: 0 0 16px;"><a href="mailto:${escapeHtml(email)}" style="font-size: 15px; color: #2563eb;">${escapeHtml(email)}</a></td>
          </tr>
          ${phone ? `
          <tr>
            <td style="padding: 10px 0 6px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b;">Phone</td>
          </tr>
          <tr>
            <td style="padding: 0 0 16px;"><a href="tel:${escapeHtml(phone)}" style="font-size: 15px; color: #2563eb;">${escapeHtml(phone)}</a></td>
          </tr>
          ` : ""}
          <tr>
            <td style="padding: 10px 0 6px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b;">Message</td>
          </tr>
          <tr>
            <td style="padding: 12px 0 0; font-size: 15px; line-height: 1.6; color: #334155; white-space: pre-wrap;">${messageHtml}</td>
          </tr>
        </table>
      </div>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Portfolio contact: ${name} – Let's talk about data roles`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: error.message ?? "Failed to send email." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again or email directly." },
      { status: 500 }
    );
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
