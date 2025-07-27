import { useEffect, useState, useCallback } from 'react'
import { toast } from 'sonner'

const API_BASE_URL = 'http://localhost:3003'

// Mock data para fallback quando API não estiver disponível
const mockData = {
  products: [
    {
      id: '1',
      name: 'iPhone 16 Pro',
      description: 'O mais avançado iPhone da Apple',
      price: 7999.00,
      originalPrice: 8999.00,
      category: 'smartphones',
      brand: 'Apple',
      image: '/Imagens/Iphone 16 Pro.png',
      images: ['/Imagens/Iphone 16 Pro.png'],
      stock: 15,
      featured: true,
      rating: 4.9,
      reviews: 248,
      sales: 145,
      specifications: {
        screen: '6.3 polegadas',
        processor: 'A18 Pro',
        storage: '256GB',
        camera: '48MP'
      }
    },
    {
      id: '2',
      name: 'MacBook Pro M4',
      description: 'Desempenho profissional para criadores',
      price: 18999.00,
      originalPrice: 21999.00,
      category: 'laptops',
      brand: 'Apple',
      image: '/Imagens/Macbook Pro.png',
      images: ['/Imagens/Macbook Pro.png'],
      stock: 8,
      featured: true,
      rating: 4.8,
      reviews: 156,
      sales: 89,
      specifications: {
        screen: '14 polegadas',
        processor: 'M4 Pro',
        memory: '16GB',
        storage: '512GB SSD'
      }
    },
    {
      id: '3',
      name: 'AirPods Pro 2',
      description: 'Áudio premium com cancelamento ativo de ruído',
      price: 2199.00,
      originalPrice: 2499.00,
      category: 'acessorios',
      brand: 'Apple',
      image: '/Imagens/Air Pods Pro 2.png',
      images: ['/Imagens/Air Pods Pro 2.png'],
      stock: 25,
      featured: true,
      rating: 4.7,
      reviews: 389,
      sales: 234,
      specifications: {
        battery: '6 horas + case',
        connectivity: 'Bluetooth 5.3',
        features: 'Cancelamento ativo',
        compatibility: 'iOS/Android'
      }
    },
    {
      id: '4',
      name: 'Apple Watch Ultra 2',
      description: 'O relógio mais resistente da Apple',
      price: 7199.00,
      originalPrice: 7999.00,
      category: 'smartwatches',
      brand: 'Apple',
      image: '/Imagens/Watch Ultra 2.png',
      images: ['/Imagens/Watch Ultra 2.png'],
      stock: 12,
      featured: false,
      rating: 4.6,
      reviews: 127,
      sales: 67,
      specifications: {
        display: '49mm',
        battery: '36 horas',
        resistance: 'À água até 100m',
        gps: 'Dual frequency'
      }
    },
    {
      id: '5',
      name: 'iPad Pro M4',
      description: 'Tablet profissional com chip M4',
      price: 9999.00,
      originalPrice: 11999.00,
      category: 'tablets',
      brand: 'Apple',
      image: '/Imagens/Ipad Pro.png',
      images: ['/Imagens/Ipad Pro.png'],
      stock: 18,
      featured: true,
      rating: 4.8,
      reviews: 203,
      sales: 112,
      specifications: {
        screen: '12.9 polegadas',
        processor: 'M4',
        storage: '256GB',
        connectivity: 'Wi-Fi + Cellular'
      }
    }
  ],
  orders: [
    {
      id: 'ORD-001',
      customerName: 'João Silva',
      customerEmail: 'joao@email.com',
      total: 7999.00,
      status: 'delivered',
      createdAt: '2024-01-15T10:30:00Z',
      items: [
        { productId: '1', productName: 'iPhone 16 Pro', quantity: 1, price: 7999.00 }
      ]
    },
    {
      id: 'ORD-002',
      customerName: 'Maria Santos',
      customerEmail: 'maria@email.com',
      total: 21198.00,
      status: 'shipped',
      createdAt: '2024-01-14T15:45:00Z',
      items: [
        { productId: '2', productName: 'MacBook Pro M4', quantity: 1, price: 18999.00 },
        { productId: '3', productName: 'AirPods Pro 2', quantity: 1, price: 2199.00 }
      ]
    },
    {
      id: 'ORD-003',
      customerName: 'Carlos Oliveira',
      customerEmail: 'carlos@email.com',
      total: 2199.00,
      status: 'pending',
      createdAt: '2024-01-13T09:20:00Z',
      items: [
        { productId: '3', productName: 'AirPods Pro 2', quantity: 1, price: 2199.00 }
      ]
    },
    {
      id: 'ORD-004',
      customerName: 'Ana Costa',
      customerEmail: 'ana@email.com',
      total: 17198.00,
      status: 'delivered',
      createdAt: '2024-01-12T14:15:00Z',
      items: [
        { productId: '5', productName: 'iPad Pro M4', quantity: 1, price: 9999.00 },
        { productId: '4', productName: 'Apple Watch Ultra 2', quantity: 1, price: 7199.00 }
      ]
    },
    {
      id: 'ORD-005',
      customerName: 'Pedro Lima',
      customerEmail: 'pedro@email.com',
      total: 4398.00,
      status: 'cancelled',
      createdAt: '2024-01-11T11:30:00Z',
      items: [
        { productId: '3', productName: 'AirPods Pro 2', quantity: 2, price: 2199.00 }
      ]
    }
  ],
  customers: [
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@email.com',
      phone: '(11) 99999-9999',
      totalOrders: 3,
      totalSpent: 15998.00,
      createdAt: '2023-12-01T00:00:00Z',
      status: 'active'
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria@email.com',
      phone: '(11) 88888-8888',
      totalOrders: 2,
      totalSpent: 21198.00,
      createdAt: '2023-11-15T00:00:00Z',
      status: 'active'
    },
    {
      id: '3',
      name: 'Carlos Oliveira',
      email: 'carlos@email.com',
      phone: '(11) 77777-7777',
      totalOrders: 1,
      totalSpent: 2199.00,
      createdAt: '2024-01-10T00:00:00Z',
      status: 'active'
    },
    {
      id: '4',
      name: 'Ana Costa',
      email: 'ana@email.com',
      phone: '(11) 66666-6666',
      totalOrders: 4,
      totalSpent: 35000.00,
      createdAt: '2023-10-20T00:00:00Z',
      status: 'vip'
    },
    {
      id: '5',
      name: 'Pedro Lima',
      email: 'pedro@email.com',
      phone: '(11) 55555-5555',
      totalOrders: 1,
      totalSpent: 0,
      createdAt: '2024-01-05T00:00:00Z',
      status: 'inactive'
    }
  ]
}

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
      console.warn(`API não disponível para ${endpoint}, usando dados mock`)
      // Fallback para dados mock se não conseguir conectar com a API
      const mockEndpointData = mockData[endpoint as keyof typeof mockData] || []
      setData(mockEndpointData as T[])
      setError(null) // Não considerar como erro se conseguimos fallback
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
        method: 'PATCH',
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
      
      // Aplicar tema ao documento
      document.documentElement.classList.toggle('dark', theme === 'dark')
      
      toast.success(`Tema ${theme === 'dark' ? 'escuro' : 'claro'} ativado!`)
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
