'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface ModalContextType {
  // Estados dos modais
  isCartOpen: boolean
  isFavoritesOpen: boolean
  isProfileOpen: boolean
  authModalOpen: boolean
  cartModalOpen: boolean
  
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

  // Novos modais
  setAuthModalOpen: (open: boolean) => void
  setCartModalOpen: (open: boolean) => void
  openAuthModal: () => void
  closeAuthModal: () => void
  openCartModal: () => void
  closeCartModal: () => void
  
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
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [cartModalOpen, setCartModalOpen] = useState(false)

  // Funções do carrinho
  const openCart = () => {
    closeAllModals()
    setCartModalOpen(true)
  }
  
  const closeCart = () => {
    setIsCartOpen(false)
    setCartModalOpen(false)
  }
  
  const toggleCart = () => {
    if (isCartOpen || cartModalOpen) {
      closeCart()
    } else {
      openCart()
    }
  }

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

  // Novas funções de modal
  const openAuthModal = () => setAuthModalOpen(true)
  const closeAuthModal = () => setAuthModalOpen(false)
  const openCartModal = () => setCartModalOpen(true)
  const closeCartModal = () => setCartModalOpen(false)

  // Fechar todos os modais
  const closeAllModals = () => {
    setIsCartOpen(false)
    setIsFavoritesOpen(false)
    setIsProfileOpen(false)
    setAuthModalOpen(false)
    setCartModalOpen(false)
  }

  const value: ModalContextType = {
    isCartOpen,
    isFavoritesOpen,
    isProfileOpen,
    authModalOpen,
    cartModalOpen,
    openCart,
    closeCart,
    toggleCart,
    openFavorites,
    closeFavorites,
    toggleFavorites,
    openProfile,
    closeProfile,
    toggleProfile,
    setAuthModalOpen,
    setCartModalOpen,
    openAuthModal,
    closeAuthModal,
    openCartModal,
    closeCartModal,
    closeAllModals,
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
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}
