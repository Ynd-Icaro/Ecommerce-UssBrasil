'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Search, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  ArrowUp,
  ArrowDown,
  Filter,
  ChevronDown,
  Package,
  DollarSign,
  BarChart,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import AdminLayout from '@/components/admin-layout'
import { useAPI } from '@/hooks/use-api'

interface Product {
  id: string
  name: string
  image: string
  category: string
  price: number
  stock: number
  sales: number
  status: string
}

type SortKey = 'name' | 'price' | 'stock' | 'sales'
type SortDirection = 'asc' | 'desc'

export default function AdminProductsPage() {
  const { data: products, loading, update, remove } = useAPI<Product>('products')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('sales')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const sorted = filtered.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return -1
      if (a[sortKey] > b[sortKey]) return 1
      return 0
    })

    if (sortDirection === 'desc') {
      return sorted.reverse()
    }
    return sorted
  }, [products, searchTerm, sortKey, sortDirection])

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDirection('desc')
    }
  }

  const handleDelete = async (productId: string) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      await remove(productId)
    }
  }

  const handleToggleStatus = async (product: Product) => {
    const newStatus = product.status === 'published' ? 'draft' : 'published'
    await update(product.id, { status: newStatus })
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const getStockBadge = (stock: number) => {
    if (stock > 50) {
      return <Badge className="bg-emerald-500/80 text-white border-emerald-600/50"><CheckCircle className="mr-1 h-3 w-3" />Em Estoque</Badge>
    }
    if (stock > 0) {
      return <Badge className="bg-amber-500/80 text-white border-amber-600/50"><AlertTriangle className="mr-1 h-3 w-3" />Estoque Baixo</Badge>
    }
    return <Badge className="bg-red-500/80 text-white border-red-600/50"><AlertTriangle className="mr-1 h-3 w-3" />Fora de Estoque</Badge>
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

  return (
    <AdminLayout>
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 sm:p-6 lg:p-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-8xl mx-auto">
          {/* Header */}
          <motion.header variants={itemVariants} className="mb-8">
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent tracking-tight">
                  Gerenciar Produtos
                </h1>
                <p className="text-gray-600 mt-1">
                  {loading ? 'Carregando...' : `${filteredAndSortedProducts.length} produtos encontrados`}
                </p>
              </div>
              <Button 
                className="bg-gradient-to-r from-[#00CED1] to-[#20B2AA] text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition-transform"
                onClick={() => toast.success('Funcionalidade de adicionar produto em breve!')}
              >
                <Plus className="mr-2 h-5 w-5" />
                Novo Produto
              </Button>
            </div>
          </motion.header>

          {/* Filters and Search */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-4 shadow-lg border border-white/20 flex items-center justify-between">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  placeholder="Buscar por nome ou categoria..."
                  className="w-full pl-12 pr-4 py-3 bg-white/80 border-gray-300/50 rounded-xl focus:ring-2 focus:ring-[#00CED1]/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center space-x-2 rounded-xl border-gray-300/80 hover:bg-white/80">
                      <Filter className="h-4 w-4" />
                      <span>Filtros</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white/80 backdrop-blur-xl border-gray-300/50 rounded-xl shadow-lg">
                    <DropdownMenuItem>Categoria: Smartphones</DropdownMenuItem>
                    <DropdownMenuItem>Categoria: Laptops</DropdownMenuItem>
                    <DropdownMenuItem>Categoria: Wearables</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </motion.div>

          {/* Products Table */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg border border-white/20">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="border-b border-gray-200/50">
                      <tr>
                        <th className="p-6 font-semibold text-gray-600">
                          <button onClick={() => handleSort('name')} className="flex items-center space-x-1">
                            <Package className="h-4 w-4 mr-1" />
                            <span>Produto</span>
                            {sortKey === 'name' && (sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />)}
                          </button>
                        </th>
                        <th className="p-6 font-semibold text-gray-600">
                          <button onClick={() => handleSort('price')} className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4 mr-1" />
                            <span>Preço</span>
                            {sortKey === 'price' && (sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />)}
                          </button>
                        </th>
                        <th className="p-6 font-semibold text-gray-600">
                          <button onClick={() => handleSort('stock')} className="flex items-center space-x-1">
                            <Package className="h-4 w-4 mr-1" />
                            <span>Estoque</span>
                            {sortKey === 'stock' && (sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />)}
                          </button>
                        </th>
                        <th className="p-6 font-semibold text-gray-600">
                          <button onClick={() => handleSort('sales')} className="flex items-center space-x-1">
                            <BarChart className="h-4 w-4 mr-1" />
                            <span>Vendas</span>
                            {sortKey === 'sales' && (sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />)}
                          </button>
                        </th>
                        <th className="p-6 font-semibold text-gray-600">Status</th>
                        <th className="p-6 font-semibold text-gray-600">Ações</th>
                      </tr>
                    </thead>
                    <motion.tbody variants={containerVariants}>
                      {loading ? (
                        <tr>
                          <td colSpan={6} className="p-12 text-center text-gray-500">
                            Carregando produtos...
                          </td>
                        </tr>
                      ) : filteredAndSortedProducts.map(product => (
                        <motion.tr 
                          key={product.id} 
                          className="border-b border-gray-200/50 hover:bg-white/50 transition-colors"
                          variants={itemVariants}
                          layout
                        >
                          <td className="p-6">
                            <div className="flex items-center space-x-4">
                              <Image 
                                src={product.image} 
                                alt={product.name} 
                                width={50} 
                                height={50} 
                                className="rounded-lg object-contain bg-slate-100 p-1"
                              />
                              <div>
                                <div className="font-semibold text-gray-800">{product.name}</div>
                                <div className="text-sm text-gray-500">{product.category}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-6 font-semibold text-gray-800">{formatCurrency(product.price)}</td>
                          <td className="p-6">{getStockBadge(product.stock)}</td>
                          <td className="p-6 text-center text-gray-600">{product.sales}</td>
                          <td className="p-6">
                            <Badge variant={product.status === 'published' ? 'default' : 'outline'} className={product.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                              {product.status === 'published' ? 'Publicado' : 'Rascunho'}
                            </Badge>
                          </td>
                          <td className="p-6">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-200/50">
                                  <MoreHorizontal className="h-5 w-5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-white/80 backdrop-blur-xl border-gray-300/50 rounded-xl shadow-lg">
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" /> Ver Produto
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" /> Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleToggleStatus(product)}>
                                  <Package className="mr-2 h-4 w-4" /> 
                                  {product.status === 'published' ? 'Despublicar' : 'Publicar'}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-500" onClick={() => handleDelete(product.id)}>
                                  <Trash2 className="mr-2 h-4 w-4" /> Excluir
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </motion.tr>
                      ))}
                    </motion.tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </AdminLayout>
  )
}
