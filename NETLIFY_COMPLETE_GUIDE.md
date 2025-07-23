# 🚀 Deploy Completo no Netlify - Guia Passo a Passo

## 📋 **Pré-requisitos:**
- ✅ Código no GitHub (já feito)
- ✅ Conta no Netlify (gratuita)
- ✅ Conta no Supabase (gratuita) para banco de dados

---

## 🗄️ **1. Configurar Banco de Dados (Supabase)**

### **Passo 1: Criar conta no Supabase**
```bash
1. Acesse: https://supabase.com
2. Sign up with GitHub
3. Create new project
   - Name: ecomuss-production
   - Database Password: (anote essa senha!)
   - Region: East US (mais próximo)
```

### **Passo 2: Obter Connection String**
```bash
1. No dashboard Supabase
2. Settings > Database
3. Copie a Connection string:
   postgresql://postgres:[SUA-SENHA]@db.[REF].supabase.co:5432/postgres
```

### **Passo 3: Configurar tabelas**
```sql
-- Execute no SQL Editor do Supabase:
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  category VARCHAR(100),
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  total DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🌐 **2. Deploy no Netlify**

### **Passo 1: Acessar Netlify**
```bash
1. Acesse: https://netlify.com
2. Sign up with GitHub
3. Clique em "New site from Git"
```

### **Passo 2: Conectar Repositório**
```bash
1. Choose Git provider: GitHub
2. Authorize Netlify
3. Pick repository: front-uss
```

### **Passo 3: Configurar Build**
```bash
Base directory: (deixe vazio)
Build command: npm run build
Publish directory: .next
```

### **Passo 4: Deploy inicial**
```bash
Clique em "Deploy site"
(Vai falhar por falta das variáveis - é normal!)
```

---

## 🔐 **3. Configurar Variáveis de Ambiente**

### **No painel do Netlify:**
```bash
1. Site settings > Environment variables
2. Add variables:
```

### **Variáveis obrigatórias:**
```env
NEXTAUTH_SECRET
sua-chave-super-segura-de-32-caracteres-minimo

NEXTAUTH_URL
https://seu-site.netlify.app

DATABASE_URL
postgresql://postgres:[SUA-SENHA]@db.[REF].supabase.co:5432/postgres

NODE_ENV
production

NEXT_PUBLIC_APP_URL
https://seu-site.netlify.app
```

### **Variáveis opcionais (para funcionalidades extras):**
```env
# Para autenticação com Google
GOOGLE_CLIENT_ID
seu-google-client-id

GOOGLE_CLIENT_SECRET
seu-google-client-secret

# Para autenticação com GitHub
GITHUB_CLIENT_ID
seu-github-client-id

GITHUB_CLIENT_SECRET
seu-github-client-secret

# Para envio de emails
SMTP_HOST
smtp.gmail.com

SMTP_PORT
587

SMTP_USER
seu-email@gmail.com

SMTP_PASS
sua-senha-de-app
```

---

## ⚡ **4. Redeploy e Verificações**

### **Passo 1: Triggar novo deploy**
```bash
1. Deploys > Trigger deploy
2. Clear cache and deploy site
```

### **Passo 2: Verificar logs**
```bash
1. Acompanhe o build log
2. Verifique se não há erros
3. Aguarde finalizar (2-5 minutos)
```

### **Passo 3: Testar aplicação**
```bash
1. Acesse seu site: https://seu-site.netlify.app
2. Teste login/registro
3. Teste navegação
4. Verifique admin panel
```

---

## 🎯 **5. Configurações Extras**

### **Domínio personalizado:**
```bash
1. Domain settings > Add custom domain
2. Digite seu domínio
3. Configure DNS conforme instruções
```

### **HTTPS/SSL:**
```bash
HTTPS > Verify DNS configuration
(Automático após DNS configurado)
```

### **Form handling:**
```bash
Forms > Enable form detection
(Para forms de contato)
```

---

## 🔧 **6. Otimizações de Performance**

### **Headers customizados:**
```bash
Headers > Add rule:
/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

### **Redirects:**
```bash
Redirects > Add rule:
/admin/* 200! Role=admin
/api/* 200
/* /index.html 200
```

---

## 🚨 **7. Troubleshooting**

### **Build falhou?**
```bash
1. Verifique package.json
2. Confirme todas as env vars
3. Check build logs
4. Tente deploy local: npm run build
```

### **Site não carrega?**
```bash
1. Verifique NEXTAUTH_URL
2. Confirme DATABASE_URL
3. Check browser console
4. Verifique Functions logs
```

### **Database connection error?**
```bash
1. Teste connection string no Supabase
2. Verifique IP allowlist (0.0.0.0/0)
3. Confirme senha do database
4. Tente recriar connection string
```

---

## 📞 **8. Suporte e Monitoramento**

### **Logs em tempo real:**
```bash
Functions > Function logs
(Para API routes)
```

### **Analytics:**
```bash
Analytics > Page views
(Tráfego do site)
```

### **Performance:**
```bash
Speed > Core Web Vitals
(Performance metrics)
```

---

## ✅ **Checklist Final**

- [ ] Supabase configurado com tabelas
- [ ] Repositório conectado ao Netlify
- [ ] Todas as variáveis de ambiente configuradas
- [ ] Build bem-sucedido
- [ ] Site acessível
- [ ] Login/registro funcionando
- [ ] Admin panel acessível
- [ ] Database operations funcionando
- [ ] SSL ativo
- [ ] Performance otimizada

---

## 🎉 **Pronto!**

Seu e-commerce está no ar em **https://seu-site.netlify.app**

**Netlify oferece:**
- ✅ 500GB bandwidth/mês
- ✅ CDN global
- ✅ SSL automático
- ✅ Deploy automático a cada push
- ✅ Preview de pull requests
- ✅ Form handling
- ✅ Serverless functions

**Total de custo: $0 para até 500GB/mês** 🚀
