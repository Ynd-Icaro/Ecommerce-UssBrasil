# 🛍️ USS Brasil E-commerce

Uma plataforma de e-commerce moderna e responsiva desenvolvida com Next.js 15, focada na venda de produtos Apple.

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

## 🌐 Deploy na Vercel

### Método 1: Deploy Automático via GitHub

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em "New Project"
3. Conecte seu repositório GitHub
4. Configure as variáveis de ambiente:
   - `NEXTAUTH_SECRET`: Um secret aleatório seguro
   - `NEXTAUTH_URL`: Sua URL de produção (ex: https://seu-projeto.vercel.app)
5. Clique em "Deploy"

### Método 2: Deploy via CLI

1. Instale a Vercel CLI:
```bash
npm i -g vercel
```

2. Faça login na Vercel:
```bash
vercel login
```

3. Deploy o projeto:
```bash
vercel --prod
```

### Configuração do Banco de Dados

Para produção, recomendamos usar um banco PostgreSQL. Configure a `DATABASE_URL` com a string de conexão do seu banco.

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
