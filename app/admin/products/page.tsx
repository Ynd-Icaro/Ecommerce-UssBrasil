'use client'

import { useState, useMemo, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
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
  Package,
  DollarSign,
  BarChart,
  CheckCircle,
  AlertTriangle,
  Loader2,
  RefreshCw,
  Download,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  X
} from 'lucide-react'

// Components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import AdminLayout from '@/components/admin-layout'
import { useAPI } from '@/hooks/use-api'

// Types
interface Product {
  id: string
  name: string
  image?: string
  mainImage?: string
  category: string | { id: string; name: string; slug: string }
  price: number
  originalPrice?: number
  stock: number
  sales: number
  status: 'published' | 'draft'
  rating?: number
  reviews?: number
  isNew?: boolean
  isFeatured?: boolean
  createdAt?: string
  updatedAt?: string
}

interface ProductStats {
  totalProducts: number
  publishedProducts: number
  draftProducts: number
  lowStockProducts: number
  totalValue: number
  averagePrice: number
}

type SortKey = 'name' | 'price' | 'stock' | 'sales' | 'createdAt'
type SortDirection = 'asc' | 'desc'
type FilterStatus = 'all' | 'published' | 'draft'
type FilterStock = 'all' | 'inStock' | 'lowStock' | 'outOfStock'

// Constants
const ITEMS_PER_PAGE = 10
const LOW_STOCK_THRESHOLD = 10
const CATEGORY_OPTIONS = ['Smartphones', 'Laptops', 'Wearables', 'Accessories', 'Audio']

// Animation configs
const springTransition = { type: "spring" as const, stiffness: 300, damping: 30 }
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.05,
      delayChildren: 0.1
    } 
  }
}
const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: springTransition 
  }
}

// Utility functions
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

const getStockConfig = (stock: number) => {
  if (stock === 0) {
    return {
      variant: 'destructive' as const,
      icon: AlertTriangle,
      text: 'Sem Estoque',
      className: 'bg-red-500/90 text-white border-red-600/50'
    }
  }
  if (stock <= LOW_STOCK_THRESHOLD) {
    return {
      variant: 'secondary' as const,
      icon: AlertTriangle,
      text: 'Estoque Baixo',
      className: 'bg-amber-500/90 text-white border-amber-600/50'
    }
  }
  return {
    variant: 'default' as const,
    icon: CheckCircle,
    text: 'Em Estoque',
    className: 'bg-emerald-500/90 text-white border-emerald-600/50'
  }
}

// Sub-components
const LoadingSpinner = () => (
  <motion.div 
    className="flex flex-col items-center justify-center space-y-4 py-12"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    <div className="relative">
      <Loader2 className="h-8 w-8 animate-spin text-[#00CED1]" />
      <div className="absolute inset-0 h-8 w-8 animate-ping rounded-full bg-[#00CED1]/20"></div>
    </div>
    <p className="text-gray-500 animate-pulse">Carregando produtos...</p>
  </motion.div>
)

const EmptyState = ({ 
  searchTerm, 
  onClearSearch 
}: { 
  searchTerm: string
  onClearSearch: () => void 
}) => (
  <motion.div 
    className="flex flex-col items-center justify-center space-y-6 py-16"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <Package className="w-12 h-12 text-gray-400" />
    </div>
    <div className="text-center">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {searchTerm ? 'Nenhum produto encontrado' : 'Nenhum produto cadastrado'}
      </h3>
      <p className="text-gray-500 max-w-md">
        {searchTerm 
          ? `Não encontramos produtos que correspondam a "${searchTerm}". Tente ajustar sua busca.`
          : 'Comece adicionando seu primeiro produto para vê-lo aparecer aqui.'
        }
      </p>
    </div>
    {searchTerm && (
      <Button variant="outline" onClick={onClearSearch}>
        Limpar busca
      </Button>
    )}
  </motion.div>
)

const ErrorState = ({ 
  error, 
  onRetry 
}: { 
  error: string
  onRetry: () => void 
}) => (
  <motion.div 
    className="flex flex-col items-center justify-center space-y-6 py-16"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
  >
    <Card className="max-w-md w-full border-red-200 bg-red-50">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-red-900 mb-2">
              Erro ao carregar produtos
            </h3>
            <p className="text-red-700 text-sm">
              {error}
            </p>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <Button 
            variant="outline"
            onClick={() => window.location.reload()} 
            className="flex items-center gap-2 flex-1"
          >
            <RefreshCw className="h-4 w-4" />
            Recarregar página
          </Button>
          <Button 
            onClick={onRetry} 
            className="bg-[#00CED1] hover:bg-[#20B2AA] flex items-center gap-2 flex-1"
          >
            <RefreshCw className="h-4 w-4" />
            Tentar novamente
          </Button>
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

const ProductImage = ({ product, isLoading }: { product: Product; isLoading: boolean }) => {
  const imageSrc = product.mainImage || product.image || '/favicon.ico'
  
  return (
    <div className="relative group">
      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-1">
        <Image 
          src={imageSrc} 
          alt={product.name} 
          fill
          sizes="48px"
          className="object-contain transition-transform duration-200 group-hover:scale-110"
        />
      </div>
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loader2 className="h-4 w-4 animate-spin text-[#00CED1]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const StockBadge = ({ stock }: { stock: number }) => {
  const getStockConfig = (stock: number) => {
    if (stock === 0) {
      return {
        variant: 'destructive' as const,
        icon: AlertTriangle,
        text: 'Sem Estoque',
        className: 'bg-red-500/90 text-white border-red-600/50'
      }
    }
    if (stock <= LOW_STOCK_THRESHOLD) {
      return {
        variant: 'secondary' as const,
        icon: AlertTriangle,
        text: 'Estoque Baixo',
        className: 'bg-amber-500/90 text-white border-amber-600/50'
      }
    }
    return {
      variant: 'default' as const,
      icon: CheckCircle,
      text: 'Em Estoque',
      className: 'bg-emerald-500/90 text-white border-emerald-600/50'
    }
  }

  const config = getStockConfig(stock)
  const Icon = config.icon

  return (
    <div className="flex items-center gap-2">
      <Badge className={config.className}>
        <Icon className="mr-1 h-3 w-3" />
        {config.text}
      </Badge>
      <span className="text-xs text-gray-500 font-medium">
        {stock} {stock === 1 ? 'unidade' : 'unidades'}
      </span>
    </div>
  )
}

const StatusBadge = ({ status }: { status: Product['status'] }) => {
  const config = {
    published: {
      variant: 'default' as const,
      className: 'bg-green-100 text-green-800 border-green-200',
      text: 'Publicado',
      icon: CheckCircle
    },
    draft: {
      variant: 'outline' as const,
      className: 'bg-gray-100 text-gray-800 border-gray-300',
      text: 'Rascunho',
      icon: Edit
    }
  }

  // Fallback para valores inválidos
  const statusConfig = config[status] || config.draft
  const Icon = statusConfig.icon

  return (
    <Badge variant={statusConfig.variant} className={statusConfig.className}>
      <Icon className="mr-1 h-3 w-3" />
      {statusConfig.text}
    </Badge>
  )
}

const SalesIndicator = ({ sales, trend }: { sales: number; trend?: 'up' | 'down' | 'stable' }) => {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : BarChart
  const trendColor = trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500'

  return (
    <div className="flex items-center gap-2">
      <span className="font-semibold text-gray-800">{sales}</span>
      <TrendIcon className={`h-4 w-4 ${trendColor}`} />
    </div>
  )
}

const StatsCard = ({ title, value, subtitle, icon: Icon, trend, color = "blue" }: {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ComponentType<{ className?: string }>
  trend?: { value: number; type: 'up' | 'down' }
  color?: 'blue' | 'green' | 'red' | 'yellow'
}) => {
  const colorClasses = {
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-emerald-500',
    red: 'from-red-500 to-pink-500',
    yellow: 'from-yellow-500 to-orange-500'
  }

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-white/20 hover:shadow-lg transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              {trend && (
                <span className={`text-sm font-medium flex items-center gap-1 ${
                  trend.type === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {trend.type === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {trend.value}%
                </span>
              )}
            </div>
            {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          </div>
          <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} text-white`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const SortButton = ({ 
  sortKey, 
  currentSortKey, 
  sortDirection, 
  onClick, 
  children, 
  icon: Icon,
  disabled 
}: {
  sortKey: SortKey
  currentSortKey: SortKey
  sortDirection: SortDirection
  onClick: (key: SortKey) => void
  children: React.ReactNode
  icon: React.ComponentType<{ className?: string }>
  disabled?: boolean
}) => {
  const isActive = currentSortKey === sortKey
  
  return (
    <button 
      onClick={() => onClick(sortKey)} 
      className={`flex items-center space-x-1 px-3 py-1 rounded-lg transition-all duration-200 ${
        isActive 
          ? 'bg-[#00CED1]/10 text-[#00CED1] font-semibold' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      disabled={disabled}
    >
      <Icon className="h-4 w-4 mr-1" />
      <span>{children}</span>
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {sortDirection === 'asc' ? (
              <ArrowUp className="h-4 w-4 text-[#00CED1]" />
            ) : (
              <ArrowDown className="h-4 w-4 text-[#00CED1]" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}

export default function AdminProductsPage() {
  const { data: products = [], loading, error, update, remove, refresh } = useAPI<Product>('products')
  
  // Estados
  const [searchTerm, setSearchTerm] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('sales')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')
  const [filterStock, setFilterStock] = useState<FilterStock>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Cálculos de estatísticas
  const stats = useMemo((): ProductStats => {
    if (!products || !Array.isArray(products)) {
      return {
        totalProducts: 0,
        publishedProducts: 0,
        draftProducts: 0,
        lowStockProducts: 0,
        totalValue: 0,
        averagePrice: 0
      }
    }

    const totalProducts = products.length
    const publishedProducts = products.filter(p => p.status === 'published').length
    const draftProducts = products.filter(p => p.status === 'draft').length
    const lowStockProducts = products.filter(p => p.stock <= LOW_STOCK_THRESHOLD).length
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0)
    const averagePrice = totalProducts > 0 ? products.reduce((sum, p) => sum + p.price, 0) / totalProducts : 0

    return {
      totalProducts,
      publishedProducts,
      draftProducts,
      lowStockProducts,
      totalValue,
      averagePrice
    }
  }, [products])

  // Filtragem e ordenação
  const filteredAndSortedProducts = useMemo(() => {
    if (!products || !Array.isArray(products)) return []
    
    let filtered = products.filter((product: Product) => {
      // Helper function to get category as string
      const getCategoryString = (category: string | { id: string; name: string; slug: string }) => {
        return typeof category === 'string' ? category : category?.name || ''
      }
      
      const categoryString = getCategoryString(product.category)
      
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          categoryString.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = filterStatus === 'all' || product.status === filterStatus
      
      const matchesStock = filterStock === 'all' || 
                          (filterStock === 'inStock' && product.stock > LOW_STOCK_THRESHOLD) ||
                          (filterStock === 'lowStock' && product.stock > 0 && product.stock <= LOW_STOCK_THRESHOLD) ||
                          (filterStock === 'outOfStock' && product.stock === 0)
      
      const matchesCategory = selectedCategory === 'all' || categoryString === selectedCategory

      return matchesSearch && matchesStatus && matchesStock && matchesCategory
    })

    return filtered.sort((a: Product, b: Product) => {
      let aValue: any = a[sortKey]
      let bValue: any = b[sortKey]
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = (bValue as string).toLowerCase()
      }
      
      const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      return sortDirection === 'asc' ? comparison : -comparison
    })
  }, [products, searchTerm, sortKey, sortDirection, filterStatus, filterStock, selectedCategory])

  // Paginação
  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredAndSortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredAndSortedProducts, currentPage])

  // Handlers
  const handleSort = useCallback((key: SortKey) => {
    if (key === sortKey) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDirection('desc')
    }
    setCurrentPage(1)
  }, [sortKey])

  const handleClearFilters = useCallback(() => {
    setSearchTerm('')
    setFilterStatus('all')
    setFilterStock('all')
    setSelectedCategory('all')
    setCurrentPage(1)
  }, [])

  const handleDelete = useCallback(async (productId: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.')) return
    
    try {
      setActionLoading(productId)
      await remove(productId)
      toast.success('Produto excluído com sucesso!')
      
      // Ajustar página atual se necessário
      if (paginatedProducts.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1)
      }
    } catch (error) {
      toast.error('Erro ao excluir produto')
      console.error('Delete error:', error)
    } finally {
      setActionLoading(null)
    }
  }, [remove, paginatedProducts.length, currentPage])

  const handleToggleStatus = useCallback(async (product: Product) => {
    try {
      setActionLoading(product.id)
      const newStatus = product.status === 'published' ? 'draft' : 'published'
      await update(product.id, { 
        status: newStatus,
        updatedAt: new Date().toISOString()
      })
      toast.success(`Produto ${newStatus === 'published' ? 'publicado' : 'despublicado'} com sucesso!`)
    } catch (error) {
      toast.error('Erro ao atualizar status do produto')
      console.error('Status update error:', error)
    } finally {
      setActionLoading(null)
    }
  }, [update])

  const handleBulkAction = useCallback((action: 'publish' | 'unpublish' | 'delete', productIds: string[]) => {
    // Implementação futura para ações em lote
    toast.info(`Ação em lote "${action}" para ${productIds.length} produtos será implementada em breve!`)
  }, [])

  const formatCurrency = useCallback((value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }, [])

  // Constantes de animação otimizadas
  const springTransition = { type: "spring" as const, stiffness: 300, damping: 30 }
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.1
      } 
    }
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: springTransition 
    }
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 sm:p-6 lg:p-8">
          <ErrorState error={error} onRetry={() => refresh?.()} />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 sm:p-6 lg:p-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-8xl mx-auto space-y-8">
          {/* Header with Stats */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Main Header */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent tracking-tight">
                    Gerenciar Produtos
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Carregando produtos...
                      </span>
                    ) : (
                      <>
                        <span>{stats.totalProducts} produtos no total</span>
                        <span>•</span>
                        <span>{filteredAndSortedProducts.length} exibidos</span>
                        {searchTerm && (
                          <>
                            <span>•</span>
                            <span>Filtro: "{searchTerm}"</span>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => toast.info('Funcionalidade de exportar será implementada em breve!')}
                    disabled={loading}
                  >
                    <Download className="h-4 w-4" />
                    Exportar
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-[#00CED1] to-[#20B2AA] text-white font-medium px-6 rounded-xl shadow-lg hover:scale-105 transition-transform"
                    onClick={() => toast.success('Funcionalidade de adicionar produto em breve!')}
                    disabled={loading}
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    Novo Produto
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total de Produtos"
                value={stats.totalProducts}
                subtitle="Em seu catálogo"
                icon={Package}
                color="blue"
              />
              <StatsCard
                title="Produtos Publicados"
                value={stats.publishedProducts}
                subtitle="Visíveis na loja"
                icon={CheckCircle}
                color="green"
              />
              <StatsCard
                title="Estoque Baixo"
                value={stats.lowStockProducts}
                subtitle="Produtos precisando reposição"
                icon={AlertTriangle}
                color="yellow"
              />
              <StatsCard
                title="Valor Total"
                value={formatCurrency(stats.totalValue)}
                subtitle="Valor do inventário"
                icon={DollarSign}
                color="green"
              />
            </div>
          </motion.div>
          {/* Advanced Filters and Search */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <Input
                    placeholder="Buscar por nome ou categoria..."
                    className="w-full pl-12 pr-4 py-3 bg-white/80 border-gray-300/50 rounded-xl focus:ring-2 focus:ring-[#00CED1]/50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    disabled={loading}
                  />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3">
                  {/* Status Filter */}
                  <Select value={filterStatus} onValueChange={(value: FilterStatus) => setFilterStatus(value)} disabled={loading}>
                    <SelectTrigger className="w-[140px] rounded-xl border-gray-300/50">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos Status</SelectItem>
                      <SelectItem value="published">Publicados</SelectItem>
                      <SelectItem value="draft">Rascunhos</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Stock Filter */}
                  <Select value={filterStock} onValueChange={(value: FilterStock) => setFilterStock(value)} disabled={loading}>
                    <SelectTrigger className="w-[140px] rounded-xl border-gray-300/50">
                      <SelectValue placeholder="Estoque" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todo Estoque</SelectItem>
                      <SelectItem value="inStock">Em Estoque</SelectItem>
                      <SelectItem value="lowStock">Estoque Baixo</SelectItem>
                      <SelectItem value="outOfStock">Sem Estoque</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Category Filter */}
                  <Select value={selectedCategory} onValueChange={setSelectedCategory} disabled={loading}>
                    <SelectTrigger className="w-[140px] rounded-xl border-gray-300/50">
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      {CATEGORY_OPTIONS.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Clear Filters */}
                  {(searchTerm || filterStatus !== 'all' || filterStock !== 'all' || selectedCategory !== 'all') && (
                    <Button 
                      variant="outline" 
                      onClick={handleClearFilters}
                      className="flex items-center gap-2 rounded-xl"
                      disabled={loading}
                    >
                      <RefreshCw className="h-4 w-4" />
                      Limpar
                    </Button>
                  )}
                </div>
              </div>

              {/* Active Filters Display */}
              <AnimatePresence>
                {(searchTerm || filterStatus !== 'all' || filterStock !== 'all' || selectedCategory !== 'all') && (
                  <motion.div 
                    className="flex flex-wrap gap-2 pt-4 border-t border-gray-200/50 mt-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {searchTerm && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Busca: {searchTerm}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchTerm('')} />
                      </Badge>
                    )}
                    {filterStatus !== 'all' && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Status: {filterStatus === 'published' ? 'Publicados' : 'Rascunhos'}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => setFilterStatus('all')} />
                      </Badge>
                    )}
                    {filterStock !== 'all' && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Estoque: {filterStock === 'inStock' ? 'Em Estoque' : filterStock === 'lowStock' ? 'Baixo' : 'Sem Estoque'}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => setFilterStock('all')} />
                      </Badge>
                    )}
                    {selectedCategory !== 'all' && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Categoria: {selectedCategory}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory('all')} />
                      </Badge>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Products Table */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg border border-white/20 overflow-hidden">
              <CardHeader className="pb-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    Lista de Produtos
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Página {currentPage} de {totalPages}</span>
                    {totalPages > 1 && (
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1 || loading}
                          className="h-8 w-8 p-0"
                        >
                          ←
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages || loading}
                          className="h-8 w-8 p-0"
                        >
                          →
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="border-b border-gray-200/50 bg-gray-50/50">
                      <tr>
                        <th className="p-6 font-semibold text-gray-700">
                          <SortButton
                            sortKey="name"
                            currentSortKey={sortKey}
                            sortDirection={sortDirection}
                            onClick={handleSort}
                            icon={Package}
                            disabled={loading}
                          >
                            Produto
                          </SortButton>
                        </th>
                        <th className="p-6 font-semibold text-gray-700">
                          <SortButton
                            sortKey="price"
                            currentSortKey={sortKey}
                            sortDirection={sortDirection}
                            onClick={handleSort}
                            icon={DollarSign}
                            disabled={loading}
                          >
                            Preço
                          </SortButton>
                        </th>
                        <th className="p-6 font-semibold text-gray-700">
                          <SortButton
                            sortKey="stock"
                            currentSortKey={sortKey}
                            sortDirection={sortDirection}
                            onClick={handleSort}
                            icon={Package}
                            disabled={loading}
                          >
                            Estoque
                          </SortButton>
                        </th>
                        <th className="p-6 font-semibold text-gray-700">
                          <SortButton
                            sortKey="sales"
                            currentSortKey={sortKey}
                            sortDirection={sortDirection}
                            onClick={handleSort}
                            icon={BarChart}
                            disabled={loading}
                          >
                            Vendas
                          </SortButton>
                        </th>
                        <th className="p-6 font-semibold text-gray-700">Status</th>
                        <th className="p-6 font-semibold text-gray-700 text-center">Ações</th>
                      </tr>
                    </thead>
                    <AnimatePresence mode="wait">
                      <motion.tbody 
                        key={`${currentPage}-${searchTerm}-${filterStatus}-${filterStock}`}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        {loading ? (
                          <tr>
                            <td colSpan={6} className="p-12">
                              <LoadingSpinner />
                            </td>
                          </tr>
                        ) : paginatedProducts.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-12">
                              <EmptyState 
                                searchTerm={searchTerm} 
                                onClearSearch={handleClearFilters} 
                              />
                            </td>
                          </tr>
                        ) : (
                          paginatedProducts.map((product: Product, index) => (
                            <motion.tr 
                              key={`${product.id}-${currentPage}`}
                              className="border-b border-gray-200/50 hover:bg-white/80 transition-all duration-200"
                              variants={itemVariants}
                              custom={index}
                              layout
                              whileHover={{ scale: 1.01 }}
                              transition={{ duration: 0.2 }}
                            >
                              <td className="p-6">
                                <div className="flex items-center space-x-4">
                                  <ProductImage 
                                    product={product} 
                                    isLoading={actionLoading === product.id} 
                                  />
                                  <div className="min-w-0 flex-1">
                                    <div className="font-semibold text-gray-800 truncate">
                                      {product.name}
                                    </div>
                                    <div className="text-sm text-gray-500 flex items-center gap-2">
                                      <span className="truncate">
                                        {typeof product.category === 'string' ? product.category : product.category?.name || 'Sem categoria'}
                                      </span>
                                      {product.isNew && (
                                        <Badge variant="secondary" className="text-xs">Novo</Badge>
                                      )}
                                      {product.isFeatured && (
                                        <Badge variant="secondary" className="text-xs">Destaque</Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="p-6">
                                <div className="space-y-1">
                                  <div className="font-semibold text-gray-800">
                                    {formatCurrency(product.price)}
                                  </div>
                                  {product.originalPrice && product.originalPrice > product.price && (
                                    <div className="text-xs text-gray-500 line-through">
                                      {formatCurrency(product.originalPrice)}
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td className="p-6">
                                <StockBadge stock={product.stock} />
                              </td>
                              <td className="p-6">
                                <SalesIndicator sales={product.sales} />
                              </td>
                              <td className="p-6">
                                <StatusBadge status={product.status} />
                              </td>
                              <td className="p-6 text-center">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="rounded-full hover:bg-gray-100/80 h-9 w-9"
                                      disabled={actionLoading === product.id}
                                    >
                                      {actionLoading === product.id ? (
                                        <Loader2 className="h-5 w-5 animate-spin text-[#00CED1]" />
                                      ) : (
                                        <MoreHorizontal className="h-5 w-5" />
                                      )}
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent 
                                    align="end" 
                                    className="bg-white/95 backdrop-blur-xl border-gray-300/50 rounded-xl shadow-lg w-48"
                                  >
                                    <DropdownMenuLabel className="text-xs font-medium text-gray-500">
                                      Ações do Produto
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="cursor-pointer">
                                      <Eye className="mr-2 h-4 w-4" /> 
                                      Ver Detalhes
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                      <Edit className="mr-2 h-4 w-4" /> 
                                      Editar Produto
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                      <ShoppingCart className="mr-2 h-4 w-4" /> 
                                      Ver na Loja
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem 
                                      onClick={() => handleToggleStatus(product)}
                                      className="cursor-pointer"
                                    >
                                      {product.status === 'published' ? (
                                        <>
                                          <Edit className="mr-2 h-4 w-4" /> 
                                          Despublicar
                                        </>
                                      ) : (
                                        <>
                                          <CheckCircle className="mr-2 h-4 w-4" /> 
                                          Publicar
                                        </>
                                      )}
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem 
                                      className="text-red-600 cursor-pointer focus:text-red-600" 
                                      onClick={() => handleDelete(product.id)}
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" /> 
                                      Excluir Produto
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </motion.tr>
                          ))
                        )}
                      </motion.tbody>
                    </AnimatePresence>
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
