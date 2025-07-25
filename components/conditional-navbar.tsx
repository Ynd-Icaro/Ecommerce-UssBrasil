'use client'

import { usePathname } from 'next/navigation'
import ClientNavbar from './client-navbar'

export default function ConditionalNavbar() {
  const pathname = usePathname()
  
  // Não mostrar navbar nas páginas de admin
  if (pathname?.startsWith('/admin')) {
    return null
  }
  
  return <ClientNavbar />
}
