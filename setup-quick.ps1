# PowerShell Setup Script for UssBrasil E-commerce
# Execute este script para configuracao automatica completa

Write-Host "=== UssBrasil E-commerce Setup ===" -ForegroundColor Cyan
Write-Host "Iniciando configuracao automatica..." -ForegroundColor Green

# Verificar se Node.js esta instalado
Write-Host "Verificando Node.js..." -ForegroundColor Yellow
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host "Node.js detectado: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "ERRO: Node.js nao encontrado!" -ForegroundColor Red
    Write-Host "Instale Node.js 18+ de: https://nodejs.org" -ForegroundColor Yellow
    exit 1
}

# Instalar dependencias
Write-Host "Instalando dependencias..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO: Falha na instalacao das dependencias" -ForegroundColor Red
    exit 1
}

# Verificar se .env.local existe
Write-Host "Configurando arquivo de ambiente..." -ForegroundColor Yellow
if (-not (Test-Path ".env.local")) {
    $envContent = @"
NEXTAUTH_SECRET=ussbrasil_secret_key_2024
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3003
DATABASE_URL="file:./dev.db"
EMAIL_FROM=noreply@ussbrasil.com
"@
    $envContent | Out-File -FilePath ".env.local" -Encoding UTF8
    Write-Host "Arquivo .env.local criado!" -ForegroundColor Green
} else {
    Write-Host "Arquivo .env.local ja existe" -ForegroundColor Green
}

# Configurar Prisma
Write-Host "Configurando Prisma..." -ForegroundColor Yellow
npx prisma generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO: Falha ao gerar cliente Prisma" -ForegroundColor Red
    exit 1
}

npx prisma db push
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO: Falha ao aplicar schema do banco" -ForegroundColor Red
    exit 1
}

# Testar build
Write-Host "Testando build..." -ForegroundColor Yellow
npm run type-check
if ($LASTEXITCODE -ne 0) {
    Write-Host "AVISO: Erros de TypeScript encontrados" -ForegroundColor Yellow
} else {
    Write-Host "TypeScript OK!" -ForegroundColor Green
}

# Sucesso
Write-Host "=== SETUP CONCLUIDO ===" -ForegroundColor Green
Write-Host "Para iniciar o desenvolvimento:" -ForegroundColor White
Write-Host "npm run dev:full" -ForegroundColor Cyan
Write-Host "" -ForegroundColor White
Write-Host "URLs de acesso:" -ForegroundColor White
Write-Host "- Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "- Admin: http://localhost:3000/admin" -ForegroundColor White
Write-Host "- API: http://localhost:3003" -ForegroundColor White
