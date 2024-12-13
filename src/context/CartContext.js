import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Debug log to check cart updates
  useEffect(() => {
    console.log('Cart updated:', cart);
  }, [cart]);

  const addToCart = (item) => {
    console.log('Adding item to cart:', item);
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        console.log('Updating existing item quantity');
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      console.log('Adding new item to cart');
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    console.log('Removing item from cart:', itemId);
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    console.log('Updating quantity:', itemId, newQuantity);
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    console.log('Calculating total price:', total);
    return total;
  };

  const getCartCount = () => {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    console.log('Calculating cart count:', count);
    return count;
  };

  const clearCart = () => {
    console.log('Clearing cart');
    setCart([]);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getCartCount,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
