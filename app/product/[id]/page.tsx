'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft, 
  Star, 
  Heart, 
  ShoppingCart, 
  Truck,
  Shield,
  RotateCcw,
  Check,
  Minus,
  Plus
} from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { toast } from 'react-hot-toast'

// Dados mockados de produtos
const products = [
  {
    id: 1,
    name: "iPhone 16 Pro",
    slug: "iphone-16-pro",
    brand: "Apple",
    basePrice: 7499,
    category: "smartphones",
    rating: 4.8,
    reviewCount: 2341,
    description: "O iPhone mais avançado de todos os tempos com chip A18 Pro e câmeras revolucionárias.",
    fullDescription: "O iPhone 16 Pro redefine o que é possível em um smartphone. Com o revolucionário chip A18 Pro, sistema de câmeras Pro triplo e tela Super Retina XDR de 6,1 polegadas, oferece performance incomparável e qualidade fotográfica profissional.",
    isNew: true,
    badge: "Novo",
    discount: 0,
    inStock: true,
    variations: [
      { color: "Titânio Natural", colorCode: "#E8E8E8", storage: "128GB", price: 7499, inStock: true },
      { color: "Titânio Azul", colorCode: "#4A90E2", storage: "128GB", price: 7499, inStock: true },
      { color: "Titânio Branco", colorCode: "#F8F8F8", storage: "256GB", price: 8499, inStock: true },
      { color: "Titânio Preto", colorCode: "#2C2C2C", storage: "512GB", price: 9499, inStock: false },
    ],
    images: [
      "/Produtos/Iphone 16 Pro.png",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    features: [
      "Chip A18 Pro",
      "Sistema de câmeras Pro triplo",
      "Tela Super Retina XDR 6,1\"",
      "5G ultrarrápido",
      "Face ID",
      "Resistente à água IP68"
    ],
    specifications: {
      display: "Super Retina XDR OLED 6,1\"",
      processor: "Chip A18 Pro",
      camera: "Sistema triplo 48MP + 12MP + 12MP",
      battery: "Até 23 horas de reprodução de vídeo",
      storage: "128GB, 256GB, 512GB, 1TB",
      connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3"
    }
  },
  {
    id: 2,
    name: "MacBook Pro M3",
    slug: "macbook-pro-m3",
    brand: "Apple",
    basePrice: 16999,
    category: "laptops",
    rating: 4.9,
    reviewCount: 1876,
    description: "Performance profissional com eficiência extraordinária.",
    fullDescription: "O MacBook Pro com chip M3 oferece performance excepcional para profissionais criativos. Com até 22 horas de bateria, tela Liquid Retina XDR e design premium em alumínio.",
    isNew: true,
    badge: "Pro",
    discount: 0,
    inStock: true,
    variations: [
      { color: "Cinza Espacial", colorCode: "#2C2C2C", storage: "512GB", price: 16999, inStock: true },
      { color: "Prateado", colorCode: "#E8E8E8", storage: "512GB", price: 16999, inStock: true },
      { color: "Cinza Espacial", colorCode: "#2C2C2C", storage: "1TB", price: 19999, inStock: true },
    ],
    images: [
      "/Produtos/Macbook Pro.png",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    features: [
      "Chip M3 Pro",
      "Tela Liquid Retina XDR 14\"",
      "Até 22h de bateria",
      "Magic Keyboard",
      "Touch Bar",
      "6 alto-falantes"
    ],
    specifications: {
      display: "Liquid Retina XDR 14,2\"",
      processor: "Chip M3 Pro de 11 núcleos",
      memory: "18GB de memória unificada",
      storage: "512GB, 1TB SSD",
      battery: "Até 22 horas",
      ports: "3x Thunderbolt 4, HDMI, MagSafe 3"
    }
  }
]

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const router = useRouter()
  const { addItem } = useCartStore()
  
  const [selectedVariation, setSelectedVariation] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [id, setId] = useState<string>('')

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setId(resolvedParams.id)
    }
    getParams()
  }, [params])

  // Encontrar produto por slug ou id
  const product = products.find(p => p.slug === id || p.id.toString() === id)

  useEffect(() => {
    // Só redireciona se o id já foi carregado e o produto não foi encontrado
    if (id && !product) {
      router.push('/products')
    }
  }, [product, router, id])

  // Loading state enquanto o id não foi carregado
  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00CED1] mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando produto...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Produto não encontrado</h1>
          <Button onClick={() => router.push('/products')}>
            Voltar aos Produtos
          </Button>
        </div>
      </div>
    )
  }

  const currentVariation = product.variations[selectedVariation]
  const currentPrice = currentVariation.price
  const discountedPrice = product.discount > 0 ? currentPrice * (1 - product.discount / 100) : currentPrice

  const handleAddToCart = () => {
    if (!currentVariation.inStock) {
      toast.error('Produto fora de estoque')
      return
    }

    addItem({
      id: `${product.id}-${currentVariation.color}-${currentVariation.storage}`,
      name: `${product.name} - ${currentVariation.color} ${currentVariation.storage}`,
      price: discountedPrice,
      image: product.images[0],
      quantity: quantity,
      stock: 10
    })

    toast.success(`${product.name} adicionado ao carrinho!`)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <Button 
              variant="ghost" 
              onClick={() => router.back()}
              className="flex items-center text-gray-700 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <Link href="/" className="font-bold text-gray-900 tracking-tight">
              USSBRASIL
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/cart" className="text-gray-700 hover:text-gray-900 transition-colors">
                Carrinho
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden">
              <Image
                src={product.images[selectedImageIndex]}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-4">
              {product.images.map((image, index) => (
                <button
                  key={`product-image-${index}`}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index 
                      ? 'border-[#00CED1]' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary">{product.brand}</Badge>
                {product.badge && (
                  <Badge className="bg-[#00CED1] text-white">{product.badge}</Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600 text-lg">{product.description}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={`rating-star-${i}`}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviewCount} avaliações)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                {product.discount > 0 && (
                  <span className="text-2xl text-gray-500 line-through">
                    R$ {currentPrice.toLocaleString('pt-BR')}
                  </span>
                )}
                <span className="text-3xl font-bold text-gray-900">
                  R$ {discountedPrice.toLocaleString('pt-BR')}
                </span>
                {product.discount > 0 && (
                  <Badge variant="destructive">-{product.discount}%</Badge>
                )}
              </div>
              <p className="text-sm text-gray-600">
                Em até 12x de R$ {(discountedPrice / 12).toFixed(2)} sem juros
              </p>
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Cor: {currentVariation.color}</h3>
              <div className="flex space-x-3">
                {product.variations.map((variation, index) => (
                  <button
                    key={`color-variation-${index}-${variation.color}`}
                    onClick={() => setSelectedVariation(index)}
                    className={`w-10 h-10 rounded-full border-4 transition-all ${
                      selectedVariation === index 
                        ? 'border-[#00CED1] scale-110' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={{ backgroundColor: variation.colorCode }}
                    title={variation.color}
                  />
                ))}
              </div>
            </div>

            {/* Storage Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Armazenamento</h3>
              <div className="flex space-x-3">
                {[...new Set(product.variations.map(v => v.storage))].map((storage, index) => (
                  <Button
                    key={`storage-option-${index}-${storage}`}
                    variant={currentVariation.storage === storage ? "default" : "outline"}
                    onClick={() => {
                      const index = product.variations.findIndex(v => v.storage === storage)
                      if (index !== -1) setSelectedVariation(index)
                    }}
                    className={currentVariation.storage === storage ? "bg-[#00CED1] hover:bg-[#20B2AA]" : ""}
                  >
                    {storage}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Quantidade</h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-semibold min-w-[3ch] text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= 10}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              {currentVariation.inStock ? (
                <>
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-green-600 font-medium">Em estoque</span>
                </>
              ) : (
                <>
                  <span className="text-red-600 font-medium">Fora de estoque</span>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button 
                onClick={handleAddToCart}
                disabled={!currentVariation.inStock}
                className="w-full bg-[#00CED1] hover:bg-[#20B2AA] text-white py-3 text-lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Adicionar ao Carrinho
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="w-full border-gray-300 hover:bg-gray-50"
              >
                <Heart className={`h-5 w-5 mr-2 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                {isWishlisted ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
              </Button>
            </div>

            {/* Benefits */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Truck className="h-5 w-5 text-[#00CED1]" />
                <span>Frete grátis para todo o Brasil</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Shield className="h-5 w-5 text-[#00CED1]" />
                <span>Garantia oficial Apple de 1 ano</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <RotateCcw className="h-5 w-5 text-[#00CED1]" />
                <span>Troca grátis em até 30 dias</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Descrição</TabsTrigger>
              <TabsTrigger value="specifications">Especificações</TabsTrigger>
              <TabsTrigger value="reviews">Avaliações</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Sobre o Produto</h3>
                    <p className="text-gray-600 leading-relaxed">{product.fullDescription}</p>
                    
                    <h4 className="font-semibold mt-6">Principais Características:</h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={`feature-${index}-${feature.slice(0, 10)}`} className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Especificações Técnicas</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={`spec-${key}`} className="border-b border-gray-100 pb-2">
                        <dt className="font-medium text-gray-900 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </dt>
                        <dd className="text-gray-600">{value}</dd>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <h3 className="text-xl font-semibold mb-2">Avaliações dos Clientes</h3>
                    <p className="text-gray-600">
                      {product.reviewCount} avaliações com média de {product.rating} estrelas
                    </p>
                    <div className="mt-4">
                      <Button variant="outline">Ver Todas as Avaliações</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
