import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class AuthController {
  // Register new user
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password, phone } = req.body
      
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email }
      })
      
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email já está em uso'
        })
      }
      
      // Hash password
      const saltRounds = 12
      const hashedPassword = await bcrypt.hash(password, saltRounds)
      
      // Create user
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          phone,
          role: 'USER'
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          phone: true,
          createdAt: true
        }
      })
      
      // Generate JWT token
      const jwtSecret = process.env.JWT_SECRET
      if (!jwtSecret) {
        throw new Error('JWT_SECRET não configurado')
      }
      
      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        jwtSecret,
        { expiresIn: '7d' }
      )
      
      res.status(201).json({
        success: true,
        message: 'Usuário criado com sucesso',
        data: {
          user,
          token
        }
      })
      
    } catch (error) {
      console.error('Register error:', error)
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      })
    }
  }
  
  // Login user
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      
      // Find user
      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          role: true,
          phone: true,
          isActive: true,
          lastLoginAt: true
        }
      })
      
      if (!user || !user.password) {
        return res.status(401).json({
          success: false,
          message: 'Email ou senha inválidos'
        })
      }
      
      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Conta desativada. Entre em contato com o suporte.'
        })
      }
      
      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password)
      
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Email ou senha inválidos'
        })
      }
      
      // Update last login
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() }
      })
      
      // Generate JWT token
      const jwtSecret = process.env.JWT_SECRET
      if (!jwtSecret) {
        throw new Error('JWT_SECRET não configurado')
      }
      
      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        jwtSecret,
        { expiresIn: '7d' }
      )
      
      // Remove password from response
      const { password: _, ...userWithoutPassword } = user
      
      res.json({
        success: true,
        message: 'Login realizado com sucesso',
        data: {
          user: userWithoutPassword,
          token
        }
      })
      
    } catch (error) {
      console.error('Login error:', error)
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      })
    }
  }
  
  // Get current user profile
  static async getProfile(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Usuário não autenticado'
        })
      }
      
      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          phone: true,
          address: true,
          city: true,
          state: true,
          zipCode: true,
          country: true,
          birthDate: true,
          gender: true,
          preferences: true,
          createdAt: true,
          updatedAt: true,
          lastLoginAt: true
        }
      })
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        })
      }
      
      res.json({
        success: true,
        data: { user }
      })
      
    } catch (error) {
      console.error('Get profile error:', error)
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      })
    }
  }
  
  // Update user profile
  static async updateProfile(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Usuário não autenticado'
        })
      }
      
      const {
        name,
        phone,
        address,
        city,
        state,
        zipCode,
        birthDate,
        gender,
        preferences
      } = req.body
      
      const user = await prisma.user.update({
        where: { id: req.user.id },
        data: {
          ...(name && { name }),
          ...(phone && { phone }),
          ...(address && { address }),
          ...(city && { city }),
          ...(state && { state }),
          ...(zipCode && { zipCode }),
          ...(birthDate && { birthDate: new Date(birthDate) }),
          ...(gender && { gender }),
          ...(preferences && { preferences })
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          phone: true,
          address: true,
          city: true,
          state: true,
          zipCode: true,
          country: true,
          birthDate: true,
          gender: true,
          preferences: true,
          updatedAt: true
        }
      })
      
      res.json({
        success: true,
        message: 'Perfil atualizado com sucesso',
        data: { user }
      })
      
    } catch (error) {
      console.error('Update profile error:', error)
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      })
    }
  }
  
  // Change password
  static async changePassword(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Usuário não autenticado'
        })
      }
      
      const { currentPassword, newPassword } = req.body
      
      // Get current user with password
      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: { password: true }
      })
      
      if (!user || !user.password) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        })
      }
      
      // Verify current password
      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password)
      
      if (!isCurrentPasswordValid) {
        return res.status(400).json({
          success: false,
          message: 'Senha atual inválida'
        })
      }
      
      // Hash new password
      const saltRounds = 12
      const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds)
      
      // Update password
      await prisma.user.update({
        where: { id: req.user.id },
        data: { password: hashedNewPassword }
      })
      
      res.json({
        success: true,
        message: 'Senha alterada com sucesso'
      })
      
    } catch (error) {
      console.error('Change password error:', error)
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      })
    }
  }
  
  // Logout (invalidate token on client side)
  static async logout(req: Request, res: Response) {
    res.json({
      success: true,
      message: 'Logout realizado com sucesso'
    })
  }
}
