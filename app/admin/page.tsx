'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign,
  ArrowUpRight,
  Calendar,
  MoreHorizontal,
  Eye,
  Plus,
  FileText,
  Settings
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import AdminLayout from '@/components/admin-layout'

interface DashboardStats {
  totalSales: number
  totalOrders: number
  totalCustomers: number
  totalProducts: number
  salesGrowth: number
  ordersGrowth: number
  customersGrowth: number
  productsGrowth: number
}

interface RecentSale {
  id: number
  customer: string
  email: string
  amount: number
  status: 'completed' | 'pending' | 'processing'
}

interface PopularProduct {
  id: number
  name: string
  sales: number
  progress: number
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats>({
    totalSales: 159999.95,
    totalOrders: 27,
    totalCustomers: 156,
    totalProducts: 45,
    salesGrowth: 12.5,
    ordersGrowth: 8.2,
    customersGrowth: 15.3,
    productsGrowth: 2.1
  })

  const recentSales: RecentSale[] = [
    { id: 1, customer: 'João Silva', email: 'joao@email.com', amount: 2599.99, status: 'completed' },
    { id: 2, customer: 'Maria Santos', email: 'maria@email.com', amount: 1299.90, status: 'processing' },
    { id: 3, customer: 'Pedro Costa', email: 'pedro@email.com', amount: 899.99, status: 'pending' },
    { id: 4, customer: 'Ana Lima', email: 'ana@email.com', amount: 3499.99, status: 'completed' },
    { id: 5, customer: 'Carlos Rocha', email: 'carlos@email.com', amount: 1599.90, status: 'completed' }
  ]

  const popularProducts: PopularProduct[] = [
    { id: 1, name: 'iPhone 16 Pro', sales: 23, progress: 85 },
    { id: 2, name: 'MacBook Pro M3', sales: 18, progress: 72 },
    { id: 3, name: 'iPad Pro', sales: 15, progress: 65 },
    { id: 4, name: 'Apple Watch Series 10', sales: 12, progress: 58 },
    { id: 5, name: 'AirPods Pro 2', sales: 8, progress: 42 }
  ]

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000)
  }, [])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluído'
      case 'processing': return 'Processando'
      case 'pending': return 'Pendente'
      default: return status
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00CED1]"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1 text-sm lg:text-base">Bem-vindo de volta! Aqui está o resumo da UssBrasil.</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="border-gray-300 hover:bg-gray-50 transition-colors">
              <Calendar className="h-4 w-4 mr-2" />
              Hoje
            </Button>
            <Button className="bg-gradient-to-r from-[#00CED1] to-[#20B2AA] hover:from-[#20B2AA] hover:to-[#00CED1] text-white shadow-lg hover:shadow-xl transition-all">
              <TrendingUp className="h-4 w-4 mr-2" />
              Relatório
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total de Vendas</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(stats.totalSales)}</h3>
                    <div className="flex items-center mt-2">
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600 font-medium">+{stats.salesGrowth}%</span>
                      <span className="text-sm text-gray-500 ml-1">vs mês anterior</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-[#00CED1] to-[#20B2AA] rounded-xl flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pedidos</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.totalOrders}</h3>
                    <div className="flex items-center mt-2">
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600 font-medium">+{stats.ordersGrowth}%</span>
                      <span className="text-sm text-gray-500 ml-1">vs mês anterior</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <ShoppingCart className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Clientes</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.totalCustomers}</h3>
                    <div className="flex items-center mt-2">
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600 font-medium">+{stats.customersGrowth}%</span>
                      <span className="text-sm text-gray-500 ml-1">vs mês anterior</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Produtos</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.totalProducts}</h3>
                    <div className="flex items-center mt-2">
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600 font-medium">+{stats.productsGrowth}%</span>
                      <span className="text-sm text-gray-500 ml-1">vs mês anterior</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts and Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Sales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-900">Vendas Recentes</CardTitle>
                  <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="space-y-4">
                  {recentSales.map((sale) => (
                    <div key={sale.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${sale.customer}`} />
                          <AvatarFallback className="bg-gradient-to-r from-[#00CED1] to-[#20B2AA] text-white">
                            {sale.customer.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{sale.customer}</p>
                          <p className="text-sm text-gray-500">{sale.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{formatCurrency(sale.amount)}</p>
                        <Badge className={`text-xs border ${getStatusColor(sale.status)}`}>
                          {getStatusText(sale.status)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Popular Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-900">Produtos Populares</CardTitle>
                  <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="space-y-4">
                  {popularProducts.map((product) => (
                    <div key={product.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{product.name}</span>
                        <span className="text-sm text-gray-600">{product.sales} vendas</span>
                      </div>
                      <Progress value={product.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <Card className="border-0 shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/admin/products">
                  <Button
                    variant="outline"
                    className="h-20 w-full flex flex-col space-y-2 border-2 border-[#00CED1] hover:bg-[#00CED1] hover:text-white transition-all group"
                  >
                    <Plus className="h-6 w-6 text-[#00CED1] group-hover:text-white" />
                    <span className="text-sm font-medium">Adicionar Produto</span>
                  </Button>
                </Link>
                <Link href="/admin/orders">
                  <Button
                    variant="outline"
                    className="h-20 w-full flex flex-col space-y-2 border-2 border-blue-500 hover:bg-blue-500 hover:text-white transition-all group"
                  >
                    <Eye className="h-6 w-6 text-blue-500 group-hover:text-white" />
                    <span className="text-sm font-medium">Ver Pedidos</span>
                  </Button>
                </Link>
                <Link href="/admin/customers">
                  <Button
                    variant="outline"
                    className="h-20 w-full flex flex-col space-y-2 border-2 border-purple-500 hover:bg-purple-500 hover:text-white transition-all group"
                  >
                    <Users className="h-6 w-6 text-purple-500 group-hover:text-white" />
                    <span className="text-sm font-medium">Gerenciar Clientes</span>
                  </Button>
                </Link>
                <Link href="/admin/settings">
                  <Button
                    variant="outline"
                    className="h-20 w-full flex flex-col space-y-2 border-2 border-gray-500 hover:bg-gray-500 hover:text-white transition-all group"
                  >
                    <Settings className="h-6 w-6 text-gray-500 group-hover:text-white" />
                    <span className="text-sm font-medium">Configurações</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  )
}
