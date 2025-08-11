import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all active coupons (public info)
export async function GET(){
  try {
    const now = new Date()
    const couponDelegate: any = (prisma as any).coupon
    if(!couponDelegate){
      return NextResponse.json({ error:'coupon model not available - run: npx prisma generate' }, { status:500 })
    }
    const list = await couponDelegate.findMany({
      where:{ isActive:true, startDate:{ lte: now }, endDate:{ gte: now } },
      orderBy:{ createdAt:'desc' },
      take:50
    })
  return NextResponse.json(list.map((c: any)=>({
      code: c.code,
      type: c.type,
      value: c.value,
      endDate: c.endDate,
      description: c.description
    })))
  } catch(e){
    return NextResponse.json({ error:'failed' }, { status:500 })
  }
}

// Validate coupon POST { code, userId?, amount? }
export async function POST(req: NextRequest){
  const { code, userId, amount } = await req.json().catch(()=>({}))
  if(!code) return NextResponse.json({ error:'code required' }, { status:400 })
  const couponDelegate: any = (prisma as any).coupon
  if(!couponDelegate){
    return NextResponse.json({ error:'coupon model not available - run: npx prisma generate' }, { status:500 })
  }
  const c = await couponDelegate.findUnique({ where: { code: String(code).toUpperCase() } })
  if(!c) return NextResponse.json({ valid:false })

  const now = new Date()
  if(!c.isActive || c.startDate > now || c.endDate < now){
    return NextResponse.json({ valid:false, reason:'expired' })
  }
  if(c.usageLimit && c.usageCount >= c.usageLimit){
    return NextResponse.json({ valid:false, reason:'limit_reached' })
  }
  // Optional per-user usage tracking could be added with a join table
  if(amount && c.minAmount && amount < c.minAmount){
    return NextResponse.json({ valid:false, reason:'min_amount' })
  }

  // Compute discount result
  let discountValue = 0
  if(c.type === 'PERCENTAGE'){
    discountValue = (amount || 0) * (c.value/100)
    if(c.maxAmount) discountValue = Math.min(discountValue, c.maxAmount)
  } else if(c.type === 'FIXED_AMOUNT') {
    discountValue = c.value
  } else if(c.type === 'FREE_SHIPPING') {
    discountValue = 0
  }
  discountValue = Number(discountValue.toFixed(2))

  return NextResponse.json({
    valid:true,
    code: c.code,
    type: c.type,
    value: c.value,
    discount: discountValue,
    description: c.description,
    endDate: c.endDate
  })
}
