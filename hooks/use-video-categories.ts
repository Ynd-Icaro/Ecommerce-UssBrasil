'use client'

import React, { useState, useEffect } from 'react'

interface VideoCategory {
  id: string
  name: string
  keywords: string[]
  videoPath?: string
  description?: string
}

interface Video {
  id: string
  name: string
  path: string
  category?: string
  keywords: string[]
}

export function useVideoCategories() {
  const [videoCategories, setVideoCategories] = useState<VideoCategory[]>([])
  const [loading, setLoading] = useState(true)

  // Definir categorias e palavras-chave para associação automática
  const categoryMappings: VideoCategory[] = [
    {
      id: 'iphone',
      name: 'iPhone',
      keywords: ['iphone', 'phone', 'móvel', 'celular', 'smartphone'],
      description: 'Vídeos relacionados aos iPhones'
    },
    {
      id: 'mac',
      name: 'Mac',
      keywords: ['mac', 'macbook', 'imac', 'studio', 'pro', 'air', 'mini', 'computer', 'laptop'],
      description: 'Vídeos relacionados aos computadores Mac'
    },
    {
      id: 'watch',
      name: 'Apple Watch',
      keywords: ['watch', 'relógio', 'smartwatch', 'wearable'],
      description: 'Vídeos relacionados ao Apple Watch'
    },
    {
      id: 'ipad',
      name: 'iPad',
      keywords: ['ipad', 'tablet', 'pro', 'air', 'mini'],
      description: 'Vídeos relacionados aos iPads'
    },
    {
      id: 'dji',
      name: 'DJI',
      keywords: ['dji', 'drone', 'mavic', 'mini', 'air', 'fpv'],
      description: 'Vídeos relacionados a drones e equipamentos DJI'
    },
    {
      id: 'airpods',
      name: 'AirPods',
      keywords: ['airpods', 'headphone', 'fone', 'áudio', 'música', 'wireless'],
      description: 'Vídeos relacionados aos AirPods e acessórios de áudio'
    }
  ]

  // Lista de vídeos disponíveis (baseado na estrutura do projeto)
  const availableVideos: Video[] = [
    {
      id: 'iphone-video',
      name: 'IphoneVideo.mp4',
      path: '/Videos/IphoneVideo.mp4',
      keywords: ['iphone', 'smartphone', 'phone']
    },
    {
      id: 'ipad-video',
      name: 'IpadVideo.mp4',
      path: '/Videos/IpadVideo.mp4',
      keywords: ['ipad', 'tablet']
    },
    {
      id: 'macs-video',
      name: 'Macs Video.mp4',
      path: '/Videos/Macs Video.mp4',
      keywords: ['mac', 'macbook', 'imac', 'computer']
    },
    {
      id: 'apple-watch-video',
      name: 'Apple Watch.mp4',
      path: '/Videos/Apple Watch.mp4',
      keywords: ['watch', 'relógio', 'smartwatch']
    },
    {
      id: 'airpods-video',
      name: 'AirPods Video.webm',
      path: '/Videos/AirPods Video.webm',
      keywords: ['airpods', 'headphone', 'áudio']
    }
  ]

  // Função para associar vídeos às categorias automaticamente
  const associateVideosToCategories = () => {
    const associatedCategories = categoryMappings.map(category => {
      // Encontrar vídeo correspondente baseado nas palavras-chave
      const matchingVideo = availableVideos.find(video => {
        const videoNameLower = video.name.toLowerCase()
        return category.keywords.some(keyword => 
          videoNameLower.includes(keyword.toLowerCase()) ||
          video.keywords.some(videoKeyword => 
            videoKeyword.toLowerCase().includes(keyword.toLowerCase())
          )
        )
      })

      return {
        ...category,
        videoPath: matchingVideo?.path
      }
    })

    setVideoCategories(associatedCategories)
    setLoading(false)
  }

  useEffect(() => {
    associateVideosToCategories()
  }, [])

  return {
    videoCategories,
    loading,
    refreshAssociations: associateVideosToCategories
  }
}

// Componente para exibir vídeos por categoria
interface CategoryVideoPlayerProps {
  categoryId: string
  autoplay?: boolean
  controls?: boolean
  muted?: boolean
  className?: string
}

export function CategoryVideoPlayer({ 
  categoryId, 
  autoplay = false, 
  controls = true, 
  muted = true,
  className = ''
}: CategoryVideoPlayerProps) {
  const { videoCategories, loading } = useVideoCategories()
  
  if (loading) {
    return (
      <div className={`bg-gray-100 rounded-lg animate-pulse ${className}`}>
        <div className="flex items-center justify-center h-full">
          <span className="text-gray-500">Carregando vídeo...</span>
        </div>
      </div>
    )
  }

  const category = videoCategories.find(cat => cat.id === categoryId)
  
  if (!category?.videoPath) {
    return (
      <div className={`bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
        <span className="text-gray-500">Vídeo não disponível para esta categoria</span>
      </div>
    )
  }

  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`}>
      <video
        autoPlay={autoplay}
        controls={controls}
        muted={muted}
        loop
        className="w-full h-full object-cover"
        poster={`/placeholder-${categoryId}.jpg`}
      >
        <source src={category.videoPath} type="video/mp4" />
        <source src={category.videoPath} type="video/webm" />
        Seu navegador não suporta vídeos HTML5.
      </video>
      
      {/* Overlay com informações da categoria */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
        <h3 className="text-white font-semibold text-lg">{category.name}</h3>
        {category.description && (
          <p className="text-white/80 text-sm mt-1">{category.description}</p>
        )}
      </div>
    </div>
  )
}

// Hook para obter vídeo de uma categoria específica
export function useCategoryVideo(categoryId: string) {
  const { videoCategories, loading } = useVideoCategories()
  
  const categoryVideo = videoCategories.find(cat => cat.id === categoryId)
  
  return {
    video: categoryVideo,
    loading,
    hasVideo: !!categoryVideo?.videoPath
  }
}
