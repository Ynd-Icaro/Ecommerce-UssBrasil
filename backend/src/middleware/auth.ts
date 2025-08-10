import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        email: string
        role: string
      }
    }
  }
}

// JWT Authentication middleware
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token de acesso requerido'
      })
    }
    
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
      throw new Error('JWT_SECRET não configurado')
    }
    
    const decoded = jwt.verify(token, jwtSecret) as any
    
    // Verify user still exists and is active
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true
      }
    })
    
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Usuário inválido ou inativo'
      })
    }
    
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role
    }
    
    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido'
      })
    }
    
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: 'Token expirado'
      })
    }
    
    console.error('Auth middleware error:', error)
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    })
  }
}

// Role-based authorization middleware
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Usuário não autenticado'
      })
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Acesso negado. Permissões insuficientes.'
      })
    }
    
    next()
  }
}

// Admin only middleware
export const adminOnly = authorize('ADMIN')

// User or admin middleware
export const userOrAdmin = authorize('USER', 'ADMIN')

// Optional authentication (doesn't fail if no token)
export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    
    if (token) {
      const jwtSecret = process.env.JWT_SECRET
      if (jwtSecret) {
        const decoded = jwt.verify(token, jwtSecret) as any
        
        const user = await prisma.user.findUnique({
          where: { id: decoded.userId },
          select: {
            id: true,
            email: true,
            role: true,
            isActive: true
          }
        })
        
        if (user && user.isActive) {
          req.user = {
            id: user.id,
            email: user.email,
            role: user.role
          }
        }
      }
    }
    
    next()
  } catch (error) {
    // Ignore auth errors for optional authentication
    next()
  }
}
