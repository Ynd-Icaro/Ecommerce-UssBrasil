#!/bin/bash

# 🚀 Script de Deploy Automatizado
# Escolha sua plataforma de deploy favorita

echo "🚀 USS BRASIL E-COMMERCE - DEPLOY AUTOMATIZADO"
echo "=================================================="
echo ""
echo "Escolha sua plataforma de deploy:"
echo ""
echo "1) 🚂 Railway (Recomendado - Mais simples)"
echo "2) 🎨 Render (Boa performance)"
echo "3) 🌐 Netlify + Supabase (100% gratuito)"
echo "4) 🟠 Heroku (Clássico)"
echo ""
read -p "Digite o número da sua escolha (1-4): " choice

case $choice in
  1)
    echo ""
    echo "🚂 RAILWAY SETUP"
    echo "================"
    echo "1. Acesse: https://railway.app"
    echo "2. Login com GitHub"
    echo "3. Deploy from GitHub repo: Ecommerce-UssBrasil"
    echo "4. Add PostgreSQL database"
    echo ""
    echo "Variáveis de ambiente:"
    echo "NEXTAUTH_SECRET=railway_secret_super_seguro_123"
    echo "NEXTAUTH_URL=\${{RAILWAY_STATIC_URL}}"
    echo "DATABASE_URL=\${{DATABASE_URL}}"
    echo ""
    echo "📖 Guia completo: RAILWAY_SETUP.md"
    ;;
  2)
    echo ""
    echo "🎨 RENDER SETUP"
    echo "==============="
    echo "1. Acesse: https://render.com"
    echo "2. New > Web Service"
    echo "3. Connect GitHub: Ecommerce-UssBrasil"
    echo "4. Build: npm install && npm run build"
    echo "5. Start: npm start"
    echo "6. Criar PostgreSQL database separadamente"
    echo ""
    echo "📖 Guia completo: RENDER_SETUP.md"
    ;;
  3)
    echo ""
    echo "🌐 NETLIFY + SUPABASE SETUP"
    echo "============================"
    echo "1. Supabase: https://supabase.com (banco)"
    echo "2. Netlify: https://netlify.com (frontend)"
    echo "3. 100% gratuito e muito rápido"
    echo ""
    echo "⚠️  Requer configuração adicional do next.config.js"
    echo "📖 Guia completo: NETLIFY_SUPABASE_SETUP.md"
    ;;
  4)
    echo ""
    echo "🟠 HEROKU SETUP"
    echo "==============="
    echo "1. Instale Heroku CLI"
    echo "2. heroku create ecommerce-uss-brasil"
    echo "3. heroku addons:create heroku-postgresql:hobby-dev"
    echo "4. git push heroku master"
    echo ""
    echo "📖 Documentação: https://devcenter.heroku.com"
    ;;
  *)
    echo "Opção inválida. Tente novamente."
    ;;
esac

echo ""
echo "🎯 CREDENCIAIS DE ADMIN PADRÃO:"
echo "Email: admin@ussbrasil.com.br"
echo "Senha: admin123"
echo ""
echo "🔗 URLs importantes após deploy:"
echo "- Site: https://seu-site.plataforma.com"
echo "- Admin: https://seu-site.plataforma.com/admin"
echo ""
echo "✅ Projeto pronto para deploy! Boa sorte! 🚀"
