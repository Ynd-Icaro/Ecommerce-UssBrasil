'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  actualTheme: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system')
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    // Carrega tema do localStorage na inicialização
    const savedTheme = localStorage.getItem('uss-theme') as Theme | null
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    // Determina o tema atual baseado na preferência
    const determineActualTheme = () => {
      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        setActualTheme(systemTheme)
      } else {
        setActualTheme(theme)
      }
    }

    determineActualTheme()

    // Escuta mudanças na preferência do sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme === 'system') {
        determineActualTheme()
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  useEffect(() => {
    // Aplica o tema ao document
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(actualTheme)

    // Salva no localStorage
    localStorage.setItem('uss-theme', theme)

    // Sincroniza entre abas usando storage event
    const syncTheme = (e: StorageEvent) => {
      if (e.key === 'uss-theme' && e.newValue) {
        const newTheme = e.newValue as Theme
        if (['light', 'dark', 'system'].includes(newTheme)) {
          setTheme(newTheme)
        }
      }
    }

    window.addEventListener('storage', syncTheme)
    return () => window.removeEventListener('storage', syncTheme)
  }, [actualTheme, theme])

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme)
  }
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
