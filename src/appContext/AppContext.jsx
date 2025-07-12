import { UserProvider } from './UserContext';
import { ProductProvider } from './ProductContext';
import { OrdersProvider } from './OrderContext';
import { DashboardProvider } from './DashboardContext';
import { CartProvider } from './CartContext';

export const AppContextProvider = ({ children }) => {
  return (
    <DashboardProvider>
      <UserProvider>
        <ProductProvider>
          <OrdersProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </OrdersProvider>
        </ProductProvider>
      </UserProvider>
    </DashboardProvider>
  );
};