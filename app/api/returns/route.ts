import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// NOTE: You don't currently have a Return model. This uses a dynamic table name assumption.
// To persist, add a Prisma model (e.g., ReturnRequest) then regenerate. Fallback returns in-memory error.

export async function GET(){
  const delegate: any = (prisma as any).returnRequest || (prisma as any).return
  if(!delegate){
    return NextResponse.json({ error:'return model not available - define in schema.prisma and run: npx prisma generate' }, { status:500 })
  }
  try {
    const list = await delegate.findMany({ orderBy:{ createdAt:'desc' }, take:100 })
    return NextResponse.json(list)
  } catch(e){
    return NextResponse.json({ error:'failed' }, { status:500 })
  }
}

export async function POST(req: NextRequest){
  const body = await req.json().catch(()=>null)
  if(!body || !body.orderId || !body.reason){
    return NextResponse.json({ error:'invalid' }, { status:400 })
  }
  const delegate: any = (prisma as any).returnRequest || (prisma as any).return
  if(!delegate){
    return NextResponse.json({ error:'return model not available - define model first' }, { status:500 })
  }
  try {
    const entry = await delegate.create({ data: {
      orderId: body.orderId,
      reason: body.reason.slice(0,120),
      details: body.details?.slice(0,1000) || '',
      status: 'RECEIVED'
    }})
    return NextResponse.json(entry,{ status:201 })
  } catch(e){
    return NextResponse.json({ error:'failed' }, { status:500 })
  }
}
