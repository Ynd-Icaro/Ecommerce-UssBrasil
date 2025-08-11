"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Heart, ShoppingCart, Plus, Minus, Truck, Shield, CreditCard, X } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number | null
  image: string
  description: string
  category: string
  brand: string
  badge?: string | null
  rating: number
  reviewCount: number
  colors: string[]
  discount: number
  features: string[]
  inStock: boolean
  storage?: string[]
}

interface QuickViewModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedStorage, setSelectedStorage] = useState(product.storage?.[0] || "")
  const [quantity, setQuantity] = useState(1)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const getColorName = (color: string, index: number) => {
    const colorNames = {
      "#E3D0BA": "Titânio Natural",
      "#2C2C2C": "Preto",
      "#4169E1": "Azul",
      "#F5F5F5": "Branco",
      "#FFFFFF": "Branco",
      "#E8E8E8": "Prata",
      "#F5F5DC": "Bege",
      "#FF69B4": "Rosa",
      "#FF0000": "Vermelho",
    }
    return colorNames[color as keyof typeof colorNames] || `Cor ${index + 1}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-white rounded-2xl">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Product Image */}
          <div className="relative aspect-square bg-gray-50 p-8">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-full object-contain"
            />

            {/* Badges */}
            <div className="absolute top-6 left-6 flex flex-col gap-2">
              {product.badge && (
                <Badge 
                  className="bg-primary text-white border-0 px-3 py-1.5 text-sm font-semibold shadow-lg"
                >
                  {product.badge}
                </Badge>
              )}
              {product.discount > 0 && (
                <Badge className="bg-red-600 text-white border-0 px-3 py-1.5 text-sm font-semibold shadow-lg">
                  -{product.discount}% OFF
                </Badge>
              )}
            </div>

            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Product Details */}
          <div className="p-8">
            <DialogHeader className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  {product.brand}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                  <span className="text-sm text-gray-400">({product.reviewCount} avaliações)</span>
                </div>
              </div>
              <DialogTitle className="text-2xl font-bold text-gray-900 leading-tight">{product.name}</DialogTitle>
              <p className="text-gray-600 leading-relaxed mt-2">{product.description}</p>
            </DialogHeader>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-green-600 font-medium">
                  Em até 12x de {formatPrice(product.price / 12)} sem juros
                </span>
                {product.discount > 0 && (
                  <span className="text-red-600 font-medium">
                    Economia de {formatPrice((product.originalPrice || 0) - product.price)}
                  </span>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Principais características:</h4>
              <div className="grid grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            {product.colors.length > 1 && (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Cor: {getColorName(product.colors[selectedColor], selectedColor)}
                </h4>
                <div className="flex gap-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`w-10 h-10 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                        selectedColor === index ? "border-blue-600 ring-2 ring-blue-200" : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color }}
                      title={getColorName(color, index)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Storage Selection */}
            {product.storage && product.storage.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Armazenamento:</h4>
                <Select value={selectedStorage} onValueChange={setSelectedStorage}>
                  <SelectTrigger className="w-full rounded-xl border-gray-200">
                    <SelectValue placeholder="Selecione o armazenamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.storage.map((storage) => (
                      <SelectItem key={storage} value={storage}>
                        {storage}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <h4 className="font-semibold text-gray-900 mb-3">Quantidade:</h4>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-xl">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-l-xl"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-r-xl"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-gray-600">Total: {formatPrice(product.price * quantity)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <Button 
                  className="flex-1 bg-primary hover:bg-secondary text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Adicionar ao Carrinho
                </Button>
                <Button
                  variant="outline"
                  className="px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all duration-300 bg-transparent"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              <Link href={`/produtos/${product.category?.toLowerCase().replace(/\s+/g, '-') || 'geral'}/${product.id}`} onClick={onClose}>
                <Button
                  variant="outline"
                  className="w-full py-3 rounded-xl border-gray-200 bg-transparent hover:bg-gray-50"
                >
                  Ver Detalhes Completos
                </Button>
              </Link>
            </div>

            {/* Benefits */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-gray-600">
                <Shield className="h-4 w-4 text-green-600" />
                <span>2 anos de garantia estendida</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Truck className="h-4 w-4 text-blue-600" />
                <span>Entrega grátis acima de R$ 500</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <CreditCard className="h-4 w-4 text-purple-600" />
                <span>Parcelamento em até 12x sem juros</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
