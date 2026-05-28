"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
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
} from "lucide-react";

export function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[var(--color-accent)]/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-[var(--color-accent)]/[0.02] rounded-full blur-[100px]" />
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
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]">
          Spot trends before{" "}
          <span className="bg-gradient-to-r from-[var(--color-accent)] to-purple-400 bg-clip-text text-transparent">
            saturation.
          </span>
        </h1>
        <p className="mt-4 md:mt-5 text-sm sm:text-base md:text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto leading-relaxed">
          Starting with YouTube + News intelligence. Expanding into TikTok, Reddit, AI, Meta Ads, Ecommerce and more.
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
            <span className="text-[var(--color-text-muted)]">80% built</span>
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

      {/* Platform Ecosystem — Roadmap anchor */}
      <section id="roadmap" className="relative z-10 max-w-5xl mx-auto px-5 pb-20 md:pb-28">
        <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold mb-2">Platform Ecosystem</h2>
        <p className="text-center text-xs sm:text-sm text-[var(--color-text-muted)] mb-4">Real-time signals from every major platform.</p>
        <p className="text-center text-[10px] text-[var(--color-text-muted)]/60 mb-10 max-w-lg mx-auto">
          Starting with YouTube + News intelligence. Expanding into full multi-platform trend tracking.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          <PlatformCard icon={SiYoutube} name="YouTube Trends" color="text-red-500" description="Viral velocity, engagement spikes, niche opportunities" badge="✅ Live" />
          <PlatformCard icon={Newspaper} name="News Intelligence" color="text-blue-400" description="Editorial angles, underserved stories, narrative gaps" badge="🚧 80% built" />
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
        <p className="text-center text-xs sm:text-sm text-[var(--color-text-muted)] mb-10 md:mb-12">Intelligence that goes beyond surface-level metrics.</p>
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
          <h2 className="text-lg md:text-xl font-bold mb-2">Get early access</h2>
          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mb-6">Join the waitlist. We&apos;ll notify you when spots open.</p>
          <WaitlistForm />
          <p className="mt-3 text-[10px] text-[var(--color-text-muted)]/50">Access opens when the first product modules are ready. No spam.</p>
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
                href="https://x.com/loliktrends"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                𝕏 / Twitter
              </a>
              <a
                href="mailto:contact@lolikai.com"
                className="text-[11px] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                Contact
              </a>
              <a href="/privacy" className="text-[11px] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
                Privacy
              </a>
              <a href="/terms" className="text-[11px] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
                Terms
              </a>
            </div>
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
      alt: "News Intelligence — Multi-source editorial feed",
      width: 1850,
      height: 955,
      caption: "News Intelligence",
    },
    {
      src: "/screenshots/news-intelligence.png",
      alt: "AI News Analysis — Narrative timeline, underserved angles, editorial strategy",
      width: 1846,
      height: 962,
      caption: "AI News Analysis",
    },
  ];

  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl border border-[var(--color-bg-elevated)] bg-[var(--color-bg-surface)] p-1 shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div key={i} className="w-full flex-shrink-0">
              <Image
                src={slide.src}
                alt={slide.alt}
                width={slide.width}
                height={slide.height}
                className="w-full h-auto rounded-lg transition-transform duration-500 hover:scale-[1.015]"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-500/[0.02] to-[var(--color-accent)]/[0.03] blur-lg -z-10" />
      </div>

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
  return (
    <div
      className={`group relative rounded-xl border border-[var(--color-bg-elevated)] bg-[var(--color-bg-surface)] p-4 md:p-5 transition-all duration-300 hover:border-[var(--color-accent)]/15 hover:shadow-[0_0_20px_rgba(139,92,246,0.06)] ${
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
    <div className="group rounded-xl border border-[var(--color-bg-elevated)] bg-[var(--color-bg-surface)] p-4 md:p-5 transition-all duration-300 hover:border-[var(--color-accent)]/15 hover:shadow-[0_0_20px_rgba(139,92,246,0.06)]">
      <Icon className="h-4 w-4 text-[var(--color-accent)] mb-2" />
      <h3 className="text-xs md:text-sm font-semibold mb-1">{title}</h3>
      <p className="text-[11px] md:text-xs text-[var(--color-text-muted)] leading-relaxed">{description}</p>
    </div>
  );
}

// ── Waitlist Form ────────────────────────────────────────────────────────────

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
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
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
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
      {status === "error" && (
        <p className="text-xs text-red-400 mt-1">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
