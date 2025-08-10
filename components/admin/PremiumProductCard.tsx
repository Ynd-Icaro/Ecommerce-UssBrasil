'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
  Eye, 
  Edit, 
  Trash2, 
  MoreHorizontal, 
  Star,
  DollarSign,
  Package,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react'
import Link from 'next/link'
import PremiumButton from '@/components/ui/PremiumButton'

interface PremiumProductCardProps {
  product: {
    id: string | number
    name: string
    price: number
    originalPrice?: number
    category: string
    stock: number
    image: string
    status: 'active' | 'inactive' | 'draft'
    rating?: number
    sales?: number
    trend?: 'up' | 'down' | 'stable'
    featured?: boolean
  }
  onEdit?: (id: string | number) => void
  onDelete?: (id: string | number) => void
  onView?: (id: string | number) => void
}

const PremiumProductCard = ({ 
  product, 
  onEdit, 
  onDelete, 
  onView 
}: PremiumProductCardProps) => {
  const [showActions, setShowActions] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30'
      case 'inactive':
        return 'text-red-400 bg-red-500/20 border-red-500/30'
      case 'draft':
        return 'text-amber-400 bg-amber-500/20 border-amber-500/30'
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/30'
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

  const getTrendIcon = () => {
    switch (product.trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3 text-emerald-400" />
      case 'down':
        return <TrendingDown className="w-3 h-3 text-red-400" />
      default:
        return <Minus className="w-3 h-3 text-gray-400" />
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4 }}
      className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-500"
      style={{ boxShadow: 'var(--uss-shadow-lg)' }}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Featured Badge */}
      {product.featured && (
        <div className="absolute top-3 left-3 z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center space-x-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium"
          >
            <Star className="w-3 h-3 fill-current" />
            <span>Destaque</span>
          </motion.div>
        </div>
      )}

      {/* Status Badge */}
      <div className="absolute top-3 right-3 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-xs px-2 py-1 rounded-full border backdrop-blur-sm font-medium ${getStatusColor(product.status)}`}
        >
          {getStatusText(product.status)}
        </motion.div>
      </div>

      {/* Product Image */}
      <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
        
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
            <Package className="w-8 h-8 text-gray-400 animate-pulse" />
          </div>
        )}

        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          onLoad={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
        />

        {/* Quick Actions Overlay */}
        <AnimatePresence>
          {showActions && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center space-x-3 z-20"
            >
              <PremiumButton
                variant="secondary"
                size="sm"
                icon={<Eye className="w-4 h-4" />}
                onClick={() => onView?.(product.id)}
                className="!px-3 !py-2"
              >
                Ver
              </PremiumButton>
              
              <PremiumButton
                variant="primary"
                size="sm"
                icon={<Edit className="w-4 h-4" />}
                onClick={() => onEdit?.(product.id)}
                className="!px-3 !py-2"
              >
                Editar
              </PremiumButton>
              
              <PremiumButton
                variant="secondary"
                size="sm"
                icon={<Trash2 className="w-4 h-4" />}
                onClick={() => onDelete?.(product.id)}
                className="!px-3 !py-2 !bg-red-500/20 !border-red-500/30 hover:!bg-red-500/30 !text-red-400"
              >
                Excluir
              </PremiumButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5 lg:p-6">
        {/* Product Name & Category */}
        <div className="mb-3">
          <h3 className="text-white font-semibold text-sm sm:text-base lg:text-lg mb-1 line-clamp-2 leading-tight">
            {product.name}
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm">
            {product.category}
          </p>
        </div>

        {/* Price & Stock */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="text-white font-bold text-lg sm:text-xl">
                {formatPrice(product.price)}
              </span>
              {getTrendIcon()}
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-gray-400 text-sm line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          <div className="text-right">
            <p className="text-gray-400 text-xs mb-1">Estoque</p>
            <p className={`text-sm font-medium ${
              product.stock > 10 ? 'text-emerald-400' :
              product.stock > 0 ? 'text-amber-400' : 'text-red-400'
            }`}>
              {product.stock} un.
            </p>
          </div>
        </div>

        {/* Rating & Sales */}
        {(product.rating || product.sales) && (
          <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
            {product.rating && (
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{product.rating.toFixed(1)}</span>
              </div>
            )}
            {product.sales && (
              <div className="flex items-center space-x-1">
                <DollarSign className="w-3 h-3" />
                <span>{product.sales} vendas</span>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <PremiumButton
            variant="outline"
            size="sm"
            fullWidth
            icon={<Eye className="w-4 h-4" />}
            onClick={() => onView?.(product.id)}
          >
            Visualizar
          </PremiumButton>
          
          <PremiumButton
            variant="primary"
            size="sm"
            fullWidth
            icon={<Edit className="w-4 h-4" />}
            onClick={() => onEdit?.(product.id)}
          >
            Editar
          </PremiumButton>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
    </motion.div>
  )
}

export default PremiumProductCard
