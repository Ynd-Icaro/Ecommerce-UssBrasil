'use client'

import { usePathname } from 'next/navigation'
import NavbarEnhanced from '@/components/navbar-enhanced'
import ModernFooter from '@/components/navigation/modern-footer'
import GlobalModals from '@/components/modals'

interface ConditionalNavFooterProps {
  children: React.ReactNode
}

export default function ConditionalNavFooter({ children }: ConditionalNavFooterProps) {
  const pathname = usePathname()
  
  // Check if current route is admin
  const isAdminRoute = pathname.startsWith('/admin')

  return (
    <>
      {!isAdminRoute && <NavbarEnhanced />}
      <main className="min-h-screen bg-[var(--bg-primary)] transition-colors duration-300">
        <div className="relative">
          {children}
        </div>
      </main>
      {!isAdminRoute && <ModernFooter />}
      {!isAdminRoute && <GlobalModals />}
    </>
  )
}
