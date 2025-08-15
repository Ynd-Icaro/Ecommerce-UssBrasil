'use client'

import { usePathname } from "next/navigation"
import ModernNavbarClean from "./navbar-clean"

export default function ClientNavbar() {  
  const pathname = usePathname()
  
  // Não mostrar navbar nas páginas de admin
  if (pathname?.startsWith('/admin')) {
    return null
  }
  
  return <ModernNavbarClean />
}