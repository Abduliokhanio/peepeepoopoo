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
import LandingPage from './pages/LandingPage';
import Modifiers from './pages/Modifiers';
import Tips from './pages/Tips';
import PageNotFound from './pages/PageNotFound';
import PaymentMethods from './pages/profile/PaymentMethod';
import AddCardPayment from './pages/profile/AddCardPayment';

function App() {

  return (
    <ChakraProvider>
      <BrowserRouter>
        <div className="App">
          <AuthProvider>
            <Routes>
              <Route exact path="/" />
              <Route path="/auth/signup" element={<Signup />} />
              <Route path="/auth/verify" element={<Verify />} />
              <Route path="/:merchant" element={<Categories />} />
              <Route path="/:merchant/table/*" element={<Categories />} />
              <Route path="products" element={<Products />} />
              <Route path="modifiers" element={<Modifiers />} />
              <Route path="orders" element={<Orders />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="closed-tab" element={<ClosedTab />} />
              <Route path="order-confirmed" element={<OrderConfirmed />} />
              <Route path="tips" element={<Tips />} />
              <Route path="404" element={<PageNotFound />} />
              <Route path="/user/account" element={<Account />} />
              <Route element={<PrivateRoute />}>
                <Route path='/user/account-details' element={<AccountDetails />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path='/user/payment-methods' element={<PaymentMethods />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path='/user/new-card' element={<AddCardPayment />} />
              </Route>
            </Routes>
          </AuthProvider>
        </div>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
