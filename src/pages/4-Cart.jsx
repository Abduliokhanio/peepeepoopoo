/* eslint-disable no-undef */
import React, {useState, useEffect} from 'react';
import { useAuth } from '../context/Auth';
import { useNavigate } from 'react-router-dom';
import {VStack, Box, Text, Button } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import CartItemCard from '../components/cards/CartItemCard';
import PaymentDetailsButton from '../components/buttons/PaymentDetailsButton';
import {AiOutlinePlus} from 'react-icons/ai';

export default function CheckoutPage() {
  const cart = useSelector(state => state.cart.items);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const merchantURLPath = useSelector(state => state.merchant.urlPath);
  const tableNumber = useSelector(state => state.merchant.tableNumber);
  const orderTip = useSelector(state => state.cart.tip);
  const orderTax = useSelector(state => state.cart.orderTax);
  const orderMedthod = useSelector(state => state.cart.orderType);
  const pendingOrders = cart.filter(item => item.status === 'pending');
  const subTotal = pendingOrders.reduce((acc, item) => acc + (parseInt(item.item.price) * item.quantity), 0);
  const subTotalWithTax = (subTotal + (subTotal * (orderTax/100))).toFixed(2);
  const tip = (subTotalWithTax*orderTip).toFixed(2);
  const totalCost = subTotalWithTax+tip;
  
  const handleContinue = async () => {
    setLoading(true);
    if (orderTip === null || orderTip === undefined) navigate('/cart/tip');
    else navigate('/cart/checkout'); 
    setLoading(false);
  };

  return (
    <Box bg="#f6f9fc" minH="100vh" pb="300px">
      <Navbar title={orderMedthod} showBackButton={true} />
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
        <Box textAlign={'right'} pt={4}>
          <Button 
            maxW="200px"
            onClick={() => navigate(`/${merchantURLPath}`)}
            leftIcon={<AiOutlinePlus />}
            color="white"
            bg="black"
          >
          Add items</Button>
        </Box>
      </VStack>
      {/* TODO: voucher / discount code & allergies text area */}
      
      <PaymentDetailsButton 
        page="cart"
        isLoading={loading} 
        subTotal={subTotal.toFixed(2)}
        handleOnClick={handleContinue} 
        subTotalWithTax={subTotalWithTax} 
        totalCost={totalCost} 
        buttonLabel={'Continue'} />
    </Box>
  );
}
