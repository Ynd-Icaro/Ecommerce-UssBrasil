'use client'

import { useState, useMemo, SetStateAction } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { produtosApple } from '@/lib/Products/Apple/page'
import { produtosJBL } from '@/lib/Products/JBL/page'
import { produtosDji } from '@/lib/Products/Dji/page'
import { produtosGeonav } from '@/lib/Products/Geonav/page'
import { produtosXiomi } from '@/lib/Products/Xiomi/page'
import { Product, ProductClass, ProductCategory } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { SelectTrigger } from '@/components/ui/select'
import { SelectValue } from '@/components/ui/select'
import { SelectContent } from '@/components/ui/select'
import { SelectItem } from '@/components/ui/select'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DropdownMenuContent } from '@/components/ui/dropdown-menu'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

type SortKey = 'name' | 'price' | 'stock' | 'sales'
type SortDirection = 'asc' | 'desc'

const productCategories: ProductCategory[] = ['Apple', 'Geonav', 'JBL', 'AIWA', 'DJI', 'Playstation', 'Redmi'];
const productClasses: ProductClass[] = ['Smartphones', 'Smartwatchs', 'Fones', 'Acessórios', 'Outros'];
import {
  Package,
  Plus,
  Search,
  Filter,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  DollarSign,
  BarChart,
  CheckCircle,
  AlertTriangle,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react'
import AdminLayout from '@/components/admin-layout' 
import { ProductModal } from '@/components/admin/ProductModal' 
import { productService } from '@/lib/services/api' 
import { toast } from 'react-hot-toast'




export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('sales')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [selectedClass, setSelectedClass] = useState<ProductClass | 'all'>('all')
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create')

  const validCategories: ProductCategory[] = ['Apple', 'Geonav', 'JBL', 'AIWA', 'DJI', 'Playstation', 'Redmi'];
  const validClasses: ProductClass[] = ['Smartphones', 'Smartwatchs', 'Fones', 'Acessórios', 'Outros'];

  const products: Product[] = [
    ...produtosApple,
    ...produtosJBL,
    ...produtosDji,
    ...produtosGeonav,
    ...produtosXiomi
  ].map((product: any) => ({
    id: (product.id ?? '').toString(),
    slug: product.slug ?? '',
    name: product.name ?? product.nome ?? '',
    description: product.description ?? product.descricao ?? '',
    price: product.price ?? product.preco ?? 0,
    images: product.images ?? (product.imagem ? { main: product.imagem } : { main: '' }),
    categoria: product.categoria ?? 'Outros',
    classe: product.classe ?? 'Outros',
    marca: product.marca ?? '',
    stock: product.stock ?? 0,
    rating: product.rating ?? 0,
    status: product.status ?? 'active',
    variacoes: Array.isArray(product.variacoes) ? product.variacoes : [],
    garantia: typeof product.garantia === 'string' ? product.garantia : '',
    sales: product.sales ?? 0,
    destaque: product.destaque ?? false,
    createdAt: product.createdAt ?? '',
    updatedAt: product.updatedAt ?? '',
    features: product.features ?? [],
    colors: product.colors ?? [],
    specifications: product.specifications ?? {},
    tags: product.tags ?? [],
    reviews: product.reviews ?? [],
    totalReviews: product.totalReviews ?? 0,
    isNew: product.isNew ?? false,
    isFeatured: product.isFeatured ?? false,
    isDiscounted: product.isDiscounted ?? false,
    discountPercentage: product.discountPercentage ?? 0,
    oldPrice: product.oldPrice ?? 0,
    barcode: product.barcode ?? '',
    weight: product.weight ?? 0,
    dimensions: product.dimensions ?? { width: 0, height: 0, depth: 0 },
    warranty: product.warranty ?? '',
    discount: product.discount ?? 0,
  }))
  const loading = false;

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product: Product) =>
      (product.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.categoria || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.classe || '').toLowerCase().includes(searchTerm.toLowerCase())
    )

    const sorted = filtered.sort((a: Product, b: Product) => {
      let aValue: any, bValue: any
      
      switch (sortKey) {
        case 'name':
          aValue = a.name || ''
          bValue = b.name || ''
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
          aValue = a.rating || 0 // Usando rating como proxy para vendas
          bValue = b.rating || 0
          break
        default:
          aValue = a.name
          bValue = b.name
      }
      
      if (aValue < bValue) return -1
      if (aValue > bValue) return 1
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
      try {
        await productService.delete(productId)
        // refetch removido
        toast.success('Produto excluído com sucesso!')
      } catch (error) {
        toast.error('Erro ao excluir produto')
      }
    }
  }

  const handleToggleStatus = async (product: Product) => {
    const newStatus = product.status === 'active' ? 'inactive' : 'active'
    try {
      await productService.update(product.id, { status: newStatus })
      // refetch removido
      toast.success('Status do produto atualizado!')
    } catch (error) {
      toast.error('Erro ao atualizar status do produto')
    }
  }

  const handleCreateProduct = () => {
    setSelectedProduct(null)
    setModalMode('create')
    setModalOpen(true)
  }

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product)
    setModalMode('edit')
    setModalOpen(true)
  }

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product)
    setModalMode('view')
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedProduct(null)
  }

  const handleSaveProduct = () => {
    // refetch removido
    handleCloseModal()
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: springTransition }
  };

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
                    Produtos
                  </h1>
                </div>
                <Button 
                  className="bg-gradient-to-r from-[#00CED1] to-[#20B2AA] text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition-transform"
                  onClick={handleCreateProduct}
                >
                  Novo Produto
                </Button>
              </div>
            </motion.header>
  
            {/* Filters and Search */}
            <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex-1 relative">
                <Input
                  placeholder="Buscar por nome ou categoria..."
                  className="w-full pl-12 pr-4 py-3 bg-white/80 border-gray-300/50 rounded-xl focus:ring-2 focus:ring-[#00CED1]/50"
                  value={searchTerm}
                  onChange={(e: { target: { value: SetStateAction<string> } }) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Select
                    value={selectedClass}
                    onValueChange={(value: string) => setSelectedClass(value as ProductClass | 'all')}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Classe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as classes</SelectItem>
                      {productClasses.map((classe) => (
                        <SelectItem key={classe} value={classe}>
                          {classe}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
  
                  <Select
                    value={selectedCategory}
                    onValueChange={(value: string) => setSelectedCategory(value as ProductCategory | 'all')}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as marcas</SelectItem>
                      {productCategories.map((categoria) => (
                        <SelectItem key={categoria} value={categoria}>
                          {categoria}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
  
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center space-x-2 rounded-xl border-gray-300/80 hover:bg-white/80">
                      <Filter className="h-4 w-4" />
                      <span>Mais Filtros</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white/80 backdrop-blur-xl border-gray-300/50 rounded-xl shadow-lg">
                    <DropdownMenuItem>Produtos em Destaque</DropdownMenuItem>
                    <DropdownMenuItem>Produtos Novos</DropdownMenuItem>
                    <DropdownMenuItem>Estoque Baixo</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              </div>
            </div>

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
                            <span>Avaliação</span>
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
                      ) : filteredAndSortedProducts.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-12 text-center text-gray-500">
                            Nenhum produto encontrado
                          </td>
                        </tr>
                      ) : filteredAndSortedProducts.map((product: Product) => (
                        <motion.tr 
                          key={product.id} 
                          className="border-b border-gray-200/50 hover:bg-white/50 transition-colors"
                          variants={itemVariants}
                          layout
                        >
                          <td className="p-6">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                {product.images?.main ? (
                                  <Image 
                                    src={product.images.main} 
                                    alt={product.name} 
                                    width={48} 
                                    height={48} 
                                    className="rounded-lg object-contain"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none'
                                    }}
                                  />
                                ) : (
                                  <Package className="w-6 h-6 text-gray-400" />
                                )}
                              </div>
                              <div>
                                <div className="font-semibold text-gray-800">{product.name}</div>
                                <div className="text-sm text-gray-500">{product.categoria} • {product.classe}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-6 font-semibold text-gray-800">{formatCurrency(product.price)}</td>
                          <td className="p-6">{getStockBadge(product.stock)}</td>
                          <td className="p-6 text-center text-gray-600">{product.rating}/5 ⭐</td>
                          <td className="p-6">
                            <Badge variant={product.status === 'active' ? 'default' : 'outline'} className={product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                              {product.status === 'active' ? 'Ativo' : product.status === 'inactive' ? 'Inativo' : 'Rascunho'}
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
                                <DropdownMenuItem onClick={() => handleViewProduct(product)}>
                                  <Eye className="mr-2 h-4 w-4" /> Ver Produto
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                                  <Edit className="mr-2 h-4 w-4" /> Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleToggleStatus(product)}>
                                  <Package className="mr-2 h-4 w-4" /> 
                                  {product.status === 'active' ? 'Desativar' : 'Ativar'}
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
      {/* Product Modal */}
      <ProductModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
        onSave={handleSaveProduct}
        mode={modalMode}
      />
      
    </motion.div>
    </AdminLayout>
  )
}
