import { HashRouter, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import OrderPage from './pages/OrderPage';
import ConfirmationPage from './pages/ConfirmationPage';

function App() {
  return (
    <HashRouter>
      <ShopProvider>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main className="container" style={{ flex: 1, padding: '2rem 1rem' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/order" element={<OrderPage />} />
              <Route path="/confirmation" element={<ConfirmationPage />} />
            </Routes>
          </main>

          <footer style={{
            textAlign: 'center',
            padding: '2rem',
            color: 'var(--text-secondary)',
            borderTop: '1px solid var(--border)',
            marginTop: '2rem'
          }}>
            <p>&copy; {new Date().getFullYear()} Amber Works. All rights reserved.</p>
          </footer>
        </div>
      </ShopProvider>
    </BrowserRouter>
  );
}

export default App;
