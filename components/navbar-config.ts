export interface NavigationLink {
  label: string
  href: string
  icon?: string
  external?: boolean
}

export interface LogoConfig {
  image?: string
  text: string
  subtitle?: string
  href: string
}

export interface SearchConfig {
  placeholder: string
  searchUrl: string
}

export interface NavbarConfig {
  logo: LogoConfig
  mainNavigation: NavigationLink[]
  searchConfig: SearchConfig
}

// Configuração padrão do navbar
export const DEFAULT_NAVBAR_CONFIG: NavbarConfig = {
  logo: {
    text: 'USS Brasil',
    subtitle: 'Tecnologia & Inovação',
    href: '/'
  },
  mainNavigation: [
    { label: 'Todos os Produtos', href: '/products' },
    { label: 'Vídeos', href: '/videos' },
    { label: 'Lançamentos', href: '/lancamentos' },
    { label: 'Novidades', href: '/novidades' },
    { label: 'Ofertas', href: '/ofertas' },
    { label: 'Contato', href: '/contato' }
  ],
  searchConfig: {
    placeholder: 'Buscar produtos...',
    searchUrl: '/search'
  }
}

// Configuração alternativa para landing pages
export const LANDING_NAVBAR_CONFIG: NavbarConfig = {
  logo: {
    text: 'USS Brasil',
    href: '/'
  },
  mainNavigation: [
    { label: 'Produtos', href: '/products' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Contato', href: '/contato' }
  ],
  searchConfig: {
    placeholder: 'Buscar...',
    searchUrl: '/search'
  }
}

// Configuração para mobile-first
export const MOBILE_NAVBAR_CONFIG: NavbarConfig = {
  logo: {
    text: 'USS',
    href: '/'
  },
  mainNavigation: [
    { label: 'Produtos', href: '/products' },
    { label: 'Ofertas', href: '/ofertas' },
    { label: 'Contato', href: '/contato' }
  ],
  searchConfig: {
    placeholder: 'Buscar produtos...',
    searchUrl: '/search'
  }
}
