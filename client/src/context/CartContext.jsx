import React, { createContext, useState, useEffect } from 'react';

// 1. Create the Context object
export const CartContext = createContext();

// 2. Create the Provider component
export const CartProvider = ({ children }) => {
    // Initialize cart state from local storage or an empty array
    const [cartItems, setCartItems] = useState(() => {
        const localCart = localStorage.getItem('cartItems');
        return localCart ? JSON.parse(localCart) : [];
    });

    // 3. Effect to persist cart state to local storage whenever cartItems changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // --- Core Cart Functions ---

    const addToCart = (product, qty) => {
        const existItem = cartItems.find(x => x._id === product._id);

        if (existItem) {
            // If item exists, update its quantity
            setCartItems(
                cartItems.map(x =>
                    x._id === existItem._id ? { ...existItem, qty: qty } : x
                )
            );
        } else {
            // If item is new, add it to the cart
            setCartItems([...cartItems, { ...product, qty: qty }]);
        }
    };

    const removeFromCart = (id) => {
        setCartItems(cartItems.filter(x => x._id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    // Calculate total items and total price
    const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    const contextValue = {
        cartItems,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        clearCart,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};