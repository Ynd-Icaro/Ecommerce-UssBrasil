'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, Search, Package, ArrowLeft, HelpCircle, Mail } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-9xl font-bold text-[#034a6e] mb-4">404</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#034a6e] to-[#54c4cf] mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Página não encontrada
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Oops! A página que você está procurando não existe ou foi movida. 
            Que tal explorar nossos produtos incríveis?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-4 mb-12"
        >
          <Link
            href="/"
            className="group bg-[#034a6e] text-white px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-[#023a5a] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Home className="w-5 h-5" />
            Voltar ao Início
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/produtos"
            className="group bg-white text-[#034a6e] px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-slate-50 transition-all duration-300 shadow-lg hover:shadow-xl border border-slate-200"
          >
            <Package className="w-5 h-5" />
            Ver Produtos
            <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100 mb-8"
        >
          <h3 className="text-xl font-semibold text-slate-800 mb-6">
            Categorias Populares
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Eletrônicos', href: '/produtos/categoria/eletronicos' },
              { name: 'Roupas', href: '/produtos/categoria/roupas' },
              { name: 'Casa', href: '/produtos/categoria/casa' },
              { name: 'Esportes', href: '/produtos/categoria/esportes' }
            ].map((category, index) => (
              <Link
                key={category.name}
                href={category.href}
                className="group p-4 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50 hover:from-[#034a6e] hover:to-[#54c4cf] transition-all duration-300 border border-slate-200 hover:border-transparent"
              >
                <div className="text-sm font-medium text-slate-700 group-hover:text-white transition-colors">
                  {category.name}
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 text-slate-600"
        >
          <Link
            href="/faq"
            className="flex items-center gap-2 hover:text-[#034a6e] transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            Central de Ajuda
          </Link>
          <Link
            href="/contato"
            className="flex items-center gap-2 hover:text-[#034a6e] transition-colors"
          >
            <Mail className="w-4 h-4" />
            Fale Conosco
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
