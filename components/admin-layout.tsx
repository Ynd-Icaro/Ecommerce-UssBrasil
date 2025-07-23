'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingCart, 
  Settings, 
  Menu,
  X,
  BarChart3,
  TrendingUp,
  Bell,
  Search,
  LogOut,
  User
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

const sidebarItems = [
  {
    title: 'Visão Geral',
    items: [
      { 
        name: 'Dashboard', 
        href: '/admin', 
        icon: LayoutDashboard,
        description: 'Métricas e overview geral'
      },
      { 
        name: 'Analytics', 
        href: '/admin/analytics', 
        icon: BarChart3,
        description: 'Relatórios detalhados'
      }
    ]
  },
  {
    title: 'Gerenciamento',
    items: [
      { 
        name: 'Produtos', 
        href: '/admin/products', 
        icon: Package,
        description: 'Gestão de produtos e estoque'
      },
      { 
        name: 'Pedidos', 
        href: '/admin/orders', 
        icon: ShoppingCart,
        description: 'Acompanhar todos os pedidos'
      },
      { 
        name: 'Clientes', 
        href: '/admin/customers', 
        icon: Users,
        description: 'Base de clientes'
      }
    ]
  },
  {
    title: 'Sistema',
    items: [
      { 
        name: 'Configurações', 
        href: '/admin/settings', 
        icon: Settings,
        description: 'Configurações do sistema'
      }
    ]
  }
]

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl lg:translate-x-0 lg:static lg:inset-0 border-r border-gray-200 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 lg:px-8 border-b border-gray-200 bg-white">
          <Link href="/admin" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-200">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">
                UssBrasil
              </span>
              <p className="text-xs text-gray-500 font-medium">Admin Panel</p>
            </div>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden hover:bg-gray-100 rounded-lg transition-all duration-200"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5 text-gray-600" />
          </Button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 px-6 lg:px-8 py-6 space-y-6 overflow-y-auto">
          {sidebarItems.map((section, sectionIndex) => (
            <div key={section.title}>
              <h3 className="px-0 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center">
                <span className="w-6 h-px bg-gray-300 mr-2"></span>
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`group flex items-center px-0 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-gray-100 text-gray-900 shadow-sm border-r-2 border-gray-900'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-all duration-200 ${
                        isActive 
                          ? 'bg-gray-900 text-white' 
                          : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700'
                      }`}>
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`font-medium truncate ${
                          isActive ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {item.name}
                        </div>
                        <div className={`text-xs truncate ${
                          isActive ? 'text-gray-600' : 'text-gray-500'
                        }`}>
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User section */}
        <div className="p-6 lg:p-8 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-200 cursor-pointer group">
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarImage src="/avatars/admin.png" />
              <AvatarFallback className="bg-gray-900 text-white font-medium">AD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                Admin Principal
              </p>
              <p className="text-xs text-gray-500 truncate">
                admin@ussbrasil.com.br
              </p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0 hover:bg-gray-200 hover:text-gray-700 rounded-lg transition-all duration-200">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top navbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-8 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-gray-100 rounded-lg transition-all duration-200"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </Button>
            
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar no painel..."
                className="pl-10 pr-4 py-2 w-64 lg:w-80 bg-gray-50 border-gray-200 focus:bg-white focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all duration-200 rounded-lg text-sm placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <Bell className="h-5 w-5 text-gray-600" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 text-xs bg-red-500 border-2 border-white shadow-sm">
                3
              </Badge>
            </Button>

            <Link href="/admin/settings" className="hidden sm:block">
              <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-lg transition-all duration-200">
                <Settings className="h-5 w-5 text-gray-600" />
              </Button>
            </Link>

            <div className="h-6 w-px bg-gray-300 hidden sm:block" />

            <Button variant="ghost" className="flex items-center space-x-3 hover:bg-gray-100 rounded-lg px-3 py-2 transition-all duration-200">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/admin.png" />
                <AvatarFallback className="bg-gray-900 text-white text-xs font-medium">AD</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">Admin</span>
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="px-6 lg:px-8 py-6 lg:py-8 min-h-[calc(100vh-4rem)] bg-white">
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
