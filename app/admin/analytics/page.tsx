'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingCart, 
  DollarSign,
  Package,
  Eye,
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react'
import AdminLayout from '@/components/admin-layout'

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d')
  
  const metrics = [
    {
      title: 'Receita Total',
      value: 'R$ 124.580,00',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Pedidos',
      value: '1,247',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'text-blue-600'
    },
    {
      title: 'Clientes',
      value: '892',
      change: '+15.3%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Produtos Vendidos',
      value: '2,458',
      change: '-2.1%',
      trend: 'down',
      icon: Package,
      color: 'text-orange-600'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
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
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent tracking-tight">
                    Analytics
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Acompanhe o desempenho da sua loja
                  </p>
                </div>
                <div className="flex gap-2">
                  {['7d', '30d', '90d'].map((range) => (
                    <Button
                      key={range}
                      variant={timeRange === range ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setTimeRange(range)}
                      className="rounded-xl"
                    >
                      {range === '7d' ? '7 dias' : range === '30d' ? '30 dias' : '90 dias'}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </motion.header>

          {/* Metrics Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric) => (
              <Card key={metric.title} className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                      <div className="flex items-center mt-2">
                        {metric.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span className={`text-sm font-medium ${
                          metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {metric.change}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">vs período anterior</span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-xl bg-gray-100 ${metric.color}`}>
                      <metric.icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Vendas por Período */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Vendas por Período
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Gráfico de vendas (implementar Chart.js)
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Produtos Mais Vendidos */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="h-5 w-5 mr-2" />
                    Produtos Mais Vendidos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'iPhone 16 Pro', sales: 245, revenue: 'R$ 2.574.975,00' },
                      { name: 'MacBook Pro M4', sales: 89, revenue: 'R$ 1.779.999,00' },
                      { name: 'iPad Pro M4', sales: 156, revenue: 'R$ 1.637.999,00' },
                      { name: 'Apple Watch Series 10', sales: 203, revenue: 'R$ 954.197,00' }
                    ].map((product, index) => (
                      <div key={product.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <Badge variant="outline" className="mr-3">
                            #{index + 1}
                          </Badge>
                          <div>
                            <p className="font-medium text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-500">{product.sales} vendas</p>
                          </div>
                        </div>
                        <p className="font-semibold text-gray-900">{product.revenue}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Categorias Mais Vendidas */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="h-5 w-5 mr-2" />
                    Categorias Mais Vendidas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Gráfico de categorias (implementar Chart.js)
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Atividade Recente */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Atividade Recente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: 'Novo pedido #1247', time: '2 min atrás', type: 'order' },
                      { action: 'Cliente João Silva se cadastrou', time: '15 min atrás', type: 'user' },
                      { action: 'Produto iPhone 16 Pro vendido', time: '23 min atrás', type: 'sale' },
                      { action: 'Estoque baixo: iPad Pro M4', time: '1h atrás', type: 'warning' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className={`p-2 rounded-lg mr-3 ${
                          activity.type === 'order' ? 'bg-blue-100 text-blue-600' :
                          activity.type === 'user' ? 'bg-green-100 text-green-600' :
                          activity.type === 'sale' ? 'bg-purple-100 text-purple-600' :
                          'bg-yellow-100 text-yellow-600'
                        }`}>
                          {activity.type === 'order' ? <ShoppingCart className="h-4 w-4" /> :
                           activity.type === 'user' ? <Users className="h-4 w-4" /> :
                           activity.type === 'sale' ? <DollarSign className="h-4 w-4" /> :
                           <Package className="h-4 w-4" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  )
}
