import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface AnalyticsCardProps {
  title: string
  value: string | number
  change?: number
  isPositive?: boolean
  icon: LucideIcon
  description?: string
  color?: 'blue' | 'green' | 'red' | 'purple' | 'orange'
}

export function AnalyticsCard({ 
  title, 
  value, 
  change, 
  isPositive = true,
  icon: IconComponent, 
  description,
  color = 'blue' 
}: AnalyticsCardProps) {
  const colorVariants = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600', 
    red: 'from-red-500 to-red-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600'
  }

  const iconBgVariants = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    red: 'bg-red-100 text-red-600', 
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
        <div className={`h-1 bg-gradient-to-r ${colorVariants[color]}`} />
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
            <motion.div 
              className={`p-2 rounded-xl ${iconBgVariants[color]}`}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <IconComponent className="h-5 w-5" />
            </motion.div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <motion.div 
              className="text-3xl font-bold text-gray-900"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              {value}
            </motion.div>
            
            {change !== undefined && (
              <motion.div 
                className="flex items-center space-x-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {change > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
                <span className={`text-sm font-medium ${
                  change > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {Math.abs(change)}%
                </span>
                <span className="text-sm text-gray-500">vs mês anterior</span>
              </motion.div>
            )}
            
            {description && (
              <p className="text-sm text-gray-500">{description}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
