'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { SlidersHorizontal, Package } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { ProductCard } from '@/components/product/ProductCard'
import { BrandSidebar } from '@/components/brand/brandSidebar'

type Product = {
  id: string
  name: string
  price: number
  originalPrice?: number
  image?: string
  category: string
  rating: number
  reviews: number
  isNew?: boolean
  isExclusive?: boolean
  badge?: string
  flag?: string
}

const allProducts: Product[] = [] // Replace with actual products data

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [sortBy, setSortBy] = useState<string>('relevance')
  const [favorites, setFavorites] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter(product => {
      // Example filter logic
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.category)
      const matchesOrigin = selectedOrigins.length === 0 || selectedOrigins.includes(product.category)
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      return matchesSearch && matchesCategory && matchesBrand && matchesOrigin && matchesPrice
    })

    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'new':
        filtered.sort((a, b) => ((b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)))
        break
      default:
        // relevance - manter ordem original
        break
    }

    return filtered
  }, [searchTerm, selectedCategories, selectedBrands, selectedOrigins, priceRange, sortBy, allProducts])

  const toggleFavorite = (productId: string) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter((id: string) => id !== productId)
        : [...prev, productId]
    )
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Original USA': return 'bg-blue-500'
      case 'Original Apple': return 'bg-gray-800'
      case 'Global Edition': return 'bg-green-500'
      case 'Best Seller': return 'bg-yellow-500'
      case 'Pro Series': return 'bg-purple-500'
      case 'M4 Chip': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <Button variant="ghost" size="sm" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
            {viewMode === 'grid' ? <SlidersHorizontal className="h-4 w-4 mr-2" /> : <SlidersHorizontal className="h-4 w-4 mr-2" />}
            {viewMode === 'grid' ? 'Lista' : 'Grade'}
          </Button>
        </div>
        {/* Mobile Filter Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="lg:hidden">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
                <BrandSidebar onBrandFilter={() => {}} selectedBrand={null} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters (Desktop) */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white rounded-lg p-6 sticky top-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Filtros</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedCategories([])
                  setSelectedBrands([])
                  setSelectedOrigins([])
                  setPriceRange([0, 10000])
                }}
              >
                Limpar
              </Button>
            </div>
            <BrandSidebar onBrandFilter={() => {}} selectedBrand={null} />
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-gray-600">
              {filteredProducts.length} produtos encontrados
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  originalPrice={product.originalPrice ? product.originalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : undefined}
                  image={product.image || '/produtos/fallback-product.png'}
                  category={product.category}
                  rating={product.rating}
                  reviews={product.reviews}
                  isNew={product.isNew}
                  isFavorite={favorites.includes(product.id)}
                  onFavoriteToggle={toggleFavorite}
                  onAddToCart={() => { toast.success(`${product.name} adicionado ao carrinho!`) }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Package className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum produto encontrado
              </h3>
              <p className="text-gray-600">
                Tente ajustar os filtros ou termo de busca
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
