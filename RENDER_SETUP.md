# 🎨 Render Deploy - Setup Completo

## 🚀 Deploy no Render (Alternativa Excelente)

### 1. **Criar Web Service**
👉 https://render.com
- **"New"** > **"Web Service"**
- Conecte GitHub: **`Ecommerce-UssBrasil`**

### 2. **Configurações do Build**
```yaml
Name: ecommerce-uss-brasil
Environment: Node
Region: Oregon (US West)
Branch: master

Build Command: npm install && npm run build
Start Command: npm start
```

### 3. **Criar Banco PostgreSQL**
- **"New"** > **"PostgreSQL"**
- **Name:** `ussbrasil-database`
- **Plan:** Free
- Copie a **Database URL** gerada

### 4. **Variáveis de Ambiente**
```env
NODE_ENV=production
NEXTAUTH_SECRET=render_secret_super_seguro_para_producao
NEXTAUTH_URL=https://ecommerce-uss-brasil.onrender.com
DATABASE_URL=postgresql://user:pass@hostname:port/database
```

## 🔧 **Configuração Avançada**

### Auto-Deploy
```yaml
Auto-Deploy: Yes
Root Directory: ./
Docker Command: (deixar vazio)
```

### Health Check
```yaml
Health Check Path: /
```

## 💰 **Limites Gratuitos**
- **750 horas/mês** (suficiente para projeto pequeno/médio)
- **PostgreSQL:** 1GB grátis
- **SSL:** Incluído
- **Custom Domain:** Permitido

## 🚀 **URL Final**
`https://ecommerce-uss-brasil.onrender.com`

## ⚠️ **Observações Importantes**
- **Sleep Mode:** App "dorme" após 15min sem uso (plano gratuito)
- **Cold Start:** Primeiro acesso pode demorar ~30s
- **Solução:** Upgrade para $7/mês remove limitações
