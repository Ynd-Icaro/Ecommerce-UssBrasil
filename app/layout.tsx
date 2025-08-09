import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import FixedNavbar from '@/components/navbar-fixed'
import ModernFooter from '@/components/navigation/modern-footer'
import ToastWrapper from '@/components/toast-wrapper'
import GlobalModals from '@/components/modals'
import { ThemeProvider } from '@/hooks/use-theme'
import { Toaster } from 'sonner'
import { CartProvider } from '@/contexts/CartContext'
import { FavoritesProvider } from '@/contexts/FavoritesContext'
import { ModalProvider } from '@/contexts/ModalContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'USS Brasil - Produtos Premium & Tecnologia de Ponta',
  description: 'Descubra os melhores produtos Apple, JBL, DJI, Xiaomi e Geonav. Tecnologia premium com entrega expressa e garantia oficial.',
  metadataBase: new URL('https://ussbrasil.netlify.app'),
  keywords: [
    'USS Brasil',
    'Apple',
    'iPhone',
    'MacBook',
    'JBL',
    'DJI',
    'Xiaomi',
    'Geonav',
    'produtos importados',
    'tecnologia premium',
    'loja online',
    'eletrônicos'
  ],
  openGraph: {
    title: 'USS Brasil - Produtos Premium & Tecnologia de Ponta',
    description: 'Descubra os melhores produtos Apple, JBL, DJI, Xiaomi e Geonav. Tecnologia premium com entrega expressa e garantia oficial.',
    type: 'website',
    locale: 'pt_BR',
    url: 'https://ussbrasil.netlify.app',
    siteName: 'USS Brasil',
    images: [
      {
        url: '/Empresa/02.png',
        width: 800,
        height: 600,
        alt: 'USS Brasil - Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'USS Brasil - Produtos Premium & Tecnologia de Ponta',
    description: 'Descubra os melhores produtos Apple, JBL, DJI, Xiaomi e Geonav. Tecnologia premium com entrega expressa e garantia oficial.',
    images: ['/Empresa/02.png'],
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
  verification: {
    google: 'your-google-verification-code',
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
              <ModalProvider>
                <Toaster position="top-center" richColors />
                <FixedNavbar />
                <main className="min-h-screen">
                  {children}
                </main>
                <ModernFooter />
                <GlobalModals />
              </ModalProvider>
            </CartProvider>
          </FavoritesProvider>
        </ThemeProvider>
        <ToastWrapper />
      </body>
    </html>
  )
}
