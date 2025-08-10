'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
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
        { name: 'Imprensa', href: '/imprensa' },
        { name: 'Trabalhe Conosco', href: '/trabalhe-conosco' },
        { name: 'Termos de Uso', href: '/termos' },
        { name: 'Privacidade', href: '/privacidade' },
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
        { name: 'Central de Ajuda', href: '/central-ajuda' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Como Comprar', href: '/como-comprar' },
        { name: 'Política de Troca', href: '/politica-troca' },
        { name: 'Garantia', href: '/garantia' },
        { name: 'Rastreamento', href: '/rastreamento' },
      ]
    },
    {
      title: 'Minha Conta',
      links: [
        { name: 'Entrar', href: '/auth/login' },
        { name: 'Criar Conta', href: '/auth/registrar' },
        { name: 'Recuperar Acesso', href: '/auth/recuperar' },
        { name: 'Favoritos', href: '/favoritos' },
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

  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [newsletterMessage, setNewsletterMessage] = useState('')

  const subscribe = async () => {
    if(!newsletterEmail || newsletterStatus==='loading') return
    setNewsletterStatus('loading')
    setNewsletterMessage('')
    try {
      const res = await fetch('/api/newsletter', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email: newsletterEmail }) })
      if(res.ok){
        setNewsletterStatus('success')
        setNewsletterMessage('Inscrição realizada!')
        setNewsletterEmail('')
      } else {
        setNewsletterStatus('error')
        setNewsletterMessage('Falha ao inscrever')
      }
    } catch(e){
      setNewsletterStatus('error')
      setNewsletterMessage('Erro de conexão')
    } finally {
      setTimeout(()=>{ setNewsletterStatus('idle'); setNewsletterMessage('') }, 4000)
    }
  }

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
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-uss-primary rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-uss-secondary transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-uss-gray-400">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="relative z-10 border-b border-uss-gray-700">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-4">
              Fique por Dentro das <span className="text-gradient-uss bg-clip-text">Novidades</span>
            </h2>
            <p className="text-xl text-uss-gray-400 mb-8">
              Receba ofertas exclusivas, lançamentos e dicas dos melhores produtos
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
              <div className="relative flex-1 w-full">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-uss-gray-500 h-5 w-5" />
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  value={newsletterEmail}
                  onChange={e=>setNewsletterEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-uss-gray-800 border border-uss-gray-600 rounded-lg text-white placeholder-uss-gray-500 focus:ring-2 focus:ring-uss-secondary focus:border-transparent disabled:opacity-50"
                  disabled={newsletterStatus==='loading'}
                />
              </div>
              <button onClick={subscribe} disabled={newsletterStatus==='loading'} className="w-full sm:w-auto bg-gradient-uss-secondary hover:bg-gradient-uss-primary text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50">
                {newsletterStatus==='loading' ? 'Enviando...' : 'Inscrever-se'}
              </button>
            </div>
            
            <p className="text-sm text-uss-gray-500 mt-4 min-h-[1.25rem]">
              {newsletterMessage || 'Não enviamos spam. Seus dados estão seguros conosco.'}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <Link href="/" className="inline-block">
                <Image
                  src="/Empresa/02.png"
                  alt="USS Brasil"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </Link>
              
              <p className="text-uss-gray-400 leading-relaxed">
                USS Brasil é a sua loja de tecnologia premium. Oferecemos os melhores produtos 
                Apple, JBL, DJI, Xiaomi e Geonav com garantia oficial e entrega expressa.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-uss-secondary" />
                  <a href="tel:+5511999999999" className="text-uss-gray-400 hover:text-white transition-colors">
                    (11) 99999-9999
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-uss-secondary" />
                  <a href="mailto:contato@ussbrasil.com.br" className="text-uss-gray-400 hover:text-white transition-colors">
                    contato@ussbrasil.com.br
                  </a>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-uss-secondary mt-0.5" />
                  <span className="text-uss-gray-400">
                    Av. Paulista, 1000 - Bela Vista<br />
                    São Paulo, SP - CEP: 01310-100
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-white">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-uss-gray-400 hover:text-uss-secondary transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Methods & Security */}
      <div className="relative z-10 border-t border-uss-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            {/* Payment Methods */}
            <div className="text-center lg:text-left">
              <h4 className="text-sm font-medium text-uss-gray-400 mb-3">
                Formas de Pagamento
              </h4>
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className="w-10 h-6 bg-white rounded flex items-center justify-center"
                  >
                    <Image
                      src={method}
                      alt="Forma de pagamento"
                      width={32}
                      height={20}
                      className="object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Security Seals */}
            <div className="text-center lg:text-right">
              <h4 className="text-sm font-medium text-uss-gray-400 mb-3">
                Segurança e Certificações
              </h4>
              <div className="flex items-center justify-center lg:justify-end space-x-3">
                {securitySeals.map((seal, index) => (
                  <div
                    key={index}
                    className="w-12 h-8 bg-white rounded flex items-center justify-center"
                  >
                    <Image
                      src={seal}
                      alt="Certificação de segurança"
                      width={40}
                      height={28}
                      className="object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="relative z-10 border-t border-uss-gray-700 bg-uss-gray-900/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-sm text-uss-gray-400">
                © {currentYear} USS Brasil. Todos os direitos reservados.
              </p>
              <div className="flex items-center justify-center md:justify-start space-x-4 mt-2">
                <Link href="/privacidade" className="text-xs text-uss-gray-500 hover:text-uss-secondary transition-colors">
                  Política de Privacidade
                </Link>
                <span className="text-uss-gray-700">•</span>
                <Link href="/termos" className="text-xs text-uss-gray-500 hover:text-uss-secondary transition-colors">
                  Termos de Uso
                </Link>
                <span className="text-uss-gray-700">•</span>
                <Link href="/faq" className="text-xs text-uss-gray-500 hover:text-uss-secondary transition-colors">FAQ</Link>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-uss-gray-400 hidden sm:block">
                Siga-nos:
              </span>
              <div className="flex items-center space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 bg-uss-gray-800 rounded-full text-uss-gray-400 ${social.color} transition-all duration-300 hover:scale-110`}
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
      <div className="relative z-10 bg-gradient-uss-primary">
        <div className="container mx-auto px-4 py-3">
          <p className="text-center text-sm text-white flex items-center justify-center space-x-1">
            <span>Feito com</span>
            <Heart className="h-4 w-4 text-uss-secondary fill-current animate-pulse" />
            <span>pela equipe USS Brasil</span>
          </p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-uss-primary text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </footer>
  )
}

export default ModernFooter
