import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Context Providers
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';

// Components
import Header from './components/Header';

// Screens (Pages)
import ProductScreen from './components/ProductScreen';
import ProductDetailScreen from './components/ProductDetailScreen';
import CartScreen from './components/CartScreen';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import ShippingScreen from './components/ShippingScreen';
import PaymentScreen from './components/PaymentScreen';
import PlaceOrderScreen from './components/PlaceOrderScreen';

// --- ADMIN SCREENS ---
import AdminDashboardScreen from './components/AdminDashboardScreen'; // <--- Make sure this file exists!
import AdminProductList from './components/AdminProductList';         // <--- Make sure this file exists!
import ProductEditScreen from './components/ProductEditScreen';
import ProductCreateScreen from './components/ProductCreateScreen';

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <div className="App">
            
            <Header />
            
            <main style={{ padding: '20px', minHeight: '80vh' }}>
              <Routes>
                {/* --- PUBLIC ROUTES --- */}
                <Route path="/" element={<ProductScreen />} exact />
                <Route path="/product/:id" element={<ProductDetailScreen />} />
                <Route path="/cart" element={<CartScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen />} />
                
                {/* --- PROTECTED USER ROUTES --- */}
                <Route path="/shipping" element={<ShippingScreen />} />
                <Route path="/payment" element={<PaymentScreen />} />
                <Route path="/placeorder" element={<PlaceOrderScreen />} />

                {/* --- ADMIN ROUTES --- */}
                {/* This fixes the "No Route" error you were seeing */}
                <Route path="/admin/dashboard" element={<AdminDashboardScreen />} />
                <Route path="/admin/products" element={<AdminProductList />} />
                <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
                <Route path="/admin/product/create" element={<ProductCreateScreen />} />
                
              </Routes>
            </main>

            <footer style={{ textAlign: 'center', padding: '20px', marginTop: '20px', borderTop: '1px solid #eee' }}>
              <p>Copyright &copy; 2024 E-Commerce Store</p>
            </footer>

          </div>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;