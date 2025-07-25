import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ConditionalNavbar from '@/components/conditional-navbar'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EcoMuss - Apple Store Brasileira',
  description: 'A melhor loja Apple do Brasil com produtos originais e entrega rápida',
  metadataBase: new URL('https://ecomuss.netlify.app'),
  openGraph: {
    title: 'EcoMuss - Apple Store Brasileira',
    description: 'A melhor loja Apple do Brasil com produtos originais e entrega rápida',
    type: 'website',
    locale: 'pt_BR',
    url: 'https://ecomuss.netlify.app',
    siteName: 'EcoMuss',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EcoMuss - Apple Store Brasileira',
    description: 'A melhor loja Apple do Brasil com produtos originais e entrega rápida',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ConditionalNavbar />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
