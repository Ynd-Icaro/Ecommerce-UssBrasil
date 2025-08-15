'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, AlertTriangle, Info, Heart, ShoppingCart, Star } from 'lucide-react'
import { useEffect, useState } from 'react'

interface FeedbackProps {
  type: 'success' | 'error' | 'warning' | 'info' | 'love' | 'cart' | 'rating'
  message: string
  visible: boolean
  onClose?: () => void
  autoClose?: boolean
  duration?: number
  position?: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center'
}

const icons = {
  success: Check,
  error: X,
  warning: AlertTriangle,
  info: Info,
  love: Heart,
  cart: ShoppingCart,
  rating: Star
}

const colors = {
  success: {
    bg: 'from-green-50 to-emerald-50',
    border: 'border-green-200',
    icon: 'text-green-600',
    text: 'text-green-800'
  },
  error: {
    bg: 'from-red-50 to-rose-50', 
    border: 'border-red-200',
    icon: 'text-red-600',
    text: 'text-red-800'
  },
  warning: {
    bg: 'from-yellow-50 to-amber-50',
    border: 'border-yellow-200', 
    icon: 'text-yellow-600',
    text: 'text-yellow-800'
  },
  info: {
    bg: 'from-blue-50 to-sky-50',
    border: 'border-blue-200',
    icon: 'text-blue-600', 
    text: 'text-blue-800'
  },
  love: {
    bg: 'from-pink-50 to-rose-50',
    border: 'border-pink-200',
    icon: 'text-pink-600',
    text: 'text-pink-800'
  },
  cart: {
    bg: 'from-ussbrasil-50 to-blue-50',
    border: 'border-ussbrasil-200',
    icon: 'text-ussbrasil-600',
    text: 'text-ussbrasil-800'
  },
  rating: {
    bg: 'from-yellow-50 to-orange-50',
    border: 'border-yellow-200',
    icon: 'text-yellow-500',
    text: 'text-yellow-800'
  }
}

const positions = {
  'top-right': 'fixed top-4 right-4 z-50',
  'top-center': 'fixed top-4 left-1/2 transform -translate-x-1/2 z-50',
  'bottom-right': 'fixed bottom-4 right-4 z-50',
  'bottom-center': 'fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50'
}

export default function Feedback({
  type,
  message,
  visible,
  onClose,
  autoClose = true,
  duration = 4000,
  position = 'top-right'
}: FeedbackProps) {
  const Icon = icons[type]
  const colorScheme = colors[type]
  
  useEffect(() => {
    if (visible && autoClose) {
      const timer = setTimeout(() => {
        onClose?.()
      }, duration)
      
      return () => clearTimeout(timer)
    }
  }, [visible, autoClose, duration, onClose])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={positions[position]}
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <div className={`
            flex items-center gap-3 p-4 rounded-2xl backdrop-blur-sm
            bg-gradient-to-r ${colorScheme.bg} 
            border ${colorScheme.border}
            shadow-lg shadow-black/5 max-w-sm
          `}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 500 }}
              className={`flex-shrink-0 ${colorScheme.icon}`}
            >
              <Icon size={20} />
            </motion.div>
            
            <div className={`flex-1 ${colorScheme.text} font-medium text-sm`}>
              {message}
            </div>
            
            {onClose && (
              <button
                onClick={onClose}
                className={`flex-shrink-0 ${colorScheme.icon} hover:opacity-70 transition-opacity`}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Hook para usar feedback facilmente
export function useFeedback() {
  const [feedback, setFeedback] = useState<{
    type: FeedbackProps['type']
    message: string
    visible: boolean
  }>({
    type: 'info',
    message: '',
    visible: false
  })

  const showFeedback = (type: FeedbackProps['type'], message: string) => {
    setFeedback({ type, message, visible: true })
  }

  const hideFeedback = () => {
    setFeedback(prev => ({ ...prev, visible: false }))
  }

  const FeedbackComponent = (
    <Feedback
      type={feedback.type}
      message={feedback.message}
      visible={feedback.visible}
      onClose={hideFeedback}
    />
  )

  return {
    showSuccess: (message: string) => showFeedback('success', message),
    showError: (message: string) => showFeedback('error', message),
    showWarning: (message: string) => showFeedback('warning', message),
    showInfo: (message: string) => showFeedback('info', message),
    showLove: (message: string) => showFeedback('love', message),
    showCart: (message: string) => showFeedback('cart', message),
    showRating: (message: string) => showFeedback('rating', message),
    hideFeedback,
    FeedbackComponent
  }
}
