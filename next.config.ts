import type { NextConfig } from "next";

// Uploaded files are served by the API at NEXT_PUBLIC_DATA; allow that host
// (e.g. http://localhost:4000 for the local stack) in addition to testing.
const dataUrl = process.env.NEXT_PUBLIC_DATA
  ? new URL(process.env.NEXT_PUBLIC_DATA)
  : null;
const isLocalDataHost =
  dataUrl?.hostname === "localhost" || dataUrl?.hostname === "127.0.0.1";

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
    // Next blocks optimizing images from private IPs unless explicitly allowed.
    dangerouslyAllowLocalIP: isLocalDataHost,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wesal-api.testing3000.cloud",
        port: "",
        pathname: "/**",
      },
      ...(dataUrl && dataUrl.hostname !== "wesal-api.testing3000.cloud"
        ? [
            {
              protocol: dataUrl.protocol === "http:" ? "http" : "https",
              hostname: dataUrl.hostname,
              port: dataUrl.port,
              pathname: "/**",
            } as const,
          ]
        : []),
    ],
  },
};

export default nextConfig;
