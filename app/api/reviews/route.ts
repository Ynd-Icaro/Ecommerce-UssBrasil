import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory store (replace with DB / Prisma later)
const reviewsStore: Record<string, any[]> = {}

export async function GET(req: NextRequest){
  const { searchParams } = new URL(req.url)
  const productId = searchParams.get('productId')
  if(!productId) return NextResponse.json({ error: 'productId required' }, { status: 400 })
  return NextResponse.json(reviewsStore[productId] || [])
}

export async function POST(req: NextRequest){
  const body = await req.json().catch(()=>null)
  if(!body || !body.productId || !body.author || typeof body.rating === 'undefined'){
    return NextResponse.json({ error:'invalid payload' }, { status:400 })
  }
  const entry = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...body }
  reviewsStore[body.productId] = reviewsStore[body.productId] || []
  reviewsStore[body.productId].push(entry)
  return NextResponse.json(entry,{ status:201 })
}
