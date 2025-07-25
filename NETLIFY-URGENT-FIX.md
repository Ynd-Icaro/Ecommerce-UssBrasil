# 🚨 GUIA URGENTE - Configurar Painel Netlify

## ⚡ PASSOS CRÍTICOS NO PAINEL NETLIFY

### 1. **Environment Variables** (ADICIONE AGORA):
```
Vá para: Site settings > Environment variables > Add variable

Adicione cada uma:
NODE_VERSION = 20
NEXT_TELEMETRY_DISABLED = 1  
NEXTAUTH_URL = https://uss-brasil.netlify.app
NEXT_PUBLIC_API_URL = https://uss-brasil.netlify.app/api
NEXTAUTH_SECRET = your-super-secret-key-here-change-this
```

### 2. **Build Settings** (VERIFIQUE):
```
Build & deploy > Build settings:

✅ Build command: npm run build:production
✅ Publish directory: .next  
✅ Functions directory: .netlify/functions
```

### 3. **Deploy Trigger** (FORCE REBUILD):
```
Deploys > Trigger deploy > Deploy site
```

## 🎯 Diagnóstico Rápido

O erro 404 "Page not found" indica que:
- ❌ O site não está encontrando as páginas corretas
- ❌ O roteamento SPA não está funcionando
- ❌ O plugin Next.js pode não estar ativo

## ✅ Soluções Implementadas

1. **next.config.ts**: ✅ Corrigido para `output: 'standalone'`
2. **netlify.toml**: ✅ Adicionados redirects para SPA
3. **API routing**: ✅ Configurado para Netlify functions
4. **Environment vars**: ✅ Atualizadas com URLs corretas

## 🚀 Próximo Passo

**ADICIONE AS ENVIRONMENT VARIABLES NO PAINEL NETLIFY** e force um novo deploy!

Após adicionar as variáveis, o site deve funcionar corretamente.
