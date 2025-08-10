'use client'

import { motion } from 'framer-motion'
import { ReactNode, ButtonHTMLAttributes } from 'react'
import LoadingSpinner from './LoadingSpinner'

interface PremiumButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'accent' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  icon?: ReactNode
  fullWidth?: boolean
  glowEffect?: boolean
  className?: string
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

const PremiumButton = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  fullWidth = false,
  glowEffect = false,
  className = '',
  disabled,
  onClick,
  type = 'button'
}: PremiumButtonProps) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  }

  const getVariantStyles = () => {
    const baseStyles = "relative overflow-hidden font-semibold rounded-xl transition-all duration-300 transform active:scale-95"
    
    switch (variant) {
      case 'primary':
        return `${baseStyles} text-white shadow-lg hover:shadow-xl`
      case 'secondary':
        return `${baseStyles} text-white shadow-lg hover:shadow-xl`
      case 'accent':
        return `${baseStyles} text-white shadow-lg hover:shadow-xl`
      case 'outline':
        return `${baseStyles} bg-transparent border-2 text-current hover:text-white shadow-md hover:shadow-lg`
      default:
        return baseStyles
    }
  }

  const getBackgroundStyle = () => {
    switch (variant) {
      case 'primary':
        return { background: 'var(--uss-gradient-premium)' }
      case 'secondary':
        return { background: 'var(--uss-gradient-secondary)' }
      case 'accent':
        return { background: 'linear-gradient(135deg, #06B6D4, #0EA5E9)' }
      case 'outline':
        return { 
          borderImage: 'var(--uss-gradient-premium) 1',
          background: 'transparent'
        }
      default:
        return { background: 'var(--uss-gradient-premium)' }
    }
  }

  const isDisabled = disabled || loading

  return (
    <motion.button
      className={`
        ${getVariantStyles()}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
        ${glowEffect ? 'hover:shadow-2xl' : ''}
        ${className}
      `}
      style={getBackgroundStyle()}
      whileHover={!isDisabled ? { 
        y: -2,
        boxShadow: glowEffect ? 'var(--uss-shadow-glow)' : 'var(--uss-shadow-xl)'
      } : {}}
      whileTap={!isDisabled ? { scale: 0.95 } : {}}
      disabled={isDisabled}
      onClick={onClick}
      type={type}
    >
      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />

      {/* Content */}
      <div className="relative flex items-center justify-center gap-2">
        {loading ? (
          <LoadingSpinner size="sm" variant="accent" />
        ) : icon ? (
          <span className="flex-shrink-0">{icon}</span>
        ) : null}
        
        <span className={loading ? 'opacity-70' : ''}>
          {loading ? 'Carregando...' : children}
        </span>
      </div>

      {/* Glow overlay for premium effect */}
      {glowEffect && (
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0"
          style={{ background: 'var(--uss-gradient-premium)' }}
          whileHover={{ opacity: 0.1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  )
}

export default PremiumButton
