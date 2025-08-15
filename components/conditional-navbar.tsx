'use client'

import { usePathname } from 'next/navigation'
import NavbarPremium from './navbar-premium'

export default function ConditionalNavbar() {
  const pathname = usePathname()
  
  // Não mostrar navbar nas páginas de admin
  if (pathname?.startsWith('/admin')) {
    return null
  }

  // Configurações específicas por página
  const isVipPage = pathname?.includes('/vip')
  const isMinimalPage = pathname?.includes('/login') || pathname?.includes('/register') || pathname?.includes('/checkout')
  
  // Determinar variante da navbar
  let variant: 'default' | 'minimal' | 'transparent' = 'default'
  if (isMinimalPage) variant = 'minimal'
  if (isVipPage) variant = 'transparent'
  
  return (
    <NavbarPremium 
      variant={variant}
      showTopBar={!isMinimalPage}
      showSearchBar={!isMinimalPage}
      showCategories={!isMinimalPage}
      className={isVipPage ? 'bg-gradient-to-r from-black/20 to-transparent' : ''}
    />
  )
}
