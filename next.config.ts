import type { NextConfig } from "next";

export const nextConfig: NextConfig = {
  /* config options here */
};

export const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA(nextConfig);
