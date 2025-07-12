import React, { createContext, useContext, useState, useEffect } from 'react';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
    const [selected, setSelected] = useState('products');
    const [productId, setProductId] = useState(null);
    const [esims, setEsims] = useState([
  {
    order_id: 'ORD123',
    esim: {
      iccid: '89012345678901234567',
      activation_code: 'SM-DP+123456789',
      qr_code_url: 'https://yourdomain.com/qr/ORD123.png',
    },
    plan: {
      country: 'India',
      operator: 'Jio',
      data: '5GB',
      validity_days: 30,
      price_usd: 9.99,
    },
  },
  {
    order_id: 'ORD124',
    esim: {
      iccid: '89012345678906543210',
      activation_code: 'SM-DP+987654321',
      qr_code_url: 'https://yourdomain.com/qr/ORD124.png',
    },
    plan: {
      country: 'USA',
      operator: 'T-Mobile',
      data: '10GB',
      validity_days: 15,
      price_usd: 19.99,
    },
  },
  {
    order_id: 'ORD124',
    esim: {
      iccid: '89012345678906543210',
      activation_code: 'SM-DP+987654321',
      qr_code_url: 'https://yourdomain.com/qr/ORD124.png',
    },
    plan: {
      country: 'USA',
      operator: 'T-Mobile',
      data: '10GB',
      validity_days: 15,
      price_usd: 19.99,
    },
  },
])

  return (
    <DashboardContext.Provider value={{selected, setSelected, productId, setProductId, esims}}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = ()=> useContext(DashboardContext);