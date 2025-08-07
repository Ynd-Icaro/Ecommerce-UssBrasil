'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface CartItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  quantity: number
  image: string
  category: string
  size?: string
  color?: string
}

const mockCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Smartphone Samsung Galaxy A54',
    price: 1299.99,
    originalPrice: 1599.99,
    quantity: 1,
    image: '/images/Apple/iphone-15-pro.jpg',
    category: 'Eletrônicos',
    color: 'Preto'
  },
  {
    id: '2',
    name: 'Notebook Dell Inspiron 15',
    price: 2499.99,
    quantity: 1,
    image: '/fallback-product.png',
    category: 'Informática'
  },
  {
    id: '3',
    name: 'Fone de Ouvido JBL Tune 770NC',
    price: 399.99,
    originalPrice: 499.99,
    quantity: 2,
    image: '/images/JBL/fone-jbl.jpg',
    category: 'Áudio',
    color: 'Azul'
  },
  {
    id: '4',
    name: 'Smart TV LG 55" 4K UHD',
    price: 2199.99,
    originalPrice: 2699.99,
    quantity: 1,
    image: '/fallback-product.png',
    category: 'TV e Home Theater'
  }
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(mockCartItems)

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
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

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 29.99
  const total = subtotal + shipping

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f0f0f0] pt-20">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-8" />
            <h1 className="text-3xl font-bold text-[#0C1A33] mb-4">
              Seu carrinho está vazio
            </h1>
            <p className="text-gray-600 mb-8">
              Adicione alguns produtos para começar suas compras!
            </p>
            <Link
              href="/produtos"
              className="inline-flex items-center bg-gradient-to-r from-[#0E7466] to-[#0C6157] text-white px-8 py-4 rounded-2xl font-semibold hover:from-[#0C6157] hover:to-[#0A5449] transition-all duration-300 transform hover:scale-105"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Continuar comprando
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f0f0f0] pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-[#0C1A33] mb-4">
            Seu Carrinho
          </h1>
          <p className="text-gray-600">
            {totalItems} {totalItems === 1 ? 'item' : 'itens'} no seu carrinho
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items do Carrinho */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Imagem do Produto */}
                  <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden">
                    <div className="text-gray-400 text-center">
                      <ShoppingBag className="h-12 w-12 mx-auto mb-2" />
                      <span className="text-xs">Imagem</span>
                    </div>
                  </div>

                  {/* Detalhes do Produto */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row justify-between">
                      <div className="flex-1 mb-4 sm:mb-0">
                        <h3 className="text-xl font-bold text-[#0C1A33] mb-2">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          Categoria: {item.category}
                        </p>
                        {item.color && (
                          <p className="text-gray-600 text-sm mb-2">
                            Cor: {item.color}
                          </p>
                        )}
                        {item.size && (
                          <p className="text-gray-600 text-sm mb-2">
                            Tamanho: {item.size}
                          </p>
                        )}
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-[#0E7466]">
                            R$ {item.price.toFixed(2)}
                          </span>
                          {item.originalPrice && (
                            <span className="text-gray-400 line-through">
                              R$ {item.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Controles de Quantidade */}
                      <div className="flex flex-col items-end space-y-4">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>

                        <div className="flex items-center space-x-3 bg-gray-100 rounded-full p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-gray-600">Subtotal</p>
                          <p className="text-xl font-bold text-[#0C1A33]">
                            R$ {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Resumo do Pedido */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl p-8 shadow-lg sticky top-24"
            >
              <h2 className="text-2xl font-bold text-[#0C1A33] mb-6">
                Resumo do Pedido
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Frete</span>
                  <span className="font-semibold">R$ {shipping.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl">
                    <span className="font-bold text-[#0C1A33]">Total</span>
                    <span className="font-bold text-[#0E7466]">
                      R$ {total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Link
                  href="/checkout"
                  className="w-full block text-center bg-gradient-to-r from-[#0E7466] to-[#0C6157] text-white py-4 rounded-2xl font-semibold hover:from-[#0C6157] hover:to-[#0A5449] transition-all duration-300 transform hover:scale-105"
                >
                  Finalizar Compra
                </Link>

                <Link
                  href="/produtos"
                  className="w-full block text-center border-2 border-[#0E7466] text-[#0E7466] py-4 rounded-2xl font-semibold hover:bg-[#0E7466] hover:text-white transition-all duration-300"
                >
                  <ArrowLeft className="inline h-5 w-5 mr-2" />
                  Continuar Comprando
                </Link>
              </div>

              {/* Informações Adicionais */}
              <div className="mt-8 pt-6 border-t">
                <h3 className="font-semibold text-[#0C1A33] mb-4">
                  Informações da Compra
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>✓ Frete grátis acima de R$ 199</p>
                  <p>✓ Entrega em até 7 dias úteis</p>
                  <p>✓ Garantia de satisfação</p>
                  <p>✓ Pagamento seguro</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}