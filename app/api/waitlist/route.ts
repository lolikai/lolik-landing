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

    // If Turnstile is configured, require a valid token
    if (process.env.TURNSTILE_SECRET_KEY && !turnstileToken) {
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

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
