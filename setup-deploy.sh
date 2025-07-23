#!/bin/bash

# 🚀 Script de Deploy Automático para Netlify
# Execute este script para preparar tudo automaticamente

echo "🎯 Iniciando configuração de deploy para Netlify..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}📋 Verificando pré-requisitos...${NC}"

# Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ package.json não encontrado. Execute este script na raiz do projeto.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Projeto Next.js encontrado${NC}"

# Verificar se tem Git configurado
if [ ! -d ".git" ]; then
    echo -e "${RED}❌ Repositório Git não inicializado${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Repositório Git encontrado${NC}"

# Criar arquivo netlify.toml se não existir
if [ ! -f "netlify.toml" ]; then
    echo -e "${YELLOW}📝 Criando netlify.toml...${NC}"
    cat > netlify.toml << 'EOL'
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "9"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[dev]
  command = "npm run dev"
  port = 3000

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"

[[headers]]
  for = "/api/*"
  [headers.values]
    Access-Control-Allow-Origin = "*"
    Access-Control-Allow-Methods = "GET, POST, PUT, DELETE, OPTIONS"
    Access-Control-Allow-Headers = "Content-Type, Authorization"
EOL
    echo -e "${GREEN}✅ netlify.toml criado${NC}"
else
    echo -e "${GREEN}✅ netlify.toml já existe${NC}"
fi

# Verificar se o build funciona
echo -e "${BLUE}🏗️ Testando build local...${NC}"
if npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Build local bem-sucedido${NC}"
else
    echo -e "${RED}❌ Build local falhou. Verifique os erros:${NC}"
    npm run build
    exit 1
fi

# Criar arquivo de variáveis de ambiente de exemplo
echo -e "${YELLOW}📝 Criando arquivo de exemplo de variáveis...${NC}"
cat > .env.example << 'EOL'
# 🔐 Variáveis de Ambiente para Netlify

# NextAuth.js (OBRIGATÓRIO)
NEXTAUTH_SECRET=sua-chave-super-segura-de-32-caracteres-minimo
NEXTAUTH_URL=https://seu-site.netlify.app

# Database (OBRIGATÓRIO) - Use Supabase gratuito
DATABASE_URL=postgresql://postgres:senha@db.reference.supabase.co:5432/postgres

# App (OBRIGATÓRIO)
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://seu-site.netlify.app

# Autenticação Google (OPCIONAL)
GOOGLE_CLIENT_ID=seu-google-client-id
GOOGLE_CLIENT_SECRET=seu-google-client-secret

# Autenticação GitHub (OPCIONAL)
GITHUB_CLIENT_ID=seu-github-client-id
GITHUB_CLIENT_SECRET=seu-github-client-secret

# Email SMTP (OPCIONAL)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-de-app
EOL

# Gerar chave secreta aleatória
SECRET_KEY=$(openssl rand -base64 32 2>/dev/null || python3 -c "import secrets; print(secrets.token_urlsafe(32))" 2>/dev/null || echo "GERE-UMA-CHAVE-SECRETA-DE-32-CARACTERES")

echo -e "${BLUE}🔑 Chave secreta gerada para NEXTAUTH_SECRET:${NC}"
echo -e "${YELLOW}${SECRET_KEY}${NC}"

# Verificar se o repositório está atualizado
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}📤 Commitando alterações...${NC}"
    git add .
    git commit -m "feat: configure Netlify deployment"
    git push
    echo -e "${GREEN}✅ Alterações enviadas para GitHub${NC}"
else
    echo -e "${GREEN}✅ Repositório já atualizado${NC}"
fi

echo -e "${GREEN}🎉 Preparação concluída!${NC}"
echo ""
echo -e "${BLUE}📋 Próximos passos:${NC}"
echo -e "${YELLOW}1.${NC} Acesse https://netlify.com e faça login com GitHub"
echo -e "${YELLOW}2.${NC} Clique em 'New site from Git'"
echo -e "${YELLOW}3.${NC} Selecione seu repositório"
echo -e "${YELLOW}4.${NC} Configure:"
echo "   - Build command: npm run build"
echo "   - Publish directory: .next"
echo -e "${YELLOW}5.${NC} Adicione as variáveis de ambiente (veja .env.example)"
echo -e "${YELLOW}6.${NC} Sua chave NEXTAUTH_SECRET: ${SECRET_KEY}"
echo ""
echo -e "${BLUE}🗄️ Para o banco de dados:${NC}"
echo -e "${YELLOW}1.${NC} Acesse https://supabase.com"
echo -e "${YELLOW}2.${NC} Crie um novo projeto"
echo -e "${YELLOW}3.${NC} Copie a connection string em Settings > Database"
echo -e "${YELLOW}4.${NC} Use como DATABASE_URL no Netlify"
echo ""
echo -e "${GREEN}🚀 Deploy será automático após configurar as variáveis!${NC}"
echo ""
echo -e "${BLUE}📖 Documentação completa em:${NC}"
echo "   - NETLIFY_COMPLETE_GUIDE.md"
echo "   - DEPLOYMENT_OPTIONS.md"
