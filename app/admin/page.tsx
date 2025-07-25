'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown,
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign,
  ArrowUpRight,
  Eye,
  BarChart3,
  Activity,
  Calendar,
  Download,
  Bell,
  Plus,
  FileText,
  Settings
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAPI } from '@/hooks/use-api'
import AdminLayout from '@/components/admin-layout'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell
} from 'recharts'
import { toast } from 'sonner'

interface AnalyticsData {
  totalRevenue: number
  totalOrders: number
  totalCustomers: number
  totalProducts: number
  avgTicket: number
  revenueGrowth: number
  ordersGrowth: number
  customersGrowth: number
  conversionRate: number
  topProducts: Array<{
    name: string
    sales: number
    revenue: number
  }>
  salesByPeriod: Array<{
    period: string
    sales: number
    orders: number
  }>
  salesByStatus: Array<{
    status: string
    count: number
    percentage: number
    color: string
  }>
}

export default function AdminDashboard() {
  const { data: products } = useAPI<any>('products')
  const { data: orders } = useAPI<any>('orders')
  const { data: customers } = useAPI<any>('customers')
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('7d')

  useEffect(() => {
    if (products.length && orders.length && customers.length) {
      calculateAnalytics()
    }
  }, [products, orders, customers, selectedPeriod])

  const calculateAnalytics = () => {
    // Calcular métricas principais
    const totalRevenue = orders.reduce((sum: number, order: any) => sum + order.total, 0)
    const totalOrders = orders.length
    const totalCustomers = customers.length
    const totalProducts = products.length
    const avgTicket = totalRevenue / totalOrders

    // Simular crescimento (em produção, seria calculado com dados históricos)
    const revenueGrowth = 12.5
    const ordersGrowth = 8.3
    const customersGrowth = 15.2
    const conversionRate = 3.2

    // Top produtos
    const topProducts = products
      .sort((a: any, b: any) => b.sales - a.sales)
      .slice(0, 5)
      .map((product: any) => ({
        name: product.name,
        sales: product.sales,
        revenue: product.sales * product.price
      }))

    // Dados de vendas por período (simulado)
    const salesByPeriod = [
      { period: 'Seg', sales: 12000, orders: 24 },
      { period: 'Ter', sales: 19000, orders: 38 },
      { period: 'Qua', sales: 15000, orders: 30 },
      { period: 'Qui', sales: 22000, orders: 44 },
      { period: 'Sex', sales: 28000, orders: 56 },
      { period: 'Sáb', sales: 35000, orders: 70 },
      { period: 'Dom', sales: 18000, orders: 36 }
    ]

    // Status dos pedidos
    const statusCounts = orders.reduce((acc: any, order: any) => {
      acc[order.status] = (acc[order.status] || 0) + 1
      return acc
    }, {})

    const colors = {
      delivered: '#10B981',
      shipped: '#3B82F6',
      pending: '#F59E0B',
      cancelled: '#EF4444'
    }

    const salesByStatus = Object.entries(statusCounts).map(([status, count]: [string, any]) => ({
      status,
      count,
      percentage: (count / totalOrders) * 100,
      color: colors[status as keyof typeof colors] || '#6B7280'
    }))

    setAnalytics({
      totalRevenue,
      totalOrders,
      totalCustomers,
      totalProducts,
      avgTicket,
      revenueGrowth,
      ordersGrowth,
      customersGrowth,
      conversionRate,
      topProducts,
      salesByPeriod,
      salesByStatus
    })
    setLoading(false)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const exportReport = () => {
    toast.success('Relatório exportado com sucesso!', {
      description: 'O arquivo foi baixado para sua pasta de downloads.',
    })
  }

  const springTransition = { type: "spring" as const, stiffness: 300, damping: 30 }
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: springTransition }
  }

  if (loading || !analytics) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
          <div className="text-center">
            <Activity className="h-12 w-12 mx-auto mb-4 text-[#00CED1] animate-pulse" />
            <p className="text-gray-600">Carregando dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 sm:p-6 lg:p-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-8xl mx-auto">
          {/* Header */}
          <motion.header variants={itemVariants} className="mb-8">
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent tracking-tight">
                  Dashboard
                </h1>
                <p className="text-gray-600 mt-1">
                  Visão geral da sua loja - Uss Brasil
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline"
                  className="rounded-xl"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Últimos 7 dias
                </Button>
                <Button 
                  className="bg-gradient-to-r from-[#00CED1] to-[#20B2AA] text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition-transform"
                  onClick={exportReport}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Exportar
                </Button>
              </div>
            </div>
          </motion.header>

          {/* Métricas Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div variants={itemVariants}>
              <Card className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Receita Total</p>
                      <p className="text-2xl font-bold text-gray-900">{formatCurrency(analytics.totalRevenue)}</p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="h-4 w-4 text-emerald-500 mr-1" />
                        <span className="text-sm text-emerald-600">+{analytics.revenueGrowth}%</span>
                        <span className="text-xs text-gray-500 ml-1">vs mês anterior</span>
                      </div>
                    </div>
                    <div className="p-3 bg-emerald-100 rounded-full">
                      <DollarSign className="h-6 w-6 text-emerald-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total de Pedidos</p>
                      <p className="text-2xl font-bold text-gray-900">{analytics.totalOrders}</p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="h-4 w-4 text-blue-500 mr-1" />
                        <span className="text-sm text-blue-600">+{analytics.ordersGrowth}%</span>
                        <span className="text-xs text-gray-500 ml-1">vs mês anterior</span>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                      <ShoppingCart className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total de Clientes</p>
                      <p className="text-2xl font-bold text-gray-900">{analytics.totalCustomers}</p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="h-4 w-4 text-purple-500 mr-1" />
                        <span className="text-sm text-purple-600">+{analytics.customersGrowth}%</span>
                        <span className="text-xs text-gray-500 ml-1">vs mês anterior</span>
                      </div>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-full">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Ticket Médio</p>
                      <p className="text-2xl font-bold text-gray-900">{formatCurrency(analytics.avgTicket)}</p>
                      <div className="flex items-center mt-2">
                        <Package className="h-4 w-4 text-orange-500 mr-1" />
                        <span className="text-sm text-orange-600">{analytics.conversionRate}%</span>
                        <span className="text-xs text-gray-500 ml-1">taxa conversão</span>
                      </div>
                    </div>
                    <div className="p-3 bg-orange-100 rounded-full">
                      <BarChart3 className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Gráficos e Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Gráfico de Vendas */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5 text-[#00CED1]" />
                    Vendas por Período
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={analytics.salesByPeriod}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="period" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            border: 'none',
                            borderRadius: '12px',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="sales" 
                          stroke="#00CED1" 
                          strokeWidth={3}
                          dot={{ fill: '#00CED1', strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Status dos Pedidos */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="mr-2 h-5 w-5 text-[#00CED1]" />
                    Status dos Pedidos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            border: 'none',
                            borderRadius: '12px',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <RechartsPieChart data={analytics.salesByStatus} cx="50%" cy="50%" outerRadius={80} dataKey="count">
                          {analytics.salesByStatus.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </RechartsPieChart>
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 space-y-2">
                    {analytics.salesByStatus.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="capitalize text-gray-700">{item.status}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-gray-900">{item.count}</span>
                          <span className="text-sm text-gray-500 ml-1">({item.percentage.toFixed(1)}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Top Produtos */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Package className="mr-2 h-5 w-5 text-[#00CED1]" />
                    Top Produtos
                  </div>
                  <Link href="/admin/products" className="text-sm text-[#00CED1] hover:underline">
                    Ver todos
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded-lg hover:bg-white/70 transition-all duration-200">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-[#00CED1] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.sales} vendas</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#00CED1]">{formatCurrency(product.revenue)}</p>
                        <Badge variant="secondary" className="text-xs">
                          Destaque
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Ações Rápidas */}
          <motion.div variants={itemVariants} className="mt-8">
            <Card className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20">
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Novo Produto', href: '/admin/products', icon: Plus, color: 'bg-blue-500' },
                    { label: 'Ver Pedidos', href: '/admin/orders', icon: ShoppingCart, color: 'bg-green-500' },
                    { label: 'Relatórios', href: '/admin/analytics', icon: FileText, color: 'bg-purple-500' },
                    { label: 'Configurações', href: '/admin/settings', icon: Settings, color: 'bg-gray-500' }
                  ].map((action, index) => (
                    <Link key={index} href={action.href}>
                      <div className="flex flex-col items-center p-4 rounded-lg hover:bg-white/50 transition-all duration-200 cursor-pointer">
                        <div className={`p-3 rounded-full ${action.color} mb-2`}>
                          <action.icon className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{action.label}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </AdminLayout>
  )
}

