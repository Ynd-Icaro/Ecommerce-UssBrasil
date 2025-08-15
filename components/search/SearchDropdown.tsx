'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Tag, Building2, Package } from 'lucide-react'

interface Product {
  id: string
  name: string
  price: number
  discountPrice?: number
  category: string
  brand?: string
  image: string
}

interface SearchDropdownProps {
  isOpen: boolean
  searchQuery: string
  products: Product[]
  categories: string[]
  brands: string[]
  isSearching: boolean
  onClose: () => void
  onSearch: (query: string) => void
}

export default function SearchDropdown({
  isOpen,
  searchQuery,
  products,
  categories,
  brands,
  isSearching,
  onClose,
  onSearch
}: SearchDropdownProps) {
  if (!isOpen || !searchQuery.trim()) return null

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-xl z-50 mt-2 max-h-96 overflow-hidden"
      >
        {isSearching ? (
          <div className="p-4 text-center">
            <div className="animate-spin w-6 h-6 border-2 border-[#1ea7ff] border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-2 text-gray-600 text-sm">Buscando...</p>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {/* Ver todos os resultados */}
            <div className="p-3 border-b border-gray-100">
              <button
                onClick={() => onSearch(searchQuery)}
                className="w-full flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg text-left transition-colors"
              >
                <Search className="w-4 h-4 text-[#1ea7ff]" />
                <span className="text-sm">
                  Ver todos os resultados para "<strong>{searchQuery}</strong>"
                </span>
              </button>
            </div>

            {/* Produtos */}
            {products.length > 0 && (
              <div className="p-3">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 flex items-center">
                  <Package className="w-3 h-3 mr-1" />
                  Produtos ({products.length})
                </h3>
                <div className="space-y-1">
                  {products.slice(0, 4).map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      onClick={onClose}
                      className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {product.name}
                        </p>
                        <div className="flex items-center space-x-2">
                          {product.discountPrice ? (
                            <>
                              <span className="text-sm font-semibold text-[#1ea7ff]">
                                {formatPrice(product.discountPrice)}
                              </span>
                              <span className="text-xs text-gray-500 line-through">
                                {formatPrice(product.price)}
                              </span>
                            </>
                          ) : (
                            <span className="text-sm font-semibold text-gray-900">
                              {formatPrice(product.price)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Categorias */}
            {categories.length > 0 && (
              <div className="p-3 border-t border-gray-100">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 flex items-center">
                  <Tag className="w-3 h-3 mr-1" />
                  Categorias
                </h3>
                <div className="space-y-1">
                  {categories.slice(0, 3).map((category) => (
                    <Link
                      key={category}
                      href={`/categories/${encodeURIComponent(category.toLowerCase())}`}
                      onClick={onClose}
                      className="block p-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span className="text-sm text-gray-700">{category}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Marcas */}
            {brands.length > 0 && (
              <div className="p-3 border-t border-gray-100">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 flex items-center">
                  <Building2 className="w-3 h-3 mr-1" />
                  Marcas
                </h3>
                <div className="space-y-1">
                  {brands.slice(0, 3).map((brand) => (
                    <button
                      key={brand}
                      onClick={() => onSearch(brand)}
                      className="block w-full text-left p-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span className="text-sm text-gray-700">{brand}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Nenhum resultado */}
            {products.length === 0 && categories.length === 0 && brands.length === 0 && (
              <div className="p-6 text-center">
                <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">
                  Nenhum resultado encontrado para "{searchQuery}"
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Tente termos diferentes ou verifique a ortografia
                </p>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
