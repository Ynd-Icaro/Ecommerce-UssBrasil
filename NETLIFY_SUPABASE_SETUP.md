# 🌐 Netlify + Supabase - Deploy Completo e Gratuito

## 🎯 **Por que essa combinação é excelente:**
- ✅ **100% Gratuito** para sempre
- ✅ **Performance excepcional**
- ✅ **Escalabilidade automática**
- ✅ **Auth integrado** (Supabase)

## 🚀 **Parte 1: Supabase (Banco + Auth)**

### 1. **Criar projeto no Supabase**
👉 https://supabase.com
- **"New Project"**
- **Name:** `ussbrasil-ecommerce`
- **Password:** Senha forte para o banco
- **Region:** São Paulo (South America)

### 2. **Configurar Database**
```sql
-- SQL para criar as tabelas necessárias
-- (Execute no SQL Editor do Supabase)

-- Tabela de usuários
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  role VARCHAR DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de produtos
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  brand VARCHAR NOT NULL,
  category VARCHAR NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  image VARCHAR,
  stock INTEGER DEFAULT 0,
  status VARCHAR DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Inserir dados iniciais
INSERT INTO users (email, name, role) VALUES 
('admin@ussbrasil.com.br', 'Admin Principal', 'admin');
```

### 3. **Obter credenciais**
- Vá em **Settings > Database**
- Copie a **Connection String**
- Vá em **Settings > API**
- Copie **URL** e **anon key**

## 🌐 **Parte 2: Netlify (Frontend)**

### 1. **Deploy no Netlify**
👉 https://netlify.com
- **"Add new site"** > **"Import from Git"**
- Selecione: **`Ecommerce-UssBrasil`**

### 2. **Configurações de Build**
```yaml
Base directory: (deixar vazio)
Build command: npm run build && npm run export
Publish directory: out
```

### 3. **Adicionar script de export no package.json**
```json
{
  "scripts": {
    "export": "next export"
  }
}
```

### 4. **Configurar next.config.js para export**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

## ⚙️ **Variáveis de Ambiente**

### No Netlify (Site settings > Environment variables):
```env
NEXTAUTH_SECRET=netlify_supabase_secret_super_seguro
NEXTAUTH_URL=https://ecommerce-uss-brasil.netlify.app
DATABASE_URL=postgresql://user:pass@db.supabase.co:5432/postgres

# Credenciais do Supabase
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua_anon_key_do_supabase
```

## 🔧 **Configuração avançada Supabase**

### 1. **Habilitar Auth**
- Vá em **Authentication > Settings**
- **Site URL:** `https://ecommerce-uss-brasil.netlify.app`
- **Redirect URLs:** `https://ecommerce-uss-brasil.netlify.app/api/auth/callback/supabase`

### 2. **Configurar RLS (Row Level Security)**
```sql
-- Habilitar RLS nas tabelas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso
CREATE POLICY "Users can view all products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Only admins can modify products" ON products
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
```

## 🎯 **URLs Finais**
- **Site:** `https://ecommerce-uss-brasil.netlify.app`
- **Supabase Dashboard:** `https://app.supabase.com/project/seu-projeto`
- **Database URL:** `https://seu-projeto.supabase.co`

## 💰 **Custos (100% Gratuito)**
- **Netlify:** 100GB bandwidth/mês, 300 build minutos
- **Supabase:** 500MB database, 2GB bandwidth, 50k Auth users
- **Total:** $0 para projetos pequenos/médios

## 🚀 **Vantagens desta solução:**
1. **Performance máxima** (CDN global)
2. **Escalabilidade automática**
3. **Auth pronto** (login, registro, reset senha)
4. **Dashboard de admin** (Supabase)
5. **Backup automático**
6. **SSL incluído**

## 📈 **Monitoramento**
- **Netlify Analytics:** Tráfego e performance
- **Supabase Dashboard:** Uso do banco e auth
- **Logs em tempo real** em ambas plataformas
