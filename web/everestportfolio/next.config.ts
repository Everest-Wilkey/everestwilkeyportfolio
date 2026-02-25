import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
  remotePatterns: [
    { hostname: "placehold.co" },
    { hostname: "cdn.jsdelivr.net" },
  ],
},
};

export default nextConfig;
