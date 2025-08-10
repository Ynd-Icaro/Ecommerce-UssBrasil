'use client'

import { useState, useMemo } from 'react'
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
  Tag,
  Grid,
  Download,
  Upload,
  FolderOpen
} from 'lucide-react'
import Link from 'next/link'
import PageHeader from '@/components/admin/PageHeader'
import StatCard from '@/components/admin/StatCard'
import { AdminCategory, categoryStorage } from '@/lib/admin-storage'

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'products' | 'created'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [categories, setCategories] = useState<AdminCategory[]>(() => categoryStorage.getAll())

  // Funções de formatação
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      case 'inactive':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativa'
      case 'inactive':
        return 'Inativa'
      default:
        return status
    }
  }

  // Filtros e ordenação
  const filteredAndSortedCategories = useMemo(() => {
    let filtered = categories.filter(category => {
      const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          category.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || category.status === statusFilter
      return matchesSearch && matchesStatus
    })

    return filtered.sort((a, b) => {
      let aValue: any, bValue: any
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
        case 'products':
          aValue = a.productCount
          bValue = b.productCount
          break
        case 'created':
          aValue = new Date(a.createdAt)
          bValue = new Date(b.createdAt)
          break
        default:
          return 0
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })
  }, [categories, searchTerm, sortBy, sortOrder, statusFilter])

  // Estatísticas
  const totalCategories = categories.length
  const activeCategories = categories.filter(c => c.status === 'active').length
  const totalProducts = categories.reduce((sum, c) => sum + c.productCount, 0)
  const emptyCategories = categories.filter(c => c.productCount === 0).length

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta categoria?')) {
      categoryStorage.delete(id)
      setCategories(categoryStorage.getAll())
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Categorias"
        description="Organize seus produtos em categorias"
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Categorias' }
        ]}
        showSearch={true}
        onSearch={setSearchTerm}
        searchPlaceholder="Pesquisar categorias..."
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
            
            <Link href="/admin/categories/new">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-1 lg:space-x-2 relative overflow-hidden px-3 lg:px-6 py-2 lg:py-2.5 rounded-xl font-medium text-white text-sm lg:text-base transition-all duration-300"
                style={{ 
                  background: 'var(--uss-gradient-premium)',
                  backgroundSize: '200% 200%',
                  boxShadow: 'var(--uss-shadow-lg)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundPosition = 'right center'
                  e.currentTarget.style.boxShadow = 'var(--uss-shadow-xl)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundPosition = 'left center'
                  e.currentTarget.style.boxShadow = 'var(--uss-shadow-lg)'
                }}
              >
                <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
                <span>Nova</span>
              </motion.button>
            </Link>
          </>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard
          title="Total de Categorias"
          value={totalCategories.toString()}
          icon={<Tag className="w-4 h-4 lg:w-5 lg:h-5" />}
          trend="up"
          trendValue="+12%"
        />
        <StatCard
          title="Categorias Ativas"
          value={activeCategories.toString()}
          icon={<Grid className="w-4 h-4 lg:w-5 lg:h-5" />}
          trend="up"
          trendValue="+5%"
        />
        <StatCard
          title="Total de Produtos"
          value={totalProducts.toString()}
          icon={<Package className="w-4 h-4 lg:w-5 lg:h-5" />}
          trend="up"
          trendValue="+8%"
        />
        <StatCard
          title="Categorias Vazias"
          value={emptyCategories.toString()}
          icon={<FolderOpen className="w-4 h-4 lg:w-5 lg:h-5" />}
          trend="down"
          trendValue="-2%"
        />
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 lg:p-6"
      >
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-wrap gap-2 lg:gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent transition-all duration-300"
            >
              <option value="all">Todos os status</option>
              <option value="active">Ativas</option>
              <option value="inactive">Inativas</option>
            </select>
          </div>
          
          <div className="text-sm text-gray-400">
            {filteredAndSortedCategories.length} de {totalCategories} categorias
          </div>
        </div>
      </motion.div>

      {/* Categories Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="relative overflow-hidden rounded-2xl"
        style={{
          background: 'rgba(248, 250, 252, 0.05)',
          backdropFilter: 'blur(16px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors text-sm lg:text-base font-medium"
                  >
                    <span>Nome</span>
                    {sortBy === 'name' && (
                      sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left">
                  <span className="text-gray-300 text-sm lg:text-base font-medium">Descrição</span>
                </th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left">
                  <button
                    onClick={() => handleSort('products')}
                    className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors text-sm lg:text-base font-medium"
                  >
                    <span>Produtos</span>
                    {sortBy === 'products' && (
                      sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left">
                  <span className="text-gray-300 text-sm lg:text-base font-medium">Status</span>
                </th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left">
                  <button
                    onClick={() => handleSort('created')}
                    className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors text-sm lg:text-base font-medium"
                  >
                    <span>Criado em</span>
                    {sortBy === 'created' && (
                      sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-right">
                  <span className="text-gray-300 text-sm lg:text-base font-medium">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredAndSortedCategories.map((category, index) => {
                return (
                  <motion.tr
                    key={category.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: index * 0.05,
                      duration: 0.4,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    whileHover={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      scale: 1.01,
                      transition: { duration: 0.2 }
                    }}
                    className="transition-all duration-300 cursor-pointer"
                  >
                    <td className="px-4 lg:px-6 py-3 lg:py-4">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center transition-all duration-300"
                          style={{ background: 'var(--uss-gradient-premium)' }}
                        >
                          <Tag className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white text-sm lg:text-base">{category.name}</h3>
                          <p className="text-xs lg:text-sm text-gray-400">{category.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4">
                      <p className="text-sm lg:text-base text-gray-300 max-w-xs truncate">
                        {category.description}
                      </p>
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4">
                      <div className="flex items-center space-x-2">
                        <Package className="w-4 h-4 text-gray-400" />
                        <span className="text-sm lg:text-base text-white font-medium">
                          {category.productCount}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(category.status)}`}>
                        {getStatusText(category.status)}
                      </span>
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4">
                      <span className="text-sm lg:text-base text-gray-300">
                        {formatDate(category.createdAt)}
                      </span>
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4">
                      <div className="flex items-center justify-end space-x-1 lg:space-x-2">
                        <button className="p-1 lg:p-2 text-gray-400 hover:text-white transition-colors">
                          <Eye className="w-3 h-3 lg:w-4 lg:h-4" />
                        </button>
                        <button className="p-1 lg:p-2 text-gray-400 hover:text-white transition-colors">
                          <Edit className="w-3 h-3 lg:w-4 lg:h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(category.id)}
                          className="p-1 lg:p-2 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-3 h-3 lg:w-4 lg:h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>

          {filteredAndSortedCategories.length === 0 && (
            <div className="p-6 lg:p-12 text-center">
              <Tag className="w-12 h-12 lg:w-16 lg:h-16 text-gray-400 mx-auto mb-3 lg:mb-4" />
              <h3 className="text-lg lg:text-xl font-bold text-white mb-2">Nenhuma categoria encontrada</h3>
              <p className="text-gray-400 text-sm lg:text-base">Tente ajustar os filtros ou adicione novas categorias</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
