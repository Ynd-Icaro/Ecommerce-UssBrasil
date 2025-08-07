'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  previousValue?: string | number
  icon?: React.ReactNode
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  description?: string
  className?: string
}

export default function StatCard({
  title,
  value,
  previousValue,
  icon,
  trend,
  trendValue,
  description,
  className = ''
}: StatCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />
      case 'neutral':
        return <Minus className="h-4 w-4 text-gray-400" />
      default:
        return null
    }
  }

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-500'
      case 'down':
        return 'text-red-500'
      case 'neutral':
        return 'text-gray-400'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-[#0C1A33]/90 backdrop-blur-sm border border-[#0E7466]/30 rounded-xl p-3 lg:p-6 
                  hover:bg-[#0C1A33]/95 hover:border-[#0E7466]/50 transition-all duration-300 
                  shadow-lg hover:shadow-xl ${className}`}
    >
      <div className="flex items-center justify-between mb-2 lg:mb-4">
        <div className="text-gray-400 text-xs lg:text-sm font-medium uppercase tracking-wider">
          {title}
        </div>
        {icon && (
          <div className="p-1.5 lg:p-2 bg-[#0E7466]/20 rounded-lg text-[#0E7466]">
            {icon}
          </div>
        )}
      </div>

      <div className="space-y-1 lg:space-y-2">
        <div className="text-xl lg:text-3xl font-bold text-white">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>

        {(trend || trendValue) && (
          <div className="flex items-center space-x-1 lg:space-x-2">
            {getTrendIcon()}
            <span className={`text-xs lg:text-sm font-medium ${getTrendColor()}`}>
              {trendValue}
            </span>
            {previousValue && (
              <span className="text-gray-500 text-xs lg:text-sm">
                vs {typeof previousValue === 'number' ? previousValue.toLocaleString() : previousValue}
              </span>
            )}
          </div>
        )}

        {description && (
          <p className="text-gray-400 text-xs lg:text-sm mt-1 lg:mt-2">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  )
}
