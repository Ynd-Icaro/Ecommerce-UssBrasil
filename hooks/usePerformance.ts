import { useState, useEffect, useCallback } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export function useThrottle<T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number
) {
  const [lastCall, setLastCall] = useState<number>(0)

  return useCallback(
    (...args: T) => {
      const now = new Date().getTime()
      if (now - lastCall < delay) {
        return
      }
      setLastCall(now)
      return callback(...args)
    },
    [callback, delay, lastCall]
  )
}

export function useLazyLoad(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false)
  const [elementRef, setElementRef] = useState<Element | null>(null)

  useEffect(() => {
    if (!elementRef) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(elementRef)
        }
      },
      { threshold }
    )

    observer.observe(elementRef)

    return () => {
      observer.disconnect()
    }
  }, [elementRef, threshold])

  return { isVisible, setElementRef }
}
