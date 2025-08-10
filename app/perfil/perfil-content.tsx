"use client"
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  User, Heart, ShoppingBag, Package, Settings, LogOut, 
  Edit, Camera, Mail, Phone, MapPin, Calendar,
  ArrowRight, CreditCard, Shield, Bell
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'

export default function PerfilPage() {
  const searchParams = useSearchParams()
  const { user, logout, favorites, orders } = useAuth()
  const { cartItems, cartTotal } = useCart()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  // Ler parâmetro da URL para definir aba ativa
  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab && ['overview', 'orders', 'favorites', 'settings'].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-uss-primary-50 to-uss-secondary-50 dark:from-uss-gray-800 dark:to-uss-gray-700 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12"
            >
              <User className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-uss-gray-800 dark:text-white mb-4">
                Acesso necessário
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Faça login para acessar seu perfil
              </p>
              <Link
                href="/produtos"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-uss-primary to-uss-secondary text-white px-8 py-3 rounded-lg font-semibold hover:from-uss-primary-dark hover:to-uss-secondary-dark transition-all"
              >
                Explorar Produtos
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  const handleLogout = async () => {
    await logout()
    toast.success('Logout realizado com sucesso')
    router.push('/')
  }

  const stats = [
    {
      title: 'Favoritos',
      value: favorites.length,
      icon: Heart,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100 dark:bg-pink-900/30',
      href: '/favoritos'
    },
    {
      title: 'Carrinho',
      value: cartItems.length,
      icon: ShoppingBag,
      color: 'text-uss-primary',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      href: '/carrinho'
    },
    {
      title: 'Pedidos',
      value: orders.length,
      icon: Package,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      href: '/pedidos'
    }
  ]

  const menuItems = [
    { id: 'overview', title: 'Visão Geral', icon: User },
    { id: 'orders', title: 'Meus Pedidos', icon: Package },
    { id: 'favorites', title: 'Favoritos', icon: Heart },
    { id: 'settings', title: 'Configurações', icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-uss-primary-50 to-uss-secondary-50 dark:from-uss-gray-800 dark:to-uss-gray-700 py-12">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-uss-primary to-uss-secondary p-6 text-white">
                <div className="relative">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name}
                        width={80}
                        height={80}
                        className="rounded-full"
                      />
                    ) : (
                      <User className="w-10 h-10" />
                    )}
                  </div>
                  <button className="absolute top-0 right-0 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-center mb-1">{user.name}</h2>
                <p className="text-blue-100 text-center text-sm">{user.email}</p>
              </div>

              {/* Navigation */}
              <div className="p-6">
                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === item.id
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.title}
                    </button>
                  ))}
                </nav>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors mt-6"
                >
                  <LogOut className="w-5 h-5" />
                  Sair
                </button>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3"
          >
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Welcome */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Bem-vindo de volta, {user.name.split(' ')[0]}! 👋
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Aqui está um resumo da sua conta USS Brasil
                  </p>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-6">
                  {stats.map((stat) => (
                    <Link
                      key={stat.title}
                      href={stat.href}
                      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all group"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                          <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {stat.value}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">{stat.title}</p>
                    </Link>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Ações Rápidas
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Link
                      href="/carrinho"
                      className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <ShoppingBag className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Finalizar Compra</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {cartItems.length > 0 ? `R$ ${cartTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : 'Carrinho vazio'}
                        </p>
                      </div>
                    </Link>
                    <Link
                      href="/favoritos"
                      className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Heart className="w-5 h-5 text-pink-600" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Meus Favoritos</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {favorites.length} {favorites.length === 1 ? 'item' : 'itens'}
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Account Info */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Informações da Conta
                    </h2>
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      Editar
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                        <p className="font-medium text-gray-900 dark:text-white">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Membro desde</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Meus Pedidos
                </h2>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      Você ainda não fez nenhum pedido
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            Pedido #{order.id.slice(0, 8)}
                          </h3>
                          <span className={`px-2 py-1 rounded text-sm font-medium ${
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status === 'pending' ? 'Pendente' : 
                             order.status === 'confirmed' ? 'Confirmado' : order.status}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                          {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                        <p className="font-bold text-blue-600">
                          R$ {order.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Meus Favoritos
                  </h2>
                  <Link
                    href="/favoritos"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Ver todos
                  </Link>
                </div>
                {favorites.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      Você ainda não tem produtos favoritos
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">
                    Você tem {favorites.length} {favorites.length === 1 ? 'produto' : 'produtos'} favoritos.
                    <Link href="/favoritos" className="text-blue-600 hover:text-blue-700 ml-1">
                      Ver lista completa →
                    </Link>
                  </p>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Configurações da Conta
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Notificações</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Receber notificações por email</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Autenticação de dois fatores</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Adicionar uma camada extra de segurança</p>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
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
    </div>
  )
}
