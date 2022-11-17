/* eslint-disable no-undef */
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  VStack, Box, Heading, Button, StackDivider, useDisclosure, Flex, Text, Spacer, Divider,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import CartItemCard from '../components/CartItemCard';
import PlaceOrderButton from '../components/PlaceOrderButton';
import { setSelectedProduct } from '../context/slices/merchantSlice';

export default function CheckoutPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cart = useSelector(state => state.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tableNumber = useSelector(state => state.merchant.tableNumber);
  const orderTip = useSelector(state => state.cart.tip);
  const hasPaymentMethod = useSelector(state => state.customer.hasPaymentMethod);
  const [loading, setLoading] = useState(false);

  const [subTotal, setSubTotal] = useState(cart.reduce((acc, item) => acc + (parseInt(item.item.price) * item.quantity), 0));
  const [subTotalWithTax, setSubTotalWithTax] = useState((subTotal + (subTotal * (0.0825))).toFixed(2));
  const [tip, setTip] = useState((subTotalWithTax*0.15).toFixed(2));
  const [totalCost, setTotalCost] = useState(subTotalWithTax+tip);

  const handleCheckout = async () => {
    setLoading(true);

    if (orderTip === null) navigate('/tips');
    else if (hasPaymentMethod === true) navigate('/payment');
    
    setLoading(false);
  };

  const handleEditCartItem = (item) => {
    dispatch(setSelectedProduct(item));
    navigate('/modifiers');
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
        {cart.map((item, index) => {
          return(
            <CartItemCard
              key={index}
              onClick={(item) => handleEditCartItem(item)}
              item={item}
              index={index}
              setTotalCost={setTotalCost}
              cart={cart}
            />);
         
        } )}
      </VStack>

      {/* TODO: voucher / discount code & allergies text area */}
      
      <PlaceOrderButton 
        isLoading={loading} 
        subTotal={subTotal}
        handleOnClick={handleCheckout} 
        subTotalWithTax={subTotalWithTax} 
        totalCost={totalCost} 
        buttonLabel={'Continue'} />
    </Box>
  );
}
