import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'interactive'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', children, ...props }, ref) => {
    const baseClasses = "bg-white border border-uss-gray-300 rounded-xl transition-all duration-300 dark:bg-uss-gray-700 dark:border-uss-gray-500"
    
    const variants = {
      default: "shadow-sm",
      elevated: "shadow-lg hover:shadow-xl",
      outlined: "border-2 border-uss-primary",
      interactive: "shadow-sm hover:shadow-lg hover:-translate-y-1 cursor-pointer"
    }
    
    const paddings = {
      sm: "p-3",
      md: "p-6",
      lg: "p-8",
      xl: "p-12"
    }
    
    return (
      <div
        className={cn(
          baseClasses,
          variants[variant],
          paddings[padding],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = "Card"

export { Card }
