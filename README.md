# 🛍️ USS Brasil E-commerce

> **Sistema de E-commerce Premium para Produtos Importados**

[![Next.js](https://img.shields.io/badge/Next.js-15.4.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.12.0-2D3748?style=for-the-badge&logo=prisma)](https://prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## 🚀 **Deploy Ultra-Rápido (2 comandos)**

### **🎯 Setup Completo (Recomendado)**

```bash
# Windows PowerShell:
./setup-quick.ps1

# Linux/macOS:
chmod +x setup-quick.sh && ./setup-quick.sh
```

### **🚀 Deploy para Produção**

```bash
# Windows PowerShell:
./deploy-auto.ps1

# Linux/macOS:
chmod +x deploy-auto.sh && ./deploy-auto.sh
```

## ✨ **Funcionalidades Premium**

### **🛒 E-commerce Completo**
- ✅ **Catálogo Inteligente** - Produtos Apple com filtros avançados
- ✅ **Carrinho Dinâmico** - Atualização em tempo real
- ✅ **Sistema de Favoritos** - Lista de desejos persistente
- ✅ **Busca Avançada** - Busca instantânea com sugestões
- ✅ **Quick View** - Visualização rápida de produtos
- ✅ **Checkout Simplificado** - Processo de compra otimizado

### **⚡ Admin Dashboard**
- ✅ **CRUD Completo** - Gestão total de produtos
- ✅ **Analytics em Tempo Real** - Dashboard interativo
- ✅ **Controle de Pedidos** - Gestão completa de vendas
- ✅ **Gestão de Clientes** - CRM integrado
- ✅ **Configurações Avançadas** - Customização total

### **🎨 Interface Moderna**
- ✅ **Design Responsivo** - Mobile-first, otimizado para todos dispositivos
- ✅ **Animações Suaves** - Framer Motion para UX premium
- ✅ **Dark/Light Mode** - Tema adaptável
- ✅ **Componentes Acessíveis** - ARIA completo
- ✅ **Performance Otimizada** - Core Web Vitals 95+

## 🏗️ **Stack Tecnológico**

### **Frontend Moderno**
- **Next.js 15.4.3** - App Router + Server Components
- **TypeScript 5.0** - Type Safety completo
- **Tailwind CSS 3.4** - Utility-first styling
- **Framer Motion** - Animações performáticas
- **shadcn/ui** - Componentes premium

### **Backend Robusto**
- **Prisma ORM** - Type-safe database layer
- **NextAuth.js** - Autenticação segura
- **SQLite** - Desenvolvimento local
- **API Routes** - Backend serverless

### **DevOps & Deploy**
- **Netlify** - Deploy automático
- **TypeScript** - Type checking
- **ESLint + Prettier** - Code quality
- **Automated Scripts** - Setup e deploy automático

## 🎯 **Início Rápido Manual**

### **1. Configuração Inicial**
```bash
# Clone o repositório
git clone https://github.com/Ynd-Icaro/Ecommerce-UssBrasil.git
cd front-uss

# Instale dependências
npm install
```

### **2. Configuração do Ambiente**
```bash
# Copie o arquivo de exemplo
cp .env.example .env.local
```

**Configure suas variáveis (.env.local):**
```env
# Autenticação
NEXTAUTH_SECRET=ussbrasil_secret_key_2024
NEXTAUTH_URL=http://localhost:3000

# API & Database
NEXT_PUBLIC_API_URL=http://localhost:3003
DATABASE_URL="file:./dev.db"

# Email (Opcional)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_FROM=noreply@ussbrasil.com
```

### **3. Setup do Banco de Dados**
```bash
# Gerar cliente Prisma
npx prisma generate

# Aplicar schema
npx prisma db push

# Popular dados iniciais
npx prisma db seed
```

### **4. Iniciar Desenvolvimento**
```bash
# Opção 1: Completo (Frontend + API)
npm run dev:full

# Opção 2: Separadamente
npm run dev      # Frontend (localhost:3000)
npm run api      # JSON Server API (localhost:3003)
```

## 🌐 **Deploy em Produção**

### **🚀 Deploy Totalmente Automático**

**Windows PowerShell:**
```powershell
# Setup + Deploy em um comando
./deploy-auto.ps1
```

**Mac/Linux:**
```bash
# Setup + Deploy em um comando
chmod +x deploy-auto.sh && ./deploy-auto.sh
```

### **🥇 Netlify (Mais Recomendado)**
- ✅ **500GB** bandwidth/mês gratuito
- ✅ **CDN Global** automático  
- ✅ **SSL** certificado gratuito
- ✅ **Deploy automático** via Git
- ✅ **Preview** de pull requests

**Setup Manual:**
1. [netlify.com](https://netlify.com) → New site from Git
2. Build: `npm run build:production`
3. Publish: `.next`
4. Adicione variáveis de ambiente

### **🥈 Vercel (Otimizado para Next.js)**
```bash
npm i -g vercel
vercel --prod
```

### **🥉 Railway (Banco Incluído)**
```bash
# Setup automático com PostgreSQL
railway login
railway init
railway up
```

## 📊 **Scripts Disponíveis**

| Script | Descrição | Uso |
|--------|-----------|-----|
| `npm run dev` | Desenvolvimento frontend | Padrão |
| `npm run dev:full` | Frontend + API juntos | Recomendado |
| `npm run build` | Build padrão | CI/CD |
| `npm run build:production` | Build otimizado | Deploy |
| `npm run start` | Servidor produção | Hosting |
| `npm run api` | JSON Server API | Desenvolvimento |
| `npm run type-check` | Verificação TS | Qualidade |
| `npm run db:generate` | Cliente Prisma | Setup |
| `npm run db:push` | Sync banco | Migrations |
| `npm run db:seed` | Dados iniciais | Setup |
| `npm run db:studio` | Interface visual | Debug |

## 🏗️ **Arquitetura do Sistema**

```
front-uss/
├── 📱 app/                    # App Router (Next.js 15)
│   ├── page.tsx              # Homepage com produtos destaque
│   ├── layout.tsx            # Layout principal
│   ├── globals.css           # Estilos globais
│   ├── admin/                # Dashboard administrativo
│   │   ├── page.tsx         # Analytics & Overview
│   │   ├── products/        # CRUD de produtos
│   │   ├── orders/          # Gestão de pedidos
│   │   ├── customers/       # CRM de clientes
│   │   └── settings/        # Configurações
│   ├── api/                  # API Routes serverless
│   │   ├── auth/            # Autenticação
│   │   ├── products/        # CRUD produtos
│   │   └── orders/          # Processamento pedidos
│   ├── products/             # Catálogo de produtos
│   ├── categories/           # Páginas por categoria
│   ├── cart/                 # Carrinho de compras
│   ├── checkout/             # Finalização compra
│   ├── profile/              # Perfil do usuário
│   └── orders/               # Histórico de pedidos
├── 🧩 components/            # Componentes reutilizáveis
│   ├── ui/                  # Base components (shadcn/ui)
│   ├── admin/               # Componentes administrativos
│   ├── auth/                # Autenticação (modals, forms)
│   ├── navigation/          # Headers, menus, breadcrumbs
│   ├── product/             # Cards, modals, filtros
│   ├── animated-components.tsx # Animações Framer Motion
│   ├── mobile-nav.tsx       # Navegação mobile
│   └── quick-view-modal.tsx # Visualização rápida
├── 📚 lib/                   # Utilitários e serviços
│   ├── utils.ts             # Helpers gerais
│   ├── services/            # API services
│   └── validations/         # Schemas de validação
├── 🎣 hooks/                 # Custom React hooks
├── 🗄️ prisma/               # Database layer
│   ├── schema.prisma        # Schema do banco
│   ├── seed.ts              # Dados iniciais
│   └── migrations/          # Histórico de mudanças
├── 🎨 public/               # Assets estáticos
│   ├── Produtos/            # Imagens de produtos
│   ├── icons/               # Ícones SVG
│   └── Videos/              # Vídeos promocionais
└── 📋 Scripts de Deploy     # Automação completa
    ├── setup-quick.ps1      # Setup Windows
    ├── setup-quick.sh       # Setup Unix
    ├── deploy-auto.ps1      # Deploy Windows
    └── deploy-auto.sh       # Deploy Unix
```

## � **URLs e Acessos**

| Serviço | URL | Descrição |
|---------|-----|-----------|
| **Frontend** | [localhost:3000](http://localhost:3000) | Loja principal |
| **Admin** | [localhost:3000/admin](http://localhost:3000/admin) | Dashboard administrativo |
| **API** | [localhost:3003](http://localhost:3003) | JSON Server (dev) |
| **Prisma Studio** | `npm run db:studio` | Interface do banco |

## �🛠️ **Scripts Disponíveis**

```bash
npm run dev        # Inicia desenvolvimento
npm run build      # Build de produção
npm run start      # Inicia servidor de produção
npm run lint       # Executa ESLint
npm run type-check # Verifica tipos TypeScript
```

## 🎨 **Componentes e Páginas**

### **🏠 Páginas Principais**
- **Homepage** (`/`) - Produtos em destaque + categorias
- **Produtos** (`/products`) - Catálogo completo com filtros
- **Produto** (`/product/[id]`) - Página detalhada individual
- **Categorias** (`/categories/[category]`) - Produtos por categoria
- **Carrinho** (`/cart`) - Carrinho de compras dinâmico
- **Checkout** (`/checkout`) - Finalização da compra
- **Perfil** (`/profile`) - Dados do usuário
- **Pedidos** (`/orders`) - Histórico de compras

### **� Admin Dashboard**
- **Overview** (`/admin`) - Analytics e métricas
- **Produtos** (`/admin/products`) - CRUD completo
- **Pedidos** (`/admin/orders`) - Gestão de vendas
- **Clientes** (`/admin/customers`) - CRM integrado
- **Configurações** (`/admin/settings`) - Configurações gerais

### **🧩 Componentes Premium**
- **ProductCard** - Cards responsivos com animações
- **QuickViewModal** - Visualização rápida de produtos
- **AdvancedFilters** - Sistema de filtros inteligente
- **AnimatedComponents** - Componentes com Framer Motion
- **ResponsiveNav** - Navegação adaptativa
- **AdminDashboard** - Interface administrativa moderna

## 🔐 **Sistema de Autenticação**

### **NextAuth.js Configurado**
- ✅ **Login/Registro** com email e senha
- ✅ **Proteção de Rotas** automática
- ✅ **Níveis de Acesso** (user/admin)
- ✅ **Sessões Seguras** com JWT
- ✅ **Recuperação de Senha** por email

### **Rotas Protegidas**
```typescript
// Páginas que requerem autenticação
/admin/*     // Apenas administradores
/profile     // Usuários autenticados
/orders      // Usuários autenticados
/checkout    // Usuários autenticados
```

## 🐛 **Solução de Problemas**

### **❌ Erro de Build**
```bash
# Limpar e reinstalar
npm run clean
rm -rf node_modules package-lock.json
npm install
npm run setup
```

### **❌ Erro de Banco de Dados**
```bash
# Reset completo do banco
npx prisma db reset --force
npx prisma generate
npx prisma db push
npx prisma db seed
```

### **❌ Erro de TypeScript**
```bash
# Regenerar tipos e verificar
npx prisma generate
npm run type-check
```

### **❌ Erro de Deploy**
```bash
# Usar scripts automáticos
./setup-quick.ps1    # Windows
./setup-quick.sh     # Unix

# Verificar build local
npm run build:production
```

### **⚠️ Problemas Comuns**

| Erro | Solução |
|------|---------|
| `Module not found` | `npm install` |
| `Prisma client not generated` | `npx prisma generate` |
| `Database not found` | `npx prisma db push` |
| `TypeScript errors` | `npm run type-check` |
| `Build fails` | `npm run clean && npm install` |

## 🤝 **Contribuição**

### **Como Contribuir**
1. **Fork** o projeto
2. **Clone** seu fork: `git clone https://github.com/SEU-USER/front-uss.git`
3. **Branch** para feature: `git checkout -b feature/amazing-feature`
4. **Commit** mudanças: `git commit -m 'Add: amazing feature'`
5. **Push** para branch: `git push origin feature/amazing-feature`
6. **Pull Request** no GitHub

### **Padrões de Código**
- ✅ **TypeScript** obrigatório
- ✅ **ESLint** configurado
- ✅ **Prettier** para formatação
- ✅ **Conventional Commits**
- ✅ **Testes** unitários

## 📄 **Licença**

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 **Desenvolvido por**

**🏢 UssBrasil Team** - *E-commerce Premium para Produtos Importados*

**👤 Icaro de Oliveira** - Desenvolvedor Principal
- 🐙 GitHub: [@Ynd-Icaro](https://github.com/Ynd-Icaro)
- 📧 Email: contato@ussbrasil.com

---

## 🌟 **Apoie o Projeto**

⭐ **Se este projeto te ajudou, considere dar uma estrela no GitHub!**

🔗 **Compartilhe com outros desenvolvedores**

💬 **Relate bugs ou sugira melhorias nas Issues**

---

<div align="center">

**🚀 Feito com ❤️ e Next.js 15**

[![Deploy Status](https://api.netlify.com/api/v1/badges/YOUR-BADGE-ID/deploy-status)](https://app.netlify.com/sites/YOUR-SITE/deploys)

</div>
