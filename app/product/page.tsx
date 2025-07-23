"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MobileNav } from "@/components/mobile-nav"
import { Heart, Share2, Star, Truck, Shield, RotateCcw, CreditCard, Plus, Minus, ShoppingCart } from "lucide-react"

// Dados mockados do produto - em uma aplicação real, isso viria de uma API
const productData = {
  id: 1,
  name: "iPhone 15 Pro Max",
  brand: "Apple",
  price: 9999,
  originalPrice: 10999,
  rating: 4.9,
  reviewCount: 2847,
  inStock: true,
  stockCount: 25,
  category: "smartphone",
  description:
    "O iPhone 15 Pro Max é o mais avançado iPhone já criado. Com o chip A17 Pro, sistema de câmeras Pro revolucionário e design em titânio de qualidade aeroespacial.",
  features: [
    "Chip A17 Pro com GPU de 6 núcleos",
    "Sistema de câmeras Pro com teleobjetiva 5x",
    "Design em titânio com Action Button",
    "Tela Super Retina XDR de 6,7 polegadas",
    "Conector USB-C com USB 3",
    "Até 29 horas de reprodução de vídeo",
  ],
  specifications: {
    Tela: "6,7 polegadas Super Retina XDR",
    Chip: "A17 Pro",
    Câmera: "Sistema de câmeras Pro 48MP",
    Armazenamento: "256GB, 512GB, 1TB",
    Bateria: "Até 29 horas de vídeo",
    Resistência: "IP68",
    Conectividade: "5G, Wi-Fi 6E, Bluetooth 5.3",
  },
  images: [
    "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702654",
    "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-bluetitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702654",
    "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-whitetitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702654",
    "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-blacktitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702654",
  ],
  colors: [
    { name: "Titânio Natural", value: "#E3D0BA", available: true },
    { name: "Titânio Azul", value: "#4A90E2", available: true },
    { name: "Titânio Branco", value: "#FFFFFF", available: true },
    { name: "Titânio Preto", value: "#2C2C2C", available: false },
  ],
  storage: [
    { size: "256GB", price: 9999, available: true },
    { size: "512GB", price: 11499, available: true },
    { size: "1TB", price: 13999, available: true },
  ],
}

const reviews = [
  {
    id: 1,
    user: "João Silva",
    rating: 5,
    date: "15 de Nov, 2024",
    comment: "Produto incrível! A qualidade da câmera é excepcional e a performance é impressionante.",
    helpful: 24,
  },
  {
    id: 2,
    user: "Maria Santos",
    rating: 5,
    date: "10 de Nov, 2024",
    comment: "Vale cada centavo. O design em titânio é lindo e muito resistente.",
    helpful: 18,
  },
  {
    id: 3,
    user: "Pedro Costa",
    rating: 4,
    date: "8 de Nov, 2024",
    comment: "Excelente produto, apenas o preço que é um pouco salgado, mas a qualidade compensa.",
    helpful: 12,
  },
]

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(productData.colors[0])
  const [selectedStorage, setSelectedStorage] = useState(productData.storage[0])
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleAddToCart = () => {
    // Lógica para adicionar ao carrinho
    console.log("Adicionado ao carrinho:", {
      product: productData,
      color: selectedColor,
      storage: selectedStorage,
      quantity,
    })
  }

  const handleBuyNow = () => {
    // Redirecionar para checkout
    window.location.href = `/checkout?product=${productData.id}&color=${selectedColor.name}&storage=${selectedStorage.size}&quantity=${quantity}`
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center md:hidden">
              <MobileNav />
            </div>

            <div className="hidden md:flex items-center space-x-12">
              <Link href="/" className="text-xl font-bold text-gray-900 -ml-12 tracking-tight">
                USSBRASIL
              </Link>
              <Link href="/products" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
                LOJA
              </Link>
              <Link
                href="/categories/smartphones"
                className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
              >
                IPHONE
              </Link>
              <Link href="/categories/laptops" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
                MAC
              </Link>
              <Link
                href="/categories/headphones"
                className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
              >
                AIRPODS
              </Link>
              <Link href="/categories/watches" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
                WATCH
              </Link>
              <Link href="/admin" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
                SUPORTE
              </Link>
            </div>

            <Link href="/" className="text-xl font-bold text-gray-900 tracking-tight md:hidden">
              USSBRASIL
            </Link>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsWishlisted(!isWishlisted)}>
                <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Link
                href="/cart"
                className="flex items-center text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Carrinho</span>
              </Link>
              <Link
                href="/login"
                className="hidden md:flex items-center text-sm text-gray-700 hover:text-gray-900 transition-colors"
              >
                Entrar
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-700">
            Início
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-gray-700">
            Produtos
          </Link>
          <span>/</span>
          <Link href="/categories/smartphones" className="hover:text-gray-700">
            iPhone
          </Link>
          <span>/</span>
          <span className="text-gray-900">{productData.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden">
              <Image
                src={productData.images[selectedImage] || "/placeholder.svg"}
                alt={productData.name}
                width={600}
                height={600}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {productData.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-blue-500" : "border-transparent"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${productData.name} ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary">{productData.brand}</Badge>
                {productData.inStock && <Badge className="bg-green-100 text-green-800">Em estoque</Badge>}
              </div>
              <h1 className="text-3xl font-light mb-4">{productData.name}</h1>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(productData.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {productData.rating} ({productData.reviewCount} avaliações)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-light">R$ {selectedStorage.price.toLocaleString()}</span>
                {productData.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    R$ {productData.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-medium mb-3">Cor: {selectedColor.name}</h3>
              <div className="flex space-x-3">
                {productData.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => color.available && setSelectedColor(color)}
                    disabled={!color.available}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      selectedColor.name === color.name ? "border-blue-500 scale-110" : "border-gray-300"
                    } ${!color.available ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Storage Selection */}
            <div>
              <h3 className="font-medium mb-3">Armazenamento</h3>
              <div className="grid grid-cols-3 gap-3">
                {productData.storage.map((storage) => (
                  <button
                    key={storage.size}
                    onClick={() => storage.available && setSelectedStorage(storage)}
                    disabled={!storage.available}
                    className={`p-3 border rounded-lg text-center transition-colors ${
                      selectedStorage.size === storage.size
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    } ${!storage.available ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <div className="font-medium">{storage.size}</div>
                    <div className="text-sm text-gray-600">R$ {storage.price.toLocaleString()}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-medium mb-3">Quantidade</h3>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.min(productData.stockCount, quantity + 1))}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-600">{productData.stockCount} disponíveis</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button onClick={handleBuyNow} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3" size="lg">
                Comprar Agora
              </Button>
              <Button onClick={handleAddToCart} variant="outline" className="w-full py-3 bg-transparent" size="lg">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Adicionar ao Carrinho
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-medium text-sm">Frete Grátis</div>
                  <div className="text-xs text-gray-600">Acima de R$ 15.000</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-medium text-sm">Garantia</div>
                  <div className="text-xs text-gray-600">1 ano oficial</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="font-medium text-sm">Troca Grátis</div>
                  <div className="text-xs text-gray-600">30 dias</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <CreditCard className="h-5 w-5 text-orange-600" />
                <div>
                  <div className="font-medium text-sm">Parcelamento</div>
                  <div className="text-xs text-gray-600">Até 12x sem juros</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Descrição</TabsTrigger>
              <TabsTrigger value="specifications">Especificações</TabsTrigger>
              <TabsTrigger value="reviews">Avaliações ({productData.reviewCount})</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-700 mb-6">{productData.description}</p>
                  <h4 className="font-semibold mb-4">Principais características:</h4>
                  <ul className="space-y-2">
                    {productData.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid gap-4">
                    {Object.entries(productData.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                        <span className="font-medium text-gray-900">{key}</span>
                        <span className="text-gray-700">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {/* Rating Summary */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-4xl font-light mb-2">{productData.rating}</div>
                        <div className="flex items-center justify-center mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(productData.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-gray-600">{productData.reviewCount} avaliações</div>
                      </div>
                      <div className="flex-1">
                        {[5, 4, 3, 2, 1].map((stars) => (
                          <div key={stars} className="flex items-center space-x-2 mb-1">
                            <span className="text-sm w-8">{stars}★</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-yellow-400 h-2 rounded-full"
                                style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : 5}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 w-8">
                              {stars === 5 ? "70%" : stars === 4 ? "20%" : "5%"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Individual Reviews */}
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="font-medium">{review.user}</div>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3">{review.comment}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <button className="hover:text-gray-900">Útil ({review.helpful})</button>
                          <button className="hover:text-gray-900">Responder</button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
