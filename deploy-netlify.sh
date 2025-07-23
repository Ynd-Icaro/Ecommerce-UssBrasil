#!/bin/bash

# 🚀 Script de Deploy Automático para Netlify
# Execute: chmod +x deploy-netlify.sh && ./deploy-netlify.sh

echo "🚀 Configurando projeto para deploy no Netlify..."

# Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ Execute este script no diretório raiz do projeto!"
    exit 1
fi

# Instalar Netlify CLI se não estiver instalado
if ! command -v netlify &> /dev/null; then
    echo "📦 Instalando Netlify CLI..."
    npm install -g netlify-cli
fi

# Verificar se está logado no Netlify
echo "🔐 Verificando login do Netlify..."
if ! netlify status &> /dev/null; then
    echo "🔑 Faça login no Netlify:"
    netlify login
fi

# Build do projeto
echo "🔨 Fazendo build do projeto..."
npm install
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build falhou! Verifique os erros acima."
    exit 1
fi

echo "✅ Build concluído com sucesso!"

# Configurar site no Netlify
echo "🌐 Configurando site no Netlify..."
netlify init

# Deploy inicial
echo "🚀 Fazendo deploy..."
netlify deploy

echo ""
echo "🎉 Deploy realizado com sucesso!"
echo ""
echo "📋 PRÓXIMOS PASSOS:"
echo "1. Configure as variáveis de ambiente no Netlify Dashboard"
echo "2. Configure um banco de dados (Supabase recomendado)"
echo "3. Faça o deploy final:"
echo "   netlify deploy --prod"
echo ""
echo "📚 Documentação completa: ./NETLIFY_DEPLOY.md"
echo "🔑 Variáveis de ambiente: ./NETLIFY_ENV_VARS.txt"
echo ""
echo "🌟 Seu site estará disponível em:"
netlify status | grep "Site url" || echo "Execute 'netlify status' para ver a URL"
