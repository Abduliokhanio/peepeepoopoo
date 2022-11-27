/* eslint-disable no-undef */
import React, {useState, useEffect} from 'react';
import { useAuth } from '../context/Auth';
import { useNavigate } from 'react-router-dom';
import {VStack, Box, Text, } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import CartItemCard from '../components/CartItemCard';
import PlaceOrderButton from '../components/PlaceOrderButton';

export default function CheckoutPage() {
  const cart = useSelector(state => state.cart.items);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const merchantStoreBrandName = useSelector(state => state.merchant.brandName);
  const tableNumber = useSelector(state => state.merchant.tableNumber);
  const orderTip = useSelector(state => state.cart.tip);
  const orderTax = useSelector(state => state.cart.orderTax);
  const pendingOrders = cart.filter(item => item.sentToKitchen === false);
  const subTotal = pendingOrders.reduce((acc, item) => acc + (parseInt(item.item.price) * item.quantity), 0);
  const subTotalWithTax = (subTotal + (subTotal * (orderTax/100))).toFixed(2);
  const tip = (subTotalWithTax*orderTip).toFixed(2);
  const totalCost = subTotalWithTax+tip;

  const handleContinue = async () => {
    setLoading(true);
    if (orderTip === null) navigate('/cart/tips');
    // TODO: change back to catch missing payment method
    // else if (hasPaymentMethod === false) navigate('/user/payment-method');
    else navigate('/cart/opened-tab');
    
    setLoading(false);
  };

  return (
    <Box bg="#f6f9fc" minH="100vh" pb="300px">
      <Navbar title={merchantStoreBrandName} showBackButton={true} />
      <VStack
        pt={6}
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
      {/* TODO: voucher / discount code & allergies text area */}
      
      <PlaceOrderButton 
        isLoading={loading} 
        subTotal={subTotal.toFixed(2)}
        handleOnClick={handleContinue} 
        subTotalWithTax={subTotalWithTax} 
        totalCost={totalCost} 
        buttonLabel={'Continue'} />
    </Box>
  );
}
