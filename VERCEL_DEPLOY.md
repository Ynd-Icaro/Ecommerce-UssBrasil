# 🚀 Guia de Deploy na Vercel

## 📋 Variáveis de Ambiente Obrigatórias

### Para a Vercel, você precisa configurar APENAS estas variáveis essenciais:

```env
NEXTAUTH_SECRET=gere-uma-chave-super-segura-de-32-caracteres
NEXTAUTH_URL=https://seu-projeto.vercel.app
DATABASE_URL=postgresql://seu-banco-de-dados
```

## 🔧 Configuração Passo a Passo

### 1. **NEXTAUTH_SECRET** (OBRIGATÓRIO)
```bash
# Gere uma chave segura usando este comando:
openssl rand -base64 32
```
Ou use um gerador online: https://generate-secret.vercel.app/32

### 2. **NEXTAUTH_URL** (OBRIGATÓRIO)
- Desenvolvimento: `http://localhost:3000`
- Produção: `https://seu-projeto.vercel.app` (a Vercel pode preencher automaticamente)

### 3. **DATABASE_URL** (OBRIGATÓRIO)
- **Desenvolvimento**: `file:./dev.db` (SQLite)
- **Produção**: Use PostgreSQL (recomendado)

#### Opções de Banco para Produção:

**Vercel Postgres (Recomendado):**
```bash
# Na Vercel, vá em Storage > Create Database > Postgres
# A DATABASE_URL será gerada automaticamente
```

**Supabase (Gratuito):**
```env
DATABASE_URL="postgresql://usuario:senha@db.supabase.co:5432/postgres"
```

**Railway (Gratuito):**
```env
DATABASE_URL="postgresql://usuario:senha@containers-us-west-x.railway.app:5432/railway"
```

## 🌐 Configuração na Vercel

### Método 1: Interface Web
1. Vá para [vercel.com](https://vercel.com)
2. Import o projeto do GitHub
3. Na seção "Environment Variables", adicione:
   - `NEXTAUTH_SECRET`: sua-chave-segura
   - `NEXTAUTH_URL`: deixe em branco (será preenchido automaticamente)
   - `DATABASE_URL`: sua-string-de-conexão-postgresql

### Método 2: CLI
```bash
# Instale a Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Adicionar variáveis de ambiente
vercel env add NEXTAUTH_SECRET
vercel env add DATABASE_URL
```

## 📁 Estrutura de Arquivos de Ambiente

```
projeto/
├── .env.example          # Template (commitado)
├── .env.local           # Desenvolvimento (não commitado)
├── .env.local.example   # Exemplo local (commitado)
└── .gitignore          # Inclui .env.local
```

## ⚠️ Resolução do Erro de Duplicação

Se aparecer erro "DATABASE_URL already exists":

1. **Na Vercel Dashboard:**
   - Vá em Settings > Environment Variables
   - Exclua a variável duplicada
   - Adicione novamente

2. **Ou limpe todas e adicione de novo:**
   ```bash
   vercel env rm DATABASE_URL
   vercel env add DATABASE_URL
   ```

## 🔒 Variáveis Opcionais (Configure só se precisar)

```env
# Email (para reset de senha)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=seu-email@gmail.com
EMAIL_SERVER_PASSWORD=sua-senha-de-app

# Google OAuth (para login com Google)
GOOGLE_CLIENT_ID=seu-google-client-id
GOOGLE_CLIENT_SECRET=seu-google-client-secret

# Pagamentos (se usar Stripe)
STRIPE_PUBLISHABLE_KEY=pk_live_sua_chave
STRIPE_SECRET_KEY=sk_live_sua_chave_secreta
```

## 🎯 Resumo para Deploy Rápido

**Configuração Mínima na Vercel:**
1. `NEXTAUTH_SECRET`: Use https://generate-secret.vercel.app/32
2. `NEXTAUTH_URL`: Deixe vazio (será preenchido automaticamente)
3. `DATABASE_URL`: Configure um PostgreSQL (Vercel Postgres recomendado)

**Comandos:**
```bash
# Clonar e configurar localmente
git clone https://github.com/Ynd-Icaro/Ecommerce-UssBrasil.git
cd Ecommerce-UssBrasil
npm install
cp .env.local.example .env.local
# Edite .env.local com suas configurações locais
npm run dev
```

## 🚨 Problemas Comuns

1. **Build falha**: Verifique se NEXTAUTH_SECRET está configurado
2. **Erro de banco**: Use PostgreSQL em produção, não SQLite
3. **Redirecionamento**: NEXTAUTH_URL deve ser exata (com/sem barra final)
4. **Permissões**: Variáveis de produção só funcionam em produção
