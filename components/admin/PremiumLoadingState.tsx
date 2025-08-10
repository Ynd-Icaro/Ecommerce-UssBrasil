'use client'

import { motion } from 'framer-motion'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

interface PremiumLoadingStateProps {
  type?: 'cards' | 'table' | 'page' | 'minimal'
  count?: number
  message?: string
  className?: string
}

const PremiumLoadingState = ({ 
  type = 'cards', 
  count = 6, 
  message = 'Carregando dados...',
  className = ''
}: PremiumLoadingStateProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0
    }
  }

  if (type === 'minimal') {
    return (
      <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
        <LoadingSpinner />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 mt-4 text-sm"
        >
          {message}
        </motion.p>
      </div>
    )
  }

  if (type === 'page') {
    return (
      <div className={`min-h-[60vh] flex flex-col items-center justify-center ${className}`}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center"
        >
          <LoadingSpinner size="xl" />
          
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white text-xl font-semibold mt-6 mb-2"
          >
            Carregando Sistema
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 text-sm max-w-md"
          >
            {message}
          </motion.p>
          
          {/* Animated Progress Dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center space-x-1 mt-6"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-cyan-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    )
  }

  if (type === 'table') {
    return (
      <div className={`space-y-4 ${className}`}>
        {/* Table Header Skeleton */}
        <motion.div
          variants={itemVariants}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl h-12 flex items-center px-6"
        >
          <div className="flex space-x-4 w-full">
            <div className="h-3 bg-white/20 rounded w-1/4 animate-pulse" />
            <div className="h-3 bg-white/20 rounded w-1/6 animate-pulse" />
            <div className="h-3 bg-white/20 rounded w-1/6 animate-pulse" />
            <div className="h-3 bg-white/20 rounded w-1/4 animate-pulse" />
            <div className="h-3 bg-white/20 rounded w-1/6 animate-pulse" />
          </div>
        </motion.div>

        {/* Table Rows Skeleton */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {Array.from({ length: count }).map((_, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl h-16 flex items-center px-6"
            >
              <div className="flex items-center space-x-4 w-full">
                <div className="w-10 h-10 bg-white/20 rounded-lg animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-white/20 rounded w-3/4 animate-pulse" />
                  <div className="h-2 bg-white/10 rounded w-1/2 animate-pulse" />
                </div>
                <div className="flex space-x-3">
                  <div className="w-16 h-6 bg-white/20 rounded animate-pulse" />
                  <div className="w-8 h-8 bg-white/20 rounded-lg animate-pulse" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }

  // Default: Cards skeleton
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 ${className}`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
          style={{ height: '420px' }}
        >
          {/* Image Skeleton */}
          <div className="h-48 sm:h-56 lg:h-64 bg-white/10 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          </div>

          {/* Content Skeleton */}
          <div className="p-4 sm:p-5 lg:p-6 space-y-4">
            {/* Title & Category */}
            <div className="space-y-2">
              <div className="h-4 bg-white/20 rounded w-3/4 animate-pulse" />
              <div className="h-3 bg-white/10 rounded w-1/2 animate-pulse" />
            </div>

            {/* Price & Stock */}
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <div className="h-5 bg-white/20 rounded w-20 animate-pulse" />
                <div className="h-3 bg-white/10 rounded w-16 animate-pulse" />
              </div>
              <div className="text-right space-y-1">
                <div className="h-3 bg-white/10 rounded w-12 animate-pulse" />
                <div className="h-4 bg-white/20 rounded w-8 animate-pulse" />
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-between">
              <div className="h-3 bg-white/10 rounded w-16 animate-pulse" />
              <div className="h-3 bg-white/10 rounded w-20 animate-pulse" />
            </div>

            {/* Buttons */}
            <div className="flex space-x-2 pt-2">
              <div className="flex-1 h-8 bg-white/10 rounded-lg animate-pulse" />
              <div className="flex-1 h-8 bg-white/20 rounded-lg animate-pulse" />
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default PremiumLoadingState
