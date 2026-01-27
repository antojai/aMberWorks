import { Plus } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function ProductCard({ product }) {
    const { addToCart, cart, updateQuantity, removeFromCart } = useShop();

    const cartItem = cart.find(item => item.id === product.id);

    return (
        <div className="card">
            <div style={{ height: '200px', overflow: 'hidden', backgroundColor: '#f0f0f0' }}>
                <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                        e.target.src = 'https://placehold.co/400x300?text=No+Image';
                    }}
                />
            </div>

            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>{product.name}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', flex: 1 }}>{product.description}</p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--primary-dark)' }}>
                        ₹{parseFloat(product.price).toFixed(2)}
                    </span>

                    {cartItem ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--background)', padding: '0.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                            <button
                                onClick={() => cartItem.quantity === 1 ? removeFromCart(product.id) : updateQuantity(product.id, -1)}
                                style={{ padding: '0.25rem 0.5rem', fontWeight: 'bold', color: 'var(--text-main)' }}
                            >
                                -
                            </button>
                            <span style={{ fontWeight: '600', minWidth: '1.5rem', textAlign: 'center' }}>{cartItem.quantity}</span>
                            <button
                                onClick={() => updateQuantity(product.id, 1)}
                                style={{ padding: '0.25rem 0.5rem', fontWeight: 'bold', color: 'var(--primary)' }}
                            >
                                +
                            </button>
                        </div>
                    ) : (
                        <button
                            className="btn btn-primary"
                            onClick={() => addToCart(product)}
                            style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                        >
                            <Plus size={16} /> Add
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
