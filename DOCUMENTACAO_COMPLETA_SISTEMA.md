# 📚 DOCUMENTAÇÃO COMPLETA - SISTEMA USS BRASIL E-COMMERCE

> **E-commerce Premium de Produtos Apple com Design System Profissional**

---

## 📋 ÍNDICE

1. [Visão Geral do Sistema](#visão-geral-do-sistema)
2. [Arquitetura e Tecnologias](#arquitetura-e-tecnologias)
3. [Estrutura do Projeto](#estrutura-do-projeto)
4. [Configuração e Instalação](#configuração-e-instalação)
5. [Sistema de Rotas](#sistema-de-rotas)
6. [Banco de Dados](#banco-de-dados)
7. [Componentes e UI](#componentes-e-ui)
8. [Sistema de Tema](#sistema-de-tema)
9. [Funcionalidades](#funcionalidades)
10. [API Routes](#api-routes)
11. [Deploy e Produção](#deploy-e-produção)
12. [Manutenção e Desenvolvimento](#manutenção-e-desenvolvimento)

---

## 🎯 VISÃO GERAL DO SISTEMA

### **Descrição**
O USS Brasil E-commerce é uma plataforma moderna e sofisticada desenvolvida com Next.js 15, especializada na venda de produtos Apple premium. O sistema combina performance, design profissional e funcionalidades avançadas para oferecer uma experiência de compra excepcional.

### **Características Principais**
- 🎨 **Design Moderno**: Interface limpa e responsiva com animações suaves
- 📱 **Responsivo**: Otimizado para desktop, tablet e mobile
- 🔐 **Autenticação**: Sistema completo com NextAuth.js
- 🛒 **Carrinho**: Funcionalidade completa de carrinho de compras
- 👑 **Admin Dashboard**: Painel administrativo para gestão completa
- 🔍 **Busca e Filtros**: Sistema avançado de busca e filtros por categoria
- 🌟 **Favoritos**: Sistema de produtos favoritos
- 📊 **Analytics**: Dashboard com métricas e estatísticas
- ⚡ **Performance**: Otimizado para carregamento rápido
- 🌙 **Dark Mode**: Sistema de tema light/dark mode

### **Status do Projeto**
- ✅ **Sistema Completo**: 100% funcional e testado
- ✅ **TypeScript**: Zero erros de compilação
- ✅ **Design System**: Implementado e documentado
- ✅ **Responsivo**: Mobile-first approach
- ✅ **Pronto para Produção**: Deploy automático configurado

---

## 🚀 ARQUITETURA E TECNOLOGIAS

### **Stack Principal**
```json
{
  "framework": "Next.js 15.4.3",
  "react": "19.1.0",
  "typescript": "^5",
  "styling": "Tailwind CSS 3.4.17",
  "database": "Prisma + SQLite/PostgreSQL",
  "auth": "NextAuth.js 5.0.0-beta.29",
  "state": "Zustand 5.0.6",
  "animations": "Framer Motion 12.23.7"
}
```

### **Dependências Principais**
```json
{
  "ui": {
    "@radix-ui/react-*": "Componentes primitivos",
    "shadcn/ui": "Biblioteca de componentes",
    "lucide-react": "Ícones SVG",
    "tailwindcss": "Framework CSS"
  },
  "desenvolvimento": {
    "@headlessui/react": "Componentes acessíveis",
    "class-variance-authority": "Variantes de componentes",
    "clsx": "Utilitário para classes CSS",
    "tailwind-merge": "Merge de classes Tailwind"
  },
  "formulários": {
    "react-hook-form": "Gerenciamento de formulários",
    "@hookform/resolvers": "Validadores",
    "zod": "Schema validation"
  },
  "utilitários": {
    "date-fns": "Manipulação de datas",
    "axios": "Cliente HTTP",
    "sonner": "Notificações toast"
  }
}
```

### **Configuração TypeScript**
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "ES6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

## 📁 ESTRUTURA DO PROJETO

### **Organização Geral**
```
Ecommerce-UssBrasil/
├── 📁 app/                      # App Router do Next.js
│   ├── 📄 layout.tsx           # Layout principal
│   ├── 📄 page.tsx             # Homepage
│   ├── 📄 globals.css          # Estilos globais
│   ├── 📁 admin/               # Dashboard administrativo
│   ├── 📁 api/                 # API Routes
│   ├── 📁 cart/                # Carrinho de compras
│   ├── 📁 categories/          # Páginas de categorias
│   ├── 📁 checkout/            # Processo de checkout
│   ├── 📁 login/               # Autenticação
│   ├── 📁 product/             # Páginas de produtos individuais
│   ├── 📁 products/            # Catálogo de produtos
│   └── 📁 theme-test/          # Página de teste de temas
├── 📁 components/              # Componentes React
│   ├── 📁 ui/                  # Componentes base (shadcn/ui)
│   ├── 📁 navigation/          # Componentes de navegação
│   ├── 📁 sections/            # Seções da homepage
│   ├── 📁 hero/                # Componentes de hero
│   ├── 📁 cards/               # Cards de produtos
│   └── 📄 theme-toggle.tsx     # Alternador de tema
├── 📁 lib/                     # Utilitários e configurações
│   ├── 📄 utils.ts             # Funções utilitárias
│   ├── 📄 products-data.ts     # Dados de produtos
│   └── 📄 home-data.ts         # Dados da homepage
├── 📁 styles/                  # Arquivos de estilo
│   ├── 📄 theme.css            # Sistema de tokens de design
│   ├── 📄 components.css       # Biblioteca de componentes
│   └── 📄 utilities.css        # Utilitários CSS
├── 📁 contexts/                # Contextos React
│   ├── 📄 CartContext.tsx      # Contexto do carrinho
│   └── 📄 FavoritesContext.tsx # Contexto de favoritos
├── 📁 hooks/                   # Custom hooks
├── 📁 prisma/                  # Configuração do banco
│   ├── 📄 schema.prisma        # Schema do banco
│   └── 📄 seed.ts              # Dados iniciais
├── 📁 public/                  # Arquivos estáticos
│   ├── 📁 Produtos/            # Imagens de produtos
│   ├── 📁 Videos/              # Vídeos promocionais
│   └── 📁 categories/          # Imagens de categorias
├── 📁 store/                   # Estado global (Zustand)
└── 📁 types/                   # Definições TypeScript
```

### **Páginas Principais**

#### **App Router Structure**
```
app/
├── page.tsx                    # Homepage (/)
├── products/
│   └── page.tsx               # Lista de produtos (/products)
├── product/
│   └── [slug]/
│       └── page.tsx           # Produto individual (/product/[slug])
├── categories/
│   ├── page.tsx               # Lista de categorias (/categories)
│   └── [category]/
│       └── page.tsx           # Produtos por categoria (/categories/[category])
├── cart/
│   └── page.tsx               # Carrinho (/cart)
├── checkout/
│   └── page.tsx               # Checkout (/checkout)
├── admin/
│   ├── page.tsx               # Dashboard (/admin)
│   ├── products/
│   ├── orders/
│   └── customers/
└── login/
    └── page.tsx               # Login (/login)
```

---

## ⚙️ CONFIGURAÇÃO E INSTALAÇÃO

### **Pré-requisitos**
- Node.js 18+ 
- npm ou yarn
- Git

### **Instalação Local**

1. **Clone o repositório:**
```bash
git clone https://github.com/Ynd-Icaro/Ecommerce-UssBrasil.git
cd Ecommerce-UssBrasil
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
```bash
cp .env.example .env.local
```

4. **Configure o .env.local:**
```env
# NextAuth.js
NEXTAUTH_SECRET=seu_secret_super_seguro_de_32_caracteres
NEXTAUTH_URL=http://localhost:3000

# Database
DATABASE_URL="file:./dev.db"

# App
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Autenticação (Opcional)
GOOGLE_CLIENT_ID=seu_google_client_id
GOOGLE_CLIENT_SECRET=seu_google_client_secret
GITHUB_CLIENT_ID=seu_github_client_id
GITHUB_CLIENT_SECRET=seu_github_client_secret
```

5. **Execute as migrações do banco:**
```bash
npx prisma migrate dev
npx prisma db seed
```

6. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

### **Scripts Disponíveis**
```json
{
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "db:generate": "prisma generate",
  "db:push": "prisma db push",
  "db:migrate": "prisma migrate deploy",
  "db:seed": "tsx prisma/seed.ts",
  "db:studio": "prisma studio",
  "api": "json-server --watch db.json --port 3003",
  "dev:full": "concurrently \"npm run api\" \"npm run dev\"",
  "type-check": "tsc --noEmit",
  "clean": "rimraf .next out node_modules/.cache"
}
```

---

## 🗺️ SISTEMA DE ROTAS

### **Rotas Públicas**
```
/ - Homepage
/products - Catálogo de produtos
/products?search=termo - Busca de produtos
/products?category=categoria - Filtro por categoria
/product/[slug] - Página do produto individual
/categories - Lista de categorias
/categories/[category] - Produtos da categoria
/cart - Carrinho de compras
/checkout - Finalização da compra
/login - Página de login
/register - Página de registro
```

### **Rotas Protegidas (Usuário)**
```
/profile - Perfil do usuário
/orders - Histórico de pedidos
/favorites - Lista de favoritos
/wishlist - Lista de desejos
```

### **Rotas Administrativas**
```
/admin - Dashboard principal
/admin/products - Gestão de produtos
/admin/products/new - Criar produto
/admin/products/[id]/edit - Editar produto
/admin/orders - Gestão de pedidos
/admin/customers - Gestão de clientes
/admin/analytics - Relatórios e analytics
/admin/settings - Configurações
```

### **API Routes**
```
/api/auth/[...nextauth] - NextAuth.js
/api/products - CRUD de produtos
/api/products/[id] - Produto específico
/api/categories - CRUD de categorias
/api/cart - Operações do carrinho
/api/orders - Gestão de pedidos
/api/users - Gestão de usuários
/api/upload - Upload de imagens
```

### **Middleware de Proteção**
```typescript
// middleware.ts
import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Lógica de proteção de rotas
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Verificar permissões
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return token?.role === "admin"
        }
        return !!token
      },
    },
  }
)

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*", "/orders/:path*"]
}
```

---

## 🗄️ BANCO DE DADOS

### **Schema Prisma**
```prisma
// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite" // ou "postgresql" para produção
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String?
  role          Role      @default(USER)
  phone         String?
  address       String?
  city          String?
  state         String?
  zipCode       String?
  country       String?   @default("Brasil")
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts Account[]
  sessions Session[]
  orders   Order[]
  reviews  Review[]
  cartItems CartItem[]
}

model Product {
  id            String   @id @default(cuid())
  name          String
  description   String
  price         Float
  discountPrice Float?
  stock         Int
  status        ProductStatus @default(ACTIVE)
  featured      Boolean  @default(false)
  images        String   // JSON string of image URLs
  categoryId    String
  rating        Float?   @default(0)
  totalReviews  Int      @default(0)
  specifications String?   // Store product specs as JSON string
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  category    Category     @relation(fields: [categoryId], references: [id])
  orderItems  OrderItem[]
  reviews     Review[]
  cartItems   CartItem[]
}

model Category {
  id          String    @id @default(cuid())
  name        String    @unique
  description String?
  image       String?
  slug        String    @unique
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  products Product[]
}

model Order {
  id              String      @id @default(cuid())
  userId          String
  status          OrderStatus @default(PENDING)
  paymentStatus   PaymentStatus @default(PENDING)
  paymentMethod   String
  subtotal        Float
  shipping        Float
  discount        Float       @default(0)
  total           Float
  shippingAddress Json        // Store shipping address as JSON
  trackingCode    String?
  notes           String?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  user       User        @relation(fields: [userId], references: [id])
  orderItems OrderItem[]
}

enum Role {
  USER
  ADMIN
}

enum ProductStatus {
  ACTIVE
  INACTIVE
  OUT_OF_STOCK
}

enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}

enum PaymentStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
}
```

### **Dados de Exemplo (Seed)**
```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Criar categorias
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'iPhone',
        slug: 'iphone',
        description: 'Smartphones Apple',
        image: '/categories/iphone.jpg'
      }
    }),
    prisma.category.create({
      data: {
        name: 'MacBook',
        slug: 'macbook',
        description: 'Laptops Apple',
        image: '/categories/macbook.jpg'
      }
    }),
    // ... mais categorias
  ])

  // Criar produtos
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'iPhone 16 Pro',
        description: 'O mais avançado iPhone já criado',
        price: 7999.99,
        discountPrice: 7499.99,
        stock: 50,
        featured: true,
        images: JSON.stringify(['/Produtos/Iphone 16 Pro.png']),
        categoryId: categories[0].id,
        specifications: JSON.stringify({
          tela: '6.1" Super Retina XDR',
          chip: 'A18 Pro',
          cameras: 'Sistema de câmeras Pro de 48MP',
          bateria: 'Até 27 horas de reprodução de vídeo'
        })
      }
    }),
    // ... mais produtos
  ])
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

---

## 🎨 COMPONENTES E UI

### **Sistema de Componentes (shadcn/ui)**

#### **Componentes Base**
```typescript
// components/ui/button.tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

#### **Componentes Principais**

**Navbar Principal:**
```typescript
// components/navigation/MainNavbar.tsx
export default function MainNavbar() {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <NavigationMenu />
          <div className="flex items-center space-x-4">
            <SearchButton />
            <CartButton />
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  )
}
```

**Card de Produto:**
```typescript
// components/cards/ProductCard.tsx
interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    discountPrice?: number
    images: string[]
    rating?: number
    category: string
  }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative bg-card rounded-lg border shadow-sm overflow-hidden"
    >
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <FavoriteButton productId={product.id} />
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <div className="flex items-center justify-between">
          <PriceDisplay 
            price={product.price} 
            discountPrice={product.discountPrice} 
          />
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </motion.div>
  )
}
```

**Hero Section:**
```typescript
// components/hero/VideoHero.tsx
export function VideoHero({ items }: { items: VideoItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  return (
    <section className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.video
          key={currentIndex}
          src={items[currentIndex].video}
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      </AnimatePresence>
      
      <div className="relative z-10 flex items-center justify-center h-full bg-black/40">
        <div className="text-center text-white max-w-4xl px-4">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl md:text-8xl font-bold mb-6"
          >
            {items[currentIndex].title}
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl mb-8"
          >
            {items[currentIndex].subtitle}
          </motion.p>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button size="lg" className="text-lg px-8 py-4">
              Explorar Produtos
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

### **Componentes de Layout**

**Layout Principal:**
```typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProviders>
          <div className="layout-shell relative">
            <MainNavbar />
            <main className="layout-main">
              {children}
            </main>
            <USSFooter />
          </div>
        </AppProviders>
      </body>
    </html>
  )
}
```

**Providers:**
```typescript
// components/providers.tsx
function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <FavoritesProvider>
      <CartProvider>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </CartProvider>
    </FavoritesProvider>
  )
}
```

---

## 🌙 SISTEMA DE TEMA

### **Configuração de Temas**

O sistema implementa um design system completo com suporte a modo claro/escuro:

#### **Tokens de Design**
```css
/* styles/theme.css */
:root {
  /* Cores base */
  --color-bg-base: #ffffff;
  --color-bg-elev-1: #f8fafc;
  --color-bg-elev-2: #f1f5f9;
  --color-bg-elev-3: #e2e8f0;
  
  /* Texto */
  --color-text-primary: #0f172a;
  --color-text-secondary: #475569;
  --color-text-tertiary: #64748b;
  --color-text-inverse: #ffffff;
  
  /* Marca USS Brasil */
  --color-brand-primary: #00b3e6;
  --color-brand-secondary: #0088cc;
  --color-brand-accent: #38bdf8;
  --color-brand-gradient: linear-gradient(135deg, #00b3e6 0%, #0088cc 100%);
  
  /* Bordas */
  --color-border: #e2e8f0;
  --color-border-strong: #cbd5e1;
  
  /* Estados */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
}

[data-theme="dark"] {
  /* Cores base */
  --color-bg-base: #0f172a;
  --color-bg-elev-1: #1e293b;
  --color-bg-elev-2: #334155;
  --color-bg-elev-3: #475569;
  
  /* Texto */
  --color-text-primary: #f8fafc;
  --color-text-secondary: #cbd5e1;
  --color-text-tertiary: #94a3b8;
  --color-text-inverse: #0f172a;
  
  /* Marca USS Brasil */
  --color-brand-primary: #38bdf8;
  --color-brand-secondary: #0ea5e9;
  --color-brand-accent: #67e8f9;
  --color-brand-gradient: linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%);
}
```

#### **Componente Theme Toggle**
```typescript
// components/theme-toggle.tsx
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          Escuro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Monitor className="mr-2 h-4 w-4" />
          Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

### **Classes Utilitárias**
```css
/* styles/components.css */
.card {
  background: var(--color-bg-elev-1);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease-in-out;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: var(--color-brand-gradient);
  color: var(--color-text-inverse);
  box-shadow: var(--shadow-md);
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
}

.text-gradient-brand {
  background: var(--color-brand-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## ⚡ FUNCIONALIDADES

### **Sistema de Carrinho**
```typescript
// contexts/CartContext.tsx
interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (product: Product, quantity: number = 1) => {
    setItems(current => {
      const existingItem = current.find(item => item.productId === product.id)
      
      if (existingItem) {
        return current.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      
      return [...current, {
        id: crypto.randomUUID(),
        productId: product.id,
        name: product.name,
        price: product.discountPrice || product.price,
        quantity,
        image: product.images[0]
      }]
    })
  }

  const removeItem = (productId: string) => {
    setItems(current => current.filter(item => item.productId !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    setItems(current =>
      current.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      )
    )
  }

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      total,
      itemCount,
      clearCart: () => setItems([])
    }}>
      {children}
    </CartContext.Provider>
  )
}
```

### **Sistema de Busca**
```typescript
// hooks/useSearch.ts
export function useSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const search = useCallback(
    debounce(async (term: string) => {
      if (!term.trim()) {
        setResults([])
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(`/api/products/search?q=${encodeURIComponent(term)}`)
        const products = await response.json()
        setResults(products)
      } catch (error) {
        console.error('Erro na busca:', error)
      } finally {
        setIsLoading(false)
      }
    }, 300),
    []
  )

  useEffect(() => {
    search(searchTerm)
  }, [searchTerm, search])

  return {
    searchTerm,
    setSearchTerm,
    results,
    isLoading
  }
}
```

### **Sistema de Favoritos**
```typescript
// contexts/FavoritesContext.tsx
export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('uss-favorites')
    if (saved) {
      setFavorites(JSON.parse(saved))
    }
  }, [])

  const addFavorite = (productId: string) => {
    setFavorites(current => {
      const updated = [...current, productId]
      localStorage.setItem('uss-favorites', JSON.stringify(updated))
      return updated
    })
  }

  const removeFavorite = (productId: string) => {
    setFavorites(current => {
      const updated = current.filter(id => id !== productId)
      localStorage.setItem('uss-favorites', JSON.stringify(updated))
      return updated
    })
  }

  const isFavorite = (productId: string) => favorites.includes(productId)

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  )
}
```

### **Sistema de Autenticação**
```typescript
// lib/auth.ts
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      }
    })
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = user.role
      }
      return token
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.role = token.role
      }
      return session
    }
  }
}
```

---

## 🔌 API ROUTES

### **Estrutura das APIs**
```
app/api/
├── auth/
│   └── [...nextauth]/
│       └── route.ts          # NextAuth.js
├── products/
│   ├── route.ts              # GET /api/products, POST /api/products
│   ├── [id]/
│   │   └── route.ts          # GET, PUT, DELETE /api/products/[id]
│   └── search/
│       └── route.ts          # GET /api/products/search
├── categories/
│   ├── route.ts              # GET, POST /api/categories
│   └── [id]/
│       └── route.ts          # GET, PUT, DELETE /api/categories/[id]
├── cart/
│   └── route.ts              # GET, POST, PUT, DELETE /api/cart
├── orders/
│   ├── route.ts              # GET, POST /api/orders
│   └── [id]/
│       └── route.ts          # GET, PUT /api/orders/[id]
└── upload/
    └── route.ts              # POST /api/upload
```

### **Exemplo de API Route**
```typescript
// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const skip = (page - 1) * limit

    const where = {
      status: 'ACTIVE',
      ...(category && { category: { slug: category } }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } }
        ]
      })
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          reviews: {
            select: { rating: true }
          }
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.product.count({ where })
    ])

    const productsWithRating = products.map(product => ({
      ...product,
      averageRating: product.reviews.length > 0
        ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
        : 0,
      reviews: undefined
    }))

    return NextResponse.json({
      products: productsWithRating,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Acesso negado' },
        { status: 403 }
      )
    }

    const body = await request.json()
    
    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        discountPrice: body.discountPrice,
        stock: body.stock,
        categoryId: body.categoryId,
        images: JSON.stringify(body.images),
        specifications: JSON.stringify(body.specifications),
        featured: body.featured || false
      },
      include: {
        category: true
      }
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar produto:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
```

### **Middleware de Validação**
```typescript
// lib/validation.ts
import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  price: z.number().positive('Preço deve ser positivo'),
  discountPrice: z.number().positive().optional(),
  stock: z.number().int().min(0, 'Estoque não pode ser negativo'),
  categoryId: z.string().cuid('ID da categoria inválido'),
  images: z.array(z.string().url()).min(1, 'Pelo menos uma imagem é obrigatória'),
  specifications: z.record(z.string()).optional(),
  featured: z.boolean().optional()
})

export const orderSchema = z.object({
  items: z.array(z.object({
    productId: z.string().cuid(),
    quantity: z.number().int().positive()
  })).min(1, 'Pelo menos um item é obrigatório'),
  shippingAddress: z.object({
    street: z.string().min(5),
    city: z.string().min(2),
    state: z.string().min(2),
    zipCode: z.string().regex(/^\d{5}-?\d{3}$/),
    country: z.string().default('Brasil')
  }),
  paymentMethod: z.string().min(1)
})
```

---

## 🚀 DEPLOY E PRODUÇÃO

### **Opções de Deploy**

#### **1. Netlify (Recomendado)**
```bash
# Deploy automático
./setup-deploy.ps1  # Windows
./setup-deploy.sh   # Linux/Mac
```

**Configuração Manual:**
1. Acesse [netlify.com](https://netlify.com)
2. New site from Git
3. Configure:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Adicione variáveis de ambiente

**Variáveis de Ambiente:**
```env
NEXTAUTH_SECRET=sua-chave-super-segura-de-32-caracteres
NEXTAUTH_URL=https://seu-site.netlify.app
DATABASE_URL=postgresql://user:pass@host:5432/database
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://seu-site.netlify.app
```

#### **2. Vercel**
```bash
npm i -g vercel
vercel --prod
```

#### **3. Railway**
1. Acesse [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Add PostgreSQL service
4. Configure variáveis de ambiente

#### **4. Docker**
```dockerfile
# Dockerfile
FROM node:18-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "start"]
```

### **Scripts de Deploy**
```json
{
  "build:production": "npm run clean && npm run db:generate && npm run build",
  "build:railway": "npm run clean && npm run db:generate && npm run build",
  "build:render": "npm install && npm run clean && npm run db:generate && npm run build",
  "build:netlify": "npm run build:production",
  "build:vercel": "npm run build:production",
  "postinstall": "prisma generate || true"
}
```

### **Configuração de Banco para Produção**

#### **Supabase (Recomendado)**
```env
DATABASE_URL="postgresql://postgres:password@db.xxx.supabase.co:5432/postgres"
```

#### **PlanetScale**
```env
DATABASE_URL="mysql://user:pass@host.planetscale.cloud/database?ssl={"rejectUnauthorized":true}"
```

#### **Railway PostgreSQL**
```env
DATABASE_URL=${{DATABASE_URL}}
```

### **Configuração Netlify**
```toml
# netlify.toml
[build]
  publish = ".next"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/api/*"
  [headers.values]
    Access-Control-Allow-Origin = "*"
    Access-Control-Allow-Methods = "GET, POST, PUT, DELETE, OPTIONS"
    Access-Control-Allow-Headers = "Content-Type, Authorization"
```

---

## 🔧 MANUTENÇÃO E DESENVOLVIMENTO

### **Estrutura de Desenvolvimento**

#### **Padrões de Código**
```json
{
  "eslint": {
    "extends": ["next/core-web-vitals"],
    "rules": {
      "prefer-const": "error",
      "no-unused-vars": "warn",
      "@typescript-eslint/no-unused-vars": "warn"
    }
  },
  "prettier": {
    "semi": false,
    "singleQuote": true,
    "tabWidth": 2,
    "trailingComma": "es5"
  }
}
```

#### **Commits Convencionais**
```
feat: adiciona nova funcionalidade
fix: corrige bug
docs: atualiza documentação
style: formatação de código
refactor: refatoração sem mudança de funcionalidade
test: adiciona ou modifica testes
chore: atualiza dependências ou configurações
```

### **Testing Strategy**
```typescript
// __tests__/components/ProductCard.test.tsx
import { render, screen } from '@testing-library/react'
import { ProductCard } from '@/components/cards/ProductCard'

const mockProduct = {
  id: '1',
  name: 'iPhone 16 Pro',
  price: 7999.99,
  discountPrice: 7499.99,
  images: ['/test-image.jpg'],
  rating: 4.5,
  category: 'iPhone'
}

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('iPhone 16 Pro')).toBeInTheDocument()
    expect(screen.getByText('R$ 7.499,99')).toBeInTheDocument()
    expect(screen.getByText('R$ 7.999,99')).toBeInTheDocument()
  })
})
```

### **Performance Monitoring**
```typescript
// lib/analytics.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

function sendToAnalytics(metric: any) {
  // Enviar métricas para serviço de analytics
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', metric.name, {
      value: Math.round(metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
    })
  }
}

export function initAnalytics() {
  getCLS(sendToAnalytics)
  getFID(sendToAnalytics)
  getFCP(sendToAnalytics)
  getLCP(sendToAnalytics)
  getTTFB(sendToAnalytics)
}
```

### **SEO Optimization**
```typescript
// lib/seo.ts
export function generateMetadata(page: string, data?: any) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://uss-brasil.netlify.app'
  
  const metadata = {
    home: {
      title: 'USS Brasil | Produtos Apple Premium - iPhone, MacBook, iPad',
      description: 'Loja premium de produtos Apple no Brasil. iPhone 16 Pro, MacBook Pro M3, iPad Pro, Apple Watch Ultra 2 com garantia oficial e entrega expressa.',
      openGraph: {
        title: 'USS Brasil - Tecnologia Premium',
        description: 'iPhone, MacBook, iPad e mais com garantia e suporte especializado.',
        url: baseUrl,
        images: ['/og-image-home.jpg']
      }
    },
    product: {
      title: `${data?.name} | USS Brasil`,
      description: `${data?.description} - Compre com garantia oficial na USS Brasil.`,
      openGraph: {
        title: data?.name,
        description: data?.description,
        images: data?.images || []
      }
    }
  }

  return metadata[page] || metadata.home
}
```

### **Backup e Recuperação**
```bash
# Backup do banco de dados
npx prisma db pull
npx prisma generate

# Backup das imagens
rsync -av public/ backup/public/

# Backup do código
git archive --format=tar.gz --output=backup.tar.gz HEAD
```

### **Monitoramento de Erros**
```typescript
// lib/error-tracking.ts
export function reportError(error: Error, context?: any) {
  console.error('Error reported:', error)
  
  // Integração com Sentry ou similar
  if (process.env.NODE_ENV === 'production') {
    // Sentry.captureException(error, { extra: context })
  }
}

// Uso em componentes
try {
  // Código que pode gerar erro
} catch (error) {
  reportError(error, { component: 'ProductCard', productId: product.id })
}
```

---

## 📞 SUPORTE E CONTATO

### **Desenvolvedor**
- **Nome**: Icaro de Oliveira
- **GitHub**: [@Ynd-Icaro](https://github.com/Ynd-Icaro)
- **Projeto**: [Ecommerce-UssBrasil](https://github.com/Ynd-Icaro/Ecommerce-UssBrasil)

### **Links Úteis**
- **Demo**: [https://uss-brasil.netlify.app](https://uss-brasil.netlify.app)
- **Documentação**: Este arquivo
- **Issues**: [GitHub Issues](https://github.com/Ynd-Icaro/Ecommerce-UssBrasil/issues)

### **Status do Sistema**
- ✅ **Sistema Completo**: 100% funcional
- ✅ **TypeScript**: Zero erros de compilação
- ✅ **Design System**: Implementado e documentado
- ✅ **Responsivo**: Mobile-first approach
- ✅ **Pronto para Produção**: Deploy automático configurado

---

## 📄 CHANGELOG

### **v1.0.0 - Sistema Completo**
- ✅ E-commerce completo com carrinho e checkout
- ✅ Sistema de autenticação com NextAuth.js
- ✅ Dashboard administrativo
- ✅ Design system USS Brasil
- ✅ Modo claro/escuro
- ✅ Responsivo e otimizado
- ✅ Deploy automático configurado

### **v1.1.0 - Melhorias**
- ✅ Sistema de favoritos
- ✅ Busca avançada
- ✅ Filtros por categoria
- ✅ Sistema de reviews
- ✅ Otimizações de performance

---

**🎉 Sistema USS Brasil E-commerce - Documentação Completa**

> Esta documentação cobre todos os aspectos técnicos e funcionais do sistema. Para dúvidas específicas, consulte os arquivos de documentação individual ou entre em contato com o desenvolvedor.
