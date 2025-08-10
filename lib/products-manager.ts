// Sistema de gerenciamento de produtos
// Trabalha com dados do db.json em ambiente cliente

import productsData from '@/db.json'

// Interfaces
export interface Product {
  id: string
  name: string
  description: string
  price: number
  discountPrice?: number
  image: string
  images?: string[]
  video?: string
  marca: string
  category: string
  stock: number
  featured: boolean
  rating: number
  specifications?: Record<string, any>
}

export interface Category {
  slug: string
  name: string
  description?: string
  marca: string
}

export interface Brand {
  slug: string
  name: string
  description?: string
  categories: Category[]
}

// Cache para melhor performance
let cachedProducts: Product[] | null = null
let cachedBrands: Brand[] | null = null
let productsVersion = 0

// Função para obter todos os produtos
export function getAllProducts(): Product[] {
  if (cachedProducts) return cachedProducts

  try {
    // Converter dados do db.json para o formato esperado
    const products: Product[] = productsData.products.map((produto: any) => ({
      id: produto.id,
      name: produto.name,
      description: produto.description,
      price: produto.price,
      discountPrice: produto.discountPrice,
      image: produto.image,
      images: produto.images,
      video: produto.video,
      marca: produto.brand.toLowerCase(),
      category: produto.category,
      stock: produto.stock || 10,
      featured: produto.featured || false,
      rating: produto.rating || 4.5,
      specifications: produto.specifications || {}
    }))

    cachedProducts = products
    return products
  } catch (error) {
    console.error('Erro ao carregar produtos:', error)
    return []
  }
}

// Decrementar estoque (imutável no JSON fonte, apenas em memória)
export function decrementStock(productId: string, quantity: number) {
  if (!cachedProducts) getAllProducts()
  if (!cachedProducts) return
  const p = cachedProducts.find(p=>p.id===productId)
  if (p) {
    p.stock = Math.max(0, p.stock - quantity)
    productsVersion++
  }
}

// Expor versão para possíveis re-renders
export function getProductsVersion(){ return productsVersion }

// Função para obter todas as marcas e categorias
export function getAllBrands(): Brand[] {
  if (cachedBrands) return cachedBrands

  try {
    const products = getAllProducts()
    const brandsMap = new Map<string, Brand>()

    // Agrupar produtos por marca
    products.forEach(product => {
      const brandSlug = product.marca
      const brandName = product.marca.charAt(0).toUpperCase() + product.marca.slice(1)

      if (!brandsMap.has(brandSlug)) {
        brandsMap.set(brandSlug, {
          slug: brandSlug,
          name: brandName,
          categories: []
        })
      }

      const brand = brandsMap.get(brandSlug)!
      const existingCategory = brand.categories.find(cat => cat.slug === product.category)

      if (!existingCategory) {
        brand.categories.push({
          slug: product.category,
          name: product.category.charAt(0).toUpperCase() + product.category.slice(1).replace(/[-_]/g, ' '),
          marca: brandSlug
        })
      }
    })

    cachedBrands = Array.from(brandsMap.values())
    return cachedBrands
  } catch (error) {
    console.error('Erro ao carregar marcas:', error)
    return []
  }
}

// Função para obter produtos por categoria
export function getProductsByCategory(categorySlug: string): Product[] {
  const products = getAllProducts()
  return products.filter(product => product.category === categorySlug)
}

// Função para obter produtos por marca
export function getProductsByBrand(brandSlug: string): Product[] {
  const products = getAllProducts()
  return products.filter(product => product.marca === brandSlug)
}

// Função para obter um produto específico
export function getProductById(productId: string): Product | null {
  const products = getAllProducts()
  return products.find(product => product.id === productId) || null
}

// Função para buscar produtos
export function searchProducts(query: string): Product[] {
  const products = getAllProducts()
  const searchTerm = query.toLowerCase()

  return products.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.marca.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  )
}

// Função para obter produtos em destaque
export function getFeaturedProducts(): Product[] {
  const products = getAllProducts()
  return products.filter(product => product.featured)
}

// Função para obter produtos relacionados (mesmo marca ou categoria)
export function getRelatedProducts(productId: string, categorySlug: string): Product[] {
  const products = getAllProducts()
  const currentProduct = getProductById(productId)
  
  if (!currentProduct) return []

  return products
    .filter(product => 
      product.id !== productId && 
      (product.marca === currentProduct.marca || product.category === categorySlug)
    )
    .slice(0, 8)
}

// Função para obter estatísticas dos produtos
export function getProductStats() {
  const products = getAllProducts()
  const brands = getAllBrands()

  return {
    totalProducts: products.length,
    totalBrands: brands.length,
    totalCategories: brands.reduce((acc, brand) => acc + brand.categories.length, 0),
    featuredProducts: products.filter(p => p.featured).length,
    averagePrice: products.reduce((acc, p) => acc + (p.discountPrice || p.price), 0) / products.length
  }
}
