'use client'


import { AnalyticsCard } from '@/components/admin/AnalyticsCardFixed'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Package,
  TrendingUp,
  TrendingDown,
  Eye,
  Heart,
  Star,
  BarChart3,
  Calendar,
  Download,
  Filter,
  Search
} from 'lucide-react'
import { Input } from '@/components/ui/input'

const dashboardData = {
  overview: [
    {
      title: 'Receita Total',
      value: 'R$ 2.847.592',
      change: 12.5,
      isPositive: true,
      icon: DollarSign,
      description: '+12,5% vs mês anterior'
    },
    {
      title: 'Vendas Totais',
      value: '15.847',
      change: 8.2,
      isPositive: true,
      icon: ShoppingBag,
      description: '+8,2% vs mês anterior'
    },
    {
      title: 'Clientes Ativos',
      value: '8.492',
      change: -2.1,
      isPositive: false,
      icon: Users,
      description: '-2,1% vs mês anterior'
    },
    {
      title: 'Produtos em Estoque',
      value: '2.156',
      change: 5.7,
      isPositive: true,
      icon: Package,
      description: '+5,7% vs mês anterior'
    }
  ],
  products: [
    {
      name: 'iPhone 16 Pro',
      category: 'Smartphones',
      sales: 1247,
      revenue: 'R$ 13.084.653',
      trend: 15.2,
      stock: 89,
      rating: 4.8,
      image: '/Produtos/Iphone 16 Pro.png'
    },
    {
      name: 'MacBook Pro M3',
      category: 'Computadores',
      sales: 534,
      revenue: 'R$ 10.679.200',
      trend: 8.9,
      stock: 45,
      rating: 4.9,
      image: '/Produtos/Macbook Pro.png'
    },
    {
      name: 'iPad Pro M4',
      category: 'Tablets',
      sales: 823,
      revenue: 'R$ 8.641.770',
      trend: 22.1,
      stock: 156,
      rating: 4.7,
      image: '/Produtos/Ipad Pro.png'
    },
    {
      name: 'Apple Watch Ultra 2',
      category: 'Wearables',
      sales: 967,
      revenue: 'R$ 6.769.300',
      trend: -3.2,
      stock: 78,
      rating: 4.6,
      image: '/Produtos/Watch Ultra 2.png'
    },
    {
      name: 'AirPods Pro 2',
      category: 'Audio',
      sales: 1834,
      revenue: 'R$ 4.578.600',
      trend: 28.7,
      stock: 234,
      rating: 4.8,
      image: '/Produtos/Air Pods Pro 2'
    }
  ]
}

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Dashboard Analytics
            </h1>
            <p className="text-gray-600 mt-2">
              Monitore o desempenho da sua loja em tempo real
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Últimos 30 dias
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Button size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              Relatório Completo
            </Button>
          </div>
        </motion.div>

        {/* Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {dashboardData.overview.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <AnalyticsCard
                title={item.title}
                value={item.value}
                change={item.change}
                isPositive={item.isPositive}
                icon={item.icon}
                description={item.description}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Analytics Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Tabs defaultValue="products" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-96">
              <TabsTrigger value="products">Produtos</TabsTrigger>
              <TabsTrigger value="customers">Clientes</TabsTrigger>
              <TabsTrigger value="orders">Pedidos</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-6">
              {/* Search and Filters */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Produtos Mais Vendidos</span>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Buscar produtos..."
                          className="pl-10 w-64"
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filtros
                      </Button>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    Análise detalhada de vendas por produto
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData.products.map((product, index) => (
                      <motion.div
                        key={product.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-xl border bg-white hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{product.name}</h3>
                            <p className="text-sm text-gray-500">{product.category}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                {product.stock} em estoque
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-semibold text-lg text-gray-900">{product.revenue}</div>
                          <div className="text-sm text-gray-500">{product.sales} vendas</div>
                          <div className={`flex items-center justify-end mt-1 ${
                            product.trend >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {product.trend >= 0 ? (
                              <TrendingUp className="h-4 w-4 mr-1" />
                            ) : (
                              <TrendingDown className="h-4 w-4 mr-1" />
                            )}
                            <span className="text-sm font-medium">
                              {Math.abs(product.trend)}%
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="customers">
              <Card>
                <CardHeader>
                  <CardTitle>Análise de Clientes</CardTitle>
                  <CardDescription>
                    Insights sobre comportamento e engajamento dos clientes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <AnalyticsCard
                      title="Novos Clientes"
                      value="1.247"
                      change={18.9}
                      isPositive={true}
                      icon={Users}
                      description="Este mês"
                    />
                    <AnalyticsCard
                      title="Taxa de Retenção"
                      value="87.3%"
                      change={5.2}
                      isPositive={true}
                      icon={Heart}
                      description="vs mês anterior"
                    />
                    <AnalyticsCard
                      title="Valor Médio por Cliente"
                      value="R$ 1.847"
                      change={-2.8}
                      isPositive={false}
                      icon={DollarSign}
                      description="vs mês anterior"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Status dos Pedidos</CardTitle>
                  <CardDescription>
                    Acompanhe o fluxo de pedidos em tempo real
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                      <div className="text-2xl font-bold text-blue-700">342</div>
                      <div className="text-sm text-blue-600">Pendentes</div>
                    </div>
                    <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                      <div className="text-2xl font-bold text-yellow-700">127</div>
                      <div className="text-sm text-yellow-600">Processando</div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                      <div className="text-2xl font-bold text-green-700">1.834</div>
                      <div className="text-sm text-green-600">Entregues</div>
                    </div>
                    <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                      <div className="text-2xl font-bold text-red-700">23</div>
                      <div className="text-sm text-red-600">Cancelados</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics Avançado</CardTitle>
                  <CardDescription>
                    Métricas detalhadas de performance e engajamento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnalyticsCard
                      title="Pageviews"
                      value="156.847"
                      change={23.4}
                      isPositive={true}
                      icon={Eye}
                      description="Este mês"
                    />
                    <AnalyticsCard
                      title="Taxa de Conversão"
                      value="3.42%"
                      change={0.8}
                      isPositive={true}
                      icon={TrendingUp}
                      description="vs mês anterior"
                    />
                    <AnalyticsCard
                      title="Tempo Médio na Página"
                      value="4:23"
                      change={-5.1}
                      isPositive={false}
                      icon={BarChart3}
                      description="vs mês anterior"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
