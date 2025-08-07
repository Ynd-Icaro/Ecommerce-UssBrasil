'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  Settings,
  FileText,
  PieChart,
  TrendingUp,
  Bell,
  User,
  Menu,
  X,
  Home,
  LogOut,
  Search,
  Plus
} from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/admin', 
    icon: BarChart3,
    description: 'Visão geral e métricas'
  },
  { 
    name: 'Produtos', 
    href: '/admin/products', 
    icon: Package,
    description: 'Gerenciar catálogo'
  },
  { 
    name: 'Pedidos', 
    href: '/admin/orders', 
    icon: ShoppingCart,
    description: 'Processar vendas'
  },
  { 
    name: 'Clientes', 
    href: '/admin/customers', 
    icon: Users,
    description: 'Base de usuários'
  },
  { 
    name: 'Analytics', 
    href: '/admin/analytics', 
    icon: PieChart,
    description: 'Relatórios detalhados'
  },
  { 
    name: 'Configurações', 
    href: '/admin/settings', 
    icon: Settings,
    description: 'Sistema e preferências'
  }
]

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0C1A33] via-[#0E2142] to-[#1A2B52]">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div 
        initial={false}
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        className="fixed top-0 left-0 z-50 w-72 h-full bg-gradient-to-b from-[#0C1A33] to-[#0E2142] border-r border-[#0E7466]/20 lg:translate-x-0 lg:static lg:inset-0"
      >
        {/* Logo Area */}
        <div className="flex items-center justify-between p-6 border-b border-[#0E7466]/20">
          <Link href="/admin" className="flex items-center space-x-3">
            <div className="w-10 h-8 flex flex-col justify-center space-y-1">
              <div className="h-1.5 bg-[#0E7466] rounded-full"></div>
              <div className="h-1.5 bg-[#0E7466] rounded-full w-3/4"></div>
              <div className="h-1.5 bg-[#0E7466] rounded-full w-1/2"></div>
            </div>
            <div>
              <span className="text-2xl font-bold text-white">USSBRASIL</span>
              <p className="text-[#0E7466] text-sm">Admin Panel</p>
            </div>
          </Link>
          
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-[#0E7466]/20">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-[#0E7466] to-[#0C6157] rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white font-medium">Administrador</p>
              <p className="text-gray-400 text-sm">admin@ussbrasil.com</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-6 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`group flex items-center space-x-3 p-4 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-[#0E7466] text-white shadow-lg shadow-[#0E7466]/25' 
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <div className="flex-1">
                    <span className="font-medium">{item.name}</span>
                    <p className="text-xs opacity-70">{item.description}</p>
                  </div>
                  {isActive && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </motion.div>
              </Link>
            )
          })}
        </nav>

        {/* Quick Actions */}
        <div className="p-6 border-t border-[#0E7466]/20 mt-auto">
          <h3 className="text-white font-medium mb-4">Ações Rápidas</h3>
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-2 p-3 bg-[#0E7466] hover:bg-[#0C6157] rounded-xl text-white transition-colors">
              <Plus className="w-4 h-4" />
              <span className="text-sm">Novo Produto</span>
            </button>
            <Link 
              href="/"
              className="w-full flex items-center space-x-2 p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="text-sm">Ver Site</span>
            </Link>
          </div>
        </div>

        {/* Logout */}
        <div className="p-6 border-t border-[#0E7466]/20">
          <button className="w-full flex items-center space-x-2 p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors">
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Sair</span>
          </button>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="lg:ml-72">
        {/* Top bar */}
        <div className="bg-white/10 backdrop-blur-xl border-b border-white/20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold text-white">
                  {navigation.find(item => item.href === pathname)?.name || 'Admin'}
                </h1>
                <p className="text-gray-300 text-sm">
                  {navigation.find(item => item.href === pathname)?.description || 'Painel administrativo'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-64 pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0E7466] focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-300" />
              </div>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg text-white hover:bg-white/10">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile */}
              <div className="w-8 h-8 bg-gradient-to-r from-[#0E7466] to-[#0C6157] rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
