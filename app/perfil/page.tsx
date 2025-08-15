'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  UserIcon,
  CogIcon,
  ShoppingBagIcon,
  HeartIcon,
  BellIcon,
  ShieldCheckIcon,
  MapPinIcon,
  CreditCardIcon,
  ArrowRightIcon,
  PencilIcon
} from '@heroicons/react/24/outline'

// Mock user data
const userData = {
  name: 'João Silva',
  email: 'joao.silva@email.com',
  phone: '(11) 99999-9999',
  avatar: '/api/placeholder/100/100',
  memberSince: '2023',
  totalOrders: 12,
  totalSpent: 4599.90,
  vipStatus: false
}

const menuItems = [
  {
    icon: ShoppingBagIcon,
    title: 'Meus Pedidos',
    description: 'Acompanhe seus pedidos e histórico',
    href: '/orders',
    count: userData.totalOrders
  },
  {
    icon: HeartIcon,
    title: 'Lista de Favoritos',
    description: 'Produtos que você salvou',
    href: '/favoritos',
    count: 0
  },
  {
    icon: MapPinIcon,
    title: 'Endereços',
    description: 'Gerencie seus endereços de entrega',
    href: '/addresses'
  },
  {
    icon: CreditCardIcon,
    title: 'Cartões e Pagamento',
    description: 'Métodos de pagamento salvos',
    href: '/payment-methods'
  },
  {
    icon: BellIcon,
    title: 'Notificações',
    description: 'Configurações de notificações',
    href: '/notifications'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Segurança',
    description: 'Senha e autenticação',
    href: '/security'
  },
  {
    icon: CogIcon,
    title: 'Configurações',
    description: 'Preferências da conta',
    href: '/settings'
  }
]

export default function PerfilPage() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#1ea7ff] to-[#00CED1] flex items-center justify-center">
                    <UserIcon className="w-10 h-10 text-white" />
                  </div>
                  {userData.vipStatus && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">VIP</span>
                    </div>
                  )}
                </div>

                {/* User Info */}
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    {userData.name}
                  </h1>
                  <p className="text-gray-600 mb-2">{userData.email}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Cliente desde {userData.memberSince}</span>
                    <span>•</span>
                    <span>{userData.totalOrders} pedidos realizados</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-[#1ea7ff] hover:bg-gray-50 rounded-lg transition-colors"
              >
                <PencilIcon className="w-5 h-5 mr-2" />
                Editar Perfil
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-6 pt-6 border-t">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{userData.totalOrders}</p>
                <p className="text-sm text-gray-600">Pedidos</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">
                  R$ {userData.totalSpent.toFixed(2).replace('.', ',')}
                </p>
                <p className="text-sm text-gray-600">Total Gasto</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">Ativo</p>
                <p className="text-sm text-gray-600">Status</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* VIP Upgrade Banner */}
        {!userData.vipStatus && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-[#1ea7ff] to-[#00CED1] rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2">Torne-se VIP</h2>
                  <p className="text-blue-100 mb-4">
                    Acesso exclusivo a produtos premium, frete grátis e muito mais!
                  </p>
                </div>
                <Link
                  href="/vip"
                  className="px-6 py-3 bg-white text-[#1ea7ff] font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Saiba Mais
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Link
                href={item.href}
                className="block bg-white rounded-xl shadow-sm p-6 hover:shadow-lg hover:border-[#1ea7ff] border border-transparent transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-[#1ea7ff] group-hover:text-white transition-colors">
                    <item.icon className="w-6 h-6" />
                  </div>
                  
                  {item.count !== undefined && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm font-semibold">
                      {item.count}
                    </span>
                  )}
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#1ea7ff] transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  {item.description}
                </p>
                
                <div className="flex items-center text-gray-400 group-hover:text-[#1ea7ff] transition-colors">
                  <span className="text-sm">Acessar</span>
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-white rounded-xl shadow-sm p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/orders"
              className="flex flex-col items-center p-4 text-center hover:bg-gray-50 rounded-lg transition-colors"
            >
              <ShoppingBagIcon className="w-8 h-8 text-[#1ea7ff] mb-2" />
              <span className="text-sm font-medium">Pedidos</span>
            </Link>
            
            <Link
              href="/favoritos"
              className="flex flex-col items-center p-4 text-center hover:bg-gray-50 rounded-lg transition-colors"
            >
              <HeartIcon className="w-8 h-8 text-[#1ea7ff] mb-2" />
              <span className="text-sm font-medium">Favoritos</span>
            </Link>
            
            <Link
              href="/addresses"
              className="flex flex-col items-center p-4 text-center hover:bg-gray-50 rounded-lg transition-colors"
            >
              <MapPinIcon className="w-8 h-8 text-[#1ea7ff] mb-2" />
              <span className="text-sm font-medium">Endereços</span>
            </Link>
            
            <Link
              href="/security"
              className="flex flex-col items-center p-4 text-center hover:bg-gray-50 rounded-lg transition-colors"
            >
              <ShieldCheckIcon className="w-8 h-8 text-[#1ea7ff] mb-2" />
              <span className="text-sm font-medium">Segurança</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
