'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface UIContextType {
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
}

const UIContext = createContext<UIContextType | undefined>(undefined)

export function UIProvider({ children }: { children: ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false)

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)
  const toggleCart = () => setIsCartOpen(!isCartOpen)

  return (
    <UIContext.Provider value={{
      isCartOpen,
      openCart,
      closeCart,
      toggleCart
    }}>
      {children}
    </UIContext.Provider>
  )
}

export function useUI() {
  const context = useContext(UIContext)
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider')
  }
  return context
}
