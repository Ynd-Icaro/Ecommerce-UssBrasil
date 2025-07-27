'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight,
  ShoppingBag
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/contexts/CartContext'

interface CartDropdownProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDropdown({ isOpen, onClose }: CartDropdownProps) {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart()

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{ duration: 0.2 }}
        className="absolute right-0 top-full mt-2 w-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/50 z-50"
      >
        {/* Overlay para fechar */}
        <div 
          className="fixed inset-0 z-40" 
          onClick={onClose}
        />
        
        <div className="relative z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200/50">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-slate-700" />
              <h3 className="font-semibold text-slate-900">
                Carrinho ({cartCount})
              </h3>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ×
            </Button>
          </div>

          {/* Content */}
          <div className="max-h-96 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="p-8 text-center">
                <ShoppingBag className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 mb-4">Seu carrinho está vazio</p>
                <Link href="/products">
                  <Button 
                    className="bg-gradient-to-r from-blue-900 to-cyan-500 text-white"
                    onClick={onClose}
                  >
                    Explorar Produtos
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {cartItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-slate-50/50 rounded-xl">
                    <div className="w-12 h-12 bg-white rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-slate-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-blue-900 font-semibold">
                        R$ {item.price.toLocaleString('pt-BR')}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-6 w-6 p-0"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium min-w-[1.5rem] text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-6 w-6 p-0"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="h-6 w-6 p-0 text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {cartItems.length > 3 && (
                  <p className="text-center text-sm text-slate-500">
                    +{cartItems.length - 3} itens adicionais
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="p-4 border-t border-slate-200/50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-slate-600">Total:</span>
                <span className="text-lg font-bold text-blue-900">
                  R$ {cartTotal.toLocaleString('pt-BR')}
                </span>
              </div>
              
              <div className="space-y-2">
                <Link href="/cart">
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-900 to-cyan-500 text-white"
                    onClick={onClose}
                  >
                    Ver Carrinho Completo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/checkout">
                  <Button 
                    variant="outline" 
                    className="w-full border-blue-900 text-blue-900 hover:bg-blue-50"
                    onClick={onClose}
                  >
                    Finalizar Compra
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
