import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/reviews?productId=xxx
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const productId = searchParams.get('productId')
  if (!productId) return NextResponse.json({ error: 'productId required' }, { status: 400 })
  try {
    const reviews = await prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
      take: 50
    })
    return NextResponse.json(reviews)
  } catch (e) {
    return NextResponse.json({ error: 'failed to load' }, { status: 500 })
  }
}

// POST /api/reviews
// { productId, userId?, rating, comment }
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body || !body.productId || typeof body.rating !== 'number') {
    return NextResponse.json({ error: 'invalid payload' }, { status: 400 })
  }
  const rating = Math.min(5, Math.max(1, body.rating))
  try {
    const review = await prisma.review.create({
      data: {
        productId: body.productId,
        userId: body.userId || 'anonymous',
        rating,
        comment: body.comment?.slice(0, 800) || null
      }
    })
    // Update product aggregates (simple incremental)
    await prisma.product.update({
      where: { id: body.productId },
      data: {
        totalReviews: { increment: 1 },
        rating: await (async () => {
          const agg = await prisma.review.aggregate({
            where: { productId: body.productId },
            _avg: { rating: true }
          })
          return agg._avg.rating || 0
        })()
      }
    }).catch(()=>{})
    return NextResponse.json(review, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: 'failed to create' }, { status: 500 })
  }
}
