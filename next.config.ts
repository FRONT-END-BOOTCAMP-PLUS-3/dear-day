import type { NextConfig } from "next";

export const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    prependData: `@use "@/app/_mixins.scss" as *;`,
  },
};

export const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA(nextConfig);
