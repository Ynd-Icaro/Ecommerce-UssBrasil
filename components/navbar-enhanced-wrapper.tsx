'use client'

import { Suspense } from 'react'
import NavbarEnhancedContent from './navbar-enhanced-content'

function LoadingNavbar() {
  return (
    <nav className="bg-white dark:bg-uss-gray-800 shadow-sm border-b border-uss-gray-200 dark:border-uss-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="w-32 h-8 bg-uss-gray-200 animate-pulse rounded"></div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-uss-gray-200 animate-pulse rounded-full"></div>
            <div className="w-8 h-8 bg-uss-gray-200 animate-pulse rounded-full"></div>
            <div className="w-8 h-8 bg-uss-gray-200 animate-pulse rounded-full"></div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default function NavbarEnhanced() {
  return (
    <Suspense fallback={<LoadingNavbar />}>
      <NavbarEnhancedContent />
    </Suspense>
  )
}
