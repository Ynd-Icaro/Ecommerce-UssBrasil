"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Minus, Plus, Trash2, ShoppingBag, CreditCard, Truck, Shield, ArrowLeft, Heart } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'

export default function CarrinhoPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart()
  const { user, toggleFavorite, favorites } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Carrinho vazio')
      return
    }
    
    if (!user) {
      toast.error('Faça login para finalizar a compra')
      return
    }
    
    setLoading(true)
    setTimeout(() => {
      router.push('/checkout')
    }, 1000)
  }

  const handleMoveToFavorites = (item: any) => {
    toggleFavorite(String(item.id))
    removeFromCart(item.id)
    toast.success(`${item.name} movido para favoritos`)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12"
            >
              <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Seu carrinho está vazio
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Que tal explorar nossos produtos e encontrar algo especial?
              </p>
              <Link
                href="/produtos"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                Continuar Comprando
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="/produtos"
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Carrinho de Compras
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'} no seu carrinho
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items List */}
          <motion.div
            className="lg:col-span-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Seus Produtos
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Limpar Carrinho
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex gap-4">
                      <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {item.name}
                        </h3>
                        <p className="text-2xl font-bold text-blue-600 mb-4">
                          R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center font-semibold text-lg">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleMoveToFavorites(item)}
                              className="p-2 text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20 rounded-lg transition-colors"
                              title="Mover para favoritos"
                            >
                              <Heart className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                              title="Remover do carrinho"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-2 text-right">
                          <span className="text-lg font-semibold text-gray-900 dark:text-white">
                            Subtotal: R$ {(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Resumo do Pedido
              </h2>

              {/* Benefits */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-green-600">
                  <Truck className="w-5 h-5" />
                  <span className="text-sm font-medium">Frete grátis para todo Brasil</span>
                </div>
                <div className="flex items-center gap-3 text-blue-600">
                  <CreditCard className="w-5 h-5" />
                  <span className="text-sm font-medium">Parcelamento em até 12x sem juros</span>
                </div>
                <div className="flex items-center gap-3 text-purple-600">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm font-medium">Garantia oficial USS Brasil</span>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal:</span>
                  <span>R$ {cartTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Frete:</span>
                  <span className="text-green-600 font-medium">Grátis</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span>Total:</span>
                  <span className="text-blue-600">
                    R$ {cartTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processando...' : 'Finalizar Compra'}
                </button>
                
                <Link
                  href="/produtos"
                  className="w-full block text-center bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Continuar Comprando
                </Link>
              </div>

              {/* Payment Options */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Formas de pagamento aceitas:
                </p>
                <div className="flex gap-2">
                  <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded p-2 text-center text-xs font-medium">
                    Cartão
                  </div>
                  <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded p-2 text-center text-xs font-medium">
                    PIX
                  </div>
                  <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded p-2 text-center text-xs font-medium">
                    Boleto
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
