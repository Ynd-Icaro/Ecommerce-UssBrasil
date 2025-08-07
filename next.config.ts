import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    const path = require('path');
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
  images: {
    unoptimized: true,
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/Ecommerce-UssBrasil/public/:path*',
        destination: '/:path*',
      },
    ];
  },
  serverExternalPackages: ['@prisma/client', 'prisma'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  trailingSlash: true,
  distDir: '.next',
  generateBuildId: async () => {
    return `build-${Date.now()}`
  }
};

export default nextConfig;
