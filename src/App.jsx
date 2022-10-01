import * as React from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Categories from './pages/Categories';
import Orders from './pages/Orders';
import Checkout from './pages/Checkout';
import CreateAccount from './pages/CreateAccount';
import ClosedTab from './pages/ClosedTab';
import OrderConfirmed from './pages/OrderConfirmed';
import Products from './pages/Products';

function App() {

  return (
    <ChakraProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/">
              <Route index element={<Categories />} />
              <Route path="products" element={<Products />} />
              <Route path="orders" element={<Orders />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="signup" element={<CreateAccount />} />
              <Route path="closed-tab" element={<ClosedTab />} />
              <Route path="order-confirmed" element={<OrderConfirmed />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
