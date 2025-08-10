import { Request, Response, NextFunction } from 'express'
import rateLimit from 'express-rate-limit'
import { body, validationResult, ValidationChain } from 'express-validator'

// Rate limiting configurations
export const createRateLimiter = (windowMs: number, max: number, message?: string) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      success: false,
      message: message || 'Muitas tentativas. Tente novamente mais tarde.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(429).json({
        success: false,
        message: message || 'Muitas tentativas. Tente novamente mais tarde.'
      })
    }
  })
}

// Different rate limiters for different endpoints
export const authLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  5, // limit each IP to 5 requests per windowMs
  'Muitas tentativas de login. Tente novamente em 15 minutos.'
)

export const generalLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  100 // limit each IP to 100 requests per windowMs
)

export const strictLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  10 // limit each IP to 10 requests per windowMs
)

// Validation middleware
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Run all validations
    await Promise.all(validations.map(validation => validation.run(req)))
    
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos',
        errors: errors.array().map(error => ({
          field: error.type === 'field' ? (error as any).path : 'unknown',
          message: error.msg
        }))
      })
    }
    
    next()
  }
}

// Common validation rules
export const userValidation = {
  register: [
    body('name')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Nome deve ter entre 2 e 100 caracteres'),
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Email inválido'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Senha deve ter pelo menos 6 caracteres')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .withMessage('Senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número'),
    body('phone')
      .optional()
      .isMobilePhone('pt-BR')
      .withMessage('Telefone inválido')
  ],
  
  login: [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Email inválido'),
    body('password')
      .notEmpty()
      .withMessage('Senha é obrigatória')
  ],
  
  update: [
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Nome deve ter entre 2 e 100 caracteres'),
    body('email')
      .optional()
      .isEmail()
      .normalizeEmail()
      .withMessage('Email inválido'),
    body('phone')
      .optional()
      .isMobilePhone('pt-BR')
      .withMessage('Telefone inválido')
  ]
}

export const productValidation = {
  create: [
    body('name')
      .trim()
      .isLength({ min: 2, max: 200 })
      .withMessage('Nome deve ter entre 2 e 200 caracteres'),
    body('description')
      .trim()
      .isLength({ min: 10, max: 2000 })
      .withMessage('Descrição deve ter entre 10 e 2000 caracteres'),
    body('price')
      .isFloat({ min: 0 })
      .withMessage('Preço deve ser um número positivo'),
    body('categoryId')
      .isString()
      .notEmpty()
      .withMessage('Categoria é obrigatória'),
    body('brand')
      .optional()
      .isIn(['USSBRASIL', 'PARTNERS', 'MARKETPLACE'])
      .withMessage('Marca inválida'),
    body('stock')
      .isInt({ min: 0 })
      .withMessage('Estoque deve ser um número inteiro positivo')
  ],
  
  update: [
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 200 })
      .withMessage('Nome deve ter entre 2 e 200 caracteres'),
    body('description')
      .optional()
      .trim()
      .isLength({ min: 10, max: 2000 })
      .withMessage('Descrição deve ter entre 10 e 2000 caracteres'),
    body('price')
      .optional()
      .isFloat({ min: 0 })
      .withMessage('Preço deve ser um número positivo'),
    body('stock')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Estoque deve ser um número inteiro positivo')
  ]
}

export const orderValidation = {
  create: [
    body('items')
      .isArray({ min: 1 })
      .withMessage('Pelo menos um item é obrigatório'),
    body('items.*.productId')
      .isString()
      .notEmpty()
      .withMessage('ID do produto é obrigatório'),
    body('items.*.quantity')
      .isInt({ min: 1 })
      .withMessage('Quantidade deve ser um número inteiro positivo'),
    body('shippingAddress')
      .notEmpty()
      .withMessage('Endereço de entrega é obrigatório'),
    body('paymentMethod')
      .isIn(['CREDIT_CARD', 'DEBIT_CARD', 'PIX', 'BOLETO'])
      .withMessage('Método de pagamento inválido')
  ]
}

// Security middleware for input sanitization
export const sanitizeInput = (req: Request, res: Response, next: NextFunction) => {
  // Remove potential XSS attacks
  const sanitizeString = (str: string): string => {
    return str
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .trim()
  }
  
  const sanitizeObject = (obj: any): any => {
    if (typeof obj === 'string') {
      return sanitizeString(obj)
    }
    
    if (Array.isArray(obj)) {
      return obj.map(sanitizeObject)
    }
    
    if (obj && typeof obj === 'object') {
      const sanitized: any = {}
      for (const [key, value] of Object.entries(obj)) {
        sanitized[key] = sanitizeObject(value)
      }
      return sanitized
    }
    
    return obj
  }
  
  if (req.body) {
    req.body = sanitizeObject(req.body)
  }
  
  if (req.query) {
    req.query = sanitizeObject(req.query)
  }
  
  if (req.params) {
    req.params = sanitizeObject(req.params)
  }
  
  next()
}
