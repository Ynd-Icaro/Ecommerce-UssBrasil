'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface USSThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  isDark: boolean
  isLight: boolean
}

const USSThemeContext = createContext<USSThemeContextType | undefined>(undefined)

export function USSThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Verificar tema salvo no localStorage
    const savedTheme = localStorage.getItem('uss-theme') as Theme
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme)
    } else {
      // Detectar preferência do sistema
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(isDarkMode ? 'dark' : 'light')
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    // Aplicar tema ao document
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
    
    // Salvar no localStorage
    localStorage.setItem('uss-theme', theme)
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const value: USSThemeContextType = {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  }

  // Evitar hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-white">
        {children}
      </div>
    )
  }

  return (
    <USSThemeContext.Provider value={value}>
      {children}
    </USSThemeContext.Provider>
  )
}

export function useUSSTheme() {
  const context = useContext(USSThemeContext)
  if (!context) {
    throw new Error('useUSSTheme must be used within a USSThemeProvider')
  }
  return context
}
