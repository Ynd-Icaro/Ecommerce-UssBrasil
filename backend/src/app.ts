import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import 'express-async-errors'

import { errorHandler } from '@/middleware/errorHandler'
import { notFoundHandler } from '@/middleware/notFoundHandler'
import { authMiddleware } from '@/middleware/auth'
import { rateLimitConfig } from '@/config/rateLimit'
import { corsConfig } from '@/config/cors'
import { logger } from '@/utils/logger'
import { redis } from '@/config/redis'
import { prisma } from '@/config/database'

// Import routes
import authRoutes from '@/routes/auth'
import productsRoutes from '@/routes/products'
import categoriesRoutes from '@/routes/categories'
import cartRoutes from '@/routes/cart'
import ordersRoutes from '@/routes/orders'
import usersRoutes from '@/routes/users'
import adminRoutes from '@/routes/admin'
import uploadRoutes from '@/routes/upload'
import analyticsRoutes from '@/routes/analytics'
import configRoutes from '@/routes/config'

const app = express()
const PORT = process.env.PORT || 3001

// ========== SECURITY MIDDLEWARE ==========
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
      scriptSrc: ["'self'"],
    },
  },
}))

// ========== CORS CONFIGURATION ==========
app.use(cors(corsConfig))

// ========== RATE LIMITING ==========
app.use('/api/', rateLimit(rateLimitConfig.general))
app.use('/api/auth/', rateLimit(rateLimitConfig.auth))
app.use('/api/upload/', rateLimit(rateLimitConfig.upload))

// ========== GENERAL MIDDLEWARE ==========
app.use(compression())
app.use(morgan('combined', { stream: { write: (msg) => logger.info(msg.trim()) } }))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())

// ========== HEALTH CHECK ==========
app.get('/health', async (req, res) => {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`
    
    // Check Redis connection
    await redis.ping()
    
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      database: 'connected',
      redis: 'connected'
    })
  } catch (error) {
    logger.error('Health check failed:', error)
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Service dependencies unavailable'
    })
  }
})

// ========== API ROUTES ==========
app.use('/api/auth', authRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/categories', categoriesRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', ordersRoutes)
app.use('/api/users', authMiddleware, usersRoutes)
app.use('/api/admin', authMiddleware, adminRoutes)
app.use('/api/upload', authMiddleware, uploadRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/config', configRoutes)

// ========== API DOCUMENTATION ==========
if (process.env.NODE_ENV !== 'production') {
  import('swagger-ui-express').then(swaggerUi => {
    import('@/config/swagger').then(({ swaggerSpec }) => {
      app.use('/api-docs', swaggerUi.default.serve, swaggerUi.default.setup(swaggerSpec))
    })
  })
}

// ========== ERROR HANDLING ==========
app.use(notFoundHandler)
app.use(errorHandler)

// ========== GRACEFUL SHUTDOWN ==========
const gracefulShutdown = async () => {
  logger.info('Received shutdown signal. Closing server gracefully...')
  
  try {
    await prisma.$disconnect()
    await redis.quit()
    logger.info('Database and Redis connections closed.')
    process.exit(0)
  } catch (error) {
    logger.error('Error during graceful shutdown:', error)
    process.exit(1)
  }
}

process.on('SIGTERM', gracefulShutdown)
process.on('SIGINT', gracefulShutdown)

// ========== START SERVER ==========
const server = app.listen(PORT, () => {
  logger.info(`🚀 USS Brasil Backend Server running on port ${PORT}`)
  logger.info(`📚 API Documentation: http://localhost:${PORT}/api-docs`)
  logger.info(`🏥 Health Check: http://localhost:${PORT}/health`)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: any) => {
  logger.error('Unhandled Promise Rejection:', err)
  server.close(() => {
    process.exit(1)
  })
})

export default app
