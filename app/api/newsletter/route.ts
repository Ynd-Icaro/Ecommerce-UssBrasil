import { NextRequest, NextResponse } from 'next/server'

const list: { id:string; email:string; createdAt:string }[] = []

export async function POST(req: NextRequest){
  const { email } = await req.json().catch(()=>({}))
  if(!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){
    return NextResponse.json({ error:'invalid email' }, { status:400 })
  }
  if(list.some(i=>i.email.toLowerCase()===String(email).toLowerCase())){
    return NextResponse.json({ ok:true, duplicate:true })
  }
  const entry = { id: crypto.randomUUID(), email, createdAt: new Date().toISOString() }
  list.push(entry)
  return NextResponse.json({ ok:true, id: entry.id })
}

export async function GET(){
  return NextResponse.json({ total:list.length })
}
