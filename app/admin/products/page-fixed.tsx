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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import AdminLayout from '@/components/admin-layout'
import { useProducts } from '@/hooks/use-ussbrasil'
import { Product } from '@/types'
import { useProductDatabase } from '@/lib/use-products-database'

type SortKey = 'name' | 'price' | 'stock' | 'sales'
type SortDirection = 'asc' | 'desc'

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    brand: '',
    image: '',
    stock: ''
  })

  const { products, loading, error } = useProducts()
  const database = useProductDatabase()

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      
      const hasStock = product.stock > 0
      const matchesStatus = selectedStatus === 'all' || 
                          (selectedStatus === 'in-stock' && hasStock) ||
                          (selectedStatus === 'out-of-stock' && !hasStock)
      
      return matchesSearch && matchesCategory && matchesStatus
    })

    // Sort products
    filtered.sort((a, b) => {
      let aValue: any, bValue: any
      
      switch (sortKey) {
        case 'name':
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
        case 'price':
          aValue = a.price || 0
          bValue = b.price || 0
          break
        case 'stock':
          aValue = a.stock || 0
          bValue = b.stock || 0
          break
        case 'sales':
          aValue = a.sales || 0
          bValue = b.sales || 0
          break
        default:
          return 0
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

    return filtered
  }, [products, searchTerm, selectedCategory, selectedStatus, sortKey, sortDirection])

  // Get unique categories
  const categories = useMemo(() => {
    const categorySet = new Set(products.map(p => p.category))
    return Array.from(categorySet)
  }, [products])

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
  }

  const handleAddProduct = async () => {
    try {
      if (!newProduct.name || !newProduct.price) {
        toast.error('Nome e preço são obrigatórios')
        return
      }

      const productData = {
        id: Date.now().toString(),
        name: newProduct.name,
        description: newProduct.description,
        price: parseFloat(newProduct.price) || 0,
        originalPrice: parseFloat(newProduct.originalPrice) || undefined,
        category: newProduct.category,
        brand: newProduct.brand,
        image: newProduct.image || '/placeholder.png',
        images: {
          main: newProduct.image || '/placeholder.png',
          gallery: []
        },
        stock: parseInt(newProduct.stock) || 0,
        featured: false,
        rating: 0,
        reviews: 0,
        sales: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      // Em um app real, você salvaria no banco de dados
      toast.success('Produto adicionado com sucesso!')
      setIsAddModalOpen(false)
      setNewProduct({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        category: '',
        brand: '',
        image: '',
        stock: ''
      })
    } catch (error) {
      toast.error('Erro ao adicionar produto')
      console.error(error)
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    try {
      // Em um app real, você faria uma chamada para a API
      toast.success('Produto removido com sucesso!')
    } catch (error) {
      toast.error('Erro ao remover produto')
      console.error(error)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const getStockStatus = (stock: number) => {
    if (stock === 0) {
      return { status: 'Esgotado', color: 'text-red-600 bg-red-50', icon: AlertTriangle }
    } else if (stock < 10) {
      return { status: 'Baixo', color: 'text-yellow-600 bg-yellow-50', icon: AlertTriangle }
    } else {
      return { status: 'Disponível', color: 'text-green-600 bg-green-50', icon: CheckCircle }
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#00CED1]"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
            <p className="text-gray-600 mt-1">Gerencie seu catálogo de produtos</p>
          </div>
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="mt-4 sm:mt-0 bg-[#00CED1] hover:bg-[#00B8CC]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Produto
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar produtos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="in-stock">Em estoque</SelectItem>
                  <SelectItem value="out-of-stock">Esgotado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-700">Produto</th>
                    <th className="text-left p-4 font-medium text-gray-700">
                      <button
                        onClick={() => handleSort('price')}
                        className="flex items-center space-x-1 hover:text-[#00CED1]"
                      >
                        <span>Preço</span>
                        {sortKey === 'price' && (
                          sortDirection === 'asc' ? 
                          <ArrowUp className="h-4 w-4" /> : 
                          <ArrowDown className="h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th className="text-left p-4 font-medium text-gray-700">
                      <button
                        onClick={() => handleSort('stock')}
                        className="flex items-center space-x-1 hover:text-[#00CED1]"
                      >
                        <span>Estoque</span>
                        {sortKey === 'stock' && (
                          sortDirection === 'asc' ? 
                          <ArrowUp className="h-4 w-4" /> : 
                          <ArrowDown className="h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th className="text-left p-4 font-medium text-gray-700">
                      <button
                        onClick={() => handleSort('sales')}
                        className="flex items-center space-x-1 hover:text-[#00CED1]"
                      >
                        <span>Vendas</span>
                        {sortKey === 'sales' && (
                          sortDirection === 'asc' ? 
                          <ArrowUp className="h-4 w-4" /> : 
                          <ArrowDown className="h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th className="text-left p-4 font-medium text-gray-700">Status</th>
                    <th className="text-right p-4 font-medium text-gray-700">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedProducts.map((product, index) => {
                    const stockStatus = getStockStatus(product.stock || 0)
                    const Icon = stockStatus.icon
                    
                    return (
                      <motion.tr
                        key={product.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="relative w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                              <Image
                                src={product.image || '/placeholder.png'}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{product.name}</h3>
                              <p className="text-sm text-gray-500">{product.brand}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            <span className="font-medium text-gray-900">
                              {formatPrice(product.price || 0)}
                            </span>
                            {product.originalPrice && product.originalPrice > (product.price || 0) && (
                              <div className="text-sm text-gray-500 line-through">
                                {formatPrice(product.originalPrice)}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="font-medium text-gray-900">
                            {product.stock || 0}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="font-medium text-gray-900">
                            {product.sales || 0}
                          </span>
                        </td>
                        <td className="p-4">
                          <Badge className={`${stockStatus.color} border-0`}>
                            <Icon className="h-3 w-3 mr-1" />
                            {stockStatus.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setEditingProduct(product)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Add Product Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/50" onClick={() => setIsAddModalOpen(false)} />
            <div className="relative bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4">
              <h2 className="text-xl font-bold mb-4">Adicionar Produto</h2>
              <div className="space-y-4">
                <Input
                  placeholder="Nome do produto"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                />
                <Input
                  placeholder="Descrição"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                />
                <Input
                  placeholder="Preço"
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                />
                <Input
                  placeholder="Preço original (opcional)"
                  type="number"
                  value={newProduct.originalPrice}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, originalPrice: e.target.value }))}
                />
                <Input
                  placeholder="Categoria"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                />
                <Input
                  placeholder="Marca"
                  value={newProduct.brand}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, brand: e.target.value }))}
                />
                <Input
                  placeholder="URL da imagem"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, image: e.target.value }))}
                />
                <Input
                  placeholder="Estoque"
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, stock: e.target.value }))}
                />
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddProduct} className="bg-[#00CED1] hover:bg-[#00B8CC]">
                  Adicionar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
