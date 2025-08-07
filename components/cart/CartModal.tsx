import React from 'react';

interface GlobalCartProps {
    isOpen: boolean;
    onClose: () => void;
    items: Array<{
        id: string;
        name: string;
        price: number;
        quantity: number;
        image?: string;
    }>;
    onRemoveItem: (id: string) => void;
}

const CartModal: React.FC<GlobalCartProps> = ({
    isOpen,
    onClose,
    items,
    onRemoveItem,
}) => {
    if (!isOpen) return null;

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                right: 0,
                width: '400px',
                height: '100%',
                background: '#fff',
                boxShadow: '-2px 0 8px rgba(0,0,0,0.2)',
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <div style={{ padding: '16px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Carrinho</h2>
                <button onClick={onClose} style={{ fontSize: '20px', background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
                {items.length === 0 ? (
                    <p>Seu carrinho está vazio.</p>
                ) : (
                    items.map(item => (
                        <div key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                            {item.image && (
                                <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', marginRight: '12px' }} />
                            )}
                            <div style={{ flex: 1 }}>
                                <div>{item.name}</div>
                                <div>Qtd: {item.quantity}</div>
                                <div>R$ {(item.price * item.quantity).toFixed(2)}</div>
                            </div>
                            <button
                                onClick={() => onRemoveItem(item.id)}
                                style={{ background: 'none', border: 'none', color: '#d00', cursor: 'pointer', fontSize: '16px', marginLeft: '8px' }}
                                aria-label="Remover item"
                            >
                                Remover
                            </button>
                        </div>
                    ))
                )}
            </div>
            <div style={{ padding: '16px', borderTop: '1px solid #eee' }}>
                <strong>Total: R$ {total.toFixed(2)}</strong>
                <button
                    style={{
                        width: '100%',
                        marginTop: '12px',
                        padding: '12px',
                        background: '#0070f3',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                    }}
                >
                    Finalizar compra
                </button>
            </div>
        </div>
    );
};

export default CartModal;