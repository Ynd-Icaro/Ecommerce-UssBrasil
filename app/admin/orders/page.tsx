'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Package, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  Download,
  Filter,
  ArrowUp,
  ArrowDown,
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  MapPin,
  Calendar,
  CreditCard
} from 'lucide-react'

interface Order {
  id: string
  number: string
  customer: {
    name: string
    email: string
    avatar?: string
  }
  items: {
    id: string
    name: string
    quantity: number
    price: number
    image: string
  }[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  paymentMethod: string
  createdAt: string
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  tracking?: string
}

type SortKey = 'number' | 'total' | 'createdAt' | 'customer'
type SortDirection = 'asc' | 'desc'

export default function AdminOrdersPage() {
  const [orders] = useState<Order[]>([
    {
      id: '1',
      number: '#12847',
      customer: {
        name: 'Ana Carolina Silva',
        email: 'ana.silva@email.com',
        avatar: '/avatars/ana.jpg'
      },
      items: [
        {
          id: '1',
          name: 'iPhone 15 Pro Max 256GB',
          quantity: 1,
          price: 8999.99,
          image: '/Produtos/Apple/Iphone 16 Pro.png'
        }
      ],
      total: 8999.99,
      status: 'processing',
      paymentStatus: 'paid',
      paymentMethod: 'Cartão de Crédito',
      createdAt: '2024-01-15T10:30:00Z',
      shippingAddress: {
        street: 'Rua das Flores, 123',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567'
      },
      tracking: 'BR123456789SP'
    },
    {
      id: '2',
      number: '#12846',
      customer: {
        name: 'Roberto Santos',
        email: 'roberto.santos@email.com'
      },
      items: [
        {
          id: '2',
          name: 'MacBook Air M3 13"',
          quantity: 1,
          price: 12999.99,
          image: '/fallback-product.png'
        }
      ],
      total: 12999.99,
      status: 'shipped',
      paymentStatus: 'paid',
      paymentMethod: 'PIX',
      createdAt: '2024-01-15T08:15:00Z',
      shippingAddress: {
        street: 'Av. Paulista, 1000',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01310-100'
      },
      tracking: 'BR987654321SP'
    },
    {
      id: '3',
      number: '#12845',
      customer: {
        name: 'Maria Oliveira',
        email: 'maria.oliveira@email.com'
      },
      items: [
        {
          id: '3',
          name: 'AirPods Pro 3ª Geração',
          quantity: 2,
          price: 2499.99,
          image: '/fallback-product.png'
        }
      ],
      total: 4999.98,
      status: 'delivered',
      paymentStatus: 'paid',
      paymentMethod: 'Cartão de Débito',
      createdAt: '2024-01-14T16:45:00Z',
      shippingAddress: {
        street: 'Rua Augusta, 456',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01305-000'
      }
    },
    
    {
      id: '5',
      number: '#12843',
      customer: {
        name: 'Carla Mendes',
        email: 'carla.mendes@email.com'
      },
      items: [
        {
          id: '5',
          name: 'iPad Pro 12.9" M2',
          quantity: 1,
          price: 7999.99,
          image: '/fallback-product.png'
        }
      ],
      total: 7999.99,
      status: 'cancelled',
      paymentStatus: 'refunded',
      paymentMethod: 'Cartão de Crédito',
      createdAt: '2024-01-13T12:00:00Z',
      shippingAddress: {
        street: 'Av. Copacabana, 321',
        city: 'Rio de Janeiro',
        state: 'RJ',
        zipCode: '22070-001'
      }
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [paymentFilter, setPaymentFilter] = useState<string>('all')
  const [sortKey, setSortKey] = useState<SortKey>('createdAt')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  const statuses = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled']
  const paymentStatuses = ['all', 'pending', 'paid', 'failed', 'refunded']

  const filteredAndSortedOrders = useMemo(() => {
    let filtered = orders.filter(order => 
      (order.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
       order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'all' || order.status === statusFilter) &&
      (paymentFilter === 'all' || order.paymentStatus === paymentFilter)
    )

    return filtered.sort((a, b) => {
      let aValue, bValue
      
      switch (sortKey) {
        case 'customer':
          aValue = a.customer.name
          bValue = b.customer.name
          break
        case 'createdAt':
          aValue = new Date(a.createdAt).getTime()
          bValue = new Date(b.createdAt).getTime()
          break
        default:
          aValue = a[sortKey]
          bValue = b[sortKey]
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue)
      }
      
      return sortDirection === 'asc' 
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number)
    })
  }, [orders, searchTerm, statusFilter, paymentFilter, sortKey, sortDirection])

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDirection('desc')
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      case 'processing':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'shipped':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'delivered':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      case 'paid':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      case 'failed':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'refunded':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusText = (status: string) => {
    const texts = {
      pending: 'Pendente',
      processing: 'Processando',
      shipped: 'Enviado',
      delivered: 'Entregue',
      cancelled: 'Cancelado',
      paid: 'Pago',
      failed: 'Falhou',
      refunded: 'Reembolsado'
    }
    return texts[status as keyof typeof texts] || status
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return Clock
      case 'processing':
        return Package
      case 'shipped':
        return Truck
      case 'delivered':
        return CheckCircle
      case 'cancelled':
        return XCircle
      default:
        return Clock
    }
  }

  // Estatísticas
  const totalOrders = orders.length
  const pendingOrders = orders.filter(o => o.status === 'pending').length
  const totalRevenue = orders.filter(o => o.paymentStatus === 'paid').reduce((sum, o) => sum + o.total, 0)
  const avgOrderValue = totalRevenue / orders.filter(o => o.paymentStatus === 'paid').length || 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Pedidos</h1>
          <p className="text-gray-300 mt-1">Gerencie todos os pedidos da sua loja</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-4 py-2 rounded-xl hover:bg-white/20 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-gradient-to-r from-[#00CED1] to-[#40E0D0] text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Pedido</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {[
          {
            title: 'Total de Pedidos',
            value: totalOrders,
            icon: ShoppingCart,
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-500/10'
          },
          {
            title: 'Pedidos Pendentes',
            value: pendingOrders,
            icon: Clock,
            color: 'from-amber-500 to-amber-600',
            bgColor: 'bg-amber-500/10'
          },
          {
            title: 'Receita Total',
            value: formatCurrency(totalRevenue),
            icon: DollarSign,
            color: 'from-emerald-500 to-emerald-600',
            bgColor: 'bg-emerald-500/10'
          },
          {
            title: 'Ticket Médio',
            value: formatCurrency(avgOrderValue),
            icon: TrendingUp,
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-500/10'
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4"
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-xl ${stat.bgColor}`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-gray-300 text-sm font-medium">{stat.title}</p>
                <p className="text-white text-lg font-bold">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters and Search */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 lg:p-6"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Pesquisar por número, cliente ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0E7466] transition-all"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="min-w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#0E7466] transition-all"
            >
              {statuses.map(status => (
                <option key={status} value={status} className="bg-[#0C1A33] text-white">
                  {status === 'all' ? 'Todos os status' : getStatusText(status)}
                </option>
              ))}
            </select>
          </div>

          {/* Payment Filter */}
          <div className="min-w-48">
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#0E7466] transition-all"
            >
              {paymentStatuses.map(status => (
                <option key={status} value={status} className="bg-[#0C1A33] text-white">
                  {status === 'all' ? 'Todos os pagamentos' : getStatusText(status)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Orders Table */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th 
                  className="text-left p-4 text-gray-300 font-medium cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('number')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Pedido</span>
                    {sortKey === 'number' && (
                      sortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="text-left p-4 text-gray-300 font-medium cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('customer')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Cliente</span>
                    {sortKey === 'customer' && (
                      sortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="text-left p-4 text-gray-300 font-medium">Produtos</th>
                <th 
                  className="text-left p-4 text-gray-300 font-medium cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('total')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Total</span>
                    {sortKey === 'total' && (
                      sortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="text-left p-4 text-gray-300 font-medium">Status</th>
                <th className="text-left p-4 text-gray-300 font-medium">Pagamento</th>
                <th 
                  className="text-left p-4 text-gray-300 font-medium cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('createdAt')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Data</span>
                    {sortKey === 'createdAt' && (
                      sortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="text-left p-4 text-gray-300 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedOrders.map((order, index) => {
                const StatusIcon = getStatusIcon(order.status)
                return (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-all"
                  >
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <StatusIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-[#0E7466] font-medium">{order.number}</span>
                      </div>
                      {order.tracking && (
                        <p className="text-xs text-gray-400 mt-1">
                          <Truck className="w-3 h-3 inline mr-1" />
                          {order.tracking}
                        </p>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00CED1] to-[#1E3A8A] flex items-center justify-center text-white text-sm font-medium">
                          {order.customer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">{order.customer.name}</p>
                          <p className="text-gray-400 text-xs">{order.customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Package className="w-4 h-4 text-gray-400" />
                        <span className="text-white">
                          {order.items.length} {order.items.length === 1 ? 'item' : 'itens'}
                        </span>
                      </div>
                      <p className="text-gray-400 text-xs mt-1">
                        {order.items[0].name}
                        {order.items.length > 1 && ` +${order.items.length - 1} mais`}
                      </p>
                    </td>
                    <td className="p-4">
                      <span className="text-white font-bold">{formatCurrency(order.total)}</span>
                      <p className="text-gray-400 text-xs">{order.paymentMethod}</p>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {getStatusText(order.paymentStatus)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-300 text-sm">{formatDate(order.createdAt)}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>

          {filteredAndSortedOrders.length === 0 && (
            <div className="p-12 text-center">
              <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Nenhum pedido encontrado</h3>
              <p className="text-gray-400">Tente ajustar os filtros ou aguarde novos pedidos</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
