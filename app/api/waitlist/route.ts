export const runtime = "edge";

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) throw new Error("Missing Supabase env vars");
  return createClient(url, key);
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured yet — skip check

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, response: token, remoteip: ip }),
      }
    );
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch {
    // Turnstile unreachable — fail open to avoid blocking real users
    console.error("[WAITLIST] Turnstile verify failed, failing open");
    return true;
  }
}

// Sends the "welcome" confirmation email via Resend. Never throws — a failed
// send must not break the signup.
async function sendConfirmationEmail(to: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[WAITLIST] RESEND_API_KEY not set — skipping confirmation email");
    return;
  }

  const year = new Date().getFullYear();

  const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Welcome to Lolik Trends</title></head>
<body style="margin:0;padding:0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#15151F;border:1px solid #26263A;border-radius:16px;overflow:hidden;">
        <tr><td style="padding:34px 32px 0;text-align:center;">
          <img src="https://lolikai.eu/logo-transparent.png" alt="Lolik Trends" width="48" height="48" style="display:inline-block;border-radius:10px;">
          <div style="margin-top:12px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:600;color:#EDEDF2;">Lolik Trends</div>
        </td></tr>
        <tr><td style="padding:22px 32px 6px;text-align:center;">
          <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:700;color:#EDEDF2;">You&rsquo;re on the list &#127881;</h1>
        </td></tr>
        <tr><td style="padding:0 32px 8px;text-align:center;">
          <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#9A9AA8;">
            Thanks for joining the <strong style="color:#EDEDF2;">Lolik Trends</strong> waitlist. We&rsquo;ll email you the moment access opens.
          </p>
        </td></tr>
        <tr><td style="padding:16px 32px 4px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#1C1630;border:1px solid rgba(139,92,246,0.35);border-radius:12px;">
            <tr><td style="padding:14px 18px;text-align:center;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:#EDEDF2;">
              &#128081; First 50 members get <span style="color:#A78BFA;">Ultra Pro free</span> for 1 month
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:22px 32px 30px;text-align:center;">
          <a href="https://lolikai.eu" style="display:inline-block;background:#8B5CF6;color:#ffffff;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:600;padding:12px 26px;border-radius:10px;">Visit Lolik Trends</a>
        </td></tr>
        <tr><td style="padding:18px 32px 26px;border-top:1px solid #26263A;text-align:center;">
          <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#6B6B7B;">&copy; ${year} Lolik AI &middot; <a href="https://lolikai.eu/privacy" style="color:#8B5CF6;text-decoration:none;">Privacy</a> &middot; <a href="https://lolikai.eu/terms" style="color:#8B5CF6;text-decoration:none;">Terms</a></p>
          <p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#6B6B7B;">You received this because you joined the waitlist at lolikai.eu.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = [
    "You're on the list 🎉",
    "",
    "Thanks for joining the Lolik Trends waitlist. We'll email you the moment access opens.",
    "",
    "First 50 members get Ultra Pro free for the first month.",
    "",
    "Visit Lolik Trends: https://lolikai.eu",
    "",
    `© ${year} Lolik AI · Privacy: https://lolikai.eu/privacy · Terms: https://lolikai.eu/terms`,
    "You received this because you joined the waitlist at lolikai.eu.",
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Lolik Trends <noreply@lolikai.eu>",
        to: [to],
        reply_to: "contact@lolikai.eu",
        subject: "Welcome to the Lolik Trends Waitlist",
        html,
        text,
      }),
    });

    if (res.ok) {
      const data = (await res.json()) as { id?: string };
      console.log(`[WAITLIST] Confirmation email sent to ${to} (id: ${data.id ?? "n/a"})`);
    } else {
      const body = await res.text();
      console.error(`[WAITLIST] Resend send failed ${res.status}: ${body}`);
    }
  } catch (err) {
    console.error("[WAITLIST] Confirmation email error:", err);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // ── 1. Honeypot — bots fill this, humans don't ───────────────────────────
    if (body?.website) {
      // Silent 200 so bots think they succeeded
      return NextResponse.json({ success: true });
    }

    // ── 2. Email validation ──────────────────────────────────────────────────
    const email: string | undefined =
      typeof body?.email === "string" ? body.email.trim().toLowerCase() : undefined;

    if (!email || !email.includes("@") || !email.includes(".") || email.length > 320) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // ── 3. Turnstile verification ────────────────────────────────────────────
    const turnstileToken = typeof body?.turnstileToken === "string" ? body.turnstileToken : "";
    const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";

    // Require a token only when the widget is actually shown to users
    // (i.e. the public site key is configured). Otherwise the honeypot guards us.
    if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && process.env.TURNSTILE_SECRET_KEY && !turnstileToken) {
      return NextResponse.json({ error: "Challenge required" }, { status: 400 });
    }

    if (turnstileToken) {
      const valid = await verifyTurnstile(turnstileToken, ip);
      if (!valid) {
        console.warn(`[WAITLIST] Turnstile failed for IP ${ip}`);
        return NextResponse.json({ error: "Challenge failed" }, { status: 403 });
      }
    }

    // ── 4. Save to Supabase ──────────────────────────────────────────────────
    const supabase = getSupabase();

    const { error } = await supabase
      .from("waitlist")
      .upsert({ email, joined_at: new Date().toISOString() }, { onConflict: "email" });

    if (error) {
      console.error("[WAITLIST]", error.message);
      return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }

    // ── 5. Confirmation email — isolated, never blocks the signup ────────────
    await sendConfirmationEmail(email);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
