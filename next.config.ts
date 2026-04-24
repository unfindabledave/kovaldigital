import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  // Pure WASM; avoids bundling / tracing issues. Native sqlite3 is not used (incompatible with Vercel's glibc).
  serverExternalPackages: ["sql.js"],
};

export default nextConfig;
