'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { HomeIcon, ShoppingBagIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Number */}
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-8xl font-bold uss-text-gradient mb-4"
          >
            404
          </motion.div>
          
          {/* Icon */}
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div className="p-4 bg-[var(--ussbrasil-primary)]/10 rounded-full">
              <ShoppingBagIcon className="w-16 h-16 text-[var(--ussbrasil-primary)]" />
            </div>
          </motion.div>
          
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
          >
            Produto não encontrado
          </motion.h1>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 dark:text-gray-400 mb-8"
          >
            O produto que você está procurando não existe ou foi removido do nosso catálogo.
          </motion.p>
          
          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="uss-button-primary inline-flex items-center justify-center space-x-2"
              >
                <HomeIcon className="w-5 h-5" />
                <span>Voltar ao Início</span>
              </Link>
              
              <Link
                href="/produtos"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 border border-[var(--ussbrasil-primary)] text-[var(--ussbrasil-primary)] rounded-lg hover:bg-[var(--ussbrasil-primary)] hover:text-white transition-colors font-semibold"
              >
                <ShoppingBagIcon className="w-5 h-5" />
                <span>Ver Produtos</span>
              </Link>
            </div>
            
            {/* Search Box */}
            <div className="mt-8">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Pesquisar produtos..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--ussbrasil-primary)] focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const query = (e.target as HTMLInputElement).value
                      if (query.trim()) {
                        window.location.href = `/produtos?q=${encodeURIComponent(query)}`
                      }
                    }
                  }}
                />
              </div>
            </div>
          </motion.div>
          
          {/* Popular Categories */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Categorias populares:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Apple', 'JBL', 'DJI', 'Xiaomi', 'Geonav'].map((category) => (
                <Link
                  key={category}
                  href={`/produtos?categoria=${category.toLowerCase()}`}
                  className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-[var(--ussbrasil-primary)] hover:text-white transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
