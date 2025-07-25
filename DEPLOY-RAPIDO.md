# 🚀 DEPLOY RÁPIDO - UssBrasil E-commerce

## ⚡ **Comandos para Subir AGORA**

### **Windows (PowerShell)**
```powershell
# Setup completo (1 comando)
.\setup-quick.ps1

# Deploy para produção (1 comando)
.\deploy-auto.ps1
```

### **Linux/Mac (Bash)**
```bash
# Setup completo (1 comando)
chmod +x setup-quick.sh && ./setup-quick.sh

# Deploy para produção (1 comando)  
chmod +x deploy-auto.sh && ./deploy-auto.sh
```

---

## 🎯 **Manual Rápido (se scripts falharem)**

### **1. Setup Local (2 minutos)**
```bash
npm install
cp .env.example .env.local
npx prisma generate
npx prisma db push
```

### **2. Testar Local**
```bash
npm run dev:full
# Acesse: http://localhost:3000
```

### **3. Build Produção**
```bash
npm run build:production
```

### **4. Deploy Netlify**
1. Acesse: https://netlify.com
2. "New site from Git"
3. Conecte GitHub repo
4. Build: `npm run build:production`
5. Publish: `.next`
6. Deploy!

---

## 🔧 **Variáveis de Ambiente (.env.local)**

```env
NEXTAUTH_SECRET=ussbrasil_secret_key_2024
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3003
DATABASE_URL="file:./dev.db"
```

**Para produção, altere:**
- `NEXTAUTH_URL` → sua URL do Netlify
- `NEXT_PUBLIC_API_URL` → sua URL + `/api`

---

## 🆘 **Solução de Problemas**

### **❌ Erro de Build**
```bash
npm run clean
npm install
npm run setup
```

### **❌ Erro de Banco**
```bash
npx prisma db reset --force
npx prisma generate
npx prisma db push
```

### **❌ Erro de Deploy**
```bash
# Verificar build local
npm run build:production

# Se OK, fazer deploy manual no Netlify
```

---

## 📞 **Suporte Urgente**

Se nada funcionar:
1. Verifique Node.js 18+ instalado
2. Execute scripts automáticos
3. Logs de erro estão em `deploy-YYYYMMDD-HHMMSS.log`

---

## ✅ **Checklist Final**

- [ ] Node.js 18+ instalado
- [ ] Dependências instaladas (`npm install`)
- [ ] Arquivo `.env.local` configurado
- [ ] Prisma configurado (`npx prisma generate`)
- [ ] Build funciona (`npm run build:production`)
- [ ] Deploy no Netlify ou Vercel

**🎉 PRONTO! Seu site estará no ar em minutos!**
