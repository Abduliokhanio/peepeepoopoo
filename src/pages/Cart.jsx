/* eslint-disable no-undef */
import React, {useState, useEffect} from 'react';
import { useAuth } from '../context/auth';
import { supabasePrivate } from '../services/supabasePrivate';
import { useNavigate } from 'react-router-dom';
import {VStack, Box, Text} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import CartItemCard from '../components/CartItemCard';
import PlaceOrderButton from '../components/PlaceOrderButton';
import { setSelectedProduct } from '../context/slices/merchantSlice';
import {updateCart} from '../context/slices/cartSlice';

export default function CheckoutPage() {
  const cart = useSelector(state => state.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const tableNumber = useSelector(state => state.merchant.tableNumber);
  const orderTip = useSelector(state => state.cart.tip);
  const hasPaymentMethod = useSelector(state => state.customer.hasPaymentMethod);

  const merchantStore = useSelector(state => state.merchant);
  const customerName = useSelector(state => state.customer.name);
  const orderType = useSelector(state => state.cart.orderType);

  const pendingOrders = cart.filter(item => item.orderSent === false);
  const subTotal = pendingOrders.reduce((acc, item) => acc + (parseInt(item.item.price) * item.quantity), 0);
  const subTotalWithTax = (subTotal + (subTotal * (0.0825))).toFixed(2);
  const tip = (subTotalWithTax*0.15).toFixed(2);
  const totalCost = subTotalWithTax+tip;

  supabasePrivate
    .channel('private:orders')
    .on('postgres_changes', {
      event: 'INSERT', schema: 'private', table: 'orders' 
    }, payload => handleTicketSent(payload))
    .subscribe();

  const handleContinue = async () => {
    setLoading(true);
    await sendOrderToKDS();

    if (orderTip === null) navigate('/cart/tips');
    // TODO: change back to catch missing payment method
    // else if (hasPaymentMethod === false) navigate('/user/payment-method');
    else navigate('/cart/order-confirmed');
    
    setLoading(false);
  };

  const sendOrderToKDS = async () => {
    const ticket = await supabasePrivate.from('orders').insert({
      customer_id: user.id,
      room_id: `admin-${merchantStore.urlPath}`,
      customer_name: customerName,
      orders: pendingOrders, // list of orders or cart items
      order_type: orderType,
      table_number: tableNumber,
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    });

    console.log('ticket: ', ticket);
    if (ticket.status !== 201) throw `${ticket.err}: Error sending order`;
  };

  const updatePendingOrders = async () => {
    await pendingOrders.forEach((order) => {
      dispatch(updateCart({
        ...order, orderSent: true
      }));
    });
  };

  const handleTicketSent = async (payload) => {
    console.log('ORDER SENT SUCCESS', payload);
    await updatePendingOrders();
    navigate('/cart/order-confirmed');
  };

  return (
    <Box bg="#f6f6f6" minH="100vh">
      <Navbar title="Order" showBackButton={true} />
      <VStack
        pt="100px"
        spacing={4}
        align="stretch"
        px="6"
        mb="8"
      >
        {tableNumber === null ? null : (
          <Text w="100%" textAlign={'left'}>
            {`Table #${tableNumber}`}</Text>
        )}
        {pendingOrders.map((item, index) => {
          return(
            <CartItemCard
              key={index}
              item={item}
            />);
        } )}
      </VStack>

      <div id="applepaybutton"></div>

      {/* TODO: voucher / discount code & allergies text area */}
      
      <PlaceOrderButton 
        isLoading={loading} 
        subTotal={subTotal}
        handleOnClick={handleContinue} 
        subTotalWithTax={subTotalWithTax} 
        totalCost={totalCost} 
        buttonLabel={'Continue'} />
    </Box>
  );
}