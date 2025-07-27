'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  X, 
  ArrowLeft, 
  Truck, 
  Shield, 
  CreditCard,
  Gift,
  Heart,
  Star
} from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { toast } from 'sonner'

export default function CartPage() {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    cartTotal, 
    cartCount 
  } = useCart()

  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string, discount: number} | null>(null)

  const shippingCost = cartTotal > 300 ? 0 : 29.90
  const discountAmount = appliedCoupon ? (cartTotal * appliedCoupon.discount / 100) : 0
  const finalTotal = cartTotal + shippingCost - discountAmount

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  const handleApplyCoupon = () => {
    const validCoupons = [
      { code: 'PRIMEIRA10', discount: 10 },
      { code: 'FRETEGRATIS', discount: 5 },
      { code: 'WELCOME15', discount: 15 }
    ]
    
    const coupon = validCoupons.find(c => c.code === couponCode.toUpperCase())
    if (coupon) {
      setAppliedCoupon(coupon)
      toast.success(`Cupom ${coupon.code} aplicado! ${coupon.discount}% de desconto`)
    } else {
      toast.error('Cupom inválido')
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode('')
    toast.info('Cupom removido')
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  // Estado vazio do carrinho
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 pt-20">
        <div className="container mx-auto px-4 py-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="h-12 w-12 text-neutral-400" />
            </div>
            <h1 className="text-2xl font-semibold text-neutral-900 mb-4">
              Seu carrinho está vazio
            </h1>
            <p className="text-neutral-600 mb-8">
              Que tal dar uma olhada nos nossos produtos incríveis?
            </p>
            <Button asChild className="w-full">
              <Link href="/products">
                Descobrir produtos
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/products">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continuar comprando
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Carrinho</h1>
            <p className="text-neutral-600">
              {cartCount} {cartCount === 1 ? 'item' : 'itens'} no seu carrinho
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items do carrinho */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <AnimatePresence>
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4 py-6 border-b border-neutral-100 last:border-0"
                    >
                      {/* Imagem do produto */}
                      <div className="relative w-24 h-24 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image || '/placeholder-product.jpg'}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Detalhes do produto */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-neutral-900 truncate">
                              {item.name}
                            </h3>
                            <p className="text-sm text-neutral-600">
                              {formatCurrency(item.price)}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-neutral-400 hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Controles de quantidade */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-neutral-200 rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-12 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <span className="font-semibold text-neutral-900">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Ações do carrinho */}
                <div className="pt-6">
                  <Button 
                    variant="outline" 
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Limpar carrinho
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resumo do pedido */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Resumo do pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cupom de desconto */}
                <div>
                  <label className="text-sm font-medium text-neutral-700 mb-2 block">
                    Cupom de desconto
                  </label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Digite o cupom"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={!!appliedCoupon}
                    />
                    {appliedCoupon ? (
                      <Button variant="outline" onClick={handleRemoveCoupon}>
                        <X className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button onClick={handleApplyCoupon} disabled={!couponCode}>
                        Aplicar
                      </Button>
                    )}
                  </div>
                  {appliedCoupon && (
                    <Badge variant="secondary" className="mt-2">
                      <Gift className="h-3 w-3 mr-1" />
                      {appliedCoupon.code} - {appliedCoupon.discount}% OFF
                    </Badge>
                  )}
                </div>

                <Separator />

                {/* Cálculos */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatCurrency(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Frete</span>
                    <span className={shippingCost === 0 ? "text-green-600 font-medium" : ""}>
                      {shippingCost === 0 ? 'Grátis' : formatCurrency(shippingCost)}
                    </span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Desconto</span>
                      <span>-{formatCurrency(discountAmount)}</span>
                    </div>
                  )}
                  {shippingCost > 0 && (
                    <p className="text-xs text-neutral-600">
                      Frete grátis em compras acima de {formatCurrency(300)}
                    </p>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatCurrency(finalTotal)}</span>
                </div>

                {/* Benefícios */}
                <div className="space-y-2 text-xs text-neutral-600">
                  <div className="flex items-center gap-2">
                    <Truck className="h-3 w-3" />
                    <span>Entrega em todo o Brasil</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-3 w-3" />
                    <span>Compra 100% protegida</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-3 w-3" />
                    <span>Parcele em até 12x sem juros</span>
                  </div>
                </div>

                {/* Botão de checkout */}
                <Button asChild className="w-full mt-6" size="lg">
                  <Link href="/checkout">
                    Finalizar compra
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}