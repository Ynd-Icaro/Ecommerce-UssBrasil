'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Search, Settings, User, Menu, Sun, Moon } from 'lucide-react'

interface AdminHeaderProps {
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}

export default function AdminHeader({ sidebarCollapsed = false, onToggleSidebar }: AdminHeaderProps) {
  const [notifications] = useState([
    { id: 1, message: 'Novo pedido recebido', time: '2 min atrás', unread: true },
    { id: 2, message: 'Produto em estoque baixo', time: '1h atrás', unread: true },
    { id: 3, message: 'Relatório mensal disponível', time: '3h atrás', unread: false }
  ])
  
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <motion.header
      initial={false}
      animate={{ 
        marginLeft: sidebarCollapsed ? 80 : 288 
      }}
      className="bg-[#0C1A33]/95 backdrop-blur-xl border-b border-[#0E7466]/30 
                 h-16 fixed top-0 right-0 left-0 z-30 flex items-center justify-between px-6"
    >
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 
                   transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="hidden md:block">
          <h1 className="text-white font-semibold text-lg">
            Dashboard
          </h1>
          <p className="text-gray-400 text-sm">
            Bem-vindo de volta, Admin!
          </p>
        </div>
      </div>

      {/* Center - Search (hidden on mobile) */}
      <div className="hidden lg:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Pesquisar produtos, pedidos, clientes..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl 
                     text-white placeholder-gray-400 focus:outline-none focus:border-[#0E7466] 
                     focus:ring-2 focus:ring-[#0E7466]/20 transition-all text-sm"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-3">
        {/* Theme Toggle */}
        <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 
                         transition-colors" 
                title="Alternar tema">
          <Sun className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 
                     transition-colors"
            title="Notificações"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs 
                             rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-0 top-12 w-80 bg-[#0C1A33]/95 backdrop-blur-xl 
                       border border-[#0E7466]/30 rounded-xl shadow-xl py-2 z-50"
            >
              <div className="px-4 py-2 border-b border-[#0E7466]/20">
                <h3 className="text-white font-medium">Notificações</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer
                              ${notification.unread ? 'bg-[#0E7466]/10' : ''}`}
                  >
                    <p className={`text-sm ${notification.unread ? 'text-white' : 'text-gray-300'}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-[#0E7466]/20">
                <button className="text-[#0E7466] text-sm hover:text-[#0C6157] transition-colors">
                  Ver todas as notificações
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Settings */}
        <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 
                         transition-colors" 
                title="Configurações">
          <Settings className="w-5 h-5" />
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center space-x-2 p-2 rounded-lg text-gray-400 hover:text-white 
                     hover:bg-white/10 transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-[#0E7466] to-[#0C6157] rounded-full 
                          flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-white text-sm font-medium">Admin</p>
              <p className="text-gray-400 text-xs">Administrador</p>
            </div>
          </button>

          {/* Profile Dropdown */}
          {showProfile && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-0 top-12 w-48 bg-[#0C1A33]/95 backdrop-blur-xl 
                       border border-[#0E7466]/30 rounded-xl shadow-xl py-2 z-50"
            >
              <div className="px-4 py-2 border-b border-[#0E7466]/20">
                <p className="text-white font-medium">Admin User</p>
                <p className="text-gray-400 text-sm">admin@ussbrasil.com</p>
              </div>
              <div className="py-1">
                <button className="w-full px-4 py-2 text-left text-gray-300 hover:text-white 
                                 hover:bg-white/5 transition-colors">
                  Meu Perfil
                </button>
                <button className="w-full px-4 py-2 text-left text-gray-300 hover:text-white 
                                 hover:bg-white/5 transition-colors">
                  Configurações
                </button>
                <button className="w-full px-4 py-2 text-left text-gray-300 hover:text-white 
                                 hover:bg-white/5 transition-colors">
                  Ajuda
                </button>
              </div>
              <div className="border-t border-[#0E7466]/20 py-1">
                <button className="w-full px-4 py-2 text-left text-red-400 hover:text-red-300 
                                 hover:bg-white/5 transition-colors">
                  Sair
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  )
}
