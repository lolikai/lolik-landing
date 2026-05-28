/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next/image optimization is not supported on Cloudflare Pages Workers
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
