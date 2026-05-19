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

    const phrases = [
      { subject: "{name} nudged you to commit.", body: "{name} is nudging you to ship something today." },
      { subject: "{name} is waiting for a commit.", body: "{name} noticed your GitHub graph is looking empty today." },
      { subject: "Time to push code, says {name}.", body: "{name} is gently reminding you to keep the streak alive." },
      { subject: "{name} expects greatness today.", body: "{name} thinks you should push that commit now." },
      { subject: "A gentle nudge from {name}.", body: "{name} asks: did you write any code today?" },
      { subject: "{name} sent a commit reminder.", body: "Don't break the streak! {name} is watching." },
      { subject: "{name} says: ship it!", body: "{name} is waiting for you to push to production." },
      { subject: "Commit streak at risk ({name}).", body: "{name} wants to see a green square today." },
      { subject: "{name} believes in your code.", body: "Just one commit. {name} knows you can do it." },
      { subject: "Knock knock from {name}.", body: "{name} is wondering where today's commit is." },
      { subject: "{name} wants to see some code.", body: "Is the keyboard broken? {name} is waiting for a commit." },
      { subject: "{name} demands a commit.", body: "{name} expects to see some progress today." },
      { subject: "A friendly poke from {name}.", body: "{name} is reminding you to push your changes." },
      { subject: "{name} is checking up on you.", body: "{name} noticed zero commits today. What's up?" },
      { subject: "Commit alert from {name}.", body: "{name} says it's time to open VS Code." },
      { subject: "{name} wants a green square.", body: "{name} is cheering you on to make a commit today." },
      { subject: "Don't disappoint {name}.", body: "{name} is looking forward to your daily commit." },
      { subject: "{name} says hello (and commit).", body: "Hello from {name}. Now go write some code." },
      { subject: "A nudge from {name}.", body: "{name} is reminding you that consistency is key." },
      { subject: "{name} is on your case.", body: "{name} noticed you haven't shipped anything yet today." },
      { subject: "{name} is tapping their watch.", body: "Tick tock! {name} is waiting for you to commit." },
      { subject: "No commits? {name} is surprised.", body: "{name} expects more from you today." },
      { subject: "{name} is politely requesting a commit.", body: "{name} would love to see some fresh code." },
      { subject: "A gentle shove from {name}.", body: "{name} is pushing you to push." },
      { subject: "{name} thinks you forgot something.", body: "Did you forget to commit today? {name} thinks so." },
      { subject: "Commit reminder powered by {name}.", body: "{name} is keeping you accountable today." },
      { subject: "{name} is checking your streak.", body: "{name} sees a blank square today. Let's fix that." },
      { subject: "Incoming nudge from {name}.", body: "{name} says: stop procrastinating and code." },
      { subject: "{name} is your commit conscience.", body: "{name} says you'll feel better after you commit." },
      { subject: "{name} wants to see the green.", body: "{name} loves seeing your GitHub graph light up." },
      { subject: "Friendly fire from {name}.", body: "{name} is attacking you with commit reminders." },
      { subject: "{name} is monitoring your repo.", body: "{name} is waiting for a notification." },
      { subject: "A little birdie named {name}.", body: "{name} told me you haven't committed yet." },
      { subject: "{name} says: just do it.", body: "Nike slogan but for GitHub. {name} expects a commit." },
      { subject: "{name} is expecting a pull request.", body: "Or at least a commit. {name} is waiting." },
      { subject: "Nudge protocol initiated by {name}.", body: "{name} has activated the commit reminder." },
      { subject: "{name} is wondering if you code.", body: "Prove {name} right by committing today." },
      { subject: "A daily reminder from {name}.", body: "{name} says: daily commits build empires." },
      { subject: "{name} is poking you.", body: "Poke back with a commit. {name} is waiting." },
      { subject: "{name} says: git add, git commit.", body: "{name} is reminding you of the basics." },
      { subject: "Your daily nudge by {name}.", body: "{name} wants to make sure you stay on track." },
      { subject: "{name} is watching your graph.", body: "{name} sees a grey square. Turn it green." },
      { subject: "A friendly nudge by {name}.", body: "{name} says: open the terminal and push." },
      { subject: "{name} is expecting greatness.", body: "{name} knows you have code to push today." },
      { subject: "Commit time? {name} thinks so.", body: "{name} says the time is now." },
      { subject: "{name} is checking in.", body: "{name} wants to know if you've coded today." },
      { subject: "A gentle reminder via {name}.", body: "{name} says: don't let the streak die." },
      { subject: "{name} is rooting for you.", body: "{name} wants to see you succeed today." },
      { subject: "Commit check by {name}.", body: "{name} says: status is uncommitted." },
      { subject: "{name} says: push it real good.", body: "{name} is waiting for that git push." },
      { subject: "Nudged by {name}.", body: "{name} is reminding you to do your daily dev." },
      { subject: "{name} is expecting a push.", body: "{name} is waiting for the code to drop." },
      { subject: "A friendly poke via {name}.", body: "{name} says: keep the green squares coming." },
      { subject: "{name} is asking for a commit.", body: "{name} wants to see some progress." },
      { subject: "Commit reminder by {name}.", body: "{name} says: don't forget to push." },
      { subject: "{name} says: ship the code.", body: "{name} is waiting for the deployment." },
      { subject: "A gentle shove by {name}.", body: "{name} says: get to work!" },
      { subject: "{name} is expecting a green square.", body: "{name} says: make it happen." },
      { subject: "Commit nudge from {name}.", body: "{name} is reminding you to push." },
      { subject: "{name} says: code time.", body: "{name} says: open the editor." },
      { subject: "A friendly reminder by {name}.", body: "{name} says: keep the streak alive." },
      { subject: "{name} is checking your progress.", body: "{name} says: need more commits." },
      { subject: "Commit alert via {name}.", body: "{name} says: push the changes." },
      { subject: "{name} says: git push origin main.", body: "{name} is waiting for the push." },
      { subject: "A gentle nudge via {name}.", body: "{name} says: don't break the streak." },
      { subject: "{name} is expecting a commit.", body: "{name} says: code something today." },
      { subject: "Commit reminder via {name}.", body: "{name} says: push your work." },
      { subject: "{name} says: keep coding.", body: "{name} says: the graph needs green." },
      { subject: "A friendly shove by {name}.", body: "{name} says: push the code." },
      { subject: "{name} is checking your GitHub.", body: "{name} says: no commits yet?" },
      { subject: "Commit nudge by {name}.", body: "{name} says: time to push." },
      { subject: "{name} says: green squares only.", body: "{name} says: keep the streak going." },
      { subject: "A gentle poke by {name}.", body: "{name} says: push the commits." },
      { subject: "{name} is expecting a pull request.", body: "{name} says: ship it." },
      { subject: "Commit alert by {name}.", body: "{name} says: push the code now." },
      { subject: "{name} says: git add .", body: "{name} is waiting for the commit." },
      { subject: "A friendly nudge from {name}.", body: "{name} says: keep up the good work." },
      { subject: "{name} is checking your stats.", body: "{name} says: needs more green." },
      { subject: "Commit reminder from {name}.", body: "{name} says: don't forget to commit." },
      { subject: "{name} says: code every day.", body: "{name} says: push something." },
      { subject: "A gentle shove from {name}.", body: "{name} says: push the changes." },
      { subject: "{name} is expecting a green square today.", body: "{name} says: make it green." },
      { subject: "Commit nudge via {name}.", body: "{name} says: time to code." },
      { subject: "{name} says: keep the streak.", body: "{name} says: don't stop now." },
      { subject: "A friendly poke from {name}.", body: "{name} says: push the commits." },
      { subject: "{name} is checking your profile.", body: "{name} says: no commits today?" },
      { subject: "Commit alert from {name}.", body: "{name} says: push the code." },
      { subject: "{name} says: git commit -m.", body: "{name} is waiting for the message." },
      { subject: "A gentle nudge by {name}.", body: "{name} says: keep the streak alive." },
      { subject: "{name} is expecting a commit today.", body: "{name} says: code something." },
      { subject: "Commit reminder by {name}.", body: "{name} says: push your work." },
      { subject: "{name} says: keep coding every day.", body: "{name} says: the graph needs green." },
      { subject: "A friendly shove via {name}.", body: "{name} says: push the code." },
      { subject: "{name} is checking your GitHub profile.", body: "{name} says: no commits yet?" },
      { subject: "Commit nudge by {name}.", body: "{name} says: time to push." },
      { subject: "{name} says: green squares every day.", body: "{name} says: keep the streak going." },
      { subject: "A gentle poke via {name}.", body: "{name} says: push the commits." },
      { subject: "{name} is expecting a PR.", body: "{name} says: ship it." },
      { subject: "Commit alert via {name}.", body: "{name} says: push the code now." },
      { subject: "{name} says: git push.", body: "{name} is waiting for the push." }
    ];

    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    const subject = randomPhrase.subject.replace(/{name}/g, trimmedName);
    const body = randomPhrase.body.replace(/{name}/g, trimmedName);

    // Trigger email using Resend
    const { data, error } = await resend.emails.send({
      from: SENDER_EMAIL,
      to: RECEIVER_EMAIL,
      subject: subject,
      text: body,
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
