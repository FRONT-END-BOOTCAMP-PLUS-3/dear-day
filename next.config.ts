import type { NextConfig } from "next";

export const nextConfig: NextConfig = {
  /* config options here */
  webpack5: true,
  webpack: (config, options) => {
    config.cache = false;
    return config;
  },
  sassOptions: {
    prependData: `@use "@/styles/_mixins.scss" as *;`,
  },
};

export const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA(nextConfig);
