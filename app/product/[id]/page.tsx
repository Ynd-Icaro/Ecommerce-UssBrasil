'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  ArrowLeft,
  Truck,
  Shield,
  RotateCcw,
  Check
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/contexts/CartContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import { toast } from 'sonner'

// Mock de produto para demonstração
const mockProduct = {
  id: '1',
  name: 'iPhone 16 Pro',
  price: 8999,
  originalPrice: 9999,
  rating: 4.8,
  reviews: 2847,
  images: {
    main: '/Imagens/Iphone 16 Pro.png',
    gallery: [
      '/Imagens/Iphone 16 Pro.png',
      '/Imagens/Iphone 16.png',
      '/Imagens/Iphone 16e.png'
    ]
  },
  description: 'O iPhone 16 Pro apresenta uma tela Super Retina XDR de 6,3 polegadas, chip A18 Pro revolucionário e sistema de câmera Pro avançado.',
  features: [
    'Tela Super Retina XDR de 6,3"',
    'Chip A18 Pro com Neural Engine',
    'Sistema de câmera Pro triplo',
    'Bateria com até 27 horas de reprodução de vídeo',
    'Face ID para autenticação segura',
    'Resistente à água IP68'
  ],
  specifications: {
    'Tela': '6,3" Super Retina XDR',
    'Chip': 'A18 Pro',
    'Armazenamento': '128GB, 256GB, 512GB, 1TB',
    'Câmera': '48MP Principal + 12MP Ultra Wide + 12MP Telefoto',
    'Bateria': 'Até 27 horas de vídeo',
    'Sistema': 'iOS 18'
  },
  categoria: 'Apple',
  classe: 'Smartphones',
  stock: 15,
  discount: 10,
  isFeatured: true,
  isNew: true
}

export default function ProductPage() {
  const params = useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  
  const { addToCart } = useCart()
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites()
  
  const isFavorite = favorites.some(fav => fav.id === mockProduct.id)
  
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: mockProduct.id,
        name: mockProduct.name,
        price: mockProduct.price,
        image: mockProduct.images.main
      })
    }
    
    toast.success(
      <div className="flex items-center gap-2">
        <ShoppingCart className="h-4 w-4" />
        <span>{quantity} item(s) adicionado(s) ao carrinho!</span>
      </div>
    )
  }
  
  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(mockProduct.id)
      toast.success('Removido dos favoritos')
    } else {
      addToFavorites({
        id: mockProduct.id,
        name: mockProduct.name,
        price: mockProduct.price,
        image: mockProduct.images.main
      })
      toast.success('Adicionado aos favoritos!')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/products" className="inline-flex items-center text-slate-600 hover:text-[#1e40af] transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar aos Produtos
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Galeria de Imagens */}
          <div className="space-y-4">
            <motion.div 
              className="aspect-square bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={mockProduct.images.gallery[selectedImage]}
                alt={mockProduct.name}
                width={600}
                height={600}
                className="w-full h-full object-contain p-8"
              />
            </motion.div>
            
            {/* Thumbnails */}
            <div className="flex gap-4">
              {mockProduct.images.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-[#1e40af] ring-2 ring-[#1e40af]/20' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${mockProduct.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Informações do Produto */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-slate-900 text-white">{mockProduct.categoria}</Badge>
                {mockProduct.isNew && (
                  <Badge className="bg-gradient-to-r from-[#1e40af] to-[#0ea5e9] text-white">Novo</Badge>
                )}
                {mockProduct.discount > 0 && (
                  <Badge className="bg-red-100 text-red-800">-{mockProduct.discount}%</Badge>
                )}
              </div>
              
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                {mockProduct.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(mockProduct.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-slate-600">
                  {mockProduct.rating} ({mockProduct.reviews} avaliações)
                </span>
              </div>
            </div>

            {/* Preços */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-[#1e40af]">
                  R$ {mockProduct.price.toLocaleString('pt-BR')}
                </span>
                {mockProduct.originalPrice && (
                  <span className="text-xl text-slate-500 line-through">
                    R$ {mockProduct.originalPrice.toLocaleString('pt-BR')}
                  </span>
                )}
              </div>
              <p className="text-slate-600">
                ou 12x de R$ {(mockProduct.price / 12).toLocaleString('pt-BR')} sem juros
              </p>
            </div>

            {/* Quantidade e Ações */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-slate-700">Quantidade:</label>
                <div className="flex items-center border border-slate-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-slate-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-slate-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-[#1e40af] to-[#0ea5e9] hover:from-[#1e40af]/90 hover:to-[#0ea5e9]/90 text-white py-3 text-lg font-semibold"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Adicionar ao Carrinho
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleToggleFavorite}
                  className={`px-4 py-3 ${isFavorite ? 'text-red-500 border-red-500' : ''}`}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>

            {/* Benefícios */}
            <Card className="bg-slate-50/50 border-slate-200">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-[#1e40af]" />
                    <span>Frete grátis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-[#1e40af]" />
                    <span>Garantia de 1 ano</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="h-4 w-4 text-[#1e40af]" />
                    <span>Troca em 30 dias</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs de Informações */}
        <div className="mt-16">
          <div className="flex gap-8 border-b border-slate-200">
            {['description', 'specifications', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 font-medium transition-colors ${
                  activeTab === tab
                    ? 'text-[#1e40af] border-b-2 border-[#1e40af]'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab === 'description' && 'Descrição'}
                {tab === 'specifications' && 'Especificações'}
                {tab === 'reviews' && 'Avaliações'}
              </button>
            ))}
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="space-y-6">
                <p className="text-lg text-slate-700 leading-relaxed">
                  {mockProduct.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockProduct.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(mockProduct.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-slate-200">
                    <span className="font-medium text-slate-900">{key}</span>
                    <span className="text-slate-600">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="text-center py-12">
                <p className="text-slate-600">Sistema de avaliações em desenvolvimento.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
