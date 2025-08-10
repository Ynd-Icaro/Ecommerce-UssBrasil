import { Router } from 'express'
import authRoutes from './auth.routes'
import productRoutes from './product.routes'

const router = Router()

// Health check route
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'USS Brasil API está funcionando',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  })
})

// API routes
router.use('/auth', authRoutes)
router.use('/products', productRoutes)

// API info route
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Bem-vindo à API USS Brasil',
    version: '1.0.0',
    documentation: '/api/docs',
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
      health: '/api/health'
    }
  })
})

export default router
