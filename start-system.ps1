# ============================================================================
# SCRIPT POWERSHELL PARA INICIAR SISTEMA USS BRASIL
# ============================================================================

Write-Host "🚀 Iniciando Sistema USS Brasil..." -ForegroundColor Cyan
Write-Host ""

# Verificar se as dependências estão instaladas
Write-Host "📦 Verificando dependências..." -ForegroundColor Yellow
if (!(Test-Path "node_modules")) {
    Write-Host "⚠️  node_modules não encontrado. Instalando dependências..." -ForegroundColor Red
    npm install
}

# Verificar se json-server está instalado
$jsonServerInstalled = npm list json-server 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "📥 Instalando json-server..." -ForegroundColor Yellow
    npm install json-server concurrently --save-dev
}

Write-Host "✅ Dependências verificadas!" -ForegroundColor Green
Write-Host ""

# Função para iniciar JSON Server
function Start-JsonServer {
    Write-Host "🗄️  Iniciando JSON Server na porta 3003..." -ForegroundColor Blue
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "npx json-server --watch db.json --port 3003 --delay 500"
}

# Função para iniciar Next.js
function Start-NextJs {
    Write-Host "⚡ Iniciando Next.js na porta 3000..." -ForegroundColor Blue
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"
}

# Iniciar serviços
Write-Host "🎯 Iniciando serviços..." -ForegroundColor Magenta
Start-JsonServer
Start-Sleep -Seconds 2
Start-NextJs

Write-Host ""
Write-Host "🎉 Sistema USS Brasil iniciado com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 URLs disponíveis:" -ForegroundColor Cyan
Write-Host "   🌐 Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "   🔌 API:      http://localhost:3003" -ForegroundColor White
Write-Host ""
Write-Host "⏹️  Para parar os serviços, feche as janelas do PowerShell abertas." -ForegroundColor Yellow
