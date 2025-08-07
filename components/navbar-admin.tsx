'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { 
  Menu, 
  X, 
  Home, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Bell,
  Search,
  User
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  active?: boolean
}

const navigationItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: <Home className="h-5 w-5" />
  },
  {
    label: 'Produtos',
    href: '/admin/products',
    icon: <Package className="h-5 w-5" />
  },
  {
    label: 'Pedidos',
    href: '/admin/orders',
    icon: <ShoppingCart className="h-5 w-5" />
  },
  {
    label: 'Clientes',
    href: '/admin/customers',
    icon: <Users className="h-5 w-5" />
  },
  {
    label: 'Relatórios',
    href: '/admin/reports',
    icon: <BarChart3 className="h-5 w-5" />
  },
  {
    label: 'Configurações',
    href: '/admin/settings',
    icon: <Settings className="h-5 w-5" />
  }
]

function MobileAdminMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname()

  if (!open) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute left-0 top-0 h-full w-80 bg-white shadow-2xl overflow-hidden flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-[#1a1a1a] to-[#2d2d2d] text-white">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-[#20b2aa] flex items-center justify-center">
                <Package className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold">Admin Panel</span>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-[#20b2aa] text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-[#20b2aa]'
                    }`}
                    onClick={onClose}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t bg-gray-50">
            <button
              onClick={() => {
                onClose()
                // Add logout logic here
              }}
              className="flex items-center space-x-3 w-full px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Sair</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function AdminNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
                aria-label="Abrir menu"
              >
                <Menu className="h-6 w-6" />
              </button>

              {/* Logo */}
              <Link href="/admin" className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#20b2aa] to-[#1a9999] flex items-center justify-center">
                  <Package className="h-4 w-4 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-[#1a1a1a] to-[#20b2aa] bg-clip-text text-transparent">
                  Admin Panel
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-[#20b2aa] text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-[#20b2aa]'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar..."
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className={`pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20b2aa] focus:border-[#20b2aa] transition-all ${
                      isSearchFocused ? 'w-80' : 'w-64'
                    }`}
                  />
                </div>
              </div>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                  3
                </span>
              </button>

              {/* Profile */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#20b2aa] to-[#1a9999] flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">Admin</p>
                  <p className="text-xs text-gray-500">Administrador</p>
                </div>
              </div>

              {/* Logout Desktop */}
              <button
                onClick={() => {
                  // Add logout logic here
                  router.push('/')
                }}
                className="hidden lg:flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm font-medium">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-16"></div>

      {/* Mobile Menu */}
      <MobileAdminMenu open={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  )
}
