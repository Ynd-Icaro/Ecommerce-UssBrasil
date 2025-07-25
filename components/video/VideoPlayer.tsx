'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Maximize, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface VideoPlayerProps {
  src: string
  poster?: string
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  className?: string
  title?: string
  description?: string
  showControls?: boolean
}

export function VideoPlayer({
  src,
  poster,
  autoplay = false,
  muted = true,
  loop = true,
  className = '',
  title,
  description,
  showControls = true
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay)
  const [isMuted, setIsMuted] = useState(muted)
  const [isLoading, setIsLoading] = useState(true)
  const [showControlsOverlay, setShowControlsOverlay] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        videoRef.current.requestFullscreen()
      }
    }
  }

  const handleLoadStart = () => setIsLoading(true)
  const handleCanPlay = () => setIsLoading(false)

  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden bg-black group ${className}`}
      onMouseEnter={() => {
        setIsHovered(true)
        setShowControlsOverlay(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        setTimeout(() => setShowControlsOverlay(false), 2000)
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoplay}
        muted={muted}
        loop={loop}
        playsInline
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="w-full h-full object-cover"
        style={{ aspectRatio: '16/9' }}
      />

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <Loader2 className="h-8 w-8 text-white animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Overlay */}
      {(title || description) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0.8, y: 0 }}
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white"
        >
          {title && (
            <motion.h3 
              className="text-xl font-semibold mb-2"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {title}
            </motion.h3>
          )}
          {description && (
            <motion.p 
              className="text-sm text-white/80"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {description}
            </motion.p>
          )}
        </motion.div>
      )}

      {/* Controls Overlay */}
      {showControls && (
        <AnimatePresence>
          {(showControlsOverlay || !isPlaying) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"
            >
              {/* Center Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={togglePlay}
                    size="lg"
                    className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300"
                  >
                    {isPlaying ? (
                      <Pause className="h-6 w-6 text-white" />
                    ) : (
                      <Play className="h-6 w-6 text-white ml-1" />
                    )}
                  </Button>
                </motion.div>
              </div>

              {/* Bottom Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={toggleMute}
                      size="sm"
                      variant="ghost"
                      className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white"
                    >
                      {isMuted ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </Button>
                  </motion.div>
                </div>

                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={toggleFullscreen}
                    size="sm"
                    variant="ghost"
                    className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white"
                  >
                    <Maximize className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Hover Effect */}
      <motion.div
        className="absolute inset-0 ring-2 ring-white/20 rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}
