'use client'

import { motion } from 'framer-motion'
import { ChevronRight, Plus, Filter, Search } from 'lucide-react'

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: { label: string; href?: string }[]
  actions?: React.ReactNode
  showSearch?: boolean
  onSearch?: (query: string) => void
  searchPlaceholder?: string
}

export default function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  showSearch = false,
  onSearch,
  searchPlaceholder = "Buscar..."
}: PageHeaderProps) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="mb-4 lg:mb-8"
    >
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center space-x-2 text-xs lg:text-sm text-gray-400 mb-3 lg:mb-4">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center space-x-2">
              {index > 0 && <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4" />}
              {crumb.href ? (
                <a 
                  href={crumb.href}
                  className="hover:text-[#0E7466] transition-colors"
                >
                  {crumb.label}
                </a>
              ) : (
                <span className={index === breadcrumbs.length - 1 ? 'text-white' : ''}>
                  {crumb.label}
                </span>
              )}
            </div>
          ))}
        </nav>
      )}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
        {/* Title and Description */}
        <div>
          <h1 className="text-xl lg:text-3xl font-bold text-white mb-1 lg:mb-2">
            {title}
          </h1>
          {description && (
            <p className="text-gray-400 text-sm lg:text-lg">
              {description}
            </p>
          )}
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 lg:gap-4">
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 lg:w-5 lg:h-5" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                onChange={(e) => onSearch?.(e.target.value)}
                className="pl-8 lg:pl-10 pr-3 lg:pr-4 py-2 lg:py-2.5 bg-[#0C1A33]/50 border border-[#0E7466]/30 rounded-xl 
                          text-white text-sm lg:text-base placeholder-gray-400 focus:outline-none focus:border-[#0E7466] 
                          focus:ring-2 focus:ring-[#0E7466]/20 transition-all w-full sm:w-48 lg:w-64"
              />
            </div>
          )}
          
          {actions && (
            <div className="flex items-center gap-2 lg:gap-3 overflow-x-auto">
              {actions}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
