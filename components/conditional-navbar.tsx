'use client'

import { usePathname } from 'next/navigation'
import { MainNavigation } from './navigation/main-navigation'

export default function ConditionalNavbar() {
  const pathname = usePathname()
  
  // Não mostrar navbar nas páginas de admin
  if (pathname?.startsWith('/admin')) {
    return null
  }
  
  // Determinar variante baseada na página
  const getNavigationVariant = () => {
    if (pathname === '/') return 'transparent' // Home page
    return 'glass' // Outras páginas
  }
  
  return <MainNavigation variant={getNavigationVariant()} />
}
