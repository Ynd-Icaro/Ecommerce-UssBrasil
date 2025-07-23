import { create } from 'zustand'

interface User {
  id: string
  email: string
  name?: string
  role: string
  image?: string
}

interface AuthStore {
  user: User | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,
  
  setUser: (user) => {
    set({ user, isLoading: false })
  },
  
  setLoading: (isLoading) => {
    set({ isLoading })
  },
  
  logout: () => {
    set({ user: null, isLoading: false })
  }
}))
