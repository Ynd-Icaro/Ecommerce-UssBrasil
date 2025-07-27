'use client';

import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';

export interface Order {
  id: string;
  number: string;
  customer: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: Array<{
    id: string;
    productId: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  totalOrders: number;
  totalSpent: number;
  isVip: boolean;
  lastOrderDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  brand: string;
  sku: string;
  stock: number;
  images: {
    main: string;
    gallery: string[];
  };
  status: 'active' | 'inactive' | 'out_of_stock';
  isNew: boolean;
  isFeatured: boolean;
  colors?: Array<{
    name: string;
    code: string;
  }>;
  storage?: string[];
  specifications: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

// Mock data
const mockOrders: Order[] = [
  {
    id: '1',
    number: 'ORD-001',
    customer: {
      id: '1',
      name: 'João Silva',
      email: 'joao@email.com',
      avatar: 'https://avatar.vercel.sh/joao'
    },
    status: 'processing',
    items: [
      {
        id: '1',
        productId: '1',
        name: 'iPhone 16 Pro',
        image: '/Imagens/iphone-16-pro.png',
        quantity: 1,
        price: 8999
      }
    ],
    total: 8999,
    shippingAddress: {
      street: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567'
    },
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    number: 'ORD-002',
    customer: {
      id: '2',
      name: 'Maria Santos',
      email: 'maria@email.com',
      avatar: 'https://avatar.vercel.sh/maria'
    },
    status: 'shipped',
    items: [
      {
        id: '2',
        productId: '2',
        name: 'MacBook Pro',
        image: '/Imagens/macbook-pro.png',
        quantity: 1,
        price: 15999
      }
    ],
    total: 15999,
    shippingAddress: {
      street: 'Av. Paulista, 456',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100'
    },
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-15T09:45:00Z'
  }
];

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '+55 11 99999-9999',
    avatar: 'https://avatar.vercel.sh/joao',
    address: {
      street: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      country: 'Brasil'
    },
    totalOrders: 5,
    totalSpent: 25000,
    isVip: true,
    lastOrderDate: '2024-01-15T10:30:00Z',
    createdAt: '2023-06-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@email.com',
    phone: '+55 11 88888-8888',
    avatar: 'https://avatar.vercel.sh/maria',
    address: {
      street: 'Av. Paulista, 456',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100',
      country: 'Brasil'
    },
    totalOrders: 3,
    totalSpent: 18000,
    isVip: false,
    lastOrderDate: '2024-01-14T14:20:00Z',
    createdAt: '2023-08-20T15:45:00Z',
    updatedAt: '2024-01-14T14:20:00Z'
  }
];

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 16 Pro',
    description: 'O mais avançado iPhone com tecnologia Pro',
    price: 8999,
    originalPrice: 9999,
    category: 'Smartphones',
    subcategory: 'iPhone',
    brand: 'Apple',
    sku: 'IPH16P-256-TB',
    stock: 25,
    images: {
      main: '/Imagens/iphone-16-pro.png',
      gallery: ['/Imagens/iphone-16-pro-1.png', '/Imagens/iphone-16-pro-2.png']
    },
    status: 'active',
    isNew: true,
    isFeatured: true,
    colors: [
      { name: 'Titânio Azul', code: '#4A90E2' },
      { name: 'Titânio Preto', code: '#2C3E50' }
    ],
    storage: ['256GB', '512GB', '1TB'],
    specifications: {
      'Tela': '6.3 polegadas',
      'Processador': 'A18 Pro',
      'Câmera': '48MP + 12MP + 12MP'
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  }
];

export const useAdminCrud = <T extends Order | Customer | Product>(type: 'orders' | 'customers' | 'products') => {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simula carregamento inicial dos dados
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      switch (type) {
        case 'orders':
          setItems(mockOrders as T[]);
          break;
        case 'customers':
          setItems(mockCustomers as T[]);
          break;
        case 'products':
          setItems(mockProducts as T[]);
          break;
      }
      setLoading(false);
    }, 1000);
  }, [type]);

  const create = useCallback(async (item: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    try {
      // Simula API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newItem = {
        ...item,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } as T;

      setItems(prev => [newItem, ...prev]);
      toast.success(`${type.slice(0, -1)} criado com sucesso!`);
      return newItem;
    } catch (err) {
      const message = `Erro ao criar ${type.slice(0, -1)}`;
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [type]);

  const update = useCallback(async (id: string, updates: Partial<T>) => {
    setLoading(true);
    try {
      // Simula API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setItems(prev => prev.map(item => 
        item.id === id 
          ? { ...item, ...updates, updatedAt: new Date().toISOString() }
          : item
      ));
      
      toast.success(`${type.slice(0, -1)} atualizado com sucesso!`);
    } catch (err) {
      const message = `Erro ao atualizar ${type.slice(0, -1)}`;
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [type]);

  const remove = useCallback(async (id: string) => {
    setLoading(true);
    try {
      // Simula API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setItems(prev => prev.filter(item => item.id !== id));
      toast.success(`${type.slice(0, -1)} removido com sucesso!`);
    } catch (err) {
      const message = `Erro ao remover ${type.slice(0, -1)}`;
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [type]);

  const getById = useCallback((id: string) => {
    return items.find(item => item.id === id);
  }, [items]);

  return {
    items,
    loading,
    error,
    create,
    update,
    remove,
    getById,
    setItems,
    setError
  };
};
