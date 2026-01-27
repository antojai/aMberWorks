import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function ConfirmationPage() {
    return (
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}>
                <CheckCircle size={64} style={{ fill: '#e6ffe6' }} />
            </div>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Order Placed!</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
                You have been redirected to WhatsApp to send your order details. Once the message is sent, we will confirm your order.
            </p>
            <Link to="/" className="btn btn-primary">
                Continue Shopping
            </Link>
        </div>
    );
}
