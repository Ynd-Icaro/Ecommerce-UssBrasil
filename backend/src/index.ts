import app from './server'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
  console.log(`🚀 USS Brasil Backend running on port ${PORT}`)
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🔗 Health check: http://localhost:${PORT}/health`)
  console.log(`📋 API docs: http://localhost:${PORT}/api`)
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, shutting down gracefully')
  server.close(() => {
    console.log('💤 Process terminated')
  })
})

process.on('SIGINT', () => {
  console.log('👋 SIGINT received, shutting down gracefully')
  server.close(() => {
    console.log('💤 Process terminated')
  })
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('💥 Unhandled Promise Rejection:', err.message)
  console.error(err.stack)
  server.close(() => {
    process.exit(1)
  })
})

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.error('💥 Uncaught Exception:', err.message)
  console.error(err.stack)
  process.exit(1)
})
