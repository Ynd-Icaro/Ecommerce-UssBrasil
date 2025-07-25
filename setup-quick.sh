#!/bin/bash

echo "🚀 CONFIGURAÇÃO RÁPIDA - USSBRASIL ECOMMERCE"
echo "============================================="

# Definir diretório do projeto
PROJECT_DIR="/c/www/ecomuss/front-uss"
cd "$PROJECT_DIR"

echo "📦 Instalando dependências..."
npm install

echo "🗄️ Configurando banco de dados..."
npx prisma generate
npx prisma db push

echo "🌱 Seedando dados iniciais..."
npx prisma db seed || echo "⚠️  Seed falhou, continuando..."

echo "🔧 Corrigindo configurações críticas..."

# Verificar se .env.local existe
if [ ! -f ".env.local" ]; then
    echo "Criando .env.local..."
    cat > .env.local << EOL
NEXTAUTH_SECRET=ussbrasil_secret_key_2024
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_API_URL=http://localhost:3003
EOL
fi

echo "🎯 Testando build..."
npm run type-check

echo "✅ CONFIGURAÇÃO CONCLUÍDA!"
echo ""
echo "Para iniciar o desenvolvimento:"
echo "1. npm run dev (em um terminal)"
echo "2. npx json-server --watch db.json --port 3003 (em outro terminal)"
echo ""
echo "Para deploy:"
echo "1. npm run build"
echo "2. npm run start"
