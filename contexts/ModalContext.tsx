'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface ModalContextType {
  // Estados dos modais
  isCartOpen: boolean
  isFavoritesOpen: boolean
  isProfileOpen: boolean
  
  // Funções de controle
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  
  openFavorites: () => void
  closeFavorites: () => void
  toggleFavorites: () => void
  
  openProfile: () => void
  closeProfile: () => void
  toggleProfile: () => void
  
  // Função para fechar todos
  closeAllModals: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

interface ModalProviderProps {
  children: ReactNode
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  // Funções do carrinho
  const openCart = () => {
    closeAllModals()
    setIsCartOpen(true)
  }
  const closeCart = () => setIsCartOpen(false)
  const toggleCart = () => setIsCartOpen(!isCartOpen)

  // Funções dos favoritos
  const openFavorites = () => {
    closeAllModals()
    setIsFavoritesOpen(true)
  }
  const closeFavorites = () => setIsFavoritesOpen(false)
  const toggleFavorites = () => setIsFavoritesOpen(!isFavoritesOpen)

  // Funções do perfil
  const openProfile = () => {
    closeAllModals()
    setIsProfileOpen(true)
  }
  const closeProfile = () => setIsProfileOpen(false)
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen)

  // Fechar todos os modais
  const closeAllModals = () => {
    setIsCartOpen(false)
    setIsFavoritesOpen(false)
    setIsProfileOpen(false)
  }

  const value: ModalContextType = {
    isCartOpen,
    isFavoritesOpen,
    isProfileOpen,
    openCart,
    closeCart,
    toggleCart,
    openFavorites,
    closeFavorites,
    toggleFavorites,
    openProfile,
    closeProfile,
    toggleProfile,
    closeAllModals
  }

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal deve ser usado dentro de um ModalProvider')
  }
  return context
}
