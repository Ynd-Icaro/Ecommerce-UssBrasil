'use client'

import { usePathname } from 'next/navigation'
import NavbarEnhanced from '@/components/navbar-enhanced'
import ModernFooter from '@/components/navigation/modern-footer'
import GlobalModals from '@/components/modals'

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  
  // Check if current route is admin
  const isAdminRoute = pathname.startsWith('/admin')

  if (isAdminRoute) {
    // Admin routes: no navbar, no footer, no modals
    return (
      <main className="min-h-screen bg-[var(--bg-primary)] transition-colors duration-300">
        <div className="relative">
          {children}
        </div>
      </main>
    )
  }

  // Regular routes: full layout with navbar, footer, and modals
  return (
    <>
      <NavbarEnhanced />
      <main className="min-h-screen bg-[var(--bg-primary)] transition-colors duration-300">
        <div className="relative">
          {children}
        </div>
      </main>
      <ModernFooter />
      <GlobalModals />
    </>
  )
}
