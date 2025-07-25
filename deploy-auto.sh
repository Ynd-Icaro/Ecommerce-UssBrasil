#!/bin/bash

echo "🚀 DEPLOY AUTOMATIZADO - USSBRASIL ECOMMERCE"
echo "============================================="

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para log
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    error "package.json não encontrado. Execute este script na raiz do projeto."
    exit 1
fi

log "Iniciando processo de deploy..."

# 1. Limpeza
log "🧹 Limpando arquivos antigos..."
npm run clean
success "Limpeza concluída"

# 2. Instalação de dependências
log "📦 Instalando dependências..."
npm install
if [ $? -eq 0 ]; then
    success "Dependências instaladas"
else
    error "Falha na instalação de dependências"
    exit 1
fi

# 3. Configuração do banco
log "🗄️ Configurando banco de dados..."
npx prisma generate
npx prisma db push
success "Banco configurado"

# 4. Verificação de tipos
log "🔍 Verificando tipos TypeScript..."
npm run type-check
if [ $? -eq 0 ]; then
    success "Verificação de tipos OK"
else
    warning "Problemas de tipo encontrados, mas continuando..."
fi

# 5. Build de produção
log "🏗️ Construindo aplicação..."
npm run build:production
if [ $? -eq 0 ]; then
    success "Build concluído com sucesso!"
else
    error "Falha no build"
    exit 1
fi

# 6. Deploy (se Netlify CLI estiver instalado)
if command -v netlify &> /dev/null; then
    log "🌐 Fazendo deploy no Netlify..."
    netlify deploy --prod
    if [ $? -eq 0 ]; then
        success "Deploy concluído!"
        echo ""
        echo "🎉 Site deployado com sucesso!"
        echo "📱 Acesse: https://ussbrasil.netlify.app"
    else
        error "Falha no deploy"
        exit 1
    fi
else
    warning "Netlify CLI não encontrado. Execute manualmente:"
    echo "   npm install -g netlify-cli"
    echo "   netlify deploy --prod"
fi

echo ""
success "🚀 DEPLOY FINALIZADO!"
