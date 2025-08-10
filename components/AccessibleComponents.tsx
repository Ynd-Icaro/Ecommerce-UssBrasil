import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { a11yClasses } from '@/lib/accessibility'

interface SkipLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
}

export const SkipLink = forwardRef<HTMLAnchorElement, SkipLinkProps>(
  ({ href, children, className, ...props }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        className={cn(a11yClasses.skipLink, className)}
        {...props}
      >
        {children}
      </a>
    )
  }
)

SkipLink.displayName = "SkipLink"

interface AccessibleButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  disabled?: boolean
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
}

export const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    isLoading = false, 
    disabled = false,
    children, 
    className, 
    type = 'button',
    ...props 
  }, ref) => {
    const baseClasses = cn(
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200',
      a11yClasses.focusVisible,
      {
        [a11yClasses.loading]: isLoading,
        [a11yClasses.disabled]: disabled,
      }
    )

    const variants = {
      primary: 'bg-uss-primary text-white hover:bg-uss-primary-dark',
      secondary: 'bg-uss-secondary text-white hover:bg-uss-secondary-dark',
      ghost: 'bg-transparent text-uss-primary hover:bg-uss-primary/10'
    }

    const sizes = {
      sm: 'px-3 py-2 text-sm min-h-[36px]',
      md: 'px-4 py-2 text-base min-h-[44px]',
      lg: 'px-6 py-3 text-lg min-h-[48px]'
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        <span className={isLoading ? 'sr-only' : ''}>{children}</span>
        {isLoading && <span aria-live="polite">Carregando...</span>}
      </button>
    )
  }
)

AccessibleButton.displayName = "AccessibleButton"
