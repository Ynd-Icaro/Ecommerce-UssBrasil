'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

export default function USSFooter() {
  const footerLinks = {
    produtos: [
      { name: 'Smartphones', href: '/categorias/smartphones' },
      { name: 'Notebooks', href: '/categorias/notebooks' },
      { name: 'Tablets', href: '/categorias/tablets' },
      { name: 'Áudio', href: '/categorias/audio' },
      { name: 'Drones', href: '/categorias/drones' },
      { name: 'Smart Home', href: '/categorias/smart-home' }
    ],
    marcas: [
      { name: 'Apple', href: '/marcas/apple' },
      { name: 'Samsung', href: '/marcas/samsung' },
      { name: 'DJI', href: '/marcas/dji' },
      { name: 'JBL', href: '/marcas/jbl' },
      { name: 'Sony', href: '/marcas/sony' },
      { name: 'Xiaomi', href: '/marcas/xiaomi' }
    ],
    suporte: [
      { name: 'Central de Ajuda', href: '/suporte' },
      { name: 'Política de Troca', href: '/politica-troca' },
      { name: 'Garantia', href: '/garantia' },
      { name: 'Entrega', href: '/entrega' },
      { name: 'Pagamento', href: '/pagamento' },
      { name: 'FAQ', href: '/faq' }
    ],
    empresa: [
      { name: 'Sobre Nós', href: '/sobre' },
      { name: 'Contato', href: '/contato' },
      { name: 'Trabalhe Conosco', href: '/trabalhe-conosco' },
      { name: 'Imprensa', href: '/imprensa' },
      { name: 'Investidores', href: '/investidores' },
      { name: 'Sustentabilidade', href: '/sustentabilidade' }
    ]
  }

  const socialMedia = [
    { name: 'Instagram', href: 'https://instagram.com/ussbrasil', icon: '📷' },
    { name: 'YouTube', href: 'https://youtube.com/ussbrasil', icon: '📺' },
    { name: 'WhatsApp', href: 'https://wa.me/5511999999999', icon: '💬' },
    { name: 'Facebook', href: 'https://facebook.com/ussbrasil', icon: '📘' }
  ]

  const paymentMethods = [
    { name: 'PIX', icon: '🏦' },
    { name: 'Cartão', icon: '💳' },
    { name: 'Boleto', icon: '📄' },
    { name: 'PayPal', icon: '🅿️' }
  ]

  return (
    <footer className="bg-uss-petrol text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Fique por dentro das novidades
            </h3>
            <p className="text-gray-300 mb-6">
              Receba ofertas exclusivas, lançamentos e conteúdo premium direto no seu e-mail
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-3 rounded-uss bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-uss-turquoise"
              />
              <button className="px-6 py-3 bg-uss-turquoise hover:bg-uss-turquoise/90 text-white font-semibold rounded-uss transition-colors">
                Inscrever
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-uss-turquoise mb-2">
                USS Brasil
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                Importados premium com qualidade, garantia e entrega rápida para todo o Brasil.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <PhoneIcon className="w-4 h-4 text-uss-turquoise" />
                <span>(11) 9 9999-9999</span>
              </div>
              <div className="flex items-center gap-2">
                <EnvelopeIcon className="w-4 h-4 text-uss-turquoise" />
                <span>contato@ussbrasil.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPinIcon className="w-4 h-4 text-uss-turquoise mt-0.5" />
                <span>São Paulo, SP<br />Brasil</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4 text-uss-turquoise" />
                <span>Seg-Sex: 9h-18h</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-uss-turquoise">
              Produtos
            </h3>
            <ul className="space-y-2">
              {footerLinks.produtos.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-uss-turquoise">
              Marcas
            </h3>
            <ul className="space-y-2">
              {footerLinks.marcas.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-uss-turquoise">
              Suporte
            </h3>
            <ul className="space-y-2">
              {footerLinks.suporte.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-uss-turquoise">
              Empresa
            </h3>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Payment */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            
            {/* Social Media */}
            <div>
              <h4 className="font-semibold mb-3 text-center lg:text-left">
                Siga-nos
              </h4>
              <div className="flex gap-4">
                {socialMedia.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 hover:bg-uss-turquoise rounded-full flex items-center justify-center transition-colors"
                    title={social.name}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h4 className="font-semibold mb-3 text-center lg:text-right">
                Formas de Pagamento
              </h4>
              <div className="flex gap-2">
                {paymentMethods.map((method) => (
                  <div
                    key={method.name}
                    className="w-12 h-8 bg-white/10 rounded flex items-center justify-center"
                    title={method.name}
                  >
                    <span className="text-sm">{method.icon}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div>
              © 2025 USS Brasil. Todos os direitos reservados.
            </div>
            <div className="flex gap-6">
              <Link href="/privacidade" className="hover:text-white transition-colors">
                Política de Privacidade
              </Link>
              <Link href="/termos" className="hover:text-white transition-colors">
                Termos de Uso
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
