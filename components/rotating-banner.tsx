'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface RotatingBannerProps {
  categorySlug: string
  videos: {
    id: string
    title: string
    thumbnail: string
    videoUrl: string
    description?: string
  }[]
}

export default function RotatingBanner({ categorySlug, videos }: RotatingBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [autoPlay, setAutoPlay] = useState(true)

  // Auto-rotation effect
  useEffect(() => {
    if (!autoPlay || videos.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [autoPlay, videos.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setAutoPlay(false) // Stop auto-play when user manually navigates
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length)
    setAutoPlay(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length)
    setAutoPlay(false)
  }

  const playVideo = (videoUrl: string) => {
    setSelectedVideo(videoUrl)
    setIsPlaying(true)
  }

  const closeVideo = () => {
    setSelectedVideo(null)
    setIsPlaying(false)
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="relative w-full h-80 md:h-96 lg:h-[500px] bg-gradient-to-br from-[#1a1a1a] via-[#2d2d2d] to-[#20b2aa] rounded-2xl flex items-center justify-center">
        <div className="text-center text-white">
          <h3 className="text-2xl font-bold mb-2">Categoria em Destaque</h3>
          <p className="text-white/80">Vídeos em breve...</p>
        </div>
      </div>
    )
  }

  const currentVideo = videos[currentIndex]

  return (
    <>
      <div className="relative w-full h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={currentVideo.thumbnail}
            alt={currentVideo.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>

        {/* Navigation Arrows */}
        {videos.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-200 backdrop-blur-sm"
              aria-label="Vídeo anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-200 backdrop-blur-sm"
              aria-label="Próximo vídeo"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-12 z-10">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {currentVideo.title}
            </h2>
            {currentVideo.description && (
              <p className="text-lg md:text-xl text-white/90 mb-6 leading-relaxed">
                {currentVideo.description}
              </p>
            )}
            
            {/* Play Button */}
            <button
              onClick={() => playVideo(currentVideo.videoUrl)}
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#20b2aa] to-[#1a9999] text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Play className="h-6 w-6" />
              <span>Assistir Vídeo</span>
            </button>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        {videos.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white shadow-lg'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Auto-play indicator */}
        {autoPlay && videos.length > 1 && (
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
              Auto
            </div>
          </div>
        )}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={closeVideo}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={selectedVideo}
                controls
                autoPlay
                className="w-full h-full"
              />
              <button
                onClick={closeVideo}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Thumbnails (Optional - for quick access) */}
      {videos.length > 1 && (
        <div className="mt-6 flex space-x-4 overflow-x-auto pb-2">
          {videos.map((video, index) => (
            <motion.button
              key={video.id}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 relative w-32 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                index === currentIndex
                  ? 'border-[#20b2aa] shadow-lg'
                  : 'border-transparent hover:border-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Play className="h-4 w-4 text-white" />
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </>
  )
}
