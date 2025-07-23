# 🚀 Script de Deploy Automático para Netlify (Windows)
# Execute: .\setup-deploy.ps1

Write-Host "🎯 Iniciando configuração de deploy para Netlify..." -ForegroundColor Blue

# Verificar se está no diretório correto
if (-not (Test-Path "package.json")) {
    Write-Host "❌ package.json não encontrado. Execute este script na raiz do projeto." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Projeto Next.js encontrado" -ForegroundColor Green

# Verificar se tem Git configurado
if (-not (Test-Path ".git")) {
    Write-Host "❌ Repositório Git não inicializado" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Repositório Git encontrado" -ForegroundColor Green

# Criar arquivo netlify.toml se não existir
if (-not (Test-Path "netlify.toml")) {
    Write-Host "📝 Criando netlify.toml..." -ForegroundColor Yellow
    
    $netlifyConfig = @"
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
"@
    
    $netlifyConfig | Out-File -FilePath "netlify.toml" -Encoding UTF8
    Write-Host "✅ netlify.toml criado" -ForegroundColor Green
} else {
    Write-Host "✅ netlify.toml já existe" -ForegroundColor Green
}

# Verificar se o build funciona
Write-Host "🏗️ Testando build local..." -ForegroundColor Blue
try {
    $buildOutput = npm run build 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Build local bem-sucedido" -ForegroundColor Green
    } else {
        throw "Build falhou"
    }
} catch {
    Write-Host "❌ Build local falhou. Verifique os erros:" -ForegroundColor Red
    npm run build
    exit 1
}

# Criar arquivo de variáveis de ambiente de exemplo
Write-Host "📝 Criando arquivo de exemplo de variáveis..." -ForegroundColor Yellow

$envExample = @"
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
"@

$envExample | Out-File -FilePath ".env.example" -Encoding UTF8

# Gerar chave secreta aleatória
$secretBytes = New-Object byte[] 32
[System.Security.Cryptography.RNGCryptoServiceProvider]::Create().GetBytes($secretBytes)
$secretKey = [Convert]::ToBase64String($secretBytes)

Write-Host "🔑 Chave secreta gerada para NEXTAUTH_SECRET:" -ForegroundColor Blue
Write-Host $secretKey -ForegroundColor Yellow

# Verificar se o repositório está atualizado
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "📤 Commitando alterações..." -ForegroundColor Yellow
    git add .
    git commit -m "feat: configure Netlify deployment"
    git push
    Write-Host "✅ Alterações enviadas para GitHub" -ForegroundColor Green
} else {
    Write-Host "✅ Repositório já atualizado" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎉 Preparação concluída!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos passos:" -ForegroundColor Blue
Write-Host "1. Acesse https://netlify.com e faça login com GitHub" -ForegroundColor Yellow
Write-Host "2. Clique em 'New site from Git'" -ForegroundColor Yellow
Write-Host "3. Selecione seu repositório" -ForegroundColor Yellow
Write-Host "4. Configure:" -ForegroundColor Yellow
Write-Host "   - Build command: npm run build"
Write-Host "   - Publish directory: .next"
Write-Host "5. Adicione as variáveis de ambiente (veja .env.example)" -ForegroundColor Yellow
Write-Host "6. Sua chave NEXTAUTH_SECRET: $secretKey" -ForegroundColor Yellow
Write-Host ""
Write-Host "🗄️ Para o banco de dados:" -ForegroundColor Blue
Write-Host "1. Acesse https://supabase.com" -ForegroundColor Yellow
Write-Host "2. Crie um novo projeto" -ForegroundColor Yellow
Write-Host "3. Copie a connection string em Settings > Database" -ForegroundColor Yellow
Write-Host "4. Use como DATABASE_URL no Netlify" -ForegroundColor Yellow
Write-Host ""
Write-Host "🚀 Deploy será automático após configurar as variáveis!" -ForegroundColor Green
Write-Host ""
Write-Host "📖 Documentação completa em:" -ForegroundColor Blue
Write-Host "   - NETLIFY_COMPLETE_GUIDE.md"
Write-Host "   - DEPLOYMENT_OPTIONS.md"

# Pausar para o usuário ler
Read-Host "Pressione Enter para continuar..."
