'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Trash2, 
  Star,
  Eye,
  Share2,
  Filter,
  Grid,
  List
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useModal } from '@/contexts/ModalContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import { useCart } from '@/contexts/CartContext'
import { useState } from 'react'
import data from '@/db.json'

export default function FavoritesModal() {
  const { isFavoritesOpen, closeFavorites } = useModal()
  const { favorites, toggleFavorite, isFavorite } = useFavorites()
  const { addToCart } = useCart()
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filterBy, setFilterBy] = useState('all')

  // Buscar produtos completos pelos IDs dos favoritos
  const favoriteProducts = data.products.filter((product: any) => 
    favorites.includes(parseInt(product.id))
  )

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const filteredFavorites = favoriteProducts.filter((item: any) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.brand?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterBy === 'all' || 
                         (filterBy === 'onSale' && item.discountPrice) ||
                         (filterBy === 'recent' && item.createdAt)
    
    return matchesSearch && matchesFilter
  })

  const handleAddToCart = (item: any) => {
    addToCart(item)
  }

  const handleRemoveFromFavorites = (productId: string) => {
    toggleFavorite(parseInt(productId))
  }

  const handleClearFavorites = () => {
    favorites.forEach(id => toggleFavorite(id))
  }

  return (
    <AnimatePresence>
      {isFavoritesOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeFavorites}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                    <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Favoritos</h2>
                    <p className="text-sm text-gray-500">
                      {favoriteProducts.length} {favoriteProducts.length === 1 ? 'item salvo' : 'itens salvos'}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeFavorites}
                  className="h-8 w-8 p-0 hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Controles */}
              {favoriteProducts.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Busca */}
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Buscar nos favoritos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="h-9"
                    />
                  </div>

                  {/* Filtros e Visualização */}
                  <div className="flex items-center gap-2">
                    <select
                      value={filterBy}
                      onChange={(e) => setFilterBy(e.target.value)}
                      className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-uss-primary"
                    >
                      <option value="all">Todos</option>
                      <option value="onSale">Em Oferta</option>
                      <option value="recent">Recentes</option>
                    </select>

                    <div className="flex items-center bg-gray-100 rounded-lg p-1">
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                        className="h-7 w-7 p-0"
                      >
                        <Grid className="h-3 w-3" />
                      </Button>
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                        className="h-7 w-7 p-0"
                      >
                        <List className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Conteúdo */}
            <div className="flex-1 overflow-auto">
              {favoriteProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Heart className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Nenhum favorito ainda
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Salve produtos que você gosta e eles aparecerão aqui
                  </p>
                  <Button onClick={closeFavorites} className="bg-uss-primary hover:bg-uss-primary/90">
                    Explorar Produtos
                  </Button>
                </div>
              ) : filteredFavorites.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Filter className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Nenhum resultado encontrado
                  </h3>
                  <p className="text-gray-500">
                    Tente ajustar sua busca ou filtros
                  </p>
                </div>
              ) : (
                <div className="p-6">
                  {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {filteredFavorites.map((item: any) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="group bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
                        >
                          <div className="relative mb-3">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={150}
                              height={150}
                              className="w-full h-32 object-contain rounded-lg bg-white"
                            />
                            {item.discountPrice && (
                              <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs">
                                -{Math.round(((item.price - item.discountPrice) / item.price) * 100)}%
                              </Badge>
                            )}
                            <button
                              onClick={() => handleRemoveFromFavorites(item.id)}
                              className="absolute top-2 left-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                            >
                              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                            </button>
                          </div>
                          
                          <h4 className="font-medium text-gray-900 line-clamp-2 mb-1 group-hover:text-uss-primary transition-colors">
                            {item.name}
                          </h4>
                          
                          <p className="text-sm text-gray-500 mb-2">{item.brand}</p>
                          
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <span className="text-lg font-bold text-uss-primary">
                                {formatPrice(item.discountPrice || item.price)}
                              </span>
                              {item.discountPrice && (
                                <span className="block text-sm text-gray-400 line-through">
                                  {formatPrice(item.price)}
                                </span>
                              )}
                            </div>
                            
                            {item.rating && (
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm text-gray-600">{item.rating}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleAddToCart(item)}
                              className="flex-1 bg-uss-primary hover:bg-uss-primary/90 h-8 text-xs"
                            >
                              <ShoppingBag className="h-3 w-3 mr-1" />
                              Adicionar
                            </Button>
                            <Link href={`/product/${item.id}`} onClick={closeFavorites}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                            </Link>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredFavorites.map((item: any) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                          <div className="relative">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="object-contain rounded-lg bg-white"
                            />
                            {item.discountPrice && (
                              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
                                -{Math.round(((item.price - item.discountPrice) / item.price) * 100)}%
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 line-clamp-2 mb-1">
                              {item.name}
                            </h4>
                            <p className="text-sm text-gray-500 mb-2">{item.brand}</p>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-lg font-bold text-uss-primary">
                                  {formatPrice(item.discountPrice || item.price)}
                                </span>
                                {item.discountPrice && (
                                  <span className="block text-sm text-gray-400 line-through">
                                    {formatPrice(item.price)}
                                  </span>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleAddToCart(item)}
                                  className="bg-uss-primary hover:bg-uss-primary/90 h-8"
                                >
                                  <ShoppingBag className="h-3 w-3 mr-1" />
                                  Carrinho
                                </Button>
                                
                                <Link href={`/product/${item.id}`} onClick={closeFavorites}>
                                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                    <Eye className="h-3 w-3" />
                                  </Button>
                                </Link>
                                
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveFromFavorites(item.id)}
                                  className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {favoriteProducts.length > 0 && (
              <div className="border-t border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {filteredFavorites.length} de {favoriteProducts.length} favoritos
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (confirm('Tem certeza que deseja limpar todos os favoritos?')) {
                          handleClearFavorites()
                        }
                      }}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Limpar Tudo
                    </Button>
                    
                    <Button
                      onClick={closeFavorites}
                      className="bg-uss-primary hover:bg-uss-primary/90"
                    >
                      Continuar Comprando
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
