import { Suspense, lazy, ComponentType } from 'react'

interface LazyComponentProps {
  fallback?: React.ReactNode
  children: React.ReactNode
}

const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-uss-primary"></div>
  </div>
)

export function LazyWrapper({ 
  fallback = <LoadingSpinner />, 
  children 
}: LazyComponentProps) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  )
}

// Helper para criar componentes lazy de forma consistente
export function createLazyComponent<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  fallback?: React.ReactNode
) {
  const LazyComponent = lazy(factory)
  
  return function WrappedComponent(props: any) {
    return (
      <LazyWrapper fallback={fallback}>
        <LazyComponent {...props} />
      </LazyWrapper>
    )
  }
}

// Componentes lazy pré-configurados
export const LazyProductCard = createLazyComponent(
  () => import('@/components/ProductCard')
)

export const LazyModal = createLazyComponent(
  () => import('@/components/modals/Modal')
)

export const LazyChart = createLazyComponent(
  () => import('@/components/charts/Chart'),
  <div className="h-64 bg-uss-gray-100 animate-pulse rounded-lg"></div>
)
