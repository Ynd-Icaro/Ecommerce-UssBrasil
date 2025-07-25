'use client'

import { useState, useEffect } from 'react'
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
import { toast } from 'react-hot-toast'

// Dados mockados para demonstração
const mockProducts = [
  {
    id: '1',
    name: 'iPhone 16 Pro',
    category: 'iPhone',
    price: 10499,
    stock: 15,
    status: 'active',
    image: '/Produtos/Iphone 16 Pro.png',
    description: 'O iPhone mais avançado de todos os tempos'
  },
  {
    id: '2',
    name: 'iPhone 16',
    category: 'iPhone',
    price: 7499,
    stock: 25,
    status: 'active',
    image: '/Produtos/Iphone 16.png',
    description: 'iPhone 16 com chip A18'
  },
  {
    id: '3',
    name: 'MacBook Pro',
    category: 'Mac',
    price: 15999,
    stock: 8,
    status: 'active',
    image: '/Produtos/Macbook Pro.png',
    description: 'MacBook Pro com chip M4'
  },
  {
    id: '4',
    name: 'iPad Pro',
    category: 'iPad',
    price: 8999,
    stock: 12,
    status: 'active',
    image: '/Produtos/Ipad Pro.png',
    description: 'iPad Pro com chip M4'
  },
  {
    id: '5',
    name: 'Apple Watch Series 10',
    category: 'Watch',
    price: 3499,
    stock: 20,
    status: 'active',
    image: '/Produtos/Watch Series 10.png',
    description: 'Apple Watch Series 10'
  }
]

const mockCategories = ['Todos', 'iPhone', 'Mac', 'iPad', 'Watch', 'Acessórios']

export default function AdminProductsPage() {
  const [products, setProducts] = useState(mockProducts)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [selectedStatus, setSelectedStatus] = useState('Todos')

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory
    const matchesStatus = selectedStatus === 'Todos' || product.status === selectedStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id))
    toast.success('Produto removido com sucesso!')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-red-100 text-red-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo'
      case 'inactive':
        return 'Inativo'
      case 'draft':
        return 'Rascunho'
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
              <h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
              <p className="text-gray-600 mt-1">Gerencie seus produtos</p>
            </div>
            <div className="flex space-x-4">
              <Link href="/admin">
                <Button variant="outline">
                  Voltar ao Dashboard
                </Button>
              </Link>
              <Button>
                <Plus className="h-5 w-5 mr-2" />
                Novo Produto
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produtos Ativos</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {products.filter(p => p.status === 'active').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estoque Total</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {products.reduce((total, p) => total + p.stock, 0)}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatPrice(products.reduce((total, p) => total + (p.price * p.stock), 0))}
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
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex space-x-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="inactive">Inativo</SelectItem>
                    <SelectItem value="draft">Rascunho</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                    <th className="text-left p-4 font-medium text-gray-900">Produto</th>
                    <th className="text-left p-4 font-medium text-gray-900">Categoria</th>
                    <th className="text-left p-4 font-medium text-gray-900">Preço</th>
                    <th className="text-left p-4 font-medium text-gray-900">Estoque</th>
                    <th className="text-left p-4 font-medium text-gray-900">Status</th>
                    <th className="text-left p-4 font-medium text-gray-900">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{product.name}</h3>
                            <p className="text-sm text-gray-500">{product.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{product.category}</Badge>
                      </td>
                      <td className="p-4 font-medium text-gray-900">
                        {formatPrice(product.price)}
                      </td>
                      <td className="p-4">
                        <span className={`font-medium ${
                          product.stock < 10 ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="p-4">
                        <Badge className={getStatusColor(product.status)}>
                          {getStatusText(product.status)}
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
                              onClick={() => handleDeleteProduct(product.id)}
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
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="text-gray-500">
                  Tente ajustar os filtros ou adicionar novos produtos.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
