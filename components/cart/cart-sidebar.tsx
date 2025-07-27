'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { darkComponents, darkAnimations } from '@/lib/design-system'

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart()

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
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Sidebar do carrinho */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-gray-700" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Carrinho ({cartCount})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Conteúdo do carrinho */}
            <div className="flex-1 overflow-y-auto">
              {cartItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center p-6"
                >
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Seu carrinho está vazio
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Adicione produtos para começar suas compras
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
                  >
                    Continuar comprando
                  </button>
                </motion.div>
              ) : (
                <div className="p-6 space-y-4">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      {/* Imagem do produto */}
                      <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Informações do produto */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm line-clamp-2">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                          {formatPrice(item.price)}
                        </p>

                        {/* Controles de quantidade */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <Minus className="w-4 h-4 text-gray-500" />
                            </button>
                            <span className="w-8 text-center font-semibold text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <Plus className="w-4 h-4 text-gray-500" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer com total e checkout */}
            {cartItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-gray-200 p-6 bg-white"
              >
                {/* Resumo do pedido */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Frete</span>
                    <span className="font-medium text-green-600">Grátis</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-lg font-semibold text-gray-900">
                        {formatPrice(cartTotal)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Botão de finalizar compra */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Finalizar Compra
                </motion.button>

                {/* Link para continuar comprando */}
                <button
                  onClick={onClose}
                  className="w-full mt-3 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
                >
                  Continuar comprando
                </button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Versão mobile - Bottom drawer
export const CartBottomDrawer: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
          />

          {/* Bottom drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-2xl z-50 max-h-[80vh] flex flex-col md:hidden"
          >
            {/* Handle */}
            <div className="flex justify-center py-3">
              <div className="w-12 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 pb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Carrinho ({cartCount})
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Conteúdo */}
            <div className="flex-1 overflow-y-auto px-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">Carrinho vazio</p>
                </div>
              ) : (
                <div className="space-y-3 pb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-gray-500">{formatPrice(item.price)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center bg-white border rounded"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center bg-white border rounded"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-6 bg-white">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-semibold">{formatPrice(getTotalPrice())}</span>
                </div>
                <button className="w-full bg-black text-white py-3 rounded-lg font-semibold">
                  Finalizar Compra
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartSidebar
