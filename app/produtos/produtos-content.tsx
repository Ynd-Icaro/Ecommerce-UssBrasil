"use client"

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Grid3X3, List, Star, ShoppingCart, Heart, ArrowUpDown, X } from 'lucide-react'
import { getAllProducts, getAllBrands, type Product as PMProduct, type Brand } from '@/lib/products-manager'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { slugifyCategory } from '@/lib/slugify'

interface LocalProduct extends PMProduct {
  totalReviews?: number
  createdAt?: string
}

const formatPrice = (price: number) => `R$ ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`

export default function ProdutosPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const { favorites, toggleFavorite } = useAuth()
  const [allProducts, setAllProducts] = useState<LocalProduct[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [selectedBrand, setSelectedBrand] = useState<string>(searchParams.get('brand') || '') // legado (única)
  const [selectedBrands, setSelectedBrands] = useState<string[]>(() => {
    const qp = searchParams.get('brands')
    return qp ? qp.split(',').filter(Boolean) : (selectedBrand ? [selectedBrand] : [])
  })
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || '')
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [loading, setLoading] = useState(true)
  // filtros avançados
  const [priceMin, setPriceMin] = useState<number | ''>('')
  const [priceMax, setPriceMax] = useState<number | ''>('')
  const [onlyDiscount, setOnlyDiscount] = useState(false)
  const [onlyFeatured, setOnlyFeatured] = useState(false)
  const [inStock, setInStock] = useState(false)
  const [minRating, setMinRating] = useState<number>(0)
  const [page, setPage] = useState<number>(Number(searchParams.get('page')||'1') || 1)
  const [perPage, setPerPage] = useState<number>(Number(searchParams.get('perPage')||'12') || 12)

  useEffect(() => {
    setLoading(true)
    const p = getAllProducts().map(p => ({
      ...p,
      totalReviews: Math.floor(Math.random() * 200) + 10,
      createdAt: new Date().toISOString()
    }))
    setAllProducts(p)
    setBrands(getAllBrands())
    setLoading(false)
  }, [])

  useEffect(() => {
    setSelectedBrand(searchParams.get('brand') || '')
    setSelectedCategory(searchParams.get('category') || '')
    setSearchTerm(searchParams.get('search') || '')
  setPage(Number(searchParams.get('page')||'1')||1)
  setPerPage(Number(searchParams.get('perPage')||'12')||12)
  }, [searchParams])

  // Atualiza selectedBrands se query mudar
  useEffect(()=>{
    const qp = searchParams.get('brands')
    if(qp){
      const arr = qp.split(',').filter(Boolean)
      setSelectedBrands(arr)
    }
  },[searchParams])

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    allProducts.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1 })
    return Object.entries(counts).map(([name, count]) => ({ name, count }))
  }, [allProducts])

  const filtered = useMemo(() => {
    let result = [...allProducts]
    const activeBrands = selectedBrands.length ? selectedBrands : (selectedBrand? [selectedBrand]: [])
    if (activeBrands.length) result = result.filter(p => activeBrands.includes(p.marca.toLowerCase()))
    if (selectedCategory) result = result.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase())
    if (searchTerm) {
      const s = searchTerm.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s) ||
        p.marca.toLowerCase().includes(s) ||
        p.category.toLowerCase().includes(s)
      )
    }
    if (priceMin !== '' ) result = result.filter(p => (p.discountPrice || p.price) >= Number(priceMin))
    if (priceMax !== '' ) result = result.filter(p => (p.discountPrice || p.price) <= Number(priceMax))
    if (onlyDiscount) result = result.filter(p => !!p.discountPrice)
    if (onlyFeatured) result = result.filter(p => p.featured)
    if (inStock) result = result.filter(p => p.stock > 0)
    if (minRating > 0) result = result.filter(p => (p.rating||0) >= minRating)
    result.sort((a,b) => {
      switch (sortBy) {
        case 'price-low': return (a.discountPrice || a.price) - (b.discountPrice || b.price)
        case 'price-high': return (b.discountPrice || b.price) - (a.discountPrice || a.price)
        case 'rating': return (b.rating || 0) - (a.rating || 0)
        case 'newest': return (new Date(b.createdAt||'').getTime() - new Date(a.createdAt||'').getTime())
        default: return a.name.localeCompare(b.name)
      }
    })
    return result
  }, [allProducts, selectedBrand, selectedBrands, selectedCategory, searchTerm, sortBy, priceMin, priceMax, onlyDiscount, onlyFeatured, inStock, minRating])

  // paginação
  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * perPage
  const paginated = filtered.slice(start, start + perPage)

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value); else params.delete(key)
  // reset de página ao alterar filtros (exceto page/perPage)
  if (key !== 'page' && key !== 'perPage') { params.delete('page'); setPage(1) }
    router.push(`/produtos?${params.toString()}`)
  }
  const handleBrand = (brand: string) => updateParam('brand', brand)
  const toggleMultiBrand = (brand:string) => {
    setSelectedBrands(prev => {
      const exists = prev.includes(brand)
      const next = exists ? prev.filter(b=>b!==brand) : [...prev, brand]
      const params = new URLSearchParams(searchParams.toString())
      if(next.length) params.set('brands', next.join(',')); else params.delete('brands')
      router.push(`/produtos?${params.toString()}`)
      return next
    })
  }
  const handleCategory = (cat: string) => updateParam('category', cat)
  const handleSearch = (term: string) => updateParam('search', term)
  const clearFilters = () => {
    setSelectedBrands([])
    setPriceMin('')
    setPriceMax('')
    setOnlyDiscount(false)
    setOnlyFeatured(false)
    setInStock(false)
    setMinRating(0)
    router.push('/produtos')
  }

  const changePage = (p:number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (p<=1) params.delete('page'); else params.set('page', String(p))
    router.push(`/produtos?${params.toString()}`)
  }
  const changePerPage = (pp:number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (pp!==12) params.set('perPage', String(pp)); else params.delete('perPage')
    params.delete('page')
    router.push(`/produtos?${params.toString()}`)
  }

  return (
    <div className="min-h-screen pt-24" style={{ background: 'var(--uss-bg)' }}>
      <div className="container mx-auto px-4 pb-12">
        <div className="mb-8 flex flex-wrap items-center gap-4 justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--uss-text-light)' }}>Produtos</h1>
            <p className="text-sm" style={{ color: 'var(--uss-text-secondary)' }}>{filtered.length} resultados</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <ArrowUpDown 
                className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2" 
                style={{ color: 'var(--uss-text-secondary)' }} 
              />
              <select 
                value={sortBy} 
                onChange={e=>setSortBy(e.target.value)} 
                className="pl-9 pr-3 py-2 border rounded-lg text-sm"
                style={{
                  background: 'var(--uss-bg-light)',
                  color: 'var(--uss-text-light)',
                  borderColor: 'var(--uss-border)'
                }}
              >
                <option value="name">Nome A-Z</option>
                <option value="price-low">Menor Preço</option>
                <option value="price-high">Maior Preço</option>
                <option value="rating">Melhor Avaliado</option>
                <option value="newest">Mais Recentes</option>
              </select>
            </div>
            <div className="flex border rounded-lg overflow-hidden" style={{ borderColor: 'var(--uss-border)' }}>
              <button 
                onClick={()=>setViewMode('grid')} 
                className="p-2 transition-colors"
                style={{
                  background: viewMode==='grid' ? 'var(--uss-primary)' : 'var(--uss-bg-light)',
                  color: viewMode==='grid' ? 'var(--uss-text)' : 'var(--uss-text-secondary)'
                }}
              >
                <Grid3X3 className="h-4 w-4"/>
              </button>
              <button 
                onClick={()=>setViewMode('list')} 
                className="p-2 transition-colors"
                style={{
                  background: viewMode==='list' ? 'var(--uss-primary)' : 'var(--uss-bg-light)',
                  color: viewMode==='list' ? 'var(--uss-text)' : 'var(--uss-text-secondary)'
                }}
              >
                <List className="h-4 w-4"/>
              </button>
            </div>
          </div>
        </div>

        <div 
          className="border rounded-xl p-4 mb-6 shadow-sm"
          style={{ 
            background: 'var(--uss-bg-light)',
            borderColor: 'var(--uss-border)'
          }}
        >
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <div className="flex-1 relative">
              <Search 
                className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2" 
                style={{ color: 'var(--uss-text-secondary)' }} 
              />
              <input 
                value={searchTerm} 
                onChange={e=>handleSearch(e.target.value)} 
                placeholder="Buscar..." 
                className="w-full pl-9 pr-4 py-2 rounded-lg border focus:ring-2 focus:border-transparent transition-all"
                style={{
                  background: 'var(--uss-bg)',
                  color: 'var(--uss-text-light)',
                  borderColor: 'var(--uss-border)',
                  '--tw-ring-color': 'var(--uss-primary)'
                } as React.CSSProperties}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {(selectedBrand || selectedBrands.length || selectedCategory || searchTerm || priceMin!=='' || priceMax!=='' || onlyDiscount || onlyFeatured || inStock || minRating>0) && (
                <button 
                  onClick={clearFilters} 
                  className="px-3 py-1 text-xs rounded-full border flex items-center gap-1 transition-colors hover:shadow-md"
                  style={{
                    background: 'var(--uss-error-bg)',
                    color: 'var(--uss-error)',
                    borderColor: 'var(--uss-error-alpha)'
                  }}
                >
                  <X className="h-3 w-3"/> Limpar
                </button>
              )}
              {selectedBrands.map(b => (
                <span 
                  key={b} 
                  className="px-3 py-1 text-xs rounded-full text-white font-semibold"
                  style={{ background: 'var(--uss-primary)' }}
                >
                  Marca: {b}
                </span>
              ))}
              {selectedCategory && (
                <span 
                  className="px-3 py-1 text-xs rounded-full text-white font-semibold"
                  style={{ background: 'var(--uss-secondary)' }}
                >
                  Categoria: {selectedCategory}
                </span>
              )}
              {searchTerm && (
                <span 
                  className="px-3 py-1 text-xs rounded-full"
                  style={{ 
                    background: 'var(--uss-surface)',
                    color: 'var(--uss-text-light)'
                  }}
                >
                  Busca: {searchTerm}
                </span>
              )}
              {(priceMin!=='' || priceMax!=='') && (
                <span 
                  className="px-3 py-1 text-xs rounded-full"
                  style={{ 
                    background: 'var(--uss-success-bg)',
                    color: 'var(--uss-success)'
                  }}
                >
                  Preço: {priceMin!==''?`≥ ${priceMin}`:''} {priceMax!==''?`≤ ${priceMax}`:''} 
                </span>
              )}
              {onlyDiscount && (
                <span 
                  className="px-3 py-1 text-xs rounded-full"
                  style={{ 
                    background: 'var(--uss-secondary-alpha)',
                    color: 'var(--uss-secondary)'
                  }}
                >
                  Descontos
                </span>
              )}
              {onlyFeatured && (
                <span 
                  className="px-3 py-1 text-xs rounded-full"
                  style={{ 
                    background: 'var(--uss-warning-bg)',
                    color: 'var(--uss-warning)'
                  }}
                >
                  Destaques
                </span>
              )}
              {inStock && (
                <span 
                  className="px-3 py-1 text-xs rounded-full"
                  style={{ 
                    background: 'var(--uss-success-bg)',
                    color: 'var(--uss-success)'
                  }}
                >
                  Em estoque
                </span>
              )}
              {minRating>0 && (
                <span 
                  className="px-3 py-1 text-xs rounded-full"
                  style={{ 
                    background: 'var(--uss-primary-alpha)',
                    color: 'var(--uss-primary)'
                  }}
                >
                  ≥ {minRating}★
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-72 space-y-8">
            <div 
              className="border rounded-xl p-5 shadow-sm space-y-4"
              style={{ 
                background: 'var(--uss-bg-light)',
                borderColor: 'var(--uss-border)'
              }}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold" style={{ color: 'var(--uss-text-light)' }}>Marcas</h3>
                {(selectedBrand || selectedBrands.length) && (
                  <button 
                    onClick={()=>{setSelectedBrand('');setSelectedBrands([]); const params=new URLSearchParams(searchParams.toString()); params.delete('brand'); params.delete('brands'); router.push(`/produtos?${params.toString()}`)}} 
                    className="text-xs hover:underline transition-colors"
                    style={{ color: 'var(--uss-primary)' }}
                  >
                    Limpar
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {brands.map(b => {
                  const active = selectedBrands.includes(b.slug) || selectedBrand===b.slug
                  return (
                    <button 
                      key={b.slug} 
                      onClick={()=>toggleMultiBrand(b.slug)} 
                      className="px-2 py-1 rounded-md text-[11px] border transition-all hover:shadow-sm"
                      style={{
                        background: active ? 'var(--uss-primary)' : 'var(--uss-bg)',
                        color: active ? 'var(--uss-text)' : 'var(--uss-text-light)',
                        borderColor: active ? 'var(--uss-primary)' : 'var(--uss-border)'
                      }}
                      onMouseEnter={(e) => {
                        if (!active) {
                          const target = e.target as HTMLElement;
                          target.style.background = 'var(--uss-surface)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!active) {
                          const target = e.target as HTMLElement;
                          target.style.background = 'var(--uss-bg)';
                        }
                      }}
                    >
                      {b.name}
                    </button>
                  )
                })}
              </div>
              <div className="pt-2 border-t" style={{ borderColor: 'var(--uss-border)' }}>
                <h4 className="text-xs font-semibold mb-2" style={{ color: 'var(--uss-text-secondary)' }}>Preço (R$)</h4>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    min={0} 
                    value={priceMin} 
                    placeholder="Min" 
                    onChange={e=>setPriceMin(e.target.value?Number(e.target.value):'')} 
                    className="w-1/2 px-2 py-1 text-xs border rounded transition-colors focus:ring-2 focus:border-transparent"
                    style={{
                      background: 'var(--uss-bg)',
                      color: 'var(--uss-text-light)',
                      borderColor: 'var(--uss-border)',
                      '--tw-ring-color': 'var(--uss-primary)'
                    } as React.CSSProperties}
                  />
                  <input 
                    type="number" 
                    min={0} 
                    value={priceMax} 
                    placeholder="Max" 
                    onChange={e=>setPriceMax(e.target.value?Number(e.target.value):'')} 
                    className="w-1/2 px-2 py-1 text-xs border rounded transition-colors focus:ring-2 focus:border-transparent"
                    style={{
                      background: 'var(--uss-bg)',
                      color: 'var(--uss-text-light)',
                      borderColor: 'var(--uss-border)',
                      '--tw-ring-color': 'var(--uss-primary)'
                    } as React.CSSProperties}
                  />
                </div>
              </div>
              <div className="grid gap-2 pt-2 border-t" style={{ borderColor: 'var(--uss-border)' }}>
                <label className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: 'var(--uss-text-light)' }}>
                  <input 
                    type="checkbox" 
                    checked={onlyDiscount} 
                    onChange={e=>setOnlyDiscount(e.target.checked)} 
                    className="rounded accent-uss-primary" 
                  />
                  Descontos
                </label>
                <label className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: 'var(--uss-text-light)' }}>
                  <input 
                    type="checkbox" 
                    checked={onlyFeatured} 
                    onChange={e=>setOnlyFeatured(e.target.checked)} 
                    className="rounded accent-uss-primary" 
                  />
                  Destaques
                </label>
                <label className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: 'var(--uss-text-light)' }}>
                  <input 
                    type="checkbox" 
                    checked={inStock} 
                    onChange={e=>setInStock(e.target.checked)} 
                    className="rounded accent-uss-primary" 
                  />
                  Em estoque
                </label>
                <div className="pt-2 border-t" style={{ borderColor: 'var(--uss-border)' }}>
                  <h4 className="text-xs font-semibold mb-1" style={{ color: 'var(--uss-text-secondary)' }}>Avaliação mínima</h4>
                  <select 
                    value={minRating} 
                    onChange={e=>setMinRating(Number(e.target.value))} 
                    className="w-full text-xs border rounded px-2 py-1 transition-colors focus:ring-2 focus:border-transparent"
                    style={{
                      background: 'var(--uss-bg)',
                      color: 'var(--uss-text-light)',
                      borderColor: 'var(--uss-border)',
                      '--tw-ring-color': 'var(--uss-primary)'
                    } as React.CSSProperties}
                  >
                    <option value={0}>Todas</option>
                    <option value={4.5}>4.5★+</option>
                    <option value={4}>4★+</option>
                    <option value={3.5}>3.5★+</option>
                    <option value={3}>3★+</option>
                  </select>
                </div>
              </div>
            </div>
            <div 
              className="border rounded-xl p-5 shadow-sm"
              style={{ 
                background: 'var(--uss-bg-light)',
                borderColor: 'var(--uss-border)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold" style={{ color: 'var(--uss-text-light)' }}>Categorias</h3>
                {selectedCategory && (
                  <button 
                    onClick={()=>handleCategory('')} 
                    className="text-xs hover:underline transition-colors"
                    style={{ color: 'var(--uss-primary)' }}
                  >
                    Limpar
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {categoryCounts.map(c => (
                  <button 
                    key={c.name} 
                    onClick={()=>handleCategory(c.name)} 
                    className="px-3 py-1 rounded-full text-xs border flex items-center gap-1 transition-all hover:shadow-sm"
                    style={{
                      background: selectedCategory===c.name ? 'var(--uss-secondary)' : 'var(--uss-bg)',
                      color: selectedCategory===c.name ? 'var(--uss-text)' : 'var(--uss-text-light)',
                      borderColor: selectedCategory===c.name ? 'var(--uss-secondary)' : 'var(--uss-border)'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedCategory !== c.name) {
                        const target = e.target as HTMLElement;
                        target.style.background = 'var(--uss-surface)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedCategory !== c.name) {
                        const target = e.target as HTMLElement;
                        target.style.background = 'var(--uss-bg)';
                      }
                    }}
                  >
                    <span>{c.name}</span>
                    <span 
                      className="px-1.5 py-0.5 text-[10px] rounded-full border"
                      style={{ 
                        background: 'var(--uss-surface)',
                        color: 'var(--uss-text-secondary)',
                        borderColor: 'var(--uss-border)'
                      }}
                    >
                      {c.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>
          <main className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({length:8}).map((_,i)=>(
                  <div 
                    key={i} 
                    className="h-72 border rounded-xl animate-pulse"
                    style={{ 
                      background: 'var(--uss-bg-light)',
                      borderColor: 'var(--uss-border)'
                    }}
                  />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div 
                className="text-center py-24 border rounded-xl"
                style={{ 
                  background: 'var(--uss-bg-light)',
                  borderColor: 'var(--uss-border)'
                }}
              >
                <p className="text-lg font-medium mb-2" style={{ color: 'var(--uss-text-light)' }}>Nenhum produto encontrado</p>
                <p className="text-sm mb-4" style={{ color: 'var(--uss-text-secondary)' }}>Ajuste os filtros ou redefina a busca.</p>
                <button 
                  onClick={clearFilters} 
                  className="px-4 py-2 rounded-lg transition-all hover:shadow-lg transform hover:-translate-y-0.5 font-semibold"
                  style={{ 
                    background: 'var(--uss-primary)',
                    color: 'var(--uss-text)'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.background = 'var(--uss-secondary)';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.background = 'var(--uss-primary)';
                  }}
                >
                  Redefinir
                </button>
              </div>
            ) : (
              <>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs" style={{ color: 'var(--uss-text-secondary)' }}>Mostrando {paginated.length} de {total} • Página {currentPage} / {totalPages}</p>
                <div className="flex items-center gap-2">
                  <select 
                    value={perPage} 
                    onChange={e=>changePerPage(Number(e.target.value))} 
                    className="text-xs border rounded px-2 py-1 transition-colors focus:ring-2 focus:border-transparent"
                    style={{
                      background: 'var(--uss-bg-light)',
                      color: 'var(--uss-text-light)',
                      borderColor: 'var(--uss-border)',
                      '--tw-ring-color': 'var(--uss-primary)'
                    } as React.CSSProperties}
                  >
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={36}>36</option>
                  </select>
                </div>
              </div>
              <div className={`grid gap-6 ${viewMode==='grid'?'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4':'grid-cols-1'}`}>
                {paginated.map(p => {
                  const isFav = favorites.includes(p.id)
                  const categorySlug = slugifyCategory(p.category)
                  return (
                  <motion.div key={p.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className={`bg-white border border-gray-200 rounded-xl group overflow-hidden hover:shadow-lg transition ${viewMode==='list'?'flex':''}`}>
                    <Link href={`/produtos/${categorySlug}/${p.id}`} className={viewMode==='list'?'flex w-full':'block'}>
                      <div className={`relative ${viewMode==='list'?'w-48 h-48':'aspect-square'} bg-gray-50 flex items-center justify-center overflow-hidden`}>
                        <Image src={p.image} alt={p.name} fill className="object-contain group-hover:scale-105 transition-transform duration-500" />
                        {p.discountPrice && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-semibold px-2 py-1 rounded-md">
                            -{Math.round(((p.price - (p.discountPrice||p.price)) / p.price) * 100)}%
                          </div>
                        )}
                        {p.featured && (
                          <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 text-[10px] font-semibold px-2 py-1 rounded-md">Destaque</div>
                        )}
                      </div>
                      <div className={`p-4 ${viewMode==='list'?'flex-1':''}`}>
                        <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:text-uss-primary transition-colors text-sm">{p.name}</h3>
                        <p className="text-[11px] uppercase tracking-wide text-gray-500 mb-2">{p.marca} • {p.category}</p>
                        <div className="flex items-center mb-2">
                          {Array.from({length:5}).map((_,i)=>(
                            <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(p.rating||0)?'text-yellow-400 fill-current':'text-gray-300'}`} />
                          ))}
                          <span className="ml-1 text-[11px] text-gray-500">({p.totalReviews})</span>
                        </div>
                        <div className="mb-3">
                          {p.discountPrice ? (
                            <>
                              <p className="text-sm font-bold text-uss-primary">{formatPrice(p.discountPrice)}</p>
                              <p className="text-[11px] text-gray-400 line-through">{formatPrice(p.price)}</p>
                            </>
                          ) : (
                            <p className="text-sm font-bold text-uss-primary">{formatPrice(p.price)}</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button type="button" onClick={(e)=>{e.preventDefault(); addToCart({ id: Number(p.id), name:p.name, price: p.discountPrice||p.price, image:p.image })}} className="flex-1 bg-uss-primary text-white text-xs py-2 rounded-md hover:bg-uss-secondary transition flex items-center justify-center gap-1"><ShoppingCart className="h-3.5 w-3.5"/>Adicionar</button>
                          <button type="button" onClick={(e)=>{e.preventDefault(); toggleFavorite(p.id)}} className={`p-2 border rounded-md text-gray-500 transition ${isFav? 'bg-red-50 border-red-300 text-red-600':'border-gray-200 hover:text-uss-primary hover:border-uss-primary'}`}><Heart className="h-3.5 w-3.5"/></button>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                  )})}
              </div>
              {totalPages>1 && (
                <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                  <button onClick={()=>changePage(Math.max(1,currentPage-1))} disabled={currentPage===1} className="px-3 py-1 text-xs border rounded disabled:opacity-40">Anterior</button>
                  {Array.from({length: totalPages}).slice(0,10).map((_,i)=>{
                    const pnum=i+1
                    return <button key={pnum} onClick={()=>changePage(pnum)} className={`px-3 py-1 text-xs rounded border ${pnum===currentPage? 'bg-uss-primary text-white border-uss-primary':'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}>{pnum}</button>
                  })}
                  {totalPages>10 && <span className="text-xs text-gray-500 px-2">...</span>}
                  <button onClick={()=>changePage(Math.min(totalPages,currentPage+1))} disabled={currentPage===totalPages} className="px-3 py-1 text-xs border rounded disabled:opacity-40">Próxima</button>
                </div>
              )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}