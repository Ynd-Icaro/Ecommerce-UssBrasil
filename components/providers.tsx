'use client'

import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#ffffff',
            color: '#1f2937',
            border: '1px solid #e5e7eb',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
          success: {
            style: {
              background: '#00CED1',
              color: '#fff',
              border: '1px solid #00CED1',
            },
          },
          error: {
            style: {
              background: '#ef4444',
              color: '#fff',
              border: '1px solid #ef4444',
            },
          },
        }}
      />
    </SessionProvider>
  )
}
