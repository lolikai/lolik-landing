import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — Lolik Trends",
  description: "How Lolik Trends handles your data and waitlist email.",
};

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[var(--color-accent)]/[0.03] rounded-full blur-[120px]" />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-5 md:px-12 py-5 max-w-3xl mx-auto">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo-transparent.png" alt="Lolik Trends" width={28} height={28} className="rounded-md" />
          <span className="text-sm font-semibold">Lolik Trends</span>
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back home
        </Link>
      </nav>

      <main className="relative z-10 max-w-3xl mx-auto px-5 md:px-12 pb-24 pt-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-xs text-[var(--color-text-muted)] mb-10">Last updated: May 27, 2026</p>

        <div className="space-y-8 text-sm leading-relaxed text-[var(--color-text-muted)]">
          <section>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">Overview</h2>
            <p>
              Lolik Trends (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is an early-access product operated by Lolik AI.
              This page explains, in plain terms, what data we collect and how we use it. We keep
              collection to a minimum.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">Waitlist email</h2>
            <p>
              When you join our early-access waitlist, we collect the email address you provide. We use
              it for a single purpose: to notify you when access opens and to share relevant product
              updates about Lolik Trends.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">We do not sell your data</h2>
            <p>
              We do <span className="text-[var(--color-text-primary)] font-medium">not</span> sell, rent, or
              trade your email or any personal information to third parties. Your email is stored securely
              and is never exposed publicly.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">Account data</h2>
            <p>
              If you create an account, we store the email and profile details needed to operate your
              account, handled through our authentication provider (Supabase).
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">Your choices</h2>
            <p>
              You can request removal from the waitlist or deletion of your account data at any time by
              emailing{" "}
              <a href="mailto:contact@lolikai.eu" className="text-[var(--color-accent)] hover:underline">
                contact@lolikai.eu
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">Contact</h2>
            <p>
              Questions about this policy? Reach us at{" "}
              <a href="mailto:contact@lolikai.eu" className="text-[var(--color-accent)] hover:underline">
                contact@lolikai.eu
              </a>
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
