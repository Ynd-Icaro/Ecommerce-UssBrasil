'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, ShoppingCart, ArrowRight, Trash2, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface CartItem {
  id: string
  name: string
  brand: string
  price: number
  discountPrice?: number
  image: string
  quantity: number
  color?: string
  storage?: string
}

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

export const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  // Mock data - substitua pela sua lógica de carrinho real
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'iPhone 15 Pro',
      brand: 'Apple',
      price: 8999,
      discountPrice: 7999,
      image: '/Produtos/iphone-15-pro.jpg',
      quantity: 1,
      color: 'Azul Titânio',
      storage: '256GB'
    },
    {
      id: '2',
      name: 'AirPods Pro',
      brand: 'Apple',
      price: 2199,
      image: '/Produtos/airpods-pro.jpg',
      quantity: 2
    }
  ])

  const formatPrice = (price: number) =>
    `R$ ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }
    
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.discountPrice || item.price
    return sum + (price * item.quantity)
  }, 0)

  const shipping = subtotal > 299 ? 0 : 29.90
  const total = subtotal + shipping

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-uss-primary/10 rounded-xl">
                  <ShoppingCart className="h-6 w-6 text-uss-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Seu Carrinho
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <div className="w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <ShoppingCart className="h-16 w-16 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Carrinho vazio
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Adicione produtos incríveis ao seu carrinho
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-uss-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-uss-primary-dark transition-colors"
                  >
                    Continuar Comprando
                  </button>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-4"
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-white dark:bg-gray-600 rounded-xl p-2 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-xs text-uss-primary font-semibold mb-1">
                                {item.brand}
                              </p>
                              <h4 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight mb-1">
                                {item.name}
                              </h4>
                              
                              {/* Variações */}
                              {(item.color || item.storage) && (
                                <div className="flex gap-2 mb-2">
                                  {item.color && (
                                    <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full">
                                      {item.color}
                                    </span>
                                  )}
                                  {item.storage && (
                                    <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full">
                                      {item.storage}
                                    </span>
                                  )}
                                </div>
                              )}

                              {/* Price */}
                              <div className="flex items-center gap-2">
                                {item.discountPrice && (
                                  <span className="text-xs text-gray-500 line-through">
                                    {formatPrice(item.price)}
                                  </span>
                                )}
                                <span className="font-bold text-uss-primary">
                                  {formatPrice(item.discountPrice || item.price)}
                                </span>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-2 ml-2">
                              <button
                                onClick={() => removeItem(item.id)}
                                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-uss-primary transition-colors">
                                <Heart className="h-4 w-4" />
                              </button>
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3 mt-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-6 space-y-4">
                {/* Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Frete:</span>
                    <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                      {shipping === 0 ? 'Grátis' : formatPrice(shipping)}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Frete grátis para compras acima de R$ 299
                    </p>
                  )}
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span>Total:</span>
                    <span className="text-uss-primary">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Link
                    href="/checkout"
                    onClick={onClose}
                    className="w-full bg-uss-primary hover:bg-uss-primary-dark text-white py-4 rounded-xl font-bold text-center transition-colors flex items-center justify-center gap-3 group"
                  >
                    Finalizar Compra
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  <Link
                    href="/cart"
                    onClick={onClose}
                    className="w-full border-2 border-uss-primary text-uss-primary hover:bg-uss-primary hover:text-white py-3 rounded-xl font-semibold text-center transition-colors flex items-center justify-center gap-3"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Ver Carrinho Completo
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartModal
