'use client'

import { useEffect } from 'react'

export function useModalLock(isOpen: boolean) {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden'
      document.body.style.height = '100vh'
      
      // Add modal class for additional styling
      document.body.classList.add('modal-open')
      
      return () => {
        // Restore body scroll
        document.body.style.overflow = ''
        document.body.style.height = ''
        document.body.classList.remove('modal-open')
      }
    }
  }, [isOpen])
}

export function useModalPosition() {
  useEffect(() => {
    const handleResize = () => {
      // Force repaint on resize to ensure proper positioning
      const modals = document.querySelectorAll('.modal-overlay')
      modals.forEach(modal => {
        const element = modal as HTMLElement
        element.style.display = 'none'
        element.offsetHeight // Force reflow
        element.style.display = 'flex'
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
}
