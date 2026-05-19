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
      subject: `⚠️ Nudge: Commit streak reminder from ${trimmedName}!`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 24px; background-color: #0d1117; color: #c9d1d9; border-radius: 12px; border: 1px solid #30363d; max-width: 500px; margin: auto;">
          <h2 style="color: #ff7b72; margin-top: 0; font-weight: 400; font-size: 20px;">⚠️ Commit Streak Reminder!</h2>
          <p style="font-size: 15px; line-height: 1.6; color: #8b949e;">
            Hey Sibhi, <strong>${trimmedName}</strong> just visited your portfolio website and noticed you haven't pushed any commits today.
          </p>
          <div style="margin: 24px 0; padding: 16px; background-color: #161b22; border-radius: 8px; border-left: 4px solid #f85149; font-style: italic; font-size: 14px; color: #e6edf2;">
            "${trimmedName} is waiting for you to keep the streak alive!"
          </div>
          <a href="https://github.com/SibhiSS" target="_blank" style="display: inline-block; background-color: #238636; color: #ffffff; text-decoration: none; padding: 10px 20px; font-size: 14px; font-weight: 500; border-radius: 6px; text-align: center;">Go to GitHub</a>
          <hr style="border: 0; border-top: 1px solid #21262d; margin: 24px 0;" />
          <p style="font-size: 11px; color: #484f58; margin-bottom: 0; text-align: center;">
            Sent automatically from your portfolio's nudge service.
          </p>
        </div>
      `,
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
