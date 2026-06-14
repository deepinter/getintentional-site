import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow Next.js to optimise images from any external hostname (RSS feed thumbnails)
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http",  hostname: "**" },
    ],
  },
};

export default nextConfig;
