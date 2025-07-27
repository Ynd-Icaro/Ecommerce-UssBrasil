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
import { useProductDatabase } from '@/lib/use-products-database'
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
  productsGrowth: number
}

interface SalesData {
  month: string
  revenue: number
  orders: number
}

interface CategoryData {
  name: string
  value: number
  color: string
}

interface TopProduct {
  id: string
  name: string
  sales: number
  revenue: number
  image: string
}

const COLORS = ['#00CED1', '#20B2AA', '#48CAE4', '#0096C7', '#023E8A']

export default function AdminPage() {
  const database = useProductDatabase()
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    avgTicket: 0,
    revenueGrowth: 0,
    ordersGrowth: 0,
    customersGrowth: 0,
    productsGrowth: 0
  })

  const [salesData, setSalesData] = useState<SalesData[]>([])
  const [categoryData, setCategoryData] = useState<CategoryData[]>([])
  const [topProducts, setTopProducts] = useState<TopProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      
      // Simular delay de carregamento
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const products = database.getAllProducts()
      
      // Dados de exemplo baseados nos produtos
      const mockAnalytics: AnalyticsData = {
        totalRevenue: 2456780.50,
        totalOrders: 1247,
        totalCustomers: 3891,
        totalProducts: products.length,
        avgTicket: 1969.25,
        revenueGrowth: 12.5,
        ordersGrowth: 8.3,
        customersGrowth: 15.7,
        productsGrowth: 4.2
      }

      const mockSalesData: SalesData[] = [
        { month: 'Jan', revenue: 185000, orders: 94 },
        { month: 'Fev', revenue: 205000, orders: 104 },
        { month: 'Mar', revenue: 275000, orders: 140 },
        { month: 'Abr', revenue: 295000, orders: 150 },
        { month: 'Mai', revenue: 315000, orders: 160 },
        { month: 'Jun', revenue: 385000, orders: 195 },
      ]

      const mockCategoryData: CategoryData[] = [
        { name: 'Smartphones', value: 45, color: COLORS[0] },
        { name: 'Laptops', value: 25, color: COLORS[1] },
        { name: 'Tablets', value: 15, color: COLORS[2] },
        { name: 'Smartwatches', value: 10, color: COLORS[3] },
        { name: 'Acessórios', value: 5, color: COLORS[4] },
      ]

      const mockTopProducts: TopProduct[] = products.slice(0, 5).map((product, index) => ({
        id: product.id,
        name: product.name,
        sales: 150 - (index * 25),
        revenue: (product.price || 0) * (150 - (index * 25)),
        image: product.images?.main || product.image || '/placeholder.png'
      }))

      setAnalytics(mockAnalytics)
      setSalesData(mockSalesData)
      setCategoryData(mockCategoryData)
      setTopProducts(mockTopProducts)
      
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error)
      toast.error('Erro ao carregar dados do dashboard')
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-500" />
    )
  }

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-green-500' : 'text-red-500'
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#00CED1]"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Visão geral do seu negócio</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Button size="sm" className="bg-[#00CED1] hover:bg-[#00B8CC]">
              <Bell className="h-4 w-4 mr-2" />
              Notificações
            </Button>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Receita Total
                </CardTitle>
                <DollarSign className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(analytics.totalRevenue)}
                </div>
                <div className="flex items-center space-x-1 text-xs">
                  {getGrowthIcon(analytics.revenueGrowth)}
                  <span className={getGrowthColor(analytics.revenueGrowth)}>
                    {Math.abs(analytics.revenueGrowth)}% vs mês anterior
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Pedidos
                </CardTitle>
                <ShoppingCart className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {analytics.totalOrders.toLocaleString()}
                </div>
                <div className="flex items-center space-x-1 text-xs">
                  {getGrowthIcon(analytics.ordersGrowth)}
                  <span className={getGrowthColor(analytics.ordersGrowth)}>
                    {Math.abs(analytics.ordersGrowth)}% vs mês anterior
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Clientes
                </CardTitle>
                <Users className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {analytics.totalCustomers.toLocaleString()}
                </div>
                <div className="flex items-center space-x-1 text-xs">
                  {getGrowthIcon(analytics.customersGrowth)}
                  <span className={getGrowthColor(analytics.customersGrowth)}>
                    {Math.abs(analytics.customersGrowth)}% vs mês anterior
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Produtos
                </CardTitle>
                <Package className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {analytics.totalProducts}
                </div>
                <div className="flex items-center space-x-1 text-xs">
                  {getGrowthIcon(analytics.productsGrowth)}
                  <span className={getGrowthColor(analytics.productsGrowth)}>
                    {Math.abs(analytics.productsGrowth)}% vs mês anterior
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="xl:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-[#00CED1]" />
                  <span>Vendas por Mês</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      formatter={(value: number, name: string) => [
                        name === 'revenue' ? formatCurrency(value) : value,
                        name === 'revenue' ? 'Receita' : 'Pedidos'
                      ]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#00CED1" 
                      strokeWidth={3}
                      dot={{ fill: '#00CED1', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Category Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-[#00CED1]" />
                  <span>Vendas por Categoria</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      dataKey="value"
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Participação']} />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-1 gap-2 mt-4">
                  {categoryData.map((category, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="text-gray-600">{category.name}</span>
                      </div>
                      <span className="font-medium">{category.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-[#00CED1]" />
                <span>Produtos Mais Vendidos</span>
              </CardTitle>
              <Link href="/admin/products">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Todos
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.id} className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {product.sales} vendas
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(product.revenue)}
                      </p>
                      <Badge 
                        variant="secondary" 
                        className="text-xs"
                      >
                        #{index + 1}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/admin/products">
                  <Button variant="outline" className="w-full h-20 flex-col space-y-2">
                    <Package className="h-6 w-6" />
                    <span className="text-xs">Produtos</span>
                  </Button>
                </Link>
                <Link href="/admin/orders">
                  <Button variant="outline" className="w-full h-20 flex-col space-y-2">
                    <ShoppingCart className="h-6 w-6" />
                    <span className="text-xs">Pedidos</span>
                  </Button>
                </Link>
                <Link href="/admin/customers">
                  <Button variant="outline" className="w-full h-20 flex-col space-y-2">
                    <Users className="h-6 w-6" />
                    <span className="text-xs">Clientes</span>
                  </Button>
                </Link>
                <Link href="/admin/settings">
                  <Button variant="outline" className="w-full h-20 flex-col space-y-2">
                    <Settings className="h-6 w-6" />
                    <span className="text-xs">Configurações</span>
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
