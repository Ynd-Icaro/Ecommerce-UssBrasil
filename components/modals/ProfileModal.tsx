'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  User, 
  Settings, 
  Heart, 
  ShoppingBag, 
  MapPin, 
  CreditCard, 
  Bell, 
  Shield, 
  LogOut,
  Edit,
  Camera,
  Phone,
  Mail,
  Calendar,
  Package,
  Star,
  Gift,
  HelpCircle,
  MessageCircle
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useModal } from '@/contexts/ModalContext'
import { useState } from 'react'

export default function ProfileModal() {
  const { isProfileOpen, closeProfile } = useModal()
  const [activeTab, setActiveTab] = useState('profile')

  // Dados mockados do usuário (em produção viria de um contexto de auth)
  const user = {
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 99999-9999',
    avatar: '/avatars/user-avatar.jpg',
    joinDate: '2023-01-15',
    level: 'Premium',
    points: 2450,
    orders: 8,
    favorites: 12,
    addresses: 2
  }

  const recentOrders = [
    {
      id: '#USS2024001',
      date: '2024-01-20',
      total: 1299.99,
      status: 'Entregue',
      items: 2
    },
    {
      id: '#USS2024002',
      date: '2024-01-18',
      total: 899.50,
      status: 'Em trânsito',
      items: 1
    }
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const menuItems = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'orders', label: 'Pedidos', icon: Package },
    { id: 'favorites', label: 'Favoritos', icon: Heart },
    { id: 'addresses', label: 'Endereços', icon: MapPin },
    { id: 'payments', label: 'Pagamentos', icon: CreditCard },
    { id: 'settings', label: 'Configurações', icon: Settings }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            {/* Header do Perfil */}
            <div className="text-center">
              <div className="relative inline-block">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-uss-primary text-white text-2xl">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-uss-primary rounded-full flex items-center justify-center text-white hover:bg-uss-primary/90 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">{user.name}</h3>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Badge className="bg-gradient-to-r from-uss-primary to-uss-secondary text-white">
                  {user.level}
                </Badge>
                <Badge variant="outline">
                  <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                  {user.points} pontos
                </Badge>
              </div>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-2xl font-bold text-uss-primary">{user.orders}</p>
                <p className="text-sm text-gray-600">Pedidos</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-2xl font-bold text-red-500">{user.favorites}</p>
                <p className="text-sm text-gray-600">Favoritos</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-2xl font-bold text-green-500">{user.addresses}</p>
                <p className="text-sm text-gray-600">Endereços</p>
              </div>
            </div>

            {/* Informações Pessoais */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center">
                <Edit className="h-4 w-4 mr-2" />
                Informações Pessoais
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Email</span>
                  </div>
                  <span className="text-sm font-medium">{user.email}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Telefone</span>
                  </div>
                  <span className="text-sm font-medium">{user.phone}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Membro desde</span>
                  </div>
                  <span className="text-sm font-medium">{formatDate(user.joinDate)}</span>
                </div>
              </div>
            </div>
          </div>
        )

      case 'orders':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 flex items-center">
              <Package className="h-4 w-4 mr-2" />
              Pedidos Recentes
            </h4>
            
            {recentOrders.map((order) => (
              <div key={order.id} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{order.id}</span>
                  <Badge 
                    variant={order.status === 'Entregue' ? 'default' : 'secondary'}
                    className={order.status === 'Entregue' ? 'bg-green-500' : 'bg-blue-500'}
                  >
                    {order.status}
                  </Badge>
                </div>
                
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Data: {formatDate(order.date)}</p>
                  <p>Itens: {order.items}</p>
                  <p className="font-semibold text-uss-primary">
                    Total: {formatPrice(order.total)}
                  </p>
                </div>
              </div>
            ))}
            
            <Link href="/orders" onClick={closeProfile}>
              <Button variant="outline" className="w-full">
                Ver Todos os Pedidos
              </Button>
            </Link>
          </div>
        )

      default:
        return (
          <div className="flex items-center justify-center h-32">
            <p className="text-gray-500">Conteúdo em desenvolvimento</p>
          </div>
        )
    }
  }

  return (
    <AnimatePresence>
      {isProfileOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProfile}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-uss-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-uss-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Meu Perfil</h2>
                    <p className="text-sm text-gray-500">Gerencie sua conta</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeProfile}
                  className="h-8 w-8 p-0 hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Navegação */}
            <div className="border-b border-gray-100">
              <div className="flex overflow-x-auto">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`flex-shrink-0 flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === item.id
                          ? 'border-uss-primary text-uss-primary bg-uss-primary/5'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="whitespace-nowrap">{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Conteúdo */}
            <div className="flex-1 overflow-auto p-6">
              {renderContent()}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 p-6 space-y-3">
              {/* Ações Rápidas */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center justify-center space-x-2"
                >
                  <Gift className="h-4 w-4" />
                  <span>Recompensas</span>
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center justify-center space-x-2"
                >
                  <HelpCircle className="h-4 w-4" />
                  <span>Ajuda</span>
                </Button>
              </div>

              {/* Logout */}
              <Button
                variant="ghost"
                className="w-full text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair da Conta
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
