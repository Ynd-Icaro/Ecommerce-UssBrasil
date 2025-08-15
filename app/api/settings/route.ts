import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'db.json')

// Função para ler o banco de dados
function readDatabase() {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Erro ao ler banco de dados:', error)
    return { settings: {} }
  }
}

// Função para escrever no banco de dados
function writeDatabase(data: any) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error('Erro ao escrever banco de dados:', error)
    return false
  }
}

// GET - Buscar configurações
export async function GET() {
  try {
    const db = readDatabase()
    const settings = db.settings || {
      storeName: 'USS Brasil',
      storeEmail: 'contato@ussbrasil.com',
      storePhone: '+55 11 99999-9999',
      storeAddress: 'São Paulo, SP - Brasil',
      storeDescription: 'Loja premium de produtos Apple',
      theme: 'light',
      emailNotifications: true,
      smsNotifications: false,
      twoFactorAuth: false,
      passwordExpiry: '90'
    }

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Erro ao buscar configurações:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar configurações' },
      { status: 500 }
    )
  }
}

// POST/PUT - Atualizar configurações
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const db = readDatabase()
    
    // Atualizar as configurações
    db.settings = {
      ...db.settings,
      ...body
    }

    if (writeDatabase(db)) {
      return NextResponse.json(db.settings)
    } else {
      return NextResponse.json(
        { error: 'Erro ao salvar configurações' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Erro ao atualizar configurações:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar configurações' },
      { status: 500 }
    )
  }
}

// Alias para PUT
export const PUT = POST
