'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/types'

interface WishlistState {
  items: Product[]
  
  // Actions
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  toggleItem: (product: Product) => void
  clearWishlist: () => void
  
  // Computed
  isInWishlist: (productId: string) => boolean
  itemCount: number
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const state = get()
        if (!state.items.find(item => item.id === product.id)) {
          set({ items: [...state.items, product] })
        }
      },

      removeItem: (productId) => {
        const state = get()
        set({ items: state.items.filter(item => item.id !== productId) })
      },

      toggleItem: (product) => {
        const state = get()
        const existingItem = state.items.find(item => item.id === product.id)
        
        if (existingItem) {
          get().removeItem(product.id)
        } else {
          get().addItem(product)
        }
      },

      clearWishlist: () => {
        set({ items: [] })
      },

      isInWishlist: (productId) => {
        return get().items.some(item => item.id === productId)
      },

      get itemCount() {
        return get().items.length
      }
    }),
    {
      name: 'uss-brasil-wishlist',
      partialize: (state) => ({
        items: state.items
      })
    }
  )
)

// Hook for easy usage
export const useWishlist = () => {
  const store = useWishlistStore()
  
  return {
    ...store,
    addToWishlist: store.addItem,
    removeFromWishlist: store.removeItem,
    toggleWishlist: store.toggleItem,
    isEmpty: store.items.length === 0
  }
}
