import * as React from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/Auth';
import PrivateRoute from './components/PrivateRoute';
import Orders from './pages/profile/Receipts';
import Checkout from './pages/4-Cart';
import ClosedTab from './pages/6-ClosedTab';
import OpenedTab from './pages/5-OpenedTab';
import Categories from './pages/1-Categories';
import Products from './pages/2-Products';
import Modifiers from './pages/3-Modifiers';
import Tips from './pages/3A-Tips';
import Account from './pages/profile/Account';
import AccountDetails from './pages/profile/AccountDetails';
import Signup from './pages/auth/Signup';
import Verify from './pages/auth/Verify';
import LandingPage from './pages/LandingPage';
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
              <Route exact path="/" element={<LandingPage />}/>
              <Route path="/:merchant" element={<Categories />} />
              <Route path="/:merchant/table/*" element={<Categories />} />
              <Route path="products" element={<Products />} />
              <Route path="modifiers" element={<Modifiers />} />
              <Route path="/user/account" element={<Account />} />
              <Route path="/auth/signup" element={<Signup />} />
              <Route path="/auth/verify" element={<Verify />} />
              <Route element={<PrivateRoute />}>
                <Route path='/user/new-card' element={<AddCardPayment />} />
                <Route path='/user/payment-methods' element={<PaymentMethods />} />
                <Route path='/user/account-details' element={<AccountDetails />} />
                <Route path="/user/receipts" element={<Orders />} />
                <Route path="/cart/checkout" element={<Checkout />} />
                <Route path="/cart/tips" element={<Tips />} />
                <Route path="/cart/opened-tab" element={<OpenedTab />} />
                <Route path="/cart/closed-tab" element={<ClosedTab />} />
              </Route>   
              <Route path="404" element={<PageNotFound />} />
            </Routes>
          </AuthProvider>
        </div>
      </BrowserRouter>         
    </ChakraProvider>
  );
}

export default App;
