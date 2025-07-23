# 🛍️ USS Brasil E-commerce

Uma plataforma de e-commerce moderna e responsiva desenvolvida com Next.js 15, focada na venda de produtos Apple.

## 🚀 Deploy Rápido (5 minutos)

### **🥇 Opção 1: Netlify (Mais Recomendado)**
```bash
# Execute o script automático:
.\setup-deploy.ps1

# Ou siga o guia manual:
# 1. https://netlify.com > New site from Git
# 2. Configure: npm run build | .next
# 3. Adicione variáveis (veja .env.example)
```

### **📚 Documentação Completa de Deploy**
- 📖 **[Guia Netlify Completo](./NETLIFY_COMPLETE_GUIDE.md)** - Passo a passo detalhado
- 🌐 **[Todas as Opções](./DEPLOYMENT_OPTIONS.md)** - Netlify, Vercel, Railway, Render
- 🗄️ **[Setup Database](./DATABASE_SETUP.md)** - Supabase, PlanetScale, Railway

### **⚡ Deploy Automático**
```bash
# Windows PowerShell
.\setup-deploy.ps1

# Bash/Linux/Mac
./setup-deploy.sh
```

## ✨ Características

- 🎨 **Design Moderno**: Interface limpa e responsiva com animações suaves
- 📱 **Responsivo**: Otimizado para desktop, tablet e mobile
- 🔐 **Autenticação**: Sistema completo com NextAuth.js
- 🛒 **Carrinho**: Funcionalidade completa de carrinho de compras
- 👑 **Admin Dashboard**: Painel administrativo para gestão de produtos, pedidos e clientes
- 🔍 **Busca e Filtros**: Sistema avançado de busca e filtros por categoria
- 🌟 **Favoritos**: Sistema de produtos favoritos
- 📊 **Analytics**: Dashboard com métricas e estatísticas
- ⚡ **Performance**: Otimizado para carregamento rápido

## 🚀 Tecnologias

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Animations**: Framer Motion
- **Database**: Prisma + SQLite
- **Authentication**: NextAuth.js
- **State Management**: Zustand
- **Icons**: Lucide React

## 📦 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Ynd-Icaro/Ecommerce-UssBrasil.git
cd Ecommerce-UssBrasil
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` com suas configurações:
```env
NEXTAUTH_SECRET=seu_secret_super_seguro
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL="file:./dev.db"
```

4. Execute as migrações do banco:
```bash
npx prisma migrate dev
npx prisma db seed
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 🌐 Deploy em Produção

### 🚀 **Deploy Automático (Recomendado)**

**Windows PowerShell:**
```bash
.\setup-deploy.ps1
```

**Mac/Linux:**
```bash
./setup-deploy.sh
```

### 🥇 **Netlify (Mais Fácil)**
- ✅ **500GB** bandwidth/mês gratuito
- ✅ **CDN global** automático  
- ✅ **SSL** certificado gratuito
- ✅ **Deploy automático** via Git
- ✅ **Preview** de pull requests

**Setup em 3 passos:**
1. [netlify.com](https://netlify.com) → New site from Git
2. Configure: `npm run build` | `.next`
3. Adicione variáveis de ambiente (veja `.env.example`)

### 🥈 **Vercel (Criadores do Next.js)**
- ✅ **100GB** bandwidth/mês
- ✅ **Edge functions**
- ✅ **Analytics** incluído
- ✅ **Otimizado** para Next.js

```bash
npm i -g vercel
vercel --prod
```

### 🥉 **Railway (Banco Incluído)**
- ✅ **$5 crédito** inicial
- ✅ **PostgreSQL** incluído
- ✅ **Monitoring** completo

1. [railway.app](https://railway.app) → New Project
2. Deploy from GitHub repo
3. Add PostgreSQL service

### 🛠️ **Render**
- ✅ **PostgreSQL** gratuito (90 dias)
- ✅ **SSL** automático
- ✅ **Logs** detalhados

**📖 Documentação Completa**: Veja `DEPLOYMENT_OPTIONS.md` para comparação detalhada de todas as plataformas.

### 🗄️ **Banco de Dados Gratuitos**

**Para produção, recomendamos:**
- 🟢 **Supabase**: 500MB PostgreSQL (recomendado)
- 🟢 **PlanetScale**: 1GB MySQL
- 🟢 **Railway**: PostgreSQL completo ($5 crédito)

**Veja configuração completa em:** `DATABASE_SETUP.md`

## 📁 Estrutura do Projeto

```
├── app/
│   ├── admin/              # Painel administrativo
│   ├── api/               # API Routes
│   ├── cart/              # Carrinho de compras
│   ├── products/          # Catálogo de produtos
│   └── ...
├── components/
│   ├── ui/                # Componentes reutilizáveis
│   ├── animated-components.tsx
│   └── ...
├── lib/                   # Utilitários e configurações
├── prisma/               # Schema e migrações do banco
├── public/               # Arquivos estáticos
└── store/                # Estado global (Zustand)
```

## 🛠️ Scripts Disponíveis

```bash
npm run dev        # Inicia desenvolvimento
npm run build      # Build de produção
npm run start      # Inicia servidor de produção
npm run lint       # Executa ESLint
npm run type-check # Verifica tipos TypeScript
```

## 🎨 Componentes

O projeto utiliza uma biblioteca de componentes customizada baseada em shadcn/ui:

- **Cards de Produto**: Cards responsivos com animações
- **Filtros**: Sistema avançado de filtros
- **Modal de Visualização Rápida**: Preview de produtos
- **Dashboard Admin**: Interface administrativa completa

## 📱 Páginas Principais

- **Home** (`/`): Página inicial com produtos em destaque
- **Produtos** (`/products`): Catálogo completo com filtros
- **Produto Individual** (`/product/[id]`): Página detalhada do produto
- **Carrinho** (`/cart`): Carrinho de compras
- **Checkout** (`/checkout`): Finalização da compra
- **Admin** (`/admin`): Dashboard administrativo

## 🔐 Autenticação

O sistema utiliza NextAuth.js com:
- Login/Registro com email
- Proteção de rotas
- Diferentes níveis de acesso (user/admin)

## 📊 Admin Dashboard

Funcionalidades administrativas:
- **Produtos**: CRUD completo de produtos
- **Pedidos**: Gestão de pedidos e status
- **Clientes**: Visualização e gestão de clientes
- **Configurações**: Configurações gerais da loja

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Desenvolvedor

Desenvolvido por **Icaro de Oliveira**

- GitHub: [@Ynd-Icaro](https://github.com/Ynd-Icaro)

---

⭐ Se este projeto te ajudou, considere dar uma estrela!
