'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Filter, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getAllBrands, getAllProducts } from '@/lib/products-manager'
import { slugifyCategory } from '@/lib/slugify'

// Types
interface Brand {
  id: string
  name: string
  slug: string
  image: string
  logo: string
  description: string
  productCount: number
  categories: CategoryProduct[]
}

interface CategoryProduct {
  id: string
  name: string
  slug: string
  image: string
  productCount: number
  featured: boolean
}

interface Product {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  isNew: boolean
  isFavorite: boolean
}

const CategoriesPage = () => {
  const router = useRouter()
  const [brands, setBrands] = useState<Brand[]>([])

  useEffect(()=>{
    const b = getAllBrands()
    const products = getAllProducts()
    // Enriquecer com contagens reais
    const enriched:Brand[] = b.map((br,i)=>{
      const brandProducts = products.filter(p=>p.marca===br.slug)
      const categories = br.categories.map((cat,j)=>{
        const catProducts = brandProducts.filter(p=>p.category===cat.slug)
        return {
          id: `${i}-${j}`,
          name: cat.name,
          slug: cat.slug,
          image: brandProducts.find(p=>p.category===cat.slug)?.image || '/placeholder.png',
          productCount: catProducts.length,
          featured: catProducts.some(p=>p.featured)
        } as CategoryProduct
      })
      return {
        id: String(i),
        name: br.name,
        slug: br.slug,
        image: brandProducts[0]?.image || '/placeholder.png',
        logo: brandProducts[0]?.image || '/placeholder.png',
        description: `Produtos da marca ${br.name}`,
        productCount: brandProducts.length,
        categories
      }
    })
    setBrands(enriched)
  },[])

  // Helper function to build product links with filters
  const handleBrandClick = (brandSlug: string) => router.push(`/produtos?brand=${brandSlug}`)
  const handleCategoryClick = (brandSlug: string, categorySlug: string) => router.push(`/produtos?brand=${brandSlug}&category=${categorySlug}`)

  return (
    <div className="min-h-screen pt-32 pb-12" style={{ background: 'var(--uss-gradient-bg)' }}>
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ color: 'var(--uss-text-light)' }}>
            Explore por <span style={{ color: 'var(--uss-primary)' }}>Categorias</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--uss-text-secondary)' }}>
            Descubra produtos organizados por marca e categoria para encontrar exatamente o que você procura
          </p>
        </motion.div>

        {/* Brand Categories Grid */}
        <div className="space-y-16">
          {brands.map((brand, brandIndex) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: brandIndex * 0.1 }}
              className="relative"
            >
              
              {/* Brand Section */}
              <div className="mb-8">
                
                {/* 5-Card Horizontal Layout */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  
                  {/* Card 1 - Brand Card */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="md:col-span-1"
                  >
                    <Card 
                      className="h-full cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                      onClick={() => handleBrandClick(brand.slug)}
                      style={{ background: 'var(--uss-bg-light)' }}
                    >
                      <div 
                        className="relative h-48 md:h-64"
                        style={{ background: 'var(--uss-gradient-surface)' }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        <Image
                          src={brand.image}
                          alt={brand.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        
                        {/* Brand Logo Overlay */}
                        <div className="absolute top-4 left-4 w-12 h-12 rounded-lg flex items-center justify-center shadow-lg" style={{ background: 'var(--uss-bg-light-alpha)' }}>
                          <Image
                            src={brand.logo}
                            alt={`${brand.name} logo`}
                            width={32}
                            height={32}
                            className="object-contain"
                          />
                        </div>

                        {/* Product Count Badge */}
                        <div className="absolute top-4 right-4">
                          <Badge 
                            className="border-0 text-white font-semibold"
                            style={{ background: 'var(--uss-primary)' }}
                          >
                            {brand.productCount} produtos
                          </Badge>
                        </div>
                      </div>
                      
                      <CardContent className="p-6">
                        <h3 className="text-2xl font-bold mb-2 transition-colors" style={{ color: 'var(--uss-text-light)' }}>
                          {brand.name}
                        </h3>
                        <p className="mb-4" style={{ color: 'var(--uss-text-secondary)' }}>{brand.description}</p>
                        <div className="flex items-center space-x-2" style={{ color: 'var(--uss-primary)' }}>
                          <span className="text-sm font-medium">Ver todos os produtos</span>
                          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Cards 2-5 - Category Products */}
                  {brand.categories.slice(0, 4).map((category, categoryIndex) => (
                    <motion.div
                      key={category.id}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="md:col-span-1"
                    >
                      <Card 
                        className="h-full cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                        onClick={() => handleCategoryClick(brand.slug, category.slug)}
                        style={{ background: 'var(--uss-bg-light)' }}
                      >
                        <div className="relative h-48 md:h-64">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                          <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          
                          {/* Category Badge */}
                          <div className="absolute top-4 right-4 z-20">
                            <Badge 
                              variant="secondary" 
                              className="font-semibold"
                              style={{ 
                                background: 'var(--uss-bg-light-alpha)',
                                color: 'var(--uss-text-light)'
                              }}
                            >
                              {category.productCount} itens
                            </Badge>
                          </div>

                          {/* Featured Badge */}
                          {category.featured && (
                            <div className="absolute top-4 left-4 z-20">
                              <Badge 
                                className="border-0 text-white font-semibold"
                                style={{ background: 'var(--uss-warning)' }}
                              >
                                <Star className="h-3 w-3 mr-1" />
                                Destaque
                              </Badge>
                            </div>
                          )}
                        </div>
                        
                        <CardContent className="p-6">
                          <h4 className="text-xl font-semibold mb-2 transition-colors" style={{ color: 'var(--uss-text-light)' }}>
                            {category.name}
                          </h4>
                          <p className="text-sm mb-4" style={{ color: 'var(--uss-text-secondary)' }}>
                            Linha {brand.name} {category.name}
                          </p>
                          <div className="flex items-center space-x-2" style={{ color: 'var(--uss-primary)' }}>
                            <span className="text-sm font-medium">Explorar categoria</span>
                            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Slider Alternative */}
                <div className="md:hidden mt-8">
                  <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                    {brand.categories.map((category) => (
                      <div
                        key={category.id}
                        className="flex-shrink-0 w-64"
                        onClick={() => handleCategoryClick(brand.slug, category.slug)}
                      >
                        <Card 
                          className="cursor-pointer border-0 shadow-lg hover:shadow-xl transition-shadow"
                          style={{ background: 'var(--uss-bg-light)' }}
                        >
                          <div className="relative h-40">
                            <Image
                              src={category.image}
                              alt={category.name}
                              fill
                              className="object-cover rounded-t-lg"
                            />
                            <div className="absolute top-2 right-2">
                              <Badge 
                                variant="secondary" 
                                className="text-xs font-semibold"
                                style={{ 
                                  background: 'var(--uss-bg-light-alpha)',
                                  color: 'var(--uss-text-light)'
                                }}
                              >
                                {category.productCount}
                              </Badge>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h5 className="font-semibold" style={{ color: 'var(--uss-text-light)' }}>{category.name}</h5>
                            <p className="text-sm" style={{ color: 'var(--uss-text-secondary)' }}>Linha {brand.name}</p>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <div 
            className="rounded-3xl p-8 md:p-12 text-white"
            style={{ background: 'var(--uss-gradient-primary)' }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Não Encontrou o que Procurava?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Use nossa busca avançada ou entre em contato conosco
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/produtos">
                <Button
                  size="lg"
                  className="font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                  style={{
                    background: 'var(--uss-text)',
                    color: 'var(--uss-primary)'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.background = 'var(--uss-bg-light)';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.background = 'var(--uss-text)';
                  }}
                >
                  <Filter className="h-5 w-5 mr-2" />
                  Busca Avançada
                </Button>
              </Link>
              <Link href="/atendimento">
                <Button
                  size="lg"
                  variant="outline"
                  className="font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                  style={{
                    borderColor: 'white',
                    color: 'white',
                    background: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.background = 'white';
                    target.style.color = 'var(--uss-primary)';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.background = 'transparent';
                    target.style.color = 'white';
                  }}
                >
                  <ChevronRight className="h-5 w-5 mr-2" />
                  Falar com Especialista
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CategoriesPage
