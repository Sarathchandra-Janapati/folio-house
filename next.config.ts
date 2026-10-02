import type { NextConfig } from "next";

// Static export so the site runs on GitHub Pages, Vercel or any static host.
// For GitHub Pages project sites, the workflow sets NEXT_PUBLIC_BASE_PATH=/<repo-name>.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
