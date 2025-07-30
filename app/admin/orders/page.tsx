'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Package, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 
  ArrowUp,
  ArrowDown,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Plus
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
import { useAdminCrud, Order } from '@/hooks/use-admin-crud'
import { OrderModal } from '@/components/admin/OrderModal'

type SortKey = 'number' | 'total' | 'createdAt'
type SortDirection = 'asc' | 'desc'

export default function ProdutosPage() {
  const { items: orders, loading, create, update, remove } = useAdminCrud<Order>('orders')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [sortKey, setSortKey] = useState<SortKey>('createdAt')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create')
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>()
  
  // Delete confirmation
  const [deleteOrderId, setDeleteOrderId] = useState<string | null>(null)

  const filteredAndSortedOrders = useMemo(() => {
    let filtered = orders.filter(order => {
      const matchesSearch = 
        order.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter
      
      return matchesSearch && matchesStatus
    })

    const sorted = filtered.sort((a, b) => {
      let aValue: any, bValue: any
      
      switch (sortKey) {
        case 'number':
          aValue = a.number
          bValue = b.number
          break
        case 'total':
          aValue = a.total
          bValue = b.total
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
  }, [orders, searchTerm, statusFilter, sortKey, sortDirection])

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDirection('desc')
    }
  }

  const handleCreate = () => {
    setSelectedOrder(undefined)
    setModalMode('create')
    setIsModalOpen(true)
  }

  const handleEdit = (order: Order) => {
    setSelectedOrder(order)
    setModalMode('edit')
    setIsModalOpen(true)
  }

  const handleView = (order: Order) => {
    setSelectedOrder(order)
    setModalMode('view')
    setIsModalOpen(true)
  }

  const handleDelete = (orderId: string) => {
    setDeleteOrderId(orderId)
  }

  const confirmDelete = async () => {
    if (deleteOrderId) {
      await remove(deleteOrderId)
      setDeleteOrderId(null)
    }
  }

  const handleSave = async (orderData: any) => {
    if (modalMode === 'create') {
      await create(orderData)
    } else if (modalMode === 'edit' && selectedOrder) {
      await update(selectedOrder.id, orderData)
    }
  }

  const handleStatusChange = async (order: Order, newStatus: Order['status']) => {
    await update(order.id, { status: newStatus })
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

  const getStatusComponent = (status: Order['status']) => {
    const styles: { [key in Order['status']]: string } = {
      pending: 'bg-amber-500/80 text-white border-amber-600/50',
      processing: 'bg-blue-500/80 text-white border-blue-600/50',
      shipped: 'bg-purple-500/80 text-white border-purple-600/50',
      delivered: 'bg-emerald-500/80 text-white border-emerald-600/50',
      cancelled: 'bg-red-500/80 text-white border-red-600/50',
    }
    
    const icons: { [key in Order['status']]: React.ReactNode } = {
      pending: <Clock className="mr-2 h-4 w-4" />,
      processing: <Package className="mr-2 h-4 w-4" />,
      shipped: <Truck className="mr-2 h-4 w-4" />,
      delivered: <CheckCircle className="mr-2 h-4 w-4" />,
      cancelled: <XCircle className="mr-2 h-4 w-4" />,
    }
    
    const text: { [key in Order['status']]: string } = {
      pending: 'Pendente',
      processing: 'Processando',
      shipped: 'Enviado',
      delivered: 'Entregue',
      cancelled: 'Cancelado',
    }
    
    return (
      <Badge className={`text-xs font-semibold border flex items-center ${styles[status]}`}>
        {icons[status]}
        {text[status]}
      </Badge>
    )
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
            <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
            <p className="text-muted-foreground">
              Gerencie todos os pedidos do sistema
            </p>
          </div>
          <Button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Novo Pedido
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por número do pedido, cliente ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filtrar por status" />
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
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Pedidos ({filteredAndSortedOrders.length})
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
                  onClick={() => handleSort('number')}
                  className="flex items-center gap-1 hover:text-foreground"
                >
                  Pedido
                  {sortKey === 'number' && (
                    sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                  )}
                </button>
                <div>Cliente</div>
                <div>Status</div>
                <div>Itens</div>
                <button 
                  onClick={() => handleSort('total')}
                  className="flex items-center gap-1 hover:text-foreground"
                >
                  Total
                  {sortKey === 'total' && (
                    sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                  )}
                </button>
                <div>Ações</div>
              </div>

              {/* Table Rows */}
              {filteredAndSortedOrders.map((order) => (
                <motion.div
                  key={order.id}
                  variants={itemVariants}
                  className="grid grid-cols-6 gap-4 items-center py-4 border-b border-gray-100 hover:bg-gray-50 rounded-lg px-2"
                >
                  <div>
                    <div className="font-medium">{order.number}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(order.createdAt)}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={order.customer.avatar} />
                      <AvatarFallback>
                        {order.customer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{order.customer.name}</div>
                      <div className="text-xs text-muted-foreground">{order.customer.email}</div>
                    </div>
                  </div>

                  <div>
                    <Select 
                      value={order.status} 
                      onValueChange={(value) => handleStatusChange(order, value as Order['status'])}
                    >
                      <SelectTrigger className="w-auto border-none p-0 h-auto">
                        <SelectValue>{getStatusComponent(order.status)}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pendente</SelectItem>
                        <SelectItem value="processing">Processando</SelectItem>
                        <SelectItem value="shipped">Enviado</SelectItem>
                        <SelectItem value="delivered">Entregue</SelectItem>
                        <SelectItem value="cancelled">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="text-sm">
                    {order.items.length} {order.items.length === 1 ? 'item' : 'itens'}
                  </div>

                  <div className="font-semibold text-green-600">
                    {formatCurrency(order.total)}
                  </div>

                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleView(order)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(order)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(order.id)}
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

              {filteredAndSortedOrders.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhum pedido encontrado
                </div>
              )}
            </motion.div>
          </CardContent>
        </Card>
      </div>

      {/* Order Modal */}
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
        onSave={handleSave}
        mode={modalMode}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteOrderId} onOpenChange={() => setDeleteOrderId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este pedido? Esta ação não pode ser desfeita.
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
