import { NextRequest, NextResponse } from 'next/server'

const coupons: Record<string, { code:string, discount:number, expires:string|null }> = {
  'USS10': { code:'USS10', discount:0.10, expires:null },
  'USS20': { code:'USS20', discount:0.20, expires:null },
  'WELCOME5': { code:'WELCOME5', discount:0.05, expires:null }
}

export async function GET(req: NextRequest){
  return NextResponse.json(Object.values(coupons))
}

export async function POST(req: NextRequest){
  const { code } = await req.json().catch(()=>({}))
  if(!code) return NextResponse.json({ error:'code required' }, { status:400 })
  const key = String(code).toUpperCase()
  const c = coupons[key]
  if(!c) return NextResponse.json({ valid:false }, { status:200 })
  return NextResponse.json({ valid:true, ...c })
}
