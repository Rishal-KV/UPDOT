import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "model-xrs.vercel.app",
      },
    ],
  },
};

export default nextConfig;