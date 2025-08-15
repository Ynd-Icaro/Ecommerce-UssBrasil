'use client'

import { usePathname } from 'next/navigation'
import ModernNavbar from './navbar-clean'
import { DEFAULT_NAVBAR_CONFIG, LANDING_NAVBAR_CONFIG } from './navbar-config'

export default function ConditionalNavbar() {
  const pathname = usePathname()
  
  // Não mostrar navbar nas páginas de admin
  if (pathname?.startsWith('/admin')) {
    return null
  }

  // Usar configuração diferente para páginas específicas
  const isLandingPage = pathname === '/' || pathname === '/sobre'
  
  return (
    <ModernNavbar 
      config={isLandingPage ? LANDING_NAVBAR_CONFIG : DEFAULT_NAVBAR_CONFIG}
      showBrandDropdown={true}
    />
  )
}
