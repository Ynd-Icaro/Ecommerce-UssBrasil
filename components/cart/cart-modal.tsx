'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { useUI } from '@/contexts/UIContext'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { darkComponents, darkAnimations } from '@/lib/design-system'

export function CartModal() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart()
  const { isCartOpen, closeCart } = useUI()

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-2xl mx-4 bg-white rounded-3xl shadow-2xl overflow-hidden z-50"
            style={darkComponents.modal}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-[#00CED1]" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Carrinho ({cartCount})
                </h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeCart}
                className="rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex flex-col max-h-[70vh]">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Seu carrinho está vazio
                  </h3>
                  <p className="text-gray-500 text-center mb-6">
                    Adicione produtos para começar suas compras
                  </p>
                  <Button
                    onClick={closeCart}
                    className="bg-gradient-to-r from-[#00CED1] to-[#20B2AA] hover:from-[#00B8CC] hover:to-[#1A9B9E] text-white px-8 py-3 rounded-full"
                  >
                    Continuar Comprando
                  </Button>
                </div>
              ) : (
                <>
                  {/* Items List */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl"
                      >
                        {/* Product Image */}
                        <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden shadow-sm">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {item.name}
                          </h4>
                          <p className="text-[#00CED1] font-bold">
                            {formatPrice(item.price)}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full border-gray-300"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full border-gray-300"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="border-t border-gray-200/50 p-6 bg-gray-50/50">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-semibold text-gray-700">
                        Total:
                      </span>
                      <span className="text-2xl font-bold text-[#00CED1]">
                        {formatPrice(cartTotal)}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={closeCart}
                        className="flex-1 border-gray-300 hover:bg-gray-100"
                      >
                        Continuar Comprando
                      </Button>
                      <Link href="/checkout" className="flex-1">
                        <Button
                          onClick={closeCart}
                          className="w-full bg-gradient-to-r from-[#00CED1] to-[#20B2AA] hover:from-[#00B8CC] hover:to-[#1A9B9E] text-white"
                        >
                          Finalizar Compra
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
