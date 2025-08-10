import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import { requestLogger, errorHandler, notFoundHandler } from './middleware/logging'
import { sanitizeInput } from './middleware/validation'
import routes from './routes'

const app = express()

// Trust proxy for accurate IP addresses
app.set('trust proxy', 1)

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}))

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://uss-brasil.com',
        'https://www.uss-brasil.com',
        'https://uss-brasil.netlify.app'
      ]
    : [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://127.0.0.1:3000'
      ],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin'
  ]
}

app.use(cors(corsOptions))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
  message: {
    success: false,
    message: 'Muitas solicitações. Tente novamente mais tarde.'
  },
  standardHeaders: true,
  legacyHeaders: false
})

app.use(limiter)

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Input sanitization
app.use(sanitizeInput)

// Compression middleware
app.use(compression())

// Logging middleware
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'))
  app.use(requestLogger)
}

// Health check endpoint
app.get('/health', (req: any, res: any) => {
  res.json({
    success: true,
    message: 'USS Brasil Backend is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  })
})

// API routes
app.use('/api', routes)

// Root endpoint
app.get('/', (req: any, res: any) => {
  res.json({
    success: true,
    message: 'Bem-vindo à API USS Brasil',
    version: '1.0.0',
    documentation: '/api/docs',
    health: '/health'
  })
})

// Error handling middleware
app.use(notFoundHandler)
app.use(errorHandler)

export default app
