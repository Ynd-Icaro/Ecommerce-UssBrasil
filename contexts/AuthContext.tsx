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

interface Address {
  id: string
  label: string
  street: string
  number?: string
  city: string
  state: string
  zip: string
  complement?: string
  default?: boolean
}

interface PaymentMethod {
  id: string
  brand: string
  last4: string
  holder: string
  exp: string
  default?: boolean
  type?: 'card' | 'pix' | 'boleto'
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
  addresses: Address[]
  paymentMethods: PaymentMethod[]
  
  // Actions
  login: (email: string, name?: string) => void
  logout: () => void
  toggleFavorite: (id: string) => void
  addOrder: (items: OrderItem[]) => Order
  updateOrderStatus: (orderId: string, status: string) => void
  addAddress: (address: Omit<Address, 'id'>) => Address
  removeAddress: (id: string) => void
  setDefaultAddress: (id: string) => void
  addPaymentMethod: (pm: Omit<PaymentMethod, 'id'>) => PaymentMethod
  removePaymentMethod: (id: string) => void
  setDefaultPayment: (id: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const STORAGE_KEY = 'ubr_session_v1'

interface PersistShape { 
  user: UserProfile | null
  favorites: string[]
  orders: Order[]
  addresses: Address[]
  paymentMethods: PaymentMethod[]
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [addresses, setAddresses] = useState<Address[]>([])
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed: PersistShape = JSON.parse(raw)
        setUser(parsed.user)
        setFavorites(parsed.favorites || [])
  setOrders(parsed.orders || [])
  setAddresses(parsed.addresses || [])
  setPaymentMethods(parsed.paymentMethods || [])
      }
    } catch (e) { 
      console.warn('session load fail', e) 
    }
  }, [])

  // Persist to localStorage
  useEffect(() => {
    const data: PersistShape = { user, favorites, orders, addresses, paymentMethods }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [user, favorites, orders, addresses, paymentMethods])

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

  const updateOrderStatus = (orderId: string, status: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o))
  }

  // Address management
  const addAddress = (address: Omit<Address, 'id'>): Address => {
    const newAddress: Address = { id: crypto.randomUUID(), ...address }
    setAddresses(prev => {
      let updated = [...prev]
      if (newAddress.default) {
        updated = updated.map(a => ({ ...a, default: false }))
      }
      return [newAddress, ...updated]
    })
    return newAddress
  }
  const removeAddress = (id: string) => setAddresses(prev => prev.filter(a => a.id !== id))
  const setDefaultAddress = (id: string) => setAddresses(prev => prev.map(a => ({ ...a, default: a.id === id })))

  // Payment methods
  const addPaymentMethod = (pm: Omit<PaymentMethod, 'id'>): PaymentMethod => {
    const newPm: PaymentMethod = { id: crypto.randomUUID(), ...pm }
    setPaymentMethods(prev => {
      let updated = [...prev]
      if (newPm.default) updated = updated.map(p => ({ ...p, default: false }))
      return [newPm, ...updated]
    })
    return newPm
  }
  const removePaymentMethod = (id: string) => setPaymentMethods(prev => prev.filter(p => p.id !== id))
  const setDefaultPayment = (id: string) => setPaymentMethods(prev => prev.map(p => ({ ...p, default: p.id === id })))

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
  addresses,
  paymentMethods,
    
    // Actions
    login,
    logout,
    toggleFavorite,
    addOrder
  , updateOrderStatus,
  addAddress, removeAddress, setDefaultAddress,
  addPaymentMethod, removePaymentMethod, setDefaultPayment
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
