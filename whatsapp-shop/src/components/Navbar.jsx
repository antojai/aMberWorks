import { Link } from 'react-router-dom';
import { ShoppingCart, ShoppingBag, Lock } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import logo from '../assets/logo.jpg';

export default function Navbar() {
    const { cart } = useShop();
    const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav style={{
            backgroundColor: 'var(--secondary)',
            color: 'white',
            padding: '1rem',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            boxShadow: 'var(--shadow-md)'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 'bold', fontSize: '1.25rem', color: 'white' }}>
                    <img src={logo} alt="Amber Works" style={{ height: '40px', borderRadius: '4px' }} />
                    <span>Amber Works</span>
                </Link>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>

                    <Link to="/order" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <ShoppingCart size={24} />
                        {cartItemCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-8px',
                                backgroundColor: 'var(--error)',
                                color: 'white',
                                fontSize: '0.75rem',
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold'
                            }}>
                                {cartItemCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
}
