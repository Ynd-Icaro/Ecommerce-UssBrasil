import { useState, useEffect } from 'react'

interface VideoCategory {
  id: string
  name: string
  keywords: string[]
  videoPath: string
  description?: string
}

const defaultVideoCategories: VideoCategory[] = [
  {
    id: 'iphone',
    name: 'iPhone',
    keywords: ['iphone', 'ios', 'smartphone'],
    videoPath: '/Videos/IphoneVideo.mp4',
    description: 'Smartphones iPhone com tecnologia avançada'
  },
  {
    id: 'mac',
    name: 'Mac',
    keywords: ['mac', 'macbook', 'imac', 'laptop'],
    videoPath: '/Videos/Macs Video.mp4',
    description: 'Computadores Mac com performance excepcional'
  },
  {
    id: 'watch',
    name: 'Apple Watch',
    keywords: ['watch', 'apple watch', 'smartwatch'],
    videoPath: '/Videos/Apple Watch.mp4',
    description: 'Relógios inteligentes para saúde e fitness'
  },
  {
    id: 'ipad',
    name: 'iPad',
    keywords: ['ipad', 'tablet'],
    videoPath: '/Videos/IpadVideo.mp4',
    description: 'Tablets iPad para criatividade e produtividade'
  },
  {
    id: 'airpods',
    name: 'AirPods',
    keywords: ['airpods', 'headphones', 'audio'],
    videoPath: '/Videos/AirPods Video.webm',
    description: 'Fones de ouvido sem fio com qualidade premium'
  }
]

export function useVideoCategories() {
  const [videoCategories, setVideoCategories] = useState<VideoCategory[]>(defaultVideoCategories)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Função para buscar categorias de vídeo (pode ser expandida para API)
  const fetchVideoCategories = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Por enquanto, retorna os dados estáticos
      // Pode ser expandido para fazer chamada à API
      setVideoCategories(defaultVideoCategories)
    } catch (err) {
      setError('Erro ao carregar categorias de vídeo')
      console.error('Error fetching video categories:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Função para encontrar categoria por palavra-chave
  const findCategoryByKeyword = (keyword: string): VideoCategory | undefined => {
    return videoCategories.find(category =>
      category.keywords.some(k => k.toLowerCase().includes(keyword.toLowerCase()))
    )
  }

  // Função para encontrar categoria por ID
  const findCategoryById = (id: string): VideoCategory | undefined => {
    return videoCategories.find(category => category.id === id)
  }

  useEffect(() => {
    fetchVideoCategories()
  }, [])

  return {
    videoCategories,
    isLoading,
    error,
    fetchVideoCategories,
    findCategoryByKeyword,
    findCategoryById
  }
}
