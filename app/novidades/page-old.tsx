'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Star,
  Zap,
  Gift
} from 'lucide-react'

const novidades = [
  {
    id: 1,
    title: 'iPhone 16 Pro',
    subtitle: 'Inteligência Apple para tudo.',
    description: 'O iPhone mais avançado de todos os tempos, com A18 Pro, Controle da Câmera e muito mais.',
    image: '/Produtos/Iphone 16 Pro.png',
    badge: 'Novo',
    price: 'A partir de R$ 10.499',
    href: '/product/iphone-16-pro',
    color: 'from-blue-600 to-purple-600'
  },
  {
    id: 2,
    title: 'iPhone 16',
    subtitle: 'Repleto de energia.',
    description: 'Desempenho incrível com o chip A18, nova Controle da Câmera e autonomia de bateria impressionante.',
    image: '/Produtos/Iphone 16.png',
    badge: 'Novo',
    price: 'A partir de R$ 7.999',
    href: '/product/iphone-16',
    color: 'from-pink-500 to-orange-500'
  },
  {
    id: 3,
    title: 'Apple Watch Series 10',
    subtitle: 'Mais fino. Mais inteligente.',
    description: 'A maior tela já criada para o Apple Watch, com recursos de saúde avançados.',
    image: '/Produtos/Watch Series 10.png',
    badge: 'Novo',
    price: 'A partir de R$ 4.699',
    href: '/product/apple-watch-series-10',
    color: 'from-emerald-500 to-blue-500'
  },
  {
    id: 4,
    title: 'AirPods 4',
    subtitle: 'Som icônico atualizado.',
    description: 'Design renovado com Cancelamento Ativo de Ruído e qualidade de áudio excepcional.',
    image: '/Produtos/acessorios/airpods-4-anc-select-202409.png',
    badge: 'Novo',
    price: 'A partir de R$ 1.499',
    href: '/product/airpods-4',
    color: 'from-gray-600 to-gray-800'
  }
]

const proximosLancamentos = [
  {
    id: 1,
    title: 'MacBook Air M4',
    description: 'Próxima geração do MacBook Air com chip M4.',
    estimativa: '2025',
    icon: '💻'
  },
  {
    id: 2,
    title: 'Apple Vision Pro 2',
    description: 'Evolução dos óculos de realidade mista da Apple.',
    estimativa: '2025',
    icon: '🥽'
  },
  {
    id: 3,
    title: 'iPhone SE 4',
    description: 'Nova versão do iPhone mais acessível da Apple.',
    estimativa: '2025',
    icon: '📱'
  }
]

export default function NovidadesPage() {
  const [selectedCategory, setSelectedCategory] = useState('todos')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-8 w-8 text-blue-600 mr-3" />
              <Badge variant="outline" className="px-4 py-2 text-lg font-semibold border-blue-200 text-blue-800">
                Novidades
              </Badge>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
              O que há de novo
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Descubra os últimos lançamentos e inovações da Apple. 
              Tecnologia de ponta que redefine o futuro.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Novidades Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Últimos Lançamentos
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Produtos revolucionários que acabaram de chegar ao mercado
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {novidades.map((produto, index) => (
              <motion.div
                key={produto.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-0">
                    <div className="relative h-80 bg-gradient-to-br from-gray-50 to-gray-100">
                      <div className="absolute top-4 left-4 z-10">
                        <Badge className={`bg-gradient-to-r ${produto.color} text-white border-0 px-3 py-1`}>
                          <Zap className="h-3 w-3 mr-1" />
                          {produto.badge}
                        </Badge>
                      </div>
                      <Image
                        src={produto.image}
                        alt={produto.title}
                        fill
                        className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {produto.title}
                      </h3>
                      <p className="text-lg font-medium text-blue-600 mb-3">
                        {produto.subtitle}
                      </p>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {produto.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-gray-900">
                          {produto.price}
                        </span>
                        <Link href={produto.href}>
                          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                            Ver produto
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Próximos Lançamentos */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <Clock className="h-8 w-8 text-white mr-3" />
              <Badge variant="outline" className="px-4 py-2 text-lg font-semibold border-white/20 text-white bg-white/10">
                Em breve
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Próximos Lançamentos
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Fique por dentro do que está por vir no universo Apple
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {proximosLancamentos.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="text-6xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      {item.description}
                    </p>
                    <Badge variant="outline" className="border-white/30 text-white bg-white/10">
                      <Gift className="h-3 w-3 mr-1" />
                      {item.estimativa}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Não perca nenhuma novidade
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Seja o primeiro a conhecer os novos produtos Apple. 
              Explore nossa coleção completa e encontre a tecnologia perfeita para você.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg">
                  <Star className="h-5 w-5 mr-2" />
                  Ver todos os produtos
                </Button>
              </Link>
              <Link href="/categories">
                <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg">
                  Explorar categorias
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
