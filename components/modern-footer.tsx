'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FadeIn, SlideUp } from '@/components/animated-components'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Facebook, 
  Youtube, 
  Twitter,
  Shield,
  Truck,
  CreditCard,
  Award,
  Heart,
  ArrowUp
} from 'lucide-react'
import { useState, useEffect } from 'react'

const ModernFooter = () => {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Institucional',
      links: [
        { name: 'Sobre Nós', href: '/sobre' },
        { name: 'Nossa História', href: '/sobre#historia' },
        { name: 'Missão e Valores', href: '/sobre#valores' },
        { name: 'Trabalhe Conosco', href: '/carreiras' },
        { name: 'Imprensa', href: '/imprensa' },
      ]
    },
    {
      title: 'Produtos',
      links: [
        { name: 'Apple', href: '/products?brand=apple' },
        { name: 'JBL', href: '/products?brand=jbl' },
        { name: 'DJI', href: '/products?brand=dji' },
        { name: 'Xiaomi', href: '/products?brand=xiaomi' },
        { name: 'Geonav', href: '/products?brand=geonav' },
      ]
    },
    {
      title: 'Atendimento',
      links: [
        { name: 'Central de Ajuda', href: '/ajuda' },
        { name: 'Como Comprar', href: '/ajuda/como-comprar' },
        { name: 'Política de Troca', href: '/ajuda/trocas' },
        { name: 'Garantia', href: '/ajuda/garantia' },
        { name: 'Rastreamento', href: '/rastreamento' },
      ]
    },
    {
      title: 'Minha Conta',
      links: [
        { name: 'Login', href: '/login' },
        { name: 'Cadastro', href: '/register' },
        { name: 'Meus Pedidos', href: '/orders' },
        { name: 'Lista de Desejos', href: '/favorites' },
        { name: 'Área VIP', href: '/vip' },
      ]
    }
  ]

  const benefits = [
    {
      icon: <Truck className="h-8 w-8" />,
      title: 'Frete Grátis',
      description: 'Para todo o Brasil'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Compra Segura',
      description: 'Proteção SSL'
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: 'Parcelamento',
      description: 'Até 12x sem juros'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Produtos Originais',
      description: 'Garantia oficial'
    }
  ]

  const socialLinks = [
    {
      name: 'Instagram',
      icon: <Instagram className="h-5 w-5" />,
      href: 'https://instagram.com/ussbrasil',
      color: 'hover:text-pink-500'
    },
    {
      name: 'Facebook',
      icon: <Facebook className="h-5 w-5" />,
      href: 'https://facebook.com/ussbrasil',
      color: 'hover:text-blue-500'
    },
    {
      name: 'YouTube',
      icon: <Youtube className="h-5 w-5" />,
      href: 'https://youtube.com/ussbrasil',
      color: 'hover:text-red-500'
    },
    {
      name: 'Twitter',
      icon: <Twitter className="h-5 w-5" />,
      href: 'https://twitter.com/ussbrasil',
      color: 'hover:text-blue-400'
    }
  ]

  const paymentMethods = [
    '/icons/visa.png',
    '/icons/mastercard.png',
    '/icons/pix.png',
    '/icons/boleto.png',
    '/icons/paypal.png'
  ]

  const securitySeals = [
    '/icons/ssl.png',
    '/icons/google-safe.png',
    '/icons/ebit.png'
  ]

  return (
    <footer className="bg-uss-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-uss-secondary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-uss-primary rounded-full blur-3xl" />
      </div>

      {/* Benefits Section */}
      <div className="relative z-10 border-b border-uss-gray-700">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="text-center group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-cyan-400 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-400">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="relative z-10 border-b border-gray-700">
        <div className="container mx-auto px-4 py-12">
          <div
            className="max-w-4xl mx-auto text-center animate-fade-in"
          >
            <h2 className="text-3xl font-bold mb-4">
              Fique por Dentro das <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Novidades</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Receba ofertas exclusivas, lançamentos e dicas dos melhores produtos
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
              <div className="relative flex-1 w-full">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                />
              </div>
              <button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                Inscrever-se
              </button>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">
              Não enviamos spam. Seus dados estão seguros conosco.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <Link href="/" className="inline-block">
                <div className="text-2xl font-bold text-white">
                  USS Brasil
                </div>
              </Link>
              
              <p className="text-gray-400 leading-relaxed">
                USS Brasil é a sua loja de tecnologia premium. Oferecemos os melhores produtos 
                Apple, JBL, DJI, Xiaomi e Geonav com garantia oficial e entrega expressa.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-cyan-400" />
                  <a href="tel:+5511999999999" className="text-gray-400 hover:text-white transition-colors">
                    (11) 99999-9999
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-cyan-400" />
                  <a href="mailto:contato@ussbrasil.com.br" className="text-gray-400 hover:text-white transition-colors">
                    contato@ussbrasil.com.br
                  </a>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-cyan-400 mt-0.5" />
                  <span className="text-gray-400">
                    Av. Paulista, 1000 - Bela Vista<br />
                    São Paulo, SP - CEP: 01310-100
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div
                key={section.title}
                className="space-y-4 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-lg font-semibold text-white">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Methods & Security */}
      <div className="relative z-10 border-t border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            {/* Payment Methods */}
            <div className="text-center lg:text-left">
              <h4 className="text-sm font-medium text-gray-400 mb-3">
                Formas de Pagamento
              </h4>
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className="w-10 h-6 bg-white rounded flex items-center justify-center"
                  >
                    <div className="w-8 h-4 bg-gray-300 rounded text-xs flex items-center justify-center text-gray-600">
                      {index === 0 && 'V'}
                      {index === 1 && 'M'}
                      {index === 2 && 'PIX'}
                      {index === 3 && 'BOL'}
                      {index === 4 && 'PP'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Seals */}
            <div className="text-center lg:text-right">
              <h4 className="text-sm font-medium text-gray-400 mb-3">
                Segurança e Certificações
              </h4>
              <div className="flex items-center justify-center lg:justify-end space-x-3">
                {securitySeals.map((seal, index) => (
                  <div
                    key={index}
                    className="w-12 h-8 bg-white rounded flex items-center justify-center"
                  >
                    <div className="w-10 h-6 bg-gray-300 rounded text-xs flex items-center justify-center text-gray-600">
                      {index === 0 && 'SSL'}
                      {index === 1 && 'SAFE'}
                      {index === 2 && 'EBIT'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="relative z-10 border-t border-gray-700 bg-gray-900/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-400">
                © {currentYear} USS Brasil. Todos os direitos reservados.
              </p>
              <div className="flex items-center justify-center md:justify-start space-x-4 mt-2">
                <Link href="/politica-privacidade" className="text-xs text-gray-500 hover:text-cyan-400 transition-colors">
                  Política de Privacidade
                </Link>
                <span className="text-gray-700">•</span>
                <Link href="/termos-uso" className="text-xs text-gray-500 hover:text-cyan-400 transition-colors">
                  Termos de Uso
                </Link>
                <span className="text-gray-700">•</span>
                <Link href="/cookies" className="text-xs text-gray-500 hover:text-cyan-400 transition-colors">
                  Cookies
                </Link>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400 hidden sm:block">
                Siga-nos:
              </span>
              <div className="flex items-center space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 bg-gray-800 rounded-full text-gray-400 ${social.color} transition-all duration-300 hover:scale-110`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Made with Love */}
      <div className="relative z-10 bg-gradient-to-r from-blue-600 to-cyan-500">
        <div className="container mx-auto px-4 py-3">
          <p className="text-center text-sm text-white flex items-center justify-center space-x-1">
            <span>Feito com</span>
            <Heart className="h-4 w-4 text-red-400 fill-current animate-pulse" />
            <span>pela equipe USS Brasil</span>
          </p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-scale-in"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </footer>
  )
}

export default ModernFooter
