'use client'

import { usePathname } from 'next/navigation'
import ModernFooter from './modern-footer'

export default function ConditionalFooter() {
  const pathname = usePathname()
  
  // Não mostrar footer nas páginas de admin
  if (pathname?.startsWith('/admin')) {
    return null
  }
  
  return <ModernFooter />
}
