'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Users, 
  Mail, 
  Phone, 
  MapPin, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  ArrowUp,
  ArrowDown,
  Star,
  Calendar
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import AdminLayout from '@/components/admin-layout'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAdminCrud, Customer } from '@/hooks/use-admin-crud'
import { CustomerModal } from '@/components/admin/CustomerModal'

type SortKey = 'name' | 'totalOrders' | 'totalSpent' | 'createdAt'
type SortDirection = 'asc' | 'desc'

export default function AdminCustomersPage() {
  const { items: customers, loading, create, update, remove } = useAdminCrud<Customer>('customers')
  const [searchTerm, setSearchTerm] = useState('')
  const [vipFilter, setVipFilter] = useState<string>('all')
  const [sortKey, setSortKey] = useState<SortKey>('createdAt')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>()
  
  // Delete confirmation
  const [deleteCustomerId, setDeleteCustomerId] = useState<string | null>(null)

  const filteredAndSortedCustomers = useMemo(() => {
    let filtered = customers.filter(customer => {
      const matchesSearch = 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (customer.phone && customer.phone.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesVip = vipFilter === 'all' || 
        (vipFilter === 'vip' && customer.isVip) ||
        (vipFilter === 'regular' && !customer.isVip)
      
      return matchesSearch && matchesVip
    })

    const sorted = filtered.sort((a, b) => {
      let aValue: any, bValue: any
      
      switch (sortKey) {
        case 'name':
          aValue = a.name
          bValue = b.name
          break
        case 'totalOrders':
          aValue = a.totalOrders
          bValue = b.totalOrders
          break
        case 'totalSpent':
          aValue = a.totalSpent
          bValue = b.totalSpent
          break
        case 'createdAt':
          aValue = new Date(a.createdAt).getTime()
          bValue = new Date(b.createdAt).getTime()
          break
        default:
          return 0
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

    return sorted
  }, [customers, searchTerm, vipFilter, sortKey, sortDirection])

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDirection('desc')
    }
  }

  const handleCreate = () => {
    setSelectedCustomer(undefined)
    setModalMode('create')
    setIsModalOpen(true)
  }

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer)
    setModalMode('edit')
    setIsModalOpen(true)
  }

  const handleView = (customer: Customer) => {
    setSelectedCustomer(customer)
    setModalMode('view')
    setIsModalOpen(true)
  }

  const handleDelete = (customerId: string) => {
    setDeleteCustomerId(customerId)
  }

  const confirmDelete = async () => {
    if (deleteCustomerId) {
      await remove(deleteCustomerId)
      setDeleteCustomerId(null)
    }
  }

  const handleSave = async (customerData: any) => {
    if (modalMode === 'create') {
      await create(customerData)
    } else if (modalMode === 'edit' && selectedCustomer) {
      await update(selectedCustomer.id, customerData)
    }
  }

  const handleToggleVip = async (customer: Customer) => {
    await update(customer.id, { isVip: !customer.isVip })
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

  const springTransition = { type: "spring" as const, stiffness: 200, damping: 25 }
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: springTransition }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
            <p className="text-muted-foreground">
              Gerencie todos os clientes do sistema
            </p>
          </div>
          <Button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Novo Cliente
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por nome, email ou telefone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={vipFilter} onValueChange={setVipFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Clientes</SelectItem>
                  <SelectItem value="vip">Clientes VIP</SelectItem>
                  <SelectItem value="regular">Clientes Regulares</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Customers Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Clientes ({filteredAndSortedCustomers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div 
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Table Header */}
              <div className="grid grid-cols-6 gap-4 font-medium text-sm text-muted-foreground pb-2 border-b">
                <button 
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-1 hover:text-foreground"
                >
                  Cliente
                  {sortKey === 'name' && (
                    sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                  )}
                </button>
                <div>Contato</div>
                <div>Status</div>
                <button 
                  onClick={() => handleSort('totalOrders')}
                  className="flex items-center gap-1 hover:text-foreground"
                >
                  Pedidos
                  {sortKey === 'totalOrders' && (
                    sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                  )}
                </button>
                <button 
                  onClick={() => handleSort('totalSpent')}
                  className="flex items-center gap-1 hover:text-foreground"
                >
                  Total Gasto
                  {sortKey === 'totalSpent' && (
                    sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                  )}
                </button>
                <div>Ações</div>
              </div>

              {/* Table Rows */}
              {filteredAndSortedCustomers.map((customer) => (
                <motion.div
                  key={customer.id}
                  variants={itemVariants}
                  className="grid grid-cols-6 gap-4 items-center py-4 border-b border-gray-100 hover:bg-gray-50 rounded-lg px-2"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={customer.avatar} />
                      <AvatarFallback>
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Cliente desde {formatDate(customer.createdAt)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-500" />
                      {customer.email}
                    </div>
                    {customer.phone && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4 text-gray-500" />
                        {customer.phone}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {customer.isVip ? (
                      <Badge className="bg-yellow-500 hover:bg-yellow-600">
                        <Star className="mr-1 h-3 w-3" />
                        VIP
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Regular</Badge>
                    )}
                  </div>

                  <div className="text-center">
                    <div className="font-semibold">{customer.totalOrders}</div>
                    {customer.lastOrderDate && (
                      <div className="text-xs text-muted-foreground">
                        Último: {formatDate(customer.lastOrderDate)}
                      </div>
                    )}
                  </div>

                  <div className="font-semibold text-green-600">
                    {formatCurrency(customer.totalSpent)}
                  </div>

                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleView(customer)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(customer)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleVip(customer)}>
                          <Star className="mr-2 h-4 w-4" />
                          {customer.isVip ? 'Remover VIP' : 'Tornar VIP'}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(customer.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </motion.div>
              ))}

              {filteredAndSortedCustomers.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhum cliente encontrado
                </div>
              )}
            </motion.div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Modal */}
      <CustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        customer={selectedCustomer}
        onSave={handleSave}
        mode={modalMode}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteCustomerId} onOpenChange={() => setDeleteCustomerId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  )
}
