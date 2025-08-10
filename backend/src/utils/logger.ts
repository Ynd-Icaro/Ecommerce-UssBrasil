import winston from 'winston'
import path from 'path'

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.prettyPrint()
)

// Define log format for console
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    let msg = `${timestamp} [${level}]: ${message}`
    if (Object.keys(meta).length > 0) {
      msg += ` ${JSON.stringify(meta, null, 2)}`
    }
    return msg
  })
)

// Create logger instance
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  defaultMeta: { service: 'uss-brasil-backend' },
  transports: [
    // Console transport
    new winston.transports.Console({
      format: consoleFormat,
      level: process.env.NODE_ENV === 'development' ? 'debug' : 'info'
    }),
    
    // File transport for errors
    new winston.transports.File({
      filename: path.join(process.cwd(), 'logs', 'error.log'),
      level: 'error',
      maxsize: 10485760, // 10MB
      maxFiles: 5
    }),
    
    // File transport for all logs
    new winston.transports.File({
      filename: path.join(process.cwd(), 'logs', 'combined.log'),
      maxsize: 10485760, // 10MB
      maxFiles: 5
    })
  ],
  
  // Handle exceptions and rejections
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(process.cwd(), 'logs', 'exceptions.log')
    })
  ],
  
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(process.cwd(), 'logs', 'rejections.log')
    })
  ]
})

// Performance logging utility
export const performanceLogger = {
  start: (operation: string) => {
    const startTime = Date.now()
    return {
      end: (metadata?: any) => {
        const duration = Date.now() - startTime
        logger.debug('Performance', {
          operation,
          duration: `${duration}ms`,
          ...metadata
        })
        return duration
      }
    }
  }
}

// HTTP request logger
export const httpLogger = (req: any, res: any, responseTime: number) => {
  const { method, url, ip, headers } = req
  const { statusCode } = res
  
  logger.info('HTTP Request', {
    method,
    url,
    statusCode,
    responseTime: `${responseTime}ms`,
    ip,
    userAgent: headers['user-agent'],
    contentLength: res.get('content-length') || 0
  })
}

// Error logger with context
export const errorLogger = (error: Error, context?: any) => {
  logger.error('Application Error', {
    message: error.message,
    stack: error.stack,
    name: error.name,
    context
  })
}

// Create logs directory if it doesn't exist
import fs from 'fs'
const logsDir = path.join(process.cwd(), 'logs')
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true })
}
