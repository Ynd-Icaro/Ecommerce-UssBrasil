'use client'

import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'primary' | 'secondary' | 'accent'
  className?: string
}

const LoadingSpinner = ({ 
  size = 'md', 
  variant = 'primary',
  className = '' 
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }

  const getGradient = () => {
    switch (variant) {
      case 'primary':
        return 'var(--uss-gradient-premium)'
      case 'secondary':
        return 'var(--uss-gradient-secondary)'
      case 'accent':
        return 'linear-gradient(135deg, #06B6D4, #0EA5E9)'
      default:
        return 'var(--uss-gradient-premium)'
    }
  }

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-transparent"
        style={{
          background: getGradient(),
          maskImage: 'conic-gradient(transparent 0deg, black 360deg)',
          WebkitMaskImage: 'conic-gradient(transparent 0deg, black 360deg)'
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-transparent"
        style={{
          background: getGradient(),
          maskImage: 'conic-gradient(transparent 60deg, black 120deg, transparent 180deg)',
          WebkitMaskImage: 'conic-gradient(transparent 60deg, black 120deg, transparent 180deg)'
        }}
        animate={{ rotate: -360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </div>
  )
}

export default LoadingSpinner
