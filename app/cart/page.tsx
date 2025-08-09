'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Plus, 
  Minus, 
  X, 
  ShoppingBag, 
  Heart,
  Shield,
  Truck,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  Gift,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

interface CartItem {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  quantity: number
  image: string
  color?: string
  storage?: string
  warranty: string
  inStock: boolean
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'iPhone 15 Pro Max',
      brand: 'Apple',
      price: 8999.00,
      originalPrice: 9999.00,
      quantity: 1,
      image: '/Produtos/iphone15promax.png',
      color: 'Titânio Natural',
      storage: '256GB',
      warranty: '1 ano',
      inStock: true
    },
    {
      id: '2',
      name: 'JBL Charge 5',
      brand: 'JBL',
      price: 699.00,
      quantity: 2,
      image: '/Produtos/jblcharge5.png',
      color: 'Azul',
      warranty: '1 ano',
      inStock: true
    },
    {
      id: '3',
      name: 'DJI Mini 4 Pro',
      brand: 'DJI',
      price: 4299.00,
      quantity: 1,
      image: '/Produtos/djimini4pro.png',
      warranty: '1 ano',
      inStock: false
    }
  ])

  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)
  const [isPromoValid, setIsPromoValid] = useState(false)

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const applyPromoCode = () => {
    // Simular validação de cupom
    const validCodes = ['USS10', 'WELCOME15', 'VIP20']
    if (validCodes.includes(promoCode.toUpperCase())) {
      setAppliedPromo(promoCode.toUpperCase())
      setIsPromoValid(true)
    } else {
      setIsPromoValid(false)
    }
  }

  const removePromoCode = () => {
    setAppliedPromo(null)
    setPromoCode('')
    setIsPromoValid(false)
  }

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  const getDiscount = () => {
    if (!appliedPromo) return 0
    const subtotal = getSubtotal()
    switch (appliedPromo) {
      case 'USS10': return subtotal * 0.1
      case 'WELCOME15': return subtotal * 0.15
      case 'VIP20': return subtotal * 0.2
      default: return 0
    }
  }

  const getShipping = () => {
    const subtotal = getSubtotal()
    return subtotal > 500 ? 0 : 29.90
  }

  const getTotal = () => {
    return getSubtotal() - getDiscount() + getShipping()
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-uss-gray-50 to-white pt-20 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto text-center py-16"
          >
            <div className="bg-gradient-uss-primary p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <ShoppingBag className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-uss-gray-900 mb-4">
              Seu carrinho está vazio
            </h1>
            <p className="text-uss-gray-600 mb-8">
              Que tal dar uma olhada nos nossos produtos incríveis?
            </p>
            <Link
              href="/products"
              className="inline-flex items-center space-x-2 bg-gradient-uss-primary text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            >
              <span>Explorar Produtos</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-uss-gray-50 to-white pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-uss-gray-900 mb-2">
            Carrinho de Compras
          </h1>
          <p className="text-uss-gray-600">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'} no seu carrinho
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-uss-gray-100"
                >
                  <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                    {/* Product Image */}
                    <div className="relative w-full sm:w-24 h-32 sm:h-24 bg-gradient-to-br from-uss-gray-50 to-uss-gray-100 rounded-xl overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                        onError={(e) => {
                          e.currentTarget.src = '/fallback-product.png'
                        }}
                      />
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                          <span className="text-red-600 text-xs font-medium bg-white px-2 py-1 rounded">
                            Indisponível
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-uss-gray-900">
                            {item.name}
                          </h3>
                          <p className="text-sm text-uss-gray-600">
                            {item.brand}
                          </p>
                          {(item.color || item.storage) && (
                            <div className="flex items-center space-x-2 mt-1">
                              {item.color && (
                                <span className="text-xs bg-uss-gray-100 px-2 py-1 rounded">
                                  {item.color}
                                </span>
                              )}
                              {item.storage && (
                                <span className="text-xs bg-uss-gray-100 px-2 py-1 rounded">
                                  {item.storage}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-uss-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Price */}
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-uss-primary">
                              {formatPrice(item.price)}
                            </span>
                            {item.originalPrice && (
                              <span className="text-sm text-uss-gray-500 line-through">
                                {formatPrice(item.originalPrice)}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-uss-gray-500">
                            <Shield className="h-3 w-3" />
                            <span>Garantia {item.warranty}</span>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center bg-uss-gray-100 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-uss-gray-200 rounded-l-lg transition-colors"
                              disabled={!item.inStock}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-2 font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-uss-gray-200 rounded-r-lg transition-colors"
                              disabled={!item.inStock}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <button className="text-uss-gray-400 hover:text-uss-secondary transition-colors">
                            <Heart className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Continue Shopping */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="pt-4"
            >
              <Link
                href="/products"
                className="inline-flex items-center space-x-2 text-uss-primary hover:text-uss-secondary transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Continuar Comprando</span>
              </Link>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Promo Code */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-uss-gray-100"
            >
              <h3 className="font-semibold text-uss-gray-900 mb-4 flex items-center space-x-2">
                <Gift className="h-5 w-5 text-uss-secondary" />
                <span>Cupom de Desconto</span>
              </h3>
              
              {appliedPromo ? (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-green-700 font-medium">{appliedPromo}</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-green-600 hover:text-green-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Digite seu cupom"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-3 py-2 border border-uss-gray-300 rounded-lg focus:ring-2 focus:ring-uss-secondary focus:border-transparent"
                    />
                    <button
                      onClick={applyPromoCode}
                      className="bg-gradient-uss-secondary text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
                    >
                      Aplicar
                    </button>
                  </div>
                  {isPromoValid === false && promoCode && (
                    <div className="flex items-center space-x-2 text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      <span>Cupom inválido</span>
                    </div>
                  )}
                </div>
              )}
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-uss-gray-100 sticky top-4"
            >
              <h3 className="font-semibold text-uss-gray-900 mb-6">
                Resumo do Pedido
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between text-uss-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(getSubtotal())}</span>
                </div>
                
                {appliedPromo && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto ({appliedPromo})</span>
                    <span>-{formatPrice(getDiscount())}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-uss-gray-600">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-4 w-4" />
                    <span>Frete</span>
                  </div>
                  <span>
                    {getShipping() === 0 ? 'Grátis' : formatPrice(getShipping())}
                  </span>
                </div>
                
                <div className="border-t border-uss-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold text-uss-gray-900">
                    <span>Total</span>
                    <span className="text-uss-primary">{formatPrice(getTotal())}</span>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center space-x-3 text-sm text-uss-gray-600">
                  <Shield className="h-4 w-4 text-uss-secondary" />
                  <span>Compra 100% segura</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-uss-gray-600">
                  <Truck className="h-4 w-4 text-uss-secondary" />
                  <span>Frete grátis acima de R$ 500</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-uss-gray-600">
                  <CreditCard className="h-4 w-4 text-uss-secondary" />
                  <span>Parcele em até 12x sem juros</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="w-full mt-6 bg-gradient-uss-primary text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 group"
              >
                <span>Finalizar Compra</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
