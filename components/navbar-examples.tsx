import ModernNavbar from '@/components/navbar-clean'
import { DEFAULT_NAVBAR_CONFIG, LANDING_NAVBAR_CONFIG, MOBILE_NAVBAR_CONFIG } from '@/components/navbar-config'

// Exemplo 1: Navbar padrão completo
export function DefaultNavbar() {
  return (
    <ModernNavbar 
      config={DEFAULT_NAVBAR_CONFIG}
      showBrandDropdown={true}
    />
  )
}

// Exemplo 2: Navbar para landing page
export function LandingNavbar() {
  return (
    <ModernNavbar 
      config={LANDING_NAVBAR_CONFIG}
      showBrandDropdown={false}
    />
  )
}

// Exemplo 3: Navbar mobile-first
export function MobileNavbar() {
  return (
    <ModernNavbar 
      config={MOBILE_NAVBAR_CONFIG}
      showBrandDropdown={true}
    />
  )
}

// Exemplo 4: Navbar customizado
export function CustomNavbar() {
  const customConfig = {
    logo: {
      image: '/icons/custom-logo.png',
      text: 'Custom Store',
      subtitle: 'Sua Loja Online',
      href: '/'
    },
    mainNavigation: [
      { label: 'Início', href: '/' },
      { label: 'Produtos', href: '/products' },
      { label: 'Blog', href: '/blog' },
      { label: 'Sobre Nós', href: '/about' },
      { label: 'Contato', href: '/contact' }
    ],
    searchConfig: {
      placeholder: 'Buscar na loja...',
      searchUrl: '/search'
    }
  }

  return (
    <ModernNavbar 
      config={customConfig}
      showBrandDropdown={false}
    />
  )
}

// Exemplo 5: Navbar com logo apenas texto
export function TextOnlyNavbar() {
  const textOnlyConfig = {
    logo: {
      text: 'USS Brasil',
      href: '/'
    },
    mainNavigation: [
      { label: 'Home', href: '/' },
      { label: 'Shop', href: '/products' },
      { label: 'Contact', href: '/contact' }
    ],
    searchConfig: {
      placeholder: 'Search...',
      searchUrl: '/search'
    }
  }

  return (
    <ModernNavbar 
      config={textOnlyConfig}
      showBrandDropdown={false}
    />
  )
}
