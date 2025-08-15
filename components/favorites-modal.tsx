'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Trash2, ShoppingCart, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { useFavorites } from '@/hooks/use-favorites'
import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'
import Image from 'next/image'
import Link from 'next/link'

interface FavoritesModalProps {
  isOpen: boolean
  onClose: () => void
}

interface Product {
  id: string
  name: string
  price: number
  image: string
  description?: string
}

interface Favorite {
  id: string
  product: Product
}

export default function FavoritesModal({ isOpen, onClose }: FavoritesModalProps) {
  const { user } = useAuth()
  const { favorites, removeFromFavorites, isLoading } = useFavorites()
  const { addToCart } = useCart()

  const handleAddToCart = async (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    })
    toast.success('Produto adicionado ao carrinho!')
  }

  const handleRemoveFavorite = async (productId: string) => {
    await removeFromFavorites(productId)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          zIndex: 9999
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            width: '100%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflow: 'hidden',
            margin: 'auto'
          }}
        >
          <Card className="border-0 shadow-2xl bg-white">
            <CardHeader className="pb-4 relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="absolute right-2 top-2 h-8 w-8 rounded-full hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Heart className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <CardTitle className="text-xl text-gray-900">Meus Favoritos</CardTitle>
                  <p className="text-sm text-gray-500">
                    {favorites.length} {favorites.length === 1 ? 'produto favoritado' : 'produtos favoritados'}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              {!user ? (
                <div className="text-center py-12 px-6">
                  <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Faça login para ver seus favoritos
                  </h3>
                  <p className="text-gray-600">
                    Entre em sua conta para salvar produtos favoritos
                  </p>
                </div>
              ) : isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00CED1]"></div>
                </div>
              ) : favorites.length === 0 ? (
                <div className="text-center py-12 px-6">
                  <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Nenhum favorito ainda
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Explore nossos produtos e adicione seus favoritos
                  </p>
                  <Button 
                    onClick={onClose}
                    className="bg-gradient-to-r from-[#00CED1] to-[#20B2AA] hover:from-[#20B2AA] hover:to-[#00CED1] text-white"
                  >
                    Explorar Produtos
                  </Button>
                </div>
              ) : (
                <div className="max-h-96 overflow-y-auto px-6 pb-6">
                  <div className="space-y-4">
                    {favorites.map((favorite, index) => (
                      <motion.div
                        key={favorite.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.1 }}
                        className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="relative w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={favorite.product.image || '/placeholder-image.jpg'}
                            alt={favorite.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800 truncate">
                            {favorite.product.name}
                          </h4>
                          {favorite.product.description && (
                            <p className="text-sm text-gray-600 truncate">
                              {favorite.product.description}
                            </p>
                          )}
                          <p className="text-lg font-bold text-[#00CED1] mt-1">
                            R$ {favorite.product.price.toFixed(2)}
                          </p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleAddToCart(favorite.product)}
                            className="bg-gradient-to-r from-[#00CED1] to-[#20B2AA] hover:from-[#20B2AA] hover:to-[#00CED1] text-white"
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                          
                          <Link href={`/product/${favorite.product.id}`} onClick={onClose}>
                            <Button variant="outline" size="sm">
                              Ver
                            </Button>
                          </Link>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveFavorite(favorite.product.id)}
                            className="text-red-500 hover:text-red-600 hover:border-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {favorites.length > 0 && (
                <div className="border-t bg-gray-50 px-6 py-4">
                  <div className="flex justify-between items-center">
                    <Link href="/favorites" onClick={onClose}>
                      <Button variant="outline">
                        Ver Todos os Favoritos
                      </Button>
                    </Link>
                    
                    <Button 
                      onClick={onClose}
                      className="bg-gradient-to-r from-[#00CED1] to-[#20B2AA] hover:from-[#20B2AA] hover:to-[#00CED1] text-white"
                    >
                      Continuar Comprando
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
