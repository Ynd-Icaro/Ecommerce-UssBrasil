'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  ShoppingCart,
  MoreHorizontal,
  X,
  UserPlus,
  Star,
  Users,
  Activity,
  TrendingUp,
  Clock,
  Package
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

interface Customer {
  id: number
  name: string
  email: string
  phone: string
  status: 'active' | 'inactive' | 'blocked'
  type: 'vip' | 'regular' | 'new'
  location: string
  registrationDate: string
  lastActivity: string
  totalOrders: number
  totalSpent: number
  avatar?: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  preferences: {
    newsletter: boolean
    notifications: boolean
    language: string
  }
}

interface CustomerStats {
  total: number
  active: number
  vip: number
  newThisMonth: number
}

const statusConfig = {
  active: { label: 'Ativo', class: 'bg-green-100 text-green-800' },
  inactive: { label: 'Inativo', class: 'bg-gray-100 text-gray-800' },
  blocked: { label: 'Bloqueado', class: 'bg-red-100 text-red-800' }
}

const typeConfig = {
  vip: { label: 'VIP', class: 'bg-purple-100 text-purple-800' },
  regular: { label: 'Regular', class: 'bg-blue-100 text-blue-800' },
  new: { label: 'Novo', class: 'bg-green-100 text-green-800' }
}

export default function CustomersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([])
  const [stats, setStats] = useState<CustomerStats>({ total: 0, active: 0, vip: 0, newThisMonth: 0 })
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    if (!session || session.user?.role !== 'admin') {
      router.push('/login')
      return
    }
  }, [session, status, router])

  useEffect(() => {
    loadCustomers()
  }, [])

  const loadCustomers = async () => {
    try {
      // Simulando dados de clientes
      const mockCustomers: Customer[] = [
        {
          id: 1,
          name: 'João Silva',
          email: 'joao.silva@email.com',
          phone: '+55 11 99999-1111',
          status: 'active',
          type: 'vip',
          location: 'São Paulo, SP',
          registrationDate: '2023-01-15',
          lastActivity: '2024-01-20',
          totalOrders: 15,
          totalSpent: 12500.00,
          avatar: '/avatars/joao.jpg',
          address: {
            street: 'Rua das Flores, 123',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01234-567',
            country: 'Brasil'
          },
          preferences: {
            newsletter: true,
            notifications: true,
            language: 'pt-BR'
          }
        },
        {
          id: 2,
          name: 'Maria Santos',
          email: 'maria.santos@email.com',
          phone: '+55 21 88888-2222',
          status: 'active',
          type: 'regular',
          location: 'Rio de Janeiro, RJ',
          registrationDate: '2023-03-20',
          lastActivity: '2024-01-18',
          totalOrders: 8,
          totalSpent: 5400.00,
          address: {
            street: 'Av. Copacabana, 456',
            city: 'Rio de Janeiro',
            state: 'RJ',
            zipCode: '22000-123',
            country: 'Brasil'
          },
          preferences: {
            newsletter: true,
            notifications: false,
            language: 'pt-BR'
          }
        },
        {
          id: 3,
          name: 'Carlos Oliveira',
          email: 'carlos.oliveira@email.com',
          phone: '+55 31 77777-3333',
          status: 'inactive',
          type: 'new',
          location: 'Belo Horizonte, MG',
          registrationDate: '2024-01-10',
          lastActivity: '2024-01-12',
          totalOrders: 2,
          totalSpent: 1200.00,
          address: {
            street: 'Rua da Liberdade, 789',
            city: 'Belo Horizonte',
            state: 'MG',
            zipCode: '30000-456',
            country: 'Brasil'
          },
          preferences: {
            newsletter: false,
            notifications: true,
            language: 'pt-BR'
          }
        }
      ]
      
      setCustomers(mockCustomers)
    } catch (error) {
      console.error('Erro ao carregar clientes:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterCustomers = useCallback(() => {
    let filtered = customers

    if (searchTerm) {
      filtered = filtered.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm) ||
        customer.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(customer => customer.status === statusFilter)
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(customer => customer.type === typeFilter)
    }

    setFilteredCustomers(filtered)
  }, [customers, searchTerm, statusFilter, typeFilter])

  const calculateStats = useCallback(() => {
    const total = customers.length
    const active = customers.filter(c => c.status === 'active').length
    const vip = customers.filter(c => c.type === 'vip').length
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const newThisMonth = customers.filter(c => {
      const regDate = new Date(c.registrationDate)
      return regDate.getMonth() === currentMonth && regDate.getFullYear() === currentYear
    }).length

    setStats({ total, active, vip, newThisMonth })
  }, [customers])

  // Effect to trigger filtering and stats calculation
  useEffect(() => {
    filterCustomers()
    calculateStats()
  }, [customers, searchTerm, statusFilter, typeFilter, filterCustomers, calculateStats])

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

  const CustomerDetailsModal = ({ customer }: { customer: Customer | null }) => {
    if (!customer) return null

    return (
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={customer.avatar} />
                <AvatarFallback className="bg-[#00CED1] text-white text-lg">
                  {getInitials(customer.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{customer.name}</h3>
                <p className="text-gray-600 mt-1">{customer.email}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge className={statusConfig[customer.status].class}>
                    {statusConfig[customer.status].label}
                  </Badge>
                  <Badge className={typeConfig[customer.type].class}>
                    {typeConfig[customer.type].label}
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
            <TabsTrigger value="orders">Pedidos</TabsTrigger>
            <TabsTrigger value="address">Endereço</TabsTrigger>
            <TabsTrigger value="preferences">Preferências</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <ShoppingCart className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{customer.totalOrders}</p>
                      <p className="text-sm text-gray-600">Total de Pedidos</p>
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
                      <p className="text-2xl font-bold text-gray-900">{formatCurrency(customer.totalSpent)}</p>
                      <p className="text-sm text-gray-600">Total Gasto</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {customer.totalOrders > 0 ? formatCurrency(customer.totalSpent / customer.totalOrders) : 'R$ 0,00'}
                      </p>
                      <p className="text-sm text-gray-600">Ticket Médio</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informações Pessoais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{customer.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{customer.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{customer.location}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Cliente desde {formatDate(customer.registrationDate)}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Activity className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Última atividade: {formatDate(customer.lastActivity)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Atividade Recente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <ShoppingCart className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Pedido #1234 realizado</p>
                        <p className="text-xs text-gray-600">Há 2 dias</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Eye className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Visualizou iPhone 16 Pro</p>
                        <p className="text-xs text-gray-600">Há 1 semana</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Star className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Avaliou MacBook Pro</p>
                        <p className="text-xs text-gray-600">Há 2 semanas</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Histórico de Pedidos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: '1234', date: '2024-01-20', status: 'Entregue', value: 2500.00 },
                    { id: '1235', date: '2024-01-15', status: 'Em trânsito', value: 1800.00 },
                    { id: '1236', date: '2024-01-10', status: 'Processando', value: 950.00 }
                  ].map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">Pedido #{order.id}</p>
                        <p className="text-sm text-gray-600">{formatDate(order.date)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(order.value)}</p>
                        <Badge variant="outline">{order.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="address" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Endereço de Entrega</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-gray-900">{customer.address.street}</p>
                  <p className="text-gray-600">{customer.address.city}, {customer.address.state}</p>
                  <p className="text-gray-600">CEP: {customer.address.zipCode}</p>
                  <p className="text-gray-600">{customer.address.country}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Preferências do Cliente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Newsletter</span>
                  <Badge className={customer.preferences.newsletter ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {customer.preferences.newsletter ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Notificações</span>
                  <Badge className={customer.preferences.notifications ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {customer.preferences.notifications ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Idioma</span>
                  <span className="text-sm font-medium">{customer.preferences.language}</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
          <Button variant="outline" size="sm">
            <Mail className="h-4 w-4 mr-2" />
            Enviar Email
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Editar Cliente
          </Button>
          <Button variant="destructive" size="sm">
            <Trash2 className="h-4 w-4 mr-2" />
            Bloquear Cliente
          </Button>
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
            <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
            <p className="text-gray-600 mt-1">Gerencie todos os clientes da sua loja</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Button className="bg-gradient-to-r from-[#00CED1] to-[#20B2AA] hover:from-[#20B2AA] hover:to-[#00CED1]">
              <UserPlus className="h-4 w-4 mr-2" />
              Novo Cliente
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  <p className="text-sm text-gray-600">Total de Clientes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Activity className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
                  <p className="text-sm text-gray-600">Clientes Ativos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Star className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.vip}</p>
                  <p className="text-sm text-gray-600">Clientes VIP</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.newThisMonth}</p>
                  <p className="text-sm text-gray-600">Novos este mês</p>
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
                  placeholder="Buscar por nome, email, telefone ou localização..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-[#00CED1]"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                  <SelectItem value="blocked">Bloqueado</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Tipos</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                  <SelectItem value="regular">Regular</SelectItem>
                  <SelectItem value="new">Novo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Customers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCustomers.map((customer, index) => (
              <div
                key={customer.id}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                      onClick={() => {
                        setSelectedCustomer(customer)
                        setIsModalOpen(true)
                      }}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={customer.avatar} />
                          <AvatarFallback className="bg-[#00CED1] text-white">
                            {getInitials(customer.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-[#00CED1] transition-colors">
                            {customer.name}
                          </h3>
                          <p className="text-sm text-gray-600">{customer.email}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="h-4 w-4 mr-2" />
                            Enviar Email
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Badge className={statusConfig[customer.status].class}>
                          {statusConfig[customer.status].label}
                        </Badge>
                        <Badge className={typeConfig[customer.type].class}>
                          {typeConfig[customer.type].label}
                        </Badge>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4" />
                          <span>{customer.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{customer.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>Cliente desde {formatDate(customer.registrationDate)}</span>
                        </div>
                      </div>

                      <Separator />

                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{customer.totalOrders}</p>
                          <p className="text-xs text-gray-600">Pedidos</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-[#00CED1]">{formatCurrency(customer.totalSpent)}</p>
                          <p className="text-xs text-gray-600">Gasto Total</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
        </div>

        {filteredCustomers.length === 0 && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12">
              <div className="text-center">
                <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum cliente encontrado</h3>
                <p className="text-gray-600 mb-6">Tente ajustar os filtros ou adicionar um novo cliente.</p>
                <Button className="bg-gradient-to-r from-[#00CED1] to-[#20B2AA]">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Adicionar Primeiro Cliente
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Customer Details Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <CustomerDetailsModal customer={selectedCustomer} />
        </Dialog>
      </div>
    </AdminLayout>
  )
}
