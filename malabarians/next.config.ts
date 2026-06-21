import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Compress all responses with gzip/brotli
  compress: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "02lrin0yndqag3mg.public.blob.vercel-storage.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    // Aggressive caching for images
    minimumCacheTTL: 31536000, // 1 year
  },

  // Cache headers for static assets
  async headers() {
    return [
      {
        // Cache hero frame images for 1 year
        source: "/herosequences/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache all other static assets for 30 days
        source: "/:path*.(png|jpg|jpeg|svg|ico|webp|avif|woff2|woff)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

