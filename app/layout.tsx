import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lolikai.eu";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Lolik Trends — Spot trends before saturation",
  description:
    "AI-powered trend intelligence for YouTube, News, TikTok, Reddit and social media. Track 600+ emerging trends daily, get editorial angles and AI-driven insights before your competitors.",
  keywords: [
    "trend intelligence",
    "YouTube trends",
    "AI trend analysis",
    "news intelligence",
    "content trends",
    "viral trends tracker",
    "social media trends",
    "editorial intelligence",
    "trend radar",
    "Lolik Trends",
  ],
  authors: [{ name: "Lolik AI", url: siteUrl }],
  creator: "Lolik AI",
  publisher: "Lolik AI",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Lolik Trends — Spot trends before saturation",
    description:
      "AI-powered trend intelligence for YouTube, News, TikTok & social media. Track 600+ emerging trends daily and get AI-driven insights before your competitors.",
    images: [
      {
        url: "/screenshots/hero-youtube-detail.png",
        width: 1853,
        height: 970,
        alt: "Lolik Trends — AI trend intelligence dashboard",
      },
    ],
    type: "website",
    siteName: "Lolik Trends",
    url: siteUrl,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lolik Trends — Spot trends before saturation",
    description:
      "AI-powered trend intelligence for YouTube, News, TikTok & social media. Track 600+ emerging trends daily.",
    images: ["/screenshots/hero-youtube-detail.png"],
    site: "@AiLolik",
    creator: "@AiLolik",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Lolik Trends",
  url: siteUrl,
  description:
    "AI-powered trend intelligence platform for YouTube, News, TikTok, Reddit and social media.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Early access waitlist — free to join",
  },
  author: { "@type": "Organization", name: "Lolik AI", url: siteUrl },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
