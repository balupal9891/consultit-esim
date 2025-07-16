import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast';
import LoginPage from './components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from './components/Signup';
import { AppContextProvider } from './appContext/AppContext';
import ProductPage from './components/ProductPage';
import ContactPage from './components/Contact.jsx';
import MainLayout from './layout/MainLayout.jsx';
import OrdersPage from './components/OrdersPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ProfilePage from './components/ProfilePage.jsx';
import OrderViewPage from './components/OrderViewPage.jsx';
import CartPage from './components/CartPage.jsx';
import PlanPage from './components/PlanPage.jsx';
import EsimTopupPlans from './components/EsimTopupPlans.jsx';
import DashboardLayout from './layout/DashboardLayout.jsx';
import AllEsims from './components/AllEsims.jsx';
import ActivateEsim from './components/ActivateEsim.jsx';
import PaymentPage from './components/PaymentPage.jsx'
import RefundPolicy from './FooterPages/Policies/RefundPolicy.jsx';
import TermsOfService from './FooterPages/Policies/TermsOfServices.jsx';
import PrivacyPolicy from './FooterPages/Policies/PrivacyPolicy.jsx';
import KYCPolicy from './FooterPages/Policies/KYC.jsx';
import SuccessPage from './pages/paymentPages/SuccessPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppContextProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* Routes that use Header */}
          <Route element={<MainLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<App />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/products/:country" element={<PlanPage />} />

            <Route path="/payment/:id" element={<PaymentPage />} />
            <Route path="/payment/status/" element={<SuccessPage />} />

            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/termsofservices" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/kyc" element={<KYCPolicy />} />

            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="orders" element={<OrdersPage />} />
              <Route path="topup" element={<EsimTopupPlans />} />
              <Route path="allesims" element={<AllEsims />} />
              <Route path="activate" element={<ActivateEsim />} />
              <Route path="orders/:id" element={<OrderViewPage />} />
            </Route>
            {/* <Route path="/dashboard/orders" element={<OrdersPage />} />
            <Route path="/dashboard/products/:id" element={<ProductPage />} />
            <Route path="/dashboard/orders/:id" element={<OrderViewPage />} /> */}
          </Route>


        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  </StrictMode>,
)
