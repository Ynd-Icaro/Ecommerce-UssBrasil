import { Request, Response, NextFunction } from 'express';

// Request logging middleware
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now()
  
  // Log request start
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - ${req.ip}`)
  
  // Log response when it finishes
  res.on('finish', () => {
    const responseTime = Date.now() - startTime
    console.log(`${req.method} ${req.url} - ${res.statusCode} - ${responseTime}ms`)
  })
  
  next()
}

// Error handling middleware
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', error.message)
  console.error('Stack:', error.stack)
  
  // Handle different types of errors
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Dados inválidos',
      error: error.message
    })
  }
  
  if (error.name === 'UnauthorizedError') {
    return res.status(401).json({
      success: false,
      message: 'Não autorizado',
      error: error.message
    })
  }
  
  if (error.name === 'ForbiddenError') {
    return res.status(403).json({
      success: false,
      message: 'Acesso negado',
      error: error.message
    })
  }
  
  if (error.name === 'NotFoundError') {
    return res.status(404).json({
      success: false,
      message: 'Recurso não encontrado',
      error: error.message
    })
  }
  
  // Default to 500 server error
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Algo deu errado'
  })
}

// 404 Not Found handler
export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint não encontrado',
    path: req.originalUrl,
    method: req.method
  })
}