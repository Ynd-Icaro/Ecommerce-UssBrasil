'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Crown, 
  Star, 
  Gift, 
  Truck, 
  Clock, 
  Shield, 
  Users, 
  Zap,
  ArrowRight,
  CheckCircle,
  Timer,
  TrendingUp,
  Award,
  Heart,
  ShoppingBag
} from 'lucide-react'

// Import dos dados
import data from '@/db.json'
import EnhancedProductCard from '@/components/product/enhanced-product-card'

// Função para ajustar caminhos das imagens
const fixPath = (path: string) => {
  if (!path) return ''
  if (path.startsWith('Ecommerce-UssBrasil/public/')) {
    return `/${path.replace('Ecommerce-UssBrasil/public/', '')}`
  }
  return path
}

const products = data.products.map((p: any) => ({
  ...p,
  image: fixPath(p.image),
  images: p.images?.map(fixPath) || [fixPath(p.image)],
  reviews: p.reviews || { average: 0, count: 0 }
}))

// Produtos VIP (produtos mais caros e com desconto)
const vipProducts = products
  .filter(p => p.price > 5000 || p.featured)
  .sort((a, b) => b.price - a.price)
  .slice(0, 6)

// Produtos com tempo limitado
const limitedProducts = products
  .filter(p => p.discountPrice && p.discountPrice < p.price)
  .slice(0, 4)

export default function VIPPage() {
  const [isVipMember, setIsVipMember] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  })

  // Countdown timer para ofertas limitadas
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const vipBenefits = [
    {
      icon: <Truck className="h-8 w-8" />,
      title: 'Frete Grátis Ilimitado',
      description: 'Entrega expressa gratuita em todas as suas compras, sem valor mínimo'
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Acesso Antecipado',
      description: 'Seja o primeiro a comprar lançamentos e ofertas especiais'
    },
    {
      icon: <Gift className="h-8 w-8" />,
      title: 'Descontos Exclusivos',
      description: 'Até 25% OFF em produtos selecionados + ofertas mensais'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Atendimento Prioritário',
      description: 'Suporte especializado 24/7 com linha direta VIP'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Garantia Estendida',
      description: 'Garantia adicional de 12 meses em todos os produtos'
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Eventos Exclusivos',
      description: 'Convites para lançamentos e eventos premium da USS Brasil'
    }
  ]

  return (
    <div 
      className="min-h-screen"
      style={{ background: 'var(--uss-bg-gradient)' }}
    >
      {/* Hero Section VIP */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, var(--uss-secondary-alpha), transparent)' }}
          />
          <div 
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{ background: 'var(--uss-secondary-alpha)' }}
          />
          <div 
            className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{ background: 'var(--uss-primary-alpha)' }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
            style={{ color: 'var(--uss-text)' }}
          >
            {/* Crown Icon */}
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-8"
              style={{ background: 'var(--uss-gradient-primary)' }}
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Crown className="h-10 w-10" style={{ color: 'var(--uss-text)' }} />
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              Área <span 
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'var(--uss-gradient-primary)' }}
              >VIP</span>
            </h1>
            
            <p className="text-2xl md:text-3xl mb-8" style={{ color: 'var(--uss-text-light)' }}>
              Experiência Exclusiva & Benefícios Premium
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
              {!isVipMember ? (
                <>
                  <motion.button
                    className="font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                    style={{
                      background: 'var(--uss-gradient-primary)',
                      color: 'var(--uss-text)'
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsVipMember(true)}
                  >
                    Tornar-se VIP Agora
                  </motion.button>
                  <Link
                    href="#benefits"
                    className="border-2 font-semibold px-8 py-4 rounded-xl transition-all duration-300"
                    style={{
                      borderColor: 'var(--uss-secondary)',
                      color: 'var(--uss-secondary)'
                    }}
                    onMouseEnter={(e) => {
                      const target = e.target as HTMLElement;
                      target.style.background = 'var(--uss-secondary)';
                      target.style.color = 'var(--uss-text)';
                    }}
                    onMouseLeave={(e) => {
                      const target = e.target as HTMLElement;
                      target.style.background = 'transparent';
                      target.style.color = 'var(--uss-secondary)';
                    }}
                  >
                    Ver Benefícios
                  </Link>
                </>
              ) : (
                <div 
                  className="backdrop-blur-sm border rounded-xl p-6"
                  style={{
                    background: 'var(--uss-primary-alpha)',
                    borderColor: 'var(--uss-primary)'
                  }}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <Crown className="h-6 w-6" style={{ color: 'var(--uss-primary)' }} />
                    <span className="font-semibold" style={{ color: 'var(--uss-primary)' }}>Status: VIP ATIVO</span>
                  </div>
                  <p style={{ color: 'var(--uss-text-light)' }}>Bem-vindo de volta! Aproveite seus benefícios exclusivos.</p>
                </div>
              )}
            </div>

            {/* Stats VIP */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { label: 'Membros VIP', value: '2.5K+' },
                { label: 'Economia Média', value: 'R$ 1.2K' },
                { label: 'Produtos Exclusivos', value: '150+' },
                { label: 'Satisfação', value: '99.8%' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="backdrop-blur-sm rounded-lg p-4"
                  style={{ background: 'var(--uss-surface-alpha)' }}
                >
                  <div className="text-2xl font-bold" style={{ color: 'var(--uss-secondary)' }}>{stat.value}</div>
                  <div className="text-sm" style={{ color: 'var(--uss-text-light)' }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ofertas Limitadas VIP */}
      <section className="py-16" style={{ background: 'var(--uss-surface-alpha)' }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div 
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-4"
              style={{
                background: 'var(--uss-secondary-alpha)',
                color: 'var(--uss-secondary)'
              }}
            >
              <Timer className="h-4 w-4" />
              <span className="font-semibold">OFERTA LIMITADA</span>
            </div>
            
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--uss-text)' }}>
              Produtos <span 
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'var(--uss-gradient-primary)' }}
              >Exclusivos VIP</span>
            </h2>
            
            {/* Countdown Timer */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span style={{ color: 'var(--uss-text)' }}>Termina em:</span>
              <div className="flex items-center space-x-2">
                {[
                  { value: timeLeft.hours, label: 'Horas' },
                  { value: timeLeft.minutes, label: 'Min' },
                  { value: timeLeft.seconds, label: 'Seg' }
                ].map((time, index) => (
                  <div key={time.label} className="flex items-center">
                    <div 
                      className="px-3 py-2 rounded-lg font-bold min-w-[50px]"
                      style={{
                        background: 'var(--uss-secondary)',
                        color: 'var(--uss-text)'
                      }}
                    >
                      {time.value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs ml-1" style={{ color: 'var(--uss-text-secondary)' }}>{time.label}</div>
                    {index < 2 && <span className="mx-2" style={{ color: 'var(--uss-text-secondary)' }}>:</span>}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {limitedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Badge VIP Exclusivo */}
                <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-uss-warning to-uss-secondary text-uss-gray-900 px-2 py-1 rounded-md text-xs font-bold">
                  🔥 VIP ONLY
                </div>
                <EnhancedProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios VIP */}
      <section id="benefits" className="py-16" style={{ background: 'var(--uss-bg)' }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--uss-text-light)' }}>
              Benefícios <span 
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'var(--uss-gradient-primary)' }}
              >Exclusivos</span>
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--uss-text-secondary)' }}>
              Descubra todas as vantagens de ser um membro VIP da USS Brasil
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vipBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border overflow-hidden"
                style={{
                  background: 'var(--uss-bg-light)',
                  borderColor: 'var(--uss-border)'
                }}
              >
                {/* Background Gradient */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'var(--uss-gradient-light)' }}
                />
                
                <div className="relative z-10">
                  <div 
                    className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: 'var(--uss-gradient-primary)',
                      color: 'var(--uss-text)'
                    }}
                  >
                    {benefit.icon}
                  </div>
                  
                  <h3 
                    className="text-xl font-semibold mb-3 transition-colors"
                    style={{ color: 'var(--uss-text-light)' }}
                  >
                    {benefit.title}
                  </h3>
                  
                  <p style={{ color: 'var(--uss-text-secondary)' }}>
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Produtos Premium VIP */}
      <section className="py-16 bg-uss-off-white dark:bg-uss-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-uss-gray-900 dark:text-white mb-4">
              Coleção <span className="text-transparent bg-clip-text bg-gradient-to-r from-uss-warning to-uss-secondary">Premium</span>
            </h2>
            <p className="text-xl text-uss-gray-600 dark:text-uss-gray-400 max-w-2xl mx-auto">
              Os produtos mais exclusivos e cobiçados, disponíveis apenas para membros VIP
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vipProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Badge Premium */}
                <div className="absolute top-2 right-2 z-10 bg-uss-gray-900 text-uss-warning px-2 py-1 rounded-md text-xs font-bold flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-current" />
                  <span>PREMIUM</span>
                </div>
                <EnhancedProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              href="/products?vip=true"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-uss-warning to-uss-secondary text-uss-gray-900 font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <span>Ver Toda Coleção VIP</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Histórico e Pontos VIP */}
      {isVipMember && (
        <section className="py-16" style={{ background: 'var(--uss-gradient-primary)' }}>
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="backdrop-blur-sm rounded-2xl p-8 border"
              style={{
                background: 'var(--uss-surface-alpha)',
                borderColor: 'var(--uss-border-light)'
              }}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--uss-text)' }}>
                  Seu Dashboard VIP
                </h2>
                <p style={{ color: 'var(--uss-text-light)' }}>
                  Acompanhe seus benefícios e histórico exclusivo
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Pontos VIP */}
                <div className="rounded-xl p-6 text-center" style={{ background: 'var(--uss-surface-alpha)' }}>
                  <Award className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--uss-primary)' }} />
                  <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--uss-text)' }}>2.540</h3>
                  <p style={{ color: 'var(--uss-text-light)' }}>Pontos VIP</p>
                </div>

                {/* Economia Total */}
                <div className="rounded-xl p-6 text-center" style={{ background: 'var(--uss-surface-alpha)' }}>
                  <TrendingUp className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--uss-secondary)' }} />
                  <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--uss-text)' }}>R$ 3.240</h3>
                  <p style={{ color: 'var(--uss-text-light)' }}>Economia Total</p>
                </div>

                {/* Compras VIP */}
                <div className="rounded-xl p-6 text-center" style={{ background: 'var(--uss-surface-alpha)' }}>
                  <ShoppingBag className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--uss-primary)' }} />
                  <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--uss-text)' }}>12</h3>
                  <p style={{ color: 'var(--uss-text-light)' }}>Compras VIP</p>
                </div>
              </div>

              <div className="flex items-center justify-center mt-8">
                <Link
                  href="/profile/vip"
                  className="font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                  style={{
                    background: 'var(--uss-secondary)',
                    color: 'var(--uss-text)'
                  }}
                >
                  Gerenciar Plano VIP
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Call to Action Final */}
      {!isVipMember && (
        <section className="py-16" style={{ background: 'var(--uss-bg-gradient)' }}>
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
              style={{ color: 'var(--uss-text)' }}
            >
              <Crown className="h-16 w-16 mx-auto mb-6" style={{ color: 'var(--uss-primary)' }} />
              <h2 className="text-4xl font-bold mb-4">
                Pronto para a Experiência VIP?
              </h2>
              <p className="text-xl mb-8" style={{ color: 'var(--uss-text-light)' }}>
                Junte-se aos milhares de clientes que já descobriram o que é ser tratado como realeza
              </p>
              
              <div 
                className="backdrop-blur-sm rounded-xl p-6 mb-8"
                style={{ background: 'var(--uss-surface-alpha)' }}
              >
                <div className="flex items-center justify-center space-x-8 text-center">
                  <div>
                    <div className="text-2xl font-bold" style={{ color: 'var(--uss-secondary)' }}>R$ 49,90</div>
                    <div className="text-sm" style={{ color: 'var(--uss-text-light)' }}>por mês</div>
                  </div>
                  <div style={{ color: 'var(--uss-text-secondary)' }}>ou</div>
                  <div>
                    <div className="text-2xl font-bold" style={{ color: 'var(--uss-primary)' }}>R$ 399,90</div>
                    <div className="text-sm" style={{ color: 'var(--uss-text-light)' }}>por ano (33% OFF)</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <motion.button
                  className="font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                  style={{
                    background: 'var(--uss-gradient-primary)',
                    color: 'var(--uss-text)'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsVipMember(true)}
                >
                  Assinar Plano VIP
                </motion.button>
                <Link
                  href="/contato"
                  className="border-2 border-uss-secondary text-uss-secondary font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:bg-uss-secondary hover:text-white"
                >
                  Falar com Consultor
                </Link>
              </div>

              <p className="text-sm text-uss-gray-400 mt-6">
                Cancele quando quiser. Sem taxas ocultas. Satisfação garantida.
              </p>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  )
}
