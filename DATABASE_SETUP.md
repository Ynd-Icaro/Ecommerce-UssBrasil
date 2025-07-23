# 🗄️ Configuração de Banco de Dados Gratuito

## 🎯 **Melhores Opções Gratuitas para Produção**

### 1. **Supabase** (Recomendado) 🥇
- ✅ **500MB** banco PostgreSQL grátis
- ✅ **Auth** integrado (se quiser usar)
- ✅ **Real-time** subscriptions
- ✅ **Dashboard** visual para dados
- ✅ **Backups** automáticos

**Setup em 3 minutos:**
```bash
1. Acesse: https://supabase.com
2. Create account (GitHub login)
3. New Project
4. Aguarde 2 minutos (criação do banco)
5. Settings > Database > Connection string
6. Copie a DATABASE_URL
```

### 2. **PlanetScale** 🥈
- ✅ **1GB** banco MySQL grátis
- ✅ **Branching** do banco (como Git)
- ✅ **Schema migrations** automáticas
- ✅ **Global** edge locations

**Setup:**
```bash
1. Acesse: https://planetscale.com
2. Sign up
3. Create database
4. Connect > Prisma
5. Copie a DATABASE_URL
```

### 3. **Railway** 🥉
- ✅ **$5 crédito** grátis (dura ~2-3 meses)
- ✅ **PostgreSQL** completo
- ✅ **Redis** incluído
- ✅ **Deploy** automático

**Setup:**
```bash
1. Acesse: https://railway.app
2. Login com GitHub
3. New Project > Add PostgreSQL
4. PostgreSQL > Connect > External URL
5. Copie a DATABASE_URL
```

## 🔧 **Configuração no Projeto**

### **1. Atualizar DATABASE_URL**
No Netlify Dashboard > Environment variables:
```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres
```

### **2. Executar Migrations**
```bash
# Desenvolvimento local (primeira vez)
npm install
npx prisma generate
npx prisma migrate dev
npx prisma db seed

# Produção (Netlify fará automaticamente)
npx prisma migrate deploy
```

### **3. Verificar Conexão**
```bash
# Testar conexão local
npx prisma studio

# Verificar no browser: http://localhost:5555
```

## 📊 **Schemas Incluídos**

O projeto já vem com tabelas configuradas:
- ✅ **Users** (usuários e admins)
- ✅ **Products** (produtos)
- ✅ **Orders** (pedidos)
- ✅ **Customers** (clientes)
- ✅ **Categories** (categorias)

## 🔍 **Administração do Banco**

### **Supabase Dashboard:**
```bash
1. https://supabase.com/dashboard
2. Seu projeto > Table Editor
3. Visualize/edite dados diretamente
```

### **Prisma Studio (Local):**
```bash
npx prisma studio
# Abre http://localhost:5555
```

### **Scripts Úteis:**
```bash
# Ver dados
npm run db:studio

# Reset banco (desenvolvimento)
npm run db:reset

# Deploy schema para produção
npm run db:deploy

# Backup dados
npm run db:backup
```

## 🚨 **Troubleshooting**

### **Erro de conexão:**
1. ✅ Verifique se DATABASE_URL está correta
2. ✅ Certifique-se de que tem `?sslmode=require` no final (PostgreSQL)
3. ✅ IP do Netlify pode precisar ser liberado (raro)

### **Tabelas não existem:**
```bash
# Execute as migrations
npx prisma migrate deploy
npx prisma generate
```

### **Dados de teste:**
```bash
# Popular com dados de exemplo
npx prisma db seed
```

## 💡 **Dicas de Performance**

### **Connection Pooling:**
Para produção, use connection pooling:
```env
# Supabase com pooling
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:6543/postgres?pgbouncer=true
```

### **Query Optimization:**
```typescript
// Use select para buscar apenas campos necessários
const products = await prisma.product.findMany({
  select: {
    id: true,
    name: true,
    price: true,
  }
})
```

## 🔐 **Segurança**

### **Variables de Ambiente:**
- ✅ Nunca commite DATABASE_URL
- ✅ Use diferentes bancos para dev/prod
- ✅ Configure Row Level Security (Supabase)

### **Backup:**
```bash
# Supabase faz backup automático
# Para backup manual:
pg_dump $DATABASE_URL > backup.sql
```

## 📈 **Monitoramento**

### **Supabase:**
- **Dashboard > Settings > Usage**
- Monitore connections, storage, bandwidth

### **Alertas:**
- Configure alertas quando chegar perto do limite
- Upgrade para plano pago se necessário

## 🎯 **Recomendação Final**

**Para este projeto, use Supabase:**
1. ✅ **Mais fácil** de configurar
2. ✅ **PostgreSQL** (melhor para e-commerce)
3. ✅ **Dashboard visual** excelente
4. ✅ **Integração** perfeita com Netlify
5. ✅ **500MB** é suficiente para começar

---

🚀 **Com qualquer uma dessas opções, seu banco estará 100% funcional e gratuito!**
