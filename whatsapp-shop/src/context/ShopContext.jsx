import { createContext, useState, useEffect, useContext } from 'react';
import { products as staticProducts } from '../data/products';

const ShopContext = createContext();

export function ShopProvider({ children }) {
    // We can just use the imported products directly. 
    // If you want to allow simple client-side search/filtering later, state is fine.
    const [products, setProducts] = useState(staticProducts);
    const [cart, setCart] = useState([]);

    // Load Cart from LocalStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('whatsapp-shop-cart-v2');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Sync Cart with LocalStorage
    useEffect(() => {
        localStorage.setItem('whatsapp-shop-cart-v2', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === productId) {
                return { ...item, quantity: Math.max(1, item.quantity + delta) };
            }
            return item;
        }));
    };

    const clearCart = () => setCart([]);

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <ShopContext.Provider value={{
            products,
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getCartTotal
        }}>
            {children}
        </ShopContext.Provider>
    );
}

export const useShop = () => useContext(ShopContext);
