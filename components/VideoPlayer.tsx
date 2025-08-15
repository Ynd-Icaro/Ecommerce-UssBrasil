'use client'

import { useState } from 'react'
import { PlayIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

interface VideoPlayerProps {
  videoUrl: string
  thumbnailUrl: string
  title: string
  description?: string
  className?: string
}

export default function VideoPlayer({ 
  videoUrl, 
  thumbnailUrl, 
  title, 
  description,
  className = ''
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handleClose = () => {
    setIsPlaying(false)
  }

  return (
    <div className={`relative ${className}`}>
      {!isPlaying ? (
        <div className="relative group cursor-pointer" onClick={handlePlay}>
          <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-uss overflow-hidden">
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors rounded-uss">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-16 h-16 bg-uss-blue/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-uss-blue transition-colors"
            >
              <PlayIcon className="w-8 h-8 text-white ml-1" />
            </motion.div>
          </div>
          
          {/* Video Info */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-semibold text-lg mb-1 drop-shadow-lg">
              {title}
            </h3>
            {description && (
              <p className="text-white/90 text-sm drop-shadow-lg line-clamp-2">
                {description}
              </p>
            )}
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <XMarkIcon className="w-6 h-6 text-white" />
          </button>
          
          <div className="w-full max-w-4xl aspect-video">
            <video
              src={videoUrl}
              controls
              autoPlay
              className="w-full h-full rounded-uss"
            >
              Seu navegador não suporta o elemento de vídeo.
            </video>
          </div>
        </motion.div>
      )}
    </div>
  )
}

// Componente para seção de vídeos
export function VideoSection() {
  const videos = [
    {
      id: '1',
      title: 'Unboxing iPhone 16 Pro',
      description: 'Confira todos os detalhes do novo iPhone 16 Pro em primeira mão',
      videoUrl: '/Videos/iphone-16-pro-unboxing.mp4',
      thumbnailUrl: '/Videos/thumbnails/iphone-16-pro-thumb.jpg'
    },
    {
      id: '2',
      title: 'Review MacBook Air M3',
      description: 'Análise completa do novo MacBook Air com chip M3',
      videoUrl: '/Videos/macbook-air-m3-review.mp4',
      thumbnailUrl: '/Videos/thumbnails/macbook-air-m3-thumb.jpg'
    },
    {
      id: '3',
      title: 'AirPods Pro 2ª Geração',
      description: 'Teste completo do cancelamento de ruído e qualidade de áudio',
      videoUrl: '/Videos/airpods-pro-2-test.mp4',
      thumbnailUrl: '/Videos/thumbnails/airpods-pro-2-thumb.jpg'
    }
  ]

  return (
    <section className="py-16 bg-white dark:bg-dark-800">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-uss-blue dark:text-white mb-4">
            Reviews e Unboxings
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Conheça os produtos em detalhes antes de comprar
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <VideoPlayer
                videoUrl={video.videoUrl}
                thumbnailUrl={video.thumbnailUrl}
                title={video.title}
                description={video.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
