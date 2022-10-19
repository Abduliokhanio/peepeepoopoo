import * as React from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/Auth';
import Categories from './pages/Categories';
import Orders from './pages/Orders';
import Checkout from './pages/Checkout';
import ClosedTab from './pages/ClosedTab';
import OrderConfirmed from './pages/OrderConfirmed';
import Products from './pages/Products';
import Account from './pages/Account';
import AccountDetails from './pages/AccountDetails';
import Login from './pages/Login';
import Payment from './pages/PaymentAPI';

function App() {

  return (
    <ChakraProvider>
      <BrowserRouter>
        <div className="App">
          <AuthProvider>
            <Routes>
              <Route path="/">
                <Route index element={<Categories />} />
                <Route path="products" element={<Products />} />
                <Route path="orders" element={<Orders />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="closed-tab" element={<ClosedTab />} />
                <Route path="login" element={<Login />} />
                <Route path="account" element={<Account />} />
                <Route path="payment" element={<Payment />} />
                <Route path="account-details" element={<AccountDetails />} />
                <Route path="order-confirmed" element={<OrderConfirmed />} />
              </Route>
            </Routes>
          </AuthProvider>
        </div>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
