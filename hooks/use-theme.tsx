'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useAPI } from '@/hooks/use-api'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const { data: settings, update } = useAPI<any>('settings')

  useEffect(() => {
    // Carregar tema salvo
    if (settings.length > 0) {
      const savedTheme = settings.find((s: any) => s.key === 'theme')
      if (savedTheme) {
        setTheme(savedTheme.value)
      }
    }
  }, [settings])

  useEffect(() => {
    // Aplicar tema no HTML
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
  }, [theme])

  const handleSetTheme = async (newTheme: Theme) => {
    setTheme(newTheme)
    
    // Salvar no json-server
    const existingTheme = settings.find((s: any) => s.key === 'theme')
    if (existingTheme) {
      await update(existingTheme.id, { ...existingTheme, value: newTheme })
    } else {
      // Criar nova configuração
      await fetch('http://localhost:3001/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: 'theme',
          value: newTheme,
          label: 'Tema da Aplicação'
        })
      })
    }
  }

  const toggleTheme = () => {
    handleSetTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme, toggleTheme }}>
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
