'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Package,
  Star,
  Filter
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import AdminLayout from '@/components/admin-layout'
import { toast } from 'react-hot-toast'

interface Product {
  id: string
  name: string
  description: string
  price: number
  discountPrice?: number
  stock: number
  status: 'ACTIVE' | 'INACTIVE'
  featured: boolean
  images: string
  category: {
    id: string
    name: string
    slug: string
  }
  rating: number
  totalReviews: number
  createdAt: string
}

interface Category {
  id: string
  name: string
  slug: string
}

export default function ProductsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return

    if (!session || session.user.role !== 'ADMIN') {
      router.push('/login')
      return
    }

    loadProducts()
    loadCategories()
  }, [session, status, router])

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products')
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error('Erro ao carregar produtos:', error)
      toast.error('Erro ao carregar produtos')
    } finally {
      setLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error('Erro ao carregar categorias:', error)
    }
  }

  const filterProducts = useCallback(() => {
    let filtered = products

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => product.category.id === categoryFilter)
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(product => product.status === statusFilter)
    }

    setFilteredProducts(filtered)
  }, [products, searchTerm, categoryFilter, statusFilter])

  // Effect to trigger filtering
  useEffect(() => {
    filterProducts()
  }, [products, searchTerm, categoryFilter, statusFilter, filterProducts])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const deleteProduct = async (productId: string) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Produto excluído com sucesso')
        loadProducts()
      } else {
        toast.error('Erro ao excluir produto')
      }
    } catch (error) {
      console.error('Erro ao excluir produto:', error)
      toast.error('Erro ao excluir produto')
    }
  }

  if (status === 'loading' || loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </AdminLayout>
    )
  }

  if (!session || session.user.role !== 'ADMIN') {
    return null
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
            <p className="text-gray-600 mt-1">Gerencie o catálogo de produtos da loja</p>
          </div>
          <Link href="/admin/products/new">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Novo Produto
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Produtos</p>
                  <p className="text-2xl font-bold">{products.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Em Destaque</p>
                  <p className="text-2xl font-bold">{products.filter(p => p.featured).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Ativos</p>
                  <p className="text-2xl font-bold">{products.filter(p => p.status === 'ACTIVE').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Estoque Baixo</p>
                  <p className="text-2xl font-bold">{products.filter(p => p.stock < 5).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas Categorias</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="ACTIVE">Ativo</SelectItem>
                  <SelectItem value="INACTIVE">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-square">
                <Image
                  src={product.images || '/placeholder-product.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {product.featured && (
                  <Badge className="absolute top-2 left-2 bg-yellow-500">
                    Destaque
                  </Badge>
                )}
                <Badge 
                  className={`absolute top-2 right-2 ${
                    product.status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {product.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="mb-2">
                  <Badge variant="outline">{product.category.name}</Badge>
                </div>
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    {product.discountPrice ? (
                      <div>
                        <span className="text-lg font-bold text-green-600">
                          {formatCurrency(product.discountPrice)}
                        </span>
                        <span className="text-sm text-gray-500 line-through ml-2">
                          {formatCurrency(product.price)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-gray-900">
                        {formatCurrency(product.price)}
                      </span>
                    )}
                  </div>
                  <span className={`text-sm ${product.stock < 5 ? 'text-red-600' : 'text-gray-600'}`}>
                    Estoque: {product.stock}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">
                      {product.rating.toFixed(1)} ({product.totalReviews})
                    </span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/product/${product.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Produto
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/products/${product.id}/edit`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <Card>
            <CardContent className="p-12">
              <div className="text-center">
                <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum produto encontrado</h3>
                <p className="text-gray-600 mb-6">Tente ajustar os filtros ou adicionar um novo produto.</p>
                <Link href="/admin/products/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Produto
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
