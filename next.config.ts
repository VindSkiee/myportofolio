import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

export default function nextConfig(phase: string): NextConfig {
  const isDevelopmentServer = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    // Keep dev artifacts separate from production build artifacts to avoid
    // .next manifest/chunk races when multiple commands are run close together.
    distDir: isDevelopmentServer ? ".next-dev" : ".next",
    webpack: (config, { dev }) => {
      // Work around intermittent Windows file rename/open cache errors.
      if (dev) {
        config.cache = false;
      }

      return config;
    },
  };
}
