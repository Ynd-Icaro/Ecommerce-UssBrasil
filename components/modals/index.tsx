'use client'

import React from 'react'
import { useModal } from '@/contexts/ModalContext'
import AuthModal from './auth-modal'
import CartModal from './cart-modal'

export default function GlobalModals() {
  const { authModalOpen, setAuthModalOpen, cartModalOpen, setCartModalOpen } = useModal()

  return (
    <>
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <CartModal isOpen={cartModalOpen} onClose={() => setCartModalOpen(false)} />
    </>
  )
}
