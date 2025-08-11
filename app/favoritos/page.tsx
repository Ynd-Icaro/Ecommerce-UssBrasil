'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Heart, Home, ArrowLeft } from 'lucide-react'

export default function FavoritosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Heart className="w-24 h-24 text-[#034a6e] mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-[#034a6e] mb-4">
            Meus Favoritos
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#034a6e] to-[#54c4cf] mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            Aqui você poderá visualizar e gerenciar todos os seus produtos favoritos.
          </p>
          <p className="text-slate-500">
            Esta funcionalidade estará disponível em breve!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/"
            className="group bg-[#034a6e] text-white px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-[#023a5a] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Home className="w-5 h-5" />
            Voltar ao Início
          </Link>
          
          <Link
            href="/produtos"
            className="group bg-white text-[#034a6e] px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-slate-50 transition-all duration-300 shadow-lg hover:shadow-xl border border-slate-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Ver Produtos
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
