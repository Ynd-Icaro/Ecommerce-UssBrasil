// ============================================================================
// HOOK DE NAVEGAÇÃO - GERENCIAMENTO DE ESTADO
// ============================================================================

'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

// ========== TIPOS ==========
interface NavigationState {
  isScrolled: boolean
  isMobileMenuOpen: boolean
  searchQuery: string
  cartItemsCount: number
  isSearchFocused: boolean
}

interface NavigationActions {
  setMobileMenuOpen: (open: boolean) => void
  setSearchQuery: (query: string) => void
  setSearchFocused: (focused: boolean) => void
  handleSearch: (query: string) => void
  toggleMobileMenu: () => void
}

// ========== HOOK PRINCIPAL ==========
export function useNavigation(): NavigationState & NavigationActions {
  const router = useRouter()
  const pathname = usePathname()
  
  const [state, setState] = useState<NavigationState>({
    isScrolled: false,
    isMobileMenuOpen: false,
    searchQuery: '',
    cartItemsCount: 0, // Será integrado com o estado global do carrinho
    isSearchFocused: false
  })

  // Detectar scroll para mudança de estilo da navbar
  useEffect(() => {
    const handleScroll = () => {
      setState(prev => ({
        ...prev,
        isScrolled: window.scrollY > 50
      }))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fechar menu mobile ao mudar de rota
  useEffect(() => {
    setState(prev => ({
      ...prev,
      isMobileMenuOpen: false
    }))
  }, [pathname])

  // Carregar contagem do carrinho (mock por enquanto)
  useEffect(() => {
    // TODO: Integrar com contexto do carrinho
    setState(prev => ({
      ...prev,
      cartItemsCount: 3 // Mock value
    }))
  }, [])

  // ========== AÇÕES ==========
  const setMobileMenuOpen = (open: boolean) => {
    setState(prev => ({ ...prev, isMobileMenuOpen: open }))
  }

  const setSearchQuery = (query: string) => {
    setState(prev => ({ ...prev, searchQuery: query }))
  }

  const setSearchFocused = (focused: boolean) => {
    setState(prev => ({ ...prev, isSearchFocused: focused }))
  }

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const toggleMobileMenu = () => {
    setState(prev => ({ ...prev, isMobileMenuOpen: !prev.isMobileMenuOpen }))
  }

  return {
    ...state,
    setMobileMenuOpen,
    setSearchQuery,
    setSearchFocused,
    handleSearch,
    toggleMobileMenu
  }
}

// ========== HOOK DE CATEGORIAS ==========
export function useNavigationCategories() {
  const categories = [
    {
      id: 'iphones',
      name: 'iPhone',
      href: '/categories/iphones',
      icon: 'Smartphone',
      featured: true,
      description: 'iPhone 16 Pro com chip A18 Pro',
      image: '/Imagens/Iphone-16-Pro.png'
    },
    {
      id: 'ipads',
      name: 'iPad',
      href: '/categories/ipads',
      icon: 'Tablet',
      description: 'iPad Pro com chip M4',
      image: '/Imagens/Ipad-Pro.png'
    },
    {
      id: 'macs',
      name: 'Mac',
      href: '/categories/macs',
      icon: 'Monitor',
      description: 'MacBook e iMac com chip M3',
      image: '/Imagens/Macbook-Pro.png'
    },
    {
      id: 'watches',
      name: 'Apple Watch',
      href: '/categories/watches',
      icon: 'Watch',
      description: 'Series 10 e Ultra 2',
      image: '/Imagens/Watch-Series-10.png'
    },
    {
      id: 'airpods',
      name: 'AirPods',
      href: '/categories/airpods',
      icon: 'Headphones',
      description: 'AirPods 4 e Pro 2',
      image: '/Imagens/Air Pods Pro 2'
    }
  ]

  const quickLinks = [
    { 
      name: 'Produtos', 
      href: '/products', 
      color: 'default'
    },
    { 
      name: 'Categorias', 
      href: '/categories', 
      color: 'default'
    },
    { 
      name: 'Novidades', 
      href: '/novidades', 
      badge: 'Novo',
      color: 'blue'
    },
    { 
      name: 'Ofertas', 
      href: '/ofertas', 
      badge: 'Sale',
      color: 'red'
    }
  ]

  return {
    categories,
    quickLinks
  }
}

// ========== HOOK DE BUSCA ==========
export function useNavigationSearch() {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getSuggestions = async (query: string) => {
    if (query.length < 2) {
      setSuggestions([])
      return
    }

    setIsLoading(true)
    
    // Mock de sugestões - implementar com API real depois
    const mockSuggestions = [
      'iPhone 16 Pro',
      'MacBook Pro M3',
      'iPad Air',
      'Apple Watch Series 10',
      'AirPods Pro 2'
    ].filter(item => 
      item.toLowerCase().includes(query.toLowerCase())
    )

    // Simular delay da API
    setTimeout(() => {
      setSuggestions(mockSuggestions)
      setIsLoading(false)
    }, 200)
  }

  return {
    suggestions,
    isLoading,
    getSuggestions
  }
}
