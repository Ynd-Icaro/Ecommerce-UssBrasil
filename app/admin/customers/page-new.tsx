'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Users, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2,
  Plus,
  ArrowUp,
  ArrowDown,
  Filter,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  DollarSign,
  Star,
  TrendingUp,
  UserCheck,
  UserX
} from 'lucide-react'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  status: 'active' | 'inactive'
  totalOrders: number
  totalSpent: number
  lastOrder: string
  registeredAt: string
  location: {
    city: string
    state: string
  }
  loyaltyPoints: number
  averageRating: number
}

type SortKey = 'name' | 'totalSpent' | 'totalOrders' | 'registeredAt' | 'lastOrder'
type SortDirection = 'asc' | 'desc'

export default function AdminCustomersPage() {
  const [customers] = useState<Customer[]>([
    {
      id: '1',
      name: 'Ana Carolina Silva',
      email: 'ana.silva@email.com',
      phone: '+55 11 99999-9999',
      status: 'active',
      totalOrders: 12,
      totalSpent: 45230.50,
      lastOrder: '2024-01-15T10:30:00Z',
      registeredAt: '2023-06-15T09:00:00Z',
      location: {
        city: 'São Paulo',
        state: 'SP'
      },
      loyaltyPoints: 4523,
      averageRating: 4.8
    },
    {
      id: '2',
      name: 'Roberto Santos',
      email: 'roberto.santos@email.com',
      phone: '+55 11 88888-8888',
      status: 'active',
      totalOrders: 8,
      totalSpent: 32150.00,
      lastOrder: '2024-01-15T08:15:00Z',
      registeredAt: '2023-08-20T14:30:00Z',
      location: {
        city: 'São Paulo',
        state: 'SP'
      },
      loyaltyPoints: 3215,
      averageRating: 4.6
    },
    {
      id: '3',
      name: 'Maria Oliveira',
      email: 'maria.oliveira@email.com',
      phone: '+55 21 77777-7777',
      status: 'active',
      totalOrders: 15,
      totalSpent: 67890.25,
      lastOrder: '2024-01-14T16:45:00Z',
      registeredAt: '2023-03-10T11:20:00Z',
      location: {
        city: 'Rio de Janeiro',
        state: 'RJ'
      },
      loyaltyPoints: 6789,
      averageRating: 4.9
    },
    {
      id: '4',
      name: 'João Pereira',
      email: 'joao.pereira@email.com',
      phone: '+55 21 66666-6666',
      status: 'active',
      totalOrders: 3,
      totalSpent: 12450.75,
      lastOrder: '2024-01-14T14:20:00Z',
      registeredAt: '2023-11-05T16:45:00Z',
      location: {
        city: 'Rio de Janeiro',
        state: 'RJ'
      },
      loyaltyPoints: 1245,
      averageRating: 4.2
    },
    {
      id: '5',
      name: 'Carla Mendes',
      email: 'carla.mendes@email.com',
      phone: '+55 85 55555-5555',
      status: 'inactive',
      totalOrders: 1,
      totalSpent: 2999.99,
      lastOrder: '2023-12-20T10:00:00Z',
      registeredAt: '2023-12-15T08:30:00Z',
      location: {
        city: 'Fortaleza',
        state: 'CE'
      },
      loyaltyPoints: 299,
      averageRating: 5.0
    },
    {
      id: '6',
      name: 'Fernando Costa',
      email: 'fernando.costa@email.com',
      phone: '+55 31 44444-4444',
      status: 'active',
      totalOrders: 22,
      totalSpent: 89520.40,
      lastOrder: '2024-01-13T12:00:00Z',
      registeredAt: '2023-01-20T10:15:00Z',
      location: {
        city: 'Belo Horizonte',
        state: 'MG'
      },
      loyaltyPoints: 8952,
      averageRating: 4.7
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [sortKey, setSortKey] = useState<SortKey>('totalSpent')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  const statuses = ['all', 'active', 'inactive']

  const filteredAndSortedCustomers = useMemo(() => {
    let filtered = customers.filter(customer => 
      (customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
       customer.phone.includes(searchTerm)) &&
      (statusFilter === 'all' || customer.status === statusFilter)
    )

    return filtered.sort((a, b) => {
      let aValue, bValue
      
      switch (sortKey) {
        case 'name':
          aValue = a.name
          bValue = b.name
          break
        case 'registeredAt':
        case 'lastOrder':
          aValue = new Date(a[sortKey]).getTime()
          bValue = new Date(b[sortKey]).getTime()
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
  }, [customers, searchTerm, statusFilter, sortKey, sortDirection])

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
      year: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      case 'inactive':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo'
      case 'inactive':
        return 'Inativo'
      default:
        return status
    }
  }

  const getCustomerTier = (totalSpent: number) => {
    if (totalSpent >= 50000) return { tier: 'VIP', color: 'text-purple-400' }
    if (totalSpent >= 20000) return { tier: 'Gold', color: 'text-yellow-400' }
    if (totalSpent >= 5000) return { tier: 'Silver', color: 'text-gray-300' }
    return { tier: 'Bronze', color: 'text-amber-600' }
  }

  // Estatísticas
  const totalCustomers = customers.length
  const activeCustomers = customers.filter(c => c.status === 'active').length
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0)
  const avgCustomerValue = totalRevenue / totalCustomers

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Clientes</h1>
          <p className="text-gray-300 mt-1">Gerencie sua base de clientes</p>
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
            className="flex items-center space-x-2 bg-gradient-to-r from-[#0E7466] to-[#0C6157] text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Cliente</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: 'Total de Clientes',
            value: totalCustomers,
            icon: Users,
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-500/10'
          },
          {
            title: 'Clientes Ativos',
            value: activeCustomers,
            icon: UserCheck,
            color: 'from-emerald-500 to-emerald-600',
            bgColor: 'bg-emerald-500/10'
          },
          {
            title: 'Receita Total',
            value: formatCurrency(totalRevenue),
            icon: DollarSign,
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-500/10'
          },
          {
            title: 'Valor Médio',
            value: formatCurrency(avgCustomerValue),
            icon: TrendingUp,
            color: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-500/10'
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
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Pesquisar por nome, email ou telefone..."
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
        </div>
      </motion.div>

      {/* Customers Table */}
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
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Cliente</span>
                    {sortKey === 'name' && (
                      sortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="text-left p-4 text-gray-300 font-medium">Contato</th>
                <th className="text-left p-4 text-gray-300 font-medium">Localização</th>
                <th 
                  className="text-left p-4 text-gray-300 font-medium cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('totalOrders')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Pedidos</span>
                    {sortKey === 'totalOrders' && (
                      sortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="text-left p-4 text-gray-300 font-medium cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('totalSpent')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Total Gasto</span>
                    {sortKey === 'totalSpent' && (
                      sortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="text-left p-4 text-gray-300 font-medium cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('lastOrder')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Último Pedido</span>
                    {sortKey === 'lastOrder' && (
                      sortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="text-left p-4 text-gray-300 font-medium">Status</th>
                <th className="text-left p-4 text-gray-300 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedCustomers.map((customer, index) => {
                const tier = getCustomerTier(customer.totalSpent)
                return (
                  <motion.tr
                    key={customer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-all"
                  >
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#0E7466] to-[#0C6157] flex items-center justify-center text-white text-sm font-medium">
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-white font-medium text-sm">{customer.name}</h4>
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs font-medium ${tier.color}`}>
                              {tier.tier}
                            </span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-gray-400 text-xs">{customer.averageRating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-300 text-sm">{customer.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-300 text-sm">{customer.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-300 text-sm">
                          {customer.location.city}, {customer.location.state}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-1">
                        <ShoppingBag className="w-4 h-4 text-blue-400" />
                        <span className="text-white font-medium">{customer.totalOrders}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <span className="text-white font-bold">{formatCurrency(customer.totalSpent)}</span>
                        <p className="text-gray-400 text-xs">
                          {customer.loyaltyPoints} pontos
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-300 text-sm">{formatDate(customer.lastOrder)}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(customer.status)}`}>
                        {getStatusText(customer.status)}
                      </span>
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

          {filteredAndSortedCustomers.length === 0 && (
            <div className="p-12 text-center">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Nenhum cliente encontrado</h3>
              <p className="text-gray-400">Tente ajustar os filtros ou adicione novos clientes</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
