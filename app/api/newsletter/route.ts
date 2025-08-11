import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest){
  const { email, name } = await req.json().catch(()=>({}))
  if(!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){
    return NextResponse.json({ error:'invalid email' }, { status:400 })
  }
  try {
  // NOTE: Ensure `npx prisma generate` has been run so prisma.Newsletter (lowercase -> newsletter) is available
    const delegate: any = (prisma as any).newsletter
    if(!delegate){
      // Fallback to in-memory if Prisma client not up-to-date yet
      return NextResponse.json({ error: 'newsletter model not available - run: npx prisma generate' }, { status: 500 })
    }
    const existing = await delegate.findUnique({ where: { email } })
    if(existing){
      if(!existing.isActive){
  await delegate.update({ where:{ email }, data:{ isActive:true } })
      }
      return NextResponse.json({ ok:true, duplicate:true })
    }
  const entry = await delegate.create({ data: { email, name: name?.slice(0,120) || null } })
    return NextResponse.json({ ok:true, id: entry.id })
  } catch(e){
    return NextResponse.json({ error:'failed' }, { status:500 })
  }
}

export async function GET(){
  try {
    const delegate: any = (prisma as any).newsletter
    if(!delegate){
      return NextResponse.json({ error: 'newsletter model not available - run: npx prisma generate' }, { status: 500 })
    }
    const total = await delegate.count({ where:{ isActive:true } })
    return NextResponse.json({ total })
  } catch (e){
    return NextResponse.json({ error:'failed' }, { status:500 })
  }
}
