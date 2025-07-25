'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Search,
  Users,
  Mail,
  Phone,
  MapPin,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { toast } from 'react-hot-toast'

// Dados mockados para demonstração
const mockCustomers = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(11) 99999-9999',
    city: 'São Paulo',
    state: 'SP',
    orders: 3,
    totalSpent: 25497,
    status: 'active',
    lastOrder: '2024-01-15'
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@email.com',
    phone: '(21) 88888-8888',
    city: 'Rio de Janeiro',
    state: 'RJ',
    orders: 1,
    totalSpent: 10499,
    status: 'active',
    lastOrder: '2024-01-10'
  },
  {
    id: '3',
    name: 'Pedro Costa',
    email: 'pedro@email.com',
    phone: '(31) 77777-7777',
    city: 'Belo Horizonte',
    state: 'MG',
    orders: 5,
    totalSpent: 45690,
    status: 'vip',
    lastOrder: '2024-01-20'
  }
]

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState(mockCustomers)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  )

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'vip':
        return 'bg-purple-100 text-purple-800'
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'vip':
        return 'VIP'
      case 'active':
        return 'Ativo'
      case 'inactive':
        return 'Inativo'
      default:
        return status
    }
  }

  const handleDeleteCustomer = (id: string) => {
    setCustomers(customers.filter(c => c.id !== id))
    toast.success('Cliente removido com sucesso!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
              <p className="text-gray-600 mt-1">Gerencie seus clientes</p>
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
              <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customers.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {customers.filter(c => c.status === 'active').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes VIP</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {customers.filter(c => c.status === 'vip').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatPrice(customers.reduce((total, c) => total + c.totalSpent, 0))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar clientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Customers Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-900">Cliente</th>
                    <th className="text-left p-4 font-medium text-gray-900">Contato</th>
                    <th className="text-left p-4 font-medium text-gray-900">Localização</th>
                    <th className="text-left p-4 font-medium text-gray-900">Pedidos</th>
                    <th className="text-left p-4 font-medium text-gray-900">Total Gasto</th>
                    <th className="text-left p-4 font-medium text-gray-900">Status</th>
                    <th className="text-left p-4 font-medium text-gray-900">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <h3 className="font-medium text-gray-900">{customer.name}</h3>
                          <p className="text-sm text-gray-500">Último pedido: {customer.lastOrder}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="h-4 w-4 mr-2" />
                            {customer.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="h-4 w-4 mr-2" />
                            {customer.phone}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          {customer.city}, {customer.state}
                        </div>
                      </td>
                      <td className="p-4 font-medium text-gray-900">
                        {customer.orders}
                      </td>
                      <td className="p-4 font-medium text-gray-900">
                        {formatPrice(customer.totalSpent)}
                      </td>
                      <td className="p-4">
                        <Badge className={getStatusColor(customer.status)}>
                          {getStatusText(customer.status)}
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
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteCustomer(customer.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredCustomers.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum cliente encontrado
                </h3>
                <p className="text-gray-500">
                  Tente ajustar a busca ou aguarde novos cadastros.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
