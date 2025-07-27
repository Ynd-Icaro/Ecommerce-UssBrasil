// Categorias de Produtos Importados Premium
export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  subcategory: string
  brand: string
  origin: string
  flag: string
  features: string[]
  rating: number
  reviews: number
  stock: number
  badge?: string
  isNew?: boolean
  isExclusive?: boolean
}

export interface Category {
  id: string
  name: string
  icon: string
  description: string
  subcategories: Subcategory[]
  color: string
  gradient: string
}

export interface Subcategory {
  id: string
  name: string
  description: string
  products: Product[]
}

export const premiumCategories: Category[] = [
  {
    id: 'tech-innovation',
    name: 'Tecnologia & Inovação',
    icon: '🚀',
    description: 'Dispositivos de última geração importados diretamente dos EUA e Ásia',
    color: 'blue',
    gradient: 'from-blue-500 to-purple-600',
    subcategories: [
      {
        id: 'smartphones',
        name: 'Smartphones Importados',
        description: 'Os melhores smartphones do mundo com garantia internacional',
        products: [
          {
            id: 'iphone-15-pro-max',
            name: 'iPhone 15 Pro Max',
            description: 'Original dos EUA com chip A17 Pro e câmera profissional',
            price: 8999,
            originalPrice: 9999,
            image: '/Imagens/Iphone 16 Pro.png',
            category: 'tech-innovation',
            subcategory: 'smartphones',
            brand: 'Apple',
            origin: 'EUA',
            flag: '🇺🇸',
            features: ['Chip A17 Pro', 'Titanium', 'Camera 48MP', '5G mmWave'],
            rating: 4.9,
            reviews: 2847,
            stock: 25,
            badge: 'Original USA',
            isNew: true,
            isExclusive: true
          },
          {
            id: 'xiaomi-14-ultra',
            name: 'Xiaomi 14 Ultra',
            description: 'Edição Global com Leica Camera System',
            price: 4299,
            originalPrice: 4799,
            image: '/icons/smartphone.svg',
            category: 'tech-innovation',
            subcategory: 'smartphones',
            brand: 'Xiaomi',
            origin: 'China',
            flag: '🇨🇳',
            features: ['Snapdragon 8 Gen 3', 'Leica Camera', '120W Fast Charge'],
            rating: 4.7,
            reviews: 1523,
            stock: 18,
            badge: 'Global Edition'
          },
          {
            id: 'oneplus-12',
            name: 'OnePlus 12',
            description: 'Alta performance com OxygenOS e carregamento superveloce',
            price: 3799,
            originalPrice: 4199,
            image: '/icons/smartphone.svg',
            category: 'tech-innovation',
            subcategory: 'smartphones',
            brand: 'OnePlus',
            origin: 'China',
            flag: '🇨🇳',
            features: ['Snapdragon 8 Gen 3', 'OxygenOS 14', '100W SuperVOOC'],
            rating: 4.6,
            reviews: 987,
            stock: 12
          }
        ]
      },
      {
        id: 'smartwatches',
        name: 'Smartwatches',
        description: 'Relógios inteligentes premium com tecnologia avançada',
        products: [
          {
            id: 'apple-watch-series-9',
            name: 'Apple Watch Series 9',
            description: 'O smartwatch mais avançado com chip S9 e Double Tap',
            price: 3299,
            originalPrice: 3599,
            image: '/Imagens/Watch Series 10.png',
            category: 'tech-innovation',
            subcategory: 'smartwatches',
            brand: 'Apple',
            origin: 'EUA',
            flag: '🇺🇸',
            features: ['Chip S9', 'Double Tap', 'Always-On Display', 'ECG'],
            rating: 4.8,
            reviews: 1876,
            stock: 32,
            badge: 'Original Apple'
          },
          {
            id: 'amazfit-gtr-4',
            name: 'Amazfit GTR 4',
            description: 'Design refinado com bateria de 14 dias',
            price: 899,
            originalPrice: 1199,
            image: '/icons/watch.svg',
            category: 'tech-innovation',
            subcategory: 'smartwatches',
            brand: 'Amazfit',
            origin: 'China',
            flag: '🇨🇳',
            features: ['14 dias bateria', '150+ esportes', 'GPS duplo', 'Alexa'],
            rating: 4.5,
            reviews: 734,
            stock: 28
          }
        ]
      },
      {
        id: 'tablets-gadgets',
        name: 'Tablets & Gadgets',
        description: 'Tablets premium e gadgets inovadores',
        products: [
          {
            id: 'ipad-pro-m4',
            name: 'iPad Pro M4',
            description: 'Tela Liquid Retina XDR com chip M4 revolucionário',
            price: 7999,
            originalPrice: 8999,
            image: '/Imagens/Ipad Pro.png',
            category: 'tech-innovation',
            subcategory: 'tablets-gadgets',
            brand: 'Apple',
            origin: 'EUA',
            flag: '🇺🇸',
            features: ['Chip M4', 'Liquid Retina XDR', 'Face ID', 'Thunderbolt'],
            rating: 4.9,
            reviews: 1234,
            stock: 15,
            badge: 'M4 Chip',
            isNew: true
          },
          {
            id: 'xiaomi-pad-6',
            name: 'Xiaomi Pad 6',
            description: 'Experiência cinematográfica com tela 2.8K',
            price: 1899,
            originalPrice: 2299,
            image: '/Imagens/Ipad.png',
            category: 'tech-innovation',
            subcategory: 'tablets-gadgets',
            brand: 'Xiaomi',
            origin: 'China',
            flag: '🇨🇳',
            features: ['Tela 2.8K', 'Snapdragon 870', '8840mAh', 'Quad speakers'],
            rating: 4.4,
            reviews: 892,
            stock: 22
          }
        ]
      }
    ]
  },
  {
    id: 'electric-mobility',
    name: 'Mobilidade Elétrica',
    icon: '🛴',
    description: 'Veículos elétricos premium para mobilidade urbana sustentável',
    color: 'green',
    gradient: 'from-green-500 to-teal-600',
    subcategories: [
      {
        id: 'electric-scooters',
        name: 'Patinetes Elétricos Premium',
        description: 'Patinetes elétricos de alta qualidade para mobilidade urbana',
        products: [
          {
            id: 'xiaomi-pro-2',
            name: 'Xiaomi Mi Electric Scooter Pro 2',
            description: '45km de autonomia com design elegante e robusto',
            price: 2799,
            originalPrice: 3199,
            image: '/icons/scooter.svg',
            category: 'electric-mobility',
            subcategory: 'electric-scooters',
            brand: 'Xiaomi',
            origin: 'China',
            flag: '🇨🇳',
            features: ['45km autonomia', '25km/h', 'App Mi Home', 'Freios duplos'],
            rating: 4.6,
            reviews: 1456,
            stock: 35,
            badge: 'Best Seller'
          },
          {
            id: 'segway-g30-max',
            name: 'Segway Ninebot G30 Max',
            description: 'Potência e equilíbrio perfeitos para longas distâncias',
            price: 3299,
            originalPrice: 3799,
            image: '/icons/scooter.svg',
            category: 'electric-mobility',
            subcategory: 'electric-scooters',
            brand: 'Segway',
            origin: 'China',
            flag: '🇨🇳',
            features: ['65km autonomia', 'IPX5', '30km/h', 'Pneus 10"'],
            rating: 4.7,
            reviews: 987,
            stock: 18
          }
        ]
      },
      {
        id: 'electric-skates',
        name: 'Skates Elétricos',
        description: 'Skates elétricos inovadores com tecnologia avançada',
        products: [
          {
            id: 'hiboy-s22',
            name: 'Hiboy S22',
            description: 'Suspensão dupla e controle remoto wireless',
            price: 1599,
            originalPrice: 1899,
            image: '/icons/skate.svg',
            category: 'electric-mobility',
            subcategory: 'electric-skates',
            brand: 'Hiboy',
            origin: 'EUA',
            flag: '🇺🇸',
            features: ['Suspensão dupla', 'Controle remoto', '38km autonomia', 'LED RGB'],
            rating: 4.3,
            reviews: 456,
            stock: 25
          }
        ]
      }
    ]
  },
  {
    id: 'drones-aerial',
    name: 'Drones & Aéreo',
    icon: '📷',
    description: 'Drones profissionais e equipamentos aéreos de última geração',
    color: 'purple',
    gradient: 'from-purple-500 to-pink-600',
    subcategories: [
      {
        id: 'professional-drones',
        name: 'Drones Profissionais',
        description: 'Drones para filmagem profissional e uso comercial',
        products: [
          {
            id: 'dji-mini-4-pro',
            name: 'DJI Mini 4 Pro',
            description: '4K, sensor obstáculo, ultraleve com ActiveTrack 360°',
            price: 4299,
            originalPrice: 4799,
            image: '/icons/drone.svg',
            category: 'drones-aerial',
            subcategory: 'professional-drones',
            brand: 'DJI',
            origin: 'China',
            flag: '🇨🇳',
            features: ['4K/60fps', 'ActiveTrack 360°', '34min voo', '249g'],
            rating: 4.8,
            reviews: 1789,
            stock: 28,
            badge: 'Pro Series',
            isNew: true
          },
          {
            id: 'fimi-x8-se',
            name: 'FIMI X8 SE',
            description: 'Compacto e potente com gimbal 3 eixos',
            price: 2799,
            originalPrice: 3299,
            image: '/icons/drone.svg',
            category: 'drones-aerial',
            subcategory: 'professional-drones',
            brand: 'FIMI',
            origin: 'China',
            flag: '🇨🇳',
            features: ['4K HDR', 'Gimbal 3 eixos', '35min voo', '790g'],
            rating: 4.5,
            reviews: 567,
            stock: 15
          }
        ]
      }
    ]
  },
  {
    id: 'audio-style',
    name: 'Som e Estilo',
    icon: '🎧',
    description: 'Áudio premium e acessórios de estilo para audiophiles',
    color: 'yellow',
    gradient: 'from-yellow-500 to-orange-600',
    subcategories: [
      {
        id: 'headphones-audio',
        name: 'Fones & Áudio',
        description: 'Fones de ouvido premium com qualidade audiophile',
        products: [
          {
            id: 'airpods-pro-2',
            name: 'AirPods Pro 2ª Geração',
            description: 'Cancelamento ativo de ruído com chip H2',
            price: 1899,
            originalPrice: 2199,
            image: '/Imagens/Air Pods Pro 2',
            category: 'audio-style',
            subcategory: 'headphones-audio',
            brand: 'Apple',
            origin: 'EUA',
            flag: '🇺🇸',
            features: ['Chip H2', 'ANC avançado', 'Spatial Audio', '6h bateria'],
            rating: 4.9,
            reviews: 3421,
            stock: 45,
            badge: 'Original Apple'
          },
          {
            id: 'xiaomi-buds-4-pro',
            name: 'Xiaomi Buds 4 Pro',
            description: 'Dolby Atmos com ANC e design premium',
            price: 499,
            originalPrice: 699,
            image: '/icons/headphones.svg',
            category: 'audio-style',
            subcategory: 'headphones-audio',
            brand: 'Xiaomi',
            origin: 'China',
            flag: '🇨🇳',
            features: ['Dolby Atmos', 'ANC -48dB', '9h bateria', 'LDAC'],
            rating: 4.6,
            reviews: 1234,
            stock: 67
          }
        ]
      }
    ]
  },
  {
    id: 'entertainment-lifestyle',
    name: 'Entretenimento & Estilo de Vida',
    icon: '🎮',
    description: 'Consoles retrô, games portáteis e entretenimento premium',
    color: 'red',
    gradient: 'from-red-500 to-pink-600',
    subcategories: [
      {
        id: 'retro-gaming',
        name: 'Mini Fliperamas Portáteis',
        description: 'Consoles retrô portáteis com milhares de jogos clássicos',
        products: [
          {
            id: 'retroid-pocket-3',
            name: 'Retroid Pocket 3+',
            description: 'Jogos retrô em HD com Android 11 e emulação perfeita',
            price: 899,
            originalPrice: 1199,
            image: '/icons/gaming.svg',
            category: 'entertainment-lifestyle',
            subcategory: 'retro-gaming',
            brand: 'Retroid',
            origin: 'China',
            flag: '🇨🇳',
            features: ['Android 11', '4GB RAM', 'Tela 4.7"', '10000+ jogos'],
            rating: 4.7,
            reviews: 892,
            stock: 34
          },
          {
            id: 'anbernic-rg35xx',
            name: 'Anbernic RG35XX',
            description: 'Clássicos na palma da mão com design retrô autêntico',
            price: 459,
            originalPrice: 599,
            image: '/icons/gaming.svg',
            category: 'entertainment-lifestyle',
            subcategory: 'retro-gaming',
            brand: 'Anbernic',
            origin: 'China',
            flag: '🇨🇳',
            features: ['Linux OS', '64GB storage', 'Tela IPS', '5000+ jogos'],
            rating: 4.4,
            reviews: 567,
            stock: 28
          }
        ]
      }
    ]
  },
  {
    id: 'smart-accessories',
    name: 'Acessórios Inteligentes',
    icon: '🧳',
    description: 'Acessórios premium e inteligentes para seus dispositivos',
    color: 'gray',
    gradient: 'from-gray-500 to-slate-600',
    subcategories: [
      {
        id: 'chargers-cables',
        name: 'Carregadores & Cabos Importados',
        description: 'Carregadores originais e cabos premium certificados',
        products: [
          {
            id: 'magsafe-original',
            name: 'MagSafe Original Apple',
            description: 'Carregador wireless magnético original da Apple',
            price: 299,
            originalPrice: 399,
            image: '/icons/charger.svg',
            category: 'smart-accessories',
            subcategory: 'chargers-cables',
            brand: 'Apple',
            origin: 'EUA',
            flag: '🇺🇸',
            features: ['15W wireless', 'Magnético', 'Certificado MFi', 'Original'],
            rating: 4.8,
            reviews: 2345,
            stock: 89,
            badge: 'Original Apple'
          }
        ]
      }
    ]
  }
]

export const getBrandsByCategory = (categoryId: string) => {
  const category = premiumCategories.find(cat => cat.id === categoryId)
  if (!category) return []
  
  const brands = new Set<string>()
  category.subcategories.forEach(sub => {
    sub.products.forEach(product => {
      brands.add(product.brand)
    })
  })
  
  return Array.from(brands)
}

export const getProductsByBrand = (brand: string) => {
  const products: Product[] = []
  premiumCategories.forEach(category => {
    category.subcategories.forEach(subcategory => {
      subcategory.products.forEach(product => {
        if (product.brand === brand) {
          products.push(product)
        }
      })
    })
  })
  return products
}

export const getAllProducts = () => {
  const products: Product[] = []
  premiumCategories.forEach(category => {
    category.subcategories.forEach(subcategory => {
      products.forEach(product => products.push(product))
    })
  })
  return products
}

export const getProductById = (id: string) => {
  let foundProduct: Product | null = null
  premiumCategories.forEach(category => {
    category.subcategories.forEach(subcategory => {
      const product = subcategory.products.find(p => p.id === id)
      if (product) foundProduct = product
    })
  })
  return foundProduct
}

export const formatPrice = (price: number, currency = 'BRL') => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency
  }).format(price)
}

export const calculateDiscount = (original: number, current: number) => {
  return Math.round(((original - current) / original) * 100)
}
