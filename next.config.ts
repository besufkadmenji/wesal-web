import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    const assetRule = config.module.rules.find(
      (rule: { test?: RegExp }) => rule.test?.test?.("icon.svg"),
    );
    if (assetRule && typeof assetRule === "object") {
      assetRule.exclude = /\.svg$/i;
    }
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wesal-api.testing3000.cloud",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
