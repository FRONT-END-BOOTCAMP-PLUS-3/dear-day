import type { NextConfig } from "next";

export const nextConfig: NextConfig = {
  /* config options here */
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
  disable: process.env.NODE_ENV === "development", // 개발 환경에선 PWA 비활성화
  runtimeCaching: [
    {
      // SSE 요청은 캐시하지 않고 네트워크로 직접 연결
      urlPattern: /^\/api\/sse\/subscribe/,
      handler: "NetworkOnly",
    },
  ],
});

module.exports = withPWA(nextConfig);
