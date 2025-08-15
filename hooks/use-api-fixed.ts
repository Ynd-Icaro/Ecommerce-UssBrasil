import { useEffect, useState, useCallback } from 'react'
import { toast } from 'sonner'

const API_BASE_URL = '/api'

export function useAPI<T>(endpoint: string) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/${endpoint}`)
      if (!response.ok) throw new Error('Falha ao carregar dados')
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
      // Fallback para dados mock se não conseguir conectar com a API
      setData([])
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const create = async (item: Omit<T, 'id'>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      })
      if (!response.ok) throw new Error('Falha ao criar item')
      const newItem = await response.json()
      setData(prev => [...prev, newItem])
      toast.success('Item criado com sucesso!')
      return newItem
    } catch (err) {
      toast.error('Erro ao criar item')
      throw err
    }
  }

  const update = async (id: string, updates: Partial<T>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })
      if (!response.ok) throw new Error('Falha ao atualizar item')
      const updatedItem = await response.json()
      setData(prev => prev.map(item => 
        (item as any).id === id ? updatedItem : item
      ))
      toast.success('Item atualizado com sucesso!')
      return updatedItem
    } catch (err) {
      toast.error('Erro ao atualizar item')
      throw err
    }
  }

  const remove = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Falha ao deletar item')
      setData(prev => prev.filter(item => (item as any).id !== id))
      toast.success('Item deletado com sucesso!')
    } catch (err) {
      toast.error('Erro ao deletar item')
      throw err
    }
  }

  return {
    data,
    loading,
    error,
    create,
    update,
    remove,
    refresh: fetchData
  }
}

// Hook para configurações gerais (tema, etc.)
export function useSettings() {
  const [settings, setSettings] = useState({ theme: 'light' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/settings`)
        if (!response.ok) throw new Error('Falha ao carregar configurações')
        const result = await response.json()
        setSettings(result)
      } catch (err) {
        // Fallback para configurações padrão se não conseguir conectar
        setSettings({ theme: 'light' })
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const updateTheme = async (theme: 'light' | 'dark') => {
    try {
      const response = await fetch(`${API_BASE_URL}/settings`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme })
      })
      if (!response.ok) throw new Error('Falha ao atualizar tema')
      const updatedSettings = await response.json()
      setSettings(updatedSettings)
      toast.success('Tema atualizado!')
    } catch (err) {
      toast.error('Erro ao atualizar tema')
    }
  }

  return {
    settings,
    loading,
    updateTheme
  }
}
