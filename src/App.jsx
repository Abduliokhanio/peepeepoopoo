import * as React from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/Auth';
import PrivateRoute from './components/PrivateRoute';
import Receipts from './pages/profile/Receipts';
import Cart from './pages/4-Cart';
import Confirmation from './pages/7-Confirmation';
import Checkout from './pages/6-Checkout';
import Categories from './pages/1-Categories';
import Products from './pages/2-Products';
import Modifiers from './pages/3-Modifiers';
import Tip from './pages/5-AddTip';
import Account from './pages/profile/Account';
import AccountDetails from './pages/profile/AccountDetails';
import Signup from './pages/auth/Signup';
import Verify from './pages/auth/Verify';
import LandingPage from './pages/LandingPage';
import PageNotFound from './pages/PageNotFound';
import PaymentMethods from './pages/profile/PaymentMethods';
import AddCardPayment from './pages/profile/AddCardPayment';
import ManageTab from './pages/ManageTab';

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
                <Route path="/user/receipts" element={<Receipts />} />
                <Route path="/cart/tip" element={<Tip />} />
                <Route path="/cart/checkout" element={<Checkout />} />
                <Route path="/cart/confirmation" element={<Confirmation />} />
                <Route path="/cart/manage-tab" element={<ManageTab />} />
                <Route path="/cart" element={<Cart />} />
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
