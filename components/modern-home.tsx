'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ProductCard } from '@/components/ProductCard'
import { useProducts } from '@/hooks/use-products'
import { 
  ArrowRight, 
  Play, 
  Star, 
  Truck, 
  Shield, 
  Award,
  Users,
  Zap,
  TrendingUp,
  Gift,
  Clock,
  CheckCircle
} from 'lucide-react'

// Features da empresa
const heroFeatures = [
  {
    icon: Truck,
    title: 'Entrega Expressa',
    description: 'Receba em até 24h'
  },
  {
    icon: Shield,
    title: 'Garantia Oficial',
    description: 'Produtos originais'
  },
  {
    icon: Award,
    title: 'Melhor Preço',
    description: 'Garantimos o menor preço'
  },
  {
    icon: Users,
    title: 'Suporte 24/7',
    description: 'Atendimento especializado'
  }
]

// Marcas principais
const brands = [
  {
    id: 'apple',
    name: 'Apple',
    logo: '/Logos empresas/Apple.png',
    description: 'iPhone, MacBook, iPad, Apple Watch',
    color: 'from-gray-700 to-gray-900',
    textColor: 'text-white',
    href: '/products?brand=apple'
  },
  {
    id: 'xiaomi',
    name: 'Xiaomi',
    logo: '/Logos empresas/Xiomi Logo.png',
    description: 'Smartphones e acessórios premium',
    color: 'from-orange-500 to-orange-700',
    textColor: 'text-white',
    href: '/products?brand=xiaomi'
  },
  {
    id: 'jbl',
    name: 'JBL',
    logo: '/Logos empresas/JBL Logo.png',
    description: 'Speakers e fones de alta qualidade',
    color: 'from-blue-500 to-blue-700',
    textColor: 'text-white',
    href: '/products?brand=jbl'
  },
  {
    id: 'dji',
    name: 'DJI',
    logo: '/Logos empresas/Dji Logo.jpg',
    description: 'Drones e câmeras profissionais',
    color: 'from-gray-600 to-gray-800',
    textColor: 'text-white',
    href: '/products?brand=dji'
  },
  {
    id: 'geonav',
    name: 'Geonav',
    logo: '/Logos empresas/GeoNav.jpg',
    description: 'GPS e soluções de navegação',
    color: 'from-green-500 to-green-700',
    textColor: 'text-white',
    href: '/products?brand=geonav'
  }
]

// Seções de destaque
const highlightSections = [
  {
    title: 'Lançamentos',
    subtitle: 'Os produtos mais recentes',
    icon: TrendingUp,
    color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    href: '/lancamentos'
  },
  {
    title: 'Ofertas',
    subtitle: 'Descontos imperdíveis',
    icon: Gift,
    color: 'bg-gradient-to-r from-red-500 to-pink-500',
    href: '/ofertas'
  },
  {
    title: 'Novidades',
    subtitle: 'Últimas chegadas',
    icon: Clock,
    color: 'bg-gradient-to-r from-purple-500 to-indigo-500',
    href: '/novidades'
  }
]

export default function ModernHomePage() {
  const { products, loading } = useProducts()

  // Produtos filtrados
  const featuredProducts = products
    .filter(product => product.isNew || (product.originalPrice && product.originalPrice > product.price))
    .slice(0, 8)

  const newProducts = products
    .filter(product => product.isNew)
    .slice(0, 4)

  const saleProducts = products
    .filter(product => product.originalPrice && product.originalPrice > product.price)
    .slice(0, 4)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto" />
          <p className="text-gray-600 font-medium">Carregando produtos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />
          <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000" />
        </div>

        <div className="relative container mx-auto px-4 pt-32 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[70vh]">
            {/* Hero Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-6">
                <Badge className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-0 text-sm px-6 py-3 rounded-full">
                  <Zap className="w-4 h-4 mr-2" />
                  Loja Oficial USS Brasil
                </Badge>
                
                <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight">
                  Tecnologia
                  <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">
                    do Futuro
                  </span>
                  <span className="text-4xl md:text-5xl font-semibold text-gray-700">
                    Hoje Mesmo
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-xl">
                  Descubra os melhores produtos de tecnologia das marcas mais conceituadas do mundo. 
                  <span className="font-semibold text-gray-800"> Apple, Xiaomi, JBL, DJI e Geonav.</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  asChild
                >
                  <Link href="/products">
                    Ver Todos os Produtos
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-gray-300 hover:border-gray-400 px-8 py-6 text-lg rounded-xl transition-all duration-300"
                  asChild
                >
                  <Link href="/ofertas">
                    <Gift className="mr-2 w-5 h-5" />
                    Ver Ofertas
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-4 pt-8">
                {heroFeatures.map((feature, index) => {
                  const IconComponent = feature.icon
                  return (
                    <div key={index} className="flex items-center space-x-3 p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">{feature.title}</h3>
                        <p className="text-xs text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative animate-fade-in-delay">
              <div className="relative w-full h-96 lg:h-[500px]">
                {/* Product Showcase Cards */}
                <div className="absolute inset-0 grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <Card className="bg-gradient-to-br from-gray-900 to-gray-700 text-white p-6 rounded-2xl transform rotate-3 hover:rotate-6 transition-transform duration-500">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-lg backdrop-blur-sm">
                          <Image 
                            src="/Logos empresas/Apple.png" 
                            alt="Apple logo"
                            width={24}
                            height={24}
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold">iPhone 16 Pro</h3>
                          <p className="text-sm opacity-80">Titanium Series</p>
                        </div>
                      </div>
                    </Card>
                    <Card className="bg-gradient-to-br from-orange-500 to-orange-700 text-white p-6 rounded-2xl transform -rotate-2 hover:-rotate-1 transition-transform duration-500 mt-8">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-lg backdrop-blur-sm">
                          <Image 
                            src="/Logos empresas/Xiomi Logo.png" 
                            alt="Xiaomi logo"
                            width={24}
                            height={24}
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold">Xiaomi 14</h3>
                          <p className="text-sm opacity-80">Ultra Premium</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                  <div className="space-y-4 pt-8">
                    <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-2xl transform -rotate-3 hover:-rotate-6 transition-transform duration-500">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-lg backdrop-blur-sm">
                          <Image 
                            src="/Logos empresas/JBL Logo.png" 
                            alt="JBL logo"
                            width={24}
                            height={24}
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold">JBL Xtreme</h3>
                          <p className="text-sm opacity-80">Ultimate Sound</p>
                        </div>
                      </div>
                    </Card>
                    <Card className="bg-gradient-to-br from-gray-600 to-gray-800 text-white p-6 rounded-2xl transform rotate-2 hover:rotate-4 transition-transform duration-500">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-lg backdrop-blur-sm">
                          <Image 
                            src="/Logos empresas/Dji Logo.jpg" 
                            alt="DJI logo"
                            width={24}
                            height={24}
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold">DJI Mini 4</h3>
                          <p className="text-sm opacity-80">Pro Drone</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Nossas Marcas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trabalhamos com as melhores marcas do mercado para oferecer produtos de alta qualidade e tecnologia de ponta
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {brands.map((brand) => {
              return (
                <Link key={brand.id} href={brand.href}>
                  <Card className="group h-48 overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-105">
                    <CardContent className={`h-full p-6 bg-gradient-to-br ${brand.color} ${brand.textColor} flex flex-col justify-between relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-700" />
                      <div className="relative z-10">
                        <div className="w-12 h-12 mb-4 flex items-center justify-center bg-white/20 rounded-lg backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                          <Image 
                            src={brand.logo} 
                            alt={`${brand.name} logo`}
                            width={32}
                            height={32}
                            className="object-contain"
                          />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{brand.name}</h3>
                        <p className="text-sm opacity-90">{brand.description}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 self-end opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Highlight Sections */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlightSections.map((section, index) => {
              const IconComponent = section.icon
              return (
                <Link key={index} href={section.href}>
                  <Card className="group h-64 overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-105">
                    <CardContent className={`h-full p-8 ${section.color} text-white flex flex-col justify-center items-center text-center relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                      <div className="relative z-10 space-y-4">
                        <IconComponent className="w-16 h-16 mx-auto group-hover:scale-110 transition-transform duration-300" />
                        <h3 className="text-2xl font-bold">{section.title}</h3>
                        <p className="text-lg opacity-90">{section.subtitle}</p>
                        <ArrowRight className="w-6 h-6 mx-auto group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Produtos em Destaque
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Os produtos mais populares e com melhores avaliações da nossa loja
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <div key={product.id} className="animate-fade-in-up">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-xl transition-all duration-300"
                asChild
              >
                <Link href="/products">
                  Ver Todos os Produtos
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">
                Fique por Dentro das Novidades
              </h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Receba ofertas exclusivas, lançamentos e dicas dos melhores produtos direto no seu e-mail
              </p>
            </div>
            
            <form className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
              <div className="relative flex-1 w-full">
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="w-full px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-white/20 focus:outline-none transition-all duration-300"
                />
              </div>
              <Button className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105">
                Inscrever-se
              </Button>
            </form>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-blue-200">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Sem spam</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Descadastre quando quiser</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
