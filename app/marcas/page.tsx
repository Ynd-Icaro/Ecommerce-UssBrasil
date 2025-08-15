'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  StarIcon,
  ArrowRightIcon,
  TrophyIcon,
  ShieldCheckIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import USSProductCard, { USSProductCardSkeleton } from '@/components/USSProductCard'
import USSFooter from '@/components/USSFooter'

interface Brand {
  id: string
  name: string
  slug: string
  logo: string
  description: string
  establishedYear: number
  country: string
  productCount: number
  averageRating: number
  specialties: string[]
  featured: boolean
  trustBadge?: string
}

interface Product {
  id: string
  name: string
  slug: string
  price: number
  discountPrice?: number
  image: string
  category: string
  marca: string
  rating?: number
  reviews?: number
  badge?: string
  isNew?: boolean
  isFeatured?: boolean
  inStock?: boolean
}

export default function MarcasPage() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [selectedBrand, setSelectedBrand] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)

  const allBrands: Brand[] = [
    {
      id: 'apple',
      name: 'Apple',
      slug: 'apple',
      logo: '/Produtos/Apple/apple-logo.png',
      description: 'Líder mundial em inovação tecnológica, criando produtos que definem o futuro da tecnologia pessoal.',
      establishedYear: 1976,
      country: 'Estados Unidos',
      productCount: 45,
      averageRating: 4.8,
      specialties: ['Smartphones', 'Notebooks', 'Tablets', 'Wearables'],
      featured: true,
      trustBadge: 'Premium Partner'
    },
    {
      id: 'samsung',
      name: 'Samsung',
      slug: 'samsung',
      logo: '/Produtos/Samsung/samsung-logo.png',
      description: 'Gigante tecnológico sul-coreano, pioneiro em displays e semicondutores de última geração.',
      establishedYear: 1938,
      country: 'Coreia do Sul',
      productCount: 38,
      averageRating: 4.6,
      specialties: ['Smartphones', 'TVs', 'Tablets', 'Eletrodomésticos'],
      featured: true,
      trustBadge: 'Innovation Leader'
    },
    {
      id: 'sony',
      name: 'Sony',
      slug: 'sony',
      logo: '/Produtos/Sony/sony-logo.png',
      description: 'Marca japonesa renomada mundialmente por excelência em áudio, vídeo e entretenimento.',
      establishedYear: 1946,
      country: 'Japão',
      productCount: 28,
      averageRating: 4.7,
      specialties: ['Áudio', 'Câmeras', 'Gaming', 'Televisores'],
      featured: true,
      trustBadge: 'Audio Excellence'
    },
    {
      id: 'dji',
      name: 'DJI',
      slug: 'dji',
      logo: '/Produtos/Dji/dji-logo.png',
      description: 'Líder mundial em drones e tecnologia de voo, oferecendo soluções profissionais de filmagem aérea.',
      establishedYear: 2006,
      country: 'China',
      productCount: 15,
      averageRating: 4.9,
      specialties: ['Drones', 'Câmeras', 'Gimbals', 'Acessórios'],
      featured: true,
      trustBadge: 'Flight Leader'
    },
    {
      id: 'jbl',
      name: 'JBL',
      slug: 'jbl',
      logo: '/Produtos/JBL/jbl-logo.png',
      description: 'Referência mundial em sistemas de áudio profissional e produtos de entretenimento.',
      establishedYear: 1946,
      country: 'Estados Unidos',
      productCount: 22,
      averageRating: 4.5,
      specialties: ['Speakers', 'Fones de Ouvido', 'Soundbars', 'Áudio Profissional'],
      featured: false
    },
    {
      id: 'xiaomi',
      name: 'Xiaomi',
      slug: 'xiaomi',
      logo: '/Produtos/Xiaomi/xiaomi-logo.png',
      description: 'Empresa chinesa focada em oferecer tecnologia de alta qualidade com preços acessíveis.',
      establishedYear: 2010,
      country: 'China',
      productCount: 32,
      averageRating: 4.4,
      specialties: ['Smartphones', 'Smart Home', 'Wearables', 'Eletrônicos'],
      featured: false
    },
    {
      id: 'bose',
      name: 'Bose',
      slug: 'bose',
      logo: '/Produtos/Bose/bose-logo.png',
      description: 'Pioneer em tecnologia de cancelamento de ruído e sistemas de áudio premium.',
      establishedYear: 1964,
      country: 'Estados Unidos',
      productCount: 18,
      averageRating: 4.8,
      specialties: ['Fones Premium', 'Speakers', 'Sistemas de Som', 'Áudio Automotivo'],
      featured: false
    },
    {
      id: 'asus',
      name: 'ASUS',
      slug: 'asus',
      logo: '/Produtos/Asus/asus-logo.png',
      description: 'Marca taiwanesa especializada em hardware de alta performance para gaming e produtividade.',
      establishedYear: 1989,
      country: 'Taiwan',
      productCount: 25,
      averageRating: 4.6,
      specialties: ['Notebooks', 'Gaming', 'Motherboards', 'Monitores'],
      featured: false
    }
  ]

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'iPhone 16 Pro 128GB',
      slug: 'iphone-16-pro-128gb',
      price: 8999,
      discountPrice: 8499,
      image: '/Produtos/Apple/Iphone 16 Pro.png',
      category: 'smartphones',
      marca: 'Apple',
      rating: 4.8,
      reviews: 245,
      badge: 'BEST SELLER',
      isNew: true,
      isFeatured: true,
      inStock: true
    },
    {
      id: '2',
      name: 'Samsung Galaxy S24 Ultra',
      slug: 'samsung-galaxy-s24-ultra',
      price: 7999,
      discountPrice: 7499,
      image: '/Produtos/Samsung/galaxy-s24-ultra.jpg',
      category: 'smartphones',
      marca: 'Samsung',
      rating: 4.6,
      reviews: 198,
      isFeatured: true,
      inStock: true
    },
    {
      id: '3',
      name: 'Sony WH-1000XM5',
      slug: 'sony-wh-1000xm5',
      price: 1899,
      discountPrice: 1699,
      image: '/Produtos/Sony/wh-1000xm5.jpg',
      category: 'audio',
      marca: 'Sony',
      rating: 4.8,
      reviews: 312,
      isFeatured: true,
      inStock: true
    },
    {
      id: '4',
      name: 'DJI Mini 4 Pro',
      slug: 'dji-mini-4-pro',
      price: 4999,
      discountPrice: 4699,
      image: '/Produtos/Dji/dji-mini-4-pro.jpg',
      category: 'drones',
      marca: 'DJI',
      rating: 4.9,
      reviews: 67,
      badge: 'PREMIUM',
      isFeatured: true,
      inStock: true
    }
  ]

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      // Simular carregamento
      await new Promise(resolve => setTimeout(resolve, 1000))
      setBrands(allBrands)
      setFeaturedProducts(mockProducts)
      setIsLoading(false)
    }
    
    loadData()
  }, [])

  const filteredBrands = selectedBrand === 'all' 
    ? brands 
    : brands.filter(brand => brand.id === selectedBrand)

  const featuredBrands = brands.filter(brand => brand.featured)

  return (
    <div className="min-h-screen bg-light-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-uss-blue to-uss-turquoise py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Marcas Premium
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Parceiros globais que representam excelência e inovação em tecnologia
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Brands Stats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-uss-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <TrophyIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-uss-blue mb-2">8+</h3>
              <p className="text-gray-600">Marcas Premium</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-uss-turquoise rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheckIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-uss-blue mb-2">100%</h3>
              <p className="text-gray-600">Produtos Originais</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-uss-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <StarIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-uss-blue mb-2">4.7</h3>
              <p className="text-gray-600">Avaliação Média</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-uss-dark rounded-full flex items-center justify-center mx-auto mb-4">
                <GlobeAltIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-uss-blue mb-2">15+</h3>
              <p className="text-gray-600">Países de Origem</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-uss-blue mb-8 text-center">
            Marcas em Destaque
          </h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-light-100 rounded-uss p-6 animate-pulse">
                  <div className="w-20 h-20 bg-light-200 rounded-uss mx-auto mb-4"></div>
                  <div className="h-4 bg-light-200 rounded mb-2"></div>
                  <div className="h-3 bg-light-200 rounded mb-4"></div>
                  <div className="h-8 bg-light-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {featuredBrands.map((brand, index) => (
                <motion.div
                  key={brand.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link 
                    href={`/marcas/${brand.slug}`}
                    className="group block bg-white rounded-uss shadow-uss-md hover:shadow-uss-lg transition-all duration-300 overflow-hidden border border-light-200"
                  >
                    <div className="p-6 text-center">
                      {brand.trustBadge && (
                        <div className="inline-block px-3 py-1 bg-uss-gold text-white text-xs font-medium rounded-full mb-4">
                          {brand.trustBadge}
                        </div>
                      )}
                      
                      <div className="w-20 h-20 bg-light-100 rounded-uss flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-2xl font-bold text-uss-blue">
                          {brand.name.charAt(0)}
                        </span>
                      </div>
                      
                      <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-uss-blue transition-colors">
                        {brand.name}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-3">
                        {brand.country} • {brand.establishedYear}
                      </p>
                      
                      <div className="flex items-center justify-center mb-4">
                        <StarIcon className="w-4 h-4 text-uss-gold fill-current mr-1" />
                        <span className="text-sm font-medium text-gray-700">
                          {brand.averageRating}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">
                          ({brand.productCount} produtos)
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {brand.specialties.slice(0, 2).map((specialty) => (
                          <span 
                            key={specialty}
                            className="px-2 py-1 bg-light-100 text-uss-blue text-xs rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-center text-uss-turquoise group-hover:translate-x-1 transition-transform">
                        <span className="text-sm font-medium mr-1">Ver produtos</span>
                        <ArrowRightIcon className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* All Brands */}
      <section className="py-16 bg-light-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-uss-blue mb-8 text-center">
            Todas as Marcas
          </h2>

          {/* Brand Filter */}
          <div className="flex justify-center mb-12">
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="px-4 py-2 border border-light-200 rounded-uss focus:outline-none focus:border-uss-blue"
            >
              <option value="all">Todas as marcas</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredBrands.map((brand, index) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-uss shadow-uss-md p-6 hover:shadow-uss-lg transition-shadow duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="w-24 h-24 bg-light-100 rounded-uss flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl font-bold text-uss-blue">
                      {brand.name.charAt(0)}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {brand.name}
                      </h3>
                      {brand.trustBadge && (
                        <span className="px-2 py-1 bg-uss-gold text-white text-xs font-medium rounded-full">
                          {brand.trustBadge}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-4">
                      {brand.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-gray-500">Fundada em:</span>
                        <p className="font-medium text-gray-900">{brand.establishedYear}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Origem:</span>
                        <p className="font-medium text-gray-900">{brand.country}</p>
                      </div>
                    </div>

                    <div className="flex items-center mb-4">
                      <StarIcon className="w-5 h-5 text-uss-gold fill-current mr-2" />
                      <span className="font-medium text-gray-900 mr-2">
                        {brand.averageRating}
                      </span>
                      <span className="text-gray-500">
                        • {brand.productCount} produtos
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {brand.specialties.map((specialty) => (
                        <span 
                          key={specialty}
                          className="px-3 py-1 bg-light-100 text-uss-blue text-sm rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>

                    <Link 
                      href={`/marcas/${brand.slug}`}
                      className="inline-flex items-center text-uss-blue hover:text-uss-turquoise font-medium transition-colors"
                    >
                      Ver produtos da marca
                      <ArrowRightIcon className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-uss-blue mb-8 text-center">
            Produtos em Destaque das Marcas
          </h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <USSProductCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <USSProductCard 
                  key={product.id} 
                  product={product} 
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <USSFooter />
    </div>
  )
}
