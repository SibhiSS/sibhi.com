import { NextResponse } from "next/server";
import { Resend } from "resend";



// Configurable recipient and sender emails
const RECEIVER_EMAIL = process.env.NUDGE_RECEIVER_EMAIL || "sibhis5223@gmail.com";
const SENDER_EMAIL = process.env.NUDGE_SENDER_EMAIL || "onboarding@resend.dev";

// Extremely simple server-side in-memory rate limiting (IP-based cooldown)
// Maps IP to the last nudge timestamp
const ipCooldowns = new Map<string, number>();
const COOLDOWN_DURATION = 1000 * 60 * 30; // 30 minutes cooldown

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "A valid name is required to send a nudge." },
        { status: 400 }
      );
    }

    const trimmedName = name.trim().substring(0, 50); // Limit name length

    // Simple IP determination
    const ip = req.headers.get("x-forwarded-for") || "unknown-ip";
    const now = Date.now();

    // Check cooldown
    if (ipCooldowns.has(ip)) {
      const lastNudge = ipCooldowns.get(ip) || 0;
      if (now - lastNudge < COOLDOWN_DURATION) {
        const remainingMin = Math.ceil((COOLDOWN_DURATION - (now - lastNudge)) / (1000 * 60));
        return NextResponse.json(
          { error: `You have already sent a nudge. Please wait ${remainingMin} minutes.` },
          { status: 429 }
        );
      }
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY environment variable.");
      return NextResponse.json(
        { error: "Nudge service is not fully configured." },
        { status: 500 }
      );
    }

    // Initialize Resend dynamically
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Trigger email using Resend
    const { data, error } = await resend.emails.send({
      from: `Nudge Bot <${SENDER_EMAIL}>`,
      to: RECEIVER_EMAIL,
      subject: `${trimmedName} nudged you to commit.`,
      text: `${trimmedName} did you do?`,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }

    // Set rate limit cooldown on success
    ipCooldowns.set(ip, now);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Nudge API Route error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
