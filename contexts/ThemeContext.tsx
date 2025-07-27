'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  // Carregar tema do localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('uss-brasil-theme') as Theme
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      // Detectar preferência do sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    }
    setMounted(true)
  }, [])

  // Aplicar tema ao HTML
  useEffect(() => {
    if (mounted) {
      const root = document.documentElement
      root.classList.remove('light', 'dark')
      root.classList.add(theme)
      localStorage.setItem('uss-brasil-theme', theme)
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const setThemeValue = (newTheme: Theme) => {
    setTheme(newTheme)
  }

  // Evitar hidration mismatch
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>
  }

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme, 
      setTheme: setThemeValue 
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
