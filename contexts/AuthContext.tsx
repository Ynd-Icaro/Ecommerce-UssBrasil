"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

interface UserProfile { 
  id: string
  name: string
  email: string
  createdAt: string
  role?: string
  image?: string
}

interface OrderItem { 
  productId: string
  name: string
  price: number
  quantity: number
  image: string 
}

interface Order { 
  id: string
  items: OrderItem[]
  total: number
  createdAt: string
  status: string 
}

interface AuthContextType {
  // NextAuth integration
  session: any
  status: 'authenticated' | 'unauthenticated' | 'loading'
  signIn: typeof signIn
  signOut: typeof signOut
  
  // Legacy user management (for non-NextAuth users)
  user: UserProfile | null
  favorites: string[]
  orders: Order[]
  
  // Actions
  login: (email: string, name?: string) => void
  logout: () => void
  toggleFavorite: (id: string) => void
  addOrder: (items: OrderItem[]) => Order
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const STORAGE_KEY = 'ubr_session_v1'

interface PersistShape { 
  user: UserProfile | null
  favorites: string[]
  orders: Order[] 
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [orders, setOrders] = useState<Order[]>([])

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed: PersistShape = JSON.parse(raw)
        setUser(parsed.user)
        setFavorites(parsed.favorites || [])
        setOrders(parsed.orders || [])
      }
    } catch (e) { 
      console.warn('session load fail', e) 
    }
  }, [])

  // Persist to localStorage
  useEffect(() => {
    const data: PersistShape = { user, favorites, orders }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [user, favorites, orders])

  // Sync NextAuth session with local user state
  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      const nextAuthUser: UserProfile = {
        id: session.user.id || crypto.randomUUID(),
        name: session.user.name || 'Usuário',
        email: session.user.email || '',
        createdAt: new Date().toISOString(),
        role: session.user.role,
        image: session.user.image || undefined
      }
      setUser(nextAuthUser)
    } else if (status === 'unauthenticated') {
      // Keep local user if not using NextAuth
      // setUser(null) // Uncomment if you want to clear local user on NextAuth logout
    }
  }, [session, status])

  const login = (email: string, name?: string) => {
    setUser({ 
      id: crypto.randomUUID(), 
      name: name || 'Usuário Teste', 
      email, 
      createdAt: new Date().toISOString() 
    })
  }

  const logout = async () => {
    if (status === 'authenticated') {
      await signOut({ redirect: false })
    }
    setUser(null)
    setFavorites([])
    setOrders([])
  }

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(f => f !== id)
        : [...prev, id]
    )
  }

  const addOrder = (items: OrderItem[]): Order => {
    const order: Order = {
      id: crypto.randomUUID(),
      items,
      total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      createdAt: new Date().toISOString(),
      status: 'pending'
    }
    setOrders(prev => [order, ...prev])
    return order
  }

  const value: AuthContextType = {
    // NextAuth integration
    session,
    status,
    signIn,
    signOut,
    
    // Legacy support
    user: session?.user ? {
      id: session.user.id || crypto.randomUUID(),
      name: session.user.name || 'Usuário',
      email: session.user.email || '',
      createdAt: new Date().toISOString(),
      role: session.user.role,
      image: session.user.image || undefined
    } : user,
    favorites,
    orders,
    
    // Actions
    login,
    logout,
    toggleFavorite,
    addOrder
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Backward compatibility export
export const useUserSession = useAuth
