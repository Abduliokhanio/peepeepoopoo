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
import LandingPage from './pages/LandingPage';
import Modifiers from './pages/Modifiers';
import PageNotFound from './pages/PageNotFound';

function App() {

  return (
    <ChakraProvider>
      <BrowserRouter>
        <div className="App">
          <AuthProvider>
            <Routes>
              <Route exact path="/" />
              <Route path="/:merchant" element={<Categories />} />
              <Route path="/:merchant/table/*" element={<Categories />} />
              <Route path="products" element={<Products />} />
              <Route path="modifiers" element={<Modifiers />} />
              <Route path="orders" element={<Orders />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="closed-tab" element={<ClosedTab />} />
              <Route path="login" element={<Login />} />
              <Route path="account" element={<Account />} />
              <Route path="account-details" element={<AccountDetails />} />
              <Route path="order-confirmed" element={<OrderConfirmed />} />
              <Route path="404" element={<PageNotFound />} />
            </Routes>
          </AuthProvider>
        </div>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
