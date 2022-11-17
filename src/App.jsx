import * as React from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import PrivateRoute from './components/PrivateRoute';
import Categories from './pages/Categories';
import Orders from './pages/profile/Orders';
import Checkout from './pages/Cart';
import ClosedTab from './pages/ClosedTab';
import OrderConfirmed from './pages/OrderConfirmed';
import Products from './pages/Products';
import Account from './pages/profile/Account';
import AccountDetails from './pages/profile/AccountDetails';
import Signup from './pages/auth/Signup';
import Verify from './pages/auth/Verify';
import Modifiers from './pages/Modifiers';
import Tips from './pages/Tips';
import PageNotFound from './pages/PageNotFound';
import PaymentMethods from './pages/profile/PaymentMethods';
import AddCardPayment from './pages/profile/AddCardPayment';

function App() {

  return (
    <ChakraProvider>
      <BrowserRouter>
        <div className="App">
          <AuthProvider>
            <Routes>
              <Route path="/" />
              <Route path="/auth/signup" element={<Signup />} />
              <Route path="/auth/verify" element={<Verify />} />
              <Route path="/:merchant" element={<Categories />} />
              <Route path="/:merchant/table/*" element={<Categories />} />
              <Route path="products" element={<Products />} />
              <Route path="modifiers" element={<Modifiers />} />
              <Route path="404" element={<PageNotFound />} />
              <Route path="/user/account" element={<Account />} />
             
              {/* <Route path='/user/new-card' element={<AddCardPayment />} />
              <Route path='/user/payment-methods' element={<PaymentMethods />} />
              <Route path='/user/account-details' element={<AccountDetails />} />
              <Route path="/user/orders" element={<Orders />} />
              <Route path="/cart/checkout" element={<Checkout />} />
              <Route path="/cart/tips" element={<Tips />} />
              <Route path="/cart/order-confirmed" element={<OrderConfirmed />} /> */}
              <Route element={<PrivateRoute />}>
                <Route path="/cart/closed-tab" element={<ClosedTab />} />
              </Route>   
            </Routes>
          </AuthProvider>
        </div>
      </BrowserRouter>         
    </ChakraProvider>
  );
}

export default App;
