import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, business, url, issue, _honey } = body;

  // Honeypot — discard silently
  if (_honey) return NextResponse.json({ ok: true });

  // Basic validation
  if (!name || !email || !business || !issue) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Intentional <hello@getintentional.ai>",
    to: "mike.harrison@deependable.com",
    replyTo: email,
    subject: `New inquiry from ${name} — ${business}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Organisation: ${business}`,
      `Website: ${url || "—"}`,
      ``,
      `Issue:`,
      issue,
    ].join("\n"),
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
