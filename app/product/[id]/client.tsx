'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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
  Plus,
  Zap,
  Camera,
  Smartphone,
  Battery,
  Wifi,
  Award,
  ChevronDown,
  Share,
  MessageCircle
} from 'lucide-react'
import { toast } from 'react-hot-toast'

// Dados mockados baseados nas imagens da pasta public
const products = [
  {
    id: 1,
    name: "iPhone 16 Pro",
    slug: "iphone-16-pro",
    brand: "Apple",
    basePrice: 10499,
    originalPrice: 11999,
    category: "iPhone",
    rating: 4.9,
    reviewCount: 2341,
    shortDescription: "O iPhone mais avançado de todos os tempos com chip A18 Pro.",
    description: "O iPhone 16 Pro redefine o que é possível em um smartphone. Com o revolucionário chip A18 Pro, sistema de câmeras Pro triplo e tela Super Retina XDR de 6,3 polegadas, oferece performance incomparável e qualidade fotográfica profissional.",
    isNew: true,
    badge: "Novo",
    discount: 12,
    inStock: true,
    images: [
      "/Produtos/Iphone-16-Pro.png",
      "/Produtos/Iphone 16/Normal x Plus/iPhone 16 Pro Max - Natural Titanium.png",
      "/Produtos/Iphone 16/Normal x Plus/iPhone 16 Pro Max - Blue Titanium.png",
      "/Produtos/Iphone 16/Normal x Plus/iPhone 16 Pro Max - White Titanium.png"
    ],
    colors: [
      { name: "Titânio Natural", code: "#E8E8E8", image: "/Produtos/Iphone-16-Pro.png" },
      { name: "Titânio Azul", code: "#4A6FA5", image: "/Produtos/Iphone 16/Normal x Plus/iPhone 16 Pro Max - Blue Titanium.png" },
      { name: "Titânio Branco", code: "#F8F8F8", image: "/Produtos/Iphone 16/Normal x Plus/iPhone 16 Pro Max - White Titanium.png" },
      { name: "Titânio Preto", code: "#1F1F1F", image: "/Produtos/Iphone-16-Pro.png" }
    ],
    storage: [
      { capacity: "128GB", price: 10499, available: true },
      { capacity: "256GB", price: 11499, available: true },
      { capacity: "512GB", price: 13499, available: true },
      { capacity: "1TB", price: 15499, available: false }
    ],
    features: [
      { icon: Zap, title: "Chip A18 Pro", description: "Performance revolucionária" },
      { icon: Camera, title: "Câmera Pro 48MP", description: "Sistema triplo de câmeras" },
      { icon: Smartphone, title: "Tela ProMotion", description: "Super Retina XDR 120Hz" },
      { icon: Battery, title: "Bateria", description: "Até 29h de reprodução de vídeo" },
      { icon: Wifi, title: "5G", description: "Conectividade ultrarrápida" },
      { icon: Shield, title: "Ceramic Shield", description: "Mais resistente que qualquer vidro" }
    ],
    specifications: {
      "Tela": "6,3 polegadas Super Retina XDR",
      "Chip": "A18 Pro com Neural Engine de 16 núcleos",
      "Câmera": "Sistema triplo 48MP + 12MP + 12MP",
      "Vídeo": "4K Dolby Vision até 60 fps",
      "Bateria": "Até 29 horas de reprodução de vídeo",
      "Resistência": "IP68 (6 metros por até 30 minutos)",
      "Conectividade": "5G, Wi-Fi 7, Bluetooth 5.3",
      "Armazenamento": "128GB, 256GB, 512GB, 1TB",
      "Peso": "199 gramas",
      "Dimensões": "159,9 × 76,7 × 8,25 mm"
    },
    whatsInBox: [
      "iPhone 16 Pro",
      "Cabo USB-C para Lightning",
      "Documentação"
    ],
    reviews: [
      {
        id: 1,
        user: "João Silva",
        rating: 5,
        comment: "Produto incrível! A qualidade da câmera é impressionante.",
        date: "2024-01-15",
        verified: true
      },
      {
        id: 2,
        user: "Maria Santos",
        rating: 5,
        comment: "Performance excelente, muito rápido e fluido.",
        date: "2024-01-10",
        verified: true
      }
    ]
  },
  {
    id: 2,
    name: "iPhone 16",
    slug: "iphone-16",
    brand: "Apple",
    basePrice: 7499,
    originalPrice: 8499,
    category: "iPhone",
    rating: 4.8,
    reviewCount: 1856,
    shortDescription: "iPhone 16 com chip A18 e nova Action Button.",
    description: "O iPhone 16 traz inovações incríveis com o chip A18, câmera Fusion de 48MP e a nova Action Button personalizável.",
    isNew: true,
    images: ["/Produtos/Iphone-16.png"],
    colors: [
      { name: "Rosa", code: "#FFB3D9", image: "/Produtos/Iphone-16.png" },
      { name: "Verde-água", code: "#7FFFD4", image: "/Produtos/Iphone-16.png" },
      { name: "Ultramarino", code: "#4169E1", image: "/Produtos/Iphone-16.png" },
      { name: "Branco", code: "#FFFFFF", image: "/Produtos/Iphone-16.png" },
      { name: "Preto", code: "#000000", image: "/Produtos/Iphone-16.png" }
    ],
    storage: [
      { capacity: "128GB", price: 7499, available: true },
      { capacity: "256GB", price: 8499, available: true },
      { capacity: "512GB", price: 10499, available: true }
    ]
  }
]

export function ProductPageClient({ productId }: { productId: string }) {
  const router = useRouter()
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedStorage, setSelectedStorage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const product = products.find(p => p.id === parseInt(productId))
    if (product) {
      setSelectedProduct(product)
    }
  }, [productId])

  if (!selectedProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Produto não encontrado</h1>
          <Link href="/products">
            <Button>Voltar aos produtos</Button>
          </Link>
        </div>
      </div>
    )
  }

  const currentPrice = selectedProduct.storage[selectedStorage]?.price || selectedProduct.basePrice
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const addToCart = () => {
    toast.success('Produto adicionado ao carrinho!')
  }

  const currentImage = selectedProduct.colors[selectedColor]?.image || selectedProduct.images[selectedImage]

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Início</Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="text-gray-500 hover:text-gray-700">Produtos</Link>
            <span className="text-gray-400">/</span>
            <Link href={`/categories/${selectedProduct.category.toLowerCase()}`} className="text-gray-500 hover:text-gray-700">
              {selectedProduct.category}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{selectedProduct.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Main Image */}
            <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentImage}
                    alt={selectedProduct.name}
                    fill
                    className="object-contain p-8"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Badges */}
              <div className="absolute top-6 left-6 flex flex-col space-y-2">
                {selectedProduct.isNew && (
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1">
                    Novo
                  </Badge>
                )}
                {selectedProduct.discount && selectedProduct.discount > 0 && (
                  <Badge className="bg-red-600 hover:bg-red-700 text-white px-3 py-1">
                    -{selectedProduct.discount}%
                  </Badge>
                )}
              </div>

              {/* Share & Favorite */}
              <div className="absolute top-6 right-6 flex space-x-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-10 w-10 p-0 bg-white/80 backdrop-blur-sm hover:bg-white"
                >
                  <Share className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={isFavorite ? "default" : "secondary"}
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="h-10 w-10 p-0 bg-white/80 backdrop-blur-sm hover:bg-white"
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>

            {/* Thumbnail Images */}
            {selectedProduct.images && selectedProduct.images.length > 1 && (
              <div className="flex space-x-4">
                {selectedProduct.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-xl border-2 transition-all duration-200 ${
                      selectedImage === index 
                        ? 'border-blue-600 shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${selectedProduct.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain p-2 rounded-lg"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
          >
            {/* Header */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm text-gray-500">{selectedProduct.brand}</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{selectedProduct.rating}</span>
                  <span className="text-sm text-gray-500">({selectedProduct.reviewCount} avaliações)</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {selectedProduct.name}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {selectedProduct.shortDescription}
              </p>
            </div>

            {/* Price */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(currentPrice)}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(selectedProduct.originalPrice)}
                  </span>
                )}
                {selectedProduct.discount && selectedProduct.discount > 0 && (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    Economize {selectedProduct.discount}%
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                ou 12x de {formatPrice(currentPrice / 12)} sem juros
              </p>
            </div>

            {/* Color Selection */}
            {selectedProduct.colors && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Cor: {selectedProduct.colors[selectedColor].name}
                </h3>
                <div className="flex space-x-3">
                  {selectedProduct.colors.map((color, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedColor(index)}
                      className={`w-12 h-12 rounded-full border-4 transition-all duration-200 ${
                        selectedColor === index 
                          ? 'border-blue-600 shadow-lg' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      style={{ backgroundColor: color.code }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Storage Selection */}
            {selectedProduct.storage && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Armazenamento</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedProduct.storage.map((storage, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedStorage(index)}
                      disabled={!storage.available}
                      className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                        selectedStorage === index 
                          ? 'border-blue-600 bg-blue-50 text-blue-900' 
                          : storage.available 
                            ? 'border-gray-200 hover:border-gray-300' 
                            : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <div className="font-semibold">{storage.capacity}</div>
                      <div className="text-sm">
                        {storage.available ? formatPrice(storage.price) : 'Indisponível'}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Quantidade</label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-10 w-10 p-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-10 w-10 p-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button 
                  size="lg" 
                  className="flex-1 h-12"
                  onClick={addToCart}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Adicionar ao Carrinho
                </Button>
                <Button size="lg" variant="outline" className="h-12">
                  Comprar Agora
                </Button>
              </div>

              <Button 
                variant="outline" 
                size="lg" 
                className="w-full h-12 bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Comprar via WhatsApp
              </Button>
            </div>

            {/* Benefits */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Benefícios</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-700">Frete grátis para todo o Brasil</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">Garantia de 1 ano</span>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="h-5 w-5 text-purple-600" />
                  <span className="text-sm text-gray-700">7 dias para troca e devolução</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-yellow-600" />
                  <span className="text-sm text-gray-700">Produto original Apple</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-xl">
              <TabsTrigger value="overview" className="rounded-lg">Visão Geral</TabsTrigger>
              <TabsTrigger value="specs" className="rounded-lg">Especificações</TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-lg">Avaliações</TabsTrigger>
              <TabsTrigger value="box" className="rounded-lg">Na Caixa</TabsTrigger>
            </TabsList>
            
            <div className="mt-8">
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Sobre o Produto</h3>
                    <p className="text-gray-700 leading-relaxed mb-8">
                      {selectedProduct.description}
                    </p>
                    
                    {selectedProduct.features && (
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-4">Principais Recursos</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {selectedProduct.features.map((feature, index) => {
                            const Icon = feature.icon
                            return (
                              <div key={index} className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                  <Icon className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-1">{feature.title}</h5>
                                  <p className="text-sm text-gray-600">{feature.description}</p>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specs">
                <Card>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Especificações Técnicas</h3>
                    {selectedProduct.specifications && (
                      <div className="grid gap-4">
                        {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="font-medium text-gray-900">{key}</span>
                            <span className="text-gray-700">{value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card>
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-gray-900">Avaliações</h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < Math.floor(selectedProduct.rating) 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-semibold">{selectedProduct.rating}</span>
                        <span className="text-gray-500">({selectedProduct.reviewCount} avaliações)</span>
                      </div>
                    </div>
                    
                    {selectedProduct.reviews && (
                      <div className="space-y-6">
                        {selectedProduct.reviews.map((review) => (
                          <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <span className="text-sm font-medium text-blue-600">
                                    {review.user.charAt(0)}
                                  </span>
                                </div>
                                <span className="font-medium text-gray-900">{review.user}</span>
                                {review.verified && (
                                  <Badge variant="outline" className="text-xs">
                                    <Check className="h-3 w-3 mr-1" />
                                    Verificado
                                  </Badge>
                                )}
                              </div>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            <div className="flex mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating 
                                      ? 'text-yellow-400 fill-current' 
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="box">
                <Card>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">O que vem na caixa</h3>
                    {selectedProduct.whatsInBox && (
                      <div className="space-y-3">
                        {selectedProduct.whatsInBox.map((item, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <Check className="h-5 w-5 text-green-600" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
}

export function ProductPageClient({ product, relatedProducts }: ProductPageClientProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedTab, setSelectedTab] = useState('description')
  
  const { addToCart } = useCart()
  const { favorites, toggleFavorite } = useFavorites()
  
  const isFavorite = favorites.some(fav => fav.id === parseInt(product.id))
  
  const handleAddToCart = () => {
    addToCart({
      id: parseInt(product.id),
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.image,
      quantity
    })
  }

  const handleToggleFavorite = () => {
    toggleFavorite(parseInt(product.id))
  }

  const images = product.images || [product.image]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Product Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="aspect-square bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
            >
              <Image
                src={images[selectedImage]}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-contain"
                priority
              />
            </motion.div>
            
            {/* Image Thumbnails */}
            {images.length > 1 && (
              <div className="flex space-x-4 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index 
                        ? 'border-blue-500' 
                        : 'border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full">
                  {product.marca}
                </span>
                <button
                  onClick={handleToggleFavorite}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {isFavorite ? (
                    <HeartSolidIcon className="w-6 h-6 text-red-500" />
                  ) : (
                    <HeartIcon className="w-6 h-6 text-gray-400" />
                  )}
                </button>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {product.name}
              </h1>

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({product.reviewCount} avaliações)
                </span>
              </div>

              <div className="space-y-2">
                {product.discountPrice ? (
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      R$ {product.discountPrice.toLocaleString('pt-BR')}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      R$ {product.price.toLocaleString('pt-BR')}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-sm font-medium rounded">
                      {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    R$ {product.price.toLocaleString('pt-BR')}
                  </span>
                )}
                
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  ou 12x de R$ {((product.discountPrice || product.price) / 12).toLocaleString('pt-BR')} sem juros
                </p>
              </div>

              {product.shortDescription && (
                <p className="text-gray-600 dark:text-gray-300">
                  {product.shortDescription}
                </p>
              )}

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Quantidade:
                  </label>
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x border-gray-300 dark:border-gray-600">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center space-x-2"
                  >
                    <ShoppingCartIcon className="w-5 h-5" />
                    <span>Adicionar ao Carrinho</span>
                  </motion.button>
                  
                  <button className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <ShareIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="space-y-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <TruckIcon className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Frete grátis para todo o Brasil
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <ShieldCheckIcon className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Garantia de 12 meses
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8">
              {[
                { id: 'description', label: 'Descrição' },
                { id: 'specifications', label: 'Especificações' },
                { id: 'reviews', label: 'Avaliações' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    selectedTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {selectedTab === 'description' && (
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300">
                  {product.description}
                </p>
                {product.features && product.features.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">Principais características:</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {selectedTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.specifications || {}).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {key}:
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {selectedTab === 'reviews' && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  Em breve você poderá ver as avaliações dos nossos clientes aqui.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Produtos Relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((relatedProduct) => (
                <motion.div
                  key={relatedProduct.id}
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="aspect-square p-4">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      R$ {(relatedProduct.discountPrice || relatedProduct.price).toLocaleString('pt-BR')}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
