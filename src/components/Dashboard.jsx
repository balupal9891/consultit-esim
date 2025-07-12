import ProductsPage from './ProductsPage';
import OrdersPage from './OrdersPage';
import { useDashboard } from '../appContext/DashboardContext';
import CountryPlanSelectorCard from '../utils/CountryPlanSelectorCard';
import { useProducts } from '../appContext/ProductContext';
import { useState } from 'react';
import AllEsims from './AllEsims';
import Sidebar from '../utils/Sidebar';
import DashboardLayout from '../layout/DashboardLayout';

export default function DashboardPage() {
    const { esims } = useDashboard();

    return (
        <div className='flex' >
            <AllEsims esimOrders={esims} />
        </div>
    );
}