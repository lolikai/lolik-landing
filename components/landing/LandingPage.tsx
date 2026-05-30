"use client";

import Image from "next/image";
import Script from "next/script";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  SiYoutube,
  SiTiktok,
  SiReddit,
  SiInstagram,
  SiMeta,
} from "@icons-pack/react-simple-icons";
import {
  Newspaper,
  Bot,
  TrendingUp,
  Zap,
  Eye,
  Target,
  BarChart3,
  Layers,
  ArrowRight,
  ShoppingBag,
  Briefcase,
  X,
  ZoomIn,
  Sparkles,
  Flame,
  Crown,
} from "lucide-react";

// Inline platform token with brand icon (hero subtitle).
function Tag({ icon: Icon, color, children }: { icon: React.ElementType; color: string; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 align-middle whitespace-nowrap font-medium text-[var(--color-text-secondary)]">
      <Icon className={`h-3.5 w-3.5 ${color}`} width={14} height={14} />
      {children}
    </span>
  );
}

// Waitlist "spots filled" bar — starts at a base % and climbs a few points each day (capped).
const SPOTS_BASE_PCT = 72;
const SPOTS_BASE_DATE = Date.UTC(2026, 4, 30); // 2026-05-30 (month is 0-indexed)
const SPOTS_STEP_PER_DAY = 2;
const SPOTS_MAX_PCT = 95;

function useSpotsFilled() {
  const [pct, setPct] = useState(SPOTS_BASE_PCT);
  useEffect(() => {
    const days = Math.max(0, Math.floor((Date.now() - SPOTS_BASE_DATE) / 86_400_000));
    setPct(Math.min(SPOTS_MAX_PCT, SPOTS_BASE_PCT + days * SPOTS_STEP_PER_DAY));
  }, []);
  return pct;
}

export function LandingPage() {
  const spotsPct = useSpotsFilled();
  return (
    <div className="relative min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-hidden">
      {/* Ambient background — purple + blue wash reflecting the logo */}
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(125% 80% at 50% -6%, rgba(139,92,246,0.22) 0%, rgba(139,92,246,0.08) 34%, rgba(139,92,246,0.02) 60%, transparent 78%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(100% 70% at 20% 2%, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0.04) 38%, transparent 70%)",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[650px] bg-[var(--color-accent)]/[0.10] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[550px] h-[450px] rounded-full blur-[100px]" style={{ background: "rgba(59,130,246,0.07)" }} />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-5 md:px-12 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5">
          <Image src="/logo-transparent.png" alt="Lolik Trends" width={32} height={32} className="rounded-md" />
          <span className="text-sm font-semibold">Lolik Trends</span>
          <span className="rounded bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-[var(--color-accent)]">
            Waitlist
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="#youtube" className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">YouTube</a>
          <a href="#news" className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">News</a>
          <a href="#roadmap" className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">Roadmap</a>
          <a href="#early-access" className="text-xs font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-glow)] transition-colors">Waitlist</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-4xl mx-auto px-5 pt-16 pb-10 md:pt-28 md:pb-16 text-center">
        {/* Scarcity offer badge */}
        <div className="mb-6 flex justify-center">
          <a
            href="#early-access"
            className="group inline-flex items-center gap-2.5 rounded-full border border-[var(--color-accent)]/40 bg-gradient-to-r from-[var(--color-accent)]/18 to-blue-500/18 px-5 py-2.5 text-xs sm:text-sm md:text-base font-semibold text-white shadow-[0_0_26px_rgba(139,92,246,0.32)] transition-all hover:shadow-[0_0_36px_rgba(139,92,246,0.48)]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-[var(--color-accent)]" />
            First 50 members get <span className="text-[var(--color-accent)]">Ultra Pro free</span> for 1 month
            <ArrowRight className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]">
          Spot trends before{" "}
          <span className="bg-gradient-to-r from-[var(--color-accent)] to-purple-400 bg-clip-text text-transparent">
            saturation.
          </span>
        </h1>
        <p className="mt-4 md:mt-5 text-sm sm:text-base md:text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto leading-relaxed">
          Starting with <Tag icon={SiYoutube} color="text-red-500">YouTube</Tag> +{" "}
          <Tag icon={Newspaper} color="text-blue-400">News</Tag> intelligence. Expanding into{" "}
          <Tag icon={SiTiktok} color="text-white">TikTok</Tag>,{" "}
          <Tag icon={SiReddit} color="text-orange-500">Reddit</Tag>,{" "}
          <Tag icon={Bot} color="text-emerald-400">AI</Tag>,{" "}
          <Tag icon={SiMeta} color="text-blue-500">Meta Ads</Tag>,{" "}
          <Tag icon={ShoppingBag} color="text-amber-400">Ecommerce</Tag> and more.
        </p>

        {/* Live platform pills */}
        <div className="mt-5 flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/20 bg-red-500/5 px-3 py-1 text-[11px] font-medium text-red-400">
            <SiYoutube className="h-3 w-3" width={12} height={12} />
            YouTube Intelligence
            <span className="text-emerald-400/80">✓ Live</span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/20 bg-blue-400/5 px-3 py-1 text-[11px] font-medium text-blue-400">
            <Newspaper className="h-3 w-3" />
            News Intelligence
            <span className="text-[var(--color-text-muted)]">95% built</span>
          </span>
        </div>

        <div className="mt-6 flex items-center justify-center">
          <a
            href="#early-access"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] hover:bg-[var(--color-accent-glow)] px-6 py-3 text-sm font-semibold text-white transition-all shadow-[0_0_20px_rgba(139,92,246,0.25)] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]"
          >
            Join Waitlist
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <p className="mt-3 text-[10px] text-[var(--color-text-muted)]/50 tracking-wide uppercase">
          Tracking 600+ YouTube emerging trends daily
        </p>
      </section>

      {/* Hero Screenshot — YouTube */}
      <section id="youtube" className="relative z-10 max-w-5xl mx-auto px-5 pb-16 md:pb-24">
        <div
          className="relative rounded-xl border border-[var(--color-bg-elevated)] bg-[var(--color-bg-surface)] p-1 shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(139,92,246,0.05)]"
          style={{ perspective: "1200px" }}
        >
          <div className="rounded-lg overflow-hidden" style={{ transform: "rotateX(2deg) rotateY(-1deg)" }}>
            <Image
              src="/screenshots/hero-youtube-detail.png"
              alt="YouTube Trend Intelligence — AI-powered breakdown"
              width={1853}
              height={970}
              className="w-full h-auto transition-transform duration-500 hover:scale-[1.02] brightness-[1.03] contrast-[1.05] saturate-[1.04]"
              priority
            />
          </div>
          <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[var(--color-accent)]/[0.04] to-purple-500/[0.03] blur-xl -z-10" />
        </div>
      </section>

      {/* Screenshot Carousel — News anchor */}
      <section id="news" className="relative z-10 max-w-5xl mx-auto px-5 pb-20 md:pb-28">
        <ScreenshotCarousel />
      </section>

      {/* What's Included */}
      <section className="relative z-10 max-w-5xl mx-auto px-5 pb-20 md:pb-28">
        <WhatIsIncluded />
      </section>

      {/* Platform Ecosystem — Roadmap anchor */}
      <section id="roadmap" className="relative z-10 max-w-5xl mx-auto px-5 pb-20 md:pb-28">
        <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold mb-2">Platform Ecosystem</h2>
        <p className="text-center text-sm sm:text-base text-[var(--color-text-muted)] mb-4">Real-time signals from every major platform.</p>
        <p className="text-center text-[10px] text-[var(--color-text-muted)]/60 mb-10 max-w-lg mx-auto">
          Starting with YouTube + News intelligence. Expanding into full multi-platform trend tracking.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          <PlatformCard icon={SiYoutube} name="YouTube Trends" color="text-red-500" description="Viral velocity, engagement spikes, niche opportunities" badge="✅ Live" />
          <PlatformCard icon={Newspaper} name="News Intelligence" color="text-blue-400" description="Editorial angles, underserved stories, narrative gaps" badge="🚧 95% built" />
          <PlatformCard icon={SiTiktok} name="TikTok Trends" color="text-white" description="Sound trends, format patterns, creator signals" badge="🔨 In build" />
          <PlatformCard icon={SiReddit} name="Reddit Signals" color="text-orange-500" description="Emerging narratives, community momentum, sentiment shifts" badge="🔨 In build" />
          <PlatformCard icon={Bot} name="AI Trends" color="text-emerald-400" description="New tools, product launches, adoption signals" badge="🔨 In build" />
          <PlatformCard icon={SiMeta} name="Meta Ads Intelligence" color="text-blue-500" description="Ad creative trends, audience targeting signals" comingSoon />
          <PlatformCard icon={ShoppingBag} name="Ecommerce Trends" color="text-amber-400" description="Product trends, marketplace signals, demand shifts" comingSoon />
          <PlatformCard icon={Briefcase} name="Job Market Signals" color="text-cyan-400" description="Hiring trends, skill demand, industry shifts" comingSoon />
          <PlatformCard icon={SiInstagram} name="Instagram Trends" color="text-pink-400" description="Visual trends, Reels patterns, creator economy" comingSoon />
        </div>
      </section>

      {/* Why Lolik Trends */}
      <section className="relative z-10 max-w-5xl mx-auto px-5 pb-20 md:pb-28">
        <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold mb-2">Why Lolik Trends</h2>
        <p className="text-center text-sm sm:text-base text-[var(--color-text-muted)] mb-10 md:mb-12">Intelligence that goes beyond surface-level metrics.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          <WhyBlock icon={TrendingUp} title="Narrative shifts" description="Detect when public conversation pivots before mainstream coverage." />
          <WhyBlock icon={Zap} title="Viral velocity" description="Track acceleration rate, not just view counts." />
          <WhyBlock icon={Eye} title="Audience psychology" description="Understand why content spreads, not just that it does." />
          <WhyBlock icon={Target} title="Underserved angles" description="Find gaps in coverage that competitors haven't filled." />
          <WhyBlock icon={Layers} title="Replication opportunities" description="Score how reproducible a trend is for your niche." />
          <WhyBlock icon={BarChart3} title="Trend lifecycle" description="Know exactly where a trend sits: rising, peaking, or saturated." />
        </div>
      </section>

      {/* Early Access */}
      <section id="early-access" className="relative z-10 max-w-xl mx-auto px-5 pb-28 md:pb-36">
        <div className="rounded-xl border border-[var(--color-bg-elevated)] bg-[var(--color-bg-surface)] p-6 md:p-8 text-center">
          {/* Launch offer + scarcity */}
          <div className="mb-6 rounded-lg border border-[var(--color-accent)]/30 bg-gradient-to-r from-[var(--color-accent)]/10 to-blue-500/10 p-4">
            <p className="flex items-center justify-center gap-2 text-sm font-bold text-white">
              <Crown className="h-4 w-4 text-amber-400" />
              First 50 members get <span className="text-[var(--color-accent)]">Ultra Pro</span> free for 1 month
            </p>
            <div className="mt-3">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-bg-elevated)]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-blue-400 transition-[width] duration-700"
                  style={{ width: `${spotsPct}%` }}
                />
              </div>
              <p className="mt-2 flex items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-amber-300">
                <Flame className="h-3 w-3" />
                Filling fast — only some spots left
              </p>
            </div>
          </div>

          <h2 className="text-lg md:text-xl font-bold mb-2">Get early access</h2>
          <p className="text-sm sm:text-base text-[var(--color-text-muted)] mb-6">Join the waitlist. We&apos;ll notify you when spots open.</p>
          <WaitlistForm />
          <p className="mt-3 text-[10px] text-[var(--color-text-muted)]/50">Access opens once 4 product modules are live. No spam.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[var(--color-bg-elevated)] py-6 md:py-8 px-5">
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Image src="/logo-transparent.png" alt="Lolik" width={20} height={20} className="rounded" />
              <span className="text-xs text-[var(--color-text-muted)]">Lolik AI</span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-[var(--color-text-muted)]">
              Built for creators, marketers & editorial teams.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://x.com/AiLolik"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                𝕏 @AiLolik
              </a>
              <a
                href="mailto:contact@lolikai.eu"
                className="text-[11px] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                contact@lolikai.eu
              </a>
              <a href="/privacy" className="text-[11px] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
                Privacy
              </a>
              <a href="/terms" className="text-[11px] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
                Terms
              </a>
            </div>
          </div>
          <div className="border-t border-[var(--color-bg-elevated)]/60 pt-4 text-center">
            <p className="text-[10px] text-[var(--color-text-muted)]/60">
              © {new Date().getFullYear()} Lolik AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── Screenshot Carousel ──────────────────────────────────────────────────────

function ScreenshotCarousel() {
  const slides = [
    {
      src: "/screenshots/youtube-feed.png",
      alt: "YouTube Trends — Live trend feed with viral scoring & money potential",
      width: 1853,
      height: 914,
      caption: "YouTube Intelligence",
    },
    {
      src: "/screenshots/intelligence-breakdown.png",
      alt: "AI Intelligence Breakdown — Opportunity, Competition, Replicability, Comment Goldmine",
      width: 1844,
      height: 944,
      caption: "Full Breakdown",
    },
    {
      src: "/screenshots/news-feed.png",
      alt: "News Intelligence — Live editorial feed with lifecycle, velocity & opportunity scores",
      width: 1802,
      height: 964,
      caption: "News Intelligence Feed",
    },
    {
      src: "/screenshots/news-lifecycle.png",
      alt: "Story Lifecycle & Audience Reaction — timing, momentum and real public sentiment",
      width: 1800,
      height: 964,
      caption: "Story Lifecycle & Audience",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, [slides.length]);

  // Pause autoplay while the lightbox is open
  useEffect(() => {
    if (lightbox) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, lightbox]);

  // Close lightbox on Escape + lock body scroll while open
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(false); };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prevOverflow; };
  }, [lightbox]);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl border border-[var(--color-bg-elevated)] bg-[var(--color-bg-surface)] p-1 shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div key={i} className="w-full flex-shrink-0">
              <button
                type="button"
                onClick={() => setLightbox(true)}
                className="group/img relative block w-full cursor-zoom-in"
                aria-label={`Open ${slide.caption} full size`}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  width={slide.width}
                  height={slide.height}
                  className="w-full h-auto rounded-lg transition-transform duration-500 group-hover/img:scale-[1.015]"
                  loading="lazy"
                />
                {/* Tap-to-zoom hint */}
                <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/50 backdrop-blur px-2 py-1 text-[10px] font-medium text-white/90 opacity-0 group-hover/img:opacity-100 transition-opacity md:opacity-100">
                  <ZoomIn className="h-3 w-3" /> Tap to zoom
                </span>
              </button>
            </div>
          ))}
        </div>
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-500/[0.02] to-[var(--color-accent)]/[0.03] blur-lg -z-10" />
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-3 md:p-8"
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative max-h-[90vh] w-full max-w-6xl overflow-auto" onClick={(e) => e.stopPropagation()}>
            <Image
              src={slides[current].src}
              alt={slides[current].alt}
              width={slides[current].width}
              height={slides[current].height}
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/60">{slides[current].caption}</span>
        </div>
      )}

      {/* Caption + Dots */}
      <div className="flex items-center justify-between mt-4 px-1">
        <span className="text-xs text-[var(--color-text-muted)] font-medium">
          {slides[current].caption}
        </span>
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-[var(--color-accent)]" : "w-1.5 bg-[var(--color-bg-elevated)]"
              }`}
              aria-label={`${slides[i].caption}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Platform Card ────────────────────────────────────────────────────────────

// Maps each card's dominant text color to an RGB triplet for a subtle matching glow.
const GLOW_RGB: Record<string, string> = {
  "text-red-500": "239,68,68",
  "text-blue-400": "96,165,250",
  "text-white": "180,190,210",
  "text-orange-500": "249,115,22",
  "text-emerald-400": "52,211,153",
  "text-blue-500": "59,130,246",
  "text-amber-400": "251,191,36",
  "text-cyan-400": "34,211,238",
  "text-pink-400": "244,114,182",
};

function PlatformCard({
  icon: Icon,
  name,
  color,
  description,
  badge,
  comingSoon,
}: {
  icon: React.ElementType;
  name: string;
  color: string;
  description: string;
  badge?: string;
  comingSoon?: boolean;
}) {
  const rgb = GLOW_RGB[color] ?? "139,92,246";
  return (
    <div
      style={{ boxShadow: `0 6px 26px -10px rgba(${rgb},${comingSoon ? 0.08 : 0.22})` }}
      className={`group relative rounded-xl border border-[var(--color-bg-elevated)] bg-[var(--color-bg-surface)] p-4 md:p-5 transition-all duration-300 hover:border-[var(--color-accent)]/15 ${
        comingSoon ? "opacity-40" : ""
      }`}
    >
      <div className="flex items-center gap-2.5 mb-2">
        <Icon className={`h-4 w-4 md:h-5 md:w-5 ${color}`} width={20} height={20} />
        <span className="text-xs md:text-sm font-semibold">{name}</span>
        {badge && (
          <span className="ml-auto text-[9px] font-medium text-[var(--color-text-muted)]">{badge}</span>
        )}
        {comingSoon && (
          <span className="ml-auto rounded bg-[var(--color-bg-elevated)] px-1.5 py-0.5 text-[8px] font-medium text-[var(--color-text-muted)]">
            Coming soon
          </span>
        )}
      </div>
      <p className="text-[11px] md:text-xs text-[var(--color-text-muted)] leading-relaxed">{description}</p>
    </div>
  );
}

// ── Why Block ────────────────────────────────────────────────────────────────

function WhyBlock({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div
      style={{ boxShadow: "0 6px 26px -10px rgba(139,92,246,0.18)" }}
      className="group rounded-xl border border-[var(--color-bg-elevated)] bg-[var(--color-bg-surface)] p-4 md:p-5 transition-all duration-300 hover:border-[var(--color-accent)]/15"
    >
      <Icon className="h-4 w-4 text-[var(--color-accent)] mb-2" />
      <h3 className="text-xs md:text-sm font-semibold mb-1">{title}</h3>
      <p className="text-[11px] md:text-xs text-[var(--color-text-muted)] leading-relaxed">{description}</p>
    </div>
  );
}

// ── Waitlist Form ────────────────────────────────────────────────────────────

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const turnstileToken = useRef("");
  const widgetId = useRef<string | undefined>(undefined);

  // Register global Turnstile callback and render widget explicitly
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;

    (window as unknown as Record<string, unknown>).__turnstileCb = (token: string) => {
      turnstileToken.current = token;
    };

    const tryRender = () => {
      const turnstile = (window as unknown as Record<string, unknown>).turnstile as
        | { render: (el: string, opts: Record<string, unknown>) => string }
        | undefined;
      if (!turnstile || widgetId.current !== undefined) return;
      widgetId.current = turnstile.render("#waitlist-turnstile", {
        sitekey: TURNSTILE_SITE_KEY,
        callback: "__turnstileCb",
        theme: "dark",
        size: "normal",
      });
    };

    // Try immediately, then retry after script loads
    tryRender();
    const t = setTimeout(tryRender, 1500);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    // If Turnstile is configured but widget hasn't resolved yet, block
    if (TURNSTILE_SITE_KEY && !turnstileToken.current) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          website: "",                          // honeypot — always empty from real users
          turnstileToken: turnstileToken.current,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center justify-center gap-2 py-3">
        <div className="h-2 w-2 rounded-full bg-emerald-400" />
        <span className="text-sm text-emerald-400 font-medium">
          You&apos;re on the list. We&apos;ll be in touch.
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
      {/* Honeypot — hidden from humans, bots fill it in */}
      <input
        type="text"
        name="website"
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: "absolute", opacity: 0, pointerEvents: "none", height: 0, width: 0 }}
      />

      <div className="flex flex-col sm:flex-row gap-2.5">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 rounded-lg border border-[var(--color-bg-elevated)] bg-[var(--color-bg-primary)] px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]/50 focus:outline-none focus:border-[var(--color-accent)]/30 focus:shadow-[0_0_12px_rgba(139,92,246,0.08)] transition-all"
          required
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-lg bg-[var(--color-accent)] hover:bg-[var(--color-accent-glow)] px-5 py-2.5 text-sm font-semibold text-white transition-all shadow-[0_0_16px_rgba(139,92,246,0.2)] hover:shadow-[0_0_24px_rgba(139,92,246,0.35)] disabled:opacity-50"
        >
          {status === "loading" ? "Joining..." : "Join Waitlist"}
        </button>
      </div>

      {/* Turnstile widget — only renders when NEXT_PUBLIC_TURNSTILE_SITE_KEY is set */}
      {TURNSTILE_SITE_KEY && (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="lazyOnload"
          />
          <div id="waitlist-turnstile" className="flex justify-center mt-1" />
        </>
      )}

      {status === "error" && (
        <p className="text-xs text-red-400 text-center">
          {TURNSTILE_SITE_KEY && !turnstileToken.current
            ? "Complete the challenge before submitting."
            : "Something went wrong. Try again."}
        </p>
      )}
    </form>
  );
}

// ── What's Included ──────────────────────────────────────────────────────────

const YOUTUBE_LIVE: { name: string; desc: string }[] = [
  { name: "Viral Velocity Feed", desc: "600+ trending videos tracked daily across regions and niches." },
  { name: "Viral Score + Phase", desc: "Rising, peaking, cooling or saturated — computed from velocity and engagement." },
  { name: "Money Potential", desc: "Sponsorship fit, ecommerce demand and monetization signals per video." },
  { name: "Opportunity Window", desc: "How much runway is left before a trend saturates." },
  { name: "Comment Goldmine", desc: "Pain points, desires, questions and reactions extracted from real comments." },
  { name: "Hook Blueprint", desc: "Second-by-second breakdown of how the video hook is built." },
  { name: "Content Gap", desc: "What viewers wanted and didn't fully get — your angle in." },
  { name: "Replicability Score", desc: "How hard it is to copy based on format, creator fit and execution difficulty." },
  { name: "Full AI Breakdown", desc: "One-click analysis for title, thumbnail, hook, money, audience and key scores." },
];

const YOUTUBE_COMING: string[] = [
  "Competitor Channel Tracking",
  "Trend Alerts",
  "Similar Winning Videos",
  "Advanced Search Filters",
];

const NEWS_LIVE: { name: string; desc: string }[] = [
  { name: "Live Editorial Feed", desc: "Real stories from multiple sources, refreshed frequently." },
  { name: "Story Lifecycle", desc: "Breaking, rising or fading — with hours left before the story peaks." },
  { name: "Audience Intelligence", desc: "Real reactions, sentiment & questions from Reddit, YouTube, HN and Bluesky." },
  { name: "Story Gaps", desc: "Undercovered angles, backed by what the audience is actually asking." },
  { name: "Coverage Map", desc: "How many outlets cover it, where, and who's already on the story." },
  { name: "Why It Matters", desc: "Editorial significance in plain language — not just a summary." },
  { name: "Editorial Angles", desc: "Breaking, explainer, opinion, newsletter and investigative formats." },
  { name: "Suggested Headlines", desc: "Publish-ready headline variants per story." },
  { name: "Editorial Risk", desc: "Risk severity, what to watch and mitigation guidance." },
  { name: "Paste Any Link", desc: "Drop any news URL and get a full intelligence report instantly." },
];

const NEWS_COMING: string[] = [
  "X (Twitter) reaction analysis",
  "Regional Heat",
  "Source Comparison",
  "Google Trends timing layer",
  "Email alerts on breaking stories",
];

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-400">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
      Live
    </span>
  );
}

function ComingBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/20 bg-amber-400/8 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-400">
      Coming Next
    </span>
  );
}

function FlagshipBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[var(--color-accent)]">
      Planned Flagship
    </span>
  );
}

function FeatureCard({ name, desc }: { name: string; desc: string }) {
  return (
    <div
      style={{ boxShadow: "0 6px 24px -12px rgba(52,211,153,0.18)" }}
      className="rounded-xl border border-[var(--color-bg-elevated)] bg-[var(--color-bg-surface)] p-4 flex flex-col gap-2"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-base font-semibold text-[var(--color-text-primary)] leading-snug">{name}</span>
        <LiveBadge />
      </div>
      <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{desc}</p>
    </div>
  );
}

function FlagshipCard({ name, desc }: { name: string; desc: string }) {
  return (
    <div
      style={{ boxShadow: "0 8px 30px -10px rgba(139,92,246,0.28)" }}
      className="rounded-xl border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/[0.04] p-5"
    >
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <span className="text-base font-semibold text-[var(--color-text-primary)]">{name}</span>
        <FlagshipBadge />
      </div>
      <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{desc}</p>
    </div>
  );
}

function ProductBlock({
  tag,
  title,
  subtitle,
  live,
  coming,
  flagshipName,
  flagshipDesc,
}: {
  tag: string;
  title: string;
  subtitle: string;
  live: { name: string; desc: string }[];
  coming: string[];
  flagshipName: string;
  flagshipDesc: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--color-bg-elevated)] bg-[var(--color-bg-surface)]/60 p-6 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <span className="inline-block rounded-md border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)] mb-3">
          {tag}
        </span>
        <h3 className="text-lg md:text-xl font-bold mb-1.5">{title}</h3>
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{subtitle}</p>
      </div>

      {/* Live features grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mb-6">
        {live.map((f) => (
          <FeatureCard key={f.name} name={f.name} desc={f.desc} />
        ))}
      </div>

      {/* Coming Next */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <ComingBadge />
          <span className="text-sm text-[var(--color-text-muted)]">Next in the build queue</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {coming.map((item) => (
            <span
              key={item}
              className="rounded-lg border border-[var(--color-bg-elevated)] bg-[var(--color-bg-primary)] px-3 py-1.5 text-sm text-[var(--color-text-muted)]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Planned Flagship */}
      <FlagshipCard name={flagshipName} desc={flagshipDesc} />
    </div>
  );
}

function WhatIsIncluded() {
  return (
    <div>
      {/* Section header */}
      <div className="text-center mb-10 md:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">What&apos;s Included</h2>
        <p className="text-sm sm:text-base text-[var(--color-text-muted)] max-w-lg mx-auto">
          Real capabilities, honest status. No vaporware.
        </p>
      </div>

      <div className="space-y-5">
        <ProductBlock
          tag="YouTube Intelligence"
          title="For creators and marketers."
          subtitle="Know what's working before everyone else does."
          live={YOUTUBE_LIVE}
          coming={YOUTUBE_COMING}
          flagshipName="AI Opportunity Generator"
          flagshipDesc="Analyzes top-performing videos, user reports, comments, hooks and trend signals to generate realistic content ideas with title, hook, angle, thumbnail direction, difficulty and timing window."
        />
        <ProductBlock
          tag="News Intelligence"
          title="For journalists, newsletters and editorial teams."
          subtitle="Faster angles, not just faster feeds."
          live={NEWS_LIVE}
          coming={NEWS_COMING}
          flagshipName="AI News Opportunity Generator"
          flagshipDesc="Finds undercovered story angles by analyzing live news, generated reports, narrative shifts, audience impact and editorial gaps."
        />
      </div>
    </div>
  );
}
