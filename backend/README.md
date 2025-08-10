# USS Brasil Backend API

Backend completo para o sistema e-commerce USS Brasil, desenvolvido com Node.js, Express.js, TypeScript e Prisma.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **TypeScript** - Tipagem estática
- **Prisma** - ORM para banco de dados
- **SQLite/PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **Bcrypt** - Hash de senhas
- **Helmet** - Segurança HTTP
- **CORS** - Cross-Origin Resource Sharing
- **Rate Limiting** - Limitação de requisições
- **Winston** - Logging
- **Express Validator** - Validação de dados

## 📦 Instalação

1. **Clone o repositório:**
```bash
git clone <repository-url>
cd Ecommerce-UssBrasil/backend
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. **Configure o banco de dados:**
```bash
# Gere o cliente Prisma
npx prisma generate

# Execute as migrações
npx prisma migrate dev

# (Opcional) Popule o banco com dados de exemplo
npx prisma db seed
```

## 🏃‍♂️ Executando

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

### Testes
```bash
npm test
npm run test:watch
npm run test:coverage
```

## 📁 Estrutura do Projeto

```
backend/
├── src/
│   ├── config/           # Configurações (database, redis, etc.)
│   ├── controllers/      # Controllers da API
│   ├── middleware/       # Middlewares personalizados
│   ├── routes/          # Definição das rotas
│   ├── services/        # Lógica de negócio
│   ├── types/           # Tipos TypeScript
│   ├── utils/           # Utilitários e helpers
│   ├── index.ts         # Arquivo principal
│   └── server.ts        # Configuração do Express
├── prisma/              # Schema e migrações do Prisma
├── sql/                 # Otimizações SQL customizadas
├── logs/                # Arquivos de log
├── uploads/             # Arquivos uploadados
├── tests/               # Testes automatizados
├── .env                 # Variáveis de ambiente (não commitado)
├── .env.example         # Exemplo de variáveis de ambiente
├── package.json         # Dependências e scripts
└── tsconfig.json        # Configuração TypeScript
```

## 🛡️ Recursos de Segurança

- **Helmet** - Headers de segurança HTTP
- **CORS** - Configuração segura de CORS
- **Rate Limiting** - Proteção contra spam/DDoS
- **Input Sanitization** - Sanitização de entrada
- **JWT Authentication** - Autenticação segura
- **Password Hashing** - Hash bcrypt para senhas
- **Validation** - Validação rigorosa de dados
- **Error Handling** - Tratamento seguro de erros

## 📊 Monitoramento e Logs

- **Winston Logger** - Sistema de logs estruturado
- **Request Logging** - Log de todas as requisições
- **Error Tracking** - Rastreamento de erros
- **Performance Monitoring** - Monitoramento de performance

## 🔧 API Endpoints

### Autenticação
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Perfil do usuário
- `PUT /api/auth/profile` - Atualizar perfil
- `PUT /api/auth/change-password` - Alterar senha
- `POST /api/auth/logout` - Logout

### Produtos
- `GET /api/products` - Listar produtos (com filtros)
- `GET /api/products/:id` - Detalhes do produto
- `POST /api/products` - Criar produto (Admin)
- `PUT /api/products/:id` - Atualizar produto (Admin)
- `DELETE /api/products/:id` - Excluir produto (Admin)
- `PATCH /api/products/:id/toggle-status` - Ativar/Desativar (Admin)

### Categorias
- `GET /api/categories` - Listar categorias
- `GET /api/categories/:id` - Detalhes da categoria
- `POST /api/categories` - Criar categoria (Admin)
- `PUT /api/categories/:id` - Atualizar categoria (Admin)
- `DELETE /api/categories/:id` - Excluir categoria (Admin)

### Carrinho
- `GET /api/cart` - Carrinho do usuário
- `POST /api/cart/add` - Adicionar ao carrinho
- `PUT /api/cart/update` - Atualizar quantidade
- `DELETE /api/cart/remove` - Remover do carrinho
- `DELETE /api/cart/clear` - Limpar carrinho

### Pedidos
- `GET /api/orders` - Pedidos do usuário
- `GET /api/orders/:id` - Detalhes do pedido
- `POST /api/orders` - Criar pedido
- `PUT /api/orders/:id/status` - Atualizar status (Admin)

### Administração
- `GET /api/admin/dashboard` - Dashboard admin
- `GET /api/admin/users` - Gerenciar usuários
- `GET /api/admin/orders` - Gerenciar pedidos
- `GET /api/admin/analytics` - Análises e métricas

### Upload
- `POST /api/upload/image` - Upload de imagem
- `POST /api/upload/multiple` - Upload múltiplo

### Sistema
- `GET /health` - Health check
- `GET /api` - Informações da API

## 🗄️ Banco de Dados

O projeto utiliza Prisma ORM com suporte para SQLite (desenvolvimento) e PostgreSQL (produção).

### Modelos Principais:
- **User** - Usuários do sistema
- **Product** - Produtos do e-commerce
- **Category** - Categorias de produtos
- **Order** - Pedidos realizados
- **CartItem** - Itens do carrinho
- **Review** - Avaliações de produtos
- **Wishlist** - Lista de desejos
- **Address** - Endereços dos usuários

### Otimizações SQL:
- Índices otimizados para consultas frequentes
- Views para consultas complexas
- Triggers para auditoria
- Stored procedures para operações batch
- Full-text search para produtos

## 🚀 Deploy

### Usando Docker
```bash
docker build -t uss-brasil-backend .
docker run -p 5000:5000 uss-brasil-backend
```

### Usando PM2
```bash
npm install -g pm2
npm run build
pm2 start dist/index.js --name "uss-brasil-backend"
```

### Variáveis de Ambiente Produção
```env
NODE_ENV=production
DATABASE_URL="postgresql://user:password@host:port/database"
JWT_SECRET="your-secure-production-jwt-secret"
ALLOWED_ORIGINS="https://uss-brasil.com,https://www.uss-brasil.com"
```

## 🧪 Testes

```bash
# Testes unitários
npm run test:unit

# Testes de integração
npm run test:integration

# Testes e2e
npm run test:e2e

# Coverage
npm run test:coverage
```

## 📈 Performance

- **Compressão GZIP** - Reduz tamanho das respostas
- **Caching** - Cache de consultas frequentes
- **Pagination** - Paginação eficiente
- **Indexação** - Índices otimizados no banco
- **Connection Pooling** - Pool de conexões do banco
- **Rate Limiting** - Controle de taxa de requisições

## 🔄 Versionamento da API

- **v1** - Versão atual estável
- **Backward Compatibility** - Mantém compatibilidade
- **Deprecation Warnings** - Avisos de descontinuação

## 📞 Suporte

Para dúvidas ou problemas:
- Abra uma issue no repositório
- Entre em contato com a equipe de desenvolvimento
- Consulte a documentação completa

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desenvolvido com ❤️ pela equipe USS Brasil
