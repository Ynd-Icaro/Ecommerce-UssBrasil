'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Star, Play, Pause, ChevronRight, Zap, Eye } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { useModal } from '@/contexts/ModalContext'
import { toast } from 'sonner'
import data from '@/db.json'

// Interfaces
interface Product {
  id: string
  name: string
  price: number
  discountPrice?: number
  image: string
  images?: string[]
  category: string
  marca: string
  rating?: number
  stock: number
  featured?: boolean
  description?: string
}

// Função para ajustar caminhos das imagens
const fixPath = (path: string) => {
  if (!path) return '/fallback-product.png'
  if (path.startsWith('Ecommerce-UssBrasil/public/')) {
    return `/${path.replace('Ecommerce-UssBrasil/public/', '')}`
  }
  return path.startsWith('/') ? path : `/${path}`
}

// Data
const products: Product[] = (data.products as any[]).map((p: any) => ({
  id: p.id,
  name: p.name,
  price: p.price,
  discountPrice: p.discountPrice || undefined,
  category: p.category,
  marca: p.brand || p.marca || 'Marca',
  stock: p.stock || 100,
  featured: p.featured || false,
  description: p.description || '',
  rating: p.rating || 4.5,
  image: fixPath(p.image),
  images: p.images?.map(fixPath) || [fixPath(p.image)],
})).slice(0, 20)

// Videos para hero section
const heroVideos = [
  {
    src: '/Videos/IphoneVideo.mp4',
    title: 'iPhone 16',
    subtitle: 'Titânio. Tão forte. Tão leve. Tão Pro.',
    cta: 'Descubra Agora',
    link: '/produtos'
  },
  {
    src: '/Videos/IpadVideo.mp4', 
    title: 'iPad Pro',
    subtitle: 'Poder para os profissionais.',
    cta: 'Explore Agora',
    link: '/produtos'
  },
  {
    src: '/Videos/Apple Watch.mp4',
    title: 'Apple Watch',
    subtitle: 'Seu assistente de saúde mais inteligente.',
    cta: 'Conheça Agora',
    link: '/produtos'
  }
]

// Component: Video Hero Section
function VideoHeroSection() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)

  const currentVideo = heroVideos[currentVideoIndex]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex(prev => (prev + 1) % heroVideos.length)
    }, 12000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-screen overflow-hidden" style={{ backgroundColor: 'var(--uss-bg)' }}>
      <video
        key={currentVideoIndex}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop={false}
        playsInline
        onEnded={() => setCurrentVideoIndex(prev => (prev + 1) % heroVideos.length)}
      >
        <source src={currentVideo.src} type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-6">
          <motion.div
            key={currentVideoIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ color: 'var(--uss-text)' }}>
              {currentVideo.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8" style={{ color: 'var(--uss-text)' }}>
              {currentVideo.subtitle}
            </p>
            <Link href={currentVideo.link}>
              <Button 
                size="lg" 
                className="px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                style={{ 
                  background: 'var(--uss-gradient-primary)',
                  color: 'var(--uss-text)',
                  border: 'none'
                }}
              >
                {currentVideo.cta}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Video Controls */}
      <div className="absolute bottom-8 left-8 flex items-center gap-4">
        {heroVideos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentVideoIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentVideoIndex ? 'opacity-100' : 'opacity-40'
            }`}
            style={{
              backgroundColor: index === currentVideoIndex ? 'var(--uss-primary)' : 'var(--uss-text)'
            }}
          />
        ))}
      </div>
    </section>
  )
}

// Component: Product Card
function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const { favorites, toggleFavorite, user } = useAuth()
  const { openAuthModal } = useModal()

  const isFavorite = favorites.includes(product.id)
  const discountPercentage = product.discountPrice 
    ? Math.round((1 - product.discountPrice / product.price) * 100)
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart({
      id: Number(product.id),
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.image,
      category: product.category
    })
    toast.success(`${product.name} adicionado ao carrinho!`)
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!user) {
      openAuthModal()
      return
    }
    toggleFavorite(product.id)
    toast.success(isFavorite ? 'Removido dos favoritos' : 'Adicionado aos favoritos')
  }

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative rounded-xl border transition-all duration-300 overflow-hidden"
      style={{ 
        backgroundColor: 'var(--uss-bg-light)',
        borderColor: 'var(--uss-border-light)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Link href={`/produto/${product.id}`} className="block">
        <div className="aspect-square relative overflow-hidden" style={{ backgroundColor: 'var(--uss-surface-light)' }}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.featured && (
              <Badge 
                className="text-white border-0 text-xs px-2 py-1 rounded-md"
                style={{ background: 'var(--uss-gradient-primary)' }}
              >
                <Zap className="h-3 w-3 mr-1" />
                Destaque
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge 
                className="text-white border-0 text-xs px-2 py-1 rounded-md"
                style={{ background: 'var(--uss-gradient-secondary)' }}
              >
                -{discountPercentage}%
              </Badge>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              variant="secondary"
              onClick={handleToggleFavorite}
              className="h-8 w-8 p-0 shadow-md rounded-full"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: 'none'
              }}
            >
              <Heart 
                className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`}
                style={{ 
                  color: isFavorite ? 'var(--uss-secondary)' : 'var(--uss-text-secondary)'
                }}
              />
            </Button>
          </div>

          {/* Low Stock Warning */}
          {product.stock < 10 && (
            <div className="absolute bottom-3 left-3">
              <Badge 
                className="text-xs text-white px-2 py-1 rounded-md"
                style={{ backgroundColor: 'var(--uss-warning)' }}
              >
                Últimas {product.stock} unidades
              </Badge>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${i < Math.floor(product.rating || 4.5) ? 'fill-current' : ''}`}
              style={{ 
                color: i < Math.floor(product.rating || 4.5) 
                  ? 'var(--uss-warning)' 
                  : 'var(--uss-text-secondary)'
              }}
            />
          ))}
          <span className="text-xs ml-1" style={{ color: 'var(--uss-text-secondary)' }}>
            ({product.rating?.toFixed(1) || '4.5'})
          </span>
        </div>

        <h3 
          className="font-semibold line-clamp-2 mb-2 group-hover:transition-colors duration-300"
          style={{ color: 'var(--uss-text-light)' }}
        >
          {product.name}
        </h3>

        <p className="text-xs mb-3 uppercase tracking-wide" style={{ color: 'var(--uss-text-secondary)' }}>
          {product.marca} • {product.category}
        </p>

        <div className="flex items-center justify-between mb-4">
          {product.discountPrice ? (
            <div className="flex flex-col">
              <span className="text-sm line-through" style={{ color: 'var(--uss-text-secondary)' }}>
                R$ {product.price.toLocaleString('pt-BR')}
              </span>
              <span className="text-lg font-bold" style={{ color: 'var(--uss-primary)' }}>
                R$ {product.discountPrice.toLocaleString('pt-BR')}
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold" style={{ color: 'var(--uss-text-light)' }}>
              R$ {product.price.toLocaleString('pt-BR')}
            </span>
          )}
        </div>

        <Button 
          onClick={handleAddToCart}
          className="w-full font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
          disabled={product.stock === 0}
          style={{ 
            background: product.stock === 0 ? 'var(--uss-text-secondary)' : 'var(--uss-gradient-primary)',
            color: 'var(--uss-text)',
            border: 'none'
          }}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.stock === 0 ? 'Esgotado' : 'Adicionar ao Carrinho'}
        </Button>
      </div>
    </motion.div>
  )
}

// Component: Brands Section
function BrandsSection() {
  const brands = [
    { name: 'Apple', logo: '/Empresa/02.png', url: '/marcas/apple' },
    { name: 'JBL', logo: '/icons/jbl-logo.png', url: '/marcas/jbl' },
    { name: 'DJI', logo: '/icons/dji-logo.png', url: '/marcas/dji' },
    { name: 'Xiaomi', logo: '/icons/xiaomi-logo.png', url: '/marcas/xiaomi' }
  ]

  return (
    <section className="py-16" style={{ background: 'var(--uss-surface)' }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--uss-text-light)' }}>
            Marcas que Confiamos
          </h2>
          <p className="text-lg" style={{ color: 'var(--uss-text-secondary)' }}>
            As melhores marcas do mercado em um só lugar
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {brands.map((brand) => (
            <Link key={brand.name} href={brand.url}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="rounded-lg p-8 shadow-sm hover:shadow-lg transition-all text-center group"
                style={{ background: 'var(--uss-bg-light)' }}
              >
                <div className="relative h-16 mb-4">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform"
                  />
                </div>
                <h3 
                  className="font-semibold group-hover:text-uss-primary transition-colors"
                  style={{ color: 'var(--uss-text-light)' }}
                >
                  {brand.name}
                </h3>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// Main Component
export default function HomePage() {
  const featuredProducts = products.filter(p => p.featured).slice(0, 8)
  const newProducts = products.slice(0, 8)

  return (
    <div className="min-h-screen">
      <VideoHeroSection />
      
      {/* Featured Products Section */}
      <section className="py-16" style={{ background: 'var(--uss-bg)' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--uss-text-light)' }}>
              Produtos em Destaque
            </h2>
            <p className="text-lg" style={{ color: 'var(--uss-text-secondary)' }}>
              Os produtos mais procurados pelos nossos clientes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/produtos">
              <Button 
                size="lg" 
                variant="outline" 
                className="font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                style={{
                  borderColor: 'var(--uss-primary)',
                  color: 'var(--uss-primary)',
                  background: 'transparent'
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.background = 'var(--uss-primary)';
                  target.style.color = 'var(--uss-text)';
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.background = 'transparent';
                  target.style.color = 'var(--uss-primary)';
                }}
              >
                Ver Todos os Produtos
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <BrandsSection />

      {/* New Products Section */}
      <section className="py-16" style={{ background: 'var(--uss-bg)' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--uss-text-light)' }}>
              Novidades
            </h2>
            <p className="text-lg" style={{ color: 'var(--uss-text-secondary)' }}>
              Os lançamentos mais recentes em tecnologia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <ProductCard key={`new-${product.id}`} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
