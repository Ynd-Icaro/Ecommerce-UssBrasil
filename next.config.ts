import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    domains: ['localhost', 'ussbrasil.netlify.app'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
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
  },
  // Otimizações de performance
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Configurações para deploy
  output: 'standalone',
  experimental: {
    optimizeCss: true,
  }
};

export default nextConfig;
