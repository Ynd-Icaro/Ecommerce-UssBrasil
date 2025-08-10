import { NextRequest, NextResponse } from 'next/server'

interface ReturnRequest { id:string; orderId:string; reason:string; details:string; status:'received'|'approved'|'rejected'|'refunded'; createdAt:string }

const returns: ReturnRequest[] = []

export async function GET(){
  return NextResponse.json(returns)
}

export async function POST(req: NextRequest){
  const body = await req.json().catch(()=>null)
  if(!body || !body.orderId || !body.reason){
    return NextResponse.json({ error:'invalid' }, { status:400 })
  }
  const entry: ReturnRequest = {
    id: crypto.randomUUID(),
    orderId: body.orderId,
    reason: body.reason,
    details: body.details || '',
    status:'received',
    createdAt: new Date().toISOString()
  }
  returns.push(entry)
  return NextResponse.json(entry,{ status:201 })
}
