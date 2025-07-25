'use client'

import { useCategoryVideo } from '@/hooks/use-video-categories'

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
  const { video, loading, hasVideo } = useCategoryVideo(categoryId)
  
  if (loading) {
    return (
      <div className={`bg-gray-100 rounded-lg animate-pulse ${className}`}>
        <div className="flex items-center justify-center h-full">
          <span className="text-gray-500">Carregando vídeo...</span>
        </div>
      </div>
    )
  }

  if (!hasVideo || !video?.videoPath) {
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
        <source src={video.videoPath} type="video/mp4" />
        <source src={video.videoPath} type="video/webm" />
        Seu navegador não suporta vídeos HTML5.
      </video>
      
      {/* Overlay com informações da categoria */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
        <h3 className="text-white font-semibold text-lg">{video.name}</h3>
        {video.description && (
          <p className="text-white/80 text-sm mt-1">{video.description}</p>
        )}
      </div>
    </div>
  )
}
