import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import ConditionalNavbar from '@/components/conditional-navbar'
import ConditionalFooter from '@/components/conditional-footer'
import ToastWrapper from '@/components/toast-wrapper'
import { ThemeProvider } from '@/hooks/use-theme'
import { Toaster } from 'sonner'
import { CartProvider } from '@/contexts/CartContext'
import { FavoritesProvider } from '@/contexts/FavoritesContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { SessionProvider } from 'next-auth/react'
import { FadeIn } from '@/components/animated-components'
import './globals.css'

// ========== CONFIGURAÇÃO DE FONTES ==========
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

// ========== CONFIGURAÇÃO DE VIEWPORT ==========
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#00CED1' },
    { media: '(prefers-color-scheme: dark)', color: '#20B2AA' }
  ],
  colorScheme: 'light dark'
}

// ========== METADADOS PREMIUM ==========
export const metadata: Metadata = {
  title: {
    default: 'USS Brasil | Produtos Apple Premium - iPhone, MacBook, iPad, Apple Watch',
    template: '%s | USS Brasil - Loja Apple Premium'
  },
  description: 'Loja premium de produtos Apple no Brasil. iPhone 16 Pro, MacBook Pro M3, iPad Pro, Apple Watch Ultra 2, AirPods Pro 2. Revenda autorizada Apple com garantia oficial, entrega expressa e os melhores preços do mercado.',
  
  keywords: [
    // Produtos principais
    'Apple Brasil', 'iPhone 16 Pro', 'MacBook Pro M3', 'iPad Pro M2', 'Apple Watch Ultra 2', 'AirPods Pro 2',
    // Categorias
    'produtos Apple', 'loja Apple autorizada', 'revenda Apple Brasil',
    'smartphones premium', 'laptops profissionais', 'tablets Apple', 'smartwatches',
    // Tecnologia
    'chip A18 Pro', 'chip M3', 'Liquid Retina', 'Camera Control', 'Action Button',
    'cancelamento de ruído', 'áudio espacial', 'CarPlay', 'AirPlay',
    // Comercial
    'USS Brasil', 'entrega expressa', 'garantia Apple', 'parcelamento sem juros',
    'loja online Apple', 'produtos originais', 'nota fiscal', 'suporte técnico'
  ],
  
  authors: [{ name: 'USS Brasil', url: 'https://uss-brasil.com' }],
  creator: 'USS Brasil - Loja Apple Premium',
  publisher: 'USS Brasil',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  metadataBase: new URL('https://uss-brasil.netlify.app'),
  alternates: {
    canonical: 'https://uss-brasil.netlify.app',
    languages: {
      'pt-BR': 'https://uss-brasil.netlify.app'
    }
  },
  
  // Open Graph otimizado
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://uss-brasil.netlify.app',
    siteName: 'USS Brasil - Loja Apple Premium',
    title: 'USS Brasil | Produtos Apple Premium - iPhone, MacBook, iPad, Apple Watch',
    description: 'Loja premium de produtos Apple no Brasil. iPhone 16 Pro, MacBook Pro M3, iPad Pro, Apple Watch Ultra 2. Revenda autorizada com garantia oficial e entrega expressa.',
    images: [
      {
        url: '/og-image-home.jpg',
        width: 1200,
        height: 630,
        alt: 'USS Brasil - Produtos Apple Premium',
        type: 'image/jpeg'
      }
    ]
  },
  
  // Twitter otimizado
  twitter: {
    card: 'summary_large_image',
    site: '@ussbrasil',
    creator: '@ussbrasil',
    title: 'USS Brasil | Produtos Apple Premium',
    description: 'iPhone 16 Pro, MacBook Pro M3, iPad Pro, Apple Watch Ultra 2. Revenda autorizada Apple com garantia oficial.',
    images: ['/twitter-image.jpg']
  },
  
  // Robots premium
  robots: {
    index: true,
    follow: true,
    noarchive: false,
    nosnippet: false,
    noimageindex: false,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Ícones premium
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  },
  
  // Manifesto PWA
  manifest: '/site.webmanifest',
  
  // Informações extras
  applicationName: 'USS Brasil',
  referrer: 'origin-when-cross-origin',
  
  // Apple específico
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'USS Brasil'
  }
}

// ========== PROVIDERS HIERÁRQUICOS ==========
function AppProviders({ children }: { children: React.ReactNode }) {
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

// ========== COMPONENTE PRINCIPAL DE LAYOUT ==========
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="pt-BR" 
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Preload de recursos críticos */}
        <link rel="preload" href="/Produtos/Apple/Iphone 16 Pro.png" as="image" />
        
        {/* DNS Prefetch para performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
        
        {/* Preconnect para recursos externos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Meta tags adicionais para SEO */}
        <meta name="theme-color" content="#00CED1" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#20B2AA" media="(prefers-color-scheme: dark)" />
        <meta name="color-scheme" content="light dark" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="USS Brasil" />
        <meta name="application-name" content="USS Brasil" />
        <meta name="msapplication-TileColor" content="#00CED1" />
        
        {/* Schema.org para SEO estruturado */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "USS Brasil",
              "description": "Loja premium de produtos Apple no Brasil",
              "url": "https://uss-brasil.netlify.app",
              "logo": "https://uss-brasil.netlify.app/logo.png",
              "sameAs": [
                "https://twitter.com/ussbrasil",
                "https://instagram.com/ussbrasil",
                "https://facebook.com/ussbrasil"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+55-11-99999-9999",
                "contactType": "customer service",
                "areaServed": "BR",
                "availableLanguage": "Portuguese"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "BR",
                "addressLocality": "São Paulo",
                "addressRegion": "SP"
              }
            })
          }}
        />
      </head>
      
      <body className={`
        ${inter.variable} 
        ${jetbrainsMono.variable}
        font-inter
        antialiased 
        overflow-x-hidden
        selection:bg-primary/20 
        selection:text-primary
        scroll-smooth
      `}>
        {/* Gradient de fundo global */}
        <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-primary/5 pointer-events-none" />
        
        {/* Theme Provider principal */}
        <ThemeProvider>
          <AppProviders>
            {/* Layout principal com glassmorphism */}
            <div className="
              relative min-h-screen 
              bg-background/80 backdrop-blur-sm
              text-foreground 
              transition-all duration-500 ease-in-out
              selection:bg-primary/20
            ">
              {/* Navigation premium */}
              <ConditionalNavbar />
              
              {/* Main content area */}
              <main className="
                relative min-h-screen
                pt-20 md:pt-0
                transition-all duration-300
                focus-visible:outline-none
              ">
                {children}
              </main>
              
              {/* Modern Footer */}
              <ConditionalFooter />
              
              {/* Footer spacer para mobile */}
              <div className="h-20 md:h-0" />
              
              {/* Sistema de notificações premium */}
              <Toaster 
                position="top-center" 
                richColors 
                closeButton
                duration={4000}
                toastOptions={{
                  className: 'glass border-primary/20',
                  style: {
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(0, 206, 209, 0.2)'
                  }
                }}
              />
            </div>
            
          </AppProviders>
          
          {/* Toast Wrapper para compatibilidade */}
          <ToastWrapper />
          
        </ThemeProvider>
        
        {/* Scripts de performance e analytics */}
        <script 
          dangerouslySetInnerHTML={{
            __html: `
              // Preload crítico de imagens
              const criticalImages = [
                '/Produtos/Apple/Iphone 16 Pro.png',
                '/Produtos/Apple/Watch Ultra 2.png',
                '/Produtos/Apple/Macbook Pro.png'
              ];
              
              criticalImages.forEach(src => {
                const img = new Image();
                img.src = src;
              });
              
              // Detecção de tema preferido
              if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
              }
              
              // Performance timing
              window.addEventListener('load', () => {
                if (typeof window.gtag !== 'undefined') {
                  gtag('event', 'page_load_time', {
                    value: Math.round(performance.now())
                  });
                }
              });
            `
          }}
        />
      </body>
    </html>
  )
}
