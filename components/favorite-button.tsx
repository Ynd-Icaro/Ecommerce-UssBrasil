'use client'

import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFavorites } from '@/hooks/use-favorites'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'

interface FavoriteButtonProps {
  productId: string
  className?: string
  size?: 'sm' | 'default' | 'lg'
  variant?: 'default' | 'outline' | 'ghost'
}

export function FavoriteButton({ 
  productId, 
  className, 
  size = 'default', 
  variant = 'outline' 
}: FavoriteButtonProps) {
  const { user } = useAuth()
  const { isFavorite, toggleFavorite } = useFavorites()
  
  const isFav = isFavorite(productId)

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!user) {
      // Redirecionar para login ou mostrar modal
      return
    }
    
    await toggleFavorite(productId)
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={cn(
        'transition-all duration-200',
        isFav && 'text-red-500 bg-red-50 border-red-200 hover:bg-red-100',
        className
      )}
    >
      <Heart 
        className={cn(
          'h-4 w-4 transition-all duration-200',
          isFav ? 'fill-current text-red-500' : 'text-gray-400'
        )} 
      />
    </Button>
  )
}

export default FavoriteButton
