import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: {
    buildActivity: false,
  },
  // Disable error overlay in development
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Disable the error overlay
      config.devServer = {
        ...config.devServer,
        client: {
          overlay: {
            errors: false,
            warnings: false,
          },
        },
      };
    }
    return config;
  },
  // Add async rewrites to proxy API requests
  async rewrites() {
    return [
      {
        source: "/api/proxy/:path*",
        destination: "https://relayer-api.horizenlabs.io/api/:path*",
      },
    ];
  },
};

export default nextConfig;
