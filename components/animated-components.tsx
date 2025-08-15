"use client"

import type { ReactNode } from "react"

// Componentes de animação simplificados (usando CSS puro)
export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.3,
}: {
  children: ReactNode
  delay?: number
  duration?: number
}) => (
  <div 
    className="opacity-0 animate-fade-in" 
    style={{ 
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      animationFillMode: 'forwards'
    }}
  >
    {children}
  </div>
)

export const SlideUp = ({
  children,
  delay = 0,
}: {
  children: ReactNode
  delay?: number
}) => (
  <div 
    className="transform translate-y-4 opacity-0 animate-slide-up" 
    style={{ 
      animationDelay: `${delay}s`,
      animationFillMode: 'forwards'
    }}
  >
    {children}
  </div>
)

export const ScaleIn = ({
  children,
  delay = 0,
}: {
  children: ReactNode
  delay?: number
}) => (
  <div 
    className="transform scale-95 opacity-0 animate-scale-in" 
    style={{ 
      animationDelay: `${delay}s`,
      animationFillMode: 'forwards'
    }}
  >
    {children}
  </div>
)

export const SlideIn = ({
  children,
  direction = "left",
  delay = 0,
}: {
  children: ReactNode
  direction?: "left" | "right" | "up" | "down"
  delay?: number
}) => {
  const directionClasses = {
    left: "transform -translate-x-4 opacity-0 animate-slide-left",
    right: "transform translate-x-4 opacity-0 animate-slide-right",
    up: "transform -translate-y-4 opacity-0 animate-slide-up",
    down: "transform translate-y-4 opacity-0 animate-slide-down"
  }

  return (
    <div 
      className={directionClasses[direction]}
      style={{ 
        animationDelay: `${delay}s`,
        animationFillMode: 'forwards'
      }}
    >
      {children}
    </div>
  )
}

export const BouncIn = ({
  children,
  delay = 0,
}: {
  children: ReactNode
  delay?: number
}) => (
  <div 
    className="transform scale-75 opacity-0 animate-bounce-in" 
    style={{ 
      animationDelay: `${delay}s`,
      animationFillMode: 'forwards'
    }}
  >
    {children}
  </div>
)

export const RotateIn = ({
  children,
  delay = 0,
}: {
  children: ReactNode
  delay?: number
}) => (
  <div 
    className="transform -rotate-12 opacity-0 animate-rotate-in" 
    style={{ 
      animationDelay: `${delay}s`,
      animationFillMode: 'forwards'
    }}
  >
    {children}
  </div>
)

export const FlipIn = ({
  children,
  delay = 0,
}: {
  children: ReactNode
  delay?: number
}) => (
  <div 
    className="transform perspective-1000 rotateY-90 opacity-0 animate-flip-in" 
    style={{ 
      animationDelay: `${delay}s`,
      animationFillMode: 'forwards'
    }}
  >
    {children}
  </div>
)

export const StaggerContainer = ({ children }: { children: ReactNode }) => (
  <div className="stagger-container">
    {children}
  </div>
)

export const StaggerItem = ({ 
  children, 
  index = 0 
}: { 
  children: ReactNode
  index?: number 
}) => (
  <div 
    className="opacity-0 animate-fade-in" 
    style={{ 
      animationDelay: `${index * 0.1}s`,
      animationFillMode: 'forwards'
    }}
  >
    {children}
  </div>
)

export const FloatingElement = ({ children }: { children: ReactNode }) => (
  <div className="animate-float">
    {children}
  </div>
)

export const PulseElement = ({ children }: { children: ReactNode }) => (
  <div className="animate-pulse">
    {children}
  </div>
)

export const PageTransition = ({ children }: { children: ReactNode }) => (
  <div className="opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
    {children}
  </div>
)

export const ModalTransition = ({ 
  children, 
  isOpen 
}: { 
  children: ReactNode
  isOpen: boolean 
}) => (
  <>
    {isOpen && (
      <div className="opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
        {children}
      </div>
    )}
  </>
)

export const CardHover = ({ children }: { children: ReactNode }) => (
  <div className="transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
    {children}
  </div>
)
