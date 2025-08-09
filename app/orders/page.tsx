'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Package, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Truck, 
  MapPin,
  CreditCard,
  Calendar,
  Download,
  Filter,
  Search,
  MoreVertical,
  ArrowLeft,
  Star,
  RefreshCcw,
  AlertCircle,
  Phone,
  MessageCircle,
  FileText,
  ChevronRight,
  Box,
  Heart,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Award,
  Target,
  Crown,
  Trophy,
  Gift
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

interface OrderItem {
  id: string
  name: string
  image: string
  quantity: number
  price: number
  brand: string
  category: string
}

interface Order {
  id: string
  date: string
  status: 'pending' | 'confirmed' | 'preparing' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  items: OrderItem[]
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  paymentMethod: string
  trackingCode?: string
  estimatedDelivery?: string
  notes?: string
}

interface OrderStats {
  totalOrders: number
  totalSpent: number
  averageOrder: number
  favoriteCategory: string
  totalSavings: number
  completionRate: number
}

const mockOrders: Order[] = [
  {
    id: "ORD-2025-001",
    date: "2025-01-15T10:30:00",
    status: "delivered",
    total: 4999.90,
    items: [
      { 
        id: "1", 
        name: "iPhone 15 Pro Max 256GB", 
        image: "/Produtos/iphone-15-pro.jpg",
        quantity: 1, 
        price: 4999.90,
        brand: "Apple",
        category: "Smartphones"
      }
    ],
    shippingAddress: {
      street: "Rua das Flores, 123",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567"
    },
    paymentMethod: "Cartão de Crédito **** 1234",
    trackingCode: "BR123456789",
    notes: "Entregue com sucesso"
  },
  {
    id: "ORD-2025-002",
    date: "2025-01-10T14:15:00",
    status: "shipped",
    total: 2399.90,
    items: [
      { 
        id: "2", 
        name: "AirPods Pro 2ª Geração", 
        image: "/Produtos/airpods-pro.jpg",
        quantity: 1, 
        price: 2399.90,
        brand: "Apple",
        category: "Áudio"
      }
    ],
    shippingAddress: {
      street: "Av. Paulista, 456",
      city: "São Paulo", 
      state: "SP",
      zipCode: "01311-000"
    },
    paymentMethod: "PIX",
    trackingCode: "BR987654321",
    estimatedDelivery: "2025-01-18"
  },
  {
    id: "ORD-2025-003",
    date: "2025-01-08T09:45:00",
    status: "preparing",
    total: 1299.90,
    items: [
      { 
        id: "3", 
        name: "Apple Watch Series 9 GPS", 
        image: "/Produtos/apple-watch-s9.jpg",
        quantity: 1, 
        price: 1299.90,
        brand: "Apple",
        category: "Wearables"
      }
    ],
    shippingAddress: {
      street: "Rua Oscar Freire, 789",
      city: "São Paulo",
      state: "SP", 
      zipCode: "01426-001"
    },
    paymentMethod: "Cartão de Débito **** 5678",
    estimatedDelivery: "2025-01-20"
  }
]

const mockStats: OrderStats = {
  totalOrders: 12,
  totalSpent: 18599.60,
  averageOrder: 1549.97,
  favoriteCategory: "Smartphones",
  totalSavings: 2400.00,
  completionRate: 94.2
}

const statusConfig = {
  pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pendente' },
  confirmed: { color: 'bg-blue-100 text-blue-800', icon: CheckCircle, label: 'Confirmado' },
  preparing: { color: 'bg-orange-100 text-orange-800', icon: Package, label: 'Preparando' },
  shipped: { color: 'bg-purple-100 text-purple-800', icon: Truck, label: 'Enviado' },
  delivered: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Entregue' },
  cancelled: { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Cancelado' }
}

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'date' | 'total' | 'status'>('date')

  const filteredOrders = mockOrders
    .filter(order => {
      const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesStatus = filterStatus === 'all' || order.status === filterStatus
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case 'total':
          return b.total - a.total
        case 'status':
          return a.status.localeCompare(b.status)
        default:
          return 0
      }
    })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusProgress = (status: string) => {
    const statusOrder = ['pending', 'confirmed', 'preparing', 'shipped', 'delivered']
    const currentIndex = statusOrder.indexOf(status)
    return status === 'cancelled' ? 0 : ((currentIndex + 1) / statusOrder.length) * 100
  }

  if (selectedOrder) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-16">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedOrder(null)}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Voltar</span>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-[#0C1A33]">Pedido {selectedOrder.id}</h1>
                <p className="text-gray-600">Realizado em {formatDate(selectedOrder.date)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Baixar PDF
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Suporte
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Status Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="h-5 w-5" />
                    <span>Status do Pedido</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge className={statusConfig[selectedOrder.status].color}>
                        {statusConfig[selectedOrder.status].label}
                      </Badge>
                      {selectedOrder.trackingCode && (
                        <div className="text-sm text-gray-600">
                          Código: <span className="font-mono">{selectedOrder.trackingCode}</span>
                        </div>
                      )}
                    </div>
                    <Progress value={getStatusProgress(selectedOrder.status)} className="h-2" />
                    {selectedOrder.estimatedDelivery && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>Previsão de entrega: {new Date(selectedOrder.estimatedDelivery).toLocaleDateString('pt-BR')}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Itens do Pedido</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Package className="h-8 w-8 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#0C1A33]">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.brand} • {item.category}</p>
                          <p className="text-sm text-gray-600">Quantidade: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-[#0E7466]">
                            R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex justify-between items-center font-semibold text-lg">
                      <span>Total:</span>
                      <span className="text-[#0E7466]">
                        R$ {selectedOrder.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Shipping Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>Endereço de Entrega</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>{selectedOrder.shippingAddress.street}</p>
                    <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}</p>
                    <p>CEP: {selectedOrder.shippingAddress.zipCode}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <span>Pagamento</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{selectedOrder.paymentMethod}</p>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Ações</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <RefreshCcw className="h-4 w-4 mr-2" />
                      Recomprar itens
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Heart className="h-4 w-4 mr-2" />
                      Adicionar aos favoritos
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Entrar em contato
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-16">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0C1A33] mb-2">Meus Pedidos</h1>
          <p className="text-gray-600">Acompanhe seus pedidos e histórico de compras</p>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="orders">Pedidos</TabsTrigger>
            <TabsTrigger value="statistics">Estatísticas</TabsTrigger>
            <TabsTrigger value="rewards">Recompensas</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Package className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total de Pedidos</p>
                      <p className="text-2xl font-bold text-[#0C1A33]">{mockStats.totalOrders}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Gasto</p>
                      <p className="text-2xl font-bold text-[#0C1A33]">
                        R$ {mockStats.totalSpent.toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Ticket Médio</p>
                      <p className="text-2xl font-bold text-[#0C1A33]">
                        R$ {mockStats.averageOrder.toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <Target className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Taxa de Sucesso</p>
                      <p className="text-2xl font-bold text-[#0C1A33]">{mockStats.completionRate}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Buscar por ID do pedido ou produto..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    >
                      <option value="all">Todos os Status</option>
                      <option value="pending">Pendente</option>
                      <option value="confirmed">Confirmado</option>
                      <option value="preparing">Preparando</option>
                      <option value="shipped">Enviado</option>
                      <option value="delivered">Entregue</option>
                      <option value="cancelled">Cancelado</option>
                    </select>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as 'date' | 'total' | 'status')}
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    >
                      <option value="date">Data</option>
                      <option value="total">Valor</option>
                      <option value="status">Status</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Orders List */}
            <div className="space-y-4">
              <AnimatePresence>
                {filteredOrders.map((order) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer"
                          onClick={() => setSelectedOrder(order)}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 bg-gray-100 rounded-lg">
                              <Package className="h-6 w-6 text-gray-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-[#0C1A33]">Pedido {order.id}</h3>
                              <p className="text-sm text-gray-600">{formatDate(order.date)}</p>
                              <p className="text-sm text-gray-500">
                                {order.items.length} item(s) • {order.paymentMethod}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <p className="font-semibold text-[#0E7466]">
                                R$ {order.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              </p>
                              <Badge className={statusConfig[order.status].color}>
                                {statusConfig[order.status].label}
                              </Badge>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-4">
                          <Progress value={getStatusProgress(order.status)} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredOrders.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Nenhum pedido encontrado</h3>
                  <p className="text-gray-500">Tente ajustar os filtros ou fazer uma nova busca.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="statistics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Estatísticas de Compras</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Categoria Favorita</span>
                      <span className="font-semibold">{mockStats.favoriteCategory}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Economizado</span>
                      <span className="font-semibold text-green-600">
                        R$ {mockStats.totalSavings.toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Taxa de Conclusão</span>
                      <span className="font-semibold">{mockStats.completionRate}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Análise de Gastos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-[#0E7466]">
                        R$ {mockStats.totalSpent.toLocaleString('pt-BR')}
                      </p>
                      <p className="text-sm text-gray-600">Total gasto em 2025</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-semibold text-[#0C1A33]">
                        R$ {mockStats.averageOrder.toLocaleString('pt-BR')}
                      </p>
                      <p className="text-sm text-gray-600">Ticket médio</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Programa de Recompensas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Crown className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-[#0C1A33] mb-2">Cliente VIP</h3>
                  <p className="text-gray-600 mb-6">
                    Você já ganhou benefícios exclusivos por ser um cliente fiel!
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
                      <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                      <h4 className="font-semibold">Status VIP</h4>
                      <p className="text-sm text-gray-600">Frete grátis em todas as compras</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                      <Star className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <h4 className="font-semibold">Pontos Acumulados</h4>
                      <p className="text-sm text-gray-600">2,450 pontos disponíveis</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                      <Gift className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <h4 className="font-semibold">Próxima Recompensa</h4>
                      <p className="text-sm text-gray-600">R$ 100 de desconto</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
