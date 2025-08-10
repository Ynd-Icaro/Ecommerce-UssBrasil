import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'
import { authenticateToken } from '../middleware/auth'
import { validate, userValidation, authLimiter } from '../middleware/validation'

const router = Router()

// Public routes
router.post('/register', 
  authLimiter,
  validate(userValidation.register),
  AuthController.register
)

router.post('/login',
  authLimiter,
  validate(userValidation.login),
  AuthController.login
)

// Protected routes
router.get('/profile',
  authenticateToken,
  AuthController.getProfile
)

router.put('/profile',
  authenticateToken,
  validate(userValidation.update),
  AuthController.updateProfile
)

router.put('/change-password',
  authenticateToken,
  validate([
    // Add password validation here if needed
  ]),
  AuthController.changePassword
)

router.post('/logout',
  authenticateToken,
  AuthController.logout
)

export default router
