import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './components/Home/HomePage';
import CartPage from './components/Cart/CartPage';
import PaymentPage from './components/Payment/PaymentPage';
import AdminPage from './components/Admin/AdminPage';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';

function App() {
  return (
    <>
      <CssBaseline />
      <CartProvider>
        <OrderProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </Router>
        </OrderProvider>
      </CartProvider>
    </>
  );
}

export default App;
