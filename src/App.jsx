import * as React from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/Auth';
import PrivateRoute from './components/PrivateRoute';
import Categories from './pages/Categories';
import Orders from './pages/profile/Receipts';
import Checkout from './pages/Cart';
import ClosedTab from './pages/ClosedTab';
import OpenedTab from './pages/OpenedTab';
import Products from './pages/Products';
import Account from './pages/profile/Account';
import AccountDetails from './pages/profile/AccountDetails';
import Signup from './pages/auth/Signup';
import Verify from './pages/auth/Verify';
import LandingPage from './pages/LandingPage';
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
