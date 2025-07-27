'use client'

import { useUI } from '@/contexts/UIContext'
import { CartSidebar, CartBottomDrawer } from '@/components/cart/cart-sidebar'
import { CartModal } from '@/components/cart/cart-modal'

export default function CartWrapper() {
  const { isCartOpen, closeCart } = useUI()

  return (
    <>
      {/* Desktop Cart Modal */}
      <div className="hidden md:block">
        <CartModal />
      </div>
      
      {/* Mobile Cart Bottom Drawer */}
      <div className="md:hidden">
        <CartBottomDrawer isOpen={isCartOpen} onClose={closeCart} />
      </div>
    </>
  )
}
