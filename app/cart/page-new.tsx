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
  ArrowLeft, 
  ArrowRight,
  ShoppingBag,
  CreditCard
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/contexts/CartContext'
import { toast } from 'sonner'

export default function CartPage() {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    cartTotal, 
    cartCount 
  } = useCart()
  
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)

  // Cupons válidos (mock)
  const validCoupons = {
    'BEMVINDO10': 10,
    'PRIMEIRA20': 20,
    'FRETE15': 15
  }

  const applyCoupon = () => {
    const couponDiscount = validCoupons[couponCode.toUpperCase() as keyof typeof validCoupons]
    
    if (couponDiscount) {
      setDiscount(couponDiscount)
      toast.success(`Cupom aplicado! ${couponDiscount}% de desconto`)
    } else {
      toast.error('Cupom inválido')
    }
  }

  const shipping = cartTotal > 500 ? 0 : 49.90
  const discountAmount = (cartTotal * discount) / 100
  const finalTotal = cartTotal - discountAmount + shipping

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  const handleCheckout = async () => {
    setIsProcessing(true)
    
    // Simular processo de checkout
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Redirecionar para checkout
    window.location.href = '/checkout'
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <div className="text-gray-400 mb-6">
              <ShoppingBag className="h-24 w-24 mx-auto" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Seu carrinho está vazio
            </h1>
            <p className="text-gray-600 mb-8">
              Explore nossos produtos e adicione itens ao seu carrinho
            </p>
            <Link href="/products">
              <Button className="bg-gradient-to-r from-[#00CED1] to-[#20B2AA] text-white px-8 py-3">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Continuar Comprando
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/products" className="inline-flex items-center text-gray-600 hover:text-[#00CED1] mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continuar Comprando
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            Carrinho de Compras
          </h1>
          <p className="text-gray-600 mt-2">
            {cartCount} {cartCount === 1 ? 'item' : 'itens'} no carrinho
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Produtos */}
          <div className="lg:col-span-2">
            <Card className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Itens do Carrinho</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={clearCart}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Limpar Carrinho
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-4 p-4 bg-white/50 rounded-xl border border-gray-100"
                    >
                      {/* Imagem do Produto */}
                      <Link href={`/product/${item.id}`}>
                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-contain p-2 hover:scale-105 transition-transform"
                          />
                        </div>
                      </Link>

                      {/* Informações do Produto */}
                      <div className="flex-1">
                        <Link href={`/product/${item.id}`}>
                          <h3 className="font-semibold text-gray-900 hover:text-[#00CED1] transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-lg font-bold text-[#00CED1] mt-1">
                          R$ {item.price.toLocaleString('pt-BR')}
                        </p>
                      </div>

                      {/* Controles de Quantidade */}
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        
                        <span className="text-lg font-semibold min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right min-w-[100px]">
                        <p className="font-bold text-gray-900">
                          R$ {(item.price * item.quantity).toLocaleString('pt-BR')}
                        </p>
                      </div>

                      {/* Remover */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:bg-red-50 h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>

          {/* Resumo do Pedido */}
          <div className="lg:col-span-1">
            <Card className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-lg sticky top-8">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cupom de Desconto */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Cupom de Desconto
                  </label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Digite seu cupom"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      variant="outline" 
                      onClick={applyCoupon}
                      disabled={!couponCode}
                    >
                      Aplicar
                    </Button>
                  </div>
                  {discount > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-600">Desconto aplicado</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        -{discount}%
                      </Badge>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Valores */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">
                      R$ {cartTotal.toLocaleString('pt-BR')}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Desconto ({discount}%)</span>
                      <span className="font-semibold">
                        -R$ {discountAmount.toLocaleString('pt-BR')}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-600">Frete</span>
                    <span className="font-semibold">
                      {shipping === 0 ? (
                        <Badge className="bg-green-100 text-green-800">GRÁTIS</Badge>
                      ) : (
                        `R$ ${shipping.toLocaleString('pt-BR')}`
                      )}
                    </span>
                  </div>

                  {shipping > 0 && (
                    <p className="text-xs text-gray-500">
                      Frete grátis para compras acima de R$ 500
                    </p>
                  )}

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-[#00CED1]">
                      R$ {finalTotal.toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>

                {/* Botões */}
                <div className="space-y-3 pt-4">
                  <Button 
                    className="w-full bg-gradient-to-r from-[#00CED1] to-[#20B2AA] text-white py-3 font-semibold"
                    onClick={handleCheckout}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processando...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-5 w-5" />
                        Finalizar Compra
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <Button 
                    variant="outline" 
                    className="w-full"
                    asChild
                  >
                    <Link href="/products">
                      Continuar Comprando
                    </Link>
                  </Button>
                </div>

                {/* Informações Extras */}
                <div className="pt-4 space-y-2 text-xs text-gray-500">
                  <p>✓ Entrega rápida e segura</p>
                  <p>✓ Garantia de 1 ano</p>
                  <p>✓ Suporte técnico especializado</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
