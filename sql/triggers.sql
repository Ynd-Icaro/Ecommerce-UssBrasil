-- ========== TRIGGERS AVANÇADOS USS BRASIL ==========

-- Trigger para log de auditoria
CREATE TABLE IF NOT EXISTS audit_log (
    id SERIAL PRIMARY KEY,
    table_name VARCHAR(50) NOT NULL,
    operation VARCHAR(10) NOT NULL,
    old_data JSONB,
    new_data JSONB,
    user_id TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address INET
);

-- Função genérica de auditoria
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO audit_log (table_name, operation, new_data)
        VALUES (TG_TABLE_NAME, TG_OP, row_to_json(NEW));
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_log (table_name, operation, old_data, new_data)
        VALUES (TG_TABLE_NAME, TG_OP, row_to_json(OLD), row_to_json(NEW));
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO audit_log (table_name, operation, old_data)
        VALUES (TG_TABLE_NAME, TG_OP, row_to_json(OLD));
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Aplicar auditoria em tabelas críticas
CREATE TRIGGER audit_products 
    AFTER INSERT OR UPDATE OR DELETE ON "Product"
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_orders 
    AFTER INSERT OR UPDATE OR DELETE ON "Order"
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_users 
    AFTER INSERT OR UPDATE OR DELETE ON "User"
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

-- ========== TRIGGER PARA CONTROLE DE ESTOQUE ==========

-- Função para controle automático de estoque
CREATE OR REPLACE FUNCTION manage_product_stock()
RETURNS TRIGGER AS $$
BEGIN
    -- Quando um pedido é confirmado, reduzir estoque
    IF TG_OP = 'UPDATE' AND OLD.status != 'PAID' AND NEW.status = 'PAID' THEN
        UPDATE "Product" 
        SET stock = stock - oi.quantity
        FROM "OrderItem" oi
        WHERE oi."orderId" = NEW.id AND "Product".id = oi."productId";
        
        -- Marcar produtos com estoque baixo
        UPDATE "Product" 
        SET status = 'OUT_OF_STOCK'
        WHERE stock <= 0 AND status = 'ACTIVE';
        
    -- Quando um pedido é cancelado, restaurar estoque
    ELSIF TG_OP = 'UPDATE' AND OLD.status = 'PAID' AND NEW.status = 'CANCELLED' THEN
        UPDATE "Product" 
        SET stock = stock + oi.quantity
        FROM "OrderItem" oi
        WHERE oi."orderId" = NEW.id AND "Product".id = oi."productId";
        
        -- Reativar produtos que voltaram ao estoque
        UPDATE "Product" 
        SET status = 'ACTIVE'
        WHERE stock > 0 AND status = 'OUT_OF_STOCK';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger de estoque
CREATE TRIGGER manage_stock_trigger
    AFTER UPDATE ON "Order"
    FOR EACH ROW EXECUTE FUNCTION manage_product_stock();

-- ========== TRIGGER PARA CACHE INVALIDATION ==========

-- Tabela para controle de cache
CREATE TABLE IF NOT EXISTS cache_invalidation (
    id SERIAL PRIMARY KEY,
    cache_key VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Função para invalidar cache
CREATE OR REPLACE FUNCTION invalidate_cache()
RETURNS TRIGGER AS $$
BEGIN
    -- Invalidar cache de produtos quando houver mudanças
    IF TG_TABLE_NAME = 'Product' THEN
        INSERT INTO cache_invalidation (cache_key) VALUES 
            ('products:all'),
            ('products:featured'),
            ('products:category:' || COALESCE(NEW."categoryId", OLD."categoryId")),
            ('product:' || COALESCE(NEW.id, OLD.id));
    
    -- Invalidar cache de categorias
    ELSIF TG_TABLE_NAME = 'Category' THEN
        INSERT INTO cache_invalidation (cache_key) VALUES 
            ('categories:all'),
            ('category:' || COALESCE(NEW.id, OLD.id));
    
    -- Invalidar cache de pedidos do usuário
    ELSIF TG_TABLE_NAME = 'Order' THEN
        INSERT INTO cache_invalidation (cache_key) VALUES 
            ('orders:user:' || COALESCE(NEW."userId", OLD."userId"));
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Aplicar triggers de cache
CREATE TRIGGER invalidate_product_cache
    AFTER INSERT OR UPDATE OR DELETE ON "Product"
    FOR EACH ROW EXECUTE FUNCTION invalidate_cache();

CREATE TRIGGER invalidate_category_cache
    AFTER INSERT OR UPDATE OR DELETE ON "Category"
    FOR EACH ROW EXECUTE FUNCTION invalidate_cache();

CREATE TRIGGER invalidate_order_cache
    AFTER INSERT OR UPDATE OR DELETE ON "Order"
    FOR EACH ROW EXECUTE FUNCTION invalidate_cache();

-- ========== TRIGGER PARA NOTIFICAÇÕES ==========

-- Tabela para queue de notificações
CREATE TABLE IF NOT EXISTS notification_queue (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    data JSONB,
    sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Função para criar notificações
CREATE OR REPLACE FUNCTION create_notification()
RETURNS TRIGGER AS $$
BEGIN
    -- Notificação quando pedido muda de status
    IF TG_TABLE_NAME = 'Order' AND TG_OP = 'UPDATE' AND OLD.status != NEW.status THEN
        INSERT INTO notification_queue (user_id, type, title, message, data)
        VALUES (
            NEW."userId",
            'order_status_change',
            'Status do Pedido Atualizado',
            'Seu pedido #' || NEW.id || ' foi atualizado para: ' || NEW.status,
            jsonb_build_object('orderId', NEW.id, 'newStatus', NEW.status)
        );
    
    -- Notificação quando produto volta ao estoque
    ELSIF TG_TABLE_NAME = 'Product' AND TG_OP = 'UPDATE' 
          AND OLD.status = 'OUT_OF_STOCK' AND NEW.status = 'ACTIVE' THEN
        
        -- Notificar usuários que têm o produto na lista de desejos
        INSERT INTO notification_queue (user_id, type, title, message, data)
        SELECT 
            w."userId",
            'product_back_in_stock',
            'Produto Disponível!',
            'O produto ' || NEW.name || ' voltou ao estoque!',
            jsonb_build_object('productId', NEW.id, 'productName', NEW.name)
        FROM "Wishlist" w
        WHERE w."productId" = NEW.id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger de notificações
CREATE TRIGGER create_notification_trigger
    AFTER UPDATE ON "Order"
    FOR EACH ROW EXECUTE FUNCTION create_notification();

CREATE TRIGGER product_stock_notification_trigger
    AFTER UPDATE ON "Product"
    FOR EACH ROW EXECUTE FUNCTION create_notification();

-- ========== TRIGGER PARA SEO E SLUGS ==========

-- Função para gerar slug automaticamente
CREATE OR REPLACE FUNCTION generate_slug()
RETURNS TRIGGER AS $$
DECLARE
    base_slug TEXT;
    final_slug TEXT;
    counter INTEGER := 1;
BEGIN
    -- Gerar slug base a partir do nome
    base_slug := lower(trim(NEW.name));
    base_slug := regexp_replace(base_slug, '[^a-z0-9\s-]', '', 'g');
    base_slug := regexp_replace(base_slug, '\s+', '-', 'g');
    base_slug := regexp_replace(base_slug, '-+', '-', 'g');
    base_slug := trim(base_slug, '-');
    
    final_slug := base_slug;
    
    -- Verificar se slug já existe e adicionar número se necessário
    IF TG_TABLE_NAME = 'Product' THEN
        WHILE EXISTS (SELECT 1 FROM "Product" WHERE slug = final_slug AND id != COALESCE(NEW.id, '')) LOOP
            final_slug := base_slug || '-' || counter;
            counter := counter + 1;
        END LOOP;
    ELSIF TG_TABLE_NAME = 'Category' THEN
        WHILE EXISTS (SELECT 1 FROM "Category" WHERE slug = final_slug AND id != COALESCE(NEW.id, '')) LOOP
            final_slug := base_slug || '-' || counter;
            counter := counter + 1;
        END LOOP;
    END IF;
    
    NEW.slug := final_slug;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger de slug apenas se slug estiver vazio
CREATE OR REPLACE FUNCTION generate_slug_if_empty()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        NEW := generate_slug();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_product_slug
    BEFORE INSERT OR UPDATE ON "Product"
    FOR EACH ROW EXECUTE FUNCTION generate_slug_if_empty();

CREATE TRIGGER generate_category_slug
    BEFORE INSERT OR UPDATE ON "Category"
    FOR EACH ROW EXECUTE FUNCTION generate_slug_if_empty();

-- ========== TRIGGER PARA LIMPAR DADOS ÓRFÃOS ==========

-- Função para limpeza automática
CREATE OR REPLACE FUNCTION cleanup_orphaned_data()
RETURNS TRIGGER AS $$
BEGIN
    -- Quando um usuário é deletado, limpar dados relacionados
    IF TG_TABLE_NAME = 'User' AND TG_OP = 'DELETE' THEN
        DELETE FROM "CartItem" WHERE "userId" = OLD.id;
        DELETE FROM "Session" WHERE "userId" = OLD.id;
        DELETE FROM "Account" WHERE "userId" = OLD.id;
        -- Manter pedidos e reviews para auditoria, apenas marcar usuário como deletado
    
    -- Quando um produto é deletado, limpar carrinho
    ELSIF TG_TABLE_NAME = 'Product' AND TG_OP = 'DELETE' THEN
        DELETE FROM "CartItem" WHERE "productId" = OLD.id;
    END IF;
    
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cleanup_user_data
    AFTER DELETE ON "User"
    FOR EACH ROW EXECUTE FUNCTION cleanup_orphaned_data();

CREATE TRIGGER cleanup_product_data
    AFTER DELETE ON "Product"
    FOR EACH ROW EXECUTE FUNCTION cleanup_orphaned_data();
