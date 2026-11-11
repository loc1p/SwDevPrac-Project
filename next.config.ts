import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // expose the URLs to the JavaScript bundle so client components can use them (Workshop 14.4)
  env: {
    FRONTEND_URL: process.env.FRONTEND_URL,
    BACKEND_URL: process.env.BACKEND_URL,
  },
};

export default nextConfig;