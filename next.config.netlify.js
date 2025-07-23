# Configuração para build estático (Netlify)
# Descomente para usar com Netlify
# output = 'export'
# trailingSlash = true
# images = { unoptimized = true }

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

// Para Netlify, descomente as linhas abaixo:
// const nextConfig = {
//   output: 'export',
//   trailingSlash: true,
//   images: {
//     unoptimized: true
//   },
//   experimental: {
//     appDir: true,
//   },
// }

module.exports = nextConfig
