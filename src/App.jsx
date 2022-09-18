import * as React from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from './store';
import Menu from './pages/Menu';
import Orders from './pages/Orders';
import Checkout from './pages/Checkout';
import CreateAccount from './pages/CreateAccount';
import ClosedTab from './pages/ClosedTab';
import OrderConfirmed from './pages/OrderConfirmed';

function App() {
  // const [session, setSession] = useState(null)

  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session)
  //   })

  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session)
  //   })
  // }, [])

  return (
    <ReduxProvider store={store}>
      {/* <div className="container" style={{ padding: '50px 0 100px 0' }}>
        {!session ? (
          <Auth />
        ) : (
          <Account key={session.user.id} session={session} />
        )}
      </div> */}
      <ChakraProvider>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/">
                <Route index element={<Menu />} />
                <Route path="menu" element={<Menu />} />
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
    </ReduxProvider>
  );
}

export default App;
