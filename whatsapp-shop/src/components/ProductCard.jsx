import { Plus } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function ProductCard({ product }) {
    const { addToCart, cart, updateQuantity, removeFromCart } = useShop();
    const cartItem = cart.find(item => item.id === product.id);
    const discount = product.mrp ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;

    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ position: 'relative', height: '250px', overflow: 'hidden', backgroundColor: '#f0f0f0' }}>
                <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                        e.target.src = 'https://placehold.co/400x300?text=No+Image';
                    }}
                />
                {discount > 0 && (
                    <span style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: 'var(--error)',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                    }}>
                        {discount}% OFF
                    </span>
                )}
            </div>

            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', lineHeight: '1.4' }}>{product.name}</h3>

                {/* Description & Features */}
                <div style={{ flex: 1 }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                        {product.description}
                    </p>
                    {product.features && (
                        <ul style={{ paddingLeft: '1.2rem', margin: '0.5rem 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            {product.features.slice(0, 3).map((feature, idx) => (
                                <li key={idx} style={{ marginBottom: '0.25rem' }}>{feature}</li>
                            ))}
                            {product.features.length > 3 && <li>+{product.features.length - 3} more features</li>}
                        </ul>
                    )}
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.75rem' }}>
                        <span style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'var(--primary-dark)' }}>
                            ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.mrp && (
                            <span style={{ textDecoration: 'line-through', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                ₹{product.mrp.toLocaleString('en-IN')}
                            </span>
                        )}
                    </div>

                    {cartItem ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--background)', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <button
                                    onClick={() => cartItem.quantity === 1 ? removeFromCart(product.id) : updateQuantity(product.id, -1)}
                                    style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', backgroundColor: 'white', border: '1px solid var(--border)' }}
                                >
                                    -
                                </button>
                                <span style={{ fontWeight: 'bold' }}>{cartItem.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(product.id, 1)}
                                    style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white' }}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            className="btn btn-primary"
                            onClick={() => addToCart(product)}
                            style={{ width: '100%', justifyContent: 'center' }}
                        >
                            <Plus size={18} /> Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
