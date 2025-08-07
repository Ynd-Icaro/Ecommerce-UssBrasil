'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LucideIcon } from 'lucide-react'

interface NavigationItem {
  name: string
  href: string
  icon: LucideIcon
  description?: string
  badge?: string | number
}

interface AdminNavigationProps {
  items: NavigationItem[]
  collapsed?: boolean
}

export default function AdminNavigation({ items, collapsed = false }: AdminNavigationProps) {
  const pathname = usePathname()

  return (
    <nav className="flex-1 space-y-2 px-4">
      {items.map((item) => {
        const isActive = pathname === item.href
        
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`
              relative flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200
              ${isActive 
                ? 'bg-[#0E7466]/20 text-[#0E7466] border border-[#0E7466]/30' 
                : 'text-gray-300 hover:text-white hover:bg-white/10'
              }
              ${collapsed ? 'justify-center' : 'justify-start'}
            `}
          >
            {/* Active indicator */}
            {isActive && (
              <motion.div
                layoutId="admin-nav-indicator"
                className="absolute left-0 top-0 bottom-0 w-1 bg-[#0E7466] rounded-r-full"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}

            {/* Icon */}
            <item.icon className={`w-5 h-5 ${collapsed ? '' : 'mr-3'} flex-shrink-0`} />
            
            {/* Text content */}
            {!collapsed && (
              <>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="ml-2 px-2 py-0.5 text-xs bg-[#0E7466]/20 text-[#0E7466] rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {item.description}
                    </p>
                  )}
                </div>
              </>
            )}

            {/* Tooltip for collapsed state */}
            {collapsed && (
              <div className="absolute left-16 bg-[#0C1A33] text-white px-3 py-2 rounded-lg text-sm
                            opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none
                            border border-[#0E7466]/30 z-50">
                <div className="font-medium">{item.name}</div>
                {item.description && (
                  <div className="text-xs text-gray-400 mt-1">{item.description}</div>
                )}
              </div>
            )}
          </Link>
        )
      })}
    </nav>
  )
}
