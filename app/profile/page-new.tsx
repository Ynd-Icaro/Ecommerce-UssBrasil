'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Package,
  Heart,
  Settings,
  Edit,
  Camera,
  ShoppingBag,
  Bell,
  Shield,
  Gift,
  ArrowRight,
  Trophy
} from 'lucide-react'

// Dados mockados para demonstração
const mockUser = {
  id: '1',
  name: 'João Silva',
  email: 'joao@email.com',
  phone: '(11) 99999-9999',
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
    total: 5499
  }
]

export default function ProfilePage() {
  const [user] = useState(mockUser)
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)

  const formatPrice = (price: number) =>
    `R$ ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'shipped': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'processing': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'Entregue'
      case 'shipped': return 'Enviado'
      case 'processing': return 'Processando'
      case 'cancelled': return 'Cancelado'
      default: return status
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Gold': return 'from-yellow-400 to-yellow-600'
      case 'Silver': return 'from-gray-300 to-gray-500'
      case 'Bronze': return 'from-amber-600 to-amber-800'
      case 'Platinum': return 'from-purple-400 to-purple-600'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden mb-8"
        >
          {/* Cover gradient */}
          <div className="h-32 bg-gradient-to-r from-uss-primary to-uss-secondary"></div>
          
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-white dark:bg-gray-700 p-2 shadow-xl">
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-uss-primary to-uss-secondary flex items-center justify-center text-white text-4xl font-bold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <button className="absolute bottom-2 right-2 w-10 h-10 bg-white dark:bg-gray-700 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                  <Camera className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {user.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  {user.email}
                </p>
                
                {/* VIP Badge */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${getLevelColor(user.vipLevel)} text-white font-semibold text-sm shadow-lg`}>
                  <Trophy className="h-4 w-4" />
                  Membro {user.vipLevel}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-3 bg-uss-primary text-white rounded-xl font-semibold hover:bg-uss-primary-dark transition-colors flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Editar Perfil
                </button>
                <button className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Settings className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user.totalOrders}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Pedidos
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatPrice(user.totalSpent)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Gasto
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-xl flex items-center justify-center">
                <Heart className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user.favoriteProducts}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Favoritos
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center">
                <Gift className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user.loyaltyPoints}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Pontos
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm mb-8"
        >
          <div className="p-2">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'overview', label: 'Visão Geral', icon: <User className="h-4 w-4" /> },
                { id: 'orders', label: 'Pedidos', icon: <Package className="h-4 w-4" /> },
                { id: 'favorites', label: 'Favoritos', icon: <Heart className="h-4 w-4" /> },
                { id: 'settings', label: 'Configurações', icon: <Settings className="h-4 w-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-uss-primary text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Recent Orders */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Pedidos Recentes
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-uss-primary hover:text-uss-primary-dark font-semibold flex items-center gap-2"
                  >
                    Ver todos
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {mockOrders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-uss-primary/10 rounded-xl flex items-center justify-center">
                          <Package className="h-5 w-5 text-uss-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            Pedido #{order.id}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {formatDate(order.date)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                        <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">
                          {formatPrice(order.total)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Account Info */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Informações da Conta
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{user.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Telefone</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{user.phone}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Endereço</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {user.address.street}, {user.address.city} - {user.address.state}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Membro desde</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{formatDate(user.joinDate)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Todos os Pedidos
              </h3>
              
              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div key={order.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-uss-primary/10 rounded-xl flex items-center justify-center">
                          <Package className="h-6 w-6 text-uss-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            Pedido #{order.id}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {formatDate(order.date)} • {order.items} itens
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                        <p className="font-bold text-gray-900 dark:text-white">
                          {formatPrice(order.total)}
                        </p>
                        <button className="text-uss-primary hover:text-uss-primary-dark font-semibold">
                          Ver detalhes
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Produtos Favoritos
              </h3>
              
              <div className="text-center py-12">
                <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Você ainda não tem produtos favoritos
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-uss-primary text-white rounded-xl font-semibold hover:bg-uss-primary-dark transition-colors"
                >
                  Explorar Produtos
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Configurações da Conta
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Notificações</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Receber atualizações por email</p>
                      </div>
                    </div>
                    <button className="w-12 h-6 bg-uss-primary rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Autenticação em dois fatores</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Adicione uma camada extra de segurança</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 border border-uss-primary text-uss-primary rounded-lg hover:bg-uss-primary hover:text-white transition-colors">
                      Configurar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
