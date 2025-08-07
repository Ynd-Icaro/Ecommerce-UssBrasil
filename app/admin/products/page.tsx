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
  AlertTriangle,
  Star,
  TrendingUp,
  Download,
  Upload
} from 'lucide-react'
import Link from 'next/link'
import PageHeader from '@/components/admin/PageHeader'
import StatCard from '@/components/admin/StatCard'
import ProductImage from '@/components/admin/ProductImage'

interface Product {
  id: string
  name: string
  image: string
  category: string
  price: number
  stock: number
  sales: number
  status: 'active' | 'inactive' | 'draft'
  rating: number
  reviews: number
  sku: string
  lastUpdate: string
}

type SortKey = 'name' | 'price' | 'stock' | 'sales' | 'rating'
type SortDirection = 'asc' | 'desc'

export default function AdminProductsPage() {
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'iPhone 15 Pro Max 256GB Titânio Natural',
      image: '/Produtos/Apple/Iphone 16 Pro.png',
      category: 'Smartphones',
      price: 8999.99,
      stock: 45,
      sales: 127,
      status: 'active',
      rating: 4.8,
      reviews: 342,
      sku: 'APL-IPH15PM-256-TN',
      lastUpdate: '2024-01-15'
    },
    {
      id: '2',
      name: 'MacBook Air M3 13" 512GB Cinza Espacial',
      image: '/fallback-product.png',
      category: 'Laptops',
      price: 12999.99,
      stock: 23,
      sales: 89,
      status: 'active',
      rating: 4.9,
      reviews: 256,
      sku: 'APL-MBA-M3-512-CE',
      lastUpdate: '2024-01-14'
    },
    {
      id: '3',
      name: 'Samsung Galaxy S24 Ultra 512GB Preto',
      image: '/fallback-product.png',
      category: 'Smartphones',
      price: 6999.99,
      stock: 67,
      sales: 156,
      status: 'active',
      rating: 4.7,
      reviews: 189,
      sku: 'SAM-GS24U-512-PT',
      lastUpdate: '2024-01-13'
    },
    {
      id: '4',
      name: 'AirPods Pro 3ª Geração USB-C',
      image: '/fallback-product.png',
      category: 'Áudio',
      price: 2499.99,
      stock: 128,
      sales: 234,
      status: 'active',
      rating: 4.6,
      reviews: 445,
      sku: 'APL-APP3-USBC',
      lastUpdate: '2024-01-12'
    },
    {
      id: '5',
      name: 'iPad Pro 12.9" M2 256GB Wi-Fi',
      image: '/fallback-product.png',
      category: 'Tablets',
      price: 7999.99,
      stock: 15,
      sales: 67,
      status: 'active',
      rating: 4.8,
      reviews: 178,
      sku: 'APL-IPP129-M2-256',
      lastUpdate: '2024-01-11'
    },
    {
      id: '6',
      name: 'Apple Watch Series 9 GPS 45mm',
      image: '/fallback-product.png',
      category: 'Wearables',
      price: 3999.99,
      stock: 0,
      sales: 98,
      status: 'inactive',
      rating: 4.5,
      reviews: 234,
      sku: 'APL-AWS9-GPS-45',
      lastUpdate: '2024-01-10'
    }
  ])
  
  const [searchTerm, setSearchTerm] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('sales')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  const categories = ['all', 'Smartphones', 'Laptops', 'Tablets', 'Áudio', 'Wearables']
  const statuses = ['all', 'active', 'inactive', 'draft']

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || product.category === selectedCategory) &&
      (selectedStatus === 'all' || product.status === selectedStatus)
    )

    return filtered.sort((a, b) => {
      const aValue = a[sortKey]
      const bValue = b[sortKey]
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue)
      }
      
      return sortDirection === 'asc' 
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number)
    })
  }, [products, searchTerm, sortKey, sortDirection, selectedCategory, selectedStatus])

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDirection('desc')
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      case 'inactive':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'draft':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
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

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { color: 'text-red-400', text: 'Sem estoque' }
    if (stock <= 10) return { color: 'text-amber-400', text: 'Estoque baixo' }
    return { color: 'text-emerald-400', text: 'Em estoque' }
  }

  // Estatísticas
  const totalProducts = products.length
  const activeProducts = products.filter(p => p.status === 'active').length
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0)
  const lowStockProducts = products.filter(p => p.stock <= 10 && p.stock > 0).length
  const outOfStockProducts = products.filter(p => p.stock === 0).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Produtos"
        description="Gerencie seu catálogo de produtos"
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Produtos' }
        ]}
        showSearch={true}
        onSearch={setSearchTerm}
        searchPlaceholder="Pesquisar produtos..."
        actions={
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-1 lg:space-x-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-2 lg:px-4 py-2 rounded-xl hover:bg-white/20 transition-all text-sm lg:text-base"
            >
              <Download className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="hidden sm:inline">Exportar</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-1 lg:space-x-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-2 lg:px-4 py-2 rounded-xl hover:bg-white/20 transition-all text-sm lg:text-base"
            >
              <Upload className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="hidden sm:inline">Importar</span>
            </motion.button>
            
            <Link href="/admin/products/new">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-1 lg:space-x-2 bg-gradient-to-r from-[#0E7466] to-[#0C6157] text-white px-3 lg:px-6 py-2 lg:py-2.5 rounded-xl font-medium hover:shadow-lg transition-all text-sm lg:text-base"
              >
                <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
                <span>Novo</span>
              </motion.button>
            </Link>
          </>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
        <StatCard
          title="Total de Produtos"
          value={totalProducts}
          icon={<Package className="w-5 h-5" />}
        />
        
        <StatCard
          title="Produtos Ativos"
          value={activeProducts}
          icon={<CheckCircle className="w-5 h-5" />}
          trend="up"
          trendValue="+5.2%"
        />
        
        <StatCard
          title="Valor do Estoque"
          value={formatCurrency(totalValue)}
          icon={<DollarSign className="w-5 h-5" />}
        />
        
        <StatCard
          title="Estoque Baixo"
          value={lowStockProducts}
          icon={<AlertTriangle className="w-5 h-5" />}
          trend="down"
          trendValue="-2 produtos"
        />
        
        <StatCard
          title="Sem Estoque"
          value={outOfStockProducts}
          icon={<Trash2 className="w-5 h-5" />}
          trend="neutral"
        />
      </div>

      {/* Filters */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 lg:p-6"
      >
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
          {/* Category Filter */}
          <div className="min-w-0 lg:min-w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 lg:px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-[#0E7466] transition-all"
            >
              {categories.map(category => (
                <option key={category} value={category} className="bg-[#0C1A33] text-white">
                  {category === 'all' ? 'Todas as categorias' : category}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="min-w-0 lg:min-w-40">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 lg:px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-[#0E7466] transition-all"
            >
              {statuses.map(status => (
                <option key={status} value={status} className="bg-[#0C1A33] text-white">
                  {status === 'all' ? 'Todos os status' : getStatusText(status)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Products Table */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="text-left p-2 lg:p-4 text-gray-300 font-medium text-xs lg:text-sm">Produto</th>
                <th className="text-left p-2 lg:p-4 text-gray-300 font-medium text-xs lg:text-sm hidden md:table-cell">Categoria</th>
                <th 
                  className="text-left p-2 lg:p-4 text-gray-300 font-medium text-xs lg:text-sm cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('price')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Preço</span>
                    {sortKey === 'price' && (
                      sortDirection === 'asc' ? <ArrowUp className="w-3 h-3 lg:w-4 lg:h-4" /> : <ArrowDown className="w-3 h-3 lg:w-4 lg:h-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="text-left p-2 lg:p-4 text-gray-300 font-medium text-xs lg:text-sm cursor-pointer hover:text-white transition-colors hidden sm:table-cell"
                  onClick={() => handleSort('stock')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Estoque</span>
                    {sortKey === 'stock' && (
                      sortDirection === 'asc' ? <ArrowUp className="w-3 h-3 lg:w-4 lg:h-4" /> : <ArrowDown className="w-3 h-3 lg:w-4 lg:h-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="text-left p-2 lg:p-4 text-gray-300 font-medium text-xs lg:text-sm cursor-pointer hover:text-white transition-colors hidden lg:table-cell"
                  onClick={() => handleSort('sales')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Vendas</span>
                    {sortKey === 'sales' && (
                      sortDirection === 'asc' ? <ArrowUp className="w-3 h-3 lg:w-4 lg:h-4" /> : <ArrowDown className="w-3 h-3 lg:w-4 lg:h-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="text-left p-2 lg:p-4 text-gray-300 font-medium text-xs lg:text-sm cursor-pointer hover:text-white transition-colors hidden lg:table-cell"
                  onClick={() => handleSort('rating')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Avaliação</span>
                    {sortKey === 'rating' && (
                      sortDirection === 'asc' ? <ArrowUp className="w-3 h-3 lg:w-4 lg:h-4" /> : <ArrowDown className="w-3 h-3 lg:w-4 lg:h-4" />
                    )}
                  </div>
                </th>
                <th className="text-left p-2 lg:p-4 text-gray-300 font-medium text-xs lg:text-sm hidden md:table-cell">Status</th>
                <th className="text-left p-2 lg:p-4 text-gray-300 font-medium text-xs lg:text-sm">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedProducts.map((product, index) => {
                const stockStatus = getStockStatus(product.stock)
                return (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-all"
                  >
                    <td className="p-2 lg:p-4">
                      <div className="flex items-center space-x-2 lg:space-x-3">
                        <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-xl overflow-hidden">
                          <ProductImage
                            src={product.image}
                            alt={product.name}
                            size="sm"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-white font-medium text-xs lg:text-sm truncate">{product.name}</h4>
                          <p className="text-gray-400 text-xs hidden lg:block">SKU: {product.sku}</p>
                          {/* Mostrar categoria em mobile quando oculta da coluna */}
                          <p className="text-gray-400 text-xs md:hidden">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 lg:p-4 hidden md:table-cell">
                      <span className="text-gray-300 text-xs lg:text-sm">{product.category}</span>
                    </td>
                    <td className="p-2 lg:p-4">
                      <span className="text-white font-bold text-xs lg:text-sm">{formatCurrency(product.price)}</span>
                    </td>
                    <td className="p-2 lg:p-4 hidden sm:table-cell">
                      <div className="flex items-center space-x-1 lg:space-x-2">
                        <span className={`font-medium text-xs lg:text-sm ${stockStatus.color}`}>
                          {product.stock}
                        </span>
                        <span className={`text-xs hidden lg:inline ${stockStatus.color}`}>
                          {stockStatus.text}
                        </span>
                      </div>
                    </td>
                    <td className="p-2 lg:p-4 hidden lg:table-cell">
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 text-emerald-400" />
                        <span className="text-white font-medium text-sm">{product.sales}</span>
                      </div>
                    </td>
                    <td className="p-2 lg:p-4 hidden lg:table-cell">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-400 fill-current" />
                        <span className="text-white font-medium text-sm">{product.rating}</span>
                        <span className="text-gray-400 text-xs">({product.reviews})</span>
                      </div>
                    </td>
                    <td className="p-2 lg:p-4 hidden md:table-cell">
                      <span className={`px-2 lg:px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.status)}`}>
                        {getStatusText(product.status)}
                      </span>
                    </td>
                    <td className="p-2 lg:p-4">
                      <div className="flex items-center space-x-1 lg:space-x-2">
                        <button className="p-1 lg:p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                          <Eye className="w-3 h-3 lg:w-4 lg:h-4" />
                        </button>
                        <button className="p-1 lg:p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                          <Edit className="w-3 h-3 lg:w-4 lg:h-4" />
                        </button>
                        <button className="p-1 lg:p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                          <Trash2 className="w-3 h-3 lg:w-4 lg:h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>

          {filteredAndSortedProducts.length === 0 && (
            <div className="p-6 lg:p-12 text-center">
              <Package className="w-12 h-12 lg:w-16 lg:h-16 text-gray-400 mx-auto mb-3 lg:mb-4" />
              <h3 className="text-lg lg:text-xl font-bold text-white mb-2">Nenhum produto encontrado</h3>
              <p className="text-gray-400 text-sm lg:text-base">Tente ajustar os filtros ou adicione novos produtos</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
