import { PrismaClient } from '@prisma/client'
import { logger } from '@/utils/logger'

// Singleton pattern for Prisma Client
class DatabaseConnection {
  private static instance: PrismaClient
  
  public static getInstance(): PrismaClient {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new PrismaClient({
        log: [
          {
            emit: 'event',
            level: 'query',
          },
          {
            emit: 'event',
            level: 'error',
          },
          {
            emit: 'event',
            level: 'info',
          },
          {
            emit: 'event',
            level: 'warn',
          },
        ],
        errorFormat: 'pretty',
      })

      // Log database queries in development
      if (process.env.NODE_ENV === 'development') {
        DatabaseConnection.instance.$on('query', (e) => {
          logger.debug(`Query: ${e.query}`)
          logger.debug(`Params: ${e.params}`)
          logger.debug(`Duration: ${e.duration}ms`)
        })
      }

      // Log database errors
      DatabaseConnection.instance.$on('error', (e) => {
        logger.error('Database error:', e)
      })

      // Log database info
      DatabaseConnection.instance.$on('info', (e) => {
        logger.info('Database info:', e.message)
      })

      // Log database warnings
      DatabaseConnection.instance.$on('warn', (e) => {
        logger.warn('Database warning:', e.message)
      })

      // Connect to database
      DatabaseConnection.instance.$connect()
        .then(() => {
          logger.info('✅ Database connected successfully')
        })
        .catch((error) => {
          logger.error('❌ Database connection failed:', error)
          process.exit(1)
        })
    }
    
    return DatabaseConnection.instance
  }

  public static async disconnect(): Promise<void> {
    if (DatabaseConnection.instance) {
      await DatabaseConnection.instance.$disconnect()
      logger.info('📦 Database disconnected')
    }
  }
}

export const prisma = DatabaseConnection.getInstance()

// Database health check
export const checkDatabaseHealth = async (): Promise<boolean> => {
  try {
    await prisma.$queryRaw`SELECT 1`
    return true
  } catch (error) {
    logger.error('Database health check failed:', error)
    return false
  }
}

// Database middleware for request logging
export const databaseMiddleware = (model: string) => {
  return (params: any, next: any) => {
    const start = Date.now()
    const result = next(params)
    const end = Date.now()
    
    logger.debug(`${model} operation took ${end - start}ms`)
    return result
  }
}
