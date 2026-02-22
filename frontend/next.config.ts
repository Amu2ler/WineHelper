import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.vivino.com",
      },
      {
        protocol: "https",
        hostname: "thumbs.vivino.com",
      },
      {
        protocol: "https",
        hostname: "dl.dropboxusercontent.com", // Sometimes used in APIs
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // For mock data images
      },
    ],
  },
};

export default nextConfig;
