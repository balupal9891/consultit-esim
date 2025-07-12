import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserContext';
import axios from 'axios';

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const {user} = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderCreated, setOrderCreated] = useState(null);

  useEffect(() => {
    
    if (user) {
      fetchOrders();
    }
  }, [user]);

  async function fetchOrders() {
      let token = localStorage.getItem('esim-accessToken');
      await axios.get(`${import.meta.env.VITE_SERVER_URL}/order/get-my-orders`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          // console.log(response.data.data)
          setOrders(response?.data?.data.reverse());
        })
        .catch(error => {
          console.error('Error:', error.response?.data || error.message);
        });
    };

  async function addOrder(newOrder) {
    if (newOrder) {
      setOrders(prevOrders => [...prevOrders, newOrder])
    }
  }

  async function removeOrder(orderId){
    if(orderId){
      setOrders(prev => prev.filter(order => order.orderSeqId != orderId))
    }
  }

  return (
    <OrdersContext.Provider value={{ orders,orderCreated,setOrderCreated, loading, addOrder, fetchOrders, removeOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);