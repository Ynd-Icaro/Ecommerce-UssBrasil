'use client'

import { useState, useEffect, useRef } from 'react'

interface UseImageOptimizationProps {
  src: string
  fallback?: string
  preload?: boolean
}

export const useImageOptimization = ({ 
  src, 
  fallback = '/images/placeholder.jpg', 
  preload = false 
}: UseImageOptimizationProps) => {
  const [imageSrc, setImageSrc] = useState(preload ? src : fallback)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const imageRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    if (!src) {
      setImageSrc(fallback)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setHasError(false)

    const img = new Image()
    imageRef.current = img

    img.onload = () => {
      setImageSrc(src)
      setIsLoading(false)
      setHasError(false)
    }

    img.onerror = () => {
      setImageSrc(fallback)
      setIsLoading(false)
      setHasError(true)
    }

    // Start loading the image
    img.src = src

    return () => {
      if (imageRef.current) {
        imageRef.current.onload = null
        imageRef.current.onerror = null
      }
    }
  }, [src, fallback])

  return {
    imageSrc,
    isLoading,
    hasError,
    retry: () => {
      if (hasError && src) {
        setHasError(false)
        setIsLoading(true)
        const img = new Image()
        img.onload = () => {
          setImageSrc(src)
          setIsLoading(false)
        }
        img.onerror = () => {
          setImageSrc(fallback)
          setIsLoading(false)
          setHasError(true)
        }
        img.src = src
      }
    }
  }
}

// Hook for lazy loading images
export const useLazyImage = (threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isInView }
}

// Hook for optimizing video loading
export const useVideoOptimization = (videoSrc: string) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [canPlay, setCanPlay] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedData = () => setIsLoaded(true)
    const handleCanPlay = () => setCanPlay(true)

    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('canplaythrough', handleCanPlay)

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('canplaythrough', handleCanPlay)
    }
  }, [])

  const play = () => {
    if (videoRef.current && canPlay) {
      return videoRef.current.play()
    }
  }

  const pause = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  return {
    videoRef,
    isLoaded,
    canPlay,
    play,
    pause
  }
}
