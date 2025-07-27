'use client'

import { ReactNode, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface ModalStandardProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  showCloseButton?: boolean
  closeOnBackdrop?: boolean
  className?: string
  title?: string
  description?: string
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[95vw] max-h-[95vh]'
}

export function ModalStandard({
  isOpen,
  onClose,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnBackdrop = true,
  className,
  title,
  description
}: ModalStandardProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnBackdrop) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ 
              type: "spring", 
              duration: 0.3,
              stiffness: 300,
              damping: 30
            }}
            className={cn(
              'relative w-full mx-4 rounded-xl shadow-2xl overflow-hidden',
              'bg-background border border-border',
              'transition-colors duration-300',
              sizeClasses[size],
              className
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header com título e botão de fechar */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between p-6 pb-0">
                <div>
                  {title && (
                    <h2 className="text-xl font-semibold text-foreground">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {description}
                    </p>
                  )}
                </div>
                {showCloseButton && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}

            {/* Conteúdo do modal */}
            <div className={cn(
              "p-6",
              (title || showCloseButton) && "pt-4"
            )}>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Hook para facilitar o uso
export function useModal(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  const toggleModal = () => setIsOpen(!isOpen)

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal
  }
}
