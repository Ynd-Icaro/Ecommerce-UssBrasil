"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { MobileNav } from "@/components/mobile-nav"
import { ShopSubmenu } from "@/components/shop-submenu"
import {
  FadeIn,
  SlideIn,
  StaggerContainer,
  StaggerItem,
  HoverScale,
  CounterAnimation,
  NotificationSlide,
} from "@/components/animated-components"
import {
  ArrowLeft,
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  Heart,
  Truck,
  Shield,
  CreditCard,
  Tag,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const mockCartItems = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 9999,
    originalPrice: 10999,
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702654",
    color: "Titânio Natural",
    storage: "256GB",
    quantity: 1,
    inStock: true,
    discount: 9,
    brand: "Apple",
  },
  {
    id: 2,
    name: "AirPods Pro (2ª geração)",
    price: 2499,
    originalPrice: null,
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1660803972361",
    color: "Branco",
    storage: null,
    quantity: 2,
    inStock: true,
    discount: 0,
    brand: "Apple",
  },
  {
    id: 3,
    name: "Apple Watch Series 9",
    price: 4299,
    originalPrice: 4799,
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s9-45mm-pink-sport-band-pink-pdp-image-position-1__BRPT?wid=5120&hei=3280&fmt=p-jpg&qlt=80&.v=1692720175893",
    color: "Rosa",
    storage: "45mm",
    quantity: 1,
    inStock: false,
    discount: 10,
    brand: "Apple",
  },
]

const suggestedProducts = [
  {
    id: 4,
    name: "MacBook Air M2",
    price: 12999,
    originalPrice: 13999,
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-midnight-select-202402?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1708367688034",
    discount: 5,
    rating: 4.7,
  },
  {
    id: 5,
    name: 'iPad Pro 12.9"',
    price: 8999,
    originalPrice: null,
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-select-wifi-spacegray-202210?wid=940&hei=1112&fmt=p-jpg&qlt=80&.v=1664411207213",
    discount: 0,
    rating: 4.5,
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(mockCartItems)
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [couponError, setCouponError] = useState("")
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null)
  const [removingItems, setRemovingItems] = useState<number[]>([])

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    showNotification("Quantidade atualizada!", "success")
  }

  const removeItem = (id: number) => {
    setRemovingItems((prev) => [...prev, id])
    setTimeout(() => {
      setCartItems((items) => items.filter((item) => item.id !== id))
      setRemovingItems((prev) => prev.filter((itemId) => itemId !== id))
      showNotification("Item removido do carrinho", "success")
    }, 300)
  }

  const applyCoupon = () => {
    setCouponError("")
    if (couponCode.toLowerCase() === "desconto10") {
      setAppliedCoupon("DESCONTO10")
      setCouponCode("")
      showNotification("Cupom aplicado com sucesso!", "success")
    } else if (couponCode.toLowerCase() === "bemvindo15") {
      setAppliedCoupon("BEMVINDO15")
      setCouponCode("")
      showNotification("Cupom aplicado com sucesso!", "success")
    } else {
      setCouponError("Cupom inválido ou expirado")
      showNotification("Cupom inválido", "error")
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponError("")
    showNotification("Cupom removido", "success")
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const couponDiscount =
    appliedCoupon === "DESCONTO10" ? subtotal * 0.1 : appliedCoupon === "BEMVINDO15" ? subtotal * 0.15 : 0
  const shipping = subtotal > 5000 ? 0 : 99
  const total = subtotal - couponDiscount + shipping

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Notifications */}
      <NotificationSlide isVisible={!!notification}>
        {notification && (
          <div
            className={`flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg ${
              notification.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {notification.type === "success" ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            {notification.message}
          </div>
        )}
      </NotificationSlide>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <FadeIn>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <motion.div whileHover={{ x: -2 }} transition={{ duration: 0.2 }}>
                <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-6">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Continuar comprando
                </Link>
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Seu Carrinho</h1>
                <p className="text-gray-600 mt-1">
                  <CounterAnimation value={cartItems.length} /> {cartItems.length === 1 ? "item" : "itens"} no carrinho
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {cartItems.length === 0 ? (
          // Empty Cart
          <FadeIn>
            <div className="text-center py-16">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
              </motion.div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Seu carrinho está vazio</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Parece que você ainda não adicionou nenhum item ao seu carrinho. Explore nossa loja e encontre produtos
                incríveis!
              </p>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Link href="/products">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition-all duration-300">
                    Explorar Produtos
                  </Button>
                </Link>
              </motion.div>
            </div>
          </FadeIn>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <StaggerContainer>
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <StaggerItem key={item.id}>
                      <motion.div
                        layout
                        initial={{ opacity: 1, scale: 1 }}
                        exit={{
                          opacity: 0,
                          scale: 0.8,
                          x: -100,
                          transition: { duration: 0.3 },
                        }}
                        className={`transition-all duration-300 ${removingItems.includes(item.id) ? "opacity-50" : ""}`}
                      >
                        <HoverScale scale={1.01}>
                          <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-white">
                            <CardContent className="p-6">
                              <div className="flex flex-col md:flex-row gap-6">
                                {/* Product Image */}
                                <div className="relative w-full md:w-32 h-32 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                                    <Image
                                      src={item.image || "/placeholder.svg"}
                                      alt={item.name}
                                      width={128}
                                      height={128}
                                      className="w-full h-full object-contain"
                                    />
                                  </motion.div>
                                  {item.discount > 0 && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="absolute top-2 left-2"
                                    >
                                      <Badge className="bg-red-500 text-white text-xs px-2 py-1">
                                        -<CounterAnimation value={item.discount} />%
                                      </Badge>
                                    </motion.div>
                                  )}
                                </div>

                                {/* Product Details */}
                                <div className="flex-1">
                                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-2">
                                        <Badge variant="secondary" className="text-xs">
                                          {item.brand}
                                        </Badge>
                                        {!item.inStock && (
                                          <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.1 }}
                                          >
                                            <Badge className="bg-red-100 text-red-800 text-xs flex items-center gap-1">
                                              <AlertCircle className="h-3 w-3" />
                                              Fora de estoque
                                            </Badge>
                                          </motion.div>
                                        )}
                                      </div>
                                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                                      <div className="space-y-1 text-sm text-gray-600 mb-4">
                                        <p>Cor: {item.color}</p>
                                        {item.storage && <p>Armazenamento: {item.storage}</p>}
                                      </div>

                                      {/* Price */}
                                      <div className="flex items-center gap-3 mb-4">
                                        <span className="text-2xl font-bold text-gray-900">
                                          {formatPrice(item.price)}
                                        </span>
                                        {item.originalPrice && (
                                          <span className="text-lg text-gray-400 line-through">
                                            {formatPrice(item.originalPrice)}
                                          </span>
                                        )}
                                      </div>
                                    </div>

                                    {/* Quantity and Actions */}
                                    <div className="flex flex-col items-end gap-4">
                                      <div className="flex items-center gap-3">
                                        <motion.div whileTap={{ scale: 0.9 }}>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                            className="w-8 h-8 p-0 rounded-lg transition-all duration-300 hover:bg-gray-100"
                                          >
                                            <Minus className="h-4 w-4" />
                                          </Button>
                                        </motion.div>
                                        <motion.span
                                          key={item.quantity}
                                          initial={{ scale: 1.2 }}
                                          animate={{ scale: 1 }}
                                          transition={{ duration: 0.2 }}
                                          className="w-12 text-center font-semibold"
                                        >
                                          {item.quantity}
                                        </motion.span>
                                        <motion.div whileTap={{ scale: 0.9 }}>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-8 h-8 p-0 rounded-lg transition-all duration-300 hover:bg-gray-100"
                                            disabled={!item.inStock}
                                          >
                                            <Plus className="h-4 w-4" />
                                          </Button>
                                        </motion.div>
                                      </div>

                                      <div className="flex gap-2">
                                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                                          >
                                            <Heart className="h-4 w-4" />
                                          </Button>
                                        </motion.div>
                                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeItem(item.id)}
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-300"
                                          >
                                            <Trash2 className="h-4 w-4" />
                                          </Button>
                                        </motion.div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </HoverScale>
                      </motion.div>
                    </StaggerItem>
                  ))}
                </AnimatePresence>
              </StaggerContainer>

              {/* Coupon Section */}
              <SlideIn direction="up" delay={0.3}>
                <Card className="border-0 shadow-sm bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Tag className="h-5 w-5 text-gray-500" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">Cupom de Desconto</h3>
                        <AnimatePresence mode="wait">
                          {appliedCoupon ? (
                            <motion.div
                              key="applied"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                            >
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span className="text-green-800 font-medium">Cupom {appliedCoupon} aplicado!</span>
                                <span className="text-green-600 text-sm">
                                  Desconto de {appliedCoupon === "DESCONTO10" ? "10%" : "15%"}
                                </span>
                              </div>
                              <motion.div whileTap={{ scale: 0.95 }}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={removeCoupon}
                                  className="text-green-700 hover:bg-green-100"
                                >
                                  Remover
                                </Button>
                              </motion.div>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="input"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="space-y-3"
                            >
                              <div className="flex gap-3">
                                <Input
                                  placeholder="Digite seu cupom"
                                  value={couponCode}
                                  onChange={(e) => setCouponCode(e.target.value)}
                                  className="flex-1 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                                />
                                <motion.div whileTap={{ scale: 0.95 }}>
                                  <Button
                                    onClick={applyCoupon}
                                    variant="outline"
                                    className="rounded-lg bg-transparent transition-all duration-300 hover:bg-blue-50 hover:border-blue-300"
                                    disabled={!couponCode}
                                  >
                                    Aplicar
                                  </Button>
                                </motion.div>
                              </div>
                              <AnimatePresence>
                                {couponError && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="text-sm text-red-600 flex items-center gap-1"
                                  >
                                    <AlertCircle className="h-4 w-4" />
                                    {couponError}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                              <div className="text-xs text-gray-500">
                                Cupons disponíveis: DESCONTO10 (10% off) • BEMVINDO15 (15% off)
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </SlideIn>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <SlideIn direction="right" delay={0.2}>
                <Card className="border-0 shadow-sm bg-white sticky top-24">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Resumo do Pedido</h2>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-gray-600">
                        <span>
                          Subtotal (<CounterAnimation value={cartItems.length} /> itens)
                        </span>
                        <span>{formatPrice(subtotal)}</span>
                      </div>
                      <AnimatePresence>
                        {couponDiscount > 0 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex justify-between text-green-600"
                          >
                            <span>Desconto do cupom</span>
                            <span>-{formatPrice(couponDiscount)}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <div className="flex justify-between text-gray-600">
                        <span>Frete</span>
                        <span>{shipping === 0 ? "Grátis" : formatPrice(shipping)}</span>
                      </div>
                      <Separator />
                      <motion.div
                        className="flex justify-between text-xl font-bold text-gray-900"
                        key={total}
                        initial={{ scale: 1.05 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                      </motion.div>
                    </div>

                    <div className="space-y-4">
                      <motion.div whileTap={{ scale: 0.98 }}>
                        <Link href="/checkout">
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                            Finalizar Compra
                          </Button>
                        </Link>
                      </motion.div>
                      <div className="text-center text-sm text-gray-500">Parcelamento em até 12x sem juros</div>
                    </div>

                    {/* Benefits */}
                    <div className="mt-8 space-y-4">
                      <motion.div
                        className="flex items-center gap-3 text-sm text-gray-600"
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Shield className="h-4 w-4 text-green-600" />
                        <span>Compra 100% segura e protegida</span>
                      </motion.div>
                      <motion.div
                        className="flex items-center gap-3 text-sm text-gray-600"
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Truck className="h-4 w-4 text-blue-600" />
                        <span>Entrega rápida em todo o Brasil</span>
                      </motion.div>
                      <motion.div
                        className="flex items-center gap-3 text-sm text-gray-600"
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CreditCard className="h-4 w-4 text-purple-600" />
                        <span>Parcelamento sem juros</span>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </SlideIn>

              {/* Suggested Products */}
              <SlideIn direction="right" delay={0.4}>
                <Card className="border-0 shadow-sm bg-white">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Você também pode gostar</h3>
                    <div className="space-y-4">
                      <StaggerContainer staggerDelay={0.1}>
                        {suggestedProducts.map((product) => (
                          <StaggerItem key={product.id}>
                            <HoverScale scale={1.02}>
                              <div className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-all duration-300 cursor-pointer">
                                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                  <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                                    <Image
                                      src={product.image || "/placeholder.svg"}
                                      alt={product.name}
                                      width={64}
                                      height={64}
                                      className="w-full h-full object-contain"
                                    />
                                  </motion.div>
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium text-gray-900 text-sm mb-1">{product.name}</h4>
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="text-lg font-bold text-gray-900">
                                      {formatPrice(product.price)}
                                    </span>
                                    {product.originalPrice && (
                                      <span className="text-sm text-gray-400 line-through">
                                        {formatPrice(product.originalPrice)}
                                      </span>
                                    )}
                                  </div>
                                  <motion.div whileTap={{ scale: 0.95 }}>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-xs bg-transparent transition-all duration-300 hover:bg-blue-50 hover:border-blue-300"
                                    >
                                      Adicionar
                                    </Button>
                                  </motion.div>
                                </div>
                              </div>
                            </HoverScale>
                          </StaggerItem>
                        ))}
                      </StaggerContainer>
                    </div>
                  </CardContent>
                </Card>
              </SlideIn>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
