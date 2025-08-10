# ========== BANCO DE DADOS OTIMIZADO USS BRASIL ==========

# Estrutura de índices para otimização de performance
# Executar após as migrações do Prisma

-- Índices para tabela de produtos
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_products_slug ON "Product" (slug);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_products_category_id ON "Product" ("categoryId");
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_products_brand ON "Product" (brand);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_products_status ON "Product" (status);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_products_featured ON "Product" (featured);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_products_price ON "Product" (price);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_products_created_at ON "Product" ("createdAt");

-- Índice composto para busca por categoria e status
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_products_category_status ON "Product" ("categoryId", status);

-- Índice composto para produtos em destaque ativos
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_products_featured_active ON "Product" (featured, status) WHERE featured = true AND status = 'ACTIVE';

-- Índice para busca de texto (PostgreSQL)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_products_search 
ON "Product" USING gin(to_tsvector('portuguese', name || ' ' || description));

-- Índices para tabela de categorias
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_categories_slug ON "Category" (slug);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_categories_brand ON "Category" (brand);

-- Índices para tabela de pedidos
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_orders_user_id ON "Order" ("userId");
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_orders_status ON "Order" (status);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_orders_created_at ON "Order" ("createdAt");
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_orders_user_status ON "Order" ("userId", status);

-- Índices para tabela de itens do pedido
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_order_items_order_id ON "OrderItem" ("orderId");
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_order_items_product_id ON "OrderItem" ("productId");

-- Índices para tabela de reviews
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_reviews_product_id ON "Review" ("productId");
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_reviews_user_id ON "Review" ("userId");
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_reviews_rating ON "Review" (rating);

-- Índices para tabela de carrinho
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_cart_items_user_id ON "CartItem" ("userId");
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_cart_items_product_id ON "CartItem" ("productId");

-- Índices para autenticação
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_email ON "User" (email);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_sessions_token ON "Session" ("sessionToken");
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_accounts_provider ON "Account" (provider, "providerAccountId");

-- ========== VIEWS PARA PERFORMANCE ==========

-- View para produtos com dados agregados
CREATE OR REPLACE VIEW products_with_stats AS
SELECT 
    p.*,
    c.name as category_name,
    c.slug as category_slug,
    COALESCE(AVG(r.rating), 0) as average_rating,
    COUNT(r.id) as total_reviews,
    COUNT(DISTINCT oi.id) as total_sales
FROM "Product" p
LEFT JOIN "Category" c ON p."categoryId" = c.id
LEFT JOIN "Review" r ON p.id = r."productId"
LEFT JOIN "OrderItem" oi ON p.id = oi."productId"
GROUP BY p.id, c.id, c.name, c.slug;

-- View para estatísticas de vendas
CREATE OR REPLACE VIEW sales_stats AS
SELECT 
    DATE_TRUNC('day', o."createdAt") as date,
    COUNT(o.id) as total_orders,
    SUM(o.total) as total_revenue,
    AVG(o.total) as average_order_value
FROM "Order" o
WHERE o.status IN ('PAID', 'DELIVERED')
GROUP BY DATE_TRUNC('day', o."createdAt")
ORDER BY date DESC;

-- View para produtos mais vendidos
CREATE OR REPLACE VIEW best_selling_products AS
SELECT 
    p.id,
    p.name,
    p.slug,
    p.price,
    p.images,
    SUM(oi.quantity) as total_quantity_sold,
    COUNT(DISTINCT oi."orderId") as total_orders
FROM "Product" p
JOIN "OrderItem" oi ON p.id = oi."productId"
JOIN "Order" o ON oi."orderId" = o.id
WHERE o.status IN ('PAID', 'DELIVERED')
GROUP BY p.id, p.name, p.slug, p.price, p.images
ORDER BY total_quantity_sold DESC;

-- ========== TRIGGERS PARA AUDITORIA E AUTOMAÇÃO ==========

-- Função para atualizar timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updatedAt automaticamente
CREATE TRIGGER update_product_updated_at BEFORE UPDATE ON "Product"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_category_updated_at BEFORE UPDATE ON "Category"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_updated_at BEFORE UPDATE ON "User"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_order_updated_at BEFORE UPDATE ON "Order"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Função para atualizar rating do produto
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE "Product" 
    SET 
        rating = (
            SELECT COALESCE(AVG(rating), 0) 
            FROM "Review" 
            WHERE "productId" = COALESCE(NEW."productId", OLD."productId")
        ),
        "totalReviews" = (
            SELECT COUNT(*) 
            FROM "Review" 
            WHERE "productId" = COALESCE(NEW."productId", OLD."productId")
        )
    WHERE id = COALESCE(NEW."productId", OLD."productId");
    
    RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

-- Trigger para atualizar rating automaticamente
CREATE TRIGGER update_product_rating_trigger 
    AFTER INSERT OR UPDATE OR DELETE ON "Review"
    FOR EACH ROW EXECUTE FUNCTION update_product_rating();

-- Função para verificar estoque antes de adicionar ao carrinho
CREATE OR REPLACE FUNCTION check_stock_before_cart()
RETURNS TRIGGER AS $$
DECLARE
    current_stock INTEGER;
BEGIN
    SELECT stock INTO current_stock 
    FROM "Product" 
    WHERE id = NEW."productId";
    
    IF current_stock < NEW.quantity THEN
        RAISE EXCEPTION 'Estoque insuficiente. Disponível: %, Solicitado: %', current_stock, NEW.quantity;
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para verificar estoque no carrinho
CREATE TRIGGER check_stock_before_cart_trigger 
    BEFORE INSERT OR UPDATE ON "CartItem"
    FOR EACH ROW EXECUTE FUNCTION check_stock_before_cart();

-- ========== STORED PROCEDURES PARA OPERAÇÕES COMPLEXAS ==========

-- Procedure para processar pedido
CREATE OR REPLACE FUNCTION process_order(
    p_user_id TEXT,
    p_items JSONB,
    p_shipping_address JSONB,
    p_payment_method TEXT
)
RETURNS TEXT AS $$
DECLARE
    v_order_id TEXT;
    v_item JSONB;
    v_product_stock INTEGER;
    v_total DECIMAL := 0;
BEGIN
    -- Criar o pedido
    INSERT INTO "Order" (
        id, "userId", status, "paymentStatus", "paymentMethod",
        "shippingAddress", subtotal, shipping, total, "createdAt", "updatedAt"
    ) VALUES (
        gen_random_uuid()::TEXT, p_user_id, 'PENDING', 'PENDING', p_payment_method,
        p_shipping_address, 0, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    ) RETURNING id INTO v_order_id;
    
    -- Processar cada item
    FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
    LOOP
        -- Verificar estoque
        SELECT stock INTO v_product_stock 
        FROM "Product" 
        WHERE id = (v_item->>'productId')::TEXT;
        
        IF v_product_stock < (v_item->>'quantity')::INTEGER THEN
            RAISE EXCEPTION 'Estoque insuficiente para produto %', v_item->>'productId';
        END IF;
        
        -- Adicionar item ao pedido
        INSERT INTO "OrderItem" (
            id, "orderId", "productId", quantity, price, "createdAt"
        ) VALUES (
            gen_random_uuid()::TEXT,
            v_order_id,
            (v_item->>'productId')::TEXT,
            (v_item->>'quantity')::INTEGER,
            (v_item->>'price')::DECIMAL,
            CURRENT_TIMESTAMP
        );
        
        -- Atualizar estoque
        UPDATE "Product" 
        SET stock = stock - (v_item->>'quantity')::INTEGER
        WHERE id = (v_item->>'productId')::TEXT;
        
        -- Calcular total
        v_total := v_total + ((v_item->>'price')::DECIMAL * (v_item->>'quantity')::INTEGER);
    END LOOP;
    
    -- Atualizar total do pedido
    UPDATE "Order" 
    SET subtotal = v_total, total = v_total + 10.00 -- Taxa de entrega fixa
    WHERE id = v_order_id;
    
    -- Limpar carrinho do usuário
    DELETE FROM "CartItem" WHERE "userId" = p_user_id;
    
    RETURN v_order_id;
END;
$$ language 'plpgsql';

-- ========== FUNÇÃO PARA BUSCA FULL-TEXT ==========

CREATE OR REPLACE FUNCTION search_products(
    p_query TEXT,
    p_limit INTEGER DEFAULT 20,
    p_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
    id TEXT,
    name TEXT,
    slug TEXT,
    price DECIMAL,
    "discountPrice" DECIMAL,
    images TEXT,
    brand "Brand",
    category_name TEXT,
    average_rating DECIMAL,
    rank REAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.name,
        p.slug,
        p.price,
        p."discountPrice",
        p.images,
        p.brand,
        c.name as category_name,
        COALESCE(AVG(r.rating), 0) as average_rating,
        ts_rank(
            to_tsvector('portuguese', p.name || ' ' || p.description),
            plainto_tsquery('portuguese', p_query)
        ) as rank
    FROM "Product" p
    LEFT JOIN "Category" c ON p."categoryId" = c.id
    LEFT JOIN "Review" r ON p.id = r."productId"
    WHERE 
        p.status = 'ACTIVE' AND
        to_tsvector('portuguese', p.name || ' ' || p.description) @@ plainto_tsquery('portuguese', p_query)
    GROUP BY p.id, c.name
    ORDER BY rank DESC, p.featured DESC, p."createdAt" DESC
    LIMIT p_limit OFFSET p_offset;
END;
$$ language 'plpgsql';

-- ========== OTIMIZAÇÕES DE PERFORMANCE ==========

-- Configurações de performance do PostgreSQL
-- (Adicionar ao postgresql.conf)

-- shared_buffers = 256MB
-- effective_cache_size = 1GB
-- work_mem = 4MB
-- maintenance_work_mem = 64MB
-- checkpoint_completion_target = 0.9
-- wal_buffers = 16MB
-- default_statistics_target = 100

-- ========== LIMPEZA E MANUTENÇÃO ==========

-- Procedure para limpeza de dados antigos
CREATE OR REPLACE FUNCTION cleanup_old_data()
RETURNS VOID AS $$
BEGIN
    -- Limpar sessões expiradas
    DELETE FROM "Session" WHERE expires < CURRENT_TIMESTAMP;
    
    -- Limpar carrinho de usuários inativos há mais de 30 dias
    DELETE FROM "CartItem" 
    WHERE "userId" IN (
        SELECT id FROM "User" 
        WHERE "updatedAt" < CURRENT_TIMESTAMP - INTERVAL '30 days'
    );
    
    -- Atualizar estatísticas das tabelas
    ANALYZE "Product";
    ANALYZE "Order";
    ANALYZE "User";
    ANALYZE "Review";
END;
$$ language 'plpgsql';

-- Agendar limpeza automática (executar via cron job)
-- SELECT cleanup_old_data();
