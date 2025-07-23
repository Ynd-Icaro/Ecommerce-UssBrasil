# 🚂 Railway Deploy - Setup Completo

## 🚀 Deploy em 3 Passos Simples

### 1. **Acesse Railway**
👉 https://railway.app
- Clique em **"Start a New Project"**
- Faça login com **GitHub**

### 2. **Import do Projeto**
- Clique em **"Deploy from GitHub repo"**
- Selecione: **`Ecommerce-UssBrasil`**
- Railway detectará automaticamente como projeto Next.js

### 3. **Adicionar Banco PostgreSQL**
- No dashboard do projeto, clique **"+ New"**
- Selecione **"Database"** > **"Add PostgreSQL"**
- A `DATABASE_URL` será gerada automaticamente

## ⚙️ **Configurar Variáveis de Ambiente**

No Railway dashboard:
1. Vá em **"Variables"**
2. Adicione estas variáveis:

```env
NEXTAUTH_SECRET=ussbrasil_railway_secret_super_seguro_123456789
NEXTAUTH_URL=${{RAILWAY_STATIC_URL}}
DATABASE_URL=${{DATABASE_URL}}
NODE_ENV=production
```

## 🎯 **URLs e Acesso**

Após o deploy:
- **Site:** `https://ecommerce-uss-brasil.up.railway.app`
- **Admin:** `https://ecommerce-uss-brasil.up.railway.app/admin`
- **Login:** `admin@ussbrasil.com.br` / `senha123`

## 💰 **Custos**

- **Grátis:** $5 de crédito por mês
- **Suficiente para:** Tráfego médio (~10k visitantes/mês)
- **Upgrade:** $5/mês para unlimited

## 🔧 **Comandos Úteis**

```bash
# Instalar Railway CLI (opcional)
npm install -g @railway/cli

# Login
railway login

# Deploy manual
railway up

# Logs em tempo real
railway logs

# Abrir no browser
railway open
```

## 🐛 **Troubleshooting**

### Build falha:
- Verifique se `NEXTAUTH_SECRET` está configurado
- Confirme se `DATABASE_URL` está presente

### Banco não conecta:
- Verifique se PostgreSQL foi adicionado
- Confirme se `DATABASE_URL` usa a variável `${{DATABASE_URL}}`

### Página não carrega:
- Verifique se `NEXTAUTH_URL` usa `${{RAILWAY_STATIC_URL}}`
- Confirme se a porta 3000 está sendo usada

## 🚀 **Deploy Automático**

Configuração já incluída:
- ✅ **Push no GitHub** → Deploy automático
- ✅ **Dockerfile** → Build otimizado
- ✅ **railway.toml** → Configurações específicas
- ✅ **Prisma** → Banco configurado automaticamente

**Resultado:** Site funcionando 100% em menos de 5 minutos! 🎉
