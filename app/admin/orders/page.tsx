'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {
  Search,
  Plus,
  Eye,
  Edit,
  Package,
  Truck,
  Check,
  Clock,
  MoreHorizontal,
  Download,
  RefreshCw,
  X,
  PackageSearch,
  DollarSign,
  Calendar,
  ShoppingCart,
  AlertCircle,
  User,
  CreditCard,
  MapPin,
  Star,
  Filter
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import AdminLayout from '@/components/admin-layout'
import Image from 'next/image'

interface OrderItem {
  id: number
  name: string
  quantity: number
  price: number
  image?: string
  category: string
}

interface Order {
  id: number
  customerId: number
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAvatar?: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  paymentMethod: string
  orderDate: string
  deliveryDate?: string
  estimatedDelivery: string
  total: number
  subtotal: number
  shipping: number
  discount: number
  items: OrderItem[]
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  trackingCode?: string
  notes?: string
}

interface OrderStats {
  total: number
  pending: number
  processing: number
  shipped: number
  delivered: number
  cancelled: number
  totalRevenue: number
}

const statusConfig = {
  pending: { label: 'Pendente', class: 'bg-yellow-100 text-yellow-800', icon: Clock },
  processing: { label: 'Processando', class: 'bg-blue-100 text-blue-800', icon: RefreshCw },
  shipped: { label: 'Enviado', class: 'bg-purple-100 text-purple-800', icon: Truck },
  delivered: { label: 'Entregue', class: 'bg-green-100 text-green-800', icon: Check },
  cancelled: { label: 'Cancelado', class: 'bg-red-100 text-red-800', icon: X }
}

const paymentStatusConfig = {
  pending: { label: 'Pendente', class: 'bg-yellow-100 text-yellow-800' },
  paid: { label: 'Pago', class: 'bg-green-100 text-green-800' },
  failed: { label: 'Falhou', class: 'bg-red-100 text-red-800' },
  refunded: { label: 'Reembolsado', class: 'bg-gray-100 text-gray-800' }
}

export default function OrdersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [stats, setStats] = useState<OrderStats>({
    total: 0,
    pending: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
    totalRevenue: 0
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [paymentFilter, setPaymentFilter] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return

    if (!session || session.user.role !== 'ADMIN') {
      router.push('/login')
      return
    }

    loadOrders()
  }, [session, status, router])

  const loadOrders = async () => {
    try {
      // Simulando dados de pedidos
      const mockOrders: Order[] = [
        {
          id: 1001,
          customerId: 1,
          customerName: 'João Silva',
          customerEmail: 'joao.silva@email.com',
          customerPhone: '+55 11 99999-1111',
          status: 'delivered',
          paymentStatus: 'paid',
          paymentMethod: 'Cartão de Crédito',
          orderDate: '2024-01-20',
          deliveryDate: '2024-01-25',
          estimatedDelivery: '2024-01-25',
          total: 12500.00,
          subtotal: 11500.00,
          shipping: 1000.00,
          discount: 0,
          items: [
            {
              id: 1,
              name: 'iPhone 16 Pro Max',
              quantity: 1,
              price: 11500.00,
              image: '/produtos/Iphone 16 Pro.png',
              category: 'iPhone'
            }
          ],
          shippingAddress: {
            street: 'Rua das Flores, 123',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01234-567',
            country: 'Brasil'
          },
          trackingCode: 'BR123456789',
          notes: 'Entrega realizada com sucesso'
        },
        {
          id: 1002,
          customerId: 2,
          customerName: 'Maria Santos',
          customerEmail: 'maria.santos@email.com',
          customerPhone: '+55 21 88888-2222',
          status: 'shipped',
          paymentStatus: 'paid',
          paymentMethod: 'PIX',
          orderDate: '2024-01-18',
          estimatedDelivery: '2024-01-23',
          total: 8500.00,
          subtotal: 7500.00,
          shipping: 1000.00,
          discount: 0,
          items: [
            {
              id: 2,
              name: 'MacBook Air M3',
              quantity: 1,
              price: 7500.00,
              image: '/produtos/Macbook Air.png',
              category: 'Mac'
            }
          ],
          shippingAddress: {
            street: 'Av. Copacabana, 456',
            city: 'Rio de Janeiro',
            state: 'RJ',
            zipCode: '22000-123',
            country: 'Brasil'
          },
          trackingCode: 'BR987654321'
        },
        {
          id: 1003,
          customerId: 3,
          customerName: 'Carlos Oliveira',
          customerEmail: 'carlos.oliveira@email.com',
          customerPhone: '+55 31 77777-3333',
          status: 'processing',
          paymentStatus: 'paid',
          paymentMethod: 'Cartão de Crédito',
          orderDate: '2024-01-19',
          estimatedDelivery: '2024-01-24',
          total: 3200.00,
          subtotal: 2800.00,
          shipping: 400.00,
          discount: 0,
          items: [
            {
              id: 3,
              name: 'AirPods Pro 2',
              quantity: 1,
              price: 1400.00,
              image: '/produtos/Air Pods Pro 2',
              category: 'AirPods'
            },
            {
              id: 4,
              name: 'Apple Watch Series 10',
              quantity: 1,
              price: 1400.00,
              image: '/produtos/Watch Series 10.png',
              category: 'Apple Watch'
            }
          ],
          shippingAddress: {
            street: 'Rua da Liberdade, 789',
            city: 'Belo Horizonte',
            state: 'MG',
            zipCode: '30000-456',
            country: 'Brasil'
          }
        }
      ]
      
      setOrders(mockOrders)
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterOrders = useCallback(() => {
    let filtered = orders

    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.id.toString().includes(searchTerm) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.trackingCode?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter)
    }

    if (paymentFilter !== 'all') {
      filtered = filtered.filter(order => order.paymentStatus === paymentFilter)
    }

    setFilteredOrders(filtered)
  }, [orders, searchTerm, statusFilter, paymentFilter])

  const calculateStats = useCallback(() => {
    const total = orders.length
    const pending = orders.filter(o => o.status === 'pending').length
    const processing = orders.filter(o => o.status === 'processing').length
    const shipped = orders.filter(o => o.status === 'shipped').length
    const delivered = orders.filter(o => o.status === 'delivered').length
    const cancelled = orders.filter(o => o.status === 'cancelled').length
    const totalRevenue = orders.filter(o => o.paymentStatus === 'paid').reduce((sum, order) => sum + order.total, 0)

    setStats({ total, pending, processing, shipped, delivered, cancelled, totalRevenue })
  }, [orders])

  // Effect to trigger filtering and stats calculation
  useEffect(() => {
    filterOrders()
    calculateStats()
  }, [orders, searchTerm, statusFilter, paymentFilter, filterOrders, calculateStats])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const getOrderProgress = (status: string) => {
    const progressMap = {
      pending: 25,
      processing: 50,
      shipped: 75,
      delivered: 100,
      cancelled: 0
    }
    return progressMap[status as keyof typeof progressMap] || 0
  }

  const OrderDetailsModal = ({ order }: { order: Order | null }) => {
    if (!order) return null

    const StatusIcon = statusConfig[order.status].icon

    return (
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-4">
              <div className="p-3 bg-[#00CED1]/10 rounded-lg">
                <ShoppingCart className="h-8 w-8 text-[#00CED1]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Pedido #{order.id}</h3>
                <p className="text-gray-600 mt-1">{order.customerName}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge className={statusConfig[order.status].class}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {statusConfig[order.status].label}
                  </Badge>
                  <Badge className={paymentStatusConfig[order.paymentStatus].class}>
                    {paymentStatusConfig[order.paymentStatus].label}
                  </Badge>
                </div>
              </div>
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="items">Itens</TabsTrigger>
            <TabsTrigger value="shipping">Entrega</TabsTrigger>
            <TabsTrigger value="payment">Pagamento</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">{formatDate(order.orderDate)}</p>
                      <p className="text-sm text-gray-600">Data do Pedido</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <DollarSign className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">{formatCurrency(order.total)}</p>
                      <p className="text-sm text-gray-600">Valor Total</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <Package className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">{order.items.length}</p>
                      <p className="text-sm text-gray-600">Itens</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Status do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progresso do Pedido</span>
                    <span>{getOrderProgress(order.status)}%</span>
                  </div>
                  <Progress value={getOrderProgress(order.status)} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                  {Object.entries(statusConfig).map(([key, config]) => {
                    const Icon = config.icon
                    const isActive = order.status === key
                    const isPassed = getOrderProgress(order.status) > getOrderProgress(key)
                    
                    return (
                      <div
                        key={key}
                        className={`flex flex-col items-center p-3 rounded-lg ${
                          isActive ? 'bg-[#00CED1]/10 border-2 border-[#00CED1]' :
                          isPassed ? 'bg-green-50 border-2 border-green-200' :
                          'bg-gray-50 border-2 border-gray-200'
                        }`}
                      >
                        <Icon className={`h-6 w-6 mb-2 ${
                          isActive ? 'text-[#00CED1]' :
                          isPassed ? 'text-green-600' :
                          'text-gray-400'
                        }`} />
                        <span className={`text-xs font-medium text-center ${
                          isActive ? 'text-[#00CED1]' :
                          isPassed ? 'text-green-600' :
                          'text-gray-600'
                        }`}>
                          {config.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informações do Cliente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={order.customerAvatar} />
                      <AvatarFallback className="bg-[#00CED1] text-white">
                        {getInitials(order.customerName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{order.customerName}</p>
                      <p className="text-sm text-gray-600">{order.customerEmail}</p>
                      <p className="text-sm text-gray-600">{order.customerPhone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Resumo Financeiro</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">{formatCurrency(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frete:</span>
                    <span className="font-medium">{formatCurrency(order.shipping)}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Desconto:</span>
                      <span className="font-medium text-green-600">-{formatCurrency(order.discount)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold text-[#00CED1] text-lg">{formatCurrency(order.total)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="items" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Itens do Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="relative w-16 h-16">
                        <Image
                          src={item.image || '/placeholder-product.png'}
                          alt={item.name}
                          fill
                          className="object-contain rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.category}</p>
                        <p className="text-sm text-gray-600">Quantidade: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(item.price)}</p>
                        <p className="text-sm text-gray-600">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shipping" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informações de Entrega</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Endereço de Entrega</h4>
                  <div className="text-gray-600">
                    <p>{order.shippingAddress.street}</p>
                    <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                    <p>CEP: {order.shippingAddress.zipCode}</p>
                    <p>{order.shippingAddress.country}</p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Previsão de Entrega</h4>
                    <p className="text-gray-600">{formatDate(order.estimatedDelivery)}</p>
                  </div>
                  {order.trackingCode && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Código de Rastreamento</h4>
                      <p className="text-[#00CED1] font-mono">{order.trackingCode}</p>
                    </div>
                  )}
                </div>

                {order.deliveryDate && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Data de Entrega</h4>
                      <p className="text-green-600 font-medium">{formatDate(order.deliveryDate)}</p>
                    </div>
                  </>
                )}

                {order.notes && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Observações</h4>
                      <p className="text-gray-600">{order.notes}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informações de Pagamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Método de Pagamento</h4>
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4 text-gray-500" />
                      <span>{order.paymentMethod}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Status do Pagamento</h4>
                    <Badge className={paymentStatusConfig[order.paymentStatus].class}>
                      {paymentStatusConfig[order.paymentStatus].label}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span>{formatCurrency(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frete:</span>
                    <span>{formatCurrency(order.shipping)}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Desconto:</span>
                      <span className="text-green-600">-{formatCurrency(order.discount)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-[#00CED1]">{formatCurrency(order.total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Editar Pedido
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
          {order.status !== 'cancelled' && (
            <Button variant="destructive" size="sm">
              <X className="h-4 w-4 mr-2" />
              Cancelar Pedido
            </Button>
          )}
        </div>
      </DialogContent>
    )
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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pedidos</h1>
            <p className="text-gray-600 mt-1">Gerencie todos os pedidos da sua loja</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Button className="bg-gradient-to-r from-[#00CED1] to-[#20B2AA] hover:from-[#20B2AA] hover:to-[#00CED1]">
              <Plus className="h-4 w-4 mr-2" />
              Novo Pedido
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <Card className="border-0 shadow-lg lg:col-span-2">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <ShoppingCart className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  <p className="text-sm text-gray-600">Total de Pedidos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xl font-bold text-yellow-600">{stats.pending}</p>
                <p className="text-xs text-gray-600">Pendentes</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xl font-bold text-blue-600">{stats.processing}</p>
                <p className="text-xs text-gray-600">Processando</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xl font-bold text-purple-600">{stats.shipped}</p>
                <p className="text-xs text-gray-600">Enviados</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xl font-bold text-green-600">{stats.delivered}</p>
                <p className="text-xs text-gray-600">Entregues</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg lg:col-span-2">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
                  <p className="text-sm text-gray-600">Receita Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por ID, cliente, email ou código de rastreamento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-[#00CED1]"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Status do Pedido" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="processing">Processando</SelectItem>
                  <SelectItem value="shipped">Enviado</SelectItem>
                  <SelectItem value="delivered">Entregue</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Status Pagamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos Pagamentos</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="paid">Pago</SelectItem>
                  <SelectItem value="failed">Falhou</SelectItem>
                  <SelectItem value="refunded">Reembolsado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order, index) => {
            const StatusIcon = statusConfig[order.status].icon
            
            return (
              <div key={order.id}>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                      onClick={() => {
                        setSelectedOrder(order)
                        setIsModalOpen(true)
                      }}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-[#00CED1]/10 rounded-lg">
                          <ShoppingCart className="h-6 w-6 text-[#00CED1]" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Pedido #{order.id}</h3>
                          <p className="text-sm text-gray-600">{order.customerName} • {order.customerEmail}</p>
                          <p className="text-sm text-gray-600">{formatDate(order.orderDate)}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-lg font-bold text-[#00CED1]">{formatCurrency(order.total)}</p>
                          <p className="text-sm text-gray-600">{order.items.length} item(s)</p>
                        </div>

                        <div className="flex flex-col space-y-2">
                          <Badge className={statusConfig[order.status].class}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusConfig[order.status].label}
                          </Badge>
                          <Badge className={paymentStatusConfig[order.paymentStatus].class}>
                            {paymentStatusConfig[order.paymentStatus].label}
                          </Badge>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Ver Detalhes
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar Pedido
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Imprimir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progresso do Pedido</span>
                        <span className="text-gray-600">{getOrderProgress(order.status)}%</span>
                      </div>
                      <Progress value={getOrderProgress(order.status)} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>

        {filteredOrders.length === 0 && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12">
              <div className="text-center">
                <PackageSearch className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum pedido encontrado</h3>
                <p className="text-gray-600 mb-6">Tente ajustar os filtros ou aguardar novos pedidos.</p>
                <Button className="bg-gradient-to-r from-[#00CED1] to-[#20B2AA]">
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Novo Pedido
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Order Details Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <OrderDetailsModal order={selectedOrder} />
        </Dialog>
      </div>
    </AdminLayout>
  )
}
