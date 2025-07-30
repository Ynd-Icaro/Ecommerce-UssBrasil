// ========== CONFIGURAÇÃO CENTRALIZADA DE PRODUTOS USS BRASIL ==========

export interface Product {
  [x: string]: number
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  categoria: string
  rating: number
  isNew: boolean
  description?: string
  specs?: string[]
  colors?: string[]
  storage?: string[]
  images: {
    main: string
    gallery?: string[]
  }
}

export interface Category {
  name: string
  slug: string
  description: string
  href: string
  video: string
  image: string
  gradient: string
  price: string
  icon: string
}

// ========== PRODUTOS POR CATEGORIA ==========

export const iPhoneProducts: Product[] = [
  {
    id: 1,
    name: 'iPhone 16 Pro',
    price: 10499,
    originalPrice: 11999,
    image: '/Imagens/Iphone-16-Pro.png',
    categoria: 'iPhone',
    rating: 5,
    isNew: true,
    description: 'iPhone 16 Pro. Forjado em titânio e equipado com o chip A18 Pro.',
    specs: ['Chip A18 Pro', 'Sistema de câmera Pro', 'Tela Super Retina XDR de 6,3"', 'Titânio'],
    colors: ['Titânio Natural', 'Titânio Azul', 'Titânio Branco', 'Titânio Preto'],
    storage: ['128GB', '256GB', '512GB', '1TB'],
    images: {
      main: '/Imagens/Iphone-16-Pro.png',
      gallery: [
        '/Imagens/Iphone 16/Iphone-16-Pro.png'
      ]
    }
  },
  {
    id: 2,
    name: 'iPhone 16',
    price: 7999,
    originalPrice: 8999,
    image: '/Imagens/Iphone-16.png',
    categoria: 'iPhone',
    rating: 5,
    isNew: true,
    description: 'iPhone 16. Vibrant. Capaz. Resistente.',
    specs: ['Chip A18', 'Sistema de câmera avançado', 'Tela Super Retina XDR de 6,1"', 'Alumínio'],
    colors: ['Azul', 'Verde', 'Rosa', 'Branco', 'Preto'],
    storage: ['128GB', '256GB', '512GB'],
    images: {
      main: '/Imagens/Iphone-16.png'
    }
  },
  {
    id: 3,
    name: 'iPhone 15',
    price: 6499,
    originalPrice: 7499,
    image: '/Imagens/Iphone 15/Normal x Plus/iphone-15-blue.png',
    categoria: 'iPhone',
    rating: 4,
    isNew: false,
    description: 'iPhone 15. Novo. Mais câmera. Mais Action. ',
    specs: ['Chip A16 Bionic', 'Sistema de câmera dupla', 'Tela Super Retina XDR de 6,1"', 'Alumínio'],
    colors: ['Azul', 'Rosa', 'Amarelo', 'Verde', 'Preto'],
    storage: ['128GB', '256GB', '512GB'],
    images: {
      main: '/Imagens/Iphone 15/Normal x Plus/iphone-15-blue.png'
    }
  }
]

export const macProducts: Product[] = [
  {
    id: 11,
    name: 'MacBook Pro 14"',
    price: 12999,
    originalPrice: 14999,
    image: '/Imagens/Macbook-Pro.png',
    categoria: 'Mac',
    rating: 5,
    isNew: true,
    description: 'MacBook Pro 14" com chip M3 Pro. Potência profissional.',
    specs: ['Chip M3 Pro', 'Tela Liquid Retina XDR 14"', 'Até 22h de bateria', 'Thunderbolt 4'],
    colors: ['Cinza Espacial', 'Prata'],
    storage: ['512GB', '1TB', '2TB', '4TB'],
    images: {
      main: '/Imagens/Macbook-Pro.png'
    }
  },
  {
    id: 12,
    name: 'MacBook Air 15"',
    price: 9999,
    originalPrice: 11499,
    image: '/Imagens/Macbook-Air.png',
    categoria: 'Mac',
    rating: 5,
    isNew: false,
    description: 'MacBook Air 15" com chip M2. Incrivelmente fino.',
    specs: ['Chip M2', 'Tela Liquid Retina 15"', 'Até 18h de bateria', 'MagSafe 3'],
    colors: ['Meia-noite', 'Luz Estelar', 'Prata', 'Cinza Espacial'],
    storage: ['256GB', '512GB', '1TB', '2TB'],
    images: {
      main: '/Imagens/Macbook-Air.png'
    }
  },
  {
    id: 13,
    name: 'iMac 24"',
    price: 8999,
    originalPrice: 9999,
    image: '/Imagens/iMac.png',
    categoria: 'Mac',
    rating: 5,
    isNew: false,
    description: 'iMac 24" com chip M3. Cores vibrantes.',
    specs: ['Chip M3', 'Tela Retina 4.5K 24"', 'Magic Keyboard incluído', 'Thunderbolt 4'],
    colors: ['Azul', 'Verde', 'Rosa', 'Prata', 'Amarelo', 'Laranja', 'Roxo'],
    storage: ['256GB', '512GB', '1TB', '2TB'],
    images: {
      main: '/Imagens/iMac.png'
    }
  }
]

export const iPadProducts: Product[] = [
  {
    id: 21,
    name: 'iPad Pro 12.9"',
    price: 8999,
    originalPrice: 9999,
    image: '/Imagens/Ipad-Pro.png',
    categoria: 'iPad',
    rating: 5,
    isNew: false,
    description: 'iPad Pro 12.9" com chip M2. Criatividade sem limites.',
    specs: ['Chip M2', 'Tela Liquid Retina XDR 12.9"', 'Compatível com Apple Pencil', 'Thunderbolt'],
    colors: ['Cinza Espacial', 'Prata'],
    storage: ['128GB', '256GB', '512GB', '1TB', '2TB'],
    images: {
      main: '/Imagens/Ipad-Pro.png'
    }
  },
  {
    id: 22,
    name: 'iPad Air',
    price: 4999,
    originalPrice: 5999,
    image: '/Imagens/Ipad-Air.png',
    categoria: 'iPad',
    rating: 5,
    isNew: false,
    description: 'iPad Air com chip M1. Sério poder. Leveza impressionante.',
    specs: ['Chip M1', 'Tela Liquid Retina 10.9"', 'Compatível com Apple Pencil', 'USB-C'],
    colors: ['Cinza Espacial', 'Rosa', 'Roxo', 'Azul', 'Luz Estelar'],
    storage: ['64GB', '256GB'],
    images: {
      main: '/Imagens/Ipad-Air.png'
    }
  },
  {
    id: 23,
    name: 'iPad',
    price: 2999,
    originalPrice: 3499,
    image: '/Imagens/Ipad.png',
    categoria: 'iPad',
    rating: 4,
    isNew: false,
    description: 'iPad com chip A14 Bionic. Versátil. Divertido. Acessível.',
    specs: ['Chip A14 Bionic', 'Tela Retina 10.9"', 'Compatível com Apple Pencil', 'USB-C'],
    colors: ['Azul', 'Rosa', 'Amarelo', 'Prata'],
    storage: ['64GB', '256GB'],
    images: {
      main: '/Imagens/Ipad.png'
    }
  }
]

export const watchProducts: Product[] = [
  {
    id: 31,
    name: 'Apple Watch Series 10',
    price: 3499,
    originalPrice: 3999,
    image: '/Imagens/Watch-Series-10.png',
    categoria: 'Watch',
    rating: 5,
    isNew: true,
    description: 'Apple Watch Series 10. Maior. Mais fino. Mais esperto.',
    specs: ['Chip S10', 'Tela mais ampla', 'Resistente à água até 50m', 'GPS + Cellular'],
    colors: ['Meia-noite', 'Rosa', 'Prata'],
    storage: ['42mm', '46mm'],
    images: {
      main: '/Imagens/Watch-Series-10.png'
    }
  },
  {
    id: 32,
    name: 'Apple Watch Ultra 2',
    price: 6999,
    originalPrice: 7999,
    image: '/Imagens/Watch-Ultra-2.png',
    categoria: 'Watch',
    rating: 5,
    isNew: false,
    description: 'Apple Watch Ultra 2. O mais resistente e capaz.',
    specs: ['Chip S9', 'Tela mais brilhante', 'Resistente até 100m', 'GPS de precisão dupla'],
    colors: ['Titânio Natural'],
    storage: ['49mm'],
    images: {
      main: '/Imagens/Watch-Ultra-2.png'
    }
  },
  {
    id: 33,
    name: 'Apple Watch SE',
    price: 2299,
    originalPrice: 2699,
    image: '/Imagens/Watch-SE.png',
    categoria: 'Watch',
    rating: 4,
    isNew: false,
    description: 'Apple Watch SE. Muitos recursos. Preço acessível.',
    specs: ['Chip S8', 'Detecção de acidente de carro', 'Resistente à água até 50m', 'GPS'],
    colors: ['Meia-noite', 'Luz Estelar', 'Prata'],
    storage: ['40mm', '44mm'],
    images: {
      main: '/Imagens/Watch-SE.png'
    }
  }
]

export const airpodsProducts: Product[] = [
  {
    id: 41,
    name: 'AirPods Max',
    price: 4299,
    originalPrice: 4999,
    image: '/Imagens/Air-Pods-Max.png',
    categoria: 'AirPods',
    rating: 5,
    isNew: false,
    description: 'AirPods Max. Som surpreendente. Design icônico.',
    specs: ['Cancelamento ativo de ruído', 'Áudio espacial', 'Chip H1', 'Até 20h de bateria'],
    colors: ['Cinza Espacial', 'Prata', 'Azul', 'Verde', 'Rosa'],
    images: {
      main: '/Imagens/Air-Pods-Max.png'
    }
  },
  {
    id: 42,
    name: 'AirPods Pro 2',
    price: 1999,
    originalPrice: 2299,
    image: '/Imagens/Air Pods Pro 2',
    categoria: 'AirPods',
    rating: 5,
    isNew: false,
    description: 'AirPods Pro 2ª geração. Som mais rico. Cancelamento mais inteligente.',
    specs: ['Cancelamento ativo de ruído', 'Modo transparência', 'Chip H2', 'Até 6h de bateria'],
    colors: ['Branco'],
    images: {
      main: '/Imagens/Air Pods Pro 2'
    }
  },
  {
    id: 43,
    name: 'AirPods 4',
    price: 1099,
    originalPrice: 1299,
    image: '/Imagens/Air Pods 4',
    categoria: 'AirPods',
    rating: 4,
    isNew: true,
    description: 'AirPods 4ª geração. Som personalizado para você.',
    specs: ['Áudio espacial personalizado', 'Chip H2', 'Até 5h de bateria', 'Resistente ao suor'],
    colors: ['Branco'],
    images: {
      main: '/Imagens/Air Pods 4'
    }
  }
]

export const acessoriosProducts: Product[] = [
  {
    id: 51,
    name: 'Studio Display',
    price: 12999,
    originalPrice: 14999,
    image: '/Imagens/Studio-Display.png',
    categoria: 'Acessórios',
    rating: 5,
    isNew: false,
    description: 'Studio Display. Tela 5K retina de 27 polegadas.',
    specs: ['Tela 5K Retina 27"', 'Camera Center Stage', 'Áudio espacial', 'Thunderbolt 3'],
    colors: ['Prata'],
    images: {
      main: '/Imagens/Studio-Display.png'
    }
  },
  {
    id: 52,
    name: 'Pro Display XDR',
    price: 39999,
    originalPrice: 44999,
    image: '/Imagens/Pro-Display.png',
    categoria: 'Acessórios',
    rating: 5,
    isNew: false,
    description: 'Pro Display XDR. Tela 6K retina de 32 polegadas.',
    specs: ['Tela 6K Retina 32"', 'Brilho extremo', 'Precisão de cor profissional', 'Thunderbolt 3'],
    colors: ['Prata'],
    images: {
      main: '/Imagens/Pro-Display.png'
    }
  }
]

// ========== TODOS OS PRODUTOS ==========
export const allProducts: Product[] = [
  ...iPhoneProducts,
  ...macProducts,
  ...iPadProducts,
  ...watchProducts,
  ...airpodsProducts,
  ...acessoriosProducts
]

// ========== PRODUTOS EM DESTAQUE ==========
export const featuredProducts: Product[] = [
  iPhoneProducts[0], // iPhone 16 Pro
  macProducts[0],    // MacBook Pro 14"
  iPadProducts[0],   // iPad Pro 12.9"
  watchProducts[0]   // Apple Watch Series 10
]

// ========== HELPER FUNCTIONS ==========
export const getProductsByCategory = (category: string): Product[] => {
  switch (category.toLowerCase()) {
    case 'iphone':
      return iPhoneProducts
    case 'mac':
      return macProducts
    case 'ipad':
      return iPadProducts
    case 'watch':
      return watchProducts
    case 'airpods':
      return airpodsProducts
    case 'acessorios':
      return acessoriosProducts
    default:
      return []
  }
}

export const getProductById = (id: number): Product | undefined => {
  return allProducts.find(product => product.id === id)
}

export const searchProducts = (query: string): Product[] => {
  const searchTerm = query.toLowerCase()
  return allProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.categoria.toLowerCase().includes(searchTerm) ||
    product.description?.toLowerCase().includes(searchTerm)
  )
}
