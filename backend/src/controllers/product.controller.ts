import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class ProductController {
  // Get all products with filtering and pagination
  static async getProducts(req: Request, res: Response) {
    try {
      const {
        page = '1',
        limit = '12',
        categoryId,
        brand,
        minPrice,
        maxPrice,
        search,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        status = 'ACTIVE'
      } = req.query
      
      const pageNum = parseInt(page as string)
      const limitNum = parseInt(limit as string)
      const skip = (pageNum - 1) * limitNum
      
      // Build where clause
      const where: any = {}
      
      if (status === 'ACTIVE') {
        where.status = 'ACTIVE'
      }
      
      if (categoryId) {
        where.categoryId = categoryId as string
      }
      
      if (brand) {
        where.brand = brand as string
      }
      
      if (minPrice || maxPrice) {
        where.price = {}
        if (minPrice) where.price.gte = parseFloat(minPrice as string)
        if (maxPrice) where.price.lte = parseFloat(maxPrice as string)
      }
      
      if (search) {
        where.OR = [
          { name: { contains: search as string, mode: 'insensitive' } },
          { description: { contains: search as string, mode: 'insensitive' } }
        ]
      }
      
      // Build orderBy clause
      const orderBy: any = {}
      orderBy[sortBy as string] = sortOrder as string
      
      // Get products with pagination
      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where,
          include: {
            category: {
              select: {
                id: true,
                name: true,
                slug: true
              }
            },
            reviews: {
              select: {
                id: true,
                rating: true
              }
            },
            _count: {
              select: {
                reviews: true,
                cartItems: true,
                wishlist: true
              }
            }
          },
          orderBy,
          skip,
          take: limitNum
        }),
        prisma.product.count({ where })
      ])
      
      // Calculate average rating for each product
      const productsWithRating = products.map(product => {
        const avgRating = product.reviews.length > 0
          ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
          : 0
        
        return {
          ...product,
          averageRating: Number(avgRating.toFixed(1)),
          reviewCount: product._count.reviews,
          cartCount: product._count.cartItems,
          wishlistCount: product._count.wishlist,
          reviews: undefined, // Remove reviews array from response
          _count: undefined // Remove _count from response
        }
      })
      
      const totalPages = Math.ceil(total / limitNum)
      
      res.json({
        success: true,
        data: {
          products: productsWithRating,
          pagination: {
            page: pageNum,
            limit: limitNum,
            total,
            totalPages,
            hasNext: pageNum < totalPages,
            hasPrev: pageNum > 1
          }
        }
      })
      
    } catch (error) {
      console.error('Get products error:', error)
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      })
    }
  }
  
  // Get single product by ID or slug
  static async getProduct(req: Request, res: Response) {
    try {
      const { id } = req.params
      
      const product = await prisma.product.findFirst({
        where: {
          OR: [
            { id },
            { slug: id }
          ]
        },
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          },
          reviews: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true
                }
              }
            },
            orderBy: {
              createdAt: 'desc'
            }
          },
          _count: {
            select: {
              reviews: true,
              cartItems: true,
              wishlist: true
            }
          }
        }
      })
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Produto não encontrado'
        })
      }
      
      // Calculate average rating
      const avgRating = product.reviews.length > 0
        ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
        : 0
      
      // Get related products from same category
      const relatedProducts = await prisma.product.findMany({
        where: {
          categoryId: product.categoryId,
          id: { not: product.id },
          status: 'ACTIVE'
        },
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          }
        },
        take: 4,
        orderBy: {
          createdAt: 'desc'
        }
      })
      
      const productWithRating = {
        ...product,
        averageRating: Number(avgRating.toFixed(1)),
        reviewCount: product._count.reviews,
        cartCount: product._count.cartItems,
        wishlistCount: product._count.wishlist,
        relatedProducts,
        _count: undefined
      }
      
      res.json({
        success: true,
        data: { product: productWithRating }
      })
      
    } catch (error) {
      console.error('Get product error:', error)
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      })
    }
  }
  
  // Create new product (Admin only)
  static async createProduct(req: Request, res: Response) {
    try {
      const {
        name,
        description,
        price,
        categoryId,
        brand = 'USSBRASIL',
        images,
        specifications,
        stock,
        sku,
        weight,
        dimensions,
        tags,
        seoTitle,
        seoDescription,
        status = 'ACTIVE',
        isFeatured = false
      } = req.body
      
      // Generate slug from name
      const slug = name.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
      
      // Check if slug already exists
      const existingProduct = await prisma.product.findUnique({
        where: { slug }
      })
      
      if (existingProduct) {
        return res.status(400).json({
          success: false,
          message: 'Produto com este nome já existe'
        })
      }
      
      // Verify category exists
      const category = await prisma.category.findUnique({
        where: { id: categoryId }
      })
      
      if (!category) {
        return res.status(400).json({
          success: false,
          message: 'Categoria não encontrada'
        })
      }
      
      const product = await prisma.product.create({
        data: {
          name,
          description,
          price: parseFloat(price),
          slug,
          categoryId,
          brand,
          images,
          specifications,
          stock: parseInt(stock),
          weight: weight ? parseFloat(weight) : null,
          dimensions,
          tags,
          seoTitle,
          seoDescription,
          status: 'ACTIVE',
          featured: isFeatured || false
        },
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          }
        }
      })
      
      res.status(201).json({
        success: true,
        message: 'Produto criado com sucesso',
        data: { product }
      })
      
    } catch (error) {
      console.error('Create product error:', error)
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      })
    }
  }
  
  // Update product (Admin only)
  static async updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params
      const updateData = req.body
      
      // If name is being updated, update slug too
      if (updateData.name) {
        const slug = updateData.name.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim()
        
        // Check if new slug already exists (excluding current product)
        const existingProduct = await prisma.product.findFirst({
          where: {
            slug,
            id: { not: id }
          }
        })
        
        if (existingProduct) {
          return res.status(400).json({
            success: false,
            message: 'Produto com este nome já existe'
          })
        }
        
        updateData.slug = slug
      }
      
      // Convert numeric fields
      if (updateData.price) updateData.price = parseFloat(updateData.price)
      if (updateData.stock) updateData.stock = parseInt(updateData.stock)
      if (updateData.weight) updateData.weight = parseFloat(updateData.weight)
      
      const product = await prisma.product.update({
        where: { id },
        data: updateData,
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          }
        }
      })
      
      res.json({
        success: true,
        message: 'Produto atualizado com sucesso',
        data: { product }
      })
      
    } catch (error) {
      if (error instanceof Error && error.message.includes('Record to update not found')) {
        return res.status(404).json({
          success: false,
          message: 'Produto não encontrado'
        })
      }
      
      console.error('Update product error:', error)
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      })
    }
  }
  
  // Delete product (Admin only)
  static async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params
      
      await prisma.product.delete({
        where: { id }
      })
      
      res.json({
        success: true,
        message: 'Produto excluído com sucesso'
      })
      
    } catch (error) {
      if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
        return res.status(404).json({
          success: false,
          message: 'Produto não encontrado'
        })
      }
      
      console.error('Delete product error:', error)
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      })
    }
  }
  
  // Toggle product active status (Admin only)
  static async toggleActiveStatus(req: Request, res: Response) {
    try {
      const { id } = req.params
      
      const product = await prisma.product.findUnique({
        where: { id },
        select: { status: true }
      })
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Produto não encontrado'
        })
      }
      
      const newStatus = product.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
      
      const updatedProduct = await prisma.product.update({
        where: { id },
        data: { status: newStatus },
        select: {
          id: true,
          name: true,
          status: true
        }
      })
      
      res.json({
        success: true,
        message: `Produto ${updatedProduct.status === 'ACTIVE' ? 'ativado' : 'desativado'} com sucesso`,
        data: { product: updatedProduct }
      })
      
    } catch (error) {
      console.error('Toggle active status error:', error)
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      })
    }
  }
}
