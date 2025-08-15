import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/hooks/use-theme'
import { Toaster } from 'sonner'
import { CartProvider } from '@/contexts/CartContext'
import { FavoritesProvider } from '@/contexts/FavoritesContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { SessionProvider } from 'next-auth/react'
import { FadeIn } from '@/components/animated-components'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  fallback: ['system-ui', 'arial']
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  fallback: ['Consolas', 'monospace']
})

export const metadata: Metadata = {
  title: 'Admin - USS Brasil',
  description: 'Painel administrativo da USS Brasil',
}

function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <FavoritesProvider>
          <CartProvider>
            <FadeIn duration={0.3}>
              {children}
            </FadeIn>
          </CartProvider>
        </FavoritesProvider>
      </AuthProvider>
    </SessionProvider>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-inter antialiased`}>
        <ThemeProvider>
          <AdminProviders>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
              {children}
            </div>
            
            <Toaster 
              position="top-right" 
              richColors 
              closeButton
              duration={4000}
            />
          </AdminProviders>
        </ThemeProvider>
      </body>
    </html>
  )
}
