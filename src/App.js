import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './components/Home/HomePage';
import CartPage from './components/Cart/CartPage';
import PaymentPage from './components/Payment/PaymentPage';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <>
      <CssBaseline />
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
