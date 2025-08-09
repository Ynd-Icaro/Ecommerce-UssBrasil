'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  CreditCard, 
  Gift,
  Truck,
  Shield,
  ArrowRight,
  Heart
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useModal } from '@/contexts/ModalContext'
import { useCart } from '@/contexts/CartContext'

export default function CartModal() {
  const { isCartOpen, closeCart } = useModal()
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const totalItems = cartCount
  const totalPrice = cartTotal
  const shipping = totalPrice > 200 ? 0 : 29.90
  const finalTotal = totalPrice + shipping

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-uss-primary/10 rounded-full flex items-center justify-center">
                    <ShoppingBag className="h-5 w-5 text-uss-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Sacola</h2>
                    <p className="text-sm text-gray-500">
                      {totalItems} {totalItems === 1 ? 'item' : 'itens'}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeCart}
                  className="h-8 w-8 p-0 hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Benefícios */}
              {totalPrice > 0 && (
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-green-600">
                    <Shield className="h-4 w-4 mr-2" />
                    <span>Compra protegida</span>
                  </div>
                  {totalPrice >= 200 ? (
                    <div className="flex items-center text-sm text-green-600">
                      <Truck className="h-4 w-4 mr-2" />
                      <span>Frete grátis qualificado</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-sm text-amber-600">
                      <Truck className="h-4 w-4 mr-2" />
                      <span>Falta {formatPrice(200 - totalPrice)} para frete grátis</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Conteúdo */}
            <div className="flex-1 overflow-auto">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Sua sacola está vazia
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Adicione produtos e eles aparecerão aqui
                  </p>
                  <Button onClick={closeCart} className="bg-uss-primary hover:bg-uss-primary/90">
                    Continuar Comprando
                  </Button>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  {cartItems.map((item: any) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex gap-4 p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="relative">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="object-contain rounded-lg bg-white"
                        />
                        {item.discountPrice && (
                          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
                            -{Math.round(((item.price - item.discountPrice) / item.price) * 100)}%
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 line-clamp-2 mb-1">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500 mb-2">{item.brand}</p>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-lg font-bold text-uss-primary">
                              {formatPrice(item.discountPrice || item.price)}
                            </span>
                            {item.discountPrice && (
                              <span className="block text-sm text-gray-400 line-through">
                                {formatPrice(item.price)}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                              className="h-8 w-8 p-0 hover:bg-white"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0 hover:bg-white"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 ml-2"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer com Total e Checkout */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-100 p-6 space-y-4">
                {/* Resumo */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'itens'})</span>
                    <span className="font-medium">{formatPrice(totalPrice)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Frete</span>
                    <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                      {shipping === 0 ? 'Grátis' : formatPrice(shipping)}
                    </span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-uss-primary">{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="space-y-3">
                  <Link href="/checkout" onClick={closeCart}>
                    <Button className="w-full bg-uss-primary hover:bg-uss-primary/90 h-12">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Finalizar Compra
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </Link>
                  
                  <Button
                    variant="outline"
                    onClick={closeCart}
                    className="w-full border-uss-primary text-uss-primary hover:bg-uss-primary/5"
                  >
                    Continuar Comprando
                  </Button>
                </div>

                {/* Promoções */}
                <div className="flex items-center justify-center text-sm text-gray-500 pt-2">
                  <Gift className="h-4 w-4 mr-1" />
                  <span>Ganhe pontos USS em cada compra</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
