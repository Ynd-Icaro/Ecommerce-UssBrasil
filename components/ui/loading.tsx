'use client'

import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'primary' | 'secondary' | 'white'
  className?: string
}

export default function LoadingSpinner({ 
  size = 'md', 
  variant = 'primary',
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }

  const variantClasses = {
    primary: 'border-ussbrasil-primary border-t-transparent',
    secondary: 'border-ussbrasil-secondary border-t-transparent',
    white: 'border-white border-t-transparent'
  }

  return (
    <motion.div
      className={`
        inline-block border-2 rounded-full
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      animate={{ rotate: 360 }}
      transition={{ 
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  )
}

// Componente de Loading para páginas inteiras
export function PageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ussbrasil-50 to-white">
      <div className="text-center">
        <motion.div
          className="mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <LoadingSpinner size="xl" />
            <motion.div
              className="absolute inset-0 border-2 border-ussbrasil-secondary/30 rounded-full"
              animate={{ rotate: -360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-ussbrasil-800 mb-2">
            Carregando...
          </h3>
          <p className="text-ussbrasil-600 text-sm">
            Preparando sua experiência USS Brasil
          </p>
        </motion.div>
      </div>
    </div>
  )
}

// Componente de Loading para botões
export function ButtonLoading() {
  return (
    <div className="flex items-center gap-2">
      <LoadingSpinner size="sm" variant="white" />
      <span>Processando...</span>
    </div>
  )
}

// Componente de Loading para cards de produtos
export function ProductCardLoading() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 animate-pulse">
      <div className="aspect-square bg-gray-200 rounded-xl mb-4" />
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-6 bg-gray-200 rounded w-1/3" />
      </div>
    </div>
  )
}
