import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { MessageCircle, Trash2, AlertCircle } from 'lucide-react';

const OWNER_PHONE = '918148535076';

export default function OrderPage() {
    const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useShop();
    const navigate = useNavigate();

    const [customer, setCustomer] = useState({
        name: '',
        phone: '',
        email: '',
        address1: '',
        address2: '',
        district: '',
        state: '',
        pincode: ''
    });

    const [errors, setErrors] = useState({});

    if (cart.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
                <h2>Your Cart is Empty</h2>
                <p style={{ margin: '1rem 0', color: 'var(--text-secondary)' }}>Add some products to get started!</p>
                <button className="btn btn-primary" onClick={() => navigate('/')}>Browse Shop</button>
            </div>
        );
    }

    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
        // Clear error when user types
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!customer.name.trim()) newErrors.name = "Name is required";
        if (!customer.address1.trim()) newErrors.address1 = "Address Line 1 is required";
        if (!customer.district.trim()) newErrors.district = "District is required";
        if (!customer.state.trim()) newErrors.state = "State is required";
        if (!customer.pincode.trim()) newErrors.pincode = "Pincode is required";

        // Phone Validation (Simple check for 10 digits)
        const phoneRegex = /^[0-9]{10}$/;
        if (!customer.phone.trim()) {
            newErrors.phone = "Phone is required";
        } else if (!phoneRegex.test(customer.phone.replace(/\D/g, '').slice(-10))) {
            newErrors.phone = "Enter a valid 10-digit phone number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleOrder = (e) => {
        e.preventDefault();
        if (!validate()) return;

        // Construct Address String
        const fullAddress = `
${customer.address1}
${customer.address2 ? customer.address2 : ''}
${customer.district}, ${customer.state} - ${customer.pincode}
    `.trim();

        // Construct WhatsApp Message
        let message = `*New Order Request*\n\n`;
        message += `*Customer Details:*\n`;
        message += `Name: ${customer.name}\n`;
        message += `Phone: ${customer.phone}\n`;
        if (customer.email) message += `Email: ${customer.email}\n`;
        message += `Address:\n${fullAddress}\n\n`;

        message += `*Order Summary:*\n`;
        cart.forEach(item => {
            message += `- ${item.name} (x${item.quantity}): ₹${(item.price * item.quantity).toFixed(2)}\n`;
        });

        message += `\n*Total Order Value: ₹${getCartTotal().toFixed(2)}*`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${OWNER_PHONE}?text=${encodedMessage}`;

        // Open WhatsApp
        window.open(whatsappUrl, '_blank');

        // Clear cart and redirect
        clearCart();
        navigate('/confirmation');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <h1>Complete Your Order</h1>

            <div className="order-grid">
                {/* Cart Items */}
                <div className="card" style={{ padding: '1.5rem', height: 'fit-content' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Order Summary</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {cart.map(item => (
                            <div key={item.id} style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                                <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ fontSize: '1rem' }}>{item.name}</h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>₹{item.price.toFixed(2)}</p>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <button onClick={() => updateQuantity(item.id, -1)} style={{ padding: '2px 8px', background: '#eee', borderRadius: '4px' }}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)} style={{ padding: '2px 8px', background: '#eee', borderRadius: '4px' }}>+</button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} style={{ color: 'var(--error)', background: 'none' }}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem', marginTop: '0.5rem' }}>
                            <span>Total:</span>
                            <span>₹{getCartTotal().toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Customer Details Form */}
                <form className="card" style={{ padding: '1.5rem' }} onSubmit={handleOrder}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Shipping Details</h2>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Full Name *</label>
                        <input type="text" name="name" className="input" value={customer.name} onChange={handleChange} style={{ borderColor: errors.name ? 'var(--error)' : '' }} />
                        {errors.name && <small style={{ color: 'var(--error)' }}>{errors.name}</small>}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Phone Number *</label>
                            <input type="tel" name="phone" className="input" value={customer.phone} onChange={handleChange} placeholder="10-digit number" style={{ borderColor: errors.phone ? 'var(--error)' : '' }} />
                            {errors.phone && <small style={{ color: 'var(--error)' }}>{errors.phone}</small>}
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email (Optional)</label>
                            <input type="email" name="email" className="input" value={customer.email} onChange={handleChange} />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Address Line 1 *</label>
                        <input type="text" name="address1" className="input" value={customer.address1} onChange={handleChange} placeholder="House No, Street" style={{ borderColor: errors.address1 ? 'var(--error)' : '' }} />
                        {errors.address1 && <small style={{ color: 'var(--error)' }}>{errors.address1}</small>}
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Address Line 2 (Area)</label>
                        <input type="text" name="address2" className="input" value={customer.address2} onChange={handleChange} placeholder="Area, Landmark" />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>District *</label>
                            <input type="text" name="district" className="input" value={customer.district} onChange={handleChange} style={{ borderColor: errors.district ? 'var(--error)' : '' }} />
                            {errors.district && <small style={{ color: 'var(--error)' }}>{errors.district}</small>}
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>State *</label>
                            <input type="text" name="state" className="input" value={customer.state} onChange={handleChange} style={{ borderColor: errors.state ? 'var(--error)' : '' }} />
                            {errors.state && <small style={{ color: 'var(--error)' }}>{errors.state}</small>}
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Pincode *</label>
                        <input type="text" name="pincode" className="input" value={customer.pincode} onChange={handleChange} style={{ borderColor: errors.pincode ? 'var(--error)' : '', width: '50%' }} />
                        {errors.pincode && <small style={{ color: 'var(--error)' }}>{errors.pincode}</small>}
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: '1.1rem' }}>
                        <MessageCircle size={20} /> Place Order on WhatsApp
                    </button>
                </form>
            </div>
        </div>
    );
}
