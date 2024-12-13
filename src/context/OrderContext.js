import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

const ORDERS_STORAGE_KEY = 'restaurant_orders';

// Load orders from localStorage
const loadOrders = () => {
  try {
    const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
    return savedOrders ? JSON.parse(savedOrders) : [];
  } catch (error) {
    console.error('Error loading orders:', error);
    return [];
  }
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(loadOrders);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
      console.log('Orders saved to localStorage:', orders);
    } catch (error) {
      console.error('Error saving orders:', error);
    }
  }, [orders]);

  const addOrder = (order) => {
    console.log('Adding new order:', order);
    const newOrder = {
      ...order,
      id: Date.now(),
      status: 'pending',
      timestamp: new Date().toLocaleTimeString()
    };
    console.log('Formatted new order:', newOrder);
    
    setOrders(prevOrders => {
      const updatedOrders = [...prevOrders, newOrder];
      console.log('Updated orders array:', updatedOrders);
      return updatedOrders;
    });
  };

  const updateOrderStatus = (orderId, newStatus) => {
    console.log('Updating order status:', orderId, newStatus);
    setOrders(prevOrders => {
      const updatedOrders = prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      console.log('Orders after status update:', updatedOrders);
      return updatedOrders;
    });
  };

  const value = {
    orders,
    addOrder,
    updateOrderStatus
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};
