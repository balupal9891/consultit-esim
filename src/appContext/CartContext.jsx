import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // try {
        //     const cartPromise = new Promise(()=>{
        //         fetch(`${import.meta.env.VITE_SERVER_URL}/cart`)
        //         .then(res => res.json())
        //         .then(data => {
        //             setCarts(data.data)
        //         })
        //     })
        // } catch (error) {
        //     console.log('Error while fetching cart data');
        // }
        setCart([]);
    }, [])

    function addToCart(newProduct) {
        setCart((prevCart) => {
            const existing = prevCart.find(item => item.id === newProduct.id);

            if (existing) {
                return prevCart.map(item =>
                    item.id === newProduct.id
                        ? { ...item, quantity: item.quantity + newProduct.quantity }
                        : item
                );
            } else {
                return [...prevCart, newProduct];
            }
        });
    }

    function removeFromCart(id) {
        setCart(prev => (
            prev.filter((product) => product.id !== id)
        ))
    }

    return (
        <CartContext.Provider value={{ cart,setCart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);