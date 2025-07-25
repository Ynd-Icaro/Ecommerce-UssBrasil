import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ConditionalNavbar from '@/components/conditional-navbar'
import ToastWrapper from '@/components/toast-wrapper'
import { ThemeProvider } from '@/hooks/use-theme'
import { Toaster } from 'sonner'
import { CartProvider } from '@/contexts/CartContext'
import { FavoritesProvider } from '@/contexts/FavoritesContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'UssBrasil - Importados Premium',
  description: 'A melhor loja de produtos importados do Brasil com tecnologia de ponta e entrega rápida',
  metadataBase: new URL('https://uss-brasil.netlify.app'),
  openGraph: {
    title: 'UssBrasil - Importados Premium',
    description: 'A melhor loja de produtos importados do Brasil com tecnologia de ponta e entrega rápida',
    type: 'website',
    locale: 'pt_BR',
    url: 'https://uss-brasil.netlify.app',
    siteName: 'UssBrasil',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UssBrasil - Importados Premium',
    description: 'A melhor loja de produtos importados do Brasil com tecnologia de ponta e entrega rápida',
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
        <ThemeProvider>
          <FavoritesProvider>
            <CartProvider>
              <Toaster position="top-center" richColors />
              <ConditionalNavbar />
              <main className="min-h-screen">
                {children}
              </main>
            </CartProvider>
          </FavoritesProvider>
        </ThemeProvider>
        <ToastWrapper />
      </body>
    </html>
  )
}
