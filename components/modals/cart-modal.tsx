"use client"
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Trash2, ShoppingBag, CreditCard, Clock, Truck } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { useModal } from '@/contexts/ModalContext'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { toast } from 'sonner'

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cartItems: items, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart()
  const router = useRouter()

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Carrinho vazio')
      return
    }
    onClose()
    router.push('/checkout')
  }

  const handleViewCart = () => {
    onClose()
    router.push('/carrinho')
  }

  const modalVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '100%' }
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: 100 }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-end"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-gray-900 h-full w-full max-w-md shadow-2xl overflow-hidden flex flex-col"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div 
              className="p-4 text-white"
              style={{ background: 'var(--uss-gradient-premium)' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6" />
                  <div>
                    <h2 className="text-xl font-bold">Carrinho</h2>
                    <p className="text-blue-100 text-sm">{items.length} {items.length === 1 ? 'item' : 'itens'}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden flex flex-col">
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Carrinho vazio
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Adicione produtos para começar suas compras
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Continuar comprando
                  </button>
                </div>
              ) : (
                <>
                  {/* Items List */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <AnimatePresence>
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
                        >
                          <div className="flex gap-3">
                            <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                                {item.name}
                              </h4>
                              <p className="text-blue-600 font-bold">
                                R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              </p>
                              
                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </button>
                                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                </div>
                                
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Quick Info */}
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-t">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <Clock className="w-4 h-4 mx-auto text-blue-600 mb-1" />
                        <p className="text-gray-600 dark:text-gray-400">Entrega</p>
                        <p className="font-semibold">2-3 dias</p>
                      </div>
                      <div className="text-center">
                        <Truck className="w-4 h-4 mx-auto text-blue-600 mb-1" />
                        <p className="text-gray-600 dark:text-gray-400">Frete</p>
                        <p className="font-semibold text-green-600">Grátis</p>
                      </div>
                      <div className="text-center">
                        <CreditCard className="w-4 h-4 mx-auto text-blue-600 mb-1" />
                        <p className="text-gray-600 dark:text-gray-400">Parcelas</p>
                        <p className="font-semibold">12x s/juros</p>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
                      <span className="text-2xl font-bold text-blue-600">
                        R$ {cartTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <button
                        onClick={handleCheckout}
                        className="w-full text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                        style={{ 
                          background: 'var(--uss-gradient-premium)',
                          boxShadow: 'var(--uss-shadow-md)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = 'var(--uss-shadow-xl)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = 'var(--uss-shadow-md)'
                        }}
                      >
                        Finalizar Compra
                      </button>
                      
                      <button
                        onClick={handleViewCart}
                        className="w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white py-2 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      >
                        Ver Carrinho Completo
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
