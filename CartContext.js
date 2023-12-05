// CartContext.js
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const quantity = prevItems[product.id] ? prevItems[product.id].quantity + 1 : 1;
      return { ...prevItems, [product.id]: { ...product, quantity } };
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const updatedItems = { ...prevItems };
      delete updatedItems[productId];
      return updatedItems;
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) => {
      if (newQuantity <= 0) {
        const updatedItems = { ...prevItems };
        delete updatedItems[productId];
        return updatedItems;
      }
      return { ...prevItems, [productId]: { ...prevItems[productId], quantity: newQuantity } };
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
