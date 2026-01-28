import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function ConfirmationPage() {
    return (
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}>
                <CheckCircle size={64} style={{ fill: '#e6ffe6' }} />
            </div>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Order Placed!</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '1rem', fontWeight: '500' }}>
                Thank you for choosing Amber Works!
            </p>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
                You have been redirected to WhatsApp with your pre-filled order details. Please hit "Send" to share it with us.
                <br /><br />
                We will review your order immediately and communicate with you directly via WhatsApp to finalize payment and delivery details. If you have any specific preferences, feel free to add them to the message before sending.
            </p>
            <Link to="/" className="btn btn-primary">
                Continue Shopping
            </Link>
        </div >
    );
}
