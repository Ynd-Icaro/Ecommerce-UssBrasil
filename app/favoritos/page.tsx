"use client"
import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Filter, Grid, List, ArrowLeft, Star, Trash2 } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'
import { getAllProducts } from '@/lib/products-manager'

export default function FavoritosPage() {
  const { favorites, toggleFavorite, user } = useAuth()
  const { addToCart } = useCart()
  const router = useRouter()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'recent'>('recent')

  // Get favorite products data
  const favoriteProducts = useMemo(() => {
    const allProducts = getAllProducts()
    return allProducts.filter(product => favorites.includes(String(product.id)))
  }, [favorites])

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...favoriteProducts]
    switch (sortBy) {
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      case 'price':
        return sorted.sort((a, b) => a.price - b.price)
      case 'recent':
      default:
        return sorted
    }
  }, [favoriteProducts, sortBy])

  const handleAddToCart = (product: any) => {
    addToCart(product)
    toast.success(`${product.name} adicionado ao carrinho`)
  }

  const handleRemoveFavorite = (productId: string) => {
    const product = favoriteProducts.find(p => String(p.id) === productId)
    toggleFavorite(productId)
    toast.success(`${product?.name || 'Produto'} removido dos favoritos`)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12"
            >
              <Heart className="w-24 h-24 text-pink-300 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Faça login para ver seus favoritos
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Entre na sua conta para acessar sua lista de produtos favoritos
              </p>
              <Link
                href="/produtos"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-pink-700 hover:to-purple-700 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                Explorar Produtos
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  if (favoriteProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12"
            >
              <Heart className="w-24 h-24 text-pink-300 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Sua lista de favoritos está vazia
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Adicione produtos aos seus favoritos para vê-los aqui
              </p>
              <Link
                href="/produtos"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-pink-700 hover:to-purple-700 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                Descobrir Produtos
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="/produtos"
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Heart className="w-8 h-8 text-pink-500" />
                Meus Favoritos
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {favoriteProducts.length} {favoriteProducts.length === 1 ? 'produto' : 'produtos'} na sua lista
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="recent">Mais recentes</option>
                  <option value="name">Nome A-Z</option>
                  <option value="price">Menor preço</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600' 
                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600' 
                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Products Grid/List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }
        >
          {sortedProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className={
                viewMode === 'grid'
                  ? 'bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group'
                  : 'bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300'
              }
            >
              {viewMode === 'grid' ? (
                <>
                  {/* Grid View */}
                  <div className="relative aspect-square bg-gray-100 dark:bg-gray-700 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={() => handleRemoveFavorite(String(product.id))}
                      className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-red-50 rounded-full shadow-lg transition-colors group"
                    >
                      <Heart className="w-5 h-5 text-pink-500 fill-current" />
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-pink-600 transition-colors">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                      <span className="text-sm text-gray-500 ml-1">(4.8)</span>
                    </div>
                    
                    <p className="text-2xl font-bold text-pink-600 mb-4">
                      R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-pink-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Adicionar ao Carrinho
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex gap-6">
                  {/* List View */}
                  <div className="relative w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {product.name}
                      </h3>
                      <button
                        onClick={() => handleRemoveFavorite(String(product.id))}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                      <span className="text-sm text-gray-500 ml-1">(4.8)</span>
                    </div>
                    
                    <p className="text-2xl font-bold text-pink-600 mb-4">
                      R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-pink-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Adicionar ao Carrinho
                      </button>
                      <Link
                        href={`/product/${product.id}`}
                        className="px-6 py-2 border border-pink-600 text-pink-600 rounded-lg font-semibold hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
                      >
                        Ver Detalhes
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
