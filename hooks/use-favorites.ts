'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { useAuth } from '@/contexts/AuthContext'

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

export function useFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      loadFavorites()
    } else {
      setFavorites([])
      setIsLoading(false)
    }
  }, [user])

  const loadFavorites = async () => {
    if (!user) return

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

  const addToFavorites = async (productId: string) => {
    if (!user) {
      toast.error('Faça login para adicionar aos favoritos')
      return false
    }

    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId })
      })

      if (response.ok) {
        await loadFavorites() // Recarregar a lista
        toast.success('Produto adicionado aos favoritos')
        return true
      } else {
        const data = await response.json()
        toast.error(data.error || 'Erro ao adicionar aos favoritos')
        return false
      }
    } catch (error) {
      toast.error('Erro ao adicionar aos favoritos')
      return false
    }
  }

  const removeFromFavorites = async (productId: string) => {
    if (!user) return false

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
        return true
      } else {
        toast.error('Erro ao remover dos favoritos')
        return false
      }
    } catch (error) {
      toast.error('Erro ao remover dos favoritos')
      return false
    }
  }

  const isFavorite = (productId: string) => {
    return favorites.some(fav => fav.product.id === productId)
  }

  const toggleFavorite = async (productId: string) => {
    if (isFavorite(productId)) {
      return await removeFromFavorites(productId)
    } else {
      return await addToFavorites(productId)
    }
  }

  return {
    favorites,
    isLoading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    loadFavorites
  }
}
