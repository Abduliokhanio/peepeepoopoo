/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
// import { supabasePrivate } from '../services/supabasePrivate';
import { useAuth } from '../context/Auth';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PlaceOrderButton from '../components/PlaceOrderButton';
import {
  Stack, Container, Flex, Button, Text, Box, Heading, HStack, Divider
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { setOrderTip, updateCart } from '../context/slices/cartSlice';

export default function TipsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const cart = useSelector(state => state.cart.items);
  const merchantStore = useSelector(state => state.merchant);
  const pendingOrders = cart.filter(order => order.orderSent === false);
  const hasPaymentMethod = useSelector(state => state.customer.hasPaymentMethod);
  const customerName = useSelector(state => state.customer.name);
  const orderType = useSelector(state => state.cart.orderType);
  const tableNumber = useSelector(state => state.merchant.tableNumber);

  const [loading, setLoading] = useState(false);
  const [subTotal, setSubTotal] = useState(pendingOrders.reduce((acc, item) => acc + (parseInt(item.item.price) * item.quantity), 0));
  const [subTotalWithTax, setSubTotalWithTax] = useState((subTotal + (subTotal * (0.0825))).toFixed(2));
  const [tip, setTip] = useState((subTotalWithTax*0.15).toFixed(2));
  const [totalCost, setTotalCost] = useState(subTotalWithTax+tip);

  const [isFirstButtonSelected, setIsFirstButtonSelected] = useState(true);
  const [isSecondButtonSelected, setIsSecondButtonSelected] = useState(false);
  const [isThirdButtonSelected, setIsThirdButtonSelected] = useState(false);

  // supabasePrivate
  //   .channel('private:orders')
  //   .on('postgres_changes', { event: 'INSERT', schema: 'private', table: 'orders' }, payload => handleTicketSent(payload))
  //   .subscribe();

  // const handlePlaceOrder = async () => {
  //   setLoading(true);
  //   dispatch(setOrderTip(tip));
  //   await sendOrderToKDS();
  // };

  // const sendOrderToKDS = async () => {
  //   const ticket = await supabasePrivate.from('orders').insert({
  //     customer_id: user.id,
  //     room_id: `admin-${merchantStore.urlPath}`,
  //     customer_name: customerName,
  //     orders: pendingOrders, // list of orders or cart items
  //     order_type: orderType,
  //     table_number: tableNumber,
  //     created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
  //   });

  //   console.log('ticket: ', ticket);
  //   if (ticket.status !== 201) throw `${ticket.err}: Error sending order`;
  // };

  // const updatePendingOrders = async () => {
  //   await pendingOrders.forEach((order) => {
  //     dispatch(updateCart({...order, orderSent: true}));
  //   });
  // };

  // const handleTicketSent = async (payload) => {
  //   console.log('ORDER SENT SUCCESS', payload);
  //   await updatePendingOrders();
  //   navigate('/cart/order-confirmed');
  // };

  /////////////////////////////

  const handleContinue = () => {
    dispatch(setOrderTip(tip));
    navigate('/cart/order-confirmed');
  };

  const handleFirstButton = () => {
    setIsFirstButtonSelected(true);
    setIsSecondButtonSelected(false);
    setIsThirdButtonSelected(false);
    setTip((subTotalWithTax*0.15).toFixed(2));
  };
  
  const handleSecondButton = () => {
    setIsFirstButtonSelected(false);
    setIsSecondButtonSelected(true);
    setIsThirdButtonSelected(false);
    setTip((subTotalWithTax*0.20).toFixed(2));
  };

  const handleThirdButton = () => {
    setIsFirstButtonSelected(false);
    setIsSecondButtonSelected(false);
    setIsThirdButtonSelected(true);
    setTip((subTotalWithTax*0.25).toFixed(2));
  };

  return (
    <Box bg="#f6f6f6" minH="100vh">
      <Flex direction="column">
        <Navbar title={'Tips'} showBackButton={true} />
        <Stack mt="32">
          <Container>
            <Heading mb="1rem" fontSize={'2rem'}>Show your support ❤️</Heading>
            <Text>100% of your tips goes to the wait staff</Text>
            <Stack mt="16" direction="column" spacing={4}>
              <Button size="lg"
                onClick={() => handleFirstButton()}
                bg={isFirstButtonSelected === true ? '#000000' : 'white'}
                _focus={{
                  bg: '#000000'
                }}
                border={isFirstButtonSelected === true ? 'none' : '1.5px solid #000000'}
                color={isFirstButtonSelected  === true ? 'white' : 'black'}>
                <Text pr="4">Nice!</Text>
                <Text pr="1">${(subTotalWithTax*0.15).toFixed(2)}</Text>
                <Text>(15%)</Text>
              </Button>
              <Button size="lg" 
                onClick={handleSecondButton}
                bg={isSecondButtonSelected === true ? '#000000' : 'white'}
                _focus={{
                  bg: '#000000'
                }}
                border={isSecondButtonSelected === true ? 'none' : '1.5px solid #000000'}
                color={isSecondButtonSelected === true ? 'white' : 'black'}>
                <Text pr="4">You&apos;re Great!</Text>
                <Text pr="1">${(subTotalWithTax*0.20).toFixed(2)}</Text>
                <Text>(20%)</Text>
              </Button>
              <Button 
                onClick={() => handleThirdButton()}
                size="lg" 
                bg={isThirdButtonSelected === true ? '#000000' : 'white'}
                _focus={{
                  bg: '#000000'
                }}
                border={isThirdButtonSelected === true ? 'none' : '1.5px solid #000000'}
                color={isThirdButtonSelected ? 'white' : 'black'}>
                <Text pr="4">Thank you so much!</Text>
                <Text pr="1">${(subTotalWithTax*0.25).toFixed(2)}</Text>
                <Text>(25%)</Text>
              </Button>
            </Stack>
          </Container>
        </Stack>
        <Divider mt="16" mb="4" />

      </Flex>
      <PlaceOrderButton 
        isLoading={loading} 
        subTotal={subTotal}
        tip={parseFloat(tip)} 
        handleOnClick={() => handleContinue()} 
        subTotalWithTax={subTotalWithTax} 
        buttonLabel={'Continue'} />
    </Box>
  );
}
