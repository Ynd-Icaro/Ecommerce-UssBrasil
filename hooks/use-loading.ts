'use client'

import { useState, useCallback } from 'react'

interface UseLoadingState {
  isLoading: boolean
  startLoading: () => void
  stopLoading: () => void
  withLoading: <T>(asyncFn: () => Promise<T>) => Promise<T>
}

export function useLoading(initialState = false): UseLoadingState {
  const [isLoading, setIsLoading] = useState(initialState)

  const startLoading = useCallback(() => {
    setIsLoading(true)
  }, [])

  const stopLoading = useCallback(() => {
    setIsLoading(false)
  }, [])

  const withLoading = useCallback(async <T>(asyncFn: () => Promise<T>): Promise<T> => {
    setIsLoading(true)
    try {
      const result = await asyncFn()
      return result
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    isLoading,
    startLoading,
    stopLoading,
    withLoading
  }
}

// Hook para múltiplos estados de loading
export function useMultipleLoading() {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})

  const setLoading = useCallback((key: string, isLoading: boolean) => {
    setLoadingStates(prev => ({
      ...prev,
      [key]: isLoading
    }))
  }, [])

  const isLoading = useCallback((key: string) => {
    return loadingStates[key] || false
  }, [loadingStates])

  const withLoading = useCallback(async <T>(
    key: string, 
    asyncFn: () => Promise<T>
  ): Promise<T> => {
    setLoading(key, true)
    try {
      const result = await asyncFn()
      return result
    } finally {
      setLoading(key, false)
    }
  }, [setLoading])

  return {
    loadingStates,
    setLoading,
    isLoading,
    withLoading
  }
}

// Hook para timeout de loading
export function useLoadingTimeout(timeout = 30000) {
  const { isLoading, startLoading, stopLoading, withLoading } = useLoading()

  const withTimeoutLoading = useCallback(async <T>(
    asyncFn: () => Promise<T>
  ): Promise<T> => {
    return withLoading(async () => {
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Operação timeout')), timeout)
      })

      return Promise.race([asyncFn(), timeoutPromise])
    })
  }, [withLoading, timeout])

  return {
    isLoading,
    startLoading,
    stopLoading,
    withLoading: withTimeoutLoading
  }
}
