"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { ReactNode } from "react"

// Animação para fade in/out
export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.3,
}: { children: ReactNode; delay?: number; duration?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    {children}
  </motion.div>
)

// Animação para slide in/out
export const SlideIn = ({
  children,
  direction = "left",
  delay = 0,
}: { children: ReactNode; direction?: "left" | "right" | "up" | "down"; delay?: number }) => {
  const variants = {
    left: { x: -50, opacity: 0 },
    right: { x: 50, opacity: 0 },
    up: { y: -50, opacity: 0 },
    down: { y: 50, opacity: 0 },
  }

  return (
    <motion.div
      initial={variants[direction]}
      animate={{ x: 0, y: 0, opacity: 1 }}
      exit={variants[direction]}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

// Animação para scale
export const ScaleIn = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.8, opacity: 0 }}
    transition={{ duration: 0.3, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    {children}
  </motion.div>
)

// Animação para stagger (elementos em sequência)
export const StaggerContainer = ({ children, staggerDelay = 0.1 }: { children: ReactNode; staggerDelay?: number }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    exit="hidden"
    variants={{
      visible: {
        transition: {
          staggerChildren: staggerDelay,
        },
      },
    }}
  >
    {children}
  </motion.div>
)

export const StaggerItem = ({ children }: { children: ReactNode }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }}
    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    {children}
  </motion.div>
)

// Animação para hover
export const HoverScale = ({ children, scale = 1.05 }: { children: ReactNode; scale?: number }) => (
  <motion.div
    whileHover={{ scale }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    {children}
  </motion.div>
)

// Animação para loading
export const LoadingSpinner = () => (
  <motion.div
    className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full"
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
  />
)

// Animação para notificações
export const NotificationSlide = ({ children, isVisible }: { children: ReactNode; isVisible: boolean }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-4 right-4 z-50"
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
)

// Animação para modal
export const ModalOverlay = ({ children, isOpen }: { children: ReactNode; isOpen: boolean }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
)

// Animação para filtros
export const FilterTransition = ({ children, isVisible }: { children: ReactNode; isVisible: boolean }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="overflow-hidden"
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
)

// Animação para contador
export const CounterAnimation = ({ value }: { value: number }) => (
  <motion.span
    key={value}
    initial={{ scale: 1.2, color: "#007AFF" }}
    animate={{ scale: 1, color: "#000000" }}
    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    {value}
  </motion.span>
)

// Animação para progresso
export const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
    <motion.div
      className="h-full bg-blue-600 rounded-full"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    />
  </div>
)
