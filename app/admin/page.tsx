'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown,
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign,
  Eye,
  Target,
  Zap,
  Clock,
  Star,
  ArrowRight,
  Download,
  Calendar,
  MoreVertical
} from 'lucide-react'

interface DashboardStats {
  totalRevenue: number
  monthlyGrowth: number
  totalOrders: number
  ordersGrowth: number
  totalCustomers: number
  customersGrowth: number
  totalProducts: number
  conversionRate: number
  avgOrderValue: number
  returnRate: number
}

interface SalesData {
  day: string
  sales: number
  orders: number
  visitors: number
}

interface TopProduct {
  id: string
  name: string
  category: string
  sales: number
  revenue: number
  growth: number
  image: string
}

interface RecentOrder {
  id: string
  customer: string
  product: string
  amount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  date: string
}

interface RecentActivity {
  id: string
  type: 'order' | 'product' | 'customer' | 'review'
  message: string
  time: string
  icon: any
  color: string
}

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [loading, setLoading] = useState(true)

  // Mock data
  const [stats] = useState<DashboardStats>({
    totalRevenue: 1247580.50,
    monthlyGrowth: 23.5,
    totalOrders: 2847,
    ordersGrowth: 12.8,
    totalCustomers: 1563,
    customersGrowth: 18.2,
    totalProducts: 342,
    conversionRate: 3.8,
    avgOrderValue: 438.25,
    returnRate: 2.1
  })

  const [salesData] = useState<SalesData[]>([
    { day: 'Seg', sales: 125000, orders: 285, visitors: 7500 },
    { day: 'Ter', sales: 168000, orders: 384, visitors: 8200 },
    { day: 'Qua', sales: 142000, orders: 324, visitors: 7800 },
    { day: 'Qui', sales: 195000, orders: 445, visitors: 9100 },
    { day: 'Sex', sales: 228000, orders: 520, visitors: 10500 },
    { day: 'Sáb', sales: 275000, orders: 628, visitors: 12200 },
    { day: 'Dom', sales: 158000, orders: 361, visitors: 8800 }
  ])

  const [topProducts] = useState<TopProduct[]>([
    {
      id: '1',
      name: 'iPhone 15 Pro Max 256GB',
      category: 'Smartphones',
      sales: 127,
      revenue: 152400,
      growth: 15.2,
      image: '/Produtos/Apple/Iphone 16 Pro.png'
    },
    {
      id: '2',
      name: 'MacBook Air M3 13" 512GB',
      category: 'Laptops',
      sales: 89,
      revenue: 142240,
      growth: 8.7,
      image: '/fallback-product.png'
    },
    {
      id: '3',
      name: 'Samsung Galaxy S24 Ultra',
      category: 'Smartphones',
      sales: 156,
      revenue: 187200,
      growth: 22.4,
      image: '/fallback-product.png'
    },
    {
      id: '4',
      name: 'AirPods Pro 3ª Geração',
      category: 'Áudio',
      sales: 234,
      revenue: 58500,
      growth: 31.8,
      image: '/fallback-product.png'
    }
  ])

  const [recentOrders] = useState<RecentOrder[]>([
    {
      id: '#12847',
      customer: 'Ana Carolina Silva',
      product: 'iPhone 15 Pro Max',
      amount: 8999.99,
      status: 'processing',
      date: '2024-01-15'
    },
    {
      id: '#12846',
      customer: 'Roberto Santos',
      product: 'MacBook Air M3',
      amount: 12999.99,
      status: 'shipped',
      date: '2024-01-15'
    },
    {
      id: '#12845',
      customer: 'Maria Oliveira',
      product: 'AirPods Pro',
      amount: 2499.99,
      status: 'delivered',
      date: '2024-01-14'
    },
    {
      id: '#12844',
      customer: 'João Pereira',
      product: 'Galaxy S24 Ultra',
      amount: 6999.99,
      status: 'pending',
      date: '2024-01-14'
    }
  ])

  const [recentActivity] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'order',
      message: 'Novo pedido #12847 recebido',
      time: '2 min atrás',
      icon: ShoppingCart,
      color: 'text-blue-500'
    },
    {
      id: '2',
      type: 'product',
      message: 'iPhone 15 Pro adicionado ao catálogo',
      time: '15 min atrás',
      icon: Package,
      color: 'text-green-500'
    },
    {
      id: '3',
      type: 'customer',
      message: 'Novo cliente cadastrado',
      time: '1h atrás',
      icon: Users,
      color: 'text-purple-500'
    },
    {
      id: '4',
      type: 'review',
      message: 'Avaliação 5★ recebida',
      time: '2h atrás',
      icon: Star,
      color: 'text-yellow-500'
    }
  ])

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-amber-100 text-amber-800 border-amber-200',
      processing: 'bg-blue-100 text-blue-800 border-blue-200',
      shipped: 'bg-purple-100 text-purple-800 border-purple-200',
      delivered: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    }
    return colors[status as keyof typeof colors] || colors.pending
  }

  const getStatusText = (status: string) => {
    const texts = {
      pending: 'Pendente',
      processing: 'Processando',
      shipped: 'Enviado',
      delivered: 'Entregue',
      cancelled: 'Cancelado'
    }
    return texts[status as keyof typeof texts] || status
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-[#0E7466] border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-white text-xl">Carregando Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 lg:space-y-6 p-4 lg:p-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {[
          {
            title: 'Receita Total',
            value: formatCurrency(stats.totalRevenue),
            growth: `+${stats.monthlyGrowth}%`,
            positive: true,
            icon: DollarSign,
            color: 'from-emerald-500 to-emerald-600',
            bgColor: 'bg-emerald-500/10'
          },
          {
            title: 'Total de Pedidos',
            value: stats.totalOrders.toLocaleString(),
            growth: `+${stats.ordersGrowth}%`,
            positive: true,
            icon: ShoppingCart,
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-500/10'
          },
          {
            title: 'Clientes Ativos',
            value: stats.totalCustomers.toLocaleString(),
            growth: `+${stats.customersGrowth}%`,
            positive: true,
            icon: Users,
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-500/10'
          },
          {
            title: 'Taxa de Conversão',
            value: `${stats.conversionRate}%`,
            growth: `+0.8%`,
            positive: true,
            icon: Target,
            color: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-500/10'
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl lg:rounded-3xl p-4 lg:p-6 hover:bg-white/15 transition-all"
          >
            <div className="flex items-center justify-between mb-3 lg:mb-4">
              <div className={`p-2 lg:p-3 rounded-xl lg:rounded-2xl ${stat.bgColor}`}>
                <stat.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                stat.positive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {stat.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                <span>{stat.growth}</span>
              </div>
            </div>
            <h3 className="text-gray-300 text-xs lg:text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-2xl lg:text-3xl font-bold text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Sales Chart */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="lg:col-span-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 lg:p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 lg:mb-6 space-y-2 sm:space-y-0">
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-white">Vendas da Semana</h3>
              <p className="text-gray-300 text-xs lg:text-sm">Comparação com semana anterior</p>
            </div>
            <div className="flex items-center space-x-2">
              <select className="bg-white/10 border border-white/20 rounded-lg px-2 lg:px-3 py-1 text-white text-xs lg:text-sm focus:outline-none focus:ring-2 focus:ring-[#0E7466]">
                <option value="7d">7 dias</option>
                <option value="30d">30 dias</option>
                <option value="90d">90 dias</option>
              </select>
              <button className="p-1 lg:p-2 hover:bg-white/10 rounded-lg text-gray-300">
                <MoreVertical className="w-3 h-3 lg:w-4 lg:h-4" />
              </button>
            </div>
          </div>
          
          <div className="space-y-3 lg:space-y-4">
            {salesData.map((day, index) => {
              const maxSales = Math.max(...salesData.map(d => d.sales))
              const percentage = (day.sales / maxSales) * 100
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 lg:space-x-4 min-w-0 flex-1">
                    <span className="text-gray-300 font-medium w-6 lg:w-8 text-xs lg:text-sm">{day.day}</span>
                    <div className="flex-1 max-w-[180px] lg:max-w-sm">
                      <div className="bg-white/20 rounded-full h-2 lg:h-3 relative overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ delay: index * 0.1, duration: 0.8 }}
                          className="bg-gradient-to-r from-[#0E7466] to-[#0C6157] h-full rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-right min-w-0">
                    <p className="text-white font-bold text-xs lg:text-sm">{formatCurrency(day.sales)}</p>
                    <p className="text-gray-400 text-xs">{day.orders} pedidos</p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 lg:p-6"
        >
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <h3 className="text-lg lg:text-xl font-bold text-white">Atividade Recente</h3>
            <button className="text-[#0E7466] text-xs lg:text-sm font-medium hover:text-[#0C6157]">
              Ver todas
            </button>
          </div>
          
          <div className="space-y-3 lg:space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center space-x-2 lg:space-x-3 p-2 lg:p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all"
              >
                <div className={`p-1.5 lg:p-2 rounded-xl bg-white/10 ${activity.color}`}>
                  <activity.icon className="w-3 h-3 lg:w-4 lg:h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs lg:text-sm font-medium truncate">{activity.message}</p>
                  <p className="text-gray-400 text-xs">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Products and Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Top Products */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 lg:p-6"
        >
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <h3 className="text-lg lg:text-xl font-bold text-white">Produtos em Destaque</h3>
            <button className="text-[#0E7466] text-xs lg:text-sm font-medium hover:text-[#0C6157] flex items-center space-x-1">
              <span>Ver todos</span>
              <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4" />
            </button>
          </div>
          
          <div className="space-y-3 lg:space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center space-x-3 lg:space-x-4 p-3 lg:p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all">
                <div className="w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-br from-[#0E7466] to-[#0C6157] rounded-xl flex items-center justify-center text-white font-bold text-xs lg:text-sm">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium text-xs lg:text-sm truncate">{product.name}</h4>
                  <p className="text-gray-400 text-xs">{product.category} • {product.sales} vendas</p>
                </div>
                <div className="text-right">
                  <p className="text-[#0E7466] font-bold text-xs lg:text-sm">{formatCurrency(product.revenue)}</p>
                  <p className="text-emerald-400 text-xs">+{product.growth}%</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 lg:p-6"
        >
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <h3 className="text-lg lg:text-xl font-bold text-white">Pedidos Recentes</h3>
            <button className="text-[#0E7466] text-xs lg:text-sm font-medium hover:text-[#0C6157] flex items-center space-x-1">
              <span>Ver todos</span>
              <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4" />
            </button>
          </div>
          
          <div className="space-y-3 lg:space-y-4">
            {recentOrders.map((order, index) => (
              <div key={index} className="p-3 lg:p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#0E7466] font-medium text-xs lg:text-sm">{order.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
                <p className="text-white font-medium text-xs lg:text-sm truncate">{order.customer}</p>
                <p className="text-gray-400 text-xs mb-2 truncate">{order.product}</p>
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold text-xs lg:text-sm">{formatCurrency(order.amount)}</span>
                  <span className="text-gray-400 text-xs">{new Date(order.date).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 lg:p-6"
      >
        <h3 className="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6">Ações Rápidas</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
          {[
            { icon: Package, label: 'Novo Produto', href: '/admin/products/new', color: 'from-blue-500 to-blue-600' },
            { icon: ShoppingCart, label: 'Ver Pedidos', href: '/admin/orders', color: 'from-green-500 to-green-600' },
            { icon: Users, label: 'Clientes', href: '/admin/customers', color: 'from-purple-500 to-purple-600' },
            { icon: Download, label: 'Exportar', href: '#', color: 'from-orange-500 to-orange-600' }
          ].map((action, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center p-3 lg:p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group"
            >
              <div className={`p-2 lg:p-4 rounded-2xl bg-gradient-to-r ${action.color} mb-2 lg:mb-3 group-hover:scale-110 transition-transform`}>
                <action.icon className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
              </div>
              <span className="text-white font-medium text-xs lg:text-sm text-center">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
