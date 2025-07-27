import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/checkout',
          '/profile',
          '/orders',
          '/cart'
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/checkout',
          '/profile',
          '/orders',
          '/cart'
        ],
      }
    ],
    sitemap: 'https://uss-brasil.netlify.app/sitemap.xml',
  }
}
