import { Router } from 'express'
import { ProductController } from '../controllers/product.controller'
import { authenticateToken, adminOnly, optionalAuth } from '../middleware/auth'
import { validate, productValidation, generalLimiter } from '../middleware/validation'

const router = Router()

// Public routes
router.get('/',
  generalLimiter,
  optionalAuth,
  ProductController.getProducts
)

router.get('/:id',
  generalLimiter,
  optionalAuth,
  ProductController.getProduct
)

// Admin only routes
router.post('/',
  authenticateToken,
  adminOnly,
  validate(productValidation.create),
  ProductController.createProduct
)

router.put('/:id',
  authenticateToken,
  adminOnly,
  validate(productValidation.update),
  ProductController.updateProduct
)

router.delete('/:id',
  authenticateToken,
  adminOnly,
  ProductController.deleteProduct
)

router.patch('/:id/toggle-status',
  authenticateToken,
  adminOnly,
  ProductController.toggleActiveStatus
)

export default router
