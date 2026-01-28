import { useState } from 'react';
import { Plus, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function ProductCard({ product }) {
    const { addToCart, cart, updateQuantity, removeFromCart } = useShop();
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

    const cartItem = cart.find(item => item.id === product.id);

    // Combine image and video into a media array
    // Normalize video URL to embed format if it's a youtube link
    const getEmbedUrl = (url) => {
        if (!url) return '';
        if (url.includes('youtube.com/shorts/')) {
            const videoId = url.split('youtube.com/shorts/')[1].split('?')[0];
            return `https://www.youtube.com/embed/${videoId}?rel=0&loop=1&playlist=${videoId}`;
        }
        if (url.includes('youtube.com/watch?v=')) {
            const videoId = url.split('v=')[1].split('&')[0];
            return `https://www.youtube.com/embed/${videoId}?rel=0`;
        }
        if (url.includes('youtu.be/')) {
            const videoId = url.split('youtu.be/')[1].split('?')[0];
            return `https://www.youtube.com/embed/${videoId}?rel=0`;
        }
        return url;
    };

    const media = [
        { type: 'image', src: product.image },
        ...(product.video ? [{ type: 'video', src: getEmbedUrl(product.video) }] : [])
    ];

    const nextMedia = () => {
        setCurrentMediaIndex((prev) => (prev + 1) % media.length);
    };

    const prevMedia = () => {
        setCurrentMediaIndex((prev) => (prev - 1 + media.length) % media.length);
    };

    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Media Slider Section */}
            <div style={{ position: 'relative', height: '300px', backgroundColor: '#000' }}>
                {media[currentMediaIndex].type === 'video' ? (
                    <iframe
                        width="100%"
                        height="100%"
                        src={media[currentMediaIndex].src}
                        title="Product Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ display: 'block' }}
                    ></iframe>
                ) : (
                    <img
                        src={media[currentMediaIndex].src}
                        alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        onError={(e) => {
                            e.target.src = 'https://placehold.co/400x300?text=No+Image';
                        }}
                    />
                )}

                {/* Badge */}
                {product.badge && (
                    <span style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: 'var(--error)',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        zIndex: 20
                    }}>
                        {product.badge}
                    </span>
                )}

                {/* Slider Controls */}
                {media.length > 1 && (
                    <>
                        <button
                            onClick={(e) => { e.preventDefault(); prevMedia(); }}
                            style={{
                                position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)',
                                background: 'rgba(255,255,255,0.7)', borderRadius: '50%', width: '32px', height: '32px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10,
                                color: 'black'
                            }}
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={(e) => { e.preventDefault(); nextMedia(); }}
                            style={{
                                position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                                background: 'rgba(255,255,255,0.7)', borderRadius: '50%', width: '32px', height: '32px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10,
                                color: 'black'
                            }}
                        >
                            <ChevronRight size={20} />
                        </button>

                        {/* Dots */}
                        <div style={{ position: 'absolute', bottom: '10px', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '6px', zIndex: 10 }}>
                            {media.map((_, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setCurrentMediaIndex(idx)}
                                    style={{
                                        width: '8px', height: '8px', borderRadius: '50%',
                                        backgroundColor: idx === currentMediaIndex ? 'var(--primary)' : 'rgba(255,255,255,0.5)',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.2s'
                                    }}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', lineHeight: '1.4' }}>{product.name}</h3>

                {/* Description & Features */}
                <div style={{ flex: 1 }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                        <p style={{ whiteSpace: 'pre-line' }}>
                            {isExpanded ? product.description : `${product.description.slice(0, 150)}...`}
                        </p>
                        {product.description.length > 150 && (
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--primary)',
                                    fontWeight: 'bold',
                                    padding: '0',
                                    marginTop: '0.25rem',
                                    fontSize: '0.85rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem',
                                    cursor: 'pointer'
                                }}
                            >
                                {isExpanded ? (
                                    <>See Less <ChevronUp size={14} /></>
                                ) : (
                                    <>See More <ChevronDown size={14} /></>
                                )}
                            </button>
                        )}
                    </div>

                    {product.features && (
                        <ul style={{ paddingLeft: '1.2rem', margin: '0.5rem 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            {product.features.slice(0, 4).map((feature, idx) => (
                                <li key={idx} style={{ marginBottom: '0.25rem' }}>{feature}</li>
                            ))}
                            {product.features.length > 4 && <li>+{product.features.length - 4} more features</li>}
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
