'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Settings, 
  ShoppingBag, 
  Heart, 
  LogOut, 
  LogIn,
  UserPlus,
  Package,
  CreditCard,
  Bell
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

interface ProfileDropdownProps {
  isOpen: boolean
  onClose: () => void
  onAuthClick: (mode: 'login' | 'register') => void
}

export function ProfileDropdown({ isOpen, onClose, onAuthClick }: ProfileDropdownProps) {
  // Mock - Em produção, verificar se usuário está logado
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({
    name: 'João Silva',
    email: 'joao@email.com',
    avatar: '/avatars/user.jpg'
  })

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{ duration: 0.2 }}
        className="absolute right-0 top-full mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/50 z-50"
      >
        {/* Overlay para fechar */}
        <div 
          className="fixed inset-0 z-40" 
          onClick={onClose}
        />
        
        <div className="relative z-50 p-4">
          {isLoggedIn ? (
            <>
              {/* User Info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 bg-gradient-to-r from-blue-900 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900">{user.name}</h4>
                  <p className="text-sm text-slate-600">{user.email}</p>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Menu Items */}
              <div className="space-y-1">
                <Link href="/profile">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left h-10"
                    onClick={onClose}
                  >
                    <User className="mr-3 h-4 w-4" />
                    Meu Perfil
                  </Button>
                </Link>

                <Link href="/orders">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left h-10"
                    onClick={onClose}
                  >
                    <Package className="mr-3 h-4 w-4" />
                    Meus Pedidos
                  </Button>
                </Link>

                <Link href="/favorites">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left h-10"
                    onClick={onClose}
                  >
                    <Heart className="mr-3 h-4 w-4" />
                    Lista de Desejos
                  </Button>
                </Link>

                <Link href="/profile/payment">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left h-10"
                    onClick={onClose}
                  >
                    <CreditCard className="mr-3 h-4 w-4" />
                    Formas de Pagamento
                  </Button>
                </Link>

                <Link href="/profile/notifications">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left h-10"
                    onClick={onClose}
                  >
                    <Bell className="mr-3 h-4 w-4" />
                    Notificações
                  </Button>
                </Link>

                <Link href="/profile/settings">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left h-10"
                    onClick={onClose}
                  >
                    <Settings className="mr-3 h-4 w-4" />
                    Configurações
                  </Button>
                </Link>
              </div>

              <Separator className="my-4" />

              {/* Logout */}
              <Button
                variant="ghost"
                className="w-full justify-start text-left h-10 text-red-600 hover:bg-red-50"
                onClick={() => {
                  setIsLoggedIn(false)
                  onClose()
                }}
              >
                <LogOut className="mr-3 h-4 w-4" />
                Sair
              </Button>
            </>
          ) : (
            <>
              {/* Not Logged In */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-900 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">
                  Bem-vindo!
                </h4>
                <p className="text-sm text-slate-600">
                  Faça login para acessar sua conta e aproveitar todas as funcionalidades.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full bg-gradient-to-r from-blue-900 to-cyan-500 text-white"
                  onClick={() => {
                    onAuthClick('login')
                    onClose()
                  }}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Fazer Login
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-blue-900 text-blue-900 hover:bg-blue-50"
                  onClick={() => {
                    onAuthClick('register')
                    onClose()
                  }}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Criar Conta
                </Button>
              </div>

              <Separator className="my-4" />

              {/* Guest Options */}
              <div className="space-y-1">
                <Link href="/products">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left h-10"
                    onClick={onClose}
                  >
                    <ShoppingBag className="mr-3 h-4 w-4" />
                    Explorar Produtos
                  </Button>
                </Link>

                <Link href="/about">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left h-10"
                    onClick={onClose}
                  >
                    <User className="mr-3 h-4 w-4" />
                    Sobre Nós
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
