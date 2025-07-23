# 🚀 Deploy Completo no Netlify (100% GRATUITO)

O Netlify é perfeito para Next.js e oferece tudo que você precisa gratuitamente!

## 🎯 **Vantagens do Netlify:**
- ✅ **100% Gratuito** (500GB bandwidth/mês)
- ✅ **Deploy automático** do GitHub
- ✅ **SSL/HTTPS** automático
- ✅ **CDN global** incluído
- ✅ **Variáveis de ambiente** ilimitadas
- ✅ **Functions serverless** incluídas
- ✅ **Preview deploys** para cada PR
- ✅ **Rollback** instantâneo

## 📋 **Configuração de Banco de Dados**

### Opção 1: Supabase (Recomendado - Gratuito)
1. Acesse: https://supabase.com
2. Crie conta gratuita
3. Create New Project
4. Copie a **Database URL**

### Opção 2: PlanetScale (Gratuito)
1. Acesse: https://planetscale.com
2. Crie conta gratuita
3. Create Database
4. Copie a **Connection String**

### Opção 3: Railway (Gratuito)
1. Acesse: https://railway.app
2. Login com GitHub
3. New Project > Add PostgreSQL
4. Copie a **DATABASE_URL**

## 🔧 **Deploy Passo a Passo**

### 1. **Preparar o Repositório**
```bash
# O projeto já está pronto! Apenas certifique-se de que está atualizado
git pull origin master
```

### 2. **Configurar no Netlify**

#### **Via Interface Web (Recomendado):**
1. Acesse: https://netlify.com
2. **Login** com GitHub
3. **New site from Git**
4. Escolha: **GitHub**
5. Selecione: **Ynd-Icaro/Ecommerce-UssBrasil**
6. **Configure:**
   - **Base directory:** `./` (deixe vazio)
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`

#### **Via Netlify CLI:**
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Deploy para produção
netlify deploy --prod
```

### 3. **Configurar Variáveis de Ambiente**

No **Netlify Dashboard**:
1. Vá em **Site settings**
2. **Environment variables**
3. **Add variable** para cada uma:

```env
# OBRIGATÓRIAS
NEXTAUTH_SECRET=sua-chave-super-segura-de-32-caracteres
NEXTAUTH_URL=https://seu-site.netlify.app
DATABASE_URL=postgresql://usuario:senha@host:5432/database

# OPCIONAIS (configure conforme necessário)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=seu-email@gmail.com
EMAIL_SERVER_PASSWORD=sua-senha-de-app
EMAIL_FROM=noreply@ussbrasil.com.br
```

## 🛠️ **Configuração Específica para Next.js 15**

Nosso `netlify.toml` já está configurado com:
- ✅ **Next.js App Router** suportado
- ✅ **API Routes** funcionando
- ✅ **Otimizações** de cache
- ✅ **Redirects** configurados
- ✅ **Headers** de segurança

## 🎨 **URLs e Dominios**

### **URL Automática:**
```
https://seu-projeto-nome.netlify.app
```

### **Domínio Personalizado (Gratuito):**
1. **Site settings > Domain management**
2. **Add custom domain**
3. Digite seu domínio
4. **DNS automaticamente** configurado

## 🔄 **Deploy Automático**

O Netlify já está configurado para:
- ✅ **Deploy automático** a cada push no `master`
- ✅ **Preview deploy** para Pull Requests
- ✅ **Rollback** instantâneo para versões anteriores

## 📊 **Monitoramento e Analytics**

### **Analytics Integrado (Gratuito):**
1. **Site settings > Analytics**
2. **Enable analytics**
3. Veja **pageviews, visitors, top pages**

### **Forms (Gratuito):**
- ✅ **100 submissions/mês** grátis
- ✅ **Spam protection** incluído

## 🚨 **Troubleshooting**

### **Build falha:**
```bash
# Verificar se todas as dependências estão no package.json
npm install
npm run build
```

### **Variáveis de ambiente não funcionam:**
- ✅ Certifique-se de usar **MAIÚSCULAS**
- ✅ **Não use aspas** nos valores
- ✅ **Redeploy** após adicionar variáveis

### **API Routes não funcionam:**
- ✅ Certifique-se de que `netlify.toml` está na raiz
- ✅ Functions estão em `netlify/functions`

## 💡 **Dicas Extras**

### **Performance:**
```bash
# Otimizar build
npm run build
npm run start # testar localmente
```

### **Logs em tempo real:**
```bash
netlify logs
```

### **Desenvolvimento local com Netlify:**
```bash
netlify dev
```

## 🎯 **Configuração Completa em 5 Minutos**

1. **Database:** Crie no Supabase (2 min)
2. **Deploy:** Conecte GitHub no Netlify (1 min)
3. **Environment:** Configure as 3 variáveis essenciais (1 min)
4. **Done:** Site no ar! (1 min)

## 📞 **Suporte**

- **Documentação:** https://docs.netlify.com
- **Community:** https://community.netlify.com
- **Status:** https://status.netlify.com

---

🚀 **O Netlify é PERFEITO para este projeto!**
- **Gratuito para sempre**
- **Performance excelente**
- **Configuração zero**
- **Suporte completo ao Next.js**
