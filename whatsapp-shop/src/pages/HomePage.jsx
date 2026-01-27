import { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 8; // Adjust layout as needed

export default function HomePage() {
    const { products } = useShop();
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Filter products based on search
    const filteredProducts = useMemo(() => {
        return products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [products, searchQuery]);

    // Calculate pagination
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const currentProducts = filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    const goToPage = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            <section style={{
                textAlign: 'center',
                padding: '3rem 1rem',
                background: 'linear-gradient(135deg, var(--secondary) 0%, var(--primary-dark) 100%)',
                color: 'white',
                borderRadius: 'var(--radius-lg)',
                marginBottom: '2rem'
            }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Welcome to Amber Works</h1>
                <p style={{ opacity: 0.9, marginBottom: '2rem' }}>Order directly via WhatsApp!</p>

                {/* Search Bar */}
                <div style={{ maxWidth: '500px', margin: '0 auto', position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="input"
                        style={{
                            paddingLeft: '2.5rem',
                            borderRadius: '50px',
                            border: 'none',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                </div>
            </section>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '2px solid var(--border)', paddingBottom: '0.5rem' }}>
                <h2 style={{ fontSize: '1.5rem' }}>
                    {searchQuery ? `Search Results (${filteredProducts.length})` : 'Latest Products'}
                </h2>
            </div>

            {currentProducts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                    <p style={{ fontSize: '1.2rem' }}>No products found matching "{searchQuery}"</p>
                    {searchQuery && <button onClick={() => setSearchQuery('')} className="btn btn-secondary" style={{ marginTop: '1rem' }}>Clear Search</button>}
                </div>
            ) : (
                <>
                    <div className="grid-products">
                        {currentProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '3rem' }}>
                            <button
                                className="btn btn-secondary"
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                style={{ opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'default' : 'pointer' }}
                            >
                                <ChevronLeft size={20} /> Previous
                            </button>

                            <span style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>
                                Page {currentPage} of {totalPages}
                            </span>

                            <button
                                className="btn btn-secondary"
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                style={{ opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'default' : 'pointer' }}
                            >
                                Next <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
