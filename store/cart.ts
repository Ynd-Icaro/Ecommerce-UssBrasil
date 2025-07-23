import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: string
  name: string
  price: number
  discountPrice?: number
  image: string
  quantity: number
  stock: number
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (item) => {
        const { items } = get()
        const existingItem = items.find(i => i.id === item.id)
        
        if (existingItem) {
          set({
            items: items.map(i =>
              i.id === item.id
                ? { ...i, quantity: Math.min(i.quantity + item.quantity, i.stock) }
                : i
            )
          })
        } else {
          set({ items: [...items, item] })
        }
      },
      
      removeItem: (id) => {
        set({ items: get().items.filter(item => item.id !== id) })
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        
        set({
          items: get().items.map(item =>
            item.id === id
              ? { ...item, quantity: Math.min(quantity, item.stock) }
              : item
          )
        })
      },
      
      clearCart: () => {
        set({ items: [] })
      },
      
      toggleCart: () => {
        set({ isOpen: !get().isOpen })
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.discountPrice || item.price
          return total + (price * item.quantity)
        }, 0)
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items })
    }
  )
)
