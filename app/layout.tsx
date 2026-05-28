import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lolikai.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Lolik Trends — Spot trends before saturation",
  description:
    "AI-powered trend intelligence across YouTube, TikTok, Reddit, News, AI & emerging platforms. Track 600+ trends daily.",
  openGraph: {
    title: "Lolik Trends — Spot trends before saturation",
    description:
      "AI-powered trend intelligence across YouTube, TikTok, Reddit, News & emerging platforms.",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Lolik Trends — Spot trends before saturation",
    description:
      "AI-powered trend intelligence across YouTube, TikTok, Reddit, News & emerging platforms.",
    images: ["/screenshots/hero-youtube-detail.png"],
    site: "@loliktrends",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
