'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product } from '@/types'

interface CartState {
  items: CartItem[]
  isOpen: boolean
  total: number
  subtotal: number
  itemCount: number
  
  // Actions
  addItem: (product: Product, quantity?: number, options?: { color?: string; variant?: any }) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  
  // Computed
  getItem: (productId: string) => CartItem | undefined
  isInCart: (productId: string) => boolean
  calculateTotals: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      total: 0,
      subtotal: 0,
      itemCount: 0,

      addItem: (product, quantity = 1, options = {}) => {
        const state = get()
        const existingItemIndex = state.items.findIndex(
          item => 
            item.productId === product.id &&
            item.selectedColor === options.color &&
            JSON.stringify(item.selectedVariant) === JSON.stringify(options.variant)
        )

        if (existingItemIndex >= 0) {
          // Update quantity of existing item
          const updatedItems = [...state.items]
          updatedItems[existingItemIndex].quantity += quantity
          set({ items: updatedItems })
        } else {
          // Add new item
          const newItem: CartItem = {
            id: `${product.id}-${Date.now()}`,
            productId: product.id,
            product,
            quantity,
            selectedColor: options.color,
            selectedVariant: options.variant,
            addedAt: new Date().toISOString()
          }
          set({ items: [...state.items, newItem] })
        }
        
        get().calculateTotals()
      },

      removeItem: (itemId) => {
        const state = get()
        set({ items: state.items.filter(item => item.id !== itemId) })
        get().calculateTotals()
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }

        const state = get()
        const updatedItems = state.items.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
        set({ items: updatedItems })
        get().calculateTotals()
      },

      clearCart: () => {
        set({ items: [], total: 0, subtotal: 0, itemCount: 0 })
      },

      toggleCart: () => {
        set(state => ({ isOpen: !state.isOpen }))
      },

      openCart: () => {
        set({ isOpen: true })
      },

      closeCart: () => {
        set({ isOpen: false })
      },

      getItem: (productId) => {
        return get().items.find(item => item.productId === productId)
      },

      isInCart: (productId) => {
        return get().items.some(item => item.productId === productId)
      },

      calculateTotals: () => {
        const state = get()
        const subtotal = state.items.reduce((total, item) => {
          const price = item.product.discountPrice || item.product.price
          return total + (price * item.quantity)
        }, 0)
        
        const itemCount = state.items.reduce((count, item) => count + item.quantity, 0)
        
        // Calculate shipping (free over R$ 299)
        const shipping = subtotal >= 299 ? 0 : 29.90
        
        // Calculate total
        const total = subtotal + shipping
        
        set({ subtotal, total, itemCount })
      }
    }),
    {
      name: 'uss-brasil-cart',
      partialize: (state) => ({
        items: state.items
      })
    }
  )
)

// Hook for easy usage
export const useCart = () => {
  const store = useCartStore()
  
  return {
    ...store,
    addToCart: store.addItem,
    removeFromCart: store.removeItem,
    isEmpty: store.items.length === 0,
    shippingInfo: {
      freeShippingThreshold: 299,
      shippingCost: 29.90,
      isFreeShipping: store.subtotal >= 299,
      amountForFreeShipping: Math.max(0, 299 - store.subtotal)
    }
  }
}
