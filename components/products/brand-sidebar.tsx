'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { brands, darkAnimations, darkComponents } from '@/lib/design-system'
import { X } from 'lucide-react'

interface BrandSidebarProps {
  onBrandFilter: (brandId: string | null) => void
  selectedBrand: string | null
}

interface BrandPreviewCardProps {
  brand: typeof brands[0]
  isVisible: boolean
  onClose: () => void
}

const BrandPreviewCard: React.FC<BrandPreviewCardProps> = ({ brand, isVisible, onClose }) => {
  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: -20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -20, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute left-full top-0 ml-4 w-80 bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-xl shadow-2xl z-50 p-6"
    >
      {/* Header do card */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-600 font-semibold text-sm">{brand.name[0]}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{brand.name}</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Grid de produtos */}
      <div className="grid grid-cols-2 gap-3">
        {brand.products.map((product, index) => (
          <motion.div
            key={`${brand.id}-${index}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-2 relative">
              <Image
                src={product.images?.main && product.images.main.startsWith('/products/') ? product.images.main : `/products/${product.images?.main?.replace(/^\/+/, '')}`}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
            <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors line-clamp-2">
              {product.name}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Botão ver todos */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
      >
        Ver todos os produtos {brand.name}
      </motion.button>
    </motion.div>
  )
}

export const BrandSidebar: React.FC<BrandSidebarProps> = ({ onBrandFilter, selectedBrand }) => {
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null)
  const [previewBrand, setPreviewBrand] = useState<typeof brands[0] | null>(null)

  const handleBrandHover = (brand: typeof brands[0]) => {
    setHoveredBrand(brand.id)
    setPreviewBrand(brand)
  }

  const handleBrandLeave = () => {
    setHoveredBrand(null)
    // Delay para permitir hover no card de preview
    setTimeout(() => {
      if (!hoveredBrand) {
        setPreviewBrand(null)
      }
    }, 200)
  }

  const handleBrandClick = (brandId: string) => {
    onBrandFilter(selectedBrand === brandId ? null : brandId)
    setPreviewBrand(null)
  }

  return (
    <div className="relative">
      {/* Sidebar principal */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="w-64 bg-[#1a1a1a] border border-[#333] rounded-lg p-6 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto"
      >
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">Marcas</h2>
          <p className="text-sm text-gray-400">Filtrar por marca</p>
        </div>

        {/* Botão "Todas as marcas" */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onBrandFilter(null)}
          className={`w-full text-left p-3 rounded-lg transition-all duration-300 mb-4 ${
            selectedBrand === null
              ? 'bg-[#20b2aa] text-white'
              : 'bg-[#333] text-gray-300 hover:bg-[#444] hover:text-white'
          }`}
        >
          <span className="font-medium">Todas as marcas</span>
        </motion.button>

        {/* Lista de marcas */}
        <div className="space-y-2">
          {brands.map((brand, index) => (
            <div key={brand.id} className="relative">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => handleBrandHover(brand)}
                onMouseLeave={handleBrandLeave}
                onClick={() => handleBrandClick(brand.id)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                  selectedBrand === brand.id
                    ? 'bg-[#20b2aa] text-white shadow-lg'
                    : 'bg-[#333] text-gray-300 hover:bg-[#444] hover:text-white hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">{brand.name[0]}</span>
                  </div>
                  <div>
                    <span className="font-medium">{brand.name}</span>
                    <p className="text-xs opacity-70">{brand.products.length} produtos</p>
                  </div>
                </div>
              </motion.button>

              {/* Card de preview */}
              <AnimatePresence>
                {previewBrand && previewBrand.id === brand.id && (
                  <BrandPreviewCard
                    brand={brand}
                    isVisible={true}
                    onClose={() => setPreviewBrand(null)}
                  />
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Footer da sidebar */}
        <div className="mt-8 pt-6 border-t border-[#333]">
          <p className="text-xs text-gray-500 text-center">
            {brands.length} marcas disponíveis
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default BrandSidebar
