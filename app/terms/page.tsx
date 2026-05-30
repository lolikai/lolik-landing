import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service — Lolik Trends",
  description: "Terms for using the Lolik Trends early-access product.",
};

export default function TermsPage() {
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
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Terms of Service</h1>
        <p className="text-xs text-[var(--color-text-muted)] mb-10">Last updated: May 27, 2026</p>

        <div className="space-y-8 text-sm leading-relaxed text-[var(--color-text-muted)]">
          <section>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">Early access</h2>
            <p>
              Lolik Trends is an early-access product operated by Lolik AI. Features are under active
              development and may change, break, or be removed without notice during this period.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">Acceptable use</h2>
            <p>
              You agree to use Lolik Trends lawfully and not to abuse, disrupt, scrape, or attempt to gain
              unauthorized access to the service. We may suspend access for misuse.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">No warranty</h2>
            <p>
              The service is provided &ldquo;as is&rdquo; without warranties of any kind. Trend signals and
              AI-generated insights are for informational purposes and should not be treated as guaranteed
              outcomes.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">Privacy</h2>
            <p>
              Your use of Lolik Trends is also governed by our{" "}
              <Link href="/privacy" className="text-[var(--color-accent)] hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">Contact</h2>
            <p>
              Questions about these terms? Reach us at{" "}
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
