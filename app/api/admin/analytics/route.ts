import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30'; // days

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    const [
      // Estatísticas gerais
      totalUsers,
      totalProducts,
      totalCategories,
      totalOrders,
      totalRevenue,
      
      // Estatísticas do período
      newUsers,
      ordersInPeriod,
      revenueInPeriod,
      
      // Top produtos
      topProducts,
      
      // Pedidos por status
      ordersByStatus,
      
      // Receita por dia (últimos 30 dias)
      dailyRevenue,
      
      // Produtos com baixo estoque
      lowStockProducts
    ] = await Promise.all([
      // Total counts
      prisma.user.count(),
      prisma.product.count(),
      prisma.category.count(),
      prisma.order.count(),
      prisma.order.aggregate({
        where: { status: { not: 'CANCELLED' } },
        _sum: { total: true }
      }),
      
      // Period stats
      prisma.user.count({
        where: { createdAt: { gte: startDate } }
      }),
      prisma.order.count({
        where: { createdAt: { gte: startDate } }
      }),
      prisma.order.aggregate({
        where: { 
          createdAt: { gte: startDate },
          status: { not: 'CANCELLED' }
        },
        _sum: { total: true }
      }),
      
      // Top products by order count
      prisma.product.findMany({
        include: {
          _count: {
            select: {
              orderItems: true
            }
          },
          category: {
            select: {
              name: true
            }
          }
        },
        orderBy: {
          orderItems: {
            _count: 'desc'
          }
        },
        take: 10
      }),
      
      // Orders by status
      prisma.order.groupBy({
        by: ['status'],
        _count: {
          status: true
        }
      }),
      
      // Daily revenue for the last 30 days
      prisma.$queryRaw`
        SELECT 
          DATE(createdAt) as date,
          SUM(total) as revenue,
          COUNT(*) as orders
        FROM Order 
        WHERE createdAt >= ${new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)}
          AND status != 'CANCELLED'
        GROUP BY DATE(createdAt)
        ORDER BY date ASC
      `,
      
      // Low stock products (less than 10 items)
      prisma.product.findMany({
        where: {
          stock: { lt: 10 },
          status: 'ACTIVE'
        },
        include: {
          category: {
            select: {
              name: true
            }
          }
        },
        orderBy: { stock: 'asc' },
        take: 20
      })
    ]);

    return NextResponse.json({
      overview: {
        totalUsers,
        totalProducts,
        totalCategories,
        totalOrders,
        totalRevenue: totalRevenue._sum.total || 0,
        newUsers,
        ordersInPeriod,
        revenueInPeriod: revenueInPeriod._sum.total || 0
      },
      topProducts: topProducts.map(product => ({
        ...product,
        images: JSON.parse(product.images || '[]'),
        specifications: product.specifications ? JSON.parse(product.specifications) : null
      })),
      ordersByStatus: ordersByStatus.reduce((acc, status) => {
        acc[status.status] = status._count.status;
        return acc;
      }, {} as Record<string, number>),
      dailyRevenue,
      lowStockProducts: lowStockProducts.map(product => ({
        ...product,
        images: JSON.parse(product.images || '[]'),
        specifications: product.specifications ? JSON.parse(product.specifications) : null
      })),
      period: parseInt(period)
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
