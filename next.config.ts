import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ========== CONFIGURAÇÕES DE IMAGEM PREMIUM ==========
  images: {
    unoptimized: true,
    domains: ['localhost', 'uss-brasil.netlify.app'],
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
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 ano
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // ========== CONFIGURAÇÕES DE PERFORMANCE ==========
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // ========== CONFIGURAÇÕES DE SEGURANÇA ==========
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin'
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()'
        }
      ]
    },
    {
      source: '/api/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store, max-age=0'
        }
      ]
    },
    {
      source: '/Produtos/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable'
        }
      ]
    }
  ],
  
  // ========== CONFIGURAÇÕES DE BUNDLE ==========
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
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
  // Configurações para deploy no Netlify
  output: 'standalone'
};

export default nextConfig;
