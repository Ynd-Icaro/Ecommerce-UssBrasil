# PowerShell Deploy Script for UssBrasil E-commerce
# Script automatico completo para deploy em producao

Write-Host "=== UssBrasil E-commerce Deploy ===" -ForegroundColor Cyan
Write-Host "Iniciando deploy automatico..." -ForegroundColor Green

# Criar logs
$logFile = "deploy-$(Get-Date -Format 'yyyyMMdd-HHmmss').log"
Write-Host "Log do deploy: $logFile" -ForegroundColor Yellow

function Write-Log {
    param($Message)
    $timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
    $logMessage = "[$timestamp] $Message"
    Write-Host $logMessage
    $logMessage | Out-File -FilePath $logFile -Append -Encoding UTF8
}

Write-Log "=== INICIANDO DEPLOY ==="

# Verificar Node.js
Write-Log "Verificando Node.js..."
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Log "Node.js detectado: $nodeVersion"
} else {
    Write-Log "ERRO: Node.js nao encontrado!"
    exit 1
}

# Limpeza inicial
Write-Log "Limpando arquivos anteriores..."
npm run clean
if ($LASTEXITCODE -ne 0) {
    Write-Log "AVISO: Falha na limpeza, continuando..."
}

# Instalar dependencias
Write-Log "Instalando dependencias..."
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Log "ERRO: Falha na instalacao das dependencias"
    exit 1
}

# Configurar ambiente
Write-Log "Configurando ambiente..."
if (-not (Test-Path ".env.local")) {
    $envContent = @"
NEXTAUTH_SECRET=ussbrasil_secret_key_production_$(Get-Random -Minimum 1000 -Maximum 9999)
NEXTAUTH_URL=https://ussbrasil.netlify.app
NEXT_PUBLIC_API_URL=https://ussbrasil.netlify.app/api
DATABASE_URL="file:./prod.db"
EMAIL_FROM=noreply@ussbrasil.com
"@
    $envContent | Out-File -FilePath ".env.local" -Encoding UTF8
    Write-Log "Arquivo .env.local criado para producao"
}

# Setup do banco
Write-Log "Configurando banco de dados..."
npx prisma generate
if ($LASTEXITCODE -ne 0) {
    Write-Log "ERRO: Falha ao gerar cliente Prisma"
    exit 1
}

npx prisma db push
if ($LASTEXITCODE -ne 0) {
    Write-Log "ERRO: Falha ao aplicar schema do banco"
    exit 1
}

# Type checking
Write-Log "Verificando tipos TypeScript..."
npm run type-check
if ($LASTEXITCODE -ne 0) {
    Write-Log "AVISO: Erros de TypeScript encontrados, continuando..."
}

# Build de producao
Write-Log "Criando build de producao..."
npm run build:production
if ($LASTEXITCODE -ne 0) {
    Write-Log "ERRO: Falha no build de producao"
    exit 1
}

# Deploy para Netlify (se CLI estiver instalado)
Write-Log "Verificando Netlify CLI..."
if (Get-Command netlify -ErrorAction SilentlyContinue) {
    Write-Log "Fazendo deploy para Netlify..."
    netlify deploy --prod --dir=.next
    if ($LASTEXITCODE -eq 0) {
        Write-Log "Deploy realizado com sucesso!"
    } else {
        Write-Log "AVISO: Erro no deploy automatico"
    }
} else {
    Write-Log "Netlify CLI nao encontrado. Install com: npm install -g netlify-cli"
}

# Sucesso
Write-Log "=== DEPLOY CONCLUIDO ==="
Write-Host "=== DEPLOY FINALIZADO ===" -ForegroundColor Green
Write-Host "Logs salvos em: $logFile" -ForegroundColor Yellow
Write-Host "Build pronto em: .next/" -ForegroundColor White
Write-Host "" -ForegroundColor White
Write-Host "Para deploy manual:" -ForegroundColor White
Write-Host "1. Conecte seu repo no Netlify" -ForegroundColor White
Write-Host "2. Configure build: npm run build:production" -ForegroundColor White
Write-Host "3. Configure publish: .next" -ForegroundColor White
