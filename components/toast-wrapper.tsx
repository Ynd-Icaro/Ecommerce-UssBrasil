'use client'

import { Toaster } from 'sonner'

export default function ToastWrapper() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#363636',
          color: '#fff',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: '500',
        },
        success: {
          style: {
            background: '#059669',
            color: '#fff',
          },
        },
        error: {
          style: {
            background: '#dc2626',
            color: '#fff',
          },
        },
      }}
    />
  )
}
