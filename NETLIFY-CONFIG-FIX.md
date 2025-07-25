# Netlify Build Configuration Instructions

## 🚨 Configurações Críticas no Painel Netlify

### 1. **Build & Deploy Settings** (ATUALIZE NO PAINEL):

```
Runtime: Next.js ✅ (já configurado)
Build command: npm run build:production ✅ (já configurado)  
Publish directory: .next ✅ (já configurado)
Functions directory: .netlify/functions (deixe padrão)
```

### 2. **Environment Variables** (ADICIONE NO PAINEL):
```
NODE_VERSION = 20
NEXT_TELEMETRY_DISABLED = 1
NEXTAUTH_URL = https://uss-brasil.netlify.app
NEXT_PUBLIC_API_URL = https://uss-brasil.netlify.app/api
NEXTAUTH_SECRET = [gere um secret seguro]
```

### 3. **Deploy Settings** (VERIFIQUE NO PAINEL):
```
Production branch: master ✅
Deploy Previews: Enable ✅
Branch deploys: Deploy only production branch ✅
```

### 4. **Site Settings** (CONFIGURE NO PAINEL):
```
Site name: uss-brasil
Custom domain: uss-brasil.netlify.app
HTTPS: Force HTTPS (enable)
```

## 🔧 Próximos Passos

1. **No Painel Netlify**, vá em:
   - `Site settings > Environment variables`
   - Adicione as variáveis listadas acima

2. **Force um rebuild**:
   - `Deploys > Trigger deploy > Deploy site`

3. **Verifique o build log** para erros

## 🎯 Diagnóstico do 404

O erro 404 geralmente indica:
- ❌ Publish directory incorreto
- ❌ Plugin Next.js não funcionando
- ❌ Redirects não configurados
- ❌ Environment variables faltando

## ✅ Soluções Implementadas

- ✅ `netlify.toml` atualizado com redirects
- ✅ `next.config.ts` corrigido para `standalone`
- ✅ Variáveis de ambiente alinhadas
- ✅ Plugin @netlify/plugin-nextjs habilitado
