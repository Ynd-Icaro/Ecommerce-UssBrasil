'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Search,
  Package,
  Calendar,
  User,
  MapPin,
  MoreHorizontal,
  Eye,
  Edit,
  Truck
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

// Dados mockados para demonstração
const mockOrders = [
  {
    id: '1001',
    customer: 'João Silva',
    email: 'joao@email.com',
    total: 10499,
    status: 'pending',
    date: '2024-01-15',
    items: 2,
    address: 'São Paulo, SP'
  },
  {
    id: '1002',
    customer: 'Maria Santos',
    email: 'maria@email.com',
    total: 7499,
    status: 'processing',
    date: '2024-01-14',
    items: 1,
    address: 'Rio de Janeiro, RJ'
  },
  {
    id: '1003',
    customer: 'Pedro Costa',
    email: 'pedro@email.com',
    total: 15999,
    status: 'shipped',
    date: '2024-01-13',
    items: 3,
    address: 'Belo Horizonte, MG'
  },
  {
    id: '1004',
    customer: 'Ana Oliveira',
    email: 'ana@email.com',
    total: 3499,
    status: 'delivered',
    date: '2024-01-12',
    items: 1,
    address: 'Salvador, BA'
  }
]

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(mockOrders)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('Todos')

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.includes(searchTerm) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'Todos' || order.status === selectedStatus
    
    return matchesSearch && matchesStatus
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-purple-100 text-purple-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendente'
      case 'processing':
        return 'Processando'
      case 'shipped':
        return 'Enviado'
      case 'delivered':
        return 'Entregue'
      case 'cancelled':
        return 'Cancelado'
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Pedidos</h1>
              <p className="text-gray-600 mt-1">Gerencie todos os pedidos</p>
            </div>
            <Link href="/admin">
              <Button variant="outline">
                Voltar ao Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Pedidos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders.filter(o => o.status === 'pending').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enviados</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders.filter(o => o.status === 'shipped').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatPrice(orders.reduce((total, o) => total + o.total, 0))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar pedidos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">Todos</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="processing">Processando</SelectItem>
                  <SelectItem value="shipped">Enviado</SelectItem>
                  <SelectItem value="delivered">Entregue</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-900">Pedido</th>
                    <th className="text-left p-4 font-medium text-gray-900">Cliente</th>
                    <th className="text-left p-4 font-medium text-gray-900">Data</th>
                    <th className="text-left p-4 font-medium text-gray-900">Items</th>
                    <th className="text-left p-4 font-medium text-gray-900">Total</th>
                    <th className="text-left p-4 font-medium text-gray-900">Status</th>
                    <th className="text-left p-4 font-medium text-gray-900">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <h3 className="font-medium text-gray-900">#{order.id}</h3>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {order.address}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="font-medium text-gray-900">{order.customer}</span>
                          </div>
                          <p className="text-sm text-gray-500">{order.email}</p>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600">
                        {order.date}
                      </td>
                      <td className="p-4 font-medium text-gray-900">
                        {order.items} item{order.items > 1 ? 's' : ''}
                      </td>
                      <td className="p-4 font-medium text-gray-900">
                        {formatPrice(order.total)}
                      </td>
                      <td className="p-4">
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusText(order.status)}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar Status
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Truck className="h-4 w-4 mr-2" />
                              Rastrear
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum pedido encontrado
                </h3>
                <p className="text-gray-500">
                  Tente ajustar os filtros ou aguarde novos pedidos.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
