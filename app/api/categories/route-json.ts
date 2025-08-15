import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    // Ler dados do JSON
    const jsonPath = path.join(process.cwd(), 'data', 'db.json')
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
    
    const categories = data.categories.sort((a: any, b: any) => a.name.localeCompare(b.name))

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories from JSON:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar categorias' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    return NextResponse.json({ message: 'Category creation not implemented for JSON mode' }, { status: 501 })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { error: 'Erro ao criar categoria' },
      { status: 500 }
    )
  }
}
