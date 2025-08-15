'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, Trash2, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import Image from 'next/image'
import Link from 'next/link'

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

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Verificar se usuário está logado
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
      loadFavorites()
    } else {
      setIsLoading(false)
    }
  }, [])

  const loadFavorites = async () => {
    try {
      const response = await fetch('/api/favorites')
      if (response.ok) {
        const data = await response.json()
        setFavorites(data)
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const removeFavorite = async (productId: string) => {
    try {
      const response = await fetch('/api/favorites', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId })
      })

      if (response.ok) {
        setFavorites(favorites.filter(fav => fav.product.id !== productId))
        toast.success('Produto removido dos favoritos')
      }
    } catch (error) {
      toast.error('Erro ao remover produto dos favoritos')
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Faça login para ver seus favoritos</h1>
          <p className="text-gray-600 mb-6">Entre em sua conta para salvar e gerenciar seus produtos favoritos</p>
          <Link href="/login">
            <Button className="bg-gradient-to-r from-[#00CED1] to-[#20B2AA] hover:from-[#20B2AA] hover:to-[#00CED1] text-white">
              Fazer Login
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#00CED1]"></div>
      </div>
    )
  }

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Nenhum favorito ainda</h1>
          <p className="text-gray-600 mb-6">Explore nossos produtos e adicione seus favoritos</p>
          <Link href="/">
            <Button className="bg-gradient-to-r from-[#00CED1] to-[#20B2AA] hover:from-[#20B2AA] hover:to-[#00CED1] text-white">
              Explorar Produtos
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="h-8 w-8 text-red-500" />
        <h1 className="text-3xl font-bold text-gray-800">Meus Favoritos</h1>
        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
          {favorites.length} {favorites.length === 1 ? 'item' : 'itens'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((favorite, index) => (
          <motion.div
            key={favorite.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4">
                <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={favorite.product.image || '/placeholder-image.jpg'}
                    alt={favorite.product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white"
                    onClick={() => removeFavorite(favorite.product.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-800 line-clamp-2">
                    {favorite.product.name}
                  </h3>
                  
                  {favorite.product.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {favorite.product.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-lg font-bold text-[#00CED1]">
                      R$ {favorite.product.price.toFixed(2)}
                    </span>
                    
                    <div className="flex gap-2">
                      <Link href={`/product/${favorite.product.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-3 text-xs"
                        >
                          Ver Detalhes
                        </Button>
                      </Link>
                      
                      <Button
                        size="sm"
                        className="h-8 px-3 bg-gradient-to-r from-[#00CED1] to-[#20B2AA] hover:from-[#20B2AA] hover:to-[#00CED1] text-white"
                      >
                        <ShoppingCart className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
