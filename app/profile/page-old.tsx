'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Package,
  Star,
  Heart,
  Settings,
  LogOut,
  Edit,
  Camera,
  ShoppingBag,
  CreditCard,
  Bell,
  Shield,
  Gift,
  ArrowRight,
  Trophy,
  Target
} from 'lucide-react'

// Dados mockados para demonstração
const mockUser = {
  id: '1',
  name: 'João Silva',
  email: 'joao@email.com',
  phone: '(11) 99999-9999',
  avatar: '/images/avatar-placeholder.jpg',
  address: {
    street: 'Rua das Flores, 123',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567'
  },
  joinDate: '2023-06-15',
  totalOrders: 8,
  totalSpent: 45697,
  favoriteProducts: 12,
  loyaltyPoints: 1250,
  vipLevel: 'Gold'
}

const mockOrders = [
  {
    id: '1001',
    date: '2024-01-15',
    status: 'delivered',
    items: 3,
    total: 8999
  },
  {
    id: '1002',
    date: '2024-01-10',
    status: 'shipped',
    items: 1,
    total: 2199
  },
  {
    id: '1003',
    date: '2024-01-05',
    status: 'processing',
    items: 2,
    total: 15599
  }
]

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser)
  const [orders] = useState(mockOrders)
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Entregue'
      case 'shipped':
        return 'Enviado'
      case 'processing':
        return 'Processando'
      default:
        return 'Desconhecido'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-uss-primary to-uss-secondary flex items-center justify-center text-white text-2xl font-bold">
                {user.name.charAt(0)}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-lg">
                <Camera className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {user.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Membro desde {formatDate(user.joinDate)}
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="text-center">
                  <div className="text-2xl font-bold text-uss-primary">
                    {user.totalOrders}
                  </div>
                  <div className="text-sm text-gray-500">Pedidos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-uss-primary">
                    {formatPrice(user.totalSpent)}
                  </div>
                  <div className="text-sm text-gray-500">Total Gasto</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-uss-primary">
                    {user.loyaltyPoints}
                  </div>
                  <div className="text-sm text-gray-500">Pontos</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-uss-primary text-white rounded-lg hover:bg-uss-primary-dark transition-colors flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Editar
              </button>
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tabs Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-8">
              {[
                { id: 'overview', label: 'Visão Geral', icon: User },
                { id: 'orders', label: 'Pedidos', icon: Package },
                { id: 'favorites', label: 'Favoritos', icon: Heart },
                { id: 'settings', label: 'Configurações', icon: Settings }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-uss-primary text-uss-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {/* Quick Stats */}
                <div className="bg-gradient-to-r from-uss-primary to-uss-secondary rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-uss-off-white">Nível VIP</p>
                      <p className="text-2xl font-bold">{user.vipLevel}</p>
                    </div>
                    <Trophy className="h-8 w-8" />
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Produtos Favoritos</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {user.favoriteProducts}
                      </p>
                    </div>
                    <Heart className="h-8 w-8 text-red-500" />
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Próxima Recompensa</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        250 pontos restantes
                      </p>
                    </div>
                    <Gift className="h-8 w-8 text-green-500" />
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="md:col-span-2 lg:col-span-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Pedidos Recentes
                  </h3>
                  <div className="space-y-4">
                    {orders.slice(0, 3).map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-uss-primary rounded-lg flex items-center justify-center">
                            <Package className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              Pedido #{order.id}
                            </p>
                            <p className="text-sm text-gray-500">
                              {formatDate(order.date)} • {order.items} itens
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {formatPrice(order.total)}
                          </p>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'orders' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Todos os Pedidos
                </h3>
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-uss-primary rounded-lg flex items-center justify-center">
                        <Package className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Pedido #{order.id}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDate(order.date)} • {order.items} itens
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {formatPrice(order.total)}
                        </p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                      <button className="px-4 py-2 text-uss-primary hover:bg-uss-primary hover:text-white rounded-lg transition-colors">
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'favorites' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Nenhum produto favorito ainda
                </h3>
                <p className="text-gray-500 mb-6">
                  Comece a favoritar produtos para vê-los aqui
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-uss-primary text-white rounded-lg hover:bg-uss-primary-dark transition-colors"
                >
                  Explorar Produtos
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Configurações da Conta
                </h3>

                {/* Personal Information */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                    Informações Pessoais
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        value={user.name}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-uss-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-uss-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        value={user.phone}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-uss-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        CEP
                      </label>
                      <input
                        type="text"
                        value={user.address.zipCode}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-uss-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  {isEditing && (
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 bg-uss-primary text-white rounded-lg hover:bg-uss-primary-dark transition-colors"
                      >
                        Salvar Alterações
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  )}
                </div>

                {/* Notification Settings */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                    Preferências de Notificação
                  </h4>
                  <div className="space-y-4">
                    {[
                      { id: 'email', label: 'Notificações por Email', enabled: true },
                      { id: 'sms', label: 'Notificações por SMS', enabled: false },
                      { id: 'push', label: 'Notificações Push', enabled: true },
                      { id: 'promotions', label: 'Ofertas e Promoções', enabled: true }
                    ].map((setting) => (
                      <div key={setting.id} className="flex items-center justify-between">
                        <span className="text-gray-900 dark:text-white">{setting.label}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked={setting.enabled}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-uss-primary/25 dark:peer-focus:ring-uss-primary/25 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-uss-primary"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                  <h4 className="font-medium text-red-900 dark:text-red-300 mb-2">
                    Zona de Perigo
                  </h4>
                  <p className="text-sm text-red-700 dark:text-red-400 mb-4">
                    Ações irreversíveis em sua conta
                  </p>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 text-red-600 hover:text-red-700 border border-red-300 hover:border-red-400 rounded-lg transition-colors">
                      Desativar Conta
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors">
                      Excluir Conta
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
