'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  Settings,
  FileText,
  TrendingUp,
  Bell,
  User,
  Menu,
  X,
  Home,
  LogOut,
  Search,
  Plus,
  ChevronLeft,
  HelpCircle,
  UserPlus
} from 'lucide-react'
import AdminNavigation from './AdminNavigation'

interface AdminSidebarProps {
  collapsed?: boolean
  onToggleCollapse?: () => void
  onQuickAction?: (action: string) => void
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
    description: 'Gerenciar catálogo',
    badge: '247'
  },
  { 
    name: 'Pedidos', 
    href: '/admin/orders', 
    icon: ShoppingCart,
    description: 'Processar vendas',
    badge: '12'
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
    icon: TrendingUp,
    description: 'Relatórios e insights'
  },
  { 
    name: 'Relatórios', 
    href: '/admin/reports', 
    icon: FileText,
    description: 'Documentos e dados'
  },
  { 
    name: 'Configurações', 
    href: '/admin/settings', 
    icon: Settings,
    description: 'Preferências do sistema'
  }
]

const quickActions = [
  { name: 'Novo Produto', icon: Plus, action: 'new-product' },
  { name: 'Novo Pedido', icon: ShoppingCart, action: 'new-order' },
  { name: 'Novo Cliente', icon: UserPlus, action: 'new-customer' },
  { name: 'Relatório', icon: FileText, action: 'new-report' }
]

export default function AdminSidebar({ collapsed = false, onToggleCollapse, onQuickAction }: AdminSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleQuickAction = (action: string) => {
    if (onQuickAction) {
      onQuickAction(action)
    }
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 288 }}
      className="bg-[#0C1A33]/95 backdrop-blur-xl border-r border-[#0E7466]/30 
                 flex flex-col h-screen fixed left-0 top-0 z-40"
    >
      {/* Header */}
      <div className="p-6 border-b border-[#0E7466]/20">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <Link href="/admin" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#0E7466] to-[#0C6157] rounded-xl 
                            flex items-center justify-center">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">USS BRASIL</h1>
                <p className="text-gray-400 text-xs">Admin Panel</p>
              </div>
            </Link>
          )}
          
          <button
            onClick={onToggleCollapse}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 
                     transition-colors"
          >
            {collapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Search */}
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4"
          >
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar no admin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl 
                         text-white placeholder-gray-400 focus:outline-none focus:border-[#0E7466] 
                         focus:ring-2 focus:ring-[#0E7466]/20 transition-all text-sm"
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 overflow-y-auto">
        <AdminNavigation items={navigation} collapsed={collapsed} />
        
        {/* Quick Actions */}
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 px-4"
          >
            <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-3">
              Ações Rápidas
            </h3>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <button
                  key={action.name}
                  onClick={() => handleQuickAction(action.action)}
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-300 rounded-lg
                           hover:text-white hover:bg-white/10 transition-colors"
                >
                  <action.icon className="w-4 h-4 mr-3" />
                  {action.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* User Profile & Footer */}
      <div className="p-4 border-t border-[#0E7466]/20">
        {!collapsed ? (
          <div className="space-y-3">
            {/* User Profile */}
            <div className="flex items-center px-3 py-2 rounded-lg bg-white/5">
              <div className="w-8 h-8 bg-gradient-to-r from-[#0E7466] to-[#0C6157] rounded-full 
                            flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-white text-sm font-medium">Admin User</p>
                <p className="text-gray-400 text-xs">admin@ussbrasil.com</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 
                               transition-colors" title="Notificações">
                <Bell className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 
                               transition-colors" title="Ajuda">
                <HelpCircle className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 
                               transition-colors" title="Configurações">
                <Settings className="w-4 h-4" />
              </button>
              <Link
                href="/"
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 
                         transition-colors" 
                title="Sair"
              >
                <LogOut className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-3">
            <div className="w-8 h-8 bg-gradient-to-r from-[#0E7466] to-[#0C6157] rounded-full 
                          flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col items-center space-y-2">
              <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 
                               transition-colors" title="Notificações">
                <Bell className="w-4 h-4" />
              </button>
              <Link
                href="/"
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 
                         transition-colors" 
                title="Sair"
              >
                <LogOut className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </motion.aside>
  )
}
